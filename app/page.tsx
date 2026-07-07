import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ProductGrid } from '@/components/ProductGrid'
import { FeaturesSection } from '@/components/FeaturesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DripGOd',
  url: 'https://dripgod-mz.com',
  logo: 'https://dripgod-mz.com/logo.png',
  description: 'Moda premium moçambicana de Maputo',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenida Mao Tse Tung',
    addressLocality: 'Maputo',
    addressCountry: 'MZ',
  },
  sameAs: [
    'https://www.instagram.com/dripgod',
    'https://www.twitter.com/dripgod',
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <main id="main-content" className="min-h-screen bg-background text-foreground">
        <Header />
        <Hero />
        <FeaturesSection />
        <ProductGrid />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
