import './load-env'
import { createClient } from '@supabase/supabase-js'
import { normalizeAirtableEvent, normalizeAirtableMenuItem } from '../src/lib/cms/normalizers'
import type { AirtableRecord } from '../src/lib/cms/types'

type AirtableListResponse = {
  records?: AirtableRecord[]
  offset?: string
}

const required = (name: string): string => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value.trim()
}

const AIRTABLE_API_URL = 'https://api.airtable.com/v0'

async function fetchAllAirtableRecords(tableName: string): Promise<AirtableRecord[]> {
  const baseId = required('AIRTABLE_BASE_ID')
  const apiKey = required('AIRTABLE_API_KEY')
  const records: AirtableRecord[] = []
  let offset: string | undefined

  do {
    const url = new URL(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`)
    url.searchParams.set('pageSize', '100')
    if (offset) url.searchParams.set('offset', offset)

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Airtable fetch failed (${res.status}) for ${tableName}: ${text}`)
    }
    const json = (await res.json()) as AirtableListResponse
    records.push(...(json.records || []))
    offset = json.offset
  } while (offset)

  return records
}

async function main() {
  const supabase = createClient(required('NEXT_PUBLIC_SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const db = supabase as any

  const [airtableEvents, airtableMenu] = await Promise.all([
    fetchAllAirtableRecords(required('AIRTABLE_EVENTS_TABLE')),
    fetchAllAirtableRecords(required('AIRTABLE_MENU_TABLE')),
  ])

  const normalizedEvents = airtableEvents.map((record) => normalizeAirtableEvent(record))
  const normalizedMenu = airtableMenu.map((record) => normalizeAirtableMenuItem(record))

  const [{ data: dbEvents, error: dbEventsError }, { data: dbMenu, error: dbMenuError }] = await Promise.all([
    db.from('events').select('title,start_at'),
    db.from('menu_items').select('item_name,course'),
  ])
  if (dbEventsError) throw new Error(`Failed to load DB events: ${dbEventsError.message}`)
  if (dbMenuError) throw new Error(`Failed to load DB menu: ${dbMenuError.message}`)

  const dbEventKeySet = new Set(
    ((dbEvents || []) as any[]).map((entry: any) => `${entry.title || ''}__${entry.start_at || ''}`)
  )
  const airtableEventKeySet = new Set(
    normalizedEvents.map((entry) => `${entry.title || ''}__${entry.start_at || ''}`)
  )
  const dbMenuKeySet = new Set(
    ((dbMenu || []) as any[]).map((entry: any) => `${entry.item_name || ''}__${entry.course || ''}`)
  )

  const missingEvents = normalizedEvents.filter(
    (entry) => !dbEventKeySet.has(`${entry.title || ''}__${entry.start_at || ''}`)
  )
  const extraEvents = ((dbEvents || []) as any[]).filter(
    (entry: any) => !airtableEventKeySet.has(`${entry.title || ''}__${entry.start_at || ''}`)
  )
  const missingMenu = normalizedMenu.filter(
    (entry) => !dbMenuKeySet.has(`${entry.item_name || ''}__${entry.course || ''}`)
  )

  const mismatchedEventTitles = normalizedEvents.filter(
    (entry) => !((dbEvents || []) as any[]).some((dbRow: any) => dbRow.title === entry.title)
  )

  const mismatchedMenuNames: string[] = []

  console.log('--- CMS Parity Check ---')
  console.log(`Airtable events: ${airtableEvents.length}`)
  console.log(`DB events: ${(dbEvents || []).length}`)
  console.log(`Missing DB events by title/start_at: ${missingEvents.length}`)
  console.log(`Extra DB events by title/start_at: ${extraEvents.length}`)
  console.log(`Event title mismatches: ${mismatchedEventTitles.length}`)
  console.log(`Airtable menu items: ${airtableMenu.length}`)
  console.log(`DB menu items: ${(dbMenu || []).length}`)
  console.log(`Missing DB menu items by item_name/course: ${missingMenu.length}`)
  console.log(`Menu name mismatches: ${mismatchedMenuNames.length}`)

  if (
    missingEvents.length > 0 ||
    extraEvents.length > 0 ||
    missingMenu.length > 0 ||
    mismatchedEventTitles.length > 0 ||
    mismatchedMenuNames.length > 0
  ) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
