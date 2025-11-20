'use client'

import { useState, useEffect } from 'react'
import { Clock, CheckCircle, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface HoursStatus {
  isOpen: boolean
  status: string
  nextChange: string
  currentDay: string
}

export function LiveHours() {
  const [hoursStatus, setHoursStatus] = useState<HoursStatus>({
    isOpen: false,
    status: 'Closed',
    nextChange: 'Opens tomorrow at 5:00 PM',
    currentDay: 'Sunday'
  })

  useEffect(() => {
    const updateHoursStatus = () => {
      const now = new Date()
      const day = now.getDay() // 0 = Sunday, 1 = Monday, etc.
      const hour = now.getHours()
      const minute = now.getMinutes()
      const currentTime = hour * 60 + minute // Convert to minutes

      const schedule = {
        0: [{ open: 11 * 60, close: 15 * 60 }], // Sunday - Brunch
        1: null, // Monday - Closed
        2: null, // Tuesday - Closed
        3: [{ open: 16 * 60, close: 20 * 60 }], // Wednesday - Dinner
        4: [
          { open: 11 * 60 + 30, close: 15 * 60 }, // Thursday - Lunch
          { open: 16 * 60, close: 20 * 60 } // Thursday - Dinner
        ],
        5: [
          { open: 11 * 60 + 30, close: 15 * 60 }, // Friday - Lunch
          { open: 16 * 60, close: 21 * 60 } // Friday - Dinner
        ],
        6: [
          { open: 11 * 60 + 30, close: 15 * 60 }, // Saturday - Lunch
          { open: 16 * 60, close: 21 * 60 } // Saturday - Dinner
        ],
      }

      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const todaySchedule = schedule[day as keyof typeof schedule]

      let isOpen = false
      let status = 'Closed'
      let nextChange = ''

      // Check if we're in any open period today
      if (todaySchedule && Array.isArray(todaySchedule)) {
        for (const period of todaySchedule) {
          if (currentTime >= period.open && currentTime < period.close) {
            isOpen = true
            status = 'Open Now'
            const closeHour = Math.floor(period.close / 60)
            const closeMinute = period.close % 60
            const closeTime = `${closeHour > 12 ? closeHour - 12 : closeHour}:${closeMinute.toString().padStart(2, '0')} ${closeHour >= 12 ? 'PM' : 'AM'}`
            nextChange = `Closes at ${closeTime}`
            break
          }
        }
        
        // If not open now, check if we're between periods
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

      setHoursStatus({
        isOpen,
        status,
        nextChange,
        currentDay: dayNames[day]
      })
    }

    updateHoursStatus()
    const interval = setInterval(updateHoursStatus, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-20 right-4 z-40 hidden md:block"
    >
      <div className={`
        px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border
        ${hoursStatus.isOpen 
          ? 'bg-green-500/90 border-green-400 text-white' 
          : 'bg-red-500/90 border-red-400 text-white'
        }
      `}>
        <div className="flex items-center space-x-2">
          {hoursStatus.isOpen ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <div>
            <div className="font-semibold text-sm">{hoursStatus.status}</div>
            <div className="text-xs opacity-90">{hoursStatus.nextChange}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
