import { Metadata } from 'next'
import { MenuHero } from '@/components/menu/MenuHero'
import { MenuPageClient } from '@/components/menu/MenuPageClient'

export const metadata: Metadata = {
  title: 'Menu | The Gaslight on Main',
  description: 'Explore our seasonal New American menu featuring fresh, locally-sourced ingredients and innovative culinary techniques.',
}

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gray-dark">
      <MenuPageClient />
    </div>
  )
}
