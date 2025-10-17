'use client'

import { useEffect, useState } from 'react'
import { MenuHero } from './MenuHero'
import { MenuNavigation } from './MenuNavigation'
import { MenuSection } from './MenuSection'

interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  tags: string[]
  course: string
  photo?: string
  featured?: boolean
}

interface MenuSectionData {
  id: string
  title: string
  items: MenuItem[]
}

export function MenuPageClient() {
  const [sections, setSections] = useState<MenuSectionData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('/api/menu', { cache: 'default' })
        if (!res.ok) {
          throw new Error(`Failed to load menu (${res.status})`)
        }
        const data = await res.json()
        if (isMounted) {
          // Define the fixed order for menu sections
          const sectionOrder = [
            'Appetizers & Small Plates',
            'Salads & Soups', 
            'Main Courses',
            'Desserts'
          ]
          
          // Convert sections object to array in the specified order
          const sectionsArray = sectionOrder
            .filter(course => data.sections && data.sections[course])
            .map(course => ({
              id: course.toLowerCase().replace(/\s+/g, '-'),
              title: course,
              items: data.sections[course] as MenuItem[]
            }))
          
          setSections(sectionsArray)
        }
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load menu')
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
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="text-center mb-12">
                <div className="h-8 bg-gray-600 rounded mx-auto mb-4 w-64" />
                <div className="w-24 h-1 bg-gray-600 mx-auto rounded-full" />
              </div>
              <div className="space-y-8">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="bg-gray-medium rounded-lg p-6 h-32" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="text-center text-red-400">{error}</div>
      </div>
    )
  }

  if (!sections.length) {
    return (
      <div className="container-custom py-12">
        <div className="text-center" style={{ color: '#f2f2f2' }}>Menu coming soon. Please check back later.</div>
      </div>
    )
  }

  return (
    <div>
      <MenuHero />
      <MenuNavigation sections={sections} />
      
      {/* Spacer to account for fixed navigation */}
      {/* <div style={{ height: '120px' }} /> */}
      
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section) => (
            <MenuSection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  )
}
