'use client'

import { useEffect, useState } from 'react'

const MESSAGE_MAX = 85

type AnnouncementRow = {
  id: string
  message: string
  expires_at: string
  is_active: boolean
  created_at: string
  updated_at: string
}

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

const makeNewRow = () => ({
  localId: `new-${crypto.randomUUID()}`,
  id: undefined as string | undefined,
  message: '',
  expiresAtLocal: '',
  isActive: false,
})

type EditableAnnouncementRow = ReturnType<typeof makeNewRow> | {
  localId: string
  id: string
  message: string
  expiresAtLocal: string
  isActive: boolean
}

export function AnnouncementEditor() {
  const [rows, setRows] = useState<EditableAnnouncementRow[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/admin/announcement')
        if (!res.ok) throw new Error(`Failed to load announcement (${res.status})`)
        const data = await res.json()
        const announcements = (data.announcements || []) as AnnouncementRow[]
        setRows(
          announcements.map((entry) => ({
            localId: entry.id,
            id: entry.id,
            message: entry.message || '',
            expiresAtLocal: toLocalDateTimeInput(entry.expires_at),
            isActive: Boolean(entry.is_active),
          }))
        )
      } catch (err: any) {
        setError(err?.message || 'Unable to load announcement settings.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const updateRow = (localId: string, patch: Partial<EditableAnnouncementRow>) => {
    setRows((current) =>
      current.map((row) => {
        if (row.localId !== localId) return row
        return { ...row, ...patch }
      })
    )
  }

  const toggleActive = (localId: string, nextValue: boolean) => {
    setRows((current) =>
      current.map((row) => ({
        ...row,
        isActive: row.localId === localId ? nextValue : false,
      }))
    )
  }

  const saveAll = async () => {
    setError(null)
    setSuccess(null)

    if (rows.length === 0) {
      setError('Add at least one announcement before saving.')
      return
    }
    if (rows.filter((row) => row.isActive).length > 1) {
      setError('Only one announcement can be toggled on at a time.')
      return
    }

    const nowMs = Date.now()
    for (const row of rows) {
      if (!row.message.trim()) {
        setError('Each announcement needs a message.')
        return
      }
      const expiresAtIso = fromLocalDateTimeInput(row.expiresAtLocal)
      if (!expiresAtIso) {
        setError('Each announcement needs an expire date and time.')
        return
      }
      const expiryMs = Date.parse(expiresAtIso)
      if (!Number.isFinite(expiryMs) || expiryMs <= nowMs) {
        setError('Expire date and time must be later than the current time.')
        return
      }
    }

    setIsSaving(true)
    try {
      const inactiveRows = rows.filter((row) => !row.isActive)
      const activeRows = rows.filter((row) => row.isActive)
      const saveOrder = [...inactiveRows, ...activeRows]

      for (const row of saveOrder) {
        const expiresAtIso = fromLocalDateTimeInput(row.expiresAtLocal)
        const res = await fetch('/api/admin/announcement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: row.id,
            message: row.message.trim(),
            expires_at: expiresAtIso,
            is_active: row.isActive,
          }),
        })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || `Failed to save announcement (${res.status})`)
        }
      }

      const refreshed = await fetch('/api/admin/announcement')
      const refreshedJson = await refreshed.json()
      const savedRows = (refreshedJson.announcements || []) as AnnouncementRow[]
      setRows(
        savedRows.map((entry) => ({
          localId: entry.id,
          id: entry.id,
          message: entry.message || '',
          expiresAtLocal: toLocalDateTimeInput(entry.expires_at),
          isActive: Boolean(entry.is_active),
        }))
      )
      setSuccess('Announcements saved.')
    } catch (err: any) {
      setError(err?.message || 'Unable to save announcements.')
    } finally {
      setIsSaving(false)
    }
  }

  const addRow = () => {
    setRows((current) => [makeNewRow(), ...current])
  }

  const deleteRow = async (row: EditableAnnouncementRow) => {
    setError(null)
    setSuccess(null)
    if (!row.id) {
      setRows((current) => current.filter((entry) => entry.localId !== row.localId))
      return
    }

    try {
      const res = await fetch(`/api/admin/announcement?id=${encodeURIComponent(row.id)}`, { method: 'DELETE' })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Failed to delete announcement (${res.status})`)
      }
      setRows((current) => current.filter((entry) => entry.localId !== row.localId))
      setSuccess('Announcement deleted.')
    } catch (err: any) {
      setError(err?.message || 'Unable to delete announcement.')
    }
  }

  if (loading) {
    return <div style={{ color: '#f2f2f2' }}>Loading announcement settings...</div>
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

      <div className="flex items-center justify-between">
        <p className="text-xs" style={{ color: '#f2f2f2' }}>
          Toggle one announcement on at a time.
        </p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={addRow} className="btn-primary text-sm px-4 py-2">
            Add Announcement
          </button>
          <button
            type="button"
            onClick={saveAll}
            disabled={isSaving}
            className="btn-primary text-sm px-4 py-2 disabled:opacity-70"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-500 rounded-lg">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-medium">
            <tr>
              {['Message', 'Expires At', 'On', 'Delete'].map((label) => (
                <th key={label} className="text-left px-3 py-2 border-b border-gray-500" style={{ color: '#CCBB98' }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.localId} className="align-top border-b border-gray-500/50">
                <td className="p-2">
                  <div className="space-y-1">
                    <input
                      value={row.message}
                      onChange={(event) =>
                        updateRow(row.localId, { message: event.target.value.slice(0, MESSAGE_MAX) })
                      }
                      className="w-full bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                      placeholder="Due to inclement weather, please call to check our hours."
                    />
                    <p className="text-xs" style={{ color: '#f2f2f2' }}>
                      {MESSAGE_MAX - row.message.length} characters left
                    </p>
                  </div>
                </td>
                <td className="p-2">
                  <input
                    type="datetime-local"
                    value={row.expiresAtLocal}
                    onChange={(event) => updateRow(row.localId, { expiresAtLocal: event.target.value })}
                    className="w-64 bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={row.isActive}
                    onChange={(event) => toggleActive(row.localId, event.target.checked)}
                    className="h-4 w-4"
                  />
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
