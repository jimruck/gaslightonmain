'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const reviews = [
  {
    rating: 5,
    text: "Exceptional dining experience! The pan-seared salmon was perfectly cooked and the service was impeccable. The atmosphere strikes the perfect balance between elegant and welcoming.",
    author: "Sarah M.",
    source: "Google Reviews",
  },
  {
    rating: 5,
    text: "The Gaslight has become our go-to spot for special occasions. The wine selection is outstanding and the chef's attention to detail shows in every dish.",
    author: "Michael R.", 
    source: "Yelp",
  },
]

const pressQuotes = [
  {
    quote: "The Gaslight on Main elevates Kernersville's dining scene with sophisticated New American cuisine that rivals the best restaurants in Winston-Salem.",
    source: "Triad City Beat",
    date: "September 2024",
    logo: "/brand/logos/TriadCityBeat.png",
  },
  {
    quote: "A hidden gem that deserves recognition. The seasonal menu and expertly crafted cocktails make this a destination worth the drive.",
    source: "Our State Magazine",
    date: "August 2024",
    logo: "/brand/logos/Our_State_Magazine_logo.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
            style={{ color: '#CCBB98' }}
          >
            The Local Buzz
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xl font-semibold" style={{ color: '#f2f2f2' }}>4.9</span>
            <span style={{ color: '#f2f2f2' }}>(127 reviews)</span>
          </div>
        </motion.div>

        {/* Customer Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-medium p-8 rounded-lg"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="leading-relaxed mb-6 text-lg" style={{ color: '#f2f2f2' }}>
                "{review.text}"
              </p>
              <div className="flex justify-between items-center">
                <span className="font-semibold" style={{ color: '#f2f2f2' }}>{review.author}</span>
                <span className="text-sm" style={{ color: '#f2f2f2' }}>{review.source}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press Mentions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pressQuotes.map((press, index) => (
              <div key={index} className="text-center space-y-6">
                <div className="flex justify-center mb-6">
                  <Image
                    src={press.logo}
                    alt={press.source}
                    width={200}
                    height={60}
                    className="h-12 w-auto object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
                <blockquote 
                  className="text-xl leading-relaxed italic"
                  style={{ color: '#f2f2f2' }}
                >
                  "{press.quote}"
                </blockquote>
                <div className="space-y-1">
                  <cite 
                    className="font-semibold not-italic"
                    style={{ color: '#f2f2f2' }}
                  >
                    — {press.source}
                  </cite>
                  <p 
                    className="text-sm"
                    style={{ color: '#f2f2f2' }}
                  >
                    {press.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}