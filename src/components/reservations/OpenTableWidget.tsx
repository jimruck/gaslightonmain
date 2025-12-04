'use client'

import { motion } from 'framer-motion'

export function OpenTableWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
      style={{ border: '1px solid #f2f2f2' }}
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-2" style={{ color: '#212121' }}>
          Book Your Table
        </h2>
        <p className="text-sm md:text-base" style={{ color: '#171717' }}>
          Reserve your table online through OpenTable for instant confirmation.
        </p>
      </div>

      {/* OpenTable Widget - Vertically centered with equal padding */}
      <div className="flex justify-center w-full py-6">
        <iframe
          src="https://www.opentable.com/widget/reservation/canvas?rid=1435423&theme=standard&color=3&iframe=true&domain=com&lang=en-US&ot_source=Restaurant%20website"
          width="100%"
          height="310"
          frameBorder="0"
          scrolling="no"
          style={{
            maxWidth: '225px',
            borderRadius: '8px',
            backgroundColor: '#fff8eb'
          }}
          title="OpenTable Reservation Widget"
        />
      </div>

      {/* OpenTable Diners' Choice Badge - Centered below widget */}
      <div className="flex justify-center mb-4">
        <img
          src="/brand/images/DC2-2025.png"
          alt="OpenTable Diners' Choice 2025"
          className="w-[150px] h-[150px] object-contain"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
        />
      </div>

      {/* Alternative Contact */}
      <div className="mt-4 pt-3 text-center" style={{ borderTop: '1px solid #f2f2f2' }}>
        <p className="mb-2 text-sm md:text-base" style={{ color: '#171717' }}>
          Prefer to book over the phone or need to speak to someone about a private dining event? Call or email us:
        </p>
        <a
          href="tel:+13364974025"
          className="inline-flex items-center space-x-2 font-medium transition-opacity duration-200 hover:opacity-80 text-sm md:text-base"
          style={{ color: '#835F3A' }}
        >
          <span>(336) 497-4025</span>
        </a>
        <br />
        <a
          href="mailto:eat@thegaslightonmain.com"
          className="inline-flex items-center space-x-2 font-medium transition-opacity duration-200 hover:opacity-80 text-sm md:text-base"
          style={{ color: '#835F3A' }}
        >
          <span>eat@thegaslightonmain.com</span>
        </a>
      </div>
    </motion.div>
  )
}
