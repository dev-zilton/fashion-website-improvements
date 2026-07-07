'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Truck } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

const features = [
  {
    icon: Zap,
    title: 'Qualidade Premium',
    description: 'Selecionamos apenas as melhores peças com materiais de excelência moçambicana',
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description: 'Os seus dados estão protegidos com encriptação de nível bancário',
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Entregamos em até 5 dias úteis para todo Moçambique',
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
              style={{ fontFamily: 'Playfair Display' }}
            >
              Por que escolher a DripGOd
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  className="text-center"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary rounded-full text-accent"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon size={28} />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
