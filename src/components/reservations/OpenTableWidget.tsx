'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

type ReservationEventItem = {
  id: string
  title: string
  start_at?: string | null
  date: string
  time?: string
  status?: string
}

export function OpenTableWidget() {
  const [events, setEvents] = useState<ReservationEventItem[]>([])

  useEffect(() => {
    let active = true

    async function loadEvents() {
      try {
        const res = await fetch('/api/events', { cache: 'default' })
        if (!res.ok) return
        const data = await res.json()
        if (!active) return
        setEvents((data.events || []) as ReservationEventItem[])
      } catch {
        // Keep reservations flow smooth if events fail to load.
      }
    }

    loadEvents()
    return () => {
      active = false
    }
  }, [])

  const upcomingEvents = useMemo(() => {
    const now = Date.now()
    const fourteenDaysFromNow = now + 14 * 24 * 60 * 60 * 1000

    return events
      .filter((event) => {
        const rawStart = event.start_at
        if (!rawStart) return false
        const eventMs = Date.parse(rawStart)
        if (!Number.isFinite(eventMs)) return false
        return eventMs >= now && eventMs <= fourteenDaysFromNow
      })
      .sort((a, b) => Date.parse(a.start_at || '') - Date.parse(b.start_at || ''))
      .slice(0, 2)
  }, [events])

  const hiddenEventCount = useMemo(() => {
    const now = Date.now()
    const fourteenDaysFromNow = now + 14 * 24 * 60 * 60 * 1000
    const totalUpcomingWithin14 = events.filter((event) => {
      const rawStart = event.start_at
      if (!rawStart) return false
      const eventMs = Date.parse(rawStart)
      if (!Number.isFinite(eventMs)) return false
      return eventMs >= now && eventMs <= fourteenDaysFromNow
    }).length

    return Math.max(totalUpcomingWithin14 - 2, 0)
  }, [events])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
      style={{ border: '1px solid #f2f2f2' }}
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-2" style={{ color: '#212121' }}>
          Book Your Table
        </h2>
        <p className="text-sm md:text-base" style={{ color: '#171717' }}>
          Reserve your table online through OpenTable for instant confirmation.
        </p>
      </div>

      {upcomingEvents.length > 0 && (
        <div
          className="mb-5 rounded-lg px-4 py-3 text-left"
          style={{ backgroundColor: '#fff8eb', border: '1px solid #e9dfca' }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: '#171717' }}>
            Upcoming at The Gaslight
          </p>
          <ul className="space-y-1">
            {upcomingEvents.map((event) => (
              <li key={event.id} className="text-sm" style={{ color: '#171717' }}>
                <span className="font-medium">{event.title}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs" style={{ color: '#4a4a4a' }}>
            Some event dates may have a featured dining format.
            {' '}
            <Link href="/events" className="underline" style={{ color: '#835F3A' }}>
              View event details
            </Link>
            {hiddenEventCount > 0 ? ` (+${hiddenEventCount} more)` : ''}.
          </p>
        </div>
      )}

      {/* OpenTable Widget - Vertically centered with equal padding */}
      <div className="flex justify-center w-full py-6">
        <iframe
          src="https://www.opentable.com/widget/reservation/canvas?rid=1435423&theme=standard&color=3&iframe=true&domain=com&lang=en-US&ot_source=Restaurant%20website"
          width="100%"
          height="310"
          frameBorder="0"
          scrolling="no"
          style={{
            maxWidth: '225px',
            borderRadius: '8px',
            backgroundColor: '#fff8eb'
          }}
          title="OpenTable Reservation Widget"
        />
      </div>

      {/* OpenTable Diners' Choice Badge - Centered below widget */}
      <div className="flex justify-center mb-4">
        <img
          src="/brand/images/DC2-2025.png"
          alt="OpenTable Diners' Choice 2025"
          className="w-[150px] h-[150px] object-contain"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
        />
      </div>

      {/* Alternative Contact */}
      <div className="mt-4 pt-3 text-center" style={{ borderTop: '1px solid #f2f2f2' }}>
        <p className="mb-2 text-sm md:text-base" style={{ color: '#171717' }}>
          Prefer to book over the phone or need to speak to someone about a private dining event? Call or email us:
        </p>
        <a
          href="tel:+13364974025"
          className="inline-flex items-center space-x-2 font-medium transition-opacity duration-200 hover:opacity-80 text-sm md:text-base"
          style={{ color: '#835F3A' }}
        >
          <span>(336) 497-4025</span>
        </a>
        <br />
        <a
          href="mailto:eat@thegaslightonmain.com"
          className="inline-flex items-center space-x-2 font-medium transition-opacity duration-200 hover:opacity-80 text-sm md:text-base"
          style={{ color: '#835F3A' }}
        >
          <span>eat@thegaslightonmain.com</span>
        </a>
      </div>
    </motion.div>
  )
}
