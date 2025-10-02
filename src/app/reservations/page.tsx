import { Metadata } from 'next'
import { ReservationWidget } from '@/components/reservations/ReservationWidget'
import { ReservationPolicy } from '@/components/reservations/ReservationPolicy'

export const metadata: Metadata = {
  title: 'Reservations | The Gaslight on Main',
  description: 'Make a reservation at The Gaslight on Main for an unforgettable New American dining experience in Kernersville, NC.',
}

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-custom section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ReservationWidget />
            <ReservationPolicy />
          </div>
        </div>
      </div>
    </div>
  )
}
