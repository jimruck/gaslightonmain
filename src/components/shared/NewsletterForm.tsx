'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface NewsletterFormProps {
  variant?: 'footer' | 'hero'
  onSuccess?: (message: string) => void
}

export function NewsletterForm({ variant = 'footer', onSuccess }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage(data.message)
        setEmail('')
        if (onSuccess) {
          onSuccess(data.message)
        }
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === 'footer') {
    return (
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 px-4 py-2 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 min-w-0"
            style={{ 
              backgroundColor: '#262626',
              border: '1px solid #404040'
            }}
            required
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-4 py-2 font-semibold transition-all duration-300 hover:opacity-90 whitespace-nowrap flex-shrink-0 disabled:opacity-50"
            style={{ 
              backgroundColor: '#CCBB98',
              color: '#171717',
              borderRadius: '4px'
            }}
          >
            {isLoading ? '...' : 'Subscribe'}
          </button>
        </form>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}
        
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 text-sm"
          >
            {message}
          </motion.div>
        )}
      </div>
    )
  }

  // Hero variant (for the main newsletter signup section)
  return (
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
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-md text-sm"
        >
          {error}
        </motion.div>
      )}
    </form>
  )
}
