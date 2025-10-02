'use client'

import { motion } from 'framer-motion'

export function MapEmbed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm border border-accent-100 p-8"
    >
      <h3 className="text-2xl font-serif font-semibold text-accent-900 mb-6 text-center">
        Find Us on the Map
      </h3>

      <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.123!2d-80.073!3d36.1198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzYwMDcnMTEuMyJOIDgwwrAwNCcyMi43Ilc!5e0!3m2!1sen!2sus!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="The Gaslight on Main Location Map"
          className="rounded-lg"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <h4 className="font-semibold text-accent-900 mb-1">Address</h4>
          <p className="text-accent-700 text-sm">123 Main Street, Kernersville, NC 27284</p>
        </div>
        <div>
          <h4 className="font-semibold text-accent-900 mb-1">Coordinates</h4>
          <p className="text-accent-700 text-sm">36.1198° N, 80.0737° W</p>
        </div>
        <div>
          <h4 className="font-semibold text-accent-900 mb-1">Nearby</h4>
          <p className="text-accent-700 text-sm">Historic Downtown Kernersville</p>
        </div>
      </div>
    </motion.div>
  )
}
