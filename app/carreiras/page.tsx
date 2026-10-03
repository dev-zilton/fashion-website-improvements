import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Carreiras',
  description: 'Faça parte da equipa DripGOD.',
}

export default function Page() {
  return (
    <PageLayout title="Carreiras" description="Faça parte da equipa DripGOD.">
      <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div>
          <p>Estamos sempre à procura de pessoas talentosas e apaixonadas por moda para se juntarem à nossa equipa em Maputo.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Vagas atuais</h2>
          <p>De momento não temos vagas em aberto, mas convidamos-lhe a enviar o seu currículo através da nossa página de Contacto para futuras oportunidades.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Porquê trabalhar connosco</h2>
          <p>Uma equipa jovem, um ambiente descontraído e a oportunidade de crescer connosco enquanto levamos as tendências a cada vez mais gente em Moçambique.</p>
        </div>
      </div>
    </PageLayout>
  )
}
