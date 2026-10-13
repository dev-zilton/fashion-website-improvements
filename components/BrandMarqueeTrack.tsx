'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { usePageLoaded } from '@/hooks/usePageLoaded'

const LIT_MS = 1500

// Ao tocar num logótipo ele fica a cores durante um momento; a faixa continua a andar
export function BrandMarqueeTrack({ children }: { children: ReactNode }) {
  const timers = useRef(new Map<Element, ReturnType<typeof setTimeout>>())
  const trackRef = useRef<HTMLDivElement>(null)
  const pageLoaded = usePageLoaded()

  // Os logótipos andam para dentro do ecrã: depois de a página abrir descarregam todos,
  // para não aparecerem em branco quando entram (o Safari só carrega imagens "lazy" muito em cima)
  useEffect(() => {
    if (!pageLoaded) return
    trackRef.current?.querySelectorAll('img').forEach((img) => { img.loading = 'eager' })
  }, [pageLoaded])

  const light = (target: EventTarget) => {
    const tile = (target as Element).closest('.brand-tile')
    if (!tile) return
    tile.classList.add('is-lit')
    clearTimeout(timers.current.get(tile))
    timers.current.set(tile, setTimeout(() => tile.classList.remove('is-lit'), LIT_MS))
  }

  return (
    <div ref={trackRef} className="brand-marquee-track overflow-hidden" onPointerDown={(e) => light(e.target)}>
      {children}
    </div>
  )
}
