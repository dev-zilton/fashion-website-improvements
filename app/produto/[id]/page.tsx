import { PageLayout } from '@/components/PageLayout'
import { FEATURED_PRODUCTS } from '@/lib/products'
import { ProductDetail } from '@/components/ProductDetail'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return FEATURED_PRODUCTS.map((product) => ({ id: product.id }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = FEATURED_PRODUCTS.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <PageLayout title={product.title}>
      <ProductDetail product={product} />
    </PageLayout>
  )
}
