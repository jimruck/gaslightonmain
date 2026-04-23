import { NextRequest, NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { CMS_EVENTS_CACHE_TAG } from '@/lib/cms/cacheTags'
import { serializeEventForApi } from '@/lib/cms/serializers'
import { getPublicEventsFromDb } from '@/lib/db/cmsRepository'
import { isSupabaseServerConfigured } from '@/lib/supabase/env'

const REVALIDATE_SECONDS = 14400

// Cache this route for 4 hours (14400 seconds) to keep calls stable.
export const revalidate = REVALIDATE_SECONDS

const CACHE_CONTROL_HEADER = `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=60`

const getCachedEvents = unstable_cache(
  async () => {
    const rows = await getPublicEventsFromDb()
    const items = rows.map(serializeEventForApi)
    return { rows, items }
  },
  [CMS_EVENTS_CACHE_TAG],
  { revalidate: REVALIDATE_SECONDS, tags: [CMS_EVENTS_CACHE_TAG] }
)

export async function GET(request: NextRequest) {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json(
      { events: [] },
      { status: 200, headers: { 'Cache-Control': 'no-store', 'X-CMS-Backend': 'unconfigured' } }
    )
  }

  try {
    const { items, rows } = await getCachedEvents()

    const { searchParams } = new URL(request.url)
    const debug = process.env.NODE_ENV !== 'production' && searchParams.get('debug') === '1'
    return NextResponse.json(
      debug ? { events: items, raw: rows } : { events: items },
      { status: 200, headers: { 'Cache-Control': CACHE_CONTROL_HEADER } }
    )
  } catch (error: any) {
    console.error('Events API error:', error?.message || error)
    const details = process.env.NODE_ENV === 'development' ? error?.message : undefined
    return NextResponse.json(
      { error: 'Internal server error', details },
      { status: 500 }
    )
  }
}