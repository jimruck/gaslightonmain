'use client'

import Link from 'next/link'
import { Calendar, BookOpen, Phone, MapPin } from 'lucide-react'

export function MobileBottomBar() {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 border-t border-gray-600 md:hidden z-40"
      style={{ backgroundColor: '#171717' }}
    >
      <div className="grid grid-cols-4 h-16">
        <a
          href="https://maps.google.com/?q=The+Gaslight+on+Main+Kernersville+NC"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center space-y-1 transition-colors duration-200 hover:opacity-80"
          style={{ color: '#ccbb98' }}
        >
          <MapPin className="h-5 w-5" />
          <span className="text-xs font-medium">Directions</span>
        </a>
        
        <Link
          href="/menu"
          className="flex flex-col items-center justify-center space-y-1 transition-colors duration-200 hover:opacity-80"
          style={{ color: '#ccbb98' }}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-xs font-medium">Menu</span>
        </Link>
        
        <a
          href="tel:+13364974025"
          className="flex flex-col items-center justify-center space-y-1 transition-colors duration-200 hover:opacity-80"
          style={{ color: '#ccbb98' }}
        >
          <Phone className="h-5 w-5" />
          <span className="text-xs font-medium">Call</span>
        </a>
        
        <Link
          href="/reservations"
          className="flex flex-col items-center justify-center space-y-1 transition-colors duration-200 hover:opacity-80"
          style={{ color: '#ccbb98' }}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs font-medium">Reserve</span>
        </Link>
      </div>
    </div>
  )
}
