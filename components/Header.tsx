'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import Link from 'next/link'
import { Menu, X, ShoppingBag, Heart } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()
  const { ids: wishlistIds } = useWishlist()

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { label: 'LOJA', href: '/loja' },
    { label: 'COLECÇÕES', id: 'coleccoes' },
    { label: 'CALÇADOS', href: '/calcados' },
    { label: 'A NOSSA VIBE', id: 'vibe' },
    { label: 'CONTACTO', id: 'contacto' },
  ]

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-accent focus:text-black"
      >
        Ir para conteúdo principal
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto" aria-label="Navegação principal">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wider" style={{ fontFamily: 'var(--font-playfair)' }}>
          DRIP<span className="text-accent">GOD</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href ?? `/#${item.id}`}
              className="text-xs tracking-widest font-medium hover:text-accent transition-colors duration-300 focus:outline-2 focus:outline-offset-2 focus:outline-accent rounded px-2 py-1"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Wishlist */}
          <Link href="/favoritos" className="relative" aria-label="Abrir favoritos">
            <Heart size={20} className="hover:text-accent transition-colors" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/sacola" className="relative" aria-label="Abrir carrinho">
            <ShoppingBag size={20} className="hover:text-accent transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-muted rounded transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-accent"
            aria-label="Abrir menu"
            aria-expanded={isOpen}
          >
            {/* initial={false}: o ícone aparece logo com o HTML, só anima ao abrir/fechar */}
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </m.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Animated */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            className="md:hidden border-t border-border bg-background overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <m.div
              className="flex flex-col gap-4 px-6 py-6"
              role="navigation"
              aria-label="Menu móvel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <m.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <a
                    href={item.href ?? `/#${item.id}`}
                    className="text-sm font-medium tracking-wide hover:text-accent transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-accent rounded px-2 py-1 block"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                </m.div>
              ))}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
    </>
  )
}
