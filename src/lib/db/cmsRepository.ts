import 'server-only'

import { createSupabaseServiceRoleClient } from '@/lib/supabase/server'
import type {
  CmsEventRow,
  CmsEventWriteInput,
  CmsMenuRow,
  CmsMenuWriteInput,
} from '@/lib/cms/types'

const eventSelect = `
  title,
  description,
  start_at,
  end_at,
  all_guests,
  guest_limit,
  price_per_person,
  booking_url,
  image_url
`

const menuSelect = `
  item_name,
  description,
  meal,
  course,
  price,
  tags,
  image_url
`

export async function getPublicEventsFromDb(): Promise<CmsEventRow[]> {
  const supabase = createSupabaseServiceRoleClient()
  const { data, error } = await supabase
    .from('events')
    .select(eventSelect)
    .order('start_at', { ascending: true, nullsFirst: false })
    .order('title', { ascending: true })

  if (error) throw new Error(`Failed to load events from database: ${error.message}`)
  if (process.env.LOG_CMS_DB_READS === '1') {
    console.info(`[cms-db] public events read count=${(data || []).length} at ${new Date().toISOString()}`)
  }
  return (data || []) as CmsEventRow[]
}

export async function getPublicMenuItemsFromDb(): Promise<CmsMenuRow[]> {
  const supabase = createSupabaseServiceRoleClient()
  const { data, error } = await supabase
    .from('menu_items')
    .select(menuSelect)
    .order('course', { ascending: true })
    .order('item_name', { ascending: true })

  if (error) throw new Error(`Failed to load menu from database: ${error.message}`)
  if (process.env.LOG_CMS_DB_READS === '1') {
    console.info(`[cms-db] public menu read count=${(data || []).length} at ${new Date().toISOString()}`)
  }
  return (data || []) as CmsMenuRow[]
}

export async function getAdminEventsFromDb(): Promise<CmsEventRow[]> {
  const supabase = createSupabaseServiceRoleClient()
  const { data, error } = await supabase
    .from('events')
    .select(eventSelect)
    .order('start_at', { ascending: true, nullsFirst: false })
    .order('title', { ascending: true })

  if (error) throw new Error(`Failed to load admin events: ${error.message}`)
  return (data || []) as CmsEventRow[]
}

export async function getAdminMenuItemsFromDb(): Promise<CmsMenuRow[]> {
  const supabase = createSupabaseServiceRoleClient()
  const { data, error } = await supabase
    .from('menu_items')
    .select(menuSelect)
    .order('course', { ascending: true })
    .order('item_name', { ascending: true })

  if (error) throw new Error(`Failed to load admin menu items: ${error.message}`)
  return (data || []) as CmsMenuRow[]
}

export async function upsertEventInDb(input: CmsEventWriteInput): Promise<void> {
  const supabase = createSupabaseServiceRoleClient()
  const payload = {
    title: input.title,
    description: input.description || null,
    start_at: input.start_at || null,
    end_at: input.end_at || null,
    all_guests: Boolean(input.all_guests),
    guest_limit: input.guest_limit ?? null,
    price_per_person: input.price_per_person ?? null,
    booking_url: input.booking_url || null,
    image_url: input.image_url || null,
  }

  if (input.match_title && input.match_start_at !== undefined) {
    let updateQuery = supabase.from('events').update(payload).eq('title', input.match_title)
    updateQuery =
      input.match_start_at === null
        ? updateQuery.is('start_at', null)
        : updateQuery.eq('start_at', input.match_start_at)

    const { data: updatedRows, error: updateError } = await updateQuery.select('title').limit(1)
    if (updateError) throw new Error(`Failed to save event: ${updateError.message}`)
    if ((updatedRows || []).length > 0) return
  }

  const { error: insertError } = await supabase.from('events').insert(payload)
  if (insertError) throw new Error(`Failed to save event: ${insertError.message}`)
}

export async function deleteEventFromDb(matchTitle: string, matchStartAt: string | null): Promise<void> {
  const supabase = createSupabaseServiceRoleClient()
  let deleteQuery = supabase.from('events').delete().eq('title', matchTitle)
  deleteQuery = matchStartAt === null ? deleteQuery.is('start_at', null) : deleteQuery.eq('start_at', matchStartAt)
  const { error } = await deleteQuery
  if (error) throw new Error(`Failed to delete event: ${error.message}`)
}

export async function upsertMenuItemInDb(input: CmsMenuWriteInput): Promise<void> {
  const supabase = createSupabaseServiceRoleClient()
  const tags = input.tags?.trim() || ''
  const meal = input.meal?.trim() || ''
  const payload = {
    item_name: input.item_name.trim(),
    description: input.description || '',
    meal,
    course: input.course || 'Main Courses',
    price: input.price || null,
    tags,
    image_url: input.image_url || null,
  }

  if (input.match_item_name && input.match_course) {
    const { data: updatedRows, error: updateError } = await supabase
      .from('menu_items')
      .update(payload)
      .eq('item_name', input.match_item_name)
      .eq('course', input.match_course)
      .select('item_name')
      .limit(1)

    if (updateError) throw new Error(`Failed to save menu item: ${updateError.message}`)
    if ((updatedRows || []).length > 0) return
  }

  const { error: insertError } = await supabase.from('menu_items').insert(payload)
  if (insertError) throw new Error(`Failed to save menu item: ${insertError.message}`)
}

export async function deleteMenuItemFromDb(itemName: string, course: string): Promise<void> {
  const supabase = createSupabaseServiceRoleClient()
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('item_name', itemName)
    .eq('course', course)
  if (error) throw new Error(`Failed to delete menu item: ${error.message}`)
}
