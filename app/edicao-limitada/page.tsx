import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'
import { ProductCollection } from '@/components/ProductCollection'
import { FEATURED_PRODUCTS } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Edição Limitada',
  description: 'Poucas unidades, muita procura. Quando acabam, acabam.',
}

export default function Page() {
  return (
    <PageLayout title="Edição Limitada" description="Poucas unidades, muita procura. Quando acabam, acabam.">
      <ProductCollection products={FEATURED_PRODUCTS.filter((p) => p.collection === 'EDIÇÃO LIMITADA')} />
    </PageLayout>
  )
}
