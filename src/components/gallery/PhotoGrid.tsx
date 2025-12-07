'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const galleryImages = [
  {
    src: '/brand/images/5.jpg',
    alt: 'Main dining area',
    title: 'Main Dining Area',
  },
  {
    src: '/brand/images/1.jpg',
    alt: 'Main dining area',
    title: 'Main Dining Area',
  },
  {
    src: '/brand/images/3.jpg',
    alt: 'Salle',
    title: 'Salle Seating Area',
  },
  {
    src: '/brand/images/212-1.jpg',
    alt: 'Intimate Seating',
    title: 'Intimate Seating',
  },
  {
    src: '/brand/images/236.jpg',
    alt: 'Inspired Hospitality',
    title: 'Inspired Hospitality',
  },
  {
    src: '/brand/images/217.jpg',
    alt: 'Intimate Seating',
    title: 'Intimate Seating',
  },
  {
    src: '/brand/images/230.jpg',
    alt: 'Intimate Seating',
    title: 'Intimate Seating',
  },
  {
    src: '/brand/images/152-1.jpg',
    alt: 'Salle Bar Seating',
    title: 'Salle Bar Seating',
  },
  {
    src: '/brand/images/126.jpg',
    alt: 'Private Dining Area',
    title: 'Private Dining Area',
  },
  {
    src: '/brand/images/111.jpg',
    alt: 'Private Dining Area',
    title: 'Private Dining Area',
  },
  {
    src: '/brand/images/110.jpg',
    alt: 'Private Dining Area',
    title: 'Private Dining Area',
  },
  {
    src: '/brand/images/29.jpg',
    alt: 'Restaurant exterior',
    title: 'The Goat Cheese and Beet Salad',
  },
  {
    src: '/brand/images/21.jpg',
    alt: 'Restaurant atmosphere',
    title: 'Cider Braised Pork Shoulder',
  },
  {
    src: '/brand/images/200.jpg',
    alt: 'Restaurant atmosphere',
    title: 'French Onion Dumplings',
  },
  {
    src: '/brand/images/12.jpg',
    alt: 'Restaurant atmosphere',
    title: 'Pan Roasted Chicken Breast',
  },
  {
    src: '/brand/images/38.jpg',
    alt: 'Restaurant atmosphere',
    title: 'Prawns & Polenta',
  },
]

export function PhotoGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50

  const goToPrevious = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }, [selectedImage])

  const goToNext = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)
    }
  }, [selectedImage])

  // Keyboard navigation
  useEffect(() => {
    if (selectedImage === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      } else if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, goToPrevious, goToNext])

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

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
            onClick={(e) => {
              // Close only if clicking the background, not the image
              if (e.target === e.currentTarget) {
                setSelectedImage(null)
              }
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10 p-2"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X size={32} />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 text-white hover:text-primary transition-colors z-10 p-2 bg-black/50 rounded-full hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 text-white hover:text-primary transition-colors z-10 p-2 bg-black/50 rounded-full hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image Container */}
            <div 
              className="relative w-full max-w-6xl h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
              
              {/* Image Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-serif font-semibold text-center" style={{ color: '#CCBB98' }}>
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-sm text-center text-white/80 mt-1">
                  {selectedImage + 1} of {galleryImages.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

