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

      const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

      const getScheduleForDay = (day: number) => {
        // Returns array of periods for the day, or null if closed
        if (day === 0) return [{ openM: 11 * 60 + 0, closeM: 15 * 60 + 0, openLabel: '11:00 AM', closeLabel: '3:00 PM' }] // Sunday - Brunch
        if (day === 1 || day === 2) return null // Monday, Tuesday - Closed
        if (day === 3) return [{ openM: 16 * 60 + 0, closeM: 20 * 60 + 0, openLabel: '4:00 PM', closeLabel: '8:00 PM' }] // Wednesday - Dinner
        if (day === 4) return [
          { openM: 11 * 60 + 30, closeM: 15 * 60 + 0, openLabel: '11:30 AM', closeLabel: '3:00 PM' }, // Thursday - Lunch
          { openM: 16 * 60 + 0, closeM: 20 * 60 + 0, openLabel: '4:00 PM', closeLabel: '8:00 PM' } // Thursday - Dinner
        ]
        if (day === 5 || day === 6) return [
          { openM: 11 * 60 + 30, closeM: 15 * 60 + 0, openLabel: '11:30 AM', closeLabel: '3:00 PM' }, // Friday/Saturday - Lunch
          { openM: 16 * 60 + 0, closeM: 21 * 60 + 0, openLabel: '4:00 PM', closeLabel: '9:00 PM' } // Friday/Saturday - Dinner
        ]
        return null
      }

      const getNextOpenInfo = (startDay: number) => {
        for (let i = 1; i <= 7; i++) {
          const d = (startDay + i) % 7
          const sched = getScheduleForDay(d)
          if (sched && sched.length > 0) {
            return { day: d, openLabel: sched[0].openLabel }
          }
        }
        // fallback to Wednesday
        return { day: 3, openLabel: '4:00 PM' }
      }

      // Determine today's schedule (if any)
      const todaysSchedule = getScheduleForDay(currentDay)

      // Check if we're in any open period today
      if (todaysSchedule && Array.isArray(todaysSchedule)) {
        for (const period of todaysSchedule) {
          if (currentTime >= period.openM && currentTime < period.closeM) {
            setStatusInfo({ isOpen: true, status: 'Open', nextOpen: `Open until ${period.closeLabel}` })
            return
          }
        }
        
        // Check if we're between periods (e.g., between lunch and dinner)
        if (todaysSchedule.length > 1) {
          const firstPeriod = todaysSchedule[0]
          const secondPeriod = todaysSchedule[1]
          if (currentTime >= firstPeriod.closeM && currentTime < secondPeriod.openM) {
            setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Reopens today at ${secondPeriod.openLabel}` })
            return
          }
        }
        
        // After last period closes today
        const lastPeriod = todaysSchedule[todaysSchedule.length - 1]
        if (currentTime >= lastPeriod.closeM) {
          // Special case: Sunday night until 11:59 PM Monday should say Opens Wednesday
          if (currentDay === 0) {
            const wed = getScheduleForDay(3)!
            setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens Wednesday at ${wed[0].openLabel}` })
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
        
        // Before first period opens today
        const firstPeriod = todaysSchedule[0]
        if (currentTime < firstPeriod.openM) {
          setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens today at ${firstPeriod.openLabel}` })
          return
        }
      }

      // Closed days (Mon/Tue) and any other times
      if (currentDay === 1) {
        // Monday all day -> Opens Wednesday at 4:00 PM
        const wed = getScheduleForDay(3)!
        setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens Wednesday at ${wed[0].openLabel}` })
        return
      }
      if (currentDay === 2) {
        // Tuesday all day -> Opens tomorrow (Wednesday)
        const wed = getScheduleForDay(3)!
        setStatusInfo({ isOpen: false, status: 'Closed', nextOpen: `Opens tomorrow at ${wed[0].openLabel}` })
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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/brand/images/gaslight_hero.mp4" type="video/mp4" />
        </video>
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
            style={{ filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.8))' }}
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
            style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            Experience elegant New American cuisine in the heart of Kernersville. 
            Fresh, seasonal ingredients meet sophisticated flavors in our warm, 
            welcoming atmosphere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 relative"
            style={{ zIndex: 9999 }}
          >
            <Link 
              href="/reservations"
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto shadow-lg hover:shadow-2xl transition-shadow relative"
              style={{ lineHeight: '1.3rem', zIndex: 10000 }}
            >
              Book a Table
            </Link>
            <Link 
              href="/menu" 
              className="text-lg px-8 py-4 w-full sm:w-auto font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl border relative"
              style={{
                color: '#CCBB98',
                backgroundColor: '#171717',
                borderColor: '#C89212',
                borderRadius: '4px',
                borderWidth: '1px',
                lineHeight: '1.3rem',
                zIndex: 10000
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
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.7))' }}
          >
            <div className="relative flex items-center justify-center">
              {(() => {
                const isReopens = statusInfo.nextOpen.toLowerCase().includes('reopens')
                const yellowColor = '#FFD700' // Gold/Yellow color
                
                return (
                  <>
                    {/* Core flame */}
                    <motion.div 
                      className={`relative w-2 h-2 rounded-full z-10 ${
                        statusInfo.isOpen 
                          ? 'bg-orange-glow' 
                          : isReopens
                            ? 'bg-yellow-500'
                            : 'bg-gray-400'
                      }`}
                      animate={statusInfo.isOpen ? {
                        boxShadow: [
                          '0 0 4px #FF5F00, 0 0 8px #FF5F00',
                          '0 0 6px #FF5F00, 0 0 12px #FF5F00, 0 0 16px rgba(255, 95, 0, 0.5)',
                          '0 0 4px #FF5F00, 0 0 8px #FF5F00',
                          '0 0 5px #FF5F00, 0 0 10px #FF5F00, 0 0 14px rgba(255, 95, 0, 0.4)',
                          '0 0 4px #FF5F00, 0 0 8px #FF5F00',
                        ],
                      } : isReopens ? {
                        boxShadow: [
                          '0 0 6px #FFD700, 0 0 12px rgba(255, 215, 0, 0.6)',
                          '0 0 10px #FFD700, 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.4)',
                          '0 0 6px #FFD700, 0 0 12px rgba(255, 215, 0, 0.6)',
                        ],
                      } : {}}
                      transition={statusInfo.isOpen ? {
                        duration: 1.0,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.25, 0.5, 0.75, 1]
                      } : isReopens ? {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.5, 1]
                      } : {}}
                    />
                    
                    {statusInfo.isOpen && (
                      <>
                        {/* Inner glow - flickers quickly */}
                        <motion.div
                          animate={{
                            opacity: [0.9, 0.4, 0.8, 0.5, 0.95, 0.6, 0.85],
                            scale: [1, 1.1, 0.95, 1.15, 1, 1.05, 1],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1]
                          }}
                          className="absolute inset-0 w-2 h-2 bg-orange-glow rounded-full blur-[2px]"
                          style={{ 
                            boxShadow: '0 0 4px #FF5F00, 0 0 8px #FF5F00',
                          }}
                        />
                        
                        {/* Middle glow ring - medium flicker */}
                        <motion.div
                          animate={{
                            opacity: [0.7, 0.3, 0.6, 0.4, 0.75, 0.5, 0.7],
                            scale: [1.3, 1.5, 1.2, 1.6, 1.3, 1.4, 1.3],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1]
                          }}
                          className="absolute inset-0 w-2 h-2 bg-orange-glow rounded-full blur-[4px]"
                          style={{ 
                            boxShadow: '0 0 6px #FF5F00, 0 0 12px #FF5F00',
                          }}
                        />
                        
                        {/* Outer glow ring - slow pulse */}
                        <motion.div
                          animate={{
                            opacity: [0.5, 0.2, 0.4, 0.3, 0.55, 0.25, 0.5],
                            scale: [1.8, 2.2, 1.7, 2.3, 1.9, 2.1, 1.8],
                          }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.25, 0.4, 0.55, 0.7, 0.85, 1]
                          }}
                          className="absolute inset-0 w-2 h-2 bg-orange-glow rounded-full blur-[6px]"
                          style={{ 
                            boxShadow: '0 0 8px #FF5F00, 0 0 16px #FF5F00, 0 0 24px rgba(255, 95, 0, 0.5)',
                          }}
                        />
                        
                        {/* Far outer glow - very slow expansion */}
                        <motion.div
                          animate={{
                            opacity: [0.3, 0.1, 0.25, 0.15, 0.35, 0.2, 0.3],
                            scale: [2.5, 3, 2.4, 3.2, 2.6, 2.9, 2.5],
                          }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
                          }}
                          className="absolute inset-0 w-2 h-2 bg-orange-glow rounded-full blur-[8px]"
                          style={{ 
                            boxShadow: '0 0 12px rgba(255, 95, 0, 0.6), 0 0 24px rgba(255, 95, 0, 0.4), 0 0 36px rgba(255, 95, 0, 0.3)',
                          }}
                        />
                      </>
                    )}

                    {isReopens && (
                      <>
                        {/* Inner yellow glow - slow pulse */}
                        <motion.div
                          animate={{
                            opacity: [0.8, 0.5, 0.8],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.5, 1]
                          }}
                          className="absolute inset-0 w-2 h-2 rounded-full blur-[3px]"
                          style={{ 
                            backgroundColor: yellowColor,
                            boxShadow: '0 0 6px #FFD700, 0 0 12px rgba(255, 215, 0, 0.6)',
                          }}
                        />
                        
                        {/* Middle yellow glow ring - slow pulse */}
                        <motion.div
                          animate={{
                            opacity: [0.6, 0.3, 0.6],
                            scale: [1.5, 2, 1.5],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.5, 1]
                          }}
                          className="absolute inset-0 w-2 h-2 rounded-full blur-[5px]"
                          style={{ 
                            backgroundColor: yellowColor,
                            boxShadow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.5)',
                          }}
                        />
                        
                        {/* Outer yellow glow ring - slow pulse */}
                        <motion.div
                          animate={{
                            opacity: [0.4, 0.2, 0.4],
                            scale: [2, 2.8, 2],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.5, 1]
                          }}
                          className="absolute inset-0 w-2 h-2 rounded-full blur-[7px]"
                          style={{ 
                            backgroundColor: yellowColor,
                            boxShadow: '0 0 15px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4), 0 0 45px rgba(255, 215, 0, 0.2)',
                          }}
                        />
                        
                        {/* Far outer yellow glow - very slow pulse */}
                        <motion.div
                          animate={{
                            opacity: [0.3, 0.1, 0.3],
                            scale: [2.5, 3.5, 2.5],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.5, 1]
                          }}
                          className="absolute inset-0 w-2 h-2 rounded-full blur-[9px]"
                          style={{ 
                            backgroundColor: yellowColor,
                            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3), 0 0 60px rgba(255, 215, 0, 0.15)',
                          }}
                        />
                      </>
                    )}
                  </>
                )
              })()}
            </div>
            <span className="text-white text-lg font-medium">{statusInfo.nextOpen}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}