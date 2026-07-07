'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

const testimonials = [
  {
    name: 'Marina Silva',
    role: 'Fashion Influencer',
    text: 'DripGOd oferece a qualidade que procurava! Cada peça é um investimento em estilo.',
    rating: 5,
  },
  {
    name: 'Carlos Santos',
    role: 'Empresário',
    text: 'Excelente atendimento e produtos premium. Recomendo para quem valoriza qualidade.',
    rating: 5,
  },
  {
    name: 'Ana Costa',
    role: 'Stylist Profissional',
    text: 'As coleções são incríveis! Design contemporâneo com toque de sofisticação.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs md:text-sm tracking-widest text-accent mb-4">DEPOIMENTOS</p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: 'Playfair Display' }}
            >
              O que nossos clientes dizem
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="bg-muted p-8 md:p-12 rounded-lg"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl font-light mb-8 leading-relaxed">
                  "{testimonials[current].text}"
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-semibold text-sm">{testimonials[current].name}</p>
                  <p className="text-xs text-muted-foreground tracking-wide">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prev}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === current ? 'w-8 bg-accent' : 'w-2 bg-muted hover:bg-muted-foreground'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Next testimonial"
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
