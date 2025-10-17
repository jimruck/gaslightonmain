'use client'

import { Star, Quote } from 'lucide-react'
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
  }
]

const pressQuotes = [
  {
    quote: "The Gaslight on Main elevates Kernersville's dining scene with sophisticated New American cuisine that rivals the best restaurants in Winston-Salem.",
    source: "Triad City Beat",
    date: "September 2024"
  },
  {
    quote: "I would make the drive anytime. These are some of the most enjoyable meals my wife and friends and I have experienced in quite some time.",
    source: "Carolina Dining Guide",
    date: "August 2024"
  }
]

export function SocialProof() {
  return (
    <section className="section-padding bg-accent-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-neutral-100 mb-4">
            What People Are Saying
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xl font-semibold text-accent-900">4.9</span>
            <span className="text-accent-600">(127 reviews)</span>
          </div>
        </motion.div>

        {/* Customer Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-accent-50 p-8 rounded-xl"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-primary-500 mb-4" />
              <p className="text-accent-700 leading-relaxed mb-4 text-lg">
                "{review.text}"
              </p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-accent-900">{review.author}</span>
                <span className="text-sm text-accent-600">{review.source}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-accent-200 pt-16"
        >
          <h3 className="text-2xl font-serif font-semibold text-accent-900 text-center mb-12">
            In the Press
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pressQuotes.map((press, index) => (
              <div key={index} className="text-center">
                <Quote className="h-8 w-8 text-primary-500 mx-auto mb-4" />
                <blockquote className="text-xl text-accent-700 leading-relaxed mb-4 italic">
                  "{press.quote}"
                </blockquote>
                <cite className="text-accent-900 font-semibold not-italic">
                  — {press.source}
                </cite>
                <p className="text-sm text-accent-600 mt-1">{press.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
