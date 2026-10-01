import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'
import { ProductCollection } from '@/components/ProductCollection'
import { FEATURED_PRODUCTS } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Novidades',
  description: 'Confira as últimas peças que chegaram à nossa colecção.',
}

export default function Page() {
  return (
    <PageLayout title="Novidades" description="Confira as últimas peças que chegaram à nossa colecção.">
      <ProductCollection products={FEATURED_PRODUCTS.filter((p) => p.isNew)} />
    </PageLayout>
  )
}
