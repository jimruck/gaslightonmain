'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function GalleryHero() {
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand/images/1.jpg"
          alt="The Gaslight on Main interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center text-white container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Gallery
          </h1>
          
          <p className="text-xl md:text-2xl text-cream-100 leading-relaxed">
            Step inside The Gaslight on Main and discover the perfect setting 
            for your next dining experience.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

