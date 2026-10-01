'use client'

import { PageLayout } from '@/components/PageLayout'
import { useCart } from '@/contexts/CartContext'
import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { WHATSAPP_NUMBER } from '@/lib/config'

export default function Page() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  const handleCheckout = () => {
    const lines = items.map((item) => {
      const unitPrice = item.salePrice ?? item.price
      const variant = [item.size && `Tam. ${item.size}`, item.color].filter(Boolean).join(', ')
      return `- ${item.title}${variant ? ` [${variant}]` : ''} (x${item.quantity}) — ${(unitPrice * item.quantity).toFixed(0)} MT`
    })

    const message = [
      'Olá! Gostaria de finalizar a seguinte compra na DripGOd:',
      '',
      ...lines,
      '',
      `Total: ${totalPrice.toFixed(0)} MT`,
    ].join('\n')

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  if (items.length === 0) {
    return (
      <PageLayout
        title="Sacola"
        description="Reveja os artigos que selecionou antes de finalizar a compra."
      >
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <ShoppingBag size={48} className="text-gray-400" />
          <p className="text-gray-400 max-w-md">
            A sua sacola está vazia. Explore a nossa colecção e adicione as
            peças que mais gosta clicando em "Adicionar ao Carrinho".
          </p>
          <Link
            href="/"
            className="mt-4 px-8 py-3 bg-accent text-black font-semibold tracking-wider text-sm hover:bg-white transition-colors"
          >
            EXPLORAR COLECÇÃO
          </Link>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title="Sacola"
      description="Reveja os artigos que selecionou antes de finalizar a compra."
    >
      <div className="space-y-6">
        {items.map((item) => {
          const unitPrice = item.salePrice ?? item.price
          return (
            <div
              key={item.lineId}
              className="flex items-center gap-4 border-b border-border pb-6"
            >
              <div className="relative w-20 h-24 bg-muted flex-shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium tracking-wide mb-2">
                  {item.title}
                </h3>
                {(item.size || item.color) && (
                  <p className="text-xs text-muted-foreground mb-2">
                    {[item.size && `Tamanho: ${item.size}`, item.color && `Cor: ${item.color}`]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold">
                    {unitPrice.toFixed(0)} MT
                  </span>
                  {item.salePrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {item.price.toFixed(0)} MT
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 border border-border">
                <button
                  onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                  className="p-2 hover:bg-muted transition-colors"
                  aria-label="Diminuir quantidade"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                  className="p-2 hover:bg-muted transition-colors"
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.lineId)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label={`Remover ${item.title}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          )
        })}

        <div className="flex items-center justify-between pt-6">
          <span className="text-lg font-semibold tracking-wide">Total</span>
          <span className="text-xl font-bold">{totalPrice.toFixed(0)} MT</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full px-8 py-4 bg-accent text-black font-semibold tracking-wider text-sm hover:bg-white transition-colors"
        >
          FINALIZAR COMPRA VIA WHATSAPP
        </button>
        <p className="text-xs text-gray-400 text-center">
          Ao finalizar, será redireccionado para o WhatsApp com o resumo da sua compra para confirmação.
        </p>
      </div>
    </PageLayout>
  )
}
