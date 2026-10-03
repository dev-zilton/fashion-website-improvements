'use client'

import { useState, useEffect, useRef } from 'react'
import { useMotionPreference } from '@/hooks/useMotionPreference'

// As animações de entrada são CSS (classes hero-*): o título é o LCP no telemóvel
// e tem de aparecer logo com o HTML, sem esperar pelo JavaScript.
export function Hero() {
  const [activeImage, setActiveImage] = useState(0)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useMotionPreference()

  // Rotate hero images every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 3)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  // Parallax: mexe no estilo directamente para não re-renderizar a cada scroll
  useEffect(() => {
    const background = backgroundRef.current
    if (!background) return
    if (prefersReducedMotion) {
      background.style.transform = 'none'
      return
    }

    const handleScroll = () => {
      background.style.transform = `translateY(${window.scrollY * 0.3}px)`
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  const collections = [
    {
      title: 'COLECÇÃO PRIMAVERA',
      subtitle: 'Peças leves e cheias de cor para os dias quentes',
      image: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    },
    {
      title: 'PEÇAS ESSENCIAIS',
      subtitle: 'Básicos de qualidade que combinam com tudo',
      image: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
    },
    {
      title: 'EDIÇÃO LIMITADA',
      subtitle: 'Poucas unidades: quando acabam, acabam',
      image: 'linear-gradient(135deg, #2a2a2a 0%, #000000 100%)',
    },
  ]

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background with crossfade and parallax */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary to-secondary"
      >
        {collections.map((collection, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none"
            style={{
              background: collection.image,
              opacity: index === activeImage ? 0.3 : 0,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <p
            className="hero-fade text-xs md:text-sm tracking-widest text-accent mb-8"
            style={{ animationDelay: '100ms' }}
          >
            — ACABADO DE CHEGAR —
          </p>

          {/* Main Headline */}
          <h1
            className="hero-rise text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-foreground mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-playfair)', animationDelay: '200ms' }}
          >
            O drip do mundo,
            <br />
            <span className="text-accent">em Moçambique</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-rise text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ animationDelay: '300ms' }}
          >
            Roupa, snikas e acessórios importados, com qualidade que se nota e as tendências que toda a gente quer. Escolha online e receba onde estiver.
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-fade flex flex-col md:flex-row gap-6 justify-center"
            style={{ animationDelay: '400ms' }}
          >
            <a
              href="#coleccoes"
              className="px-12 py-4 bg-accent text-black font-semibold tracking-wider hover:bg-white transition-colors duration-300 inline-block text-sm focus:outline-2 focus:outline-offset-2 focus:outline-accent rounded"
            >
              EXPLORAR COLECÇÃO
            </a>
            <a
              href="#vibe"
              className="px-12 py-4 border-2 border-foreground text-foreground font-semibold tracking-wider hover:bg-foreground hover:text-background transition-colors duration-300 inline-block text-sm focus:outline-2 focus:outline-offset-2 focus:outline-accent rounded"
            >
              SABER MAIS
            </a>
          </div>
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
      <div className="hero-bounce absolute bottom-8 left-1/2 -translate-x-1/2">
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
      </div>
    </section>
  )
}
