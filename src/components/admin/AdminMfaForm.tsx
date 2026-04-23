'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

type TotpFactor = {
  id: string
  friendly_name?: string | null
  factor_type?: string
  status?: string
}

export function AdminMfaForm() {
  const router = useRouter()
  const [factor, setFactor] = useState<TotpFactor | null>(null)
  const [challengeId, setChallengeId] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [bootLoading, setBootLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [enrollmentQrSvg, setEnrollmentQrSvg] = useState<string | null>(null)
  const [enrollmentSecret, setEnrollmentSecret] = useState<string | null>(null)

  const hasEnrollment = useMemo(() => Boolean(enrollmentQrSvg || enrollmentSecret), [enrollmentQrSvg, enrollmentSecret])

  useEffect(() => {
    const bootstrap = async () => {
      setBootLoading(true)
      setError(null)
      try {
        const supabase = createSupabaseBrowserClient()
        const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
        if (aalData?.currentLevel === 'aal2') {
          router.push('/admin/events')
          router.refresh()
          return
        }

        const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors()
        if (factorsError) throw factorsError

        const activeFactor = factorsData?.totp?.find((entry) => entry.status === 'verified') || null
        if (activeFactor) {
          setFactor(activeFactor)
          const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
            factorId: activeFactor.id,
          })
          if (challengeError) throw challengeError
          setChallengeId(challengeData.id)
        } else {
          const { data: enrollData, error: enrollError } = await supabase.auth.mfa.enroll({
            factorType: 'totp',
            friendlyName: 'Gaslight CMS',
          })
          if (enrollError) throw enrollError

          setFactor({ id: enrollData.id, friendly_name: enrollData.friendly_name })
          setEnrollmentQrSvg(enrollData.totp.qr_code)
          setEnrollmentSecret(enrollData.totp.secret)

          const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
            factorId: enrollData.id,
          })
          if (challengeError) throw challengeError
          setChallengeId(challengeData.id)
        }
      } catch (err: any) {
        setError(err?.message || 'Unable to initialize MFA.')
      } finally {
        setBootLoading(false)
      }
    }

    bootstrap()
  }, [router])

  const verifyCode = async () => {
    if (!factor?.id || !challengeId || !code.trim()) return
    setLoading(true)
    setError(null)
    try {
      const supabase = createSupabaseBrowserClient()
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: factor.id,
        challengeId,
        code: code.trim(),
      })
      if (verifyError) throw verifyError
      router.push('/admin/events')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Invalid code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (bootLoading) {
    return <p style={{ color: '#f2f2f2' }}>Preparing MFA challenge...</p>
  }

  return (
    <div className="space-y-4">
      {error && (
        <div
          className="rounded border border-red-400/60 bg-red-950/40 px-3 py-2 text-sm text-red-200"
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            fontSize: 14,
            border: '1px solid #f87171',
            backgroundColor: '#450a0a',
            color: '#fecaca',
          }}
        >
          {error}
        </div>
      )}

      {hasEnrollment && (
        <div className="rounded border border-gray-500 bg-gray-dark p-4 space-y-2">
          <p className="text-sm font-semibold" style={{ color: '#CCBB98' }}>
            First-time setup
          </p>
          <p className="text-sm" style={{ color: '#f2f2f2' }}>
            Scan this QR code in Google Authenticator, Authy, or 1Password, then enter the 6-digit code below.
          </p>
          {enrollmentQrSvg && (
            <div
              className="inline-block bg-white p-2 rounded"
              dangerouslySetInnerHTML={{ __html: enrollmentQrSvg }}
            />
          )}
          {enrollmentSecret && (
            <p className="text-xs break-all" style={{ color: '#f2f2f2' }}>
              Secret: {enrollmentSecret}
            </p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="mfa-code" className="block text-sm mb-1" style={{ color: '#f2f2f2' }}>
          6-digit authenticator code
        </label>
        <input
          id="mfa-code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          className="w-full bg-gray-dark border border-gray-500 rounded px-3 py-2 text-white"
          placeholder="123456"
        />
      </div>

      <button
        type="button"
        onClick={verifyCode}
        disabled={loading || !challengeId}
        className="w-full btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? 'Verifying...' : 'Verify and Continue'}
      </button>
    </div>
  )
}
