import { Metadata } from 'next'
import { MenuHero } from '@/components/menu/MenuHero'
import { MenuNavigation } from '@/components/menu/MenuNavigation'
import { MenuSection } from '@/components/menu/MenuSection'

export const metadata: Metadata = {
  title: 'Menu | The Gaslight on Main',
  description: 'Explore our seasonal New American menu featuring fresh, locally-sourced ingredients and innovative culinary techniques.',
}

const menuSections = [
  {
    id: 'appetizers',
    title: 'Appetizers & Small Plates',
    items: [
      {
        name: 'Seared Scallops',
        description: 'Pan-seared day boat scallops, cauliflower purée, pancetta, microgreens',
        price: '$16',
        tags: ['Gluten-Free Available', 'Chef\'s Favorite']
      },
      {
        name: 'Burrata & Prosciutto',
        description: 'Creamy burrata, aged prosciutto, arugula, balsamic reduction, grilled sourdough',
        price: '$14',
        tags: ['Vegetarian Available']
      },
      {
        name: 'Duck Confit Flatbread',
        description: 'House-made flatbread, duck confit, caramelized onions, goat cheese, fig jam',
        price: '$15',
        tags: ['House Special']
      },
      {
        name: 'Oysters Rockefeller',
        description: 'Fresh Blue Point oysters, creamed spinach, herbs, parmesan, pernod',
        price: '$18',
        tags: ['Premium', 'Gluten-Free']
      }
    ]
  },
  {
    id: 'salads',
    title: 'Salads & Soups',
    items: [
      {
        name: 'Gaslight Caesar',
        description: 'Romaine hearts, house-made croutons, aged parmesan, white anchovy, lemon',
        price: '$12',
        tags: ['Vegetarian Available', 'Classic']
      },
      {
        name: 'Seasonal Greens',
        description: 'Mixed local greens, roasted vegetables, goat cheese, candied walnuts, vinaigrette',
        price: '$11',
        tags: ['Vegetarian', 'Gluten-Free', 'Seasonal']
      },
      {
        name: 'Lobster Bisque',
        description: 'Rich lobster bisque, sherry cream, fresh herbs, house-made crackers',
        price: '$9',
        tags: ['Premium', 'Chef\'s Favorite']
      }
    ]
  },
  {
    id: 'entrees',
    title: 'Main Courses',
    items: [
      {
        name: 'Center-Cut Filet',
        description: 'Confit garlic whipped Yukon potatoes, haricot vert, red wine jus',
        price: '$42',
        tags: ['Gluten-Free Available', 'Chef\'s Favorite']
      },
      {
        name: 'Pan-Seared Salmon',
        description: 'Crispy-skinned salmon, herbed farro, chorizo, olive and roasted vegetables',
        price: '$28',
        tags: ['Heart Healthy', 'Seasonal']
      },
      {
        name: 'Lobster Ravioli',
        description: 'Knuckle and claw filled ravioli, caramelized onions, sherry cream sauce',
        price: '$34',
        tags: ['Signature Dish', 'Premium']
      },
      {
        name: 'Angus Strip Steak',
        description: '10 oz grilled CAB steak, frites, roasted garlic aioli',
        price: '$38',
        tags: ['House Special', 'Gluten-Free Available']
      },
      {
        name: 'Roasted Half Chicken',
        description: 'Herb-roasted airline chicken, seasonal vegetables, natural jus',
        price: '$26',
        tags: ['Gluten-Free', 'Farm Fresh']
      },
      {
        name: 'Pork Tenderloin',
        description: 'Apple wood smoked tenderloin, sweet potato purée, Brussels sprouts, bacon',
        price: '$29',
        tags: ['Seasonal', 'Local']
      }
    ]
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      {
        name: 'Crème Brûlée',
        description: 'Classic vanilla custard with caramelized sugar crust, fresh berries',
        price: '$9',
        tags: ['Classic', 'Gluten-Free']
      },
      {
        name: 'Chocolate Tart',
        description: 'Dark chocolate ganache tart, raspberry coulis, whipped cream',
        price: '$10',
        tags: ['House Made', 'Vegetarian']
      },
      {
        name: 'Seasonal Fruit Cobbler',
        description: 'Fresh seasonal fruit cobbler, vanilla bean ice cream, oat crumble',
        price: '$8',
        tags: ['Seasonal', 'Comfort Food']
      }
    ]
  }
]

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <MenuHero />
      <MenuNavigation sections={menuSections} />
      
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {menuSections.map((section) => (
            <MenuSection key={section.id} section={section} />
          ))}
        </div>
        
      </div>
    </div>
  )
}
