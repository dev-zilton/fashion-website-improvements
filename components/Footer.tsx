'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Share2, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    COMPRAR: [
      { label: 'Novidades', href: '/novidades' },
      { label: 'Colecções', href: '/#coleccoes' },
      { label: 'Promoções', href: '/promocoes' },
      { label: 'Edição Limitada', href: '/edicao-limitada' },
    ],
    SUPORTE: [
      { label: 'Contacto', href: '/#contacto' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Envios', href: '/envios' },
      { label: 'Devoluções', href: '/devolucoes' },
    ],
    EMPRESA: [
      { label: 'Sobre Nós', href: '/sobre-nos' },
      { label: 'Carreiras', href: '/carreiras' },
      { label: 'Sustentabilidade', href: '/sustentabilidade' },
      { label: 'Imprensa', href: '/imprensa' },
    ],
    LEGAL: [
      { label: 'Privacidade', href: '/privacidade' },
      { label: 'Termos', href: '/termos' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Acessibilidade', href: '/acessibilidade' },
    ],
  }

  const socialLinks = [
    { icon: Share2, url: '#', label: 'Share' },
    { icon: Heart, url: '#', label: 'Wishlist' },
    { icon: Mail, url: '#', label: 'Email' },
  ]

  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border/20">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="max-w-2xl">
            <motion.h3
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Playfair Display' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Fique atualizado
            </motion.h3>
            <p className="text-sm text-gray-300 mb-8">
              Receba novidades, ofertas exclusivas e inspiração de Moçambique direto na sua caixa de entrada.
            </p>

            <div className="flex gap-4">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 px-4 py-3 bg-white/10 text-white placeholder-gray-400 text-sm border border-white/20 focus:outline-none focus:border-accent transition-colors"
              />
              <button className="px-8 py-3 bg-accent text-black font-semibold tracking-wider text-sm hover:bg-white transition-colors">
                SUBSCREVER
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-wider block mb-6">
              DRIP<span className="text-accent">GOD</span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Qualidade premium, design contemporâneo, e moda moçambicana com propósito para si.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold tracking-widest mb-6 text-accent">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/20 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright */}
          <div className="text-xs text-gray-400">
            <p>© {currentYear} DripGOd. Todos os direitos reservados.</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <Link
                key={label}
                href={url}
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>

          {/* Payment Methods (placeholder) */}
          <div className="flex gap-4 items-center">
            <span className="text-xs text-gray-400">Formas de pagamento:</span>
            <div className="flex gap-3 text-xs text-gray-400">
              <span>Visa</span>
              <span>•</span>
              <span>Mastercard</span>
              <span>•</span>
              <span>PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
