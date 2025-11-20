interface StructuredDataProps {
  type: 'restaurant' | 'menu' | 'event' | 'article'
  data?: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseRestaurant = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: 'The Gaslight on Main',
      image: [
        'https://gaslightonmain.com/brand/images/hero-image.jpg'
      ],
      '@id': 'https://gaslightonmain.com',
      url: 'https://gaslightonmain.com',
      telephone: '+1-336-993-4567',
      priceRange: '$$$',
      servesCuisine: 'New American',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Main Street',
        addressLocality: 'Kernersville',
        addressRegion: 'NC',
        postalCode: '27284',
        addressCountry: 'US'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 36.1198,
        longitude: -80.0737
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Wednesday', 'Thursday'],
          opens: '16:00',
          closes: '20:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Thursday', 'Friday', 'Saturday'],
          opens: '11:30',
          closes: '15:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Friday', 'Saturday'],
          opens: '16:00',
          closes: '21:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday'],
          opens: '11:00',
          closes: '15:00'
        }
      ],
      menu: 'https://gaslightonmain.com/menu',
      acceptsReservations: true,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127'
      }
    }

    switch (type) {
      case 'restaurant':
        return baseRestaurant

      case 'menu':
        return {
          '@context': 'https://schema.org',
          '@type': 'Menu',
          name: 'The Gaslight on Main Menu',
          description: 'Seasonal New American cuisine featuring fresh, locally-sourced ingredients',
          inLanguage: 'en-US',
          menuSection: data?.sections || []
        }

      case 'event':
        return {
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: data?.name || 'Special Event',
          startDate: data?.startDate,
          endDate: data?.endDate,
          location: {
            '@type': 'Place',
            name: 'The Gaslight on Main',
            address: baseRestaurant.address
          },
          organizer: {
            '@type': 'Organization',
            name: 'The Gaslight on Main',
            url: 'https://gaslightonmain.com'
          },
          description: data?.description,
          offers: {
            '@type': 'Offer',
            price: data?.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
          }
        }

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data?.title,
          description: data?.description,
          author: {
            '@type': 'Organization',
            name: 'The Gaslight on Main'
          },
          publisher: {
            '@type': 'Organization',
            name: 'The Gaslight on Main',
            logo: {
              '@type': 'ImageObject',
              url: 'https://gaslightonmain.com/brand/logos/gaslight-logo.svg'
            }
          },
          datePublished: data?.datePublished,
          dateModified: data?.dateModified
        }

      default:
        return baseRestaurant
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  )
}
