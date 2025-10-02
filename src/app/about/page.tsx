import { Metadata } from 'next'
import { AboutPageClient } from './AboutPageClient'

export const metadata: Metadata = {
  title: 'Our Story | The Gaslight on Main',
  description: 'Discover the story behind The Gaslight on Main - from Charleston inspiration to Kernersville community, featuring Chef Daniel Zbiegien and Dr. Rebecca Burke.',
}

export default function AboutPage() {
  return <AboutPageClient />
}
