'use client'

import Link from 'next/link'
import { Calendar, Menu as MenuIcon, Phone, MapPin } from 'lucide-react'

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-accent-200 md:hidden z-40">
      <div className="grid grid-cols-4 h-16">
        <Link
          href="/reservations"
          className="flex flex-col items-center justify-center space-y-1 text-primary-500 hover:bg-primary-50 transition-colors duration-200"
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs font-medium">Reserve</span>
        </Link>
        
        <Link
          href="/menu"
          className="flex flex-col items-center justify-center space-y-1 text-accent-700 hover:bg-accent-50 transition-colors duration-200"
        >
          <MenuIcon className="h-5 w-5" />
          <span className="text-xs font-medium">Menu</span>
        </Link>
        
        <a
          href="tel:+13369934567"
          className="flex flex-col items-center justify-center space-y-1 text-accent-700 hover:bg-accent-50 transition-colors duration-200"
        >
          <Phone className="h-5 w-5" />
          <span className="text-xs font-medium">Call</span>
        </a>
        
        <a
          href="https://maps.google.com/?q=The+Gaslight+on+Main+Kernersville+NC"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center space-y-1 text-accent-700 hover:bg-accent-50 transition-colors duration-200"
        >
          <MapPin className="h-5 w-5" />
          <span className="text-xs font-medium">Directions</span>
        </a>
      </div>
    </div>
  )
}
