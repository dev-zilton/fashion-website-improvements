'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { PageLayout } from '@/components/PageLayout'
import { ProductCollection } from '@/components/ProductCollection'
import { useWishlist } from '@/contexts/WishlistContext'
import { FEATURED_PRODUCTS } from '@/lib/products'

export default function Page() {
  const { ids } = useWishlist()
  const products = FEATURED_PRODUCTS.filter((p) => ids.includes(p.id))

  return (
    <PageLayout
      title="Favoritos"
      description="Guarde as suas peças preferidas para mais tarde."
    >
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <Heart size={48} className="text-gray-400" />
          <p className="text-gray-400 max-w-md">
            A sua lista de favoritos está vazia. Explore a nossa colecção e
            adicione as peças que mais gosta clicando no ícone de coração.
          </p>
          <Link
            href="/loja"
            className="mt-4 px-8 py-3 bg-accent text-black font-semibold tracking-wider text-sm hover:bg-white transition-colors"
          >
            EXPLORAR LOJA
          </Link>
        </div>
      ) : (
        <ProductCollection products={products} />
      )}
    </PageLayout>
  )
}
