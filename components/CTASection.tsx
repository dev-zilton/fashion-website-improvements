import { ScrollReveal } from './ScrollReveal'

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <p
              className="reveal text-xs md:text-sm tracking-widest text-accent mb-6"
            >
              EXCLUSIVO
            </p>

            {/* Headline */}
            <h2
              className="reveal text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              O seu próximo outfit está aqui
            </h2>

            {/* Description */}
            <p
              className="reveal text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Do básico do dia a dia ao look para sair à noite: escolha as peças, monte o visual e nós tratamos da entrega.
            </p>

            {/* CTA Buttons */}
            <div
              className="reveal flex flex-col sm:flex-row gap-6 justify-center"
            >
              <a
                href="#coleccoes"
                className="px-12 py-4 bg-accent text-black font-semibold tracking-wider hover:bg-white transition-colors duration-300 inline-block text-sm"
              >
                COMPRAR AGORA
              </a>
              <a
                href="#contacto"
                className="px-12 py-4 border-2 border-white text-white font-semibold tracking-wider hover:bg-white hover:text-black transition-colors duration-300 inline-block text-sm"
              >
                SABER MAIS
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
