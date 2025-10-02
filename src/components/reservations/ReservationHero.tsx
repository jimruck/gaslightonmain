'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function ReservationHero() {
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand/images/IMG_1222.jpg"
          alt="Elegant dining room at The Gaslight on Main"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Make a Reservation
          </h1>
          
          <p className="text-xl md:text-2xl text-cream-100 leading-relaxed">
            Reserve your table for an exceptional dining experience. 
            We look forward to welcoming you to The Gaslight on Main.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
