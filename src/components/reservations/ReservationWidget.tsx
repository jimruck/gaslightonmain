'use client'

import { Calendar, Clock, Users, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export function ReservationWidget() {
  // Get next available time slot (rounded up to next 15-minute increment)
  const getDefaultTime = () => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    
    // Round up to next 15-minute increment
    const roundedMinute = Math.ceil(currentMinute / 15) * 15
    let defaultHour = currentHour
    let defaultMinute = roundedMinute
    
    // Handle minute overflow
    if (defaultMinute >= 60) {
      defaultHour += 1
      defaultMinute = 0
    }
    
    // Ensure we're within restaurant hours (4 PM - 9 PM)
    if (defaultHour < 16) { // Before 4 PM
      return "4:00 PM"
    } else if (defaultHour >= 21) { // After 9 PM
      return "4:00 PM" // Default to next day's first slot
    }
    
    // Convert to 12-hour format
    const hour12 = defaultHour > 12 ? defaultHour - 12 : defaultHour
    const ampm = defaultHour >= 12 ? 'PM' : 'AM'
    const minuteStr = defaultMinute.toString().padStart(2, '0')
    
    return `${hour12}:${minuteStr} ${ampm}`
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-8"
      style={{ border: '1px solid #f2f2f2' }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-semibold mb-4" style={{ color: '#212121' }}>
          Book Your Table
        </h2>
        <p style={{ color: '#171717' }}>
          Select your preferred date and time below, or call us directly for assistance.
        </p>
      </div>

      {/* Reservation Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
            <Calendar className="inline h-4 w-4 mr-1" />
            Date *
          </label>
          <input
            type="date"
            required
            defaultValue={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700"
            style={{ border: '1px solid #e0e0e0' }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
            <Clock className="inline h-4 w-4 mr-1" />
            Time *
          </label>
          <select required defaultValue={getDefaultTime()} className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700" style={{ border: '1px solid #e0e0e0' }}>
            <option value="">Select time</option>
            <option>4:00 PM</option>
            <option>4:15 PM</option>
            <option>4:30 PM</option>
            <option>4:45 PM</option>
            <option>5:00 PM</option>
            <option>5:15 PM</option>
            <option>5:30 PM</option>
            <option>5:45 PM</option>
            <option>6:00 PM</option>
            <option>6:15 PM</option>
            <option>6:30 PM</option>
            <option>6:45 PM</option>
            <option>7:00 PM</option>
            <option>7:15 PM</option>
            <option>7:30 PM</option>
            <option>7:45 PM</option>
            <option>8:00 PM</option>
            <option>8:15 PM</option>
            <option>8:30 PM</option>
            <option>8:45 PM</option>
            <option>9:00 PM</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
            <Users className="inline h-4 w-4 mr-1" />
            Party Size *
          </label>
          <select required defaultValue="2 people" className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700" style={{ border: '1px solid #e0e0e0' }}>
            <option value="">Select party size</option>
            <option>1 person</option>
            <option>2 people</option>
            <option>3 people</option>
            <option>4 people</option>
            <option>5 people</option>
            <option>6 people</option>
            <option>7+ people</option>
          </select>
        </div>
      </div>

      {/* Seating Preference */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-3" style={{ color: '#171717' }}>
          Seating Preference *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ border: '1px solid #e0e0e0' }}>
            <input type="radio" name="seating" value="main-dining" className="mr-3" required />
            <div>
              <div className="font-medium text-sm" style={{ color: '#171717' }}>Main Dining Room</div>
              <div className="text-xs" style={{ color: '#666' }}>Open, lively atmosphere</div>
            </div>
          </label>
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ border: '1px solid #e0e0e0' }}>
            <input type="radio" name="seating" value="alcove" className="mr-3" required />
            <div>
              <div className="font-medium text-sm" style={{ color: '#171717' }}>Alcove</div>
              <div className="text-xs" style={{ color: '#666' }}>Intimate, quieter setting</div>
            </div>
          </label>
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ border: '1px solid #e0e0e0' }}>
            <input type="radio" name="seating" value="bar" className="mr-3" required />
            <div>
              <div className="font-medium text-sm" style={{ color: '#171717' }}>Bar Seating</div>
              <div className="text-xs" style={{ color: '#666' }}>Watch the culinary action</div>
            </div>
          </label>
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ border: '1px solid #e0e0e0' }}>
            <input type="radio" name="seating" value="no-preference" className="mr-3" required defaultChecked />
            <div>
              <div className="font-medium text-sm" style={{ color: '#171717' }}>No Preference</div>
              <div className="text-xs" style={{ color: '#666' }}>We'll choose the best available</div>
            </div>
          </label>
        </div>
      </div>

      {/* Guest Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
            First Name *
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-500"
            style={{ border: '1px solid #e0e0e0' }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
            Last Name *
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-500"
            style={{ border: '1px solid #e0e0e0' }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
            Email Address *
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-500"
            style={{ border: '1px solid #e0e0e0' }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
            Phone Number *
          </label>
          <input
            type="tel"
            required
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-500"
            style={{ border: '1px solid #e0e0e0' }}
          />
        </div>
      </div>

      {/* Special Requests */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
          Special Requests or Dietary Restrictions
        </label>
        <textarea
          rows={4}
          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-500"
          style={{ border: '1px solid #e0e0e0' }}
          placeholder="Please let us know about any allergies, dietary restrictions, or special occasions..."
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button 
          className="w-full font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:opacity-90"
          style={{ backgroundColor: '#CCBB98', color: '#171717' }}
        >
          Reserve Table
        </button>
      </div>

      {/* Alternative Contact */}
      <div className="mt-8 pt-8 text-center" style={{ borderTop: '1px solid #f2f2f2' }}>
        <p className="mb-4" style={{ color: '#171717' }}>
          Prefer to speak with someone directly?
        </p>
        <a
          href="tel:+13364974025"
          className="inline-flex items-center space-x-2 font-medium transition-opacity duration-200 hover:opacity-80"
          style={{ color: '#835F3A' }}
        >
          <Phone className="h-5 w-5" />
          <span>(336) 497-4025</span>
        </a>
      </div>
    </motion.div>
  )
}
