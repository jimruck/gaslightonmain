'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function Hero() {
  const [statusInfo, setStatusInfo] = useState({
    isOpen: false,
    status: 'Closed',
    nextOpen: 'Opens today at 4:00 PM'
  })

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date()
      const currentDay = now.getDay()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      const currentTime = currentHour * 60 + currentMinute

      const hours = [
        { day: 'Wed, Thurs', time: '4:00 PM - 8:00 PM', open: true, days: [3, 4] },
        { day: 'Fri, Sat', time: '4:00 PM - 9:00 PM', open: true, days: [5, 6] },
        { day: 'Sun', time: '11:00 AM - 3:00 PM', open: true, days: [0] },
      ]

      const openDays = new Set([0, 3, 4, 5, 6])
      const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

      const getScheduleForDay = (day: number) => {
        if (day === 0) return { openM: 11 * 60 + 0, closeM: 15 * 60 + 0, openLabel: '11:00 AM', closeLabel: '3:00 PM' }
        if (day === 3 || day === 4) return { openM: 16 * 60 + 0, closeM: 20 * 60 + 0, openLabel: '4:00 PM', closeLabel: '8:00 PM' }
        if (day === 5 || day === 6) return { openM: 16 * 60 + 0, closeM: 21 * 60 + 0, openLabel: '4:00 PM', closeLabel: '9:00 PM' }
        return null
      }

      const getNextOpenInfo = (startDay: number) => {
        for (let i = 1; i <= 7; i++) {
          const d = (startDay + i) % 7
          if (openDays.has(d)) {
            const sched = getScheduleForDay(d)!
            return { day: d, openLabel: sched.openLabel }
          }
        }
        // fallback to Wednesday
        return { day: 3, openLabel: '4:00 PM' }
      }

      // Determine today's schedule (if any)
      const todaysSchedule = getScheduleForDay(currentDay)

      // If today is an open day and current time is within hours => Open
      if (todaysSchedule && currentTime >= todaysSchedule.openM && currentTime < todaysSchedule.closeM) {
        setStatusInfo({ isOpen: true, status: 'Open', nextOpen: `Open until ${todaysSchedule.closeLabel}` })
        return
      }

      // After close logic: from close time to 23:59 same day
      if (todaysSchedule && currentTime >= todaysSchedule.closeM) {
        // Special case: Sunday night until 11:59 PM Monday should say Opens Wednesday
        if (currentDay === 0) {
          const wed = getScheduleForDay(3)!
          setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens Wednesday at ${wed.openLabel}` })
          return
        }

        const nextInfo = getNextOpenInfo(currentDay)
        if ((currentDay + 1) % 7 === nextInfo.day) {
          setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens tomorrow at ${nextInfo.openLabel}` })
        } else {
          setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens ${weekdayNames[nextInfo.day]} at ${nextInfo.openLabel}` })
        }
        return
      }

      // Before open today (if today is open)
      if (todaysSchedule && currentTime < todaysSchedule.openM) {
        setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens today at ${todaysSchedule.openLabel}` })
        return
      }

      // Closed days (Mon/Tue) and any other times
      if (currentDay === 1) {
        // Monday all day -> Opens Wednesday at 4:00 PM
        const wed = getScheduleForDay(3)!
        setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens Wednesday at ${wed.openLabel}` })
        return
      }
      if (currentDay === 2) {
        // Tuesday all day -> Opens tomorrow (Wednesday)
        const wed = getScheduleForDay(3)!
        setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens tomorrow at ${wed.openLabel}` })
        return
      }

      // Fallback: compute next opening normally
      const nextInfo = getNextOpenInfo(currentDay)
      const isTomorrow = (currentDay + 1) % 7 === nextInfo.day
      setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: isTomorrow ? `Opens tomorrow at ${nextInfo.openLabel}` : `Opens ${weekdayNames[nextInfo.day]} at ${nextInfo.openLabel}` })
    }

    updateStatus()
    const interval = setInterval(updateStatus, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand/images/Firefly_Center-cut-filet-confit-garlic-whipped-Yukon-potatoes-haricot-vert-and-red-wine-ju-426440.jpg"
          alt="Elegant plated dish at The Gaslight on Main"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 text-center text-white container-custom pb-20" style={{ paddingTop: '1rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo - No glowing dot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Image
              src="/brand/logos/gaslight-logo-light.svg"
              alt="The Gaslight on Main"
              width={400}
              height={150}
              className="mx-auto w-auto h-32 md:h-40 lg:h-48"
              priority
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-white max-w-2xl mx-auto leading-relaxed"
          >
            Experience elegant New American cuisine in the heart of Kernersville. 
            Fresh, seasonal ingredients meet sophisticated flavors in our warm, 
            welcoming atmosphere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Link 
              href="/reservations" 
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto"
              style={{ lineHeight: '1.3rem' }}
            >
              Book a Table
            </Link>
            <Link 
              href="/menu" 
              className="text-lg px-8 py-4 w-full sm:w-auto font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg border"
              style={{
                color: '#CCBB98',
                backgroundColor: '#171717',
                borderColor: '#C89212',
                borderRadius: '4px',
                borderWidth: '1px',
                lineHeight: '1.3rem'
              }}
            >
              View Menu
            </Link>
          </motion.div>

          {/* Dynamic Status Dot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center space-x-3"
          >
            <div className={`relative w-2 h-2 rounded-full shadow-lg ${
              statusInfo.isOpen 
                ? 'bg-orange-glow shadow-orange-glow/50' 
                : 'bg-gray-400 shadow-gray-400/50'
            }`}>
              {statusInfo.isOpen && (
                <>
                  <motion.div
                    animate={{
                      opacity: [1, 0.3, 1],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 w-2 h-2 bg-orange-glow rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 0, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 w-2 h-2 bg-orange-glow rounded-full"
                  />
                </>
              )}
            </div>
            <span className="text-white text-lg font-medium">{statusInfo.nextOpen}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}