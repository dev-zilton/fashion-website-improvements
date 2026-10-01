import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calçados',
  description: 'Sapatilhas, sapatos sociais e botas DripGOd com entrega em Moçambique.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
