import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isAllowedAdminEmail } from '@/lib/supabase/env'

type AdminGuardSuccess = {
  ok: true
  userId: string
  email: string
}

type AdminGuardFailure = {
  ok: false
  response: NextResponse
}

export async function requireAdminApiSession(): Promise<AdminGuardSuccess | AdminGuardFailure> {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { ok: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  if (!isAllowedAdminEmail(user.email)) {
    return { ok: false, response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }

  const { data: assuranceData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  if (assuranceData?.currentLevel !== 'aal2') {
    return {
      ok: false,
      response: NextResponse.json({ error: 'MFA required' }, { status: 403 }),
    }
  }

  return {
    ok: true,
    userId: user.id,
    email: user.email || '',
  }
}
