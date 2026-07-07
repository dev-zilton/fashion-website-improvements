'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <motion.p
              className="text-xs md:text-sm tracking-widest text-accent mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              — EXCLUSIVO —
            </motion.p>

            {/* Headline */}
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Descubra o seu estilo único
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore a nossa colecção premium de Maputo e encontre as peças que definem o seu estilo pessoal.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
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
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
