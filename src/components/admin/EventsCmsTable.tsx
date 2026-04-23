'use client'

import { useEffect, useMemo, useState } from 'react'
import type { CmsEventRow } from '@/lib/cms/types'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

type EditableEventRow = CmsEventRow & {
  localId: string
  originalTitle: string
  originalStartAt: string | null
  isNew: boolean
  localStartAt: string
  localEndAt: string
}

const emptyNewRow = (): EditableEventRow => ({
  localId: `new-${crypto.randomUUID()}`,
  originalTitle: '',
  originalStartAt: null,
  isNew: true,
  title: '',
  description: '',
  start_at: null,
  end_at: null,
  all_guests: true,
  guest_limit: null,
  price_per_person: null,
  booking_url: '',
  image_url: '',
  localStartAt: '',
  localEndAt: '',
})

const toLocalDateTimeInput = (value?: string | null): string => {
  if (!value) return ''
  const d = new Date(value)
  if (!Number.isFinite(d.getTime())) return ''
  const pad = (num: number) => String(num).padStart(2, '0')
  const y = d.getFullYear()
  const m = pad(d.getMonth() + 1)
  const day = pad(d.getDate())
  const h = pad(d.getHours())
  const min = pad(d.getMinutes())
  return `${y}-${m}-${day}T${h}:${min}`
}

const fromLocalDateTimeInput = (value: string): string | null => {
  if (!value.trim()) return null
  const d = new Date(value)
  if (!Number.isFinite(d.getTime())) return null
  return d.toISOString()
}

function toEditableRow(row: CmsEventRow): EditableEventRow {
  return {
    ...row,
    localId: crypto.randomUUID(),
    originalTitle: row.title,
    originalStartAt: row.start_at,
    isNew: false,
    localStartAt: toLocalDateTimeInput(row.start_at),
    localEndAt: toLocalDateTimeInput(row.end_at),
  }
}

type EventSortKey = 'title' | 'start'
const EVENT_IMAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_EVENTS_IMAGES_BUCKET?.trim() || 'event-images'
const EVENTS_LAST_UPDATED_STORAGE_KEY = 'admin-events-last-updated-at'
const GUEST_OPTIONS = ['All', ...Array.from({ length: 99 }, (_, index) => String(index + 1))]

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const getImageButtonLabel = (imageUrl?: string | null) => {
  if (!imageUrl) return 'Upload Image'
  try {
    const pathname = new URL(imageUrl).pathname
    const filename = decodeURIComponent(pathname.split('/').pop() || '').trim()
    return filename || 'Replace Image'
  } catch {
    const filename = decodeURIComponent((imageUrl || '').split('/').pop() || '').trim()
    return filename || 'Replace Image'
  }
}

export function EventsCmsTable() {
  const [rows, setRows] = useState<EditableEventRow[]>([])
  const [loading, setLoading] = useState(true)
  const [isSavingAll, setIsSavingAll] = useState(false)
  const [uploadingRowId, setUploadingRowId] = useState<string | null>(null)
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<EventSortKey>('start')

  const displayRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      const as = a.start_at || ''
      const bs = b.start_at || ''
      return as.localeCompare(bs) || a.title.localeCompare(b.title)
    })
  }, [rows, sortBy])

  useEffect(() => {
    const savedTimestamp = window.localStorage.getItem(EVENTS_LAST_UPDATED_STORAGE_KEY)
    if (savedTimestamp) {
      const parsedDate = new Date(savedTimestamp)
      if (Number.isFinite(parsedDate.getTime())) {
        setLastUpdatedAt(parsedDate)
      }
    }

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/admin/events')
        if (!res.ok) throw new Error(`Failed to load events (${res.status})`)
        const data = await res.json()
        setRows((data.events || []).map((row: CmsEventRow) => toEditableRow(row)))
      } catch (err: any) {
        setError(err?.message || 'Unable to load events.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const updateRow = (id: string, patch: Partial<EditableEventRow>) => {
    setRows((current) => current.map((row) => (row.localId === id ? { ...row, ...patch } : row)))
  }

  const uploadImageForRow = async (row: EditableEventRow, file: File) => {
    setUploadingRowId(row.localId)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createSupabaseBrowserClient()
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const safeTitle = slugify(row.title || 'event')
      const filePath = `events/${safeTitle}-${Date.now()}-${crypto.randomUUID()}.${extension}`

      const { error: uploadError } = await supabase.storage
        .from(EVENT_IMAGE_BUCKET)
        .upload(filePath, file, { cacheControl: '3600', upsert: false, contentType: file.type || undefined })

      if (uploadError) {
        throw new Error(uploadError.message)
      }

      const { data: publicUrlData } = supabase.storage.from(EVENT_IMAGE_BUCKET).getPublicUrl(filePath)
      const publicUrl = publicUrlData?.publicUrl
      if (!publicUrl) {
        throw new Error('Upload succeeded but no public URL was returned.')
      }

      updateRow(row.localId, { image_url: publicUrl })
      setSuccess(`Image uploaded for "${row.title || 'event'}". Click Save to publish changes.`)
    } catch (err: any) {
      setError(
        err?.message ||
          `Unable to upload image. Make sure the "${EVENT_IMAGE_BUCKET}" storage bucket exists and upload is allowed.`
      )
    } finally {
      setUploadingRowId(null)
    }
  }

  const saveAllRows = async () => {
    if (rows.some((row) => !row.title.trim())) {
      setError('Each row must include a Title before saving.')
      setSuccess(null)
      return
    }

    setIsSavingAll(true)
    setError(null)
    setSuccess(null)
    try {
      for (const row of rows) {
        const payload = {
          match_title: row.isNew ? undefined : row.originalTitle,
          match_start_at: row.isNew ? undefined : row.originalStartAt,
          title: row.title,
          description: row.description || '',
          start_at: fromLocalDateTimeInput(row.localStartAt),
          end_at: fromLocalDateTimeInput(row.localEndAt),
          all_guests: row.all_guests,
          guest_limit: row.all_guests ? null : row.guest_limit,
          price_per_person: row.price_per_person,
          booking_url: row.booking_url || null,
          image_url: row.image_url || null,
        }

        const res = await fetch('/api/admin/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || `Failed to save event (${res.status})`)
        }
      }

      const refreshed = await fetch('/api/admin/events')
      const refreshedJson = await refreshed.json()
      setRows((refreshedJson.events || []).map((item: CmsEventRow) => toEditableRow(item)))
      const now = new Date()
      setLastUpdatedAt(now)
      window.localStorage.setItem(EVENTS_LAST_UPDATED_STORAGE_KEY, now.toISOString())
      setSuccess('Event updates saved.')
    } catch (err: any) {
      setError(err?.message || 'Unable to save event changes.')
    } finally {
      setIsSavingAll(false)
    }
  }

  const deleteRow = async (row: EditableEventRow) => {
    setError(null)
    setSuccess(null)
    if (row.isNew) {
      setRows((current) => current.filter((entry) => entry.localId !== row.localId))
      return
    }

    try {
      const res = await fetch('/api/admin/events', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          match_title: row.originalTitle,
          match_start_at: row.originalStartAt,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Failed to delete event (${res.status})`)
      }
      setRows((current) => current.filter((entry) => entry.localId !== row.localId))
      setSuccess(`Deleted "${row.title}".`)
    } catch (err: any) {
      setError(err?.message || 'Unable to delete event.')
    }
  }

  const addRow = () => {
    setRows((current) => [emptyNewRow(), ...current])
  }

  if (loading) {
    return <div style={{ color: '#f2f2f2' }}>Loading events...</div>
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded border border-red-400/70 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded border border-emerald-500/70 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-200">
          {success}
        </div>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="w-full sm:w-48">
            <label className="block text-xs mb-1" style={{ color: '#CCBB98' }}>
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as EventSortKey)}
              className="w-full bg-gray-dark border border-gray-500 rounded px-3 py-2 text-white text-sm"
            >
              <option value="title">Title (A–Z)</option>
              <option value="start">Start date</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-stretch sm:items-end gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: '#f2f2f2' }}>
              Last Updated: {lastUpdatedAt ? lastUpdatedAt.toLocaleString() : 'Not saved yet'}
            </span>
            <button
              type="button"
              onClick={saveAllRows}
              disabled={isSavingAll}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-70"
            >
              {isSavingAll ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={addRow} className="btn-primary text-sm px-4 py-2">
              Add Event
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-500 rounded-lg">
        <table className="min-w-[1200px] w-full text-sm">
          <thead className="bg-gray-medium">
            <tr>
              {[
                'Title',
                'Description',
                'Start',
                'End',
                'Guests',
                'Price / Person',
                'Booking URL',
                'Image URL',
                'Delete',
              ].map((label) => (
                <th key={label} className="text-left px-3 py-2 border-b border-gray-500" style={{ color: '#CCBB98' }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row) => (
              <tr key={row.localId} className="align-top border-b border-gray-500/50">
                <td className="p-2">
                  <input
                    value={row.title}
                    onChange={(event) => updateRow(row.localId, { title: event.target.value })}
                    className="w-44 bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <input
                    value={row.description || ''}
                    onChange={(event) => updateRow(row.localId, { description: event.target.value })}
                    className="w-56 bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="datetime-local"
                    value={row.localStartAt}
                    onChange={(event) => updateRow(row.localId, { localStartAt: event.target.value })}
                    className="w-48 bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="datetime-local"
                    value={row.localEndAt}
                    onChange={(event) => updateRow(row.localId, { localEndAt: event.target.value })}
                    className="w-48 bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <select
                    value={row.all_guests || row.guest_limit === null ? 'All' : String(row.guest_limit)}
                    onChange={(event) => {
                      const value = event.target.value
                      updateRow(row.localId, {
                        all_guests: value === 'All',
                        guest_limit: value === 'All' ? null : Number(value),
                      })
                    }}
                    className="w-28 bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                  >
                    {GUEST_OPTIONS.map((guestOption) => (
                      <option key={guestOption} value={guestOption}>
                        {guestOption}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={row.price_per_person ?? ''}
                    onChange={(event) => {
                      const value = event.target.value
                      updateRow(row.localId, { price_per_person: value === '' ? null : Number(value) })
                    }}
                    className="w-28 bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                    placeholder="125"
                  />
                </td>
                <td className="p-2">
                  <input
                    value={row.booking_url || ''}
                    onChange={(event) => updateRow(row.localId, { booking_url: event.target.value })}
                    className="w-56 bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <label
                    className="w-56 text-xs text-center px-2 py-1 rounded border border-gray-500 text-white cursor-pointer hover:bg-gray-medium truncate block"
                    title={getImageButtonLabel(row.image_url)}
                  >
                    {uploadingRowId === row.localId ? 'Uploading...' : getImageButtonLabel(row.image_url)}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="hidden"
                      disabled={uploadingRowId === row.localId}
                      onChange={(event) => {
                        const file = event.target.files?.[0]
                        if (file) {
                          void uploadImageForRow(row, file)
                        }
                        event.currentTarget.value = ''
                      }}
                    />
                  </label>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => deleteRow(row)}
                    className="px-3 py-1 rounded border border-red-400 text-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
