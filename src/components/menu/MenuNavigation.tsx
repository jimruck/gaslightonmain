'use client'

import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

interface MenuSection {
  id: string
  title: string
  items: any[]
}

interface MenuNavigationProps {
  sections: MenuSection[]
}

export function MenuNavigation({ sections }: MenuNavigationProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '')
  const [isSticky, setIsSticky] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const navRef = useRef<HTMLDivElement | null>(null)
  const STICKY_OFFSET_PX = 64 // matches fixed header height

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 120
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div>
      {/* Spacer to prevent layout shift when fixed */}
      {isSticky && <div style={{ height: navHeight }} />}
      <nav
        ref={navRef}
        className={clsx('w-full', isSticky ? 'fixed left-0 right-0 z-50' : '')}
        style={{ backgroundColor: '#f2f2f2', top: isSticky ? STICKY_OFFSET_PX : undefined }}
      >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-4">
          <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 lg:gap-8 w-full max-w-3xl justify-center">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={clsx(
                  'px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg outline-none transition-[background-color,color,border] duration-300 ease-out',
                  activeSection === section.id ? 'shadow-sm' : 'hover:opacity-90'
                )}
                style={{
                  backgroundColor: activeSection === section.id ? '#ffffff' : '#f2f2f2',
                  color: activeSection === section.id ? '#835f3a' : '#212121',
                  border: activeSection === section.id ? '1px solid #f2f2f2' : '1px solid transparent',
                  WebkitTapHighlightColor: 'rgba(0,0,0,0)'
                }}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>
      </nav>
    </div>
  )
}
