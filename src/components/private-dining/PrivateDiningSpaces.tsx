'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Users, Sparkles, Wine } from 'lucide-react'

const privateDiningRoomImages = [
  {
    src: '/brand/images/126.jpg',
    alt: 'Private Dining Room',
    title: 'Private Dining Room'
  },
  {
    src: '/brand/images/111.jpg',
    alt: 'Private Dining Room',
    title: 'Private Dining Room'
  },
  {
    src: '/brand/images/110.jpg',
    alt: 'Private Dining Room',
    title: 'Private Dining Room'
  }
]

const salleImages = [
  {
    src: '/brand/images/3.jpg',
    alt: 'Salle Seating Area',
    title: 'Salle Seating Area'
  },
  {
    src: '/brand/images/152-1.jpg',
    alt: 'Salle Bar Seating',
    title: 'Salle Bar Seating'
  },
  {
    src: '/brand/images/212-1.jpg',
    alt: 'Salle Intimate Seating',
    title: 'Salle Intimate Seating'
  }
]

export function PrivateDiningSpaces() {
  return (
    <section className="py-20 bg-gray-dark">
      <div className="container-custom">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#CCBB98' }}>
            Two Distinct Spaces
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#f2f2f2' }}>
            The Gaslight on Main offers two unique private dining options, each with its own character and ambiance. 
            Choose the space that best fits your event's needs.
          </p>
        </motion.div>

        {/* Private Dining Room Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="bg-gray-medium rounded-xl overflow-hidden shadow-lg">
            {/* Header */}
            <div className="p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: '#CCBB98' }}>
                Private Dining Room
              </h3>
              <p className="text-lg md:text-xl leading-relaxed max-w-3xl" style={{ color: '#f2f2f2' }}>
                An exclusive, intimate space perfect for formal gatherings, business meetings, and special celebrations. 
                This dedicated room offers complete privacy and a refined atmosphere.
              </p>
            </div>

            {/* Photo Grid */}
            <div className="px-8 md:px-12 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {privateDiningRoomImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-dark"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-8 md:p-12" style={{ backgroundColor: '#262626' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 mb-4" style={{ color: '#CCBB98' }} />
                  <h4 className="text-xl font-serif font-semibold mb-2" style={{ color: '#CCBB98' }}>
                    Seating Capacity
                  </h4>
                  <p className="text-2xl font-bold mb-2" style={{ color: '#f2f2f2' }}>
                    12-30 Guests
                  </p>
                  <p className="text-sm" style={{ color: '#a0a0a0' }}>
                    Comfortable seating for intimate to medium-sized events
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Sparkles className="h-12 w-12 mb-4" style={{ color: '#CCBB98' }} />
                  <h4 className="text-xl font-serif font-semibold mb-2" style={{ color: '#CCBB98' }}>
                    Atmosphere
                  </h4>
                  <p className="text-base leading-relaxed" style={{ color: '#f2f2f2' }}>
                    Elegant, refined, and completely private. Perfect for formal dinners, 
                    business meetings, and milestone celebrations. Features sophisticated 
                    décor and dedicated service.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Wine className="h-12 w-12 mb-4" style={{ color: '#CCBB98' }} />
                  <h4 className="text-xl font-serif font-semibold mb-2" style={{ color: '#CCBB98' }}>
                    Best For
                  </h4>
                  <p className="text-base leading-relaxed" style={{ color: '#f2f2f2' }}>
                    Corporate events, anniversary dinners, engagement parties, 
                    family reunions, and any occasion requiring complete privacy 
                    and personalized attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Salle Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="bg-gray-medium rounded-xl overflow-hidden shadow-lg">
            {/* Header */}
            <div className="p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: '#CCBB98' }}>
                The Salle
              </h3>
              <p className="text-lg md:text-xl leading-relaxed max-w-3xl" style={{ color: '#f2f2f2' }}>
                A vibrant, welcoming space that combines the energy of our bar with the comfort of our dining area. 
                The Salle offers a more casual yet sophisticated setting for your gathering.
              </p>
            </div>

            {/* Photo Grid */}
            <div className="px-8 md:px-12 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {salleImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-dark"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-8 md:p-12" style={{ backgroundColor: '#262626' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 mb-4" style={{ color: '#CCBB98' }} />
                  <h4 className="text-xl font-serif font-semibold mb-2" style={{ color: '#CCBB98' }}>
                    Seating Capacity
                  </h4>
                  <p className="text-2xl font-bold mb-2" style={{ color: '#f2f2f2' }}>
                    20-40 Guests
                  </p>
                  <p className="text-sm" style={{ color: '#a0a0a0' }}>
                    Flexible seating with bar and table options
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Sparkles className="h-12 w-12 mb-4" style={{ color: '#CCBB98' }} />
                  <h4 className="text-xl font-serif font-semibold mb-2" style={{ color: '#CCBB98' }}>
                    Atmosphere
                  </h4>
                  <p className="text-base leading-relaxed" style={{ color: '#f2f2f2' }}>
                    Warm, inviting, and social. Features bar seating, intimate tables, 
                    and an open, energetic ambiance. Perfect for mingling and casual 
                    celebrations with a sophisticated touch.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Wine className="h-12 w-12 mb-4" style={{ color: '#CCBB98' }} />
                  <h4 className="text-xl font-serif font-semibold mb-2" style={{ color: '#CCBB98' }}>
                    Best For
                  </h4>
                  <p className="text-base leading-relaxed" style={{ color: '#f2f2f2' }}>
                    Cocktail parties, birthday celebrations, networking events, 
                    casual business gatherings, and social mixers where guests 
                    can move and mingle freely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Comparison Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-medium rounded-xl p-8 md:p-12 text-center"
        >
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: '#f2f2f2' }}>
            Both spaces can be customized with personalized menus, beverage selections, and décor to match your vision. 
            Our team will work with you to determine which space best suits your event's style and guest count.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

