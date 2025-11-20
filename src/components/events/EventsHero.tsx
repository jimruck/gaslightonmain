'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function EventsHero() {
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand/images/230.jpg"
          alt="Special event at The Gaslight on Main"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center text-white container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Special Events
          </h1>
          
          <p className="text-xl md:text-2xl text-cream-100 leading-relaxed">
            Join us for unforgettable culinary experiences, wine dinners, 
            and seasonal celebrations throughout the year.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
