import { Metadata } from 'next'
import { GalleryHero } from '@/components/gallery/GalleryHero'
import { VideoTour } from '@/components/gallery/VideoTour'
import { PhotoGrid } from '@/components/gallery/PhotoGrid'
import { GalleryCTA } from '@/components/gallery/GalleryCTA'

export const metadata: Metadata = {
  title: 'Gallery | The Gaslight on Main',
  description: 'Explore The Gaslight on Main through our photo gallery and virtual tour. Discover our elegant dining spaces, ambiance, and the perfect setting for your next dining experience.',
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-dark">
      <GalleryHero />
      <VideoTour />
      <PhotoGrid />
      <GalleryCTA />
    </div>
  )
}
