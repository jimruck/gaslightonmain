import type { ApiEventItem, ApiMenuItem, CmsEventRow, CmsMenuRow } from './types'

const timezone = 'America/New_York'

const isValidDate = (value?: string | null): value is string => {
  if (!value) return false
  const ms = Date.parse(value)
  return Number.isFinite(ms)
}

const sameDay = (a: Date, b: Date) =>
  a.toLocaleDateString('en-US', { timeZone: timezone }) ===
  b.toLocaleDateString('en-US', { timeZone: timezone })

const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: timezone,
  })

const formatTime = (d: Date) =>
  d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
  })

function formatPricePerPerson(numeric: number | null): string | undefined {
  if (numeric !== null && Number.isFinite(numeric)) return `$${numeric}`
  return undefined
}

function buildEventClientId(row: CmsEventRow): string {
  const raw = `${row.title || 'event'}-${row.start_at || 'undated'}`
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function serializeEventForApi(row: CmsEventRow): ApiEventItem {
  const start = isValidDate(row.start_at) ? new Date(row.start_at) : undefined
  const end = isValidDate(row.end_at) ? new Date(row.end_at) : undefined

  let date = ''
  let time: string | undefined
  let status: 'upcoming' | 'past' | string = 'upcoming'

  if (start) {
    const comparePoint = end ?? start
    status = comparePoint.getTime() < Date.now() ? 'past' : 'upcoming'

    if (end && !sameDay(start, end)) {
      date = `${formatDate(start)} - ${formatDate(end)}`
      time = undefined
    } else {
      date = formatDate(start)
      if (end && start.getTime() !== end.getTime()) {
        time = `${formatTime(start)} - ${formatTime(end)}`
      } else {
        time = formatTime(start)
      }
    }
  }

  let capacity: string | undefined
  if (row.all_guests) {
    capacity = 'All guests'
  } else if (row.guest_limit !== null && Number.isFinite(row.guest_limit)) {
    capacity = `${row.guest_limit} guests`
  }

  return {
    id: buildEventClientId(row),
    title: row.title,
    start_at: row.start_at || null,
    date,
    time,
    capacity,
    price: formatPricePerPerson(row.price_per_person),
    description: row.description || undefined,
    image: row.image_url || undefined,
    status,
    url: row.booking_url || undefined,
  }
}

export function serializeMenuItemForApi(row: CmsMenuRow): ApiMenuItem {
  const tags = (row.tags || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
  const meal = (row.meal || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
  const price = row.price?.trim() || ''

  return {
    id: `${row.item_name}::${row.course}`.toLowerCase().replace(/\s+/g, '-'),
    name: row.item_name,
    description: row.description || '',
    price,
    tags,
    course: row.course || '',
    meal,
    photo: row.image_url || undefined,
    featured: tags.includes('Featured'),
  }
}
