import { Hero } from '@/components/home/Hero'
import { OurStory } from '@/components/home/OurStory'
import { FeaturedDishes } from '@/components/home/FeaturedDishes'
import { NextEvent } from '@/components/home/NextEvent'
import { Testimonials } from '@/components/home/Testimonials'
import { NewsletterSignup } from '@/components/home/NewsletterSignup'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <OurStory />
      <FeaturedDishes />
      <NextEvent />
      <Testimonials />
      <NewsletterSignup />
    </div>
  )
}