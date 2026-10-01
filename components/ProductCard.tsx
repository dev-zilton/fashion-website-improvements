'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Heart } from 'lucide-react'
import { useState, memo } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { getProductSizes } from '@/lib/products'

interface ProductCardProps {
  id: string
  title: string
  price: number
  priceOnRequest?: boolean
  image: string
  collection: string
  index: number
  isNew?: boolean
  salePrice?: number
  sizes?: string[]
  onAddToCart?: (productId: string) => void
  onToggleWishlist?: (productId: string, isNowWishlisted: boolean) => void
}

function ProductCardComponent({ id, title, price, image, collection, index, isNew, salePrice, priceOnRequest, sizes, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { addItem } = useCart()
  const { isWishlisted, toggle } = useWishlist()
  const wishlisted = isWishlisted(id)
  const needsSize = getProductSizes({ id, title, price, image, collection, sizes }).length > 0

  // Validação básica
  if (!id || !title || price < 0) {
    console.error('[DripGOd] ProductCard inválido:', { id, title, price })
    return (
      <div className="bg-muted rounded p-4 text-muted-foreground text-sm">
        Produto indisponível
      </div>
    )
  }

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.42,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/produto/${id}`}>
        <div
          className="relative overflow-hidden bg-muted aspect-[3/4] mb-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Product Image Container */}
          <div className="relative w-full h-full">
            {/* Main Image */}
            {imageError ? (
              <div className="w-full h-full bg-muted flex flex-col items-center justify-center gap-2 p-4 text-center">
                <span className="text-muted-foreground text-xs uppercase tracking-widest">
                  Imagem indisponível
                </span>
                <span className="text-sm font-medium">{title}</span>
              </div>
            ) : (
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1, translateY: 0, opacity: 1 }}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  translateY: isHovered ? -8 : 0,
                  opacity: isHovered ? 0.95 : 1,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority={index < 4}
                  onError={() => setImageError(true)}
                />
              </motion.div>
            )}

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.35 }}
            />
          </div>

          {/* Wishlist Button */}
          <motion.button
            className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-accent transition-colors duration-200 z-10 focus:outline-2 focus:outline-offset-2 focus:outline-accent"
            onClick={(e) => {
              e.preventDefault()
              onToggleWishlist?.(id, toggle(id))
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart
              size={18}
              className={wishlisted ? 'fill-red-500 text-red-500' : 'text-black'}
            />
          </motion.button>

          {/* Quick Add Button */}
          <motion.button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-48 py-3 bg-accent text-black font-semibold tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 z-10 focus:outline-2 focus:outline-offset-2 focus:outline-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              // Peças com tamanho seguem o link para a página do produto para escolher o tamanho
              if (needsSize || priceOnRequest) return
              e.preventDefault()
              addItem({ id, title, price, salePrice, image })
              onAddToCart?.(id)
            }}
            aria-label={priceOnRequest ? `Ver ${title}` : needsSize ? `Escolher tamanho de ${title}` : `Adicionar ${title} ao carrinho`}
          >
            <ShoppingBag size={16} />
            {priceOnRequest ? 'VER DETALHES' : needsSize ? 'ESCOLHER TAMANHO' : 'ADICIONAR AO CARRINHO'}
          </motion.button>

          {/* Collection Badge */}
          {collection && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs tracking-widest font-medium">
              {collection}
            </div>
          )}

          {/* New / Sale Badge */}
          {(isNew || salePrice) && (
            <div className="absolute top-4 right-16 px-3 py-1 bg-accent text-black text-xs tracking-widest font-bold">
              {salePrice ? 'PROMOÇÃO' : 'NOVO'}
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium tracking-wide line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {title}
          </h3>
        </div>

        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            {priceOnRequest ? (
              <span className="text-sm font-semibold tracking-widest uppercase text-accent">
                Preço sob consulta
              </span>
            ) : salePrice ? (
              <>
                <span className="text-lg font-semibold tracking-tight text-accent">
                  {salePrice.toFixed(0)} MT
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {price.toFixed(0)} MT
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold tracking-tight">
                {price.toFixed(0)} MT
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const ProductCard = memo(ProductCardComponent)
