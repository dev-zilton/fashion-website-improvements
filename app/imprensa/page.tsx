import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Imprensa',
  description: 'Recursos e contactos para profissionais de comunicação.',
}

export default function Page() {
  return (
    <PageLayout title="Imprensa" description="Recursos e contactos para profissionais de comunicação.">
      <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div>
          <p>Para pedidos de imprensa, entrevistas ou material promocional, entre em contacto connosco através da nossa página de Contacto.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Kit de imprensa</h2>
          <p>Disponibilizamos logótipos, imagens de produtos e informações sobre a marca mediante solicitação.</p>
        </div>
      </div>
    </PageLayout>
  )
}
