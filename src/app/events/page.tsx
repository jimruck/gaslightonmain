import { Metadata } from 'next'
import { EventsHero } from '@/components/events/EventsHero'
import { EventsList } from '@/components/events/EventsList'

export const metadata: Metadata = {
  title: 'Events | The Gaslight on Main',
  description: 'Join us for special events including wine dinners, seasonal celebrations, and culinary experiences at The Gaslight on Main.',
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-dark">
      <EventsHero />
      <div className="container-custom section-padding">
        <EventsList />
      </div>
    </div>
  )
}
