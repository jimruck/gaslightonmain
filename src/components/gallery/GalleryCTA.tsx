'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function GalleryCTA() {
  return (
    <section className="py-20 bg-gray-medium">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6" style={{ color: '#CCBB98' }}>
            Ready to Experience The Gaslight?
          </h2>
          <p className="text-xl mb-8" style={{ color: '#f2f2f2' }}>
            Join us for an unforgettable dining experience. Whether it's a romantic dinner, 
            a special celebration, or a private event, we're here to make it exceptional.
          </p>
          
          <div className="flex justify-center">
            <Link 
              href="/reservations" 
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto shadow-lg hover:shadow-2xl transition-shadow"
              style={{ lineHeight: '1.3rem' }}
            >
              Book a Table
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

