'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const storyImages = [
  {
    src: '/brand/images/os1.jpg',
    alt: 'The Gaslight on Main interior',
    caption: 'Our warm, welcoming dining room'
  },
  {
    src: '/brand/images/os2.jpg',
    alt: 'Chef Daniel\'s signature New American cuisine',
    caption: 'Chef Daniel\'s signature New American cuisine'
  },
  {
    src: '/brand/images/os3.jpg',
    alt: 'Seasonal ingredients, locally sourced',
    caption: 'Seasonal ingredients, locally sourced'
  },
  {
    src: '/brand/images/os4.jpg',
    alt: 'Crafted with care and attention to detail',
    caption: 'Crafted with care and attention to detail'
  },
  {
    src: '/brand/images/os5.jpg',
    alt: 'Sweet endings to memorable meals',
    caption: 'Sweet endings to memorable meals'
  }
]

export function AboutPageClient() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openGallery = (index: number) => {
    setSelectedImage(index)
  }

  const closeGallery = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % storyImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? storyImages.length - 1 : selectedImage - 1)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/brand/images/owners.jpg"
            alt="Chef Daniel Zbiegien and Dr. Rebecca Burke"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 md:mb-6">
              Our Story
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-cream-100 leading-relaxed max-w-2xl mx-auto">
              A tale of passion, community, and the warm glow of hospitality
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 lg:p-12">
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#171717' }}>
              At The Gaslight on Main, our story begins with a simple belief: food and hospitality have the power to bring people together in meaningful ways. Owners Chef Daniel Zbiegien and his wife Dr. Rebecca Burke, a pediatric neurosurgeon, are proud to call Kernersville home. Like many families, their most cherished moments happen around a table—sharing food, laughter, and connection. The Gaslight on Main was born out of their desire to create a space where neighbors, friends, and visitors alike could experience that same sense of warmth and belonging.
              </p>
            </div>
          </motion.section>

          {/* Charleston Inspiration */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-4 sm:mb-6" style={{ color: '#b5956d' }}>
                  Inspired by Charleston
                </h2>
                <p className="text-base sm:text-lg leading-relaxed mb-4" style={{ color: '#171717' }}>
                  While traveling together in Charleston, South Carolina, Daniel and Rebecca were captivated by the city's historic charm, gracious hospitality, and flickering gaslights that lined its streets. On one evening walk beneath their glow, the spark for this restaurant was lit.
                </p>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#171717' }}>
                  The gaslight that now stands above our entrance is more than a detail—it's a symbol of welcome. Just as Charleston's gaslights once guided their way, ours serves as a beacon for all who step inside, inviting you into an atmosphere of comfort and unforgettable experiences.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
                  <Image
                    src="/brand/images/charleston.jpg"
                    alt="Charleston gaslights inspiration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Cuisine with Care */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
                  <Image
                    src="/brand/images/Firefly__Pan-Seared-Salmon-Crispy-skinned-salmon-herbed-farro-chorizo-olive-and-roasted-406070.jpg"
                    alt="Pan-seared salmon dish"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-4 sm:mb-6" style={{ color: '#b5956d' }}>
                  Cuisine with Care
                </h2>
                <p className="text-base sm:text-lg leading-relaxed mb-4" style={{ color: '#171717' }}>
                  Chef Daniel's menu reflects his passion for New American cuisine, blending diverse influences with a focus on locally sourced, seasonal ingredients. Each dish is crafted with care—refined yet approachable, rooted in the philosophy of "Unreasonable Hospitality."
                </p>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#171717' }}>
                  That means every detail matters, from the quality of the ingredients to the way each guest feels the moment they walk through our doors.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Art That Speaks */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-4 sm:mb-6 text-center" style={{ color: '#b5956d' }}>
                Art That Speaks
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-6" style={{ color: '#171717' }}>
                During their time in Charleston, Daniel and Rebecca also discovered the vibrant works of artist Gordon Wheeler. His colorful, expressive pieces captured the same spirit of energy and warmth they wanted to bring into The Gaslight on Main. Today, his masterpieces adorn our walls, turning the restaurant into not just a place to dine, but a space to be inspired.
              </p>
              <div className="text-center">
                <a
                  href="https://www.gordonwheelergallery.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Visit Gordon Wheeler Gallery
                </a>
              </div>
            </div>
          </motion.section>

          {/* Photo Gallery */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-6 sm:mb-8 text-center" style={{ color: '#b5956d' }}>
              A Visual Journey
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {storyImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative h-48 sm:h-56 lg:h-64 rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => openGallery(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Local Gathering Place */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="rounded-xl p-6 sm:p-8 lg:p-12 text-center" style={{ backgroundColor: '#fdf6e3' }}>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-4 sm:mb-6" style={{ color: '#b5956d' }}>
                A Local Gathering Place
              </h2>
              <p className="text-base sm:text-lg leading-relaxed mb-6 max-w-3xl mx-auto" style={{ color: '#171717' }}>
                The Gaslight on Main is more than a restaurant—it's a reflection of community, care, and connection. Here, every guest is welcomed like family, and every meal is an opportunity to slow down, savor, and share.
              </p>
              <p className="text-lg sm:text-xl font-medium" style={{ color: '#8b7355' }}>
                We invite you to join us, experience the glow of the gaslight, and become part of our story.
              </p>
            </div>
          </motion.section>

          {/* Meet Our Team */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-8 sm:mb-12 text-center" style={{ color: '#b5956d' }}>
              Meet Our Team
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Daniel Zbiegien */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative h-64 sm:h-80">
                  <Image
                    src="/brand/images/IMG_1222.jpg"
                    alt="Daniel Zbiegien - Head Chef and Owner"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-2" style={{ color: '#b5956d' }}>
                    Daniel Zbiegien
                  </h3>
                  <p className="text-sm sm:text-base font-medium mb-4" style={{ color: '#8b7355' }}>
                    Head Chef and Owner
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#171717' }}>
                    My culinary journey began over two decades ago, rooted in a deep appreciation for the transformative power of food. From my early days working in kitchens across the country, I discovered that cooking is not merely about technique—it's about creating experiences that bring people together and tell stories through every carefully crafted dish.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mt-4" style={{ color: '#171717' }}>
                    Throughout my career, I've had the privilege of working alongside exceptional chefs and learning from diverse culinary traditions. This journey led me to develop a philosophy centered on New American cuisine that celebrates both innovation and tradition, always with the highest respect for seasonal, locally sourced ingredients.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mt-4" style={{ color: '#171717' }}>
                    Today, at The Gaslight on Main, I am honored to work alongside my incredible team, including General Manager Maja Popovic, whose dedication to exceptional service perfectly complements our culinary vision. Together, we are committed to creating not just memorable meals, but lasting connections within our Kernersville community.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mt-4" style={{ color: '#171717' }}>
                    For me, every dish that leaves our kitchen carries with it our commitment to excellence, creativity, and the belief that great food has the power to create moments of joy and connection that extend far beyond the dining room.
                  </p>
                </div>
              </motion.div>

              {/* Maja Popovic */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative h-64 sm:h-80">
                  <Image
                    src="/brand/images/maja_1500xx501-500-0-94.jpg"
                    alt="Maja Popovic - General Manager"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-2" style={{ color: '#b5956d' }}>
                    Maja Popovic
                  </h3>
                  <p className="text-sm sm:text-base font-medium mb-4" style={{ color: '#8b7355' }}>
                    General Manager
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#171717' }}>
                    I have dedicated my life to the hospitality industry, a journey that began when I was just sixteen years old. While putting myself through school working in fine dining, I discovered a deep love for both the art of service and the beautiful connection between food and wine. Those early years taught me that hospitality is not simply about serving a meal—it is about creating meaningful experiences that stay with people long after they leave the table.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mt-4" style={{ color: '#171717' }}>
                    Over the years, I worked my way up from hostess to Managing Partner and Investor with the Mill Restaurant Group in South Windsor, Connecticut. There, I had the privilege of helping to open three restaurants, leading teams with vision, dedication, and an unwavering commitment to excellence.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mt-4" style={{ color: '#171717' }}>
                    Today, I am honored to bring that same passion and drive to The Gaslight on Main where I work in tandem with Chef Daniel Zbiegien. His creativity and leadership inspire me daily, and I am truly excited to continue to collaborate with him.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mt-4" style={{ color: '#171717' }}>
                    For me, food and wine are inseparable—the right pairing elevates a dish beyond the sum of its parts, creating harmony, balance, and delight. But above all, my greatest passion is guest service. Every guest who walks through our doors is special, and it is my privilege to ensure they feel valued, cared for, and celebrated. Exceptional service is not just important to me—it is essential.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

        </div>
      </div>

      {/* Gallery Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <div className="relative h-96 sm:h-[500px] lg:h-[600px]">
              <Image
                src={storyImages[selectedImage].src}
                alt={storyImages[selectedImage].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <div className="text-center mt-4">
              <p className="text-white text-lg">{storyImages[selectedImage].caption}</p>
              <p className="text-gray-300 text-sm mt-2">
                {selectedImage + 1} of {storyImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
