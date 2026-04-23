'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

type LiveAnnouncement = {
  id: string
  message: string
  expires_at: string
}

export function AnnouncementBanner() {
  const pathname = usePathname()
  const [announcement, setAnnouncement] = useState<LiveAnnouncement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  const syncBannerOffset = (visible: boolean) => {
    if (visible) {
      document.body.setAttribute('data-banner-visible', 'true')
      document.documentElement.style.setProperty('--banner-height', '50px')
    } else {
      document.body.removeAttribute('data-banner-visible')
      document.documentElement.style.setProperty('--banner-height', '0px')
    }
  }

  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      setAnnouncement(null)
      setIsVisible(false)
      setIsDismissed(false)
      syncBannerOffset(false)
      return
    }

    let active = true

    const loadAnnouncement = async () => {
      try {
        const res = await fetch('/api/announcement', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (!active) return
        setAnnouncement((data.announcement || null) as LiveAnnouncement | null)
      } catch {
        // Keep layout stable if announcements fail to load.
      }
    }

    loadAnnouncement()
    const interval = setInterval(loadAnnouncement, 60000)

    return () => {
      active = false
      clearInterval(interval)
      syncBannerOffset(false)
    }
  }, [pathname])

  useEffect(() => {
    if (!announcement) {
      setIsDismissed(false)
      setIsVisible(false)
      syncBannerOffset(false)
      return
    }

    const dismissalKey = `announcement-banner-dismissed-${announcement.id}`
    const dismissed = localStorage.getItem(dismissalKey)
    if (dismissed === 'true') {
      setIsDismissed(true)
      setIsVisible(false)
      syncBannerOffset(false)
      return
    }

    setIsDismissed(false)
    setIsVisible(true)
    syncBannerOffset(true)
  }, [announcement])

  const handleDismiss = () => {
    if (!announcement) return
    const dismissalKey = `announcement-banner-dismissed-${announcement.id}`
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem(dismissalKey, 'true')
    syncBannerOffset(false)
  }

  if (pathname.startsWith('/admin') || !isVisible || isDismissed || !announcement) {
    return null
  }

  return (
    <div
      role="banner"
      aria-label="Announcement"
      className="w-full fixed top-0 left-0 right-0 z-[10000] flex items-center justify-center"
      style={{
        height: '50px',
        backgroundColor: '#FF5F00',
        color: '#000000',
      }}
    >
      <div className="container-custom relative w-full h-full flex items-center justify-center px-4">
        {/* Message */}
        <p className="text-sm md:text-base font-medium text-center px-8 md:px-12">
          {announcement.message}
        </p>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="absolute right-4 md:right-8 p-1 hover:bg-black/10 rounded transition-colors duration-200"
          style={{
            color: '#000000',
          }}
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
