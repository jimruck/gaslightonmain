import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gift Cards | The Gaslight on Main',
  description: 'Give the gift of exceptional dining with gift cards from The Gaslight on Main. Perfect for any occasion.',
}

export default function GiftCardsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-accent-900">
            Gift Cards
          </h1>
          <p className="text-xl text-accent-600 leading-relaxed mb-12">
            Share the gift of exceptional dining with friends and family. 
            Our gift cards are perfect for any special occasion.
          </p>
          
          <div className="bg-white rounded-xl shadow-sm border border-accent-100 p-12">
            <h2 className="text-3xl font-serif font-semibold text-accent-900 mb-6">
              Purchase Gift Cards
            </h2>
            <p className="text-lg text-accent-700 leading-relaxed mb-8">
              Gift cards are available for purchase in any denomination. 
              Call us at (336) 993-4567 to purchase your gift cards today.
            </p>
            <a
              href="tel:+13369934567"
                  className="btn-primary text-lg px-8 py-4"
                  style={{ lineHeight: '1.3rem' }}
            >
              Call to Purchase
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
