'use client'

import { motion } from 'framer-motion'

export function PrivateDiningVideo() {
  return (
    <section className="py-20 bg-gray-dark">
      <div className="container-custom">
       
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
              <source src="/brand/images/Private Dining Room.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-6">
              <p className="text-lg leading-relaxed" style={{ color: '#f2f2f2' }}>
                Our private dining room offers an exclusive atmosphere perfect for celebrations, 
                business meetings, and special gatherings. With personalized service and a customizable 
                menu, we create unforgettable experiences tailored to your vision.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

