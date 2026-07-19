'use client'

import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { ProductCard } from '@/components/ProductCard'
import { FEATURED_PRODUCTS } from '@/lib/products'
import { useToast } from '@/hooks/useToast'

const FILTERS = [
  { key: 'TODOS', label: 'Todos' },
  { key: 'ESPORTIVAS', label: 'Esportivas' },
  { key: 'FORMAIS', label: 'Formais' },
  { key: 'MAIS', label: 'Mais' },
] as const

export default function Page() {
  const { showToast } = useToast()
  const [activeFilter, setActiveFilter] = useState<string>('TODOS')

  const calcados = FEATURED_PRODUCTS.filter((p) => p.collection === 'CALÇADOS')
  const filtered =
    activeFilter === 'TODOS'
      ? calcados
      : calcados.filter((p) => p.subcategory === activeFilter)

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
    <PageLayout
      title="Calçados"
      description="Sapatilhas, sapatos sociais e botas premium para completar o seu visual."
    >
      <div className="flex flex-wrap gap-3 mb-10">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-5 py-2 text-sm font-medium tracking-wide border transition-colors ${
              activeFilter === filter.key
                ? 'bg-accent text-black border-accent'
                : 'border-border text-gray-400 hover:text-white hover:border-white'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {filtered.map((product, index) => (
          <ProductCard
            key={product.id}
            {...product}
            index={index}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12">
          Nenhum produto encontrado nesta categoria.
        </p>
      )}
    </PageLayout>
  )
}
