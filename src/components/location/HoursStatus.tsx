'use client'

import { useState, useEffect } from 'react'
import { Clock, CheckCircle, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface HoursInfo {
  isOpen: boolean
  status: string
  nextChange: string
  kitchenStatus: string
  barStatus: string
}

export function HoursStatus() {
  const [hoursInfo, setHoursInfo] = useState<HoursInfo>({
    isOpen: false,
    status: 'Closed',
    nextChange: 'Opens tomorrow at 5:00 PM',
    kitchenStatus: 'Kitchen Closed',
    barStatus: 'Bar Closed'
  })

  useEffect(() => {
    const updateHoursInfo = () => {
      const now = new Date()
      const day = now.getDay()
      const hour = now.getHours()
      const minute = now.getMinutes()
      const currentTime = hour * 60 + minute

      // Restaurant hours:
      // Wednesday: 4:00 PM - 8:00 PM (Dinner)
      // Thursday: 11:30 AM - 3:00 PM (Lunch), 4:00 PM - 8:00 PM (Dinner)
      // Friday: 11:30 AM - 3:00 PM (Lunch), 4:00 PM - 9:00 PM (Dinner)
      // Saturday: 11:30 AM - 3:00 PM (Lunch), 4:00 PM - 9:00 PM (Dinner)
      // Sunday: 11:00 AM - 3:00 PM (Brunch)
      // Monday & Tuesday: Closed
      // Kitchen closes 30 minutes before restaurant
      // Bar stays open until closing
      
      const schedule = {
        0: [{ open: 11 * 60, close: 15 * 60, kitchenClose: 14.5 * 60 }], // Sunday - Brunch
        1: null, // Monday - Closed
        2: null, // Tuesday - Closed
        3: [{ open: 16 * 60, close: 20 * 60, kitchenClose: 19.5 * 60 }], // Wednesday - Dinner
        4: [
          { open: 11 * 60 + 30, close: 15 * 60, kitchenClose: 14.5 * 60 }, // Thursday - Lunch
          { open: 16 * 60, close: 20 * 60, kitchenClose: 19.5 * 60 } // Thursday - Dinner
        ],
        5: [
          { open: 11 * 60 + 30, close: 15 * 60, kitchenClose: 14.5 * 60 }, // Friday - Lunch
          { open: 16 * 60, close: 21 * 60, kitchenClose: 20.5 * 60 } // Friday - Dinner
        ],
        6: [
          { open: 11 * 60 + 30, close: 15 * 60, kitchenClose: 14.5 * 60 }, // Saturday - Lunch
          { open: 16 * 60, close: 21 * 60, kitchenClose: 20.5 * 60 } // Saturday - Dinner
        ],
      }

      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const todaySchedule = schedule[day as keyof typeof schedule]

      let isOpen = false
      let status = 'Closed'
      let nextChange = ''
      let kitchenStatus = 'Kitchen Closed'
      let barStatus = 'Bar Closed'

      // Check if we're in any open period today
      if (todaySchedule && Array.isArray(todaySchedule)) {
        for (const period of todaySchedule) {
          if (currentTime >= period.open && currentTime < period.close) {
            isOpen = true
            status = 'Open Now'
            
            // Kitchen status
            if (currentTime < period.kitchenClose) {
              kitchenStatus = 'Kitchen Open'
            } else {
              kitchenStatus = 'Kitchen Closed'
            }
            
            barStatus = 'Bar Open'
            
            const closeHour = Math.floor(period.close / 60)
            const closeMinute = period.close % 60
            const closeTime = `${closeHour > 12 ? closeHour - 12 : closeHour}:${closeMinute.toString().padStart(2, '0')} ${closeHour >= 12 ? 'PM' : 'AM'}`
            nextChange = `Closes at ${closeTime}`
            break
          }
        }
        
        // If not open now, check if we're between periods (e.g., between lunch and dinner)
        if (!isOpen && todaySchedule.length > 1) {
          const firstPeriod = todaySchedule[0]
          const secondPeriod = todaySchedule[1]
          if (currentTime >= firstPeriod.close && currentTime < secondPeriod.open) {
            const openHour = Math.floor(secondPeriod.open / 60)
            const openMinute = secondPeriod.open % 60
            const openTime = `${openHour > 12 ? openHour - 12 : openHour}:${openMinute.toString().padStart(2, '0')} ${openHour >= 12 ? 'PM' : 'AM'}`
            nextChange = `Reopens today at ${openTime}`
          }
        }
      }
      
      if (!isOpen && !nextChange) {
        // Find next opening
        let nextOpenDay = (day + 1) % 7
        let daysUntilOpen = 1

        while (daysUntilOpen <= 7) {
          const nextDaySchedule = schedule[nextOpenDay as keyof typeof schedule]
          if (nextDaySchedule && Array.isArray(nextDaySchedule)) {
            const firstPeriod = nextDaySchedule[0]
            const openHour = Math.floor(firstPeriod.open / 60)
            const openMinute = firstPeriod.open % 60
            const openTime = `${openHour > 12 ? openHour - 12 : openHour}:${openMinute.toString().padStart(2, '0')} ${openHour >= 12 ? 'PM' : 'AM'}`
            
            if (daysUntilOpen === 1) {
              nextChange = `Opens tomorrow at ${openTime}`
            } else {
              nextChange = `Opens ${dayNames[nextOpenDay]} at ${openTime}`
            }
            break
          }
          nextOpenDay = (nextOpenDay + 1) % 7
          daysUntilOpen++
        }
      }

      setHoursInfo({
        isOpen,
        status,
        nextChange,
        kitchenStatus,
        barStatus
      })
    }

    updateHoursInfo()
    const interval = setInterval(updateHoursInfo, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg border border-accent-100 p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-semibold text-accent-900 mb-4">
          Current Status
        </h2>
        <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full text-lg font-semibold ${
          hoursInfo.isOpen 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {hoursInfo.isOpen ? (
            <CheckCircle className="h-6 w-6" />
          ) : (
            <XCircle className="h-6 w-6" />
          )}
          <span>{hoursInfo.status}</span>
        </div>
        <p className="text-accent-600 mt-2">{hoursInfo.nextChange}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Restaurant Status */}
        <div className="text-center">
          <Clock className="h-8 w-8 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-accent-900 mb-2">Restaurant</h3>
          <p className={`font-medium ${hoursInfo.isOpen ? 'text-green-600' : 'text-red-600'}`}>
            {hoursInfo.status}
          </p>
        </div>

        {/* Kitchen Status */}
        <div className="text-center">
          <div className="h-8 w-8 mx-auto mb-3 flex items-center justify-center">
            <span className="text-2xl">🍳</span>
          </div>
          <h3 className="font-semibold text-accent-900 mb-2">Kitchen</h3>
          <p className={`font-medium ${hoursInfo.kitchenStatus.includes('Open') ? 'text-green-600' : 'text-red-600'}`}>
            {hoursInfo.kitchenStatus}
          </p>
        </div>

        {/* Bar Status */}
        <div className="text-center">
          <div className="h-8 w-8 mx-auto mb-3 flex items-center justify-center">
            <span className="text-2xl">🍷</span>
          </div>
          <h3 className="font-semibold text-accent-900 mb-2">Bar</h3>
          <p className={`font-medium ${hoursInfo.barStatus.includes('Open') ? 'text-green-600' : 'text-red-600'}`}>
            {hoursInfo.barStatus}
          </p>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="mt-8 pt-8 border-t border-accent-200">
        <h3 className="text-xl font-serif font-semibold text-accent-900 mb-6 text-center">
          Weekly Hours
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-start py-2">
            <span className="font-medium text-accent-900">Wed</span>
            <span className="text-accent-700 text-right">4:00 PM - 8:00 PM</span>
          </div>
          <div className="flex justify-between items-start py-2">
            <span className="font-medium text-accent-900">Thu</span>
            <div className="flex flex-col items-end">
              <span className="text-accent-700">11:30 AM - 3:00 PM</span>
              <span className="text-accent-700">4:00 PM - 8:00 PM</span>
            </div>
          </div>
          <div className="flex justify-between items-start py-2">
            <span className="font-medium text-accent-900">Fri, Sat</span>
            <div className="flex flex-col items-end">
              <span className="text-accent-700">11:30 AM - 3:00 PM</span>
              <span className="text-accent-700">4:00 PM - 9:00 PM</span>
            </div>
          </div>
          <div className="flex justify-between items-start py-2">
            <span className="font-medium text-accent-900">Sun</span>
            <span className="text-accent-700 text-right">11:00 AM - 3:00 PM</span>
          </div>
        </div>
        <p className="text-sm text-accent-600 mt-4 text-center">
          Kitchen closes 30 minutes before restaurant closing time
        </p>
      </div>
    </motion.div>
  )
}
