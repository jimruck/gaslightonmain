'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

const galleryImages = [
  {
    src: '/brand/images/IMG_1222.jpg',
    alt: 'Main dining area',
    title: 'Main Dining Area',
  },
  {
    src: '/brand/images/os1.jpg',
    alt: 'Interior ambiance',
    title: 'Elegant Ambiance',
  },
  {
    src: '/brand/images/os2.jpg',
    alt: 'Bar area',
    title: 'Bar & Lounge',
  },
  {
    src: '/brand/images/os3.jpg',
    alt: 'Seating arrangement',
    title: 'Intimate Seating',
  },
  {
    src: '/brand/images/os4.jpg',
    alt: 'Restaurant interior',
    title: 'Interior Details',
  },
  {
    src: '/brand/images/os5.jpg',
    alt: 'Dining space',
    title: 'Dining Experience',
  },
  {
    src: '/brand/images/charleston.jpg',
    alt: 'Restaurant exterior',
    title: 'Exterior View',
  },
  {
    src: '/brand/images/maja_1500xx501-500-0-94.jpg',
    alt: 'Restaurant atmosphere',
    title: 'Atmosphere',
  },
]

export function PhotoGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gray-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#CCBB98' }}>
            Our Space
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#f2f2f2' }}>
            From intimate dinners to grand celebrations, our space adapts to create unforgettable moments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-medium cursor-pointer group"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-serif font-semibold" style={{ color: '#CCBB98' }}>
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="relative w-full max-w-6xl h-[80vh]">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

