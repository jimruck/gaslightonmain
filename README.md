# The Gaslight on Main - Restaurant Website

A production-ready, mobile-first website for The Gaslight on Main, a New American restaurant in Kernersville, NC. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🍽️ Restaurant-Specific Features
- **Live Hours Status** - Real-time open/closed status with dynamic updates
- **Interactive Menu** - Anchored sections with dietary tags and filtering
- **Reservation System** - Comprehensive booking form with policies
- **Event Management** - Special events with detailed pages and CTAs
- **Contact Forms** - Smart forms with CRM integration ready
- **Location Services** - Hours, parking info, accessibility details

### 📱 Mobile-First Design
- **Responsive Navigation** - Sticky header with mobile hamburger menu
- **Mobile Bottom Bar** - Thumb-reach navigation (Reserve, Menu, Call, Directions)
- **Touch-Friendly** - Optimized for mobile interactions
- **Progressive Web App** - Installable with offline capabilities

### 🎨 Design & Brand
- **Brand Integration** - Extracted colors from provided logo SVG
- **Typography** - Playfair Display (serif) + Inter (sans-serif)
- **Color Palette** - Warm, sophisticated colors reflecting the restaurant's ambiance
- **Animations** - Framer Motion for smooth, elegant interactions

### ⚡ Performance & SEO
- **Next.js 14** - App Router, Server Components, optimized builds
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- **Structured Data** - JSON-LD schema for restaurants, events, menus
- **Accessibility** - WCAG compliant, screen reader friendly
- **Core Web Vitals** - Optimized for Google's performance metrics

### 🔧 Technical Stack
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Image Optimization**: Next.js Image component

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gaslight_v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                 # Next.js 14 App Router
│   ├── api/            # API routes (contact form, etc.)
│   ├── about/          # About page
│   ├── contact/        # Contact page with form
│   ├── events/         # Events listing
│   ├── gallery/        # Photo gallery
│   ├── gift-cards/     # Gift card sales
│   ├── location/       # Hours & location info
│   ├── menu/           # Interactive menu
│   ├── reservations/   # Booking system
│   └── layout.tsx      # Root layout with SEO
├── components/         # Reusable components
│   ├── home/          # Homepage sections
│   ├── layout/        # Navigation, footer, mobile bar
│   ├── menu/          # Menu components
│   ├── reservations/  # Booking components
│   ├── location/      # Location components
│   ├── contact/       # Contact form components
│   ├── events/        # Event components
│   └── seo/           # SEO and structured data
└── styles/            # Global CSS and Tailwind
```

## Key Pages & Features

### Homepage (`/`)
- Hero section with call-to-action buttons
- Live hours status chip
- Quick action tiles (Menu, Reserve, Events)
- Featured dishes with tags
- Next event teaser
- Social proof (reviews, press)
- Map snippet
- Newsletter signup

### Menu (`/menu`)
- Anchored navigation sections
- Item cards with dietary tags
- Price display
- Print menu option
- Mobile-optimized layout

### Reservations (`/reservations`)
- Comprehensive booking form
- Party size and special request handling
- Cancellation and accessibility policies
- Phone backup option

### Location (`/location`)
- Live hours status with kitchen/bar times
- Contact information
- Parking details and options
- Accessibility statement
- Interactive map embed

### Events (`/events`)
- Event listing with featured events
- Detailed event cards
- Pricing and capacity information
- RSVP/booking CTAs

### Contact (`/contact`)
- Smart contact form with topic selection
- CRM integration ready (`/api/contact`)
- Response time expectations
- Quick action buttons

## Customization

### Brand Colors
The color palette is extracted from the provided logo SVG and defined in `tailwind.config.js`:

- **Primary**: Orange/amber tones (#f36c09)
- **Accent**: Warm grays and browns (#8a7550)
- **Gold**: Luxury gold accents (#c89212)
- **Cream**: Warm background tones (#f1dab2)

### Content Management
All content is currently hardcoded in components. For dynamic content management, consider integrating:
- Sanity CMS
- Contentful
- Strapi
- WordPress headless

### CRM Integration
The contact form is ready for CRM integration. Uncomment and configure the CRM section in `src/app/api/contact/route.ts` for:
- HubSpot
- Salesforce
- Mailchimp
- Custom webhooks

## Deployment

### Recommended Platforms
- **Vercel** (Next.js creators, optimal performance)
- **Netlify** (JAMstack focused)
- **AWS Amplify** (Full AWS integration)

### Environment Variables
Create `.env.local` for production:

```env
# CRM Integration
CRM_API_KEY=your_crm_api_key
CRM_WEBHOOK_URL=your_crm_webhook_url

# Email Service
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Google Maps (if using real maps)
GOOGLE_MAPS_API_KEY=your_google_maps_key

# Analytics
GOOGLE_ANALYTICS_ID=your_ga_id
```

## Performance Optimizations

- **Image Optimization**: All images use Next.js Image component
- **Font Loading**: Google Fonts with display=swap
- **Code Splitting**: Automatic with Next.js App Router
- **Compression**: Built-in Gzip compression
- **Caching**: Static assets cached with proper headers

## SEO Features

- **Meta Tags**: Comprehensive meta tags for all pages
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Restaurant, menu, and event schemas
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawling instructions

## Accessibility

- **WCAG 2.1 AA Compliant**
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA color contrast ratios
- **Focus Management**: Visible focus indicators

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary and confidential. All rights reserved to The Gaslight on Main.

## Support

For technical support or questions about this website, please contact the development team.

---

Built with ❤️ for The Gaslight on Main
