import type { AirtableRecord, CmsEventWriteInput, CmsMenuWriteInput } from './types'

type AnyFields = Record<string, any>

function firstString(...values: Array<unknown>): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return undefined
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item.trim() : String(item).trim()))
      .filter(Boolean)
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

function extractAttachmentUrl(photoField: unknown): string | undefined {
  if (!Array.isArray(photoField)) return undefined
  const first = photoField[0] as
    | { url?: string; thumbnails?: { large?: { url?: string }; full?: { url?: string } } }
    | undefined
  if (!first) return undefined
  return first.thumbnails?.large?.url || first.thumbnails?.full?.url || first.url
}

function parseDateString(value?: string): string | null {
  if (!value) return null
  const ms = Date.parse(value)
  if (!Number.isFinite(ms)) return null
  return new Date(ms).toISOString()
}

function parseNumeric(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return null
    const parsed = Number(trimmed.replace(/[$,]/g, ''))
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

export function normalizeAirtableEvent(record: AirtableRecord): CmsEventWriteInput {
  const f = record.fields as AnyFields
  const title = firstString(f['Event Name'], f.Title, f.name) || ''
  const description = firstString(f['Description'], f.description)
  const startAt = parseDateString(firstString(f['Start Date / Time'], f['Start']))
  const endAt = parseDateString(firstString(f['End Date / Time'], f['End']))
  const guestsValue = f['Guest Limit'] ?? f['Guests'] ?? f.GuestLimit ?? f.Guests
  const guestLimit = parseNumeric(guestsValue)
  const allGuestsValue = f['All Guests'] ?? f.all_guests ?? f['All guests']
  const allGuests =
    typeof allGuestsValue === 'boolean'
      ? allGuestsValue
      : typeof allGuestsValue === 'string'
        ? allGuestsValue.trim().toLowerCase() === 'true'
        : typeof guestsValue === 'string' && guestsValue.trim().toLowerCase() === 'all guests'
  const priceValue = f['Price Per Person'] ?? f['Price'] ?? f.PricePerPerson ?? f.Price
  const pricePerPerson = parseNumeric(priceValue)
  const imageUrl =
    extractAttachmentUrl(f['Photo']) || firstString(f.ImageUrl, f.image) || null
  const bookingUrl = firstString(
    f['Booking Link'],
    f['URL'],
    f['Url'],
    f['Link'],
    f['Reservation URL'],
    f['Reservation Link']
  )
  return {
    title,
    description,
    start_at: startAt,
    end_at: endAt,
    all_guests: allGuests,
    guest_limit: allGuests ? null : guestLimit,
    price_per_person: pricePerPerson,
    booking_url: bookingUrl || null,
    image_url: imageUrl,
  }
}

export function normalizeAirtableMenuItem(record: AirtableRecord): CmsMenuWriteInput {
  const f = record.fields as AnyFields
  const itemName = firstString(f['Item Name'], f.name) || ''
  const description = firstString(f['Description'], f.description) || ''
  const course = firstString(f['Course'], f.course) || ''
  const rawMeal = f['Meal'] || f['Meal Type'] || f['Meal Time'] || f['Service'] || f.meal || ''
  const meal = asStringArray(rawMeal).join(', ')
  const rawTags = f['Tags'] || f.tags || []
  const tags = asStringArray(rawTags).join(', ')
  const priceValue = f['Price'] ?? f.Price
  const priceNumeric = parseNumeric(priceValue)
  const price =
    typeof priceValue === 'string' && priceValue.trim()
      ? priceValue.trim()
      : priceNumeric !== null
        ? `${priceNumeric}`
        : null
  const imageUrl = extractAttachmentUrl(f['Photo']) || null

  return {
    item_name: itemName,
    description,
    course,
    meal,
    tags,
    price,
    image_url: imageUrl,
  }
}
