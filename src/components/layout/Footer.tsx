import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'

export function Footer() {
  const currentDay = new Date().getDay() // 0 for Sunday, 1 for Monday, etc.
  const hours = [
    { day: 'Wed, Thurs', time: '4:00 PM - 8:00 PM', open: true, days: [3, 4] },
    { day: 'Fri, Sat', time: '4:00 PM - 9:00 PM', open: true, days: [5, 6] },
    { day: 'Sun', time: '11:00 AM - 3:00 PM', open: true, days: [0] },
  ]

  const getCurrentSchedule = () => {
    const now = new Date()
    const currentDay = now.getDay()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTime = currentHour * 60 + currentMinute

    // Check if we're currently open
    for (const schedule of hours) {
      if (schedule.days.includes(currentDay)) {
        const [openTime, closeTime] = schedule.time.split(' - ')
        const [openHour, openMin] = openTime.includes('AM') 
          ? [parseInt(openTime.split(':')[0]), parseInt(openTime.split(':')[1].split(' ')[0])]
          : [parseInt(openTime.split(':')[0]) + (openTime.includes('PM') ? 12 : 0), parseInt(openTime.split(':')[1].split(' ')[0])]
        const [closeHour, closeMin] = closeTime.includes('AM')
          ? [parseInt(closeTime.split(':')[0]), parseInt(closeTime.split(':')[1].split(' ')[0])]
          : [parseInt(closeTime.split(':')[0]) + (closeTime.includes('PM') ? 12 : 0), parseInt(closeTime.split(':')[1].split(' ')[0])]
        
        const openTimeMinutes = openHour * 60 + openMin
        const closeTimeMinutes = closeHour * 60 + closeMin
        
        if (currentTime >= openTimeMinutes && currentTime < closeTimeMinutes) {
          return { isOpen: true, schedule, nextOpen: null }
        }
      }
    }

    // Find next opening
    for (let i = 0; i < 7; i++) {
      const checkDay = (currentDay + i) % 7
      for (const schedule of hours) {
        if (schedule.days.includes(checkDay)) {
          const isToday = i === 0
          return { 
            isOpen: false, 
            schedule, 
            nextOpen: isToday ? `Opens today at ${schedule.time.split(' - ')[0]}` : `Opens ${schedule.day} at ${schedule.time.split(' - ')[0]}`
          }
        }
      }
    }

    return { isOpen: false, schedule: null, nextOpen: 'Currently closed' }
  }

  const { isOpen, schedule, nextOpen } = getCurrentSchedule()

  return (
    <footer style={{ backgroundColor: '#171717' }}>
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Contact Info */}
          <div className="space-y-6">
            <Image
              src="/brand/logos/gaslight-logo-light_alt.png"
              alt="The Gaslight on Main"
              width={180}
              height={60}
              className="h-16 w-auto"
            />
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: '#c89212' }} />
                <div>
                  <p className="font-medium" style={{ color: '#f2f2f2' }}>126 S Main Street, Suite G</p>
                  <p style={{ color: '#f2f2f2' }}>Kernersville, NC 27284</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" style={{ color: '#c89212' }} />
                <a 
                  href="tel:+13364974025" 
                  className="transition-colors duration-200 hover:opacity-80"
                  style={{ color: '#f2f2f2' }}
                >
                  (336) 497-4025
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" style={{ color: '#c89212' }} />
                <a 
                  href="mailto:eat@thegaslightonmain.com" 
                  className="transition-colors duration-200 hover:opacity-80"
                  style={{ color: '#f2f2f2' }}
                >
                  eat@thegaslightonmain.com
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-semibold" style={{ color: '#f2f2f2' }}>Hours</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="font-semibold"
                  style={{ color: isOpen ? '#96F581' : '#f2f2f2' }}
                >
                  {isOpen ? 'Open' : 'Closed'}
                </div>
              </div>
              <div style={{ color: '#f2f2f2' }}>
                {isOpen ? `Open until ${schedule?.time.split(' - ')[1]}` : nextOpen}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span style={{ color: '#f2f2f2' }}>Wed, Thurs</span>
                  <span style={{ color: '#f2f2f2' }}>4:00 PM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#f2f2f2' }}>Fri, Sat</span>
                  <span style={{ color: '#f2f2f2' }}>4:00 PM - 9:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#f2f2f2' }}>Sun</span>
                  <span style={{ color: '#f2f2f2' }}>11:00 AM - 3:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-semibold" style={{ color: '#f2f2f2' }}>Quick Links</h3>
            <div className="space-y-3">
              <Link 
                href="/menu" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Menu
              </Link>
              <Link 
                href="/reservations" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Reservations
              </Link>
              <Link 
                href="/events" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Events
              </Link>
              <Link 
                href="#" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Private Dining
              </Link>
              <Link 
                href="/contact" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Contact Us
              </Link>
              <Link 
                href="/about" 
                className="block transition-colors duration-200 hover:opacity-80"
                style={{ color: '#f2f2f2' }}
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Stay Connected */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-semibold" style={{ color: '#f2f2f2' }}>Stay Connected</h3>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/gaslightonmain" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-colors duration-200 hover:opacity-80" 
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6" style={{ color: '#c89212' }} />
              </a>
              <a 
                href="https://facebook.com/gaslightonmain" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-colors duration-200 hover:opacity-80" 
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-6 w-6" style={{ color: '#c89212' }} />
              </a>
            </div>
            <div className="space-y-4">
              <p className="text-sm" style={{ color: '#f2f2f2' }}>
                Subscribe to our newsletter for special events and seasonal menu updates.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ 
                    backgroundColor: '#262626',
                    border: '1px solid #404040'
                  }}
                />
                <button 
                  type="submit" 
                  className="px-6 py-2 font-semibold transition-all duration-300 hover:opacity-90"
                  style={{ 
                    backgroundColor: '#CCBB98',
                    color: '#171717',
                    borderRadius: '4px'
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" style={{ borderColor: '#404040' }}>
          <p className="text-sm" style={{ color: '#f2f2f2' }}>
            © 2024 The Gaslight on Main. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link 
              href="/privacy" 
              className="transition-colors duration-200 hover:opacity-80"
              style={{ color: '#f2f2f2' }}
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="transition-colors duration-200 hover:opacity-80"
              style={{ color: '#f2f2f2' }}
            >
              Terms of Service
            </Link>
            <Link 
              href="/accessibility" 
              className="transition-colors duration-200 hover:opacity-80"
              style={{ color: '#f2f2f2' }}
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}