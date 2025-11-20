'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const reviews = [
  {
    rating: 5,
    text: "This is truly a treasure and the food itself should make it a true success! One of the best meals I've had in my life hands down. I've eaten all over the US and world.",
    author: "T. Thomas",
    source: "Google Reviews"
  },
  {
    rating: 5,
    text: "We had such a wonderful dining experience! From the moment I walked in, the staff was warm and welcoming, making me feel comfortable right away.",
    author: "Janet C.",
    source: "Yelp"
  },
]

const pressQuotes = [
  {
    quote: "The Gaslight on Main dishes out New American cuisine in an elegant setting. Expect spectacular starters like the French Onion Dumplings and entrees like Sweet Corn Risotto.",
    source: "The Go To Winston-Salem",
    date: "July 2025",
    logo: "/brand/images/goto-winston-logo.png",
  },
  {
    quote: "These are some of the most enjoyable meals my wife and friends and I have experienced in quite some time. The Gaslight may be new, but it debuts in the top echelon of Triad restaurants. I will be coming here as often as my schedule and weight allow. ",
    source: "John Batchelor, Yes! Weekly",
    date: "September 2025",
    logo: "/brand/images/yes-weekly-logo.png",
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
            <span className="text-xl font-semibold" style={{ color: '#f2f2f2' }}>4.8</span>
            <span style={{ color: '#f2f2f2' }}>(166 reviews)</span>
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