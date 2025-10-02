import { Metadata } from 'next'
import { ContactHero } from '@/components/contact/ContactHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact Us | The Gaslight on Main',
  description: 'Get in touch with The Gaslight on Main for reservations, private events, catering, or general inquiries.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <ContactHero />
      <div className="container-custom section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  )
}
