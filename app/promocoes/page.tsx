import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'
import { ProductCollection } from '@/components/ProductCollection'
import { FEATURED_PRODUCTS } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Promoções',
  description: 'Peças selecionadas com condições especiais para si.',
}

export default function Page() {
  return (
    <PageLayout title="Promoções" description="Peças selecionadas com condições especiais para si.">
      <ProductCollection products={FEATURED_PRODUCTS.filter((p) => p.salePrice)} />
    </PageLayout>
  )
}
