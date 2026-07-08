import { PageLayout } from '@/components/PageLayout'
import { Heart } from 'lucide-react'

export default function Page() {
  return (
    <PageLayout
      title="Favoritos"
      description="Guarde as suas peças preferidas para mais tarde."
    >
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <Heart size={48} className="text-gray-400" />
        <p className="text-gray-400 max-w-md">
          A sua lista de favoritos está vazia. Explore a nossa colecção e
          adicione as peças que mais gosta clicando no ícone de coração.
        </p>
      </div>
    </PageLayout>
  )
}
