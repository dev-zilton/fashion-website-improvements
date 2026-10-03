'use client'

import { LazyMotion } from 'framer-motion'
import type { ReactNode } from 'react'

// As funcionalidades de animação chegam num ficheiro à parte, depois de a página aparecer
const loadFeatures = () => import('./motionFeatures').then((mod) => mod.default)

// Componentes `m.*` em vez de `motion.*`: só carregam o que o site usa
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}
