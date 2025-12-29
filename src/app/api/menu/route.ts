import { NextRequest, NextResponse } from 'next/server'

// Cache this route for 2 hours (7200 seconds) to reduce Airtable API calls
// This results in ~720 calls/month (2 routes × 12 calls/day × 30 days)
export const revalidate = 7200

type AirtableRecord = {
  id: string
  fields: Record<string, unknown>
}

type MenuItem = {
  id: string
  name: string
  description: string
  price: string
  tags: string[]
  course: string
  meal?: string[]
  photo?: string
  featured?: boolean
}

const AIRTABLE_API_URL = 'https://api.airtable.com/v0'

function getEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value.trim()
}

function normalizeRecord(record: AirtableRecord): MenuItem {
  const f = record.fields as Record<string, any>
  
  // Map to your actual Airtable columns
  const name: string = f['Item Name'] || f.name || ''
  const description: string = f['Description'] || f.description || ''
  const course: string = f['Course'] || f.course || ''
  // Handle meal - could be string or array (multi-select)
  // Try multiple possible field names
  const rawMeal = f['Meal'] || f['Meal Type'] || f['Meal Time'] || f['Service'] || f.meal || ''
  const meal: string[] = Array.isArray(rawMeal) 
    ? rawMeal.map((m: any) => typeof m === 'string' ? m.trim() : String(m).trim()).filter(Boolean)
    : typeof rawMeal === 'string' && rawMeal.trim()
      ? [rawMeal.trim()]
      : []
  const priceValue: number | string | undefined = f['Price'] ?? f.Price ?? undefined
  const photo = Array.isArray(f['Photo']) ? f['Photo'][0] : undefined
  
  // Handle tags - could be array or string
  const rawTags = f['Tags'] || f.tags || []
  const tags: string[] = Array.isArray(rawTags) 
    ? rawTags 
    : typeof rawTags === 'string' 
      ? rawTags.split(',').map(t => t.trim()).filter(Boolean)
      : []
  
  const price: string = typeof priceValue === 'number' 
    ? `$${priceValue}` 
    : typeof priceValue === 'string' 
      ? priceValue 
      : ''
  
  // Determine if featured based on tags
  const featured = tags.includes('Featured')
  
  return {
    id: record.id,
    name,
    description,
    price,
    tags,
    course,
    meal,
    photo: photo?.thumbnails?.large?.url || photo?.thumbnails?.full?.url || photo?.url || undefined,
    featured,
  }
}

export async function GET(request: NextRequest) {
  try {
    const baseId = getEnv('AIRTABLE_BASE_ID')
    const tableName = getEnv('AIRTABLE_MENU_TABLE')
    const apiKey = getEnv('AIRTABLE_API_KEY')

    const url = new URL(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`)
    
    // Optional Airtable-side sort if configured
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

    // Group by course
    const sections = items.reduce((acc, item) => {
      const course = item.course || 'Other'
      if (!acc[course]) {
        acc[course] = []
      }
      acc[course].push(item)
      return acc
    }, {} as Record<string, MenuItem[]>)

    const { searchParams } = new URL(request.url)
    const debug = searchParams.get('debug') === '1'
    const featured = searchParams.get('featured') === '1'
    
    if (featured) {
      // Return only featured items for home page
      const featuredItems = items.filter(item => item.featured)
      return NextResponse.json(
        debug ? { items: featuredItems, raw: json.records } : { items: featuredItems },
        { status: 200 }
      )
    }

    return NextResponse.json(
      debug ? { sections, items, raw: json.records } : { sections, items },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Menu API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message },
      { status: 500 }
    )
  }
}
