'use client'

import { motion } from 'framer-motion'

export function PrivateDiningVideo() {
  return (
    <section className="py-20 bg-gray-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold" style={{ color: '#b5956d' }}>
            Virtual Tour
          </h2>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-medium rounded-xl overflow-hidden"
          >
            <video
              controls
              className="w-full h-auto"
              poster="/brand/images/privatedining_thumb.jpg"
            >
              <source src="/brand/images/Salle-and-Private-Dining.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-6">
              <p className="text-lg leading-relaxed" style={{ color: '#f2f2f2' }}>
                Take a virtual tour of both our Private Dining Room and The Salle. Each space offers 
                a unique atmosphere perfect for celebrations, business meetings, and special gatherings. 
                With personalized service and customizable menus, we create unforgettable experiences 
                tailored to your vision.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

