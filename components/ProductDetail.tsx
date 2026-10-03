'use client'

import { useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { Heart, ShoppingBag, Check, MessageCircle } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { getProductSizes, type Product } from '@/lib/products'
import { WHATSAPP_NUMBER } from '@/lib/config'
import { getModelSwatch, getSwatches } from '@/lib/colors'

// Cor pedida no endereço (ex.: /produto/58?cor=Vermelho), vinda das bolinhas dos cartões da loja.
// No servidor não há endereço, por isso a página estática é gerada sem cor escolhida.
const subscribeToUrl = (onChange: () => void) => {
  window.addEventListener('popstate', onChange)
  return () => window.removeEventListener('popstate', onChange)
}
const getUrlColor = () => new URLSearchParams(window.location.search).get('cor')

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { isWishlisted, toggle } = useWishlist()
  const wishlisted = isWishlisted(product.id)
  const [added, setAdded] = useState(false)
  const sizes = getProductSizes(product)
  const variants = product.variants ?? []
  const colors = variants.length > 0 ? variants.map((v) => v.color) : (product.colors ?? [])
  const [size, setSize] = useState<string>()
  const urlColor = useSyncExternalStore(subscribeToUrl, getUrlColor, () => null)
  const [pickedColor, setColor] = useState<string>()
  const color =
    pickedColor ??
    (urlColor && colors.includes(urlColor) ? urlColor : undefined) ??
    (colors.length === 1 ? colors[0] : undefined)
  const [missing, setMissing] = useState(false)
  // Com variantes, a galeria junta as fotos de todas as cores (sem repetidas)
  const gallery =
    variants.length > 0
      ? Array.from(new Set([...variants.flatMap((v) => v.images), ...(product.extraImages ?? [])]))
      : (product.images ?? [product.image])
  const [pickedImage, setImageIndex] = useState<number>()
  // Até o cliente escolher uma foto, mostra a primeira foto da cor escolhida
  const firstImageOfColor = variants.find((v) => v.color === color)?.images[0]
  const imageIndex = pickedImage ?? (firstImageOfColor ? gallery.indexOf(firstImageOfColor) : 0)
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

  const swatches = getSwatches(colors)
  const isSoldByColor = colors.length > 0
  const selectColor = (c: string) => {
    setColor(c)
    const first = variants.find((v) => v.color === c)?.images[0]
    if (first) setImageIndex(gallery.indexOf(first))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
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
          {(product.isNew || product.salePrice || product.limitedStock) && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-black text-xs tracking-widest font-bold">
              {product.salePrice ? 'PROMOÇÃO' : product.limitedStock ? 'STOCK LIMITADO' : 'NOVO'}
            </div>
          )}
          <button
            type="button"
            onClick={() => toggle(product.id)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-accent transition-colors"
            aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart size={18} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-black'} />
          </button>
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
        <span className="text-xs text-gray-400 tracking-widest">{product.collection}</span>

        {/* Nome e preço na mesma linha */}
        <div className="flex items-start justify-between gap-4 mt-2">
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-wide break-words"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {product.title}
          </h1>
          <div className="text-right shrink-0 pt-1">
            {product.priceOnRequest ? (
              <span className="text-sm font-semibold tracking-widest uppercase text-accent">Sob consulta</span>
            ) : product.salePrice ? (
              <>
                <span className="block text-2xl font-semibold text-accent">{product.salePrice.toFixed(0)} MT</span>
                <span className="block text-sm text-gray-400 line-through">{product.price.toFixed(0)} MT</span>
              </>
            ) : (
              <span className="text-2xl font-semibold">{product.price.toFixed(0)} MT</span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mt-6 mb-8">
          Peça importada e escolhida a dedo pela DripGOd, com qualidade que se
          nota. Dúvidas sobre o tamanho ou a cor? Fale connosco no WhatsApp antes
          de encomendar.
        </p>

        {isSoldByColor && (
          <fieldset className="mb-8">
            <legend className="text-xs tracking-widest text-gray-400 mb-3">
              COR{color && <span className="text-foreground normal-case tracking-normal">: {color}</span>}
            </legend>
            {swatches ? (
              <div className="flex flex-wrap gap-3">
                {swatches.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => selectColor(s.name)}
                    aria-pressed={color === s.name}
                    aria-label={s.name}
                    title={s.name}
                    className={`w-9 h-9 rounded-full ring-offset-2 ring-offset-background transition-shadow ${
                      color === s.name ? 'ring-2 ring-accent' : 'ring-1 ring-border hover:ring-accent'
                    }`}
                    style={{ background: s.background }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => {
                  const dot = getModelSwatch(c)
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => selectColor(c)}
                      aria-pressed={color === c}
                      className={`flex items-center gap-2 px-3 py-2 text-sm border transition-colors ${
                        color === c ? 'bg-accent text-black border-accent' : 'border-border hover:border-accent'
                      }`}
                    >
                      {dot && (
                        <span className="w-3.5 h-3.5 shrink-0 rounded-full ring-1 ring-white/30" style={{ background: dot }} />
                      )}
                      {c}
                    </button>
                  )
                })}
              </div>
            )}
          </fieldset>
        )}

        {!isSoldByColor && product.baseColor && (
          <div className="mb-8">
            <p className="text-xs tracking-widest text-gray-400 mb-3">
              COR<span className="text-foreground normal-case tracking-normal">: {product.baseColor}</span>
            </p>
            <span
              className="block w-9 h-9 rounded-full ring-1 ring-border"
              style={{ background: getModelSwatch(product.baseColor) ?? undefined }}
              aria-hidden
            />
          </div>
        )}

        {sizes.length > 0 && (
          <fieldset className="mb-8">
            <legend className="text-xs tracking-widest text-gray-400 mb-3">TAMANHO</legend>
            <div className="grid grid-cols-5 gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`h-11 text-sm border transition-colors ${
                    size === s ? 'bg-accent text-black border-accent font-semibold' : 'border-border hover:border-accent'
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

        <button
          onClick={handleAddToCart}
          className="w-full h-14 flex items-center justify-center gap-2 bg-accent text-black font-semibold tracking-wider text-sm hover:bg-white transition-colors"
        >
          {product.priceOnRequest ? (
            <>
              <MessageCircle size={18} />
              PEDIR PREÇO NO WHATSAPP
            </>
          ) : added ? (
            <>
              <Check size={18} />
              ADICIONADO
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              ADICIONAR AO CARRINHO
            </>
          )}
        </button>
      </div>
    </div>
  )
}
