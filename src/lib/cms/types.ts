export type AirtableRecord = {
  id: string
  fields: Record<string, unknown>
}

export type ApiEventItem = {
  id: string
  title: string
  start_at?: string | null
  date: string
  time?: string
  capacity?: string
  price?: string
  description?: string
  image?: string
  status?: 'upcoming' | 'past' | string
  featured?: boolean
  url?: string
}

export type ApiMenuItem = {
  id: string
  name: string
  description: string
  price: string
  tags: string[]
  course: string
  meal?: string[]
  photo?: string
  featured?: boolean
}

export type CmsEventRow = {
  title: string
  description: string | null
  start_at: string | null
  end_at: string | null
  all_guests: boolean
  guest_limit: number | null
  price_per_person: number | null
  booking_url: string | null
  image_url: string | null
}

export type CmsMenuRow = {
  item_name: string
  description: string | null
  meal: string
  course: string
  price: string | null
  tags: string
  image_url: string | null
}

export type CmsEventWriteInput = {
  title: string
  description?: string
  start_at?: string | null
  end_at?: string | null
  all_guests?: boolean
  guest_limit?: number | null
  price_per_person?: number | null
  booking_url?: string | null
  image_url?: string | null
  match_title?: string
  match_start_at?: string | null
}

export type CmsMenuWriteInput = {
  item_name: string
  description?: string
  meal?: string
  course?: string
  price?: string | null
  tags?: string
  image_url?: string | null
  match_item_name?: string
  match_course?: string
}
