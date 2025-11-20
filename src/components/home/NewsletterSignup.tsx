'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { NewsletterForm } from '@/components/shared/NewsletterForm'

export function NewsletterSignup() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSuccess = (successMessage: string) => {
    setMessage(successMessage)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setMessage(null)
    }, 5000)
  }

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand/images/29.jpg"
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
            <NewsletterForm variant="hero" onSuccess={handleSuccess} />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-primary text-gray-dark px-6 py-4 rounded-md max-w-lg mx-auto"
            >
              <span className="text-lg font-semibold">
                {message || 'Thank you for subscribing!'}
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