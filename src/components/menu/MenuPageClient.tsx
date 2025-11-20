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
  meal?: string[]
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
  const [selectedMeal, setSelectedMeal] = useState<string>('Dinner')
  const [allItems, setAllItems] = useState<MenuItem[]>([])

  // Load menu data once on mount
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
          // Store all items for filtering by meal
          const allMenuItems = data.items || []
          
          // Debug: Log meal values to help troubleshoot
          console.log('Menu API response:', {
            hasItems: !!data.items,
            itemsCount: allMenuItems.length,
            hasSections: !!data.sections,
            sectionsCount: data.sections ? Object.keys(data.sections).length : 0
          })
          
          if (allMenuItems.length > 0) {
            const allMeals = allMenuItems.flatMap((item: MenuItem) => item.meal || [])
            const uniqueMeals = [...new Set(allMeals)]
            console.log('Available meals in data:', uniqueMeals)
            console.log('Sample item:', allMenuItems[0])
          } else {
            console.warn('No items found in API response. Data structure:', Object.keys(data))
          }
          
          setAllItems(allMenuItems)
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
  
  // Update sections when meal changes or items are loaded
  useEffect(() => {
    if (allItems.length === 0) return
    
    // Filter items by selected meal and group by course
    const filteredItems = allItems.filter((item: MenuItem) => {
      // If meal is not set or empty array, include it in all meals (backward compatibility)
      if (!item.meal || item.meal.length === 0) {
        return true
      }
      // Check if the selected meal is included in the item's meal array (case-insensitive)
      return item.meal.some(meal => meal.trim().toLowerCase() === selectedMeal.toLowerCase())
    })
    
    // Group filtered items by course
    const sectionsByCourse = filteredItems.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
      const course = item.course || 'Other'
      if (!acc[course]) {
        acc[course] = []
      }
      acc[course].push(item)
      return acc
    }, {} as Record<string, MenuItem[]>)
    
    // Define the fixed order for menu sections
    const sectionOrder = [
      'Appetizers & Small Plates',
      'Salads & Soups', 
      'Main Courses',
      'Desserts'
    ]
    
    // Convert sections object to array in the specified order
    let sectionsArray = sectionOrder
      .filter(course => sectionsByCourse[course] && sectionsByCourse[course].length > 0)
      .map(course => ({
        id: course.toLowerCase().replace(/\s+/g, '-'),
        title: course,
        items: sectionsByCourse[course]
      }))
    
    // If no items match the selected meal, show all items (fallback)
    if (sectionsArray.length === 0 && allItems.length > 0) {
      console.warn(`No items found for meal "${selectedMeal}". Showing all items as fallback.`)
      const allSectionsByCourse = allItems.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
        const course = item.course || 'Other'
        if (!acc[course]) {
          acc[course] = []
        }
        acc[course].push(item)
        return acc
      }, {} as Record<string, MenuItem[]>)
      
      sectionsArray = sectionOrder
        .filter(course => allSectionsByCourse[course] && allSectionsByCourse[course].length > 0)
        .map(course => ({
          id: course.toLowerCase().replace(/\s+/g, '-'),
          title: course,
          items: allSectionsByCourse[course]
        }))
    }
    
    setSections(sectionsArray)
  }, [selectedMeal, allItems])

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
      <MenuNavigation 
        selectedMeal={selectedMeal} 
        onMealChange={setSelectedMeal}
        sections={sections} 
      />
      
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
