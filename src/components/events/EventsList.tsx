'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type EventItem = {
  id: string
  title: string
  date: string
  time?: string
  capacity?: string
  price?: string
  description?: string
  image?: string
  status?: 'upcoming' | 'past' | string
  featured?: boolean
}

export function EventsList() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('/api/events', { cache: 'default' })
        if (!res.ok) {
          throw new Error(`Failed to load events (${res.status})`)
        }
        const data = await res.json()
        if (isMounted) {
          setEvents(Array.isArray(data.events) ? data.events : [])
        }
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load events')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="animate-pulse bg-gray-medium rounded-xl h-64" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-400">{error}</div>
  }

  if (!events.length) {
    return <div style={{ color: '#f2f2f2' }}>No events at this time. Please check back soon.</div>
  }

  return (
    <div className="space-y-8">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={`bg-gray-medium rounded-xl overflow-hidden ${
            event.featured ? 'shadow-lg' : ''
          }`}
          style={{
            border: event.featured ? '2px solid #CCBB98' : 'none',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative h-64 lg:h-auto">
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-600" />
              )}
              {event.featured && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#CCBB98', color: '#212121' }}>
                    Featured Event
                  </span>
                </div>
              )}
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#CCBB98' }}>
                {event.title}
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3" style={{ color: '#f2f2f2' }}>
                  <Calendar className="h-5 w-5" style={{ color: '#CCBB98' }} />
                  <span>{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center space-x-3" style={{ color: '#f2f2f2' }}>
                    <Clock className="h-5 w-5" style={{ color: '#CCBB98' }} />
                    <span>{event.time}</span>
                  </div>
                )}
                {event.capacity && (
                  <div className="flex items-center space-x-3" style={{ color: '#f2f2f2' }}>
                    <Users className="h-5 w-5" style={{ color: '#CCBB98' }} />
                    <span>{event.capacity}</span>
                  </div>
                )}
              </div>

              {event.description && (
                <p className="leading-relaxed mb-6" style={{ color: '#f2f2f2' }}>
                  {event.description}
                </p>
              )}

              <div className="space-y-4">
                {event.price && (
                  <div className="text-left">
                    <span className="text-2xl font-serif font-semibold" style={{ color: '#CCBB98' }}>
                      {event.price}
                    </span>
                    <span className="text-2xl font-serif font-semibold ml-2" style={{ color: '#CCBB98' }}>per person</span>
                  </div>
                )}
                <div className="flex justify-center md:justify-end">
                  <Link href={`/events/${event.id}`} className="btn-primary">
                    Reserve Your Spot
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
