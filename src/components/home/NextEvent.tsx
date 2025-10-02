'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function NextEvent() {
  const nextEvent = {
    title: 'Wine Pairing Dinner',
    subtitle: 'An Evening in Tuscany',
    date: 'Saturday, November 15th',
    time: '6:30 PM',
    capacity: '24 guests',
    description: 'Join us for an extraordinary culinary journey through Tuscany with our five-course wine pairing dinner. Each course is expertly paired with premium Italian wines.',
    price: '$125 per person',
    image: '/brand/images/Firefly__Creme-Brulee-Classic-vanilla-custard-with-caramelized-sugar-crust._.-white-plate-c-315311.jpg'
  }

  return (
    <section className="section-padding bg-accent-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-96 lg:h-[500px] overflow-hidden shadow-lg border border-accent-700" style={{ borderRadius: '0.3rem' }}>
              <Image
                src={nextEvent.image}
                alt={nextEvent.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-500 text-sm font-medium mb-4" style={{ borderRadius: '0.3rem' }}>
                Upcoming Event
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-neutral-100 mb-2">
                {nextEvent.title}
              </h2>
              <h3 className="text-xl text-primary-500 font-medium mb-6">
                {nextEvent.subtitle}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-neutral-300">
                <Calendar className="h-5 w-5 text-primary-500" />
                <span className="font-medium">{nextEvent.date}</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <Clock className="h-5 w-5 text-primary-500" />
                <span className="font-medium">{nextEvent.time}</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <Users className="h-5 w-5 text-primary-500" />
                <span className="font-medium">Limited to {nextEvent.capacity}</span>
              </div>
            </div>

            <p className="text-neutral-300 leading-relaxed text-lg">
              {nextEvent.description}
            </p>

            <div className="bg-accent-900 p-6 border border-accent-700" style={{ borderRadius: '0.3rem' }}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-serif font-semibold text-neutral-100">
                  {nextEvent.price}
                </span>
                <span className="text-sm text-neutral-400">
                  Includes wine pairings
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/events/wine-pairing-dinner"
                  className="btn-primary flex-1 text-center"
                >
                  Reserve Your Spot
                </Link>
                <Link
                  href="/events"
                  className="btn-secondary flex-1 text-center"
                >
                  View All Events
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
