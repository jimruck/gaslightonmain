'use client'

import { motion } from 'framer-motion'

export function PrivateDiningCTA() {
  return (
    <section className="py-20 bg-gray-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6" style={{ color: '#CCBB98' }}>
            Ready to Plan Your Event?
          </h2>
          <p className="text-xl mb-8" style={{ color: '#f2f2f2' }}>
            Our team is here to help create an unforgettable experience tailored to your needs. 
            Call us today to discuss your private dining event and reserve your date.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="tel:+13364974025"
              className="text-lg px-8 py-4 w-full sm:w-auto font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
              style={{
                color: '#212121',
                backgroundColor: '#CCBB98',
                borderRadius: '4px',
                lineHeight: '1.3rem'
              }}
            >
              Call (336) 497-4025
            </a>
            <a
              href="mailto:eat@thegaslightonmain.com"
              className="text-lg px-8 py-4 w-full sm:w-auto font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl border"
              style={{
                color: '#CCBB98',
                backgroundColor: '#171717',
                borderColor: '#C89212',
                borderRadius: '4px',
                borderWidth: '1px',
                lineHeight: '1.3rem'
              }}
            >
              Email Us
            </a>
          </div>

          <p className="text-sm" style={{ color: '#a0a0a0' }}>
            Available during business hours: Wed-Thurs 4-8 PM, Fri-Sat 4-9 PM, Sun 11 AM-3 PM
          </p>
        </motion.div>
      </div>
    </section>
  )
}

