'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

// Frases da própria loja (não são testemunhos de clientes)
const messages = [
  {
    title: 'Snikas que completam o teu Drip!',
    text: 'Muitas peças chegam em poucas unidades. Quem vê primeiro, leva.',
  },
  {
    title: 'Fit maningue nice, sem complicação.',
    text: 'Escolher, encomendar e receber onde estiver. Simples assim.',
  },
  {
    title: 'Dúvidas no tamanho? É só mandar mensagem.',
    text: 'No WhatsApp a malta responde e ajuda a acertar no tamanho e na cor antes de pagar.',
  },
  {
    title: 'Drip importado, qualidade que se nota.',
    text: 'Roupa, snikas e acessórios escolhidos a dedo, com as tendências do momento.',
  },
]

export function VibeSection() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % messages.length)
  const prev = () => setCurrent((prev) => (prev - 1 + messages.length) % messages.length)

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs md:text-sm tracking-widest text-accent mb-4">A NOSSA VIBE</p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Drip maningue nice, sem stress
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <m.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="bg-muted p-8 md:p-12 rounded-lg"
              >
                <p
                  className="text-2xl md:text-4xl font-bold mb-4 leading-tight"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {messages[current].title}
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {messages[current].text}
                </p>
              </m.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prev}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Mensagem anterior"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Indicators */}
              <div className="flex gap-2">
                {messages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === current ? 'w-8 bg-accent' : 'w-2 bg-muted hover:bg-muted-foreground'
                    }`}
                    aria-label={`Ver mensagem ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Mensagem seguinte"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
