import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calçados',
  description: 'Snikas, sapatos e botas importados, com entrega em todo Moçambique.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
