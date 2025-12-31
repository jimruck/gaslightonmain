'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const EXPIRY_DATE = new Date('2026-01-11T00:00:00') // Hide after January 10, 2026
const STORAGE_KEY = 'announcement-banner-dismissed'

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if banner should be shown (not expired and not dismissed)
    const now = new Date()
    const isExpired = now >= EXPIRY_DATE
    
    if (isExpired) {
      setIsVisible(false)
      document.body.removeAttribute('data-banner-visible')
      document.documentElement.style.setProperty('--banner-height', '0px')
      return
    }

    // Check localStorage for dismissal
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed === 'true') {
      setIsDismissed(true)
      setIsVisible(false)
      document.body.removeAttribute('data-banner-visible')
      document.documentElement.style.setProperty('--banner-height', '0px')
      return
    }

    setIsVisible(true)
    document.body.setAttribute('data-banner-visible', 'true')
    document.documentElement.style.setProperty('--banner-height', '50px')
    
    // Cleanup on unmount
    return () => {
      document.body.removeAttribute('data-banner-visible')
      document.documentElement.style.setProperty('--banner-height', '0px')
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem(STORAGE_KEY, 'true')
    document.body.removeAttribute('data-banner-visible')
    document.documentElement.style.setProperty('--banner-height', '0px')
  }

  if (!isVisible || isDismissed) {
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
          Closed New Year&apos;s Day &amp; January 10, 2026. Back to regular hours on January 11
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
