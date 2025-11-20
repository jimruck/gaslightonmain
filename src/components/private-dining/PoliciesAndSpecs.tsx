'use client'

import { motion } from 'framer-motion'
import { Users, Calendar, Clock, Utensils, Music, Wine } from 'lucide-react'

const specifications = [
  {
    icon: Users,
    title: 'Party Size',
    description: 'Accommodates 12-30 guests comfortably',
    detail: 'Perfect for intimate gatherings and medium-sized celebrations'
  },
  {
    icon: Calendar,
    title: 'Advance Booking',
    description: 'Minimum 2 weeks notice required',
    detail: 'Popular dates book quickly, so plan ahead'
  },
  {
    icon: Clock,
    title: 'Event Duration',
    description: '3-4 hour private events',
    detail: 'Extended hours available upon request'
  },
  {
    icon: Utensils,
    title: 'Custom Menus',
    description: 'Personalized dining experiences',
    detail: 'Work with our chef to create your perfect menu'
  },
  {
    icon: Wine,
    title: 'Beverage Options',
    description: 'Full bar and wine selection',
    detail: 'Curated pairings and custom cocktails available'
  },
  {
    icon: Music,
    title: 'Atmosphere',
    description: 'Audio/visual and décor options',
    detail: 'Create the perfect ambiance for your event'
  }
]

const policies = [
  'A non-refundable deposit is required to secure your reservation',
  'Final guest count must be confirmed prior to event',
  'Menu selections should be finalized your event',
  'Decorations are welcome with prior approval',
  'We accommodate dietary restrictions and allergies with advance notice',
  'Private dining events are subject to a service charge'
]

export function PoliciesAndSpecs() {
  return (
    <section className="py-20 bg-gray-medium">
      <div className="container-custom">
        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#CCBB98' }}>
            Event Details
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#f2f2f2' }}>
          The Gaslight on Main will provide a detailed review of all event logistics and guidelines prior to securing your reservation to ensure a seamless and memorable experience for you and your guests. This includes, but is not limited to:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {specifications.map((spec, index) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-dark rounded-xl p-6"
            >
              <spec.icon className="h-10 w-10 mb-4" style={{ color: '#CCBB98' }} />
              <h3 className="text-xl font-serif font-semibold mb-2" style={{ color: '#CCBB98' }}>
                {spec.title}
              </h3>
              <p className="font-semibold mb-2" style={{ color: '#f2f2f2' }}>
                {spec.description}
              </p>
              <p className="text-sm" style={{ color: '#a0a0a0' }}>
                {spec.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-serif font-bold mb-8 text-center" style={{ color: '#CCBB98' }}>
            Policies & Guidelines
          </h3>
          <div className="bg-gray-dark rounded-xl p-8">
            <ul className="space-y-4">
              {policies.map((policy, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-4 mt-0.5"
                    style={{ backgroundColor: '#CCBB98' }}
                  >
                    <span className="text-sm font-bold" style={{ color: '#212121' }}>✓</span>
                  </span>
                  <span style={{ color: '#f2f2f2' }}>{policy}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

