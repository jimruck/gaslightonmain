'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface NextEventData {
  id: string
  title: string
  date: string
  time?: string
  capacity?: string
  description?: string
  price?: string
  image?: string
  status?: string
}

export function NextEvent() {
  const [nextEvent, setNextEvent] = useState<NextEventData | null>(null)
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
          // Find the next upcoming event (first one with status 'upcoming')
          const upcomingEvents = data.events?.filter((event: NextEventData) => event.status === 'upcoming') || []
          setNextEvent(upcomingEvents[0] || null)
        }
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load next event')
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
      <section className="section-padding bg-accent-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-pulse bg-accent-700 h-96 lg:h-[500px] rounded" />
            <div className="space-y-6">
              <div className="animate-pulse bg-accent-700 h-8 w-32 rounded" />
              <div className="animate-pulse bg-accent-700 h-12 w-64 rounded" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-accent-700 h-6 w-48 rounded" />
                ))}
              </div>
              <div className="animate-pulse bg-accent-700 h-20 w-full rounded" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding bg-accent-800">
        <div className="container-custom">
          <div className="text-center text-red-400">{error}</div>
        </div>
      </section>
    )
  }

  if (!nextEvent) {
    return null // Don't show section if no upcoming events
  }

  return (
    <section className="py-20 bg-gray-medium">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
              {nextEvent.image ? (
                <Image
                  src={nextEvent.image}
                  alt={nextEvent.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white">
                  No Image
                </div>
              )}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent text-sm font-semibold rounded mb-4">
                Next Event
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                {nextEvent.title}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3" style={{ color: '#f2f2f2' }}>
                <Calendar className="h-5 w-5 text-accent" />
                <span className="font-medium">{nextEvent.date}</span>
              </div>
              {nextEvent.time && (
                <div className="flex items-center space-x-3" style={{ color: '#f2f2f2' }}>
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="font-medium">{nextEvent.time}</span>
                </div>
              )}
              {nextEvent.capacity && (
                <div className="flex items-center space-x-3" style={{ color: '#f2f2f2' }}>
                  <Users className="h-5 w-5 text-accent" />
                  <span className="font-medium">Limited to {nextEvent.capacity}</span>
                </div>
              )}
            </div>

            {nextEvent.description && (
              <p className="leading-relaxed text-lg" style={{ color: '#f2f2f2' }}>
                {nextEvent.description}
              </p>
            )}

            {nextEvent.price && (
              <div className="bg-gray-dark p-6 rounded-lg border border-gray-500">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-serif font-bold text-white">
                    {nextEvent.price}
                    <span className="text-2xl font-serif font-bold text-white ml-2">per person</span>
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    href={`/events/${nextEvent.id}`} 
                    className="btn-primary flex-1 text-center"
                  >
                    Reserve Your Spot
                  </Link>
                  <Link 
                    href="/events" 
                    className="flex-1 text-center bg-transparent px-8 py-3 font-semibold transition-all duration-300 focus:outline-none hover:scale-105 hover:shadow-lg"
                    style={{ 
                      color: '#f2f2f2',
                      border: '1px solid #C89212',
                      borderRadius: '4px',
                      lineHeight: '1.3rem'
                    }}
                  >
                    View All Events
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
