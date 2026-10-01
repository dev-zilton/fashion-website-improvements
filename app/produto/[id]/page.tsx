import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'
import { FEATURED_PRODUCTS, getProductById } from '@/lib/products'
import { ProductDetail } from '@/components/ProductDetail'
import { SITE_URL } from '@/lib/config'
import { notFound } from 'next/navigation'

type Params = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return FEATURED_PRODUCTS.map((product) => ({ id: product.id }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProductById((await params).id)
  if (!product) return {}

  const price = product.salePrice ?? product.price
  const description = product.priceOnRequest
    ? `${product.title} da colecção ${product.collection.toLowerCase()} DripGOd. Preço sob consulta, com entrega em Moçambique.`
    : `${product.title} da colecção ${product.collection.toLowerCase()} DripGOd. ${price} MT, com entrega em Moçambique.`
  return {
    title: product.title,
    description,
    alternates: { canonical: `/produto/${product.id}` },
    openGraph: { title: product.title, description, images: [product.image] },
  }
}

export default async function Page({ params }: Params) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: `${SITE_URL}${product.image}`,
    category: product.collection,
    brand: { '@type': 'Brand', name: 'DripGOd' },
    // Sem `offers` quando o preço é sob consulta (um preço falso invalidaria o rich result)
    ...(product.priceOnRequest
      ? {}
      : {
          offers: {
            '@type': 'Offer',
            url: `${SITE_URL}/produto/${product.id}`,
            priceCurrency: 'MZN',
            price: product.salePrice ?? product.price,
            availability: 'https://schema.org/InStock',
          },
        }),
  }

  return (
    <PageLayout title={product.title}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
    </PageLayout>
  )
}
