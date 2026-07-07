'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useMotionPreference } from '@/hooks/useMotionPreference'

export function Hero() {
  const [activeImage, setActiveImage] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const prefersReducedMotion = useMotionPreference()

  // Rotate hero images every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 3)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  const collections = [
    {
      title: 'COLECÇÃO PRIMAVERA',
      subtitle: 'Silhuetas ousadas e cores vibrantes de Moçambique',
      image: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    },
    {
      title: 'PEÇAS ESSENCIAIS',
      subtitle: 'Peças atemporais para o guarda-roupa perfeito',
      image: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
    },
    {
      title: 'EDIÇÃO LIMITADA MAPUTO',
      subtitle: 'Designs exclusivos inspirados na cultura moçambicana',
      image: 'linear-gradient(135deg, #2a2a2a 0%, #000000 100%)',
    },
  ]

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background with crossfade and parallax */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary to-secondary"
        style={{
          transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {collections.map((collection, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{
              background: collection.image,
              willChange: 'opacity',
            }}
            initial={{ opacity: index === 0 ? 0.1 : 0 }}
            animate={{ opacity: index === activeImage ? 0.3 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.p
            className="text-xs md:text-sm tracking-widest text-accent mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.1 }}
          >
            — NOVO LANÇAMENTO —
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-foreground mb-6 tracking-tight"
            style={{ fontFamily: 'Playfair Display' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.2 }}
          >
            Estilo Premium
            <br />
            <span className="text-accent">Feito em Moçambique</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.3 }}
          >
            Descubra a excelência em cada peça. Qualidade, design e conforto de Maputo para o mundo.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.4 }}
          >
            <a
              href="#coleccoes"
              className="px-12 py-4 bg-accent text-black font-semibold tracking-wider hover:bg-white transition-colors duration-300 inline-block text-sm focus:outline-2 focus:outline-offset-2 focus:outline-accent rounded"
            >
              EXPLORAR COLECÇÃO
            </a>
            <a
              href="#testemunhos"
              className="px-12 py-4 border-2 border-foreground text-foreground font-semibold tracking-wider hover:bg-foreground hover:text-background transition-colors duration-300 inline-block text-sm focus:outline-2 focus:outline-offset-2 focus:outline-accent rounded"
            >
              SABER MAIS
            </a>
          </motion.div>
        </div>
      </div>

      {/* Collection Indicators */}
      <div className="flex gap-3 justify-center mt-16">
        {collections.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`h-1 transition-all duration-300 ${
              index === activeImage ? 'w-12 bg-accent' : 'w-2 bg-muted hover:bg-muted-foreground'
            }`}
            aria-label={`Go to collection ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="w-6 h-6 text-foreground opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  )
}
