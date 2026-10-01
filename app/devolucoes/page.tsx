import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Devoluções',
  description: 'Saiba como trocar ou devolver os seus produtos.',
}

export default function Page() {
  return (
    <PageLayout title="Devoluções" description="Saiba como trocar ou devolver os seus produtos.">
      <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Prazo para devolução</h2>
          <p>Tem até 14 dias após a receção do produto para solicitar troca ou devolução, desde que o artigo esteja em condições originais, sem uso e com etiquetas.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Como solicitar</h2>
          <p>Entre em contacto connosco através da página de Contacto, indicando o número da encomenda e o motivo da devolução.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Reembolso</h2>
          <p>Após recebermos e validarmos o produto devolvido, o reembolso é processado no mesmo método de pagamento utilizado na compra, num prazo de até 10 dias úteis.</p>
        </div>
      </div>
    </PageLayout>
  )
}
