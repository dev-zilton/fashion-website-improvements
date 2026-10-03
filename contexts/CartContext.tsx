'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getProductById } from '@/lib/products'

export interface CartItem {
  /** Identifica a linha do carrinho: o mesmo produto em tamanhos diferentes são linhas diferentes. */
  lineId: string
  id: string
  title: string
  price: number
  salePrice?: number
  image: string
  quantity: number
  size?: string
  color?: string
}

export type NewCartItem = Omit<CartItem, 'quantity' | 'lineId'>

interface CartContextType {
  items: CartItem[]
  addItem: (item: NewCartItem) => void
  removeItem: (lineId: string) => void
  updateQuantity: (lineId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'dripgod_cart'

const makeLineId = (item: Pick<CartItem, 'id' | 'size' | 'color'>) =>
  [item.id, item.size ?? '', item.color ?? ''].join('|')

// O carrinho guardado pode ter preços ou produtos que já mudaram no catálogo:
// actualiza nome e preço, e retira os que já não existem ou passaram a preço sob consulta.
const syncWithCatalog = (items: CartItem[]): CartItem[] =>
  items.flatMap((i) => {
    const product = getProductById(i.id)
    if (!product || product.priceOnRequest) return []
    return [{ ...i, title: product.title, price: product.price, salePrice: product.salePrice }]
  })

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[]
        // Carrinhos antigos não tinham lineId
        // Ler o localStorage só depois de montar evita erros de hidratação
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(syncWithCatalog(parsed.map((i) => ({ ...i, lineId: i.lineId ?? makeLineId(i) }))))
      }
    } catch (err) {
      console.error('[DripGOd] Erro ao carregar carrinho do localStorage:', err)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (err) {
      console.error('[DripGOd] Erro ao salvar carrinho no localStorage:', err)
    }
  }, [items, isLoaded])

  const addItem = (item: NewCartItem) => {
    const lineId = makeLineId(item)
    setItems((prev) => {
      const existing = prev.find((i) => i.lineId === lineId)
      if (existing) {
        return prev.map((i) =>
          i.lineId === lineId ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, lineId, quantity: 1 }]
    })
  }

  const removeItem = (lineId: string) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId))
  }

  const updateQuantity = (lineId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(lineId)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.lineId === lineId ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce(
    (sum, i) => sum + (i.salePrice ?? i.price) * i.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
