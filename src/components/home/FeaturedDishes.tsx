'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FeaturedDish {
  id: string
  name: string
  description: string
  price: string
  photo?: string
}

export function FeaturedDishes() {
  const [dishes, setDishes] = useState<FeaturedDish[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('/api/menu?featured=1', { cache: 'default' })
        if (!res.ok) {
          throw new Error(`Failed to load featured dishes (${res.status})`)
        }
        const data = await res.json()
        if (isMounted) {
          setDishes(data.items || [])
        }
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load featured dishes')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gray-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-600 rounded mx-auto mb-4 w-80 animate-pulse" />
            <div className="h-6 bg-gray-600 rounded mx-auto w-96 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-medium rounded-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-600" />
                <div className="p-6">
                  <div className="h-6 bg-gray-600 rounded mb-3" />
                  <div className="h-4 bg-gray-600 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-dark">
        <div className="container-custom">
          <div className="text-center text-red-400">{error}</div>
        </div>
      </section>
    )
  }

  if (!dishes.length) {
    return null // Don't show section if no featured dishes
  }
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
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
            style={{ color: '#CCBB98' }}
          >
            Featured Dishes
          </h2>
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: '#f2f2f2' }}
          >
            Discover our chef's carefully crafted selections featuring the finest 
            seasonal ingredients and innovative New American flavors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-gray-medium rounded-lg overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  {dish.photo ? (
                    <Image
                      src={dish.photo}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 
                      className="text-xl font-serif font-semibold"
                      style={{ color: '#CCBB98' }}
                    >
                      {dish.name}
                    </h3>
                    <span 
                      className="text-xl font-bold"
                      style={{ color: '#CCBB98' }}
                    >
                      {dish.price}
                    </span>
                  </div>
                  <p 
                    className="leading-relaxed"
                    style={{ color: '#f2f2f2' }}
                  >
                    {dish.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link 
            href="/menu" 
            className="btn-primary text-lg px-8 py-4 inline-block"
            style={{ lineHeight: '1.3rem' }}
          >
            View Full Menu
          </Link>
        </motion.div>
      </div>
    </section>
  )
}