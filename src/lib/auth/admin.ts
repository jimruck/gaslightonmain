import 'server-only'

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isAllowedAdminEmail } from '@/lib/supabase/env'

type AdminSessionResult = {
  userId: string
  email: string
}

export async function requireAdminSession(options?: { requireMfa?: boolean }): Promise<AdminSessionResult> {
  const supabase = createSupabaseServerClient()
  const requireMfa = options?.requireMfa ?? true

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  if (!isAllowedAdminEmail(user.email)) {
    redirect('/admin/login?error=not-allowed')
  }

  if (requireMfa) {
    const { data: assuranceData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    if (assuranceData?.currentLevel !== 'aal2') {
      redirect('/admin/mfa')
    }
  }

  return {
    userId: user.id,
    email: user.email || '',
  }
}
