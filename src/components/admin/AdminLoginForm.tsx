'use client'

import type { CSSProperties } from 'react'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

const alertBoxStyle: CSSProperties = {
  padding: '12px 14px',
  borderRadius: 8,
  fontSize: 14,
  lineHeight: 1.45,
  border: '1px solid #f87171',
  backgroundColor: '#450a0a',
  color: '#fecaca',
}

export function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initialMessage, setInitialMessage] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const errorParam = new URLSearchParams(window.location.search).get('error')
    if (errorParam === 'not-allowed') {
      setInitialMessage('Your account is not on the approved admin allowlist.')
    } else {
      setInitialMessage(null)
    }
  }, [])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createSupabaseBrowserClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) throw signInError

      router.push('/admin/mfa')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Unable to sign in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {initialMessage && (
        <div className="rounded border border-red-400/60 bg-red-950/40 px-3 py-2 text-sm text-red-200" style={alertBoxStyle}>
          {initialMessage}
        </div>
      )}
      {error && (
        <div className="rounded border border-red-400/60 bg-red-950/40 px-3 py-2 text-sm text-red-200" style={alertBoxStyle}>
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm mb-1" style={{ color: '#f2f2f2' }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-dark border border-gray-500 rounded px-3 py-2 text-white"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm mb-1" style={{ color: '#f2f2f2' }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-dark border border-gray-500 rounded px-3 py-2 text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: 4,
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.75 : 1,
          backgroundColor: '#C89212',
          color: '#000000',
          fontWeight: 600,
        }}
      >
        {loading ? 'Signing in...' : 'Continue'}
      </button>
    </form>
  )
}
