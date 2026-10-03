'use client'

import { m } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <m.p
              className="text-xs md:text-sm tracking-widest text-accent mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              EXCLUSIVO
            </m.p>

            {/* Headline */}
            <m.h2
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              O seu próximo outfit está aqui
            </m.h2>

            {/* Description */}
            <m.p
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Do básico do dia a dia ao look para sair à noite: escolha as peças, monte o visual e nós tratamos da entrega.
            </m.p>

            {/* CTA Buttons */}
            <m.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
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
            </m.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
