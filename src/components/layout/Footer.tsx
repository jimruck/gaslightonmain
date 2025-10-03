'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'

export function Footer() {
  const [statusInfo, setStatusInfo] = useState({
    isOpen: false,
    status: 'Closed',
    nextOpen: 'Opens today at 4:00 PM'
  })

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date()
      const currentDay = now.getDay()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      const currentTime = currentHour * 60 + currentMinute

      const hours = [
        { day: 'Wed, Thurs', time: '4:00 PM - 8:00 PM', open: true, days: [3, 4] },
        { day: 'Fri, Sat', time: '4:00 PM - 9:00 PM', open: true, days: [5, 6] },
        { day: 'Sun', time: '11:00 AM - 3:00 PM', open: true, days: [0] },
      ]
      const openDays = new Set([0, 3, 4, 5, 6])
      const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

      const getScheduleForDay = (day: number) => {
        if (day === 0) return { openM: 11 * 60 + 0, closeM: 15 * 60 + 0, openLabel: '11:00 AM', closeLabel: '3:00 PM' }
        if (day === 3 || day === 4) return { openM: 16 * 60 + 0, closeM: 20 * 60 + 0, openLabel: '4:00 PM', closeLabel: '8:00 PM' }
        if (day === 5 || day === 6) return { openM: 16 * 60 + 0, closeM: 21 * 60 + 0, openLabel: '4:00 PM', closeLabel: '9:00 PM' }
        return null
      }

      const getNextOpenInfo = (startDay: number) => {
        for (let i = 1; i <= 7; i++) {
          const d = (startDay + i) % 7
          if (openDays.has(d)) {
            const sched = getScheduleForDay(d)!
            return { day: d, openLabel: sched.openLabel }
          }
        }
        return { day: 3, openLabel: '4:00 PM' }
      }

      const todaysSchedule = getScheduleForDay(currentDay)
      if (todaysSchedule && currentTime >= todaysSchedule.openM && currentTime < todaysSchedule.closeM) {
        setStatusInfo({ isOpen: true, status: 'Open', nextOpen: `Open until ${todaysSchedule.closeLabel}` })
        return
      }

      // After close today until 11:59 PM
      if (todaysSchedule && currentTime >= todaysSchedule.closeM) {
        if (currentDay === 0) {
          const wed = getScheduleForDay(3)!
          setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens Wednesday at ${wed.openLabel}` })
          return
        }
        const nextInfo = getNextOpenInfo(currentDay)
        if ((currentDay + 1) % 7 === nextInfo.day) {
          setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens tomorrow at ${nextInfo.openLabel}` })
        } else {
          setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens ${weekdayNames[nextInfo.day]} at ${nextInfo.openLabel}` })
        }
        return
      }

      // Before open today
      if (todaysSchedule && currentTime < todaysSchedule.openM) {
        setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens today at ${todaysSchedule.openLabel}` })
        return
      }

      // Monday and Tuesday handling
      if (currentDay === 1) {
        const wed = getScheduleForDay(3)!
        setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens Wednesday at ${wed.openLabel}` })
        return
      }
      if (currentDay === 2) {
        const wed = getScheduleForDay(3)!
        setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens tomorrow at ${wed.openLabel}` })
        return
      }

      // Fallback
      const nextInfo = getNextOpenInfo(currentDay)
      const isTomorrow = (currentDay + 1) % 7 === nextInfo.day
      setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: isTomorrow ? `Opens tomorrow at ${nextInfo.openLabel}` : `Opens ${weekdayNames[nextInfo.day]} at ${nextInfo.openLabel}` })
    }

    updateStatus()
    const interval = setInterval(updateStatus, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <footer style={{ backgroundColor: '#171717' }}>
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Contact Info */}
          <div className="space-y-6">
            <Image
              src="/brand/logos/gaslight-logo-light_alt.png"
              alt="The Gaslight on Main"
              width={180}
              height={60}
              className="h-16 w-auto"
            />
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: '#c89212' }} />
                <div>
                  <p className="font-medium" style={{ color: '#f2f2f2' }}>126 S Main Street, Suite G</p>
                  <p style={{ color: '#f2f2f2' }}>Kernersville, NC 27284</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" style={{ color: '#c89212' }} />
                <a 
                  href="tel:+13364974025" 
                  className="transition-colors duration-200 hover:opacity-80"
                  style={{ color: '#f2f2f2' }}
                >
                  (336) 497-4025
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" style={{ color: '#c89212' }} />
                <a 
                  href="mailto:eat@thegaslightonmain.com" 
                  className="transition-colors duration-200 hover:opacity-80"
                  style={{ color: '#f2f2f2' }}
                >
                  eat@thegaslightonmain.com
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-semibold" style={{ color: '#f2f2f2' }}>Hours</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="font-semibold"
                  style={{ color: statusInfo.isOpen ? '#96F581' : '#f2f2f2' }}
                >
                  {statusInfo.status}
                </div>
              </div>
              <div style={{ color: '#f2f2f2' }}>
                {statusInfo.nextOpen}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span style={{ color: '#f2f2f2' }}>Wed, Thurs</span>
                  <span style={{ color: '#f2f2f2' }}>4:00 PM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#f2f2f2' }}>Fri, Sat</span>
                  <span style={{ color: '#f2f2f2' }}>4:00 PM - 9:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#f2f2f2' }}>Sun</span>
                  <span style={{ color: '#f2f2f2' }}>11:00 AM - 3:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-semibold" style={{ color: '#f2f2f2' }}>Quick Links</h3>
            <div className="space-y-3">
              <Link 
                href="/menu" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Menu
              </Link>
              <Link 
                href="/reservations" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Reservations
              </Link>
              <Link 
                href="/events" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Events
              </Link>
              <Link 
                href="#" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Private Dining
              </Link>
              <Link 
                href="/contact" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Contact
              </Link>
              <Link 
                href="/about" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Stay Connected */}
          <div className="space-y-6 min-w-0">
            <h3 className="text-xl font-serif font-semibold" style={{ color: '#f2f2f2' }}>Stay Connected</h3>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/gaslightonmain" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-colors duration-200 hover:opacity-80" 
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6" style={{ color: '#c89212' }} />
              </a>
              <a 
                href="https://facebook.com/gaslightonmain" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-colors duration-200 hover:opacity-80" 
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-6 w-6" style={{ color: '#c89212' }} />
              </a>
            </div>
            <div className="space-y-4">
              <p className="text-sm" style={{ color: '#f2f2f2' }}>
                Subscribe to our newsletter for special events and seasonal menu updates.
              </p>
              <form className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 min-w-0"
                  style={{ 
                    backgroundColor: '#262626',
                    border: '1px solid #404040'
                  }}
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 font-semibold transition-all duration-300 hover:opacity-90 whitespace-nowrap flex-shrink-0"
                  style={{ 
                    backgroundColor: '#CCBB98',
                    color: '#171717',
                    borderRadius: '4px'
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" style={{ borderColor: '#404040' }}>
          <p className="text-sm" style={{ color: '#f2f2f2' }}>
            © 2024 The Gaslight on Main. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link 
              href="/privacy" 
              className="transition-colors duration-200 hover:opacity-80"
              style={{ color: '#f2f2f2' }}
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="transition-colors duration-200 hover:opacity-80"
              style={{ color: '#f2f2f2' }}
            >
              Terms of Service
            </Link>
            <Link 
              href="/accessibility" 
              className="transition-colors duration-200 hover:opacity-80"
              style={{ color: '#f2f2f2' }}
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}