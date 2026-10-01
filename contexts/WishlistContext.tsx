'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface WishlistContextType {
  ids: string[]
  isWishlisted: (id: string) => boolean
  /** Alterna o favorito e devolve o novo estado (true = adicionado). */
  toggle: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const STORAGE_KEY = 'dripgod_wishlist'

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setIds(JSON.parse(stored))
    } catch (err) {
      console.error('[DripGOd] Erro ao carregar favoritos:', err)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch (err) {
      console.error('[DripGOd] Erro ao guardar favoritos:', err)
    }
  }, [ids, isLoaded])

  const isWishlisted = (id: string) => ids.includes(id)

  const toggle = (id: string) => {
    const adding = !ids.includes(id)
    setIds((prev) => (adding ? [...prev, id] : prev.filter((i) => i !== id)))
    return adding
  }

  return (
    <WishlistContext.Provider value={{ ids, isWishlisted, toggle }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist deve ser usado dentro de um WishlistProvider')
  }
  return context
}
