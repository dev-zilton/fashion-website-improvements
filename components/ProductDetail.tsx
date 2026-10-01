'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, ShoppingBag, Check, MessageCircle } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { getProductSizes, type Product } from '@/lib/products'
import { WHATSAPP_NUMBER } from '@/lib/config'

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { isWishlisted, toggle } = useWishlist()
  const wishlisted = isWishlisted(product.id)
  const [added, setAdded] = useState(false)
  const sizes = getProductSizes(product)
  const variants = product.variants ?? []
  const colors = variants.length > 0 ? variants.map((v) => v.color) : (product.colors ?? [])
  const [size, setSize] = useState<string>()
  const [color, setColor] = useState<string | undefined>(colors.length === 1 ? colors[0] : undefined)
  const [missing, setMissing] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  // Com variantes, a galeria junta as fotos de todas as cores (sem repetidas)
  const gallery =
    variants.length > 0
      ? Array.from(new Set([...variants.flatMap((v) => v.images), ...(product.extraImages ?? [])]))
      : (product.images ?? [product.image])
  const currentImage = gallery[imageIndex] ?? gallery[0]
  const variantOfImage = (src: string) => variants.find((v) => v.images.includes(src))
  const selectImage = (index: number) => {
    setImageIndex(index)
    const owner = variantOfImage(gallery[index])
    if (owner) setColor(owner.color)
  }

  const handleAddToCart = () => {
    if ((sizes.length > 0 && !size) || (colors.length > 0 && !color)) {
      setMissing(true)
      return
    }
    setMissing(false)
    if (product.priceOnRequest) {
      const variant = [size && `Tam. ${size}`, color].filter(Boolean).join(', ')
      const message = `Olá! Gostaria de saber o preço de: ${product.title}${variant ? ` [${variant}]` : ''}`
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
      return
    }
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      salePrice: product.salePrice,
      image: variants.find((v) => v.color === color)?.images[0] ?? gallery[0],
      size,
      color,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Image */}
      <div>
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        <Image
          key={currentImage}
          src={currentImage}
          alt={product.title}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        {(product.isNew || product.salePrice) && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-black text-xs tracking-widest font-bold">
            {product.salePrice ? 'PROMOÇÃO' : product.limitedStock ? 'STOCK LIMITADO' : 'NOVO'}
          </div>
        )}
      </div>
      {gallery.length > 1 && (
        <div className="flex gap-3 mt-3 overflow-x-auto">
          {gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => selectImage(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-pressed={i === imageIndex}
              className={`relative w-16 sm:w-20 aspect-[3/4] flex-shrink-0 overflow-hidden border transition-colors ${
                i === imageIndex ? 'border-accent' : 'border-border hover:border-accent'
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      </div>

      {/* Info */}
      <div>
        <span className="text-xs text-gray-400 tracking-widest">
          {product.collection}
        </span>

        <div className="flex items-baseline gap-3 mt-6 mb-8">
          {product.priceOnRequest ? (
            <span className="text-lg font-semibold tracking-widest uppercase text-accent">
              Preço sob consulta
            </span>
          ) : product.salePrice ? (
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

        {colors.length > 0 && (
          <fieldset className="mb-8">
            <legend className="text-xs tracking-widest text-gray-400 mb-3">COR</legend>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setColor(c)
                    const first = variants.find((v) => v.color === c)?.images[0]
                    if (first) setImageIndex(gallery.indexOf(first))
                  }}
                  aria-pressed={color === c}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    color === c ? 'bg-accent text-black border-accent' : 'border-border hover:border-accent'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {sizes.length > 0 && (
          <fieldset className="mb-8">
            <legend className="text-xs tracking-widest text-gray-400 mb-3">TAMANHO</legend>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-w-12 px-4 py-2 text-sm border transition-colors ${
                    size === s ? 'bg-accent text-black border-accent' : 'border-border hover:border-accent'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {missing && (
          <p role="alert" className="text-sm text-red-500 mb-4">
            Escolha {sizes.length > 0 && !size ? 'o tamanho' : 'a cor'} antes de {product.priceOnRequest ? 'pedir o preço' : 'adicionar ao carrinho'}.
          </p>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-accent text-black font-semibold tracking-wider text-sm hover:bg-white transition-colors"
          >
            {product.priceOnRequest ? (
              <>
                <MessageCircle size={16} />
                PEDIR PREÇO NO WHATSAPP
              </>
            ) : added ? (
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
            onClick={() => toggle(product.id)}
            className="p-4 border border-border hover:border-accent transition-colors"
            aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart
              size={20}
              className={wishlisted ? 'fill-red-500 text-red-500' : 'text-white'}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
