'use client'

import { useEffect, useState } from 'react'
import type { CmsMenuRow } from '@/lib/cms/types'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

type EditableMenuRow = CmsMenuRow & {
  rowKey: string
  match_item_name?: string
  match_course?: string
  tagsText: string
  mealsText: string
}

const COURSE_OPTIONS = ['Main Courses', 'Appetizers and Small Plates', 'Desserts']
const MEAL_OPTIONS = ['Brunch', 'Lunch', 'Dinner']
const TAG_OPTIONS = [
  'Seasonal',
  'Featured',
  'Gluten Free',
  'Vegetarian',
  'Locally Sourced',
  'Vegetarian Available',
  "Chef's Favorite",
]

const emptyNewRow = (): EditableMenuRow => ({
  rowKey: `new-${crypto.randomUUID()}`,
  item_name: '',
  description: '',
  meal: '',
  course: '',
  price: '',
  tags: '',
  image_url: '',
  tagsText: '',
  mealsText: '',
})

function toEditableRow(row: CmsMenuRow, index: number): EditableMenuRow {
  return {
    ...row,
    rowKey: `${row.item_name}::${row.course}::${index}`,
    match_item_name: row.item_name,
    match_course: row.course,
    tagsText: row.tags || '',
    mealsText: row.meal || '',
  }
}

type MenuSortKey = 'a-z' | 'z-a' | 'courses' | 'meals'
const MENU_IMAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_MENU_IMAGES_BUCKET?.trim() || 'menu-images'
const MENU_LAST_UPDATED_STORAGE_KEY = 'admin-menu-last-updated-at'

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

const splitCsv = (value?: string | null) =>
  (value || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

const toggleCsvValue = (current: string, value: string, checked: boolean, orderedOptions: string[]) => {
  const selected = new Set(splitCsv(current))
  if (checked) {
    selected.add(value)
  } else {
    selected.delete(value)
  }
  return orderedOptions.filter((option) => selected.has(option)).join(', ')
}

const sortMenuRows = (inputRows: EditableMenuRow[], sortMode: MenuSortKey) => {
  return [...inputRows].sort((a, b) => {
    const aIsNew = a.rowKey.startsWith('new-')
    const bIsNew = b.rowKey.startsWith('new-')
    if (aIsNew && !bIsNew) return -1
    if (!aIsNew && bIsNew) return 1

    if (sortMode === 'a-z') return a.item_name.localeCompare(b.item_name)
    if (sortMode === 'z-a') return b.item_name.localeCompare(a.item_name)
    if (sortMode === 'courses') {
      return a.course.localeCompare(b.course) || a.item_name.localeCompare(b.item_name)
    }
    return a.mealsText.localeCompare(b.mealsText) || a.item_name.localeCompare(b.item_name)
  })
}

export function MenuCmsTable() {
  const [rows, setRows] = useState<EditableMenuRow[]>([])
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingRowKey, setUploadingRowKey] = useState<string | null>(null)
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [pendingSortBy, setPendingSortBy] = useState<MenuSortKey>('courses')

  const displayRows = rows

  useEffect(() => {
    const savedTimestamp = window.localStorage.getItem(MENU_LAST_UPDATED_STORAGE_KEY)
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
        const res = await fetch('/api/admin/menu')
        if (!res.ok) throw new Error(`Failed to load menu items (${res.status})`)
        const data = await res.json()
        setRows((data.items || []).map((row: CmsMenuRow, index: number) => toEditableRow(row, index)))
      } catch (err: any) {
        setError(err?.message || 'Unable to load menu items.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const updateRow = (rowKey: string, patch: Partial<EditableMenuRow>) => {
    setRows((current) => current.map((row) => (row.rowKey === rowKey ? { ...row, ...patch } : row)))
  }

  const uploadImageForRow = async (row: EditableMenuRow, file: File) => {
    setUploadingRowKey(row.rowKey)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createSupabaseBrowserClient()
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const safeItemName = slugify(row.item_name || 'menu-item')
      const filePath = `menu/${safeItemName}-${Date.now()}-${crypto.randomUUID()}.${extension}`

      const { error: uploadError } = await supabase.storage
        .from(MENU_IMAGE_BUCKET)
        .upload(filePath, file, { cacheControl: '3600', upsert: false, contentType: file.type || undefined })

      if (uploadError) {
        throw new Error(uploadError.message)
      }

      const { data: publicUrlData } = supabase.storage.from(MENU_IMAGE_BUCKET).getPublicUrl(filePath)
      const publicUrl = publicUrlData?.publicUrl
      if (!publicUrl) {
        throw new Error('Upload succeeded but no public URL was returned.')
      }

      updateRow(row.rowKey, { image_url: publicUrl })
      setSuccess(`Image uploaded for "${row.item_name || 'menu item'}". Click Save to publish changes.`)
    } catch (err: any) {
      setError(
        err?.message ||
          `Unable to upload image. Make sure the "${MENU_IMAGE_BUCKET}" storage bucket exists and upload is allowed.`
      )
    } finally {
      setUploadingRowKey(null)
    }
  }

  const saveAllRows = async () => {
    if (rows.some((row) => !row.item_name.trim() || !row.course.trim())) {
      setError('Each row must include both Name and Course before saving.')
      setSuccess(null)
      return
    }

    setIsSaving(true)
    setError(null)
    setSuccess(null)
    try {
      for (const row of rows) {
        const payload = {
          item_name: row.item_name,
          description: row.description || '',
          course: row.course || '',
          price: row.price || null,
          image_url: row.image_url || null,
          tags: row.tagsText,
          meal: row.mealsText,
          match_item_name: row.match_item_name,
          match_course: row.match_course,
        }

        const res = await fetch('/api/admin/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || `Failed to save menu item (${res.status})`)
        }
      }

      const refreshed = await fetch('/api/admin/menu')
      const refreshedJson = await refreshed.json()
      setRows((refreshedJson.items || []).map((item: CmsMenuRow, index: number) => toEditableRow(item, index)))
      const now = new Date()
      setLastUpdatedAt(now)
      window.localStorage.setItem(MENU_LAST_UPDATED_STORAGE_KEY, now.toISOString())
      setSuccess('Menu updates saved.')
    } catch (err: any) {
      setError(err?.message || 'Unable to save menu changes.')
    } finally {
      setIsSaving(false)
    }
  }

  const deleteRow = async (row: EditableMenuRow) => {
    setError(null)
    setSuccess(null)
    if (row.rowKey.startsWith('new-')) {
      setRows((current) => current.filter((entry) => entry.rowKey !== row.rowKey))
      return
    }

    try {
      const res = await fetch(
        `/api/admin/menu?item_name=${encodeURIComponent(row.item_name)}&course=${encodeURIComponent(row.course)}`,
        { method: 'DELETE' }
      )
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Failed to delete menu item (${res.status})`)
      }
      setRows((current) => current.filter((entry) => entry.rowKey !== row.rowKey))
      setSuccess(`Deleted "${row.item_name}".`)
    } catch (err: any) {
      setError(err?.message || 'Unable to delete menu item.')
    }
  }

  const addRow = () => {
    setRows((current) => [emptyNewRow(), ...current])
  }

  if (loading) {
    return <div style={{ color: '#f2f2f2' }}>Loading menu items...</div>
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

      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
          <div>
            <label className="block text-xs mb-1" style={{ color: '#CCBB98' }}>
              Sort by
            </label>
            <div className="flex items-center gap-2">
              <select
                value={pendingSortBy}
                onChange={(e) => setPendingSortBy(e.target.value as MenuSortKey)}
                className="w-full bg-gray-dark border border-gray-500 rounded px-3 py-2 text-white text-sm"
              >
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="courses">Courses</option>
                <option value="meals">Meals</option>
              </select>
              <button
                type="button"
                onClick={() => setRows((current) => sortMenuRows(current, pendingSortBy))}
                className="px-3 py-2 rounded text-sm bg-gray-medium border border-gray-500 text-white hover:border-accent"
              >
                Submit
              </button>
            </div>
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
              disabled={isSaving}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={addRow} className="btn-primary text-sm px-4 py-2">
              Add Menu Item
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-500 rounded-lg">
        <table className="min-w-[1200px] w-full text-sm">
          <thead className="bg-gray-medium">
            <tr>
              {[
                'Name',
                'Description',
                'Course',
                'Price',
                'Meals',
                'Tags',
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
              <tr key={row.rowKey} className="align-top border-b border-gray-500/50">
                <td className="p-2">
                  <input
                    value={row.item_name}
                    onChange={(event) => updateRow(row.rowKey, { item_name: event.target.value })}
                    className="w-48 bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <input
                    value={row.description || ''}
                    onChange={(event) => updateRow(row.rowKey, { description: event.target.value })}
                    className="w-72 bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <select
                    value={row.course}
                    onChange={(event) => updateRow(row.rowKey, { course: event.target.value })}
                    className="w-48 bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                  >
                    <option value="">Select course</option>
                    {COURSE_OPTIONS.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <input
                    value={row.price || ''}
                    onChange={(event) => updateRow(row.rowKey, { price: event.target.value })}
                    className="w-24 bg-gray-dark border border-gray-500 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <div className="w-52 space-y-1 rounded border border-gray-500 px-2 py-2">
                    {MEAL_OPTIONS.map((mealOption) => (
                      <label key={mealOption} className="flex items-center gap-2 text-sm text-white">
                        <input
                          type="checkbox"
                          checked={splitCsv(row.mealsText).includes(mealOption)}
                          onChange={(event) =>
                            updateRow(row.rowKey, {
                              mealsText: toggleCsvValue(
                                row.mealsText,
                                mealOption,
                                event.target.checked,
                                MEAL_OPTIONS
                              ),
                            })
                          }
                          className="h-4 w-4"
                        />
                        <span>{mealOption}</span>
                      </label>
                    ))}
                  </div>
                </td>
                <td className="p-2">
                  <div className="w-52 space-y-1 rounded border border-gray-500 px-2 py-2">
                    {TAG_OPTIONS.map((tagOption) => (
                      <label key={tagOption} className="flex items-center gap-2 text-sm text-white">
                        <input
                          type="checkbox"
                          checked={splitCsv(row.tagsText).includes(tagOption)}
                          onChange={(event) =>
                            updateRow(row.rowKey, {
                              tagsText: toggleCsvValue(
                                row.tagsText,
                                tagOption,
                                event.target.checked,
                                TAG_OPTIONS
                              ),
                            })
                          }
                          className="h-4 w-4"
                        />
                        <span>{tagOption}</span>
                      </label>
                    ))}
                  </div>
                </td>
                <td className="p-2">
                  <div className="flex flex-col gap-2">
                    <label
                      className="w-64 text-xs text-center px-2 py-1 rounded border border-gray-500 text-white cursor-pointer hover:bg-gray-medium truncate"
                      title={getImageButtonLabel(row.image_url)}
                    >
                      {uploadingRowKey === row.rowKey ? 'Uploading...' : getImageButtonLabel(row.image_url)}
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        className="hidden"
                        disabled={uploadingRowKey === row.rowKey}
                        onChange={(event) => {
                          const file = event.target.files?.[0]
                          if (file) {
                            void uploadImageForRow(row, file)
                          }
                          event.currentTarget.value = ''
                        }}
                      />
                    </label>
                  </div>
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
