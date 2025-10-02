'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  topic: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const topics = [
    'General Inquiry',
    'Reservations',
    'Private Events',
    'Catering',
    'Gift Cards',
    'Feedback',
    'Media Inquiry',
    'Employment',
    'Other'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // In a real implementation, this would post to /api/crm
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          topic: '',
          message: ''
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (err) {
      setError('Sorry, there was an error sending your message. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-lg border border-accent-100 p-8 text-center"
      >
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-serif font-semibold text-accent-900 mb-4">
          Thank You!
        </h3>
        <p className="text-accent-700 leading-relaxed mb-6">
          We've received your message and will get back to you within 24 hours. 
          For immediate assistance, please call us at (336) 993-4567.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-primary"
        >
          Send Another Message
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-8"
      style={{ border: '1px solid #f2f2f2' }}
    >
      <h2 className="text-3xl font-serif font-semibold mb-6" style={{ color: '#212121' }}>
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              style={{ border: '1px solid #e0e0e0' }}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              style={{ border: '1px solid #e0e0e0' }}
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              style={{ border: '1px solid #e0e0e0' }}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              style={{ border: '1px solid #e0e0e0' }}
            />
          </div>
        </div>

        {/* Topic */}
        <div>
          <label htmlFor="topic" className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
            Topic *
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            style={{ border: '1px solid #e0e0e0' }}
          >
            <option value="">Please select a topic</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            style={{ border: '1px solid #e0e0e0' }}
            placeholder="Please provide details about your inquiry..."
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-accent-200 text-center">
        <p className="text-sm" style={{ color: '#171717' }}>
          We typically respond within 24 hours. For urgent matters, 
          please call us directly at{' '}
          <a
            href="tel:+13364974025"
            className="font-medium hover:opacity-80 transition-opacity duration-200"
            style={{ color: '#835F3A' }}
          >
            (336) 497-4025
          </a>
        </p>
      </div>
    </motion.div>
  )
}
