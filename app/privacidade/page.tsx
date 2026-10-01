import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como recolhemos, usamos e protegemos os seus dados pessoais.',
}

export default function Page() {
  return (
    <PageLayout title="Política de Privacidade" description="Como recolhemos, usamos e protegemos os seus dados pessoais.">
      <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Dados que recolhemos</h2>
          <p>Recolhemos informações como nome, contacto, morada de entrega e histórico de compras, necessários para processar as suas encomendas.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Como utilizamos os seus dados</h2>
          <p>Os dados são utilizados exclusivamente para processar encomendas, melhorar a experiência de compra e, mediante consentimento, enviar comunicações de marketing.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Partilha de dados</h2>
          <p>Não vendemos os seus dados pessoais a terceiros. Podemos partilhar informações com parceiros de entrega e pagamento estritamente para viabilizar o serviço.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Os seus direitos</h2>
          <p>Pode solicitar acesso, correção ou eliminação dos seus dados a qualquer momento através da nossa página de Contacto.</p>
        </div>
      </div>
    </PageLayout>
  )
}
