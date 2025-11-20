'use client'

import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

interface MenuSection {
  id: string
  title: string
  items: any[]
}

interface MenuNavigationProps {
  selectedMeal: string
  onMealChange: (meal: string) => void
  sections: MenuSection[]
}

const MEAL_OPTIONS = ['Brunch', 'Lunch', 'Dinner']

export function MenuNavigation({ selectedMeal, onMealChange, sections }: MenuNavigationProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const navRef = useRef<HTMLDivElement | null>(null)
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const STICKY_OFFSET_PX = 64 // matches fixed header height

  useEffect(() => {
    const onScrollForSticky = () => {
      if (!navRef.current) return
      const scrollY = window.scrollY
      // Find the hero section (the section before the nav)
      const heroSection = document.querySelector('section[class*="h-96"]')
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom + scrollY
        // Stick when we've scrolled past the hero section
        const shouldStick = scrollY >= heroBottom - STICKY_OFFSET_PX
        setIsSticky(shouldStick)
      }
    }

    const measure = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight)
      }
    }

    measure()
    onScrollForSticky()
    window.addEventListener('scroll', onScrollForSticky)
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', onScrollForSticky)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const handleMealChange = (meal: string) => {
    onMealChange(meal)
    // Scroll to top of menu content when meal changes
    setTimeout(() => {
      const firstSection = sections[0]
      if (firstSection) {
        const element = document.getElementById(firstSection.id)
        if (element) {
          const offsetTop = element.offsetTop - 120
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        }
      }
    }, 100)
  }

  return (
    <div>
      <nav
        ref={navRef}
        className="fixed left-0 right-0 z-50 w-full bg-gray-medium"
        style={{ 
          top: '64px', // Position below the main navigation
          height: '4rem'
        }}
      >
        <div className="w-full h-full overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div className="flex items-center h-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 md:gap-6 lg:gap-8 mx-auto" style={{ whiteSpace: 'nowrap' }}>
              {MEAL_OPTIONS.map((meal) => (
                <button
                  key={meal}
                  ref={(el) => {
                    if (el) {
                      buttonRefs.current.set(meal, el)
                    } else {
                      buttonRefs.current.delete(meal)
                    }
                  }}
                  type="button"
                  onClick={() => handleMealChange(meal)}
                  className={clsx(
                    'px-4 md:px-6 py-2 md:py-3 text-sm font-medium rounded-lg outline-none transition-[background-color,color,border] duration-300 ease-out flex-shrink-0',
                    selectedMeal === meal ? 'shadow-sm' : 'hover:opacity-80'
                  )}
                  style={{
                    backgroundColor: selectedMeal === meal ? '#3a3a3a' : 'transparent',
                    color: selectedMeal === meal ? '#CCBB98' : '#f2f2f2',
                    border: selectedMeal === meal ? '1px solid #CCBB98' : '1px solid transparent',
                    WebkitTapHighlightColor: 'rgba(0,0,0,0)'
                  }}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
