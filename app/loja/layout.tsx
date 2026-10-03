import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loja',
  description: 'Roupa, snikas e acessórios importados, com as tendências do momento e entrega em todo Moçambique.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
