'use client'

import { AlertCircle, Users, Clock, Accessibility, Cake } from 'lucide-react'
import { motion } from 'framer-motion'

export function ReservationPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm p-6 md:p-8"
      style={{ border: '1px solid #f2f2f2' }}
    >
      <h3 className="text-xl md:text-2xl font-serif font-semibold mb-6 text-center" style={{ color: '#212121' }}>
        Reservation Policies
      </h3>

      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {/* Cancellation Policy */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 md:h-6 md:w-6" style={{ color: '#835F3A' }} />
            <h4 className="text-base md:text-lg font-semibold" style={{ color: '#171717' }}>Cancellation Policy</h4>
          </div>
          <div className="space-y-2" style={{ color: '#171717' }}>
            <p className="text-sm md:text-base">• Reservations may be cancelled up to 24 hours before your scheduled time</p>
            <p className="text-sm md:text-base">• No-shows or late cancellations may incur a $15 per person fee</p>
            <p className="text-sm md:text-base">• We hold tables for 10 minutes past reservation time. Please call if you are running late.</p>
            <p className="text-sm md:text-base">• We accept a limited number of walk-ins based on availability.</p>
          </div>
        </div>

        {/* Party Size Guidelines */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 md:h-6 md:w-6" style={{ color: '#835F3A' }} />
            <h4 className="text-base md:text-lg font-semibold" style={{ color: '#171717' }}>Party Size Guidelines</h4>
          </div>
          <div className="space-y-2" style={{ color: '#171717' }}>
            <p className="text-sm md:text-base">• Online reservations are accepted for parties up to 6 guests.</p>
            <p className="text-sm md:text-base">• Parties of 7 or more require a phone reservation</p>
            <p className="text-sm md:text-base">• Private dining options available for groups up to 40 guests</p>
          </div>
        </div>

        {/* Timing Information
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 md:h-6 md:w-6" style={{ color: '#835F3A' }} />
            <h4 className="text-base md:text-lg font-semibold" style={{ color: '#171717' }}>Dining Experience</h4>
          </div>
          <div className="space-y-2" style={{ color: '#171717' }}>
            <p className="text-sm md:text-base">• Please allow 1.5-2 hours for your dining experience</p>
            <p className="text-sm md:text-base">• Kitchen closes 30 minutes before restaurant closing</p>
            <p className="text-sm md:text-base">• Last seating is 1 hour before closing time</p>
          </div>
        </div> */}

        {/* Special Occasions */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Cake className="h-5 w-5 md:h-6 md:w-6" style={{ color: '#835F3A' }} />
            <h4 className="text-base md:text-lg font-semibold" style={{ color: '#171717' }}>Special Occasions</h4>
          </div>
          <div className="space-y-2" style={{ color: '#171717' }}>
            <p className="text-sm md:text-base">• Call or email us when making your reservation and we will ensure your evening is extra memorable.</p>
            <p className="text-sm md:text-base">• We offer a $15 corkage fee per bottle of wine not featured on our list and a $2 per guest cake-cutting and plating fee for celebration cakes.</p>
          </div>
        </div>

        {/* Accessibility */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Accessibility className="h-5 w-5 md:h-6 md:w-6" style={{ color: '#835F3A' }} />
            <h4 className="text-base md:text-lg font-semibold" style={{ color: '#171717' }}>Accessibility</h4>
          </div>
          <div className="space-y-2" style={{ color: '#171717' }}>
            <p className="text-sm md:text-base">• We accommodate accessibility needs and dietary restrictions with advance notice</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4" style={{ borderTop: '1px solid #f2f2f2' }}>
      <div className="mt-4 text-center">
        <p className="text-xs md:text-sm" style={{ color: '#171717' }}>
          For questions about our policies or to make special arrangements, 
          please call us at{' '}
          <a 
            href="tel:+13364974025"
            className="font-medium transition-opacity duration-200 hover:opacity-80"
            style={{ color: '#835F3A' }}
          >
            (336) 497-4025
          </a>
        </p>
      </div>
      </div>
    </motion.div>
  )
}
