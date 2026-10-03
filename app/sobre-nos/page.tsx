import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Quem somos e porque fazemos isto.',
}

export default function Page() {
  return (
    <PageLayout title="Sobre Nós" description="Quem somos e porque fazemos isto.">
      <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div>
          <p>A DripGOD nasceu em Maputo com uma ideia simples: vestir as peças que estão em alta lá fora não devia ser complicado. Por isso importamos roupa, snikas e acessórios de qualidade e trazemo-los até si, sem viagens nem dores de cabeça.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">O que fazemos</h2>
          <p>Andamos de olho nas tendências, escolhemos as peças a dedo e só trazemos o que vale mesmo a pena usar. Muitas chegam em poucas unidades, por isso quem vê primeiro, leva primeiro.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Como trabalhamos</h2>
          <p>Qualidade em primeiro lugar, preços claros e um atendimento próximo. Tem dúvidas sobre um tamanho ou uma cor? Fale connosco: respondemos como um amigo que percebe de moda.</p>
        </div>
      </div>
    </PageLayout>
  )
}
