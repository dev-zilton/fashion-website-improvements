'use client'

import { useState } from 'react'
import { PageLayout } from '@/components/PageLayout'
import { ProductCollection } from '@/components/ProductCollection'
import { FEATURED_PRODUCTS } from '@/lib/products'

const FILTERS = [
  { key: 'TODOS', label: 'Todos' },
  { key: 'ESPORTIVAS', label: 'Esportivas' },
  { key: 'FORMAIS', label: 'Formais' },
  { key: 'CHINELOS', label: 'Chinelos' },
  { key: 'MAIS', label: 'Mais' },
] as const

export default function Page() {
  const [activeFilter, setActiveFilter] = useState<string>('TODOS')

  const calcados = FEATURED_PRODUCTS.filter((p) => p.collection === 'CALÇADOS')
  const filtered =
    activeFilter === 'TODOS'
      ? calcados
      : calcados.filter((p) => p.subcategory === activeFilter)

  return (
    <PageLayout
      title="Calçados"
      description="Sapatilhas, sapatos sociais e botas para completar o seu visual."
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

      <ProductCollection
        products={filtered}
        emptyMessage="Nenhum produto encontrado nesta categoria."
      />
    </PageLayout>
  )
}
