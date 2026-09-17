'use client'

import { useState } from 'react'
import { Heart, ShoppingBag, Check } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import type { Product } from '@/lib/products'

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {(product.isNew || product.salePrice) && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-black text-xs tracking-widest font-bold">
            {product.salePrice ? 'PROMOÇÃO' : 'NOVO'}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <span className="text-xs text-gray-400 tracking-widest">
          {product.collection}
        </span>

        <div className="flex items-baseline gap-3 mt-6 mb-8">
          {product.salePrice ? (
            <>
              <span className="text-2xl font-semibold text-accent">
                {product.salePrice.toFixed(0)} MT
              </span>
              <span className="text-base text-gray-400 line-through">
                {product.price.toFixed(0)} MT
              </span>
            </>
          ) : (
            <span className="text-2xl font-semibold">
              {product.price.toFixed(0)} MT
            </span>
          )}
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mb-10">
          Peça DripGOd, feita com materiais de qualidade e um design
          pensado para durar. Combine com o resto da sua colecção para um
          visual autêntico e contemporâneo.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-accent text-black font-semibold tracking-wider text-sm hover:bg-white transition-colors"
          >
            {added ? (
              <>
                <Check size={16} />
                ADICIONADO
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                ADICIONAR AO CARRINHO
              </>
            )}
          </button>

          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="p-4 border border-border hover:border-accent transition-colors"
            aria-label={isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart
              size={20}
              className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
