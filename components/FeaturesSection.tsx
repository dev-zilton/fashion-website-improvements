'use client'

import { m } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

const features = [
  {
    title: 'Qualidade a sério',
    description: 'Peças importadas e escolhidas a dedo, com acabamento que se nota logo ao primeiro toque.',
  },
  {
    title: 'Compra sem stress',
    description: 'Dúvidas sobre o tamanho ou a cor? Fale connosco no WhatsApp e confirme tudo antes de pagar.',
  },
  {
    title: 'Entrega em todo o país',
    description: 'Maputo e Matola em 1 a 3 dias úteis. Restantes províncias em 3 a 7 dias úteis.',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs md:text-sm tracking-widest text-accent mb-4">DIFERENCIAIS</p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Porquê comprar na DripGOd
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <m.div
                className="text-center"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="block text-5xl text-accent mb-4"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="w-8 h-px bg-foreground/20 mx-auto mb-5" />
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </m.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
