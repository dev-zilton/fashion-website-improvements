import type { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Como utilizamos cookies neste website.',
}

export default function Page() {
  return (
    <PageLayout title="Política de Cookies" description="Como utilizamos cookies neste website.">
      <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">O que são cookies</h2>
          <p>Cookies são pequenos ficheiros armazenados no seu dispositivo que ajudam a melhorar a sua experiência de navegação.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Como utilizamos</h2>
          <p>Utilizamos cookies para lembrar preferências, manter o carrinho de compras ativo e analisar o desempenho do website.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Gestão de cookies</h2>
          <p>Pode gerir ou desativar cookies através das definições do seu navegador, embora isso possa afetar algumas funcionalidades do website.</p>
        </div>
      </div>
    </PageLayout>
  )
}
