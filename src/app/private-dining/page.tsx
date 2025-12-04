import { Metadata } from 'next'
import { PrivateDiningHero } from '@/components/private-dining/PrivateDiningHero'
import { PrivateDiningSpaces } from '@/components/private-dining/PrivateDiningSpaces'
import { PrivateDiningVideo } from '@/components/private-dining/PrivateDiningVideo'
import { PoliciesAndSpecs } from '@/components/private-dining/PoliciesAndSpecs'
import { PrivateDiningCTA } from '@/components/private-dining/PrivateDiningCTA'

export const metadata: Metadata = {
  title: 'Private Dining | The Gaslight on Main',
  description: 'Choose from two distinct private dining spaces—our exclusive Private Dining Room or the vibrant Salle. Perfect for celebrations, business meetings, and intimate gatherings with personalized service and custom menus.',
}

export default function PrivateDiningPage() {
  return (
    <div className="min-h-screen bg-gray-dark">
      <PrivateDiningHero />
      <PrivateDiningSpaces />
      <PrivateDiningVideo />
      <PoliciesAndSpecs />
      <PrivateDiningCTA />
    </div>
  )
}

