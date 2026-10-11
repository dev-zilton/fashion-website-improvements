import { ReactNode } from 'react'

// Animação ligada ao scroll em CSS (classe .reveal): o conteúdo vem visível no HTML
// e não fica em branco enquanto o JavaScript não chega numa rede móvel lenta.
export function ScrollReveal({ children }: { children: ReactNode }) {
  return <div className="reveal">{children}</div>
}
