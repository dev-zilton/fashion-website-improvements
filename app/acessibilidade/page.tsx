import { PageLayout } from '@/components/PageLayout'

export default function Page() {
  return (
    <PageLayout title="Acessibilidade" description="O nosso compromisso em tornar o website acessível a todos.">
      <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6">
        <div>
          <p>A DripGOD está empenhada em garantir que o seu website seja acessível ao maior número possível de pessoas, incluindo pessoas com deficiência.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Funcionalidades de acessibilidade</h2>
          <p>O website inclui navegação por teclado, texto alternativo em imagens, e contraste adequado de cores para melhor legibilidade.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Feedback</h2>
          <p>Se encontrar alguma barreira de acessibilidade, contacte-nos através da nossa página de Contacto para que possamos melhorar continuamente.</p>
        </div>
      </div>
    </PageLayout>
  )
}
