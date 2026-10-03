'use client'

import { m } from 'framer-motion'
import Link from 'next/link'
import { ProductCollection } from './ProductCollection'
import { FEATURED_PRODUCTS } from '@/lib/products'

// Só os mais recentes na página inicial (o catálogo completo está na loja):
// menos cartões animados = telemóvel livre mais depressa. 12 encaixa em 2, 3 e 4 colunas.
const HOME_PRODUCT_COUNT = 12

export function ProductGrid() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <m.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-baseline justify-between gap-8 flex-wrap">
            <div>
              <p className="text-xs md:text-sm tracking-widest text-accent mb-4">COLECÇÃO</p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Acabou de chegar
              </h2>
            </div>
            <Link href="/loja" className="inline-block px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-300 text-sm font-medium tracking-wider whitespace-nowrap focus:outline-2 focus:outline-offset-2 focus:outline-accent rounded">
              VER TUDO
            </Link>
          </div>
        </m.div>

        {/* Product Grid with Staggered Animation */}
        <ProductCollection products={FEATURED_PRODUCTS.slice(0, HOME_PRODUCT_COUNT)} />

        {/* Bottom CTA */}
        <m.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Há muito mais para ver: roupa, snikas e acessórios para montar o seu próximo fit.
          </p>
          <Link href="/loja" className="inline-block px-12 py-4 bg-accent text-black font-semibold tracking-wider hover:bg-black hover:text-accent transition-colors duration-300 text-sm focus:outline-2 focus:outline-offset-2 focus:outline-accent rounded">
            DESCOBRIR MAIS
          </Link>
        </m.div>

      </div>
    </section>
  )
}
