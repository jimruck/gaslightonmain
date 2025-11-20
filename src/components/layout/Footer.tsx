'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, CheckCircle, XCircle } from 'lucide-react'
import { NewsletterForm } from '@/components/shared/NewsletterForm'

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

      const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

      const getScheduleForDay = (day: number) => {
        // Returns array of periods for the day, or null if closed
        if (day === 0) return [{ openM: 11 * 60 + 0, closeM: 15 * 60 + 0, openLabel: '11:00 AM', closeLabel: '3:00 PM' }] // Sunday - Brunch
        if (day === 1 || day === 2) return null // Monday, Tuesday - Closed
        if (day === 3) return [{ openM: 16 * 60 + 0, closeM: 20 * 60 + 0, openLabel: '4:00 PM', closeLabel: '8:00 PM' }] // Wednesday - Dinner
        if (day === 4) return [
          { openM: 11 * 60 + 30, closeM: 15 * 60 + 0, openLabel: '11:30 AM', closeLabel: '3:00 PM' }, // Thursday - Lunch
          { openM: 16 * 60 + 0, closeM: 20 * 60 + 0, openLabel: '4:00 PM', closeLabel: '8:00 PM' } // Thursday - Dinner
        ]
        if (day === 5 || day === 6) return [
          { openM: 11 * 60 + 30, closeM: 15 * 60 + 0, openLabel: '11:30 AM', closeLabel: '3:00 PM' }, // Friday/Saturday - Lunch
          { openM: 16 * 60 + 0, closeM: 21 * 60 + 0, openLabel: '4:00 PM', closeLabel: '9:00 PM' } // Friday/Saturday - Dinner
        ]
        return null
      }

      const getNextOpenInfo = (startDay: number) => {
        for (let i = 1; i <= 7; i++) {
          const d = (startDay + i) % 7
          const sched = getScheduleForDay(d)
          if (sched && sched.length > 0) {
            return { day: d, openLabel: sched[0].openLabel }
          }
        }
        return { day: 3, openLabel: '4:00 PM' }
      }

      const todaysSchedule = getScheduleForDay(currentDay)
      
      // Check if we're in any open period today
      if (todaysSchedule && Array.isArray(todaysSchedule)) {
        for (const period of todaysSchedule) {
          if (currentTime >= period.openM && currentTime < period.closeM) {
            setStatusInfo({ isOpen: true, status: 'Open', nextOpen: `Open until ${period.closeLabel}` })
            return
          }
        }
        
        // Check if we're between periods (e.g., between lunch and dinner)
        if (todaysSchedule.length > 1) {
          const firstPeriod = todaysSchedule[0]
          const secondPeriod = todaysSchedule[1]
          if (currentTime >= firstPeriod.closeM && currentTime < secondPeriod.openM) {
            setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Reopens today at ${secondPeriod.openLabel}` })
            return
          }
        }
        
        // After last period closes today
        const lastPeriod = todaysSchedule[todaysSchedule.length - 1]
        if (currentTime >= lastPeriod.closeM) {
          const nextInfo = getNextOpenInfo(currentDay)
          if ((currentDay + 1) % 7 === nextInfo.day) {
            setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens tomorrow at ${nextInfo.openLabel}` })
          } else {
            setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens ${weekdayNames[nextInfo.day]} at ${nextInfo.openLabel}` })
          }
          return
        }
        
        // Before first period opens today
        const firstPeriod = todaysSchedule[0]
        if (currentTime < firstPeriod.openM) {
          setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens today at ${firstPeriod.openLabel}` })
          return
        }
      }

      // Monday and Tuesday handling
      if (currentDay === 1 || currentDay === 2) {
        const wed = getScheduleForDay(3)!
        if (currentDay === 1) {
          setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens Wednesday at ${wed[0].openLabel}` })
        } else {
          setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens tomorrow at ${wed[0].openLabel}` })
        }
        return
      }

      // Fallback: compute next opening normally
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
            
            {/* Status Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                {statusInfo.isOpen ? (
                  <CheckCircle className="h-4 w-4" style={{ color: '#96F581' }} />
                ) : (
                  <XCircle className="h-4 w-4" style={{ color: '#a0a0a0' }} />
                )}
                <span 
                  className="font-semibold text-sm uppercase tracking-wide"
                  style={{ color: statusInfo.isOpen ? '#96F581' : '#f2f2f2' }}
                >
                  {statusInfo.status}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#a0a0a0' }}>
                {statusInfo.nextOpen}
              </p>
            </div>

            {/* Weekly Schedule */}
            <div className="space-y-2.5">
              <div className="flex items-start justify-between">
                <span className="font-medium text-sm" style={{ color: '#f2f2f2' }}>Wednesday</span>
                <span className="text-sm text-right" style={{ color: '#d1d1d1' }}>4:00 PM - 8:00 PM</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="font-medium text-sm" style={{ color: '#f2f2f2' }}>Thursday</span>
                <div className="flex flex-col items-end">
                  <span className="text-sm" style={{ color: '#d1d1d1' }}>11:30 AM - 3:00 PM</span>
                  <span className="text-sm" style={{ color: '#d1d1d1' }}>4:00 PM - 8:00 PM</span>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <span className="font-medium text-sm" style={{ color: '#f2f2f2' }}>Friday, Saturday</span>
                <div className="flex flex-col items-end">
                  <span className="text-sm" style={{ color: '#d1d1d1' }}>11:30 AM - 3:00 PM</span>
                  <span className="text-sm" style={{ color: '#d1d1d1' }}>4:00 PM - 9:00 PM</span>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <span className="font-medium text-sm" style={{ color: '#f2f2f2' }}>Sunday</span>
                <span className="text-sm text-right" style={{ color: '#d1d1d1' }}>11:00 AM - 3:00 PM</span>
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
                href="/gallery" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Gallery
              </Link>
              <Link 
                href="/private-dining" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Private Dining
              </Link>
              <Link 
                href="/our-story" 
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
                href="https://instagram.com/thegaslightonmain/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-colors duration-200 hover:opacity-80" 
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6" style={{ color: '#c89212' }} />
              </a>
              <a 
                href="https://facebook.com/people/The-Gaslight-on-Main/61576668796639" 
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
              <NewsletterForm variant="footer" />
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