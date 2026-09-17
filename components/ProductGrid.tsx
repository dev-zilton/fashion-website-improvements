'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { FEATURED_PRODUCTS } from '@/lib/products'
import { Toast } from './Toast'
import { useToast } from '@/hooks/useToast'

export function ProductGrid() {
  const { toast, showToast, hideToast } = useToast()

  const handleAddToCart = (productId: string) => {
    const product = FEATURED_PRODUCTS.find((p) => p.id === productId)
    if (product) {
      showToast(`${product.title} adicionado ao carrinho!`, 'success')
    }
  }

  const handleToggleWishlist = (productId: string) => {
    const product = FEATURED_PRODUCTS.find((p) => p.id === productId)
    if (product) {
      showToast(`${product.title} adicionado aos favoritos!`, 'success')
    }
  }

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
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
                style={{ fontFamily: 'Playfair Display' }}
              >
                Destaques de Maputo
              </h2>
            </div>
            <button className="px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-300 text-sm font-medium tracking-wider whitespace-nowrap focus:outline-2 focus:outline-offset-2 focus:outline-accent rounded">
              VER TUDO
            </button>
          </div>
        </motion.div>

        {/* Product Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {FEATURED_PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              index={index}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore a nossa colecção completa de peças selecionadas especialmente para si
          </p>
          <button className="px-12 py-4 bg-accent text-black font-semibold tracking-wider hover:bg-black hover:text-accent transition-colors duration-300 text-sm focus:outline-2 focus:outline-offset-2 focus:outline-accent rounded">
            DESCOBRIR MAIS
          </button>
        </motion.div>

        {/* Toast Notification */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </div>
    </section>
  )
}
