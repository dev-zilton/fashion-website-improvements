import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Termos e Condições',
  description: 'Termos de utilização do nosso website e serviços.',
}

export default function Page() {
  return (
    <PageLayout title="Termos e Condições" description="Termos de utilização do nosso website e serviços.">
      <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Aceitação dos termos</h2>
          <p>Ao utilizar este website, o utilizador concorda com os presentes Termos e Condições.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Encomendas e pagamentos</h2>
          <p>Todas as encomendas estão sujeitas a disponibilidade de stock e confirmação de pagamento antes do processamento.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Preços</h2>
          <p>Os preços apresentados estão em Meticais (MZN) e podem ser alterados sem aviso prévio.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Propriedade intelectual</h2>
          <p>Todo o conteúdo deste website, incluindo imagens, textos e logótipos, é propriedade da DripGOD e não pode ser reproduzido sem autorização.</p>
        </div>
      </div>
    </PageLayout>
  )
}
