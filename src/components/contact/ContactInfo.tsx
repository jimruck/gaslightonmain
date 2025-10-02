'use client'

import { Phone, Mail, MapPin, Clock, Calendar, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      {/* Contact Details */}
      <div className="bg-white rounded-xl shadow-sm p-8" style={{ border: '1px solid #f2f2f2' }}>
        <h3 className="text-2xl font-serif font-semibold mb-6" style={{ color: '#212121' }}>
          Get in Touch
        </h3>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Phone className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: '#835F3A' }} />
            <div>
              <h4 className="font-semibold mb-1" style={{ color: '#171717' }}>Phone</h4>
              <a
                href="tel:+13364974025"
                className="text-lg hover:opacity-80 transition-opacity duration-200"
                style={{ color: '#835F3A' }}
              >
                (336) 497-4025
              </a>
              <p className="text-sm mt-1" style={{ color: '#171717' }}>
                Available during business hours
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Mail className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: '#835F3A' }} />
            <div>
              <h4 className="font-semibold mb-1" style={{ color: '#171717' }}>Email</h4>
              <a
                href="mailto:eat@thegaslightonmain.com"
                className="hover:opacity-80 transition-opacity duration-200"
                style={{ color: '#835F3A' }}
              >
                eat@thegaslightonmain.com
              </a>
              <p className="text-sm mt-1" style={{ color: '#171717' }}>
                We respond within 24 hours
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <MapPin className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: '#835F3A' }} />
            <div>
              <h4 className="font-semibold mb-1" style={{ color: '#171717' }}>Address</h4>
              <p style={{ color: '#171717' }}>
                126 S Main Street, Suite G<br />
                Kernersville, NC 27284
              </p>
              <a
                href="https://maps.google.com/?q=The+Gaslight+on+Main+Kernersville+NC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 font-medium hover:opacity-80 transition-opacity duration-200"
                style={{ color: '#835F3A' }}
              >
                Get Directions →
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Clock className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: '#835F3A' }} />
            <div>
              <h4 className="font-semibold mb-2" style={{ color: '#171717' }}>Hours</h4>
              <div className="space-y-1 text-sm" style={{ color: '#171717' }}>
                <div className="flex justify-between items-center">
                  <span>Wed, Thurs</span>
                  <span>4:00 PM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Fri, Sat</span>
                  <span>4:00 PM - 9:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sun</span>
                  <span>11:00 AM - 3:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-8" style={{ border: '1px solid #f2f2f2' }}>
        <h3 className="text-2xl font-serif font-semibold mb-6" style={{ color: '#212121' }}>
          Quick Actions
        </h3>

        <div className="space-y-4">
          <a
            href="/reservations"
            className="flex items-center space-x-3 p-4 rounded-lg hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: '#fdf6e3' }}
          >
            <Calendar className="h-6 w-6" style={{ color: '#835F3A' }} />
            <div>
              <h4 className="font-semibold" style={{ color: '#171717' }}>Make a Reservation</h4>
              <p className="text-sm" style={{ color: '#171717' }}>Book your table online</p>
            </div>
          </a>

          <a
            href="/events"
            className="flex items-center space-x-3 p-4 rounded-lg hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: '#fdf6e3' }}
          >
            <Users className="h-6 w-6" style={{ color: '#835F3A' }} />
            <div>
              <h4 className="font-semibold" style={{ color: '#171717' }}>Private Events</h4>
              <p className="text-sm" style={{ color: '#171717' }}>Plan your special occasion</p>
            </div>
          </a>
        </div>
      </div>

    </motion.div>
  )
}
