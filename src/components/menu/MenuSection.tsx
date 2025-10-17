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
  'Featured Dish': 'bg-amber-100 text-amber-800',
  'Locally Sourced': 'bg-green-100 text-green-800',
  'Seasonal': 'bg-red-100 text-red-800',
  'Gluten Free': 'bg-blue-100 text-blue-800',
  'Chef\'s Favorite': 'bg-purple-100 text-purple-800',
  'Vegetarian': 'bg-teal-100 text-teal-800',
  'Vegetarian Available': 'bg-teal-100 text-teal-800',
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
        <h2 className="text-4xl font-serif font-semibold mb-4" style={{ color: '#CCBB98' }}>
          {section.title}
        </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#CCBB98' }} />
      </div>

      <div className="space-y-8">
        {section.items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-medium rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-serif font-semibold" style={{ color: '#CCBB98' }}>
                {item.name}
              </h3>
              <span className="text-xl font-semibold ml-4" style={{ color: '#CCBB98' }}>
                {item.price}
              </span>
            </div>
            
            <p className="leading-relaxed mb-4" style={{ color: '#f2f2f2' }}>
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
