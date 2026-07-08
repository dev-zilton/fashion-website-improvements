'use client'

import { PageLayout } from '@/components/PageLayout'
import { ProductCard } from '@/components/ProductCard'
import { FEATURED_PRODUCTS } from '@/lib/products'
import { useToast } from '@/hooks/useToast'

export default function Page() {
  const { showToast } = useToast()
  const filtered = FEATURED_PRODUCTS.filter((p) => p.collection === 'EDIÇÃO LIMITADA')

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
    <PageLayout title="Edição Limitada" description="Peças exclusivas produzidas em quantidade reduzida.">
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
    </PageLayout>
  )
}
