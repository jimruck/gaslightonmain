import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminApiSession } from '@/lib/auth/adminApi'
import {
  deleteEventFromDb,
  getAdminEventsFromDb,
  upsertEventInDb,
} from '@/lib/db/cmsRepository'

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  start_at: z.string().nullable().optional(),
  end_at: z.string().nullable().optional(),
  all_guests: z.boolean().optional(),
  guest_limit: z.number().int().nullable().optional(),
  price_per_person: z.number().nullable().optional(),
  booking_url: z
    .string()
    .max(2048)
    .nullable()
    .optional()
    .transform((v) => (v === '' ? null : v)),
  image_url: z
    .string()
    .max(2048)
    .nullable()
    .optional()
    .transform((v) => (v === '' ? null : v)),
  match_title: z.string().optional(),
  match_start_at: z.string().nullable().optional(),
})

const eventDeleteSchema = z.object({
  match_title: z.string().min(1, 'Missing match_title'),
  match_start_at: z.string().nullable(),
})

export async function GET() {
  const auth = await requireAdminApiSession()
  if (!auth.ok) return auth.response

  try {
    const events = await getAdminEventsFromDb()
    return NextResponse.json({ events })
  } catch (error: any) {
    console.error('Admin events GET error:', error)
    return NextResponse.json({ error: 'Failed to load events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApiSession()
  if (!auth.ok) return auth.response

  try {
    const body = await request.json()
    const parsed = eventSchema.parse(body)
    await upsertEventInDb({
      ...parsed,
      booking_url: parsed.booking_url || null,
      image_url: parsed.image_url || null,
    })
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Invalid payload' }, { status: 400 })
    }
    console.error('Admin events POST error:', error)
    return NextResponse.json({ error: 'Failed to save event' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdminApiSession()
  if (!auth.ok) return auth.response

  try {
    const body = await request.json()
    const parsed = eventDeleteSchema.parse(body)
    await deleteEventFromDb(parsed.match_title, parsed.match_start_at)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Invalid payload' }, { status: 400 })
    }
    console.error('Admin events DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}
