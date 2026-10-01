import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Perguntas Frequentes',
  description: 'Tire as suas dúvidas sobre encomendas, pagamentos e entregas.',
}

export default function Page() {
  return (
    <PageLayout title="Perguntas Frequentes" description="Tire as suas dúvidas sobre encomendas, pagamentos e entregas.">
      <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Como faço uma encomenda?</h2>
          <p>Escolha os produtos desejados, adicione ao carrinho e siga o processo de finalização de compra. Vai receber uma confirmação por email assim que a encomenda for processada.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Que métodos de pagamento aceitam?</h2>
          <p>Aceitamos M-Pesa, e-Mola, e cartões Visa e Mastercard.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Quanto tempo demora a entrega?</h2>
          <p>Entregas em Maputo demoram entre 1 a 3 dias úteis. Para outras províncias, o prazo pode variar entre 3 a 7 dias úteis.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Posso trocar ou devolver um produto?</h2>
          <p>Sim, consulte a nossa página de Devoluções para saber mais sobre prazos e condições.</p>
        </div>
      </div>
    </PageLayout>
  )
}
