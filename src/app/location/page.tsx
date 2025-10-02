import { Metadata } from 'next'
import { LocationHero } from '@/components/location/LocationHero'
import { HoursStatus } from '@/components/location/HoursStatus'
import { LocationDetails } from '@/components/location/LocationDetails'
import { ParkingInfo } from '@/components/location/ParkingInfo'
import { MapEmbed } from '@/components/location/MapEmbed'

export const metadata: Metadata = {
  title: 'Hours & Location | The Gaslight on Main',
  description: 'Find The Gaslight on Main in historic downtown Kernersville, NC. View our hours, get directions, and plan your visit.',
}

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <LocationHero />
      <div className="container-custom section-padding">
        <div className="max-w-6xl mx-auto space-y-12">
          <HoursStatus />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <LocationDetails />
            <ParkingInfo />
          </div>
          <MapEmbed />
        </div>
      </div>
    </div>
  )
}
