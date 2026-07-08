import { PageLayout } from '@/components/PageLayout'
import { ShoppingBag } from 'lucide-react'

export default function Page() {
  return (
    <PageLayout
      title="Sacola"
      description="Reveja os artigos que selecionou antes de finalizar a compra."
    >
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <ShoppingBag size={48} className="text-gray-400" />
        <p className="text-gray-400 max-w-md">
          A sua sacola está vazia. Explore a nossa colecção e adicione as
          peças que mais gosta clicando em "Adicionar ao Carrinho".
        </p>
      </div>
    </PageLayout>
  )
}
