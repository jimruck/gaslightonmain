'use client'

import { motion } from 'framer-motion'

interface MenuItem {
  name: string
  description: string
  price: string
  tags: string[]
}

interface MenuSection {
  id: string
  title: string
  items: MenuItem[]
}

interface MenuSectionProps {
  section: MenuSection
}

const tagColors = {
  'Chef\'s Favorite': 'bg-primary-100 text-primary-800',
  'House Special': 'bg-gold-100 text-gold-800',
  'Signature Dish': 'bg-accent-100 text-accent-800',
  'Premium': 'bg-purple-100 text-purple-800',
  'Seasonal': 'bg-green-100 text-green-800',
  'Vegetarian': 'bg-emerald-100 text-emerald-800',
  'Vegetarian Available': 'bg-emerald-100 text-emerald-800',
  'Gluten-Free': 'bg-blue-100 text-blue-800',
  'Gluten-Free Available': 'bg-blue-100 text-blue-800',
  'Heart Healthy': 'bg-red-100 text-red-800',
  'Classic': 'bg-amber-100 text-amber-800',
  'House Made': 'bg-orange-100 text-orange-800',
  'Farm Fresh': 'bg-lime-100 text-lime-800',
  'Local': 'bg-teal-100 text-teal-800',
  'Comfort Food': 'bg-yellow-100 text-yellow-800',
}

export function MenuSection({ section }: MenuSectionProps) {
  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-32"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-semibold mb-4" style={{ color: '#262626' }}>
          {section.title}
        </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
      </div>

      <div className="space-y-8">
        {section.items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow duration-300"
            style={{ borderColor: '#f2f2f2' }}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-serif font-semibold" style={{ color: '#262626' }}>
                {item.name}
              </h3>
              <span className="text-xl font-semibold text-primary-500 ml-4">
                {item.price}
              </span>
            </div>
            
            <p className="leading-relaxed mb-4" style={{ color: '#262626' }}>
              {item.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={`
                    px-3 py-1 text-xs font-medium rounded-full
                    ${tagColors[tag as keyof typeof tagColors] || 'bg-accent-100 text-accent-700'}
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
