'use client'

import { ReactNode, useRef } from 'react'

const LIT_MS = 1500

// Ao tocar num logótipo ele fica a cores durante um momento; a faixa continua a andar
export function BrandMarqueeTrack({ children }: { children: ReactNode }) {
  const timers = useRef(new Map<Element, ReturnType<typeof setTimeout>>())

  const light = (target: EventTarget) => {
    const tile = (target as Element).closest('.brand-tile')
    if (!tile) return
    tile.classList.add('is-lit')
    clearTimeout(timers.current.get(tile))
    timers.current.set(tile, setTimeout(() => tile.classList.remove('is-lit'), LIT_MS))
  }

  return (
    <div className="brand-marquee-track overflow-hidden" onPointerDown={(e) => light(e.target)}>
      {children}
    </div>
  )
}
