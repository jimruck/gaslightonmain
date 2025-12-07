'use client'

import { motion } from 'framer-motion'

export function VideoTour() {
  return (
    <section className="py-20 bg-gray-dark">
      <div className="container-custom">
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#CCBB98' }}>
            Virtual Tour
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#f2f2f2' }}>
            Experience the ambiance and elegance of The Gaslight on Main
          </p>
        </motion.div> */}

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
              poster="/brand/images/tour_thumb.jpg"
            >
              <source src="/brand/images/Restaurant Tour.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-6">
              <h3 className="text-2xl font-serif font-semibold mb-2" style={{ color: '#CCBB98' }}>
                Virtual Tour
              </h3>
              <p style={{ color: '#f2f2f2' }}>
                Explore our beautifully designed spaces, from the elegant main dining room perfect for intimate dinners and special celebrations, to the exclusive private dining room ideal for events and business gatherings, and the sophisticated Salle that brings it all together in warm, welcoming ambiance.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

