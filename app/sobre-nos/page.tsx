import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a história e os valores da DripGOD.',
}

export default function Page() {
  return (
    <PageLayout title="Sobre Nós" description="Conheça a história e os valores da DripGOD.">
      <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div>
          <p>A DripGOD nasceu em Maputo com o propósito de trazer moda contemporânea e de qualidade para Moçambique, unindo design internacional a uma identidade genuinamente moçambicana.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">A nossa missão</h2>
          <p>Oferecer peças cuidadosamente selecionadas, com qualidade e propósito, valorizando o talento e o estilo moçambicano.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Os nossos valores</h2>
          <p>Qualidade, autenticidade, responsabilidade social e compromisso com a comunidade local guiam todas as nossas decisões, desde a seleção de peças até ao atendimento ao cliente.</p>
        </div>
      </div>
    </PageLayout>
  )
}
