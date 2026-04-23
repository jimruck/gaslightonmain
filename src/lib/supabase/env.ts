const missingEnv = (name: string) => `Missing required environment variable: ${name}`

export function getSupabaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!value) throw new Error(missingEnv('NEXT_PUBLIC_SUPABASE_URL'))
  return value.trim()
}

export function getSupabaseAnonKey(): string {
  const value = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!value) throw new Error(missingEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'))
  return value.trim()
}

export function getSupabaseServiceRoleKey(): string {
  const value = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!value) throw new Error(missingEnv('SUPABASE_SERVICE_ROLE_KEY'))
  return value.trim()
}

export function getAllowedAdminEmails(): string[] {
  const raw = process.env.ADMIN_ALLOWED_EMAILS || ''
  return raw
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function isAllowedAdminEmail(email?: string | null): boolean {
  if (!email) return false
  const allowed = getAllowedAdminEmails()
  return allowed.includes(email.trim().toLowerCase())
}

/** True when public/server reads can use Supabase (URL + service role). */
export function isSupabaseServerConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  )
}
