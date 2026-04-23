import { NextResponse } from 'next/server'
import { getLatestActiveAnnouncementFromDb } from '@/lib/db/announcementRepository'
import { isSupabaseServerConfigured } from '@/lib/supabase/env'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json(
      { announcement: null },
      { status: 200, headers: { 'Cache-Control': 'no-store', 'X-CMS-Backend': 'unconfigured' } }
    )
  }

  try {
    const announcement = await getLatestActiveAnnouncementFromDb()
    return NextResponse.json(
      { announcement },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error: any) {
    console.error('Announcement API error:', error?.message || error)
    const details = process.env.NODE_ENV === 'development' ? error?.message : undefined
    return NextResponse.json(
      { error: 'Internal server error', details },
      { status: 500 }
    )
  }
}
