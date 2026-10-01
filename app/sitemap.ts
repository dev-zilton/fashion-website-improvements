import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'
import { FEATURED_PRODUCTS } from '@/lib/products'

const PAGES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/loja', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/calcados', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/novidades', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/promocoes', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/edicao-limitada', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/sobre-nos', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/envios', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/devolucoes', priority: 0.5, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    ...PAGES.map(({ path, ...rest }) => ({ url: `${SITE_URL}${path}`, lastModified, ...rest })),
    ...FEATURED_PRODUCTS.map((p) => ({
      url: `${SITE_URL}/produto/${p.id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
