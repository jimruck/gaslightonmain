import { Metadata } from 'next'
import { OpenTableWidget } from '@/components/reservations/OpenTableWidget'
import { ReservationPolicy } from '@/components/reservations/ReservationPolicy'

export const metadata: Metadata = {
  title: 'Reservations | The Gaslight on Main',
  description: 'Make a reservation at The Gaslight on Main for an unforgettable New American dining experience in Kernersville, NC.',
}

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* OpenTable Widget - Left side on desktop, top on mobile */}
            <div className="order-1 lg:order-1">
              <OpenTableWidget />
            </div>
            
            {/* Reservation Policy - Right side on desktop, bottom on mobile */}
            <div className="order-2 lg:order-2">
              <ReservationPolicy />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
