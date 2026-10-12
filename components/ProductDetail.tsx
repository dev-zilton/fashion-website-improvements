'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { Heart, ShoppingBag, Check, MessageCircle } from 'lucide-react'
import { WhatsAppIcon } from '@/components/WhatsAppButton'
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

  // Tamanho e cor têm de estar escolhidos antes de comprar ou falar no WhatsApp;
  // se faltar algum, a página desliza até ele (no telemóvel pode estar fora do ecrã)
  const sizeRef = useRef<HTMLFieldSetElement>(null)
  const colorRef = useRef<HTMLFieldSetElement>(null)
  const hasChoices = () => {
    const missingSize = sizes.length > 0 && !size
    const missingColor = colors.length > 0 && !color
    setMissing(missingSize || missingColor)
    const field = missingSize ? sizeRef.current : missingColor ? colorRef.current : null
    field?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return !field
  }
  const variantText = () => [size && `Tam. ${size}`, color].filter(Boolean).join(', ')
  const openWhatsApp = (message: string) =>
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')

  // Preço sob consulta com carrinho: compra-se como os outros e o preço confirma-se no WhatsApp
  const orderable = !product.priceOnRequest || product.orderableOnRequest
  const handleOrderOnWhatsApp = () => {
    if (!hasChoices()) return
    const variant = variantText()
    const price = product.priceOnRequest ? 'preço sob consulta' : `${(product.salePrice ?? product.price).toFixed(0)} MT`
    openWhatsApp(
      [
        'Olá! Quero encomendar na DripGOd:',
        '',
        `- ${product.title}${variant ? ` [${variant}]` : ''} — ${price}`,
        '',
        window.location.origin + window.location.pathname,
      ].join('\n')
    )
  }

  const handleAddToCart = () => {
    if (!hasChoices()) return
    if (!orderable) {
      const variant = variantText()
      openWhatsApp(`Olá! Gostaria de saber o preço de: ${product.title}${variant ? ` [${variant}]` : ''}`)
      return
    }
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      salePrice: product.salePrice,
      priceOnRequest: product.priceOnRequest,
      image: variants.find((v) => v.color === color)?.images[0] ?? gallery[0],
      size,
      color,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // Foto principal desliza com o dedo (scroll-snap nativo); fica sincronizada com as miniaturas e a cor
  const sliderRef = useRef<HTMLDivElement>(null)
  const scrollIdle = useRef<ReturnType<typeof setTimeout>>(undefined)
  const firstScroll = useRef(true)
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    const left = imageIndex * slider.clientWidth
    if (Math.abs(slider.scrollLeft - left) > 2) {
      slider.scrollTo({ left, behavior: firstScroll.current ? 'auto' : 'smooth' })
    }
    firstScroll.current = false
  }, [imageIndex])
  useEffect(() => () => clearTimeout(scrollIdle.current), [])
  // Com zoom ou ao rodar o telemóvel a largura muda e a foto ficava a meio entre duas
  useEffect(() => {
    const realign = () => {
      const slider = sliderRef.current
      if (slider) slider.scrollTo({ left: imageIndex * slider.clientWidth })
    }
    window.addEventListener('resize', realign)
    return () => window.removeEventListener('resize', realign)
  }, [imageIndex])
  // A barra de compra fica fixa no fundo do ecrã no telemóvel: o fim da página não pode ficar tapado
  useEffect(() => {
    document.body.classList.add('has-buy-bar')
    return () => document.body.classList.remove('has-buy-bar')
  }, [])
  // Só conta a foto onde o deslizar parou, não as que passam pelo meio
  const handleSlide = () => {
    clearTimeout(scrollIdle.current)
    scrollIdle.current = setTimeout(() => {
      const slider = sliderRef.current
      if (!slider) return
      const index = Math.round(slider.scrollLeft / slider.clientWidth)
      if (index !== imageIndex && gallery[index]) selectImage(index)
    }, 120)
  }

  const swatches = getSwatches(colors)
  const isSoldByColor = colors.length > 0
  const selectColor = (c: string) => {
    setColor(c)
    const first = variants.find((v) => v.color === c)?.images[0]
    if (first) setImageIndex(gallery.indexOf(first))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
      {/* Image */}
      <div>
        {/* No telemóvel a foto não passa de metade do ecrã, para o nome e o preço aparecerem logo */}
        <div className="relative aspect-[3/4] max-h-[42vh] md:max-h-none w-full bg-muted overflow-hidden">
          <div
            ref={sliderRef}
            onScroll={handleSlide}
            className="product-slider flex h-full overflow-x-auto snap-x snap-mandatory overscroll-x-contain"
            aria-label={`Fotos de ${product.title}`}
          >
            {gallery.map((src, i) => (
              <div key={src} className="relative w-full h-full shrink-0 snap-center snap-always">
                <Image
                  src={src}
                  alt={i === imageIndex ? product.title : ''}
                  fill
                  priority={src === currentImage}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
          {gallery.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs tabular-nums pointer-events-none">
              {imageIndex + 1} / {gallery.length}
            </div>
          )}
          {(product.isNew || product.salePrice || product.onSale || product.limitedStock) && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-black text-xs tracking-widest font-bold">
              {product.salePrice || product.onSale ? 'PROMOÇÃO' : product.limitedStock ? 'STOCK LIMITADO' : 'NOVO'}
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
          <div className="product-slider flex gap-2 md:gap-3 mt-2 md:mt-3 overflow-x-auto">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => selectImage(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-pressed={i === imageIndex}
                className={`relative w-11 sm:w-20 aspect-[3/4] flex-shrink-0 overflow-hidden border transition-colors ${
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
        <div className="flex items-start justify-between gap-4 mt-1 md:mt-2">
          <h1
            className="text-xl sm:text-3xl font-bold tracking-wide break-words"
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
              <span className="text-xl sm:text-2xl font-semibold">{product.price.toFixed(0)} MT</span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mt-3 mb-5 md:mt-6 md:mb-8">
          Peça importada e escolhida a dedo pela DripGOd, com qualidade que se
          nota. Dúvidas sobre o tamanho ou a cor? Fale connosco no WhatsApp antes
          de encomendar.
        </p>

        {isSoldByColor && (
          <fieldset ref={colorRef} className="mb-5 md:mb-8">
            <legend className="text-xs tracking-widest text-gray-400 mb-2 md:mb-3">
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
                    className={`w-8 h-8 md:w-9 md:h-9 rounded-full ring-offset-2 ring-offset-background transition-shadow ${
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
          <fieldset ref={sizeRef} className="mb-5 md:mb-8">
            <legend className="text-xs tracking-widest text-gray-400 mb-2 md:mb-3">TAMANHO</legend>
            <div className="grid grid-cols-5 gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`h-10 md:h-11 text-sm border transition-colors ${
                    size === s ? 'bg-accent text-black border-accent font-semibold' : 'border-border hover:border-accent'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* Telemóvel: barra fixa no fundo do ecrã, os botões de compra estão sempre à mão */}
        <div className="buy-bar fixed inset-x-0 bottom-0 z-40 px-4 pt-3 bg-background border-t border-border md:static md:z-auto md:p-0 md:bg-transparent md:border-0">
          {missing && (
            <p role="alert" className="text-sm text-red-500 mb-2 md:mb-4">
              Escolha {sizes.length > 0 && !size ? 'o tamanho' : 'a cor'} antes de {orderable ? 'continuar' : 'pedir o preço'}.
            </p>
          )}

          <div className="flex gap-2 md:block">
            <button
              onClick={handleAddToCart}
              className="flex-1 md:w-full h-12 md:h-14 flex items-center justify-center gap-2 bg-accent text-black font-semibold tracking-wider text-xs sm:text-sm hover:bg-white transition-colors"
            >
              {!orderable ? (
                <>
                  <MessageCircle size={18} />
                  PEDIR PREÇO<span className="hidden sm:inline"> NO WHATSAPP</span>
                </>
              ) : added ? (
                <>
                  <Check size={18} />
                  ADICIONADO
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  ADICIONAR<span className="hidden sm:inline"> AO CARRINHO</span>
                </>
              )}
            </button>

            {orderable && (
              <button
                onClick={handleOrderOnWhatsApp}
                className="flex-1 md:w-full h-12 md:h-14 md:mt-3 flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] font-semibold tracking-wider text-xs sm:text-sm hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <WhatsAppIcon size={18} />
                ENCOMENDAR<span className="hidden sm:inline"> PELO WHATSAPP</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
