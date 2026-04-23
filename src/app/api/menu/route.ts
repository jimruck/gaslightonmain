import { unstable_cache } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import type { ApiMenuItem } from '@/lib/cms/types'
import { serializeMenuItemForApi } from '@/lib/cms/serializers'
import { getPublicMenuItemsFromDb } from '@/lib/db/cmsRepository'
import { isSupabaseServerConfigured } from '@/lib/supabase/env'

const REVALIDATE_SECONDS = 14400

// Cache this route for 4 hours (14400 seconds) to keep calls stable.
export const revalidate = REVALIDATE_SECONDS

const CACHE_CONTROL_HEADER = `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=60`

const getCachedMenuItems = unstable_cache(
  async () => {
    const rows = await getPublicMenuItemsFromDb()
    const items = rows.map(serializeMenuItemForApi)
    return { rows, items }
  },
  ['cms-menu'],
  { revalidate: REVALIDATE_SECONDS }
)

export async function GET(request: NextRequest) {
  if (!isSupabaseServerConfigured()) {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === '1'
    const empty = featured
      ? { items: [] as ApiMenuItem[] }
      : { sections: {} as Record<string, ApiMenuItem[]>, items: [] as ApiMenuItem[] }
    return NextResponse.json(empty, {
      status: 200,
      headers: { 'Cache-Control': 'no-store', 'X-CMS-Backend': 'unconfigured' },
    })
  }

  try {
    const { rows, items } = await getCachedMenuItems()

    const sections = items.reduce((acc, item) => {
      const course = item.course || 'Other'
      if (!acc[course]) {
        acc[course] = []
      }
      acc[course].push(item)
      return acc
    }, {} as Record<string, ApiMenuItem[]>)

    const { searchParams } = new URL(request.url)
    const debug = process.env.NODE_ENV !== 'production' && searchParams.get('debug') === '1'
    const featured = searchParams.get('featured') === '1'

    if (featured) {
      const featuredItems = items.filter((item) => item.featured)
      return NextResponse.json(
        debug ? { items: featuredItems, raw: rows } : { items: featuredItems },
        { status: 200, headers: { 'Cache-Control': CACHE_CONTROL_HEADER } }
      )
    }

    return NextResponse.json(
      debug ? { sections, items, raw: rows } : { sections, items },
      { status: 200, headers: { 'Cache-Control': CACHE_CONTROL_HEADER } }
    )
  } catch (error: any) {
    console.error('Menu API error:', error?.message || error)
    const details = process.env.NODE_ENV === 'development' ? error?.message : undefined
    return NextResponse.json(
      { error: 'Internal server error', details },
      { status: 500 }
    )
  }
}
