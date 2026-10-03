'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { PageLayout } from '@/components/PageLayout'
import { ProductCollection } from '@/components/ProductCollection'
import { FEATURED_PRODUCTS, type Product } from '@/lib/products'
import { getProductBrands, normalize } from '@/lib/brands'

const SORTS = [
  { key: 'default', label: 'Destaques' },
  { key: 'price-asc', label: 'Preço: menor para maior' },
  { key: 'price-desc', label: 'Preço: maior para menor' },
] as const

// Produtos com preço sob consulta ficam sempre no fim das ordenações por preço
const effectivePrice = (p: { price: number; salePrice?: number; priceOnRequest?: boolean }) =>
  p.priceOnRequest ? Number.POSITIVE_INFINITY : (p.salePrice ?? p.price)

// Pesquisa no título e no nome da marca (ex.: "nike" também encontra os Air Force)
const matchesQuery = (p: Product, q: string) =>
  normalize(p.title).includes(q) || getProductBrands(p).some((b) => normalize(b.name).includes(q))

const COLLECTIONS = ['TODOS', ...Array.from(new Set(FEATURED_PRODUCTS.map((p) => p.collection)))]

export default function Page() {
  return (
    <Suspense>
      <Shop />
    </Suspense>
  )
}

function Shop() {
  // Links das marcas na página inicial chegam como /loja?q=Nike
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [collection, setCollection] = useState('TODOS')
  const [sort, setSort] = useState<(typeof SORTS)[number]['key']>('default')

  const products = useMemo(() => {
    const q = normalize(query.trim())
    const list = FEATURED_PRODUCTS.filter(
      (p) =>
        (collection === 'TODOS' || p.collection === collection) &&
        (!q || matchesQuery(p, q))
    )
    if (sort === 'price-asc') list.sort((a, b) => effectivePrice(a) - effectivePrice(b))
    if (sort === 'price-desc') list.sort((a, b) => (a.priceOnRequest ? 1 : b.priceOnRequest ? -1 : effectivePrice(b) - effectivePrice(a)))
    return list
  }, [query, collection, sort])

  return (
    <PageLayout title="Loja" description="Roupa, snikas e acessórios importados, tudo num só lugar.">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <label className="relative flex-1">
          <span className="sr-only">Pesquisar produtos</span>
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar produtos..."
            className="w-full pl-11 pr-4 py-3 bg-transparent border border-border text-base md:text-sm focus:outline-2 focus:outline-accent"
          />
        </label>
        <label>
          <span className="sr-only">Ordenar por</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="w-full md:w-auto px-4 py-3 bg-background border border-border text-base md:text-sm focus:outline-2 focus:outline-accent"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        {COLLECTIONS.map((c) => (
          <button
            key={c}
            onClick={() => setCollection(c)}
            aria-pressed={collection === c}
            className={`px-5 py-2 text-xs font-medium tracking-widest border transition-colors ${
              collection === c
                ? 'bg-accent text-black border-accent'
                : 'border-border text-gray-400 hover:text-white hover:border-white'
            }`}
          >
            {c === 'TODOS' ? 'TODOS' : c}
          </button>
        ))}
      </div>

      <ProductCollection
        products={products}
        emptyMessage="Nenhum produto corresponde à sua pesquisa."
      />
    </PageLayout>
  )
}
