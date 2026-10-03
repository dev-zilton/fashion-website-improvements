import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'
import { ProductCollection } from '@/components/ProductCollection'
import { FEATURED_PRODUCTS } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Novidades',
  description: 'Acabou de chegar: as últimas peças que trouxemos para si.',
}

export default function Page() {
  return (
    <PageLayout title="Novidades" description="Acabou de chegar: as últimas peças que trouxemos para si.">
      <ProductCollection products={FEATURED_PRODUCTS.filter((p) => p.isNew)} />
    </PageLayout>
  )
}
