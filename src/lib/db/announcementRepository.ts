import 'server-only'

import { createSupabaseServiceRoleClient } from '@/lib/supabase/server'

export type SiteAnnouncementRow = {
  id: string
  message: string
  expires_at: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export async function getAdminAnnouncementsFromDb(): Promise<SiteAnnouncementRow[]> {
  const supabase = createSupabaseServiceRoleClient()
  const { data, error } = await supabase
    .from('site_announcements')
    .select('id,message,expires_at,is_active,created_at,updated_at')
    .order('updated_at', { ascending: false })

  if (error) throw new Error(`Failed to load site announcements: ${error.message}`)
  return (data || []) as SiteAnnouncementRow[]
}

export async function getLatestActiveAnnouncementFromDb(): Promise<SiteAnnouncementRow | null> {
  const supabase = createSupabaseServiceRoleClient()
  const nowIso = new Date().toISOString()
  const { data, error } = await supabase
    .from('site_announcements')
    .select('id,message,expires_at,is_active,created_at,updated_at')
    .eq('is_active', true)
    .gt('expires_at', nowIso)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw new Error(`Failed to load active announcement: ${error.message}`)
  return (data || null) as SiteAnnouncementRow | null
}

export async function upsertAnnouncementInDb(input: {
  id?: string
  message: string
  expires_at: string
  is_active: boolean
}): Promise<void> {
  const supabase = createSupabaseServiceRoleClient()
  const payload = {
    message: input.message.trim(),
    expires_at: input.expires_at,
    is_active: input.is_active,
  }

  if (input.is_active) {
    let clearQuery = supabase.from('site_announcements').update({ is_active: false })
    if (input.id) {
      clearQuery = clearQuery.neq('id', input.id)
    }
    const { error: clearError } = await clearQuery
    if (clearError) throw new Error(`Failed to activate announcement: ${clearError.message}`)
  }

  if (input.id) {
    const { data: updatedRows, error: updateError } = await supabase
      .from('site_announcements')
      .update(payload)
      .eq('id', input.id)
      .select('id')
      .limit(1)
    if (updateError) throw new Error(`Failed to update announcement: ${updateError.message}`)
    if ((updatedRows || []).length > 0) return
  }

  const { error: insertError } = await supabase.from('site_announcements').insert(payload)
  if (insertError) throw new Error(`Failed to save announcement: ${insertError.message}`)
}

export async function deleteAnnouncementFromDb(id: string): Promise<void> {
  const supabase = createSupabaseServiceRoleClient()
  const { error } = await supabase.from('site_announcements').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete announcement: ${error.message}`)
}
