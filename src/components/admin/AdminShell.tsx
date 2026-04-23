'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const signOut = async () => {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-dark">
      <main className="container-custom py-8 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/admin/events" className="flex-shrink-0">
            <Image
              src="/brand/logos/gaslight-logo-light_alt.png"
              alt="The Gaslight on Main"
              width={140}
              height={46}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/admin/events" className="px-3 py-2 rounded text-sm bg-gray-medium text-white hover:border-accent border border-gray-500">
            Events
            </Link>
            <Link href="/admin/menu" className="px-3 py-2 rounded text-sm bg-gray-medium text-white hover:border-accent border border-gray-500">
            Menu
            </Link>
            <Link href="/admin/announcement" className="px-3 py-2 rounded text-sm bg-gray-medium text-white hover:border-accent border border-gray-500">
            Banner
            </Link>
            <button
              onClick={signOut}
              className="px-3 py-2 rounded text-sm bg-transparent border border-gray-500 text-white hover:border-accent"
            >
              Sign out
            </button>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}
