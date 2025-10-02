'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function OurStory() {
  return (
    <section className="py-20" style={{ backgroundColor: '#f2f2f2' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/brand/images/IMG_1222.jpg"
                alt="Chef preparing a dish at The Gaslight on Main"
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
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6" style={{ color: '#262626' }}>
                Our Story
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                We blend diverse global influences coupled with high-quality 
                ingredients to craft dishes that are both familiar and unexpected. 
                We aim to provide thoughtful service and a welcoming atmosphere 
                where every guest feels valued so that we can create memorable 
                guest experiences that go beyond great food.
              </p>
            </div>

            <Link 
              href="/about" 
              className="btn-primary inline-block"
              style={{ lineHeight: '1.3rem' }}
            >
              Read Full Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}