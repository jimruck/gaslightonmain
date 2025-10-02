'use client'

import { Car, Clock, MapPin, Info } from 'lucide-react'
import { motion } from 'framer-motion'

export function ParkingInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-accent-100 p-8"
    >
      <h3 className="text-2xl font-serif font-semibold text-accent-900 mb-6">
        Parking & Transportation
      </h3>

      <div className="space-y-6">
        {/* Street Parking */}
        <div className="flex items-start space-x-4">
          <Car className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-accent-900 mb-2">Street Parking</h4>
            <p className="text-accent-700 mb-2">
              Free street parking is available on Main Street and surrounding side streets.
            </p>
            <ul className="text-accent-700 space-y-1 text-sm">
              <li>• 2-hour time limit during business hours</li>
              <li>• No restrictions after 6 PM and on Sundays</li>
              <li>• Well-lit and safe walking distance</li>
            </ul>
          </div>
        </div>

        {/* Municipal Lot */}
        <div className="flex items-start space-x-4">
          <MapPin className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-accent-900 mb-2">Municipal Parking Lot</h4>
            <p className="text-accent-700 mb-2">
              Large public parking lot located one block behind the restaurant.
            </p>
            <ul className="text-accent-700 space-y-1 text-sm">
              <li>• Free after 5 PM on weekdays</li>
              <li>• Free all day on weekends</li>
              <li>• Well-maintained and secure</li>
              <li>• 2-minute walk to restaurant</li>
            </ul>
          </div>
        </div>

        {/* Valet Service */}
        <div className="flex items-start space-x-4">
          <Clock className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-accent-900 mb-2">Valet Service</h4>
            <p className="text-accent-700 mb-2">
              Complimentary valet parking available on Friday and Saturday evenings.
            </p>
            <ul className="text-accent-700 space-y-1 text-sm">
              <li>• Available from 6 PM - 11 PM</li>
              <li>• Located directly in front of restaurant</li>
              <li>• Professional and insured service</li>
            </ul>
          </div>
        </div>

        {/* Additional Information */}
        <div className="flex items-start space-x-4">
          <Info className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-accent-900 mb-2">Additional Options</h4>
            <ul className="text-accent-700 space-y-1 text-sm">
              <li>• Rideshare pickup/dropoff zone in front of restaurant</li>
              <li>• Bicycle parking available at side entrance</li>
              <li>• Loading zone for accessibility needs</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-accent-200">
        <div className="bg-primary-50 rounded-lg p-4">
          <h4 className="font-semibold text-primary-900 mb-2 flex items-center">
            <Car className="h-5 w-5 mr-2" />
            Parking Tips
          </h4>
          <p className="text-primary-800 text-sm">
            We recommend arriving 10-15 minutes early to allow time for parking. 
            If you have mobility concerns or need assistance, please call ahead and 
            we'll arrange for convenient parking options.
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-accent-600">
          Questions about parking?{' '}
          <a
            href="tel:+13369934567"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Call us at (336) 993-4567
          </a>
        </p>
      </div>
    </motion.div>
  )
}
