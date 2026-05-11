import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { getLatestActiveAnnouncementFromDb } from '@/lib/db/announcementRepository'
import { isSupabaseServerConfigured } from '@/lib/supabase/env'
import { CMS_ANNOUNCEMENT_CACHE_TAG } from '@/lib/cms/cacheTags'

const REVALIDATE_SECONDS = 300 // 5 minutes
export const revalidate = REVALIDATE_SECONDS
const getCachedAnnouncement = unstable_cache(
  async () => {
    return getLatestActiveAnnouncementFromDb()
  },
  [CMS_ANNOUNCEMENT_CACHE_TAG],
  { revalidate: REVALIDATE_SECONDS, tags: [CMS_ANNOUNCEMENT_CACHE_TAG] }
)

export async function GET() {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json(
      { announcement: null },
      { status: 200, headers: { 'Cache-Control': 'no-store', 'X-CMS-Backend': 'unconfigured' } }
    )
  }

  try {
    const announcement = await getCachedAnnouncement()
    return NextResponse.json(
      { announcement },
      {
        status: 200,
        headers: {
          // CDN-cacheable to prevent excessive Supabase reads.
          'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS}, max-age=0`,
        },
      }
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
