import { Metadata } from 'next'
import { PrivateDiningHero } from '@/components/private-dining/PrivateDiningHero'
import { PrivateDiningVideo } from '@/components/private-dining/PrivateDiningVideo'
import { PoliciesAndSpecs } from '@/components/private-dining/PoliciesAndSpecs'
import { PrivateDiningCTA } from '@/components/private-dining/PrivateDiningCTA'

export const metadata: Metadata = {
  title: 'Private Dining | The Gaslight on Main',
  description: 'Host your special event in our exclusive private dining room. Perfect for celebrations, business meetings, and gatherings. Accommodates 12-30 guests with personalized service and custom menus.',
}

export default function PrivateDiningPage() {
  return (
    <div className="min-h-screen bg-gray-dark">
      <PrivateDiningHero />
      <PrivateDiningVideo />
      <PoliciesAndSpecs />
      <PrivateDiningCTA />
    </div>
  )
}

