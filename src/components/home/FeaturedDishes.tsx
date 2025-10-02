'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const dishes = [
  {
    name: 'Center-Cut Filet',
    description: 'Confit garlic whipped Yukon potatoes, haricot vert, and red wine jus',
    price: '$42',
    image: '/brand/images/Firefly_Center-cut-filet-confit-garlic-whipped-Yukon-potatoes-haricot-vert-and-red-wine-ju-426440.jpg',
  },
  {
    name: 'Pan-Seared Salmon',
    description: 'Crispy-skinned salmon, herbed farro, chorizo, olive and roasted vegetables',
    price: '$28',
    image: '/brand/images/Firefly__Pan-Seared-Salmon-Crispy-skinned-salmon-herbed-farro-chorizo-olive-and-roasted-406070.jpg',
  },
  {
    name: 'Lobster Ravioli',
    description: 'Knuckle and claw filled ravioli with caramelized onions, sherry cream sauce',
    price: '$34',
    image: '/brand/images/Firefly__Lobster-Ravioli-Knuckle-and-Claw-filled-ravioli-with-caramelized-onions-sherry-and-406070.jpg',
  },
  {
    name: 'Angus Strip Steak',
    description: '10 oz grilled CAB steak served with frites, roasted garlic aioli',
    price: '$38',
    image: '/brand/images/Firefly_10-oz-Angus-Strip-Steak-Fritts-Grilled-CAB-steak-served-with-fries-roasted-garlic-960176.jpg',
  },
]

export function FeaturedDishes() {
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
              key={dish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-gray-medium rounded-lg overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
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