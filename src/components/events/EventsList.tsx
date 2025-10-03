'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const events = [
  {
    id: 'wine-pairing-dinner',
    title: 'Wine Pairing Dinner: An Evening in Tuscany',
    date: 'Saturday, November 15th',
    time: '6:30 PM',
    capacity: '24 guests',
    price: '$125 per person',
    description: 'Join us for an extraordinary culinary journey through Tuscany with our five-course wine pairing dinner. Each course is expertly paired with premium Italian wines.',
    image: '/brand/images/Firefly__Creme-Brulee-Classic-vanilla-custard-with-caramelized-sugar-crust._.-white-plate-c-315311.jpg',
    status: 'upcoming',
    featured: true
  },
  {
    id: 'holiday-menu',
    title: 'Holiday Tasting Menu',
    date: 'December 20th - 24th',
    time: 'All Evening',
    capacity: 'All guests',
    price: '$85 per person',
    description: 'Celebrate the holidays with our special four-course tasting menu featuring seasonal ingredients and festive flavors.',
    image: '/brand/images/Firefly_Center-cut-filet-confit-garlic-whipped-Yukon-potatoes-haricot-vert-and-red-wine-ju-426440.jpg',
    status: 'upcoming',
    featured: false
  },
  {
    id: 'new-years-celebration',
    title: 'New Year\'s Eve Celebration',
    date: 'December 31st',
    time: '7:00 PM - 1:00 AM',
    capacity: '50 guests',
    price: '$150 per person',
    description: 'Ring in the new year with a spectacular six-course dinner, champagne toast, and live music.',
    image: '/brand/images/Firefly__Lobster-Ravioli-Knuckle-and-Claw-filled-ravioli-with-caramelized-onions-sherry-and-406070.jpg',
    status: 'upcoming',
    featured: true
  }
]

export function EventsList() {
  return (
    <div className="space-y-8">
      {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`bg-white rounded-xl overflow-hidden ${
              event.featured ? 'shadow-lg' : 'shadow-sm'
            }`}
            style={{ 
              border: event.featured ? '1px solid #CCBB98' : '1px solid #e5e5e5'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {event.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured Event
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-serif font-semibold mb-4" style={{ color: '#212121' }}>
                  {event.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3" style={{ color: '#212121' }}>
                    <Calendar className="h-5 w-5 text-primary-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-3" style={{ color: '#212121' }}>
                    <Clock className="h-5 w-5 text-primary-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-3" style={{ color: '#212121' }}>
                    <Users className="h-5 w-5 text-primary-600" />
                    <span>{event.capacity}</span>
                  </div>
                </div>
                
                <p className="leading-relaxed mb-6" style={{ color: '#212121' }}>
                  {event.description}
                </p>
                
                <div className="space-y-4">
                  <div className="text-left">
                    <span className="text-2xl font-serif font-semibold" style={{ color: '#212121' }}>
                      {event.price}
                    </span>
                  </div>
                  <div className="flex justify-center md:justify-end">
                    <Link
                      href={`/events/${event.id}`}
                      className="btn-primary"
                    >
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
