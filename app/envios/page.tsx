import { PageLayout } from '@/components/PageLayout'

export default function Page() {
  return (
    <PageLayout title="Envios" description="Informações sobre prazos, custos e áreas de cobertura das nossas entregas.">
      <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Áreas de entrega</h2>
          <p>Entregamos em todas as províncias de Moçambique. Entregas em Maputo e Matola têm prazos mais curtos devido à proximidade do nosso centro de distribuição.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Prazos estimados</h2>
          <p>Maputo e Matola: 1 a 3 dias úteis. Restantes províncias: 3 a 7 dias úteis, dependendo da localização.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Custos de envio</h2>
          <p>O custo de envio é calculado automaticamente no checkout, com base na localização e no peso da encomenda.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Acompanhamento da encomenda</h2>
          <p>Assim que a sua encomenda for despachada, receberá um código de acompanhamento por email.</p>
        </div>
      </div>
    </PageLayout>
  )
}
