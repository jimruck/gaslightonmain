import './load-env'
import { createClient } from '@supabase/supabase-js'

const CMS_MIGRATION_HINT =
  '\n\n→ Run the full SQL in supabase/migrations/20261001000000_init_cms.sql once: Supabase Dashboard → SQL Editor → paste → Run.'

function tableMissingError(context: string, message: string): Error {
  const looksMissing =
    /could not find the table|schema cache|relation .* does not exist/i.test(message)
  const suffix = looksMissing ? CMS_MIGRATION_HINT : ''
  return new Error(`Failed to ${context}: ${message}${suffix}`)
}

const required = (name: string): string => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value.trim()
}

async function main() {
  const supabaseUrl = required('NEXT_PUBLIC_SUPABASE_URL')
  const serviceRoleKey = required('SUPABASE_SERVICE_ROLE_KEY')
  const allowedEmails = required('ADMIN_ALLOWED_EMAILS')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)

  if (allowedEmails.length === 0) {
    throw new Error('ADMIN_ALLOWED_EMAILS must include at least one email')
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const db = supabase as any

  const matchedUsers: Array<{ id: string; email: string }> = []
  let page = 1
  const perPage = 100

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage })
    if (error) throw new Error(`Failed to list users: ${error.message}`)

    const users = data.users || []
    users.forEach((user) => {
      const email = user.email?.toLowerCase()
      if (email && allowedEmails.includes(email)) {
        matchedUsers.push({ id: user.id, email })
      }
    })

    if (users.length < perPage) break
    page += 1
  }

  if (matchedUsers.length === 0) {
    throw new Error(
      'No Supabase Auth users matched ADMIN_ALLOWED_EMAILS. Invite/create the users first, then re-run.'
    )
  }

  const { error: upsertError } = await db.from('admin_users').upsert(
    matchedUsers.map((user) => ({
      user_id: user.id,
      email: user.email,
    })),
    { onConflict: 'user_id' }
  )
  if (upsertError) {
    throw tableMissingError('sync admin users', upsertError.message)
  }

  const allowedEmailSet = new Set(allowedEmails)
  const { data: existingAdmins, error: existingError } = await db
    .from('admin_users')
    .select('user_id,email')
  if (existingError) {
    throw tableMissingError('read existing admin users', existingError.message)
  }

  const toDelete = ((existingAdmins || []) as any[])
    .filter((entry: any) => !allowedEmailSet.has(entry.email.toLowerCase()))
    .map((entry: any) => entry.user_id)

  if (toDelete.length > 0) {
    const { error: deleteError } = await db.from('admin_users').delete().in('user_id', toDelete)
    if (deleteError) {
      throw tableMissingError('remove stale admin users', deleteError.message)
    }
  }

  console.log(`Admin allowlist synced: ${matchedUsers.length} approved user(s).`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
