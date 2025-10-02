'use client'

import { MapPin, Phone, Mail, Accessibility } from 'lucide-react'
import { motion } from 'framer-motion'

export function LocationDetails() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-sm border border-accent-100 p-8"
    >
      <h3 className="text-2xl font-serif font-semibold text-accent-900 mb-6">
        Contact & Location
      </h3>

      <div className="space-y-6">
        {/* Address */}
        <div className="flex items-start space-x-4">
          <MapPin className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-accent-900 mb-1">Address</h4>
            <p className="text-accent-700 leading-relaxed">
              123 Main Street<br />
              Kernersville, NC 27284
            </p>
            <a
              href="https://maps.google.com/?q=The+Gaslight+on+Main+Kernersville+NC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              Get Directions →
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-4">
          <Phone className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-accent-900 mb-1">Phone</h4>
            <a
              href="tel:+13369934567"
              className="text-accent-700 hover:text-primary-600 transition-colors duration-200"
            >
              (336) 993-4567
            </a>
            <p className="text-sm text-accent-600 mt-1">
              Available during business hours for reservations and inquiries
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-4">
          <Mail className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-accent-900 mb-1">Email</h4>
            <a
              href="mailto:info@gaslightonmain.com"
              className="text-accent-700 hover:text-primary-600 transition-colors duration-200"
            >
              info@gaslightonmain.com
            </a>
            <p className="text-sm text-accent-600 mt-1">
              For general inquiries, private events, and catering requests
            </p>
          </div>
        </div>

        {/* Accessibility */}
        <div className="flex items-start space-x-4">
          <Accessibility className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-accent-900 mb-2">Accessibility</h4>
            <ul className="text-accent-700 space-y-1">
              <li>• Wheelchair accessible entrance and dining room</li>
              <li>• Accessible restroom facilities</li>
              <li>• Service animals welcome</li>
              <li>• Large print menus available upon request</li>
              <li>• Staff trained to assist guests with special needs</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-accent-200">
        <div className="bg-accent-50 rounded-lg p-4">
          <h4 className="font-semibold text-accent-900 mb-2">
            Special Accommodations
          </h4>
          <p className="text-accent-700 text-sm">
            Please call ahead if you have specific accessibility needs or dietary requirements. 
            Our team is happy to ensure your visit is comfortable and enjoyable.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
