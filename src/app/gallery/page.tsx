import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery | The Gaslight on Main',
  description: 'View photos of our restaurant, dishes, and dining experiences at The Gaslight on Main in Kernersville, NC.',
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-accent-900">
            Gallery
          </h1>
          <p className="text-xl text-accent-600 leading-relaxed mb-12">
            Take a visual journey through The Gaslight on Main and discover the artistry 
            behind our cuisine and the elegance of our atmosphere.
          </p>
          
          <div className="bg-white rounded-xl shadow-sm border border-accent-100 p-12">
            <p className="text-lg text-accent-700">
              Our photo gallery is coming soon. In the meantime, follow us on social media 
              for the latest photos of our dishes and dining room.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
