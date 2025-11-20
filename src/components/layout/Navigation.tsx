'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Menu', href: '/menu' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Private Dining', href: '/private-dining' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav 
      className="w-full bg-gray-dark border-b border-gray-medium"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999
      }}
    >
      <div className="container-custom">
        <div className="flex items-center" style={{ height: '4rem' }}>
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 mr-12">
            <Image
              src="/brand/logos/gaslight-logo-light_alt.png"
              alt="The Gaslight on Main"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Left justified */}
          <div className="hidden lg:flex items-center space-x-8 flex-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-primary font-medium transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Cluster */}
          <div className="hidden lg:flex items-center space-x-6 ml-auto">
            <a
              href="tel:+13364974025"
              className="text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              (336) 497-4025
            </a>
            <Link href="/reservations" className="btn-primary">
              Book a Table
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-primary transition-colors duration-300 ml-auto"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-gray-medium border-t border-gray-500"
          >
            <div className="container-custom py-6">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-primary font-medium py-2 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-4 pt-4 border-t border-gray-500">
                  <a
                    href="tel:+13364974025"
                    className="text-white hover:text-primary transition-colors duration-300 font-medium"
                  >
                    (336) 497-4025
                  </a>
                  <Link 
                    href="/reservations" 
                    className="btn-primary w-fit"
                    onClick={() => setIsOpen(false)}
                  >
                    Book a Table
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}