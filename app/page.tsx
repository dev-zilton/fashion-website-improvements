import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ProductGrid } from '@/components/ProductGrid'
import { FeaturesSection } from '@/components/FeaturesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'
import { SITE_URL } from '@/lib/config'

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DripGOd',
  url: SITE_URL,
  logo: `${SITE_URL}/apple-icon.png`,
  description: 'Moda moçambicana de Maputo',
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
        <section id="hero" aria-label="Secção de boas-vindas com apresentação">
          <Hero />
        </section>
        
        <section id="coleccoes" aria-label="Colecções em destaque">
          <FeaturesSection />
          <ProductGrid />
        </section>
        
        <section id="testemunhos" aria-label="Testemunhos de clientes">
          <TestimonialsSection />
        </section>
        
        <section id="cta" aria-label="Chamada para acção">
          <CTASection />
        </section>
        
        <footer id="contacto" aria-label="Rodapé e contacto">
          <Footer />
        </footer>
      </main>
    </>
  )
}
