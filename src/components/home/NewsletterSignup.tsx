'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
    setEmail('')
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand/images/Firefly_Center-cut-filet-confit-garlic-whipped-Yukon-potatoes-haricot-vert-and-red-wine-ju-426440.jpg"
          alt="Elegant dining background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Get Exclusive Offers
          </h2>
          <p className="text-xl text-white mb-8 leading-relaxed max-w-2xl mx-auto">
            Seasonal menu updates, special events, 
            wine dinners, and exclusive offers.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 px-6 py-4 rounded-md border-0 text-gray-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary px-8 py-4 whitespace-nowrap"
                  style={{ lineHeight: '1.3rem' }}
                >
                  {isLoading ? 'Signing Up...' : 'Sign me up'}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-primary text-gray-dark px-6 py-4 rounded-md max-w-md mx-auto"
            >
              <span className="text-lg font-semibold">
                Thank you for subscribing!
              </span>
            </motion.div>
          )}

          <p className="text-sm text-gray-300 mt-6 max-w-lg mx-auto">
            We respect your privacy and will never share your email address.
          </p>
        </motion.div>
      </div>
    </section>
  )
}