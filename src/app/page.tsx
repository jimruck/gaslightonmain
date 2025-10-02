import { Hero } from '@/components/home/Hero'
import { OurStory } from '@/components/home/OurStory'
import { FeaturedDishes } from '@/components/home/FeaturedDishes'
import { WinePairingEvent } from '@/components/home/WinePairingEvent'
import { Testimonials } from '@/components/home/Testimonials'
import { NewsletterSignup } from '@/components/home/NewsletterSignup'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <OurStory />
      <FeaturedDishes />
      <WinePairingEvent />
      <Testimonials />
      <NewsletterSignup />
    </div>
  )
}