import { NextRequest, NextResponse } from 'next/server'

// Cache this route for 2 hours (7200 seconds) to reduce Airtable API calls
// This results in ~720 calls/month (2 routes × 12 calls/day × 30 days)
export const revalidate = 7200

type AirtableRecord = {
  id: string
  fields: Record<string, unknown>
}

type EventItem = {
  id: string
  title: string
  date: string
  time?: string
  capacity?: string
  price?: string
  description?: string
  image?: string
  status?: 'upcoming' | 'past' | string
  featured?: boolean
  url?: string
}

const AIRTABLE_API_URL = 'https://api.airtable.com/v0'

function getEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value.trim()
}

function normalizeRecord(record: AirtableRecord): EventItem {
  const f = record.fields as Record<string, any>
  // Map to your actual Airtable columns
  const title: string = f['Event Name'] || f.Title || f.name || ''
  const description: string | undefined = f['Description'] || f.description || undefined
  const priceValue: number | string | undefined = f['Price'] ?? f.Price ?? undefined
  const guests: number | string | undefined = f['Guests'] ?? f.Guests ?? undefined
  const photo = Array.isArray(f['Photo']) ? f['Photo'][0] : undefined
  const rawStart: string | undefined = f['Start Date / Time'] || f['Start'] || undefined
  const rawEnd: string | undefined = f['End Date / Time'] || f['End'] || undefined

  const startMs = typeof rawStart === 'string' ? Date.parse(rawStart) : NaN
  const endMs = typeof rawEnd === 'string' ? Date.parse(rawEnd) : NaN
  const start = Number.isFinite(startMs) ? new Date(startMs) : undefined
  const end = Number.isFinite(endMs) ? new Date(endMs) : undefined

  const isValid = (d?: Date) => !!d && Number.isFinite(d.getTime())
  
  // Use explicit timezone to ensure consistent formatting across environments
  // Kernersville, NC is in Eastern Time (America/New_York)
  const timezone = 'America/New_York'
  
  // Timezone-aware same day check
  const sameDay = (a: Date, b: Date) => {
    const aStr = a.toLocaleDateString('en-US', { timeZone: timezone })
    const bStr = b.toLocaleDateString('en-US', { timeZone: timezone })
    return aStr === bStr
  }
  
  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: timezone
  })
  const formatTime = (d: Date) => d.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    timeZone: timezone
  })

  let date: string = ''
  let time: string | undefined = undefined
  let status: 'upcoming' | 'past' | string = 'upcoming'

  if (isValid(start)) {
    // Determine status by end if present, otherwise start
    const comparePoint = isValid(end) ? (end as Date) : (start as Date)
    status = comparePoint.getTime() < Date.now() ? 'past' : 'upcoming'

    if (isValid(end) && !sameDay(start as Date, end as Date)) {
      // Multi-day event: show date range only, no times
      date = `${formatDate(start as Date)} - ${formatDate(end as Date)}`
      time = undefined
    } else {
      // Single-day event
      date = formatDate(start as Date)
      if (isValid(end) && (start as Date).getTime() !== (end as Date).getTime()) {
        // Show time range on the same day
        time = `${formatTime(start as Date)} - ${formatTime(end as Date)}`
      } else {
        // Only a start time
        time = formatTime(start as Date)
      }
    }
  }

  let capacity: string | undefined
  if (typeof guests === 'number') {
    capacity = `${guests} guests`
  } else if (typeof guests === 'string') {
    capacity = guests.toLowerCase() === 'all guests' ? 'All guests' : `${guests} guests`
  } else {
    capacity = undefined
  }
  const price: string | undefined =
    typeof priceValue === 'number' ? `$${priceValue}` : typeof priceValue === 'string' ? priceValue : undefined

  // Determine featured from multiple possible Airtable fields
  const rawTags = (f['Tag'] ?? f['Tags']) as unknown
  const isFeaturedFromTags = Array.isArray(rawTags)
    ? rawTags.includes('Featured')
    : typeof rawTags === 'string'
      ? rawTags === 'Featured'
      : false
  const isFeatured = Boolean((f.Featured ?? f.featured ?? false) || isFeaturedFromTags)

  // Extract URL field - try multiple possible field names
  const url: string | undefined = f['Booking Link'] || f['URL'] || f['Url'] || f['Link'] || f['Reservation URL'] || f['Reservation Link'] || undefined

  return {
    id: record.id,
    title,
    date,
    time,
    capacity,
    price,
    description,
    image: photo?.url || f.ImageUrl || f.image || undefined,
    status,
    featured: isFeatured,
    url: typeof url === 'string' ? url.trim() : undefined,
  }
}

export async function GET(request: NextRequest) {
  try {
    const baseId = getEnv('AIRTABLE_BASE_ID')
    const tableName = getEnv('AIRTABLE_EVENTS_TABLE')
    const apiKey = getEnv('AIRTABLE_API_KEY')

    const url = new URL(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`)
    // Optional Airtable-side sort if configured; avoids UNKNOWN_FIELD_NAME errors
    const sortField = process.env.AIRTABLE_SORT_FIELD
    if (sortField) {
      url.searchParams.set('sort[0][field]', sortField)
      url.searchParams.set('sort[0][direction]', 'asc')
    }

    // Revalidate periodically on the server to keep data fresh
    const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 7200 },
    }

    const res = await fetch(url.toString(), fetchOptions)

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: 'Failed to fetch Airtable', details: text },
        { status: res.status }
      )
    }

    const json = (await res.json()) as { records: AirtableRecord[] }
    const items = (json.records || []).map(normalizeRecord)

    const { searchParams } = new URL(request.url)
    const debug = searchParams.get('debug') === '1'
    return NextResponse.json(
      debug ? { events: items, raw: json.records } : { events: items },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Events API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message },
      { status: 500 }
    )
  }
}


