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
        0: null, // Sunday - Closed
        1: { open: 17 * 60, close: 21 * 60 }, // Monday 5-9 PM
        2: { open: 17 * 60, close: 21 * 60 }, // Tuesday 5-9 PM
        3: { open: 17 * 60, close: 21 * 60 }, // Wednesday 5-9 PM
        4: { open: 17 * 60, close: 21 * 60 }, // Thursday 5-9 PM
        5: { open: 17 * 60, close: 22 * 60 }, // Friday 5-10 PM
        6: { open: 17 * 60, close: 22 * 60 }, // Saturday 5-10 PM
      }

      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const todaySchedule = schedule[day as keyof typeof schedule]

      let isOpen = false
      let status = 'Closed'
      let nextChange = ''

      if (todaySchedule && currentTime >= todaySchedule.open && currentTime < todaySchedule.close) {
        isOpen = true
        status = 'Open Now'
        const closeHour = Math.floor(todaySchedule.close / 60)
        const closeMinute = todaySchedule.close % 60
        const closeTime = `${closeHour > 12 ? closeHour - 12 : closeHour}:${closeMinute.toString().padStart(2, '0')} ${closeHour >= 12 ? 'PM' : 'AM'}`
        nextChange = `Closes at ${closeTime}`
      } else {
        // Find next opening
        let nextOpenDay = (day + 1) % 7
        let daysUntilOpen = 1

        while (daysUntilOpen <= 7) {
          const nextDaySchedule = schedule[nextOpenDay as keyof typeof schedule]
          if (nextDaySchedule) {
            const openHour = Math.floor(nextDaySchedule.open / 60)
            const openMinute = nextDaySchedule.open % 60
            const openTime = `${openHour > 12 ? openHour - 12 : openHour}:${openMinute.toString().padStart(2, '0')} ${openHour >= 12 ? 'PM' : 'AM'}`
            
            if (daysUntilOpen === 1) {
              nextChange = `Opens tomorrow at ${openTime}`
            } else if (daysUntilOpen === 2) {
              nextChange = `Opens ${dayNames[nextOpenDay]} at ${openTime}`
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
