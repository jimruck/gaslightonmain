import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminApiSession } from '@/lib/auth/adminApi'
import {
  deleteMenuItemFromDb,
  getAdminMenuItemsFromDb,
  upsertMenuItemInDb,
} from '@/lib/db/cmsRepository'

const menuSchema = z.object({
  item_name: z.string().min(1, 'Item name is required'),
  description: z.string().optional(),
  meal: z.string().optional(),
  course: z.string().min(1, 'Course is required'),
  price: z.string().nullable().optional(),
  tags: z.string().optional(),
  image_url: z
    .string()
    .max(2048)
    .nullable()
    .optional()
    .transform((v) => (v === '' ? null : v)),
  match_item_name: z.string().optional(),
  match_course: z.string().optional(),
})

export async function GET() {
  const auth = await requireAdminApiSession()
  if (!auth.ok) return auth.response

  try {
    const items = await getAdminMenuItemsFromDb()
    return NextResponse.json({ items })
  } catch (error: any) {
    console.error('Admin menu GET error:', error)
    return NextResponse.json({ error: 'Failed to load menu items' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApiSession()
  if (!auth.ok) return auth.response

  try {
    const body = await request.json()
    const parsed = menuSchema.parse(body)
    await upsertMenuItemInDb({
      ...parsed,
      image_url: parsed.image_url || null,
    })
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Invalid payload' }, { status: 400 })
    }
    console.error('Admin menu POST error:', error)
    return NextResponse.json({ error: 'Failed to save menu item' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdminApiSession()
  if (!auth.ok) return auth.response

  const itemName = request.nextUrl.searchParams.get('item_name')
  const course = request.nextUrl.searchParams.get('course')
  if (!itemName || !course) {
    return NextResponse.json({ error: 'Missing item_name or course' }, { status: 400 })
  }

  try {
    await deleteMenuItemFromDb(itemName, course)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error('Admin menu DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 })
  }
}
