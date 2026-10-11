import fs from 'node:fs'
import path from 'node:path'
import { ALL_BRANDS, brandSlug, type Brand } from '@/lib/brands'
import { BrandMarqueeTrack } from './BrandMarqueeTrack'

// Logótipo em public/brands/<nome-da-marca>.svg (ou .png)
function findLogo(brand: Brand) {
  const file = ['svg', 'png'].map((ext) => `${brandSlug(brand)}.${ext}`)
    .find((name) => fs.existsSync(path.join(process.cwd(), 'public', 'brands', name)))
  return file ? `/brands/${file}` : null
}

// Só entram no carrossel as marcas que têm logótipo; são só para mostrar, sem links
const BRANDS_WITH_LOGO = ALL_BRANDS.flatMap((brand) => {
  const logo = findLogo(brand)
  return logo ? [{ brand, logo }] : []
})

export function BrandCarousel() {
  // A lista é desenhada duas vezes para o movimento dar a volta sem saltos
  const renderList = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-4 md:gap-6 pr-4 md:pr-6" aria-hidden={hidden || undefined}>
      {BRANDS_WITH_LOGO.map(({ brand, logo }) => (
        <li key={brand.name} className="brand-tile flex items-center justify-center w-28 h-20 md:w-36 md:h-24 p-2 bg-white rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element -- logótipos SVG pequenos, sem otimização */}
          <img src={logo} alt={brand.name} className="brand-logo h-full w-full object-contain" loading="lazy" draggable={false} />
        </li>
      ))}
    </ul>
  )

  return (
    <section aria-label="Marcas disponíveis" className="py-10 md:py-14 border-y border-border">
      <p className="text-center text-xs md:text-sm tracking-widest text-accent mb-6 md:mb-8">AS NOSSAS MARCAS</p>
      <BrandMarqueeTrack>
        <div className="brand-marquee flex w-max">
          {renderList(false)}
          {renderList(true)}
        </div>
      </BrandMarqueeTrack>
    </section>
  )
}
