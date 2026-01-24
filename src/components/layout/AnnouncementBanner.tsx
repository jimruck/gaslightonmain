'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const EXPIRY_DATE = new Date('2026-01-26T00:00:00') // Hide after 12:00 AM Monday, January 26, 2026
const STORAGE_KEY = 'announcement-banner-dismissed'

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  const checkVisibility = () => {
    const now = new Date()
    const isExpired = now >= EXPIRY_DATE
    
    // Hide if expired (after January 26, 2026 12:00 AM)
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

    // Show banner until expiry date
    setIsVisible(true)
    setIsDismissed(false)
    document.body.setAttribute('data-banner-visible', 'true')
    document.documentElement.style.setProperty('--banner-height', '50px')
  }

  useEffect(() => {
    // Check immediately
    checkVisibility()

    // Set up interval to check every minute (to catch midnight transition)
    const interval = setInterval(checkVisibility, 60000) // Check every minute

    // Cleanup on unmount
    return () => {
      clearInterval(interval)
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
          Closed Sunday due to inclement weather
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
