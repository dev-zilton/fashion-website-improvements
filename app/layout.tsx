import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/contexts/CartContext'
import { SITE_URL } from '@/lib/config'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { MotionProvider } from '@/components/MotionProvider'
import { WhatsAppButton } from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'DripGOd - O drip do mundo, em Moçambique', template: '%s | DripGOd' },
  description: 'Roupa, snikas e acessórios importados, com qualidade a sério e as tendências do momento. Entregamos em todo Moçambique.',
  keywords: 'roupa importada, snikas, ténis, sapatilhas, streetwear, drip, moda, Moçambique, Maputo',
  authors: [{ name: 'DripGOd Moçambique' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'pt_MZ',
    url: SITE_URL,
    siteName: 'DripGOd',
    title: 'DripGOd - O drip do mundo, em Moçambique',
    description: 'Roupa, snikas e acessórios importados, com as tendências do momento. Entregamos em todo Moçambique.',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DripGOd - O drip do mundo, em Moçambique',
    description: 'Roupa, snikas e acessórios importados, com as tendências do momento. Entregamos em todo Moçambique.',
    images: ['/opengraph-image'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className={`bg-background ${inter.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans">
        <MotionProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </MotionProvider>
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
