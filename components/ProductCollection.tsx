'use client'

import { ProductCard } from '@/components/ProductCard'
import { Toast } from '@/components/Toast'
import { useToast } from '@/hooks/useToast'
import type { Product } from '@/lib/products'

interface ProductCollectionProps {
  products: Product[]
  emptyMessage?: string
}

export function ProductCollection({
  products,
  emptyMessage = 'Nenhum produto encontrado.',
}: ProductCollectionProps) {
  const { toast, showToast, hideToast } = useToast()

  const titleOf = (id: string) => products.find((p) => p.id === id)?.title ?? 'Produto'

  if (products.length === 0) {
    return <p className="text-center text-gray-400 py-12">{emptyMessage}</p>
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-6 md:gap-10">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            {...product}
            index={index}
            onAddToCart={(id) => showToast(`${titleOf(id)} adicionado ao carrinho!`)}
            onToggleWishlist={(id, added) =>
              showToast(
                added
                  ? `${titleOf(id)} adicionado aos favoritos!`
                  : `${titleOf(id)} removido dos favoritos.`
              )
            }
          />
        ))}
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  )
}
