import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loja',
  description: 'Toda a colecção DripGOd: roupa, calçados e acessórios com entrega em Moçambique.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
