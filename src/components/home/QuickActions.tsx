'use client'

import Link from 'next/link'
import { Calendar, Menu, Calendar as EventsIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const actions = [
  {
    title: 'View Menu',
    description: 'Explore our seasonal New American cuisine',
    href: '/menu',
    icon: Menu,
    color: 'bg-primary-500 hover:bg-primary-600',
    external: false,
  },
  {
    title: 'Make Reservation',
    description: 'Book your table for an unforgettable experience',
    href: '/reservations',
    icon: Calendar,
    color: 'bg-accent-700 hover:bg-accent-800',
    external: false,
  },
  {
    title: 'Special Events',
    description: 'Discover wine dinners and seasonal celebrations',
    href: '/events',
    icon: EventsIcon,
    color: 'bg-gold-500 hover:bg-gold-600',
    external: false,
  },
]

export function QuickActions() {
  return (
    <section className="section-padding bg-accent-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map((action, index) => {
            const Icon = action.icon
            const Component = action.external ? 'a' : Link
            const extraProps = action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Component
                  href={action.href}
                  className={`
                    block p-8 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-accent-600 hover:border-primary-500/50
                    ${action.color}
                  `}
                  style={{ borderRadius: '0.3rem' }}
                  {...extraProps}
                >
                  <Icon className="h-8 w-8 mb-4" />
                  <h3 className="text-xl font-serif font-semibold mb-2">
                    {action.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {action.description}
                  </p>
                </Component>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
