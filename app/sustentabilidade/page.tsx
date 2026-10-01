import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Sustentabilidade',
  description: 'O nosso compromisso com práticas responsáveis.',
}

export default function Page() {
  return (
    <PageLayout title="Sustentabilidade" description="O nosso compromisso com práticas responsáveis.">
      <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div>
          <p>A DripGOD está comprometida em reduzir o impacto ambiental das suas operações e promover práticas responsáveis ao longo de toda a cadeia de produção.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Fornecedores locais</h2>
          <p>Priorizamos parcerias com produtores e fornecedores moçambicanos, fortalecendo a economia local.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Embalagens responsáveis</h2>
          <p>Trabalhamos continuamente para reduzir o uso de plástico e adotar materiais de embalagem mais sustentáveis.</p>
        </div>
      </div>
    </PageLayout>
  )
}
