import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminApiSession } from '@/lib/auth/adminApi'
import {
  deleteAnnouncementFromDb,
  getAdminAnnouncementsFromDb,
  upsertAnnouncementInDb,
} from '@/lib/db/announcementRepository'

const announcementSchema = z.object({
  id: z.string().uuid().optional(),
  message: z.string().min(1, 'Message is required').max(85, 'Message must be 85 characters or less'),
  expires_at: z.string().min(1, 'Expire date and time is required'),
  is_active: z.boolean().optional().default(false),
})

export async function GET() {
  const auth = await requireAdminApiSession()
  if (!auth.ok) return auth.response

  try {
    const announcements = await getAdminAnnouncementsFromDb()
    return NextResponse.json({ announcements })
  } catch (error: any) {
    console.error('Admin announcement GET error:', error)
    return NextResponse.json({ error: 'Failed to load announcement' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApiSession()
  if (!auth.ok) return auth.response

  try {
    const body = await request.json()
    const parsed = announcementSchema.parse(body)
    const expiryMs = Date.parse(parsed.expires_at)
    if (!Number.isFinite(expiryMs) || expiryMs <= Date.now()) {
      return NextResponse.json(
        { error: 'Expire date and time must be later than the current time.' },
        { status: 400 }
      )
    }
    await upsertAnnouncementInDb(parsed)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Invalid payload' }, { status: 400 })
    }
    console.error('Admin announcement POST error:', error)
    return NextResponse.json({ error: 'Failed to save announcement' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdminApiSession()
  if (!auth.ok) return auth.response

  const id = request.nextUrl.searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  try {
    await deleteAnnouncementFromDb(id)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error('Admin announcement DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 })
  }
}
