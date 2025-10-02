'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function WinePairingEvent() {
  const event = {
    title: 'Wine Pairing Dinner',
    date: 'Saturday, November 15th',
    time: '6:30 PM',
    capacity: '24 guests',
    description: 'Join us for an extraordinary culinary journey through Tuscany with our five-course wine pairing dinner. Each course is expertly paired with premium Italian wines.',
    price: '$125 per person',
    image: '/brand/images/Firefly__Creme-Brulee-Classic-vanilla-custard-with-caramelized-sugar-crust._.-white-plate-c-315311.jpg'
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
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
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
                {event.title}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3" style={{ color: '#f2f2f2' }}>
                <Calendar className="h-5 w-5 text-accent" />
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex items-center space-x-3" style={{ color: '#f2f2f2' }}>
                <Clock className="h-5 w-5 text-accent" />
                <span className="font-medium">{event.time}</span>
              </div>
              <div className="flex items-center space-x-3" style={{ color: '#f2f2f2' }}>
                <Users className="h-5 w-5 text-accent" />
                <span className="font-medium">Limited to {event.capacity}</span>
              </div>
            </div>

            <p className="leading-relaxed text-lg" style={{ color: '#f2f2f2' }}>
              {event.description}
            </p>

            <div className="bg-gray-dark p-6 rounded-lg border border-gray-500">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-serif font-bold text-white">
                  {event.price}
                </span>
                <span className="text-sm" style={{ color: '#f2f2f2' }}>
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
