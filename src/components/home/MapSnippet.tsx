'use client'

import { MapPin, Phone, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export function MapSnippet() {
  return (
    <section className="section-padding bg-accent-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-neutral-100 mb-4">
                Visit Us
              </h2>
              <p className="text-xl text-neutral-300 leading-relaxed">
                Located in the heart of historic downtown Kernersville, 
                we're easily accessible with convenient parking and a 
                welcoming atmosphere that makes every visit special.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-accent-900 mb-1">Address</h3>
                  <p className="text-accent-700">
                    123 Main Street<br />
                    Kernersville, NC 27284
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-accent-900 mb-1">Phone</h3>
                  <a 
                    href="tel:+13369934567"
                    className="text-accent-700 hover:text-primary-600 transition-colors duration-200"
                  >
                    (336) 993-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-accent-900 mb-2">Hours</h3>
                  <div className="space-y-1 text-accent-700">
                    <div className="flex justify-between">
                      <span>Monday - Thursday</span>
                      <span>5:00 PM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday - Saturday</span>
                      <span>5:00 PM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://maps.google.com/?q=The+Gaslight+on+Main+Kernersville+NC"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Get Directions
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg"
          >
            {/* Placeholder for Google Maps embed */}
            <div className="w-full h-full bg-accent-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-accent-400 mx-auto mb-4" />
                <p className="text-accent-600 font-medium">
                  Interactive Map
                </p>
                <p className="text-sm text-accent-500 mt-2">
                  Google Maps integration will be added here
                </p>
              </div>
            </div>
            
            {/* This would be replaced with actual Google Maps embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.123!2d-80.073!3d36.1198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzYwMDcnMTEuMyJOIDgwwrAwNCcyMi43Ilc!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="The Gaslight on Main Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
