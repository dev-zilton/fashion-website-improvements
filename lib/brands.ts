import { FEATURED_PRODUCTS, type Product } from './products'

export interface Brand {
  name: string
  /** Palavras que identificam a marca no título do produto (sem acentos, minúsculas). */
  match: string[]
}

const BRANDS: Brand[] = [
  { name: 'Nike', match: ['nike', 'air force', 'air max'] },
  { name: 'Jordan', match: ['jordan'] },
  { name: 'NOCTA', match: ['nocta'] },
  { name: 'Adidas', match: ['adidas'] },
  { name: 'New Balance', match: ['new balance'] },
  { name: 'Balenciaga', match: ['balenciaga'] },
  { name: 'Lacoste', match: ['lacoste'] },
  { name: 'Timberland', match: ['timberland'] },
  { name: 'Clarks', match: ['clarks'] },
  { name: 'Crocs', match: ['crocs'] },
  { name: 'Birkenstock', match: ['birkenstock'] },
  { name: 'Tommy Hilfiger', match: ['tommy hilfiger'] },
  { name: 'Supreme', match: ['supreme'] },
  { name: 'Gallery Dept', match: ['gallery dept'] },
  { name: 'Rhude', match: ['rhude'] },
  { name: 'Diesel', match: ['diesel'] },
  { name: 'Loro Piana', match: ['loro piana'] },
  { name: 'Goyard', match: ['goyard'] },
  { name: 'BOSS', match: ['boss'] },
  { name: 'AMIRI', match: ['amiri'] },
  { name: 'BAPE', match: ['bape'] },
  { name: 'LVEVIL', match: ['lvevil'] },
  { name: 'Armani', match: ['armani'] },
  { name: 'Calvin Klein', match: ['calvin klein'] },
  { name: 'Champion', match: ['champion'] },
  { name: 'Chanel', match: ['chanel'] },
  { name: 'Dior', match: ['dior'] },
  { name: 'Converse', match: ['converse', 'all star'] },
  { name: 'Ellesse', match: ['ellesse'] },
  { name: 'Gucci', match: ['gucci'] },
  { name: 'Guess', match: ['guess'] },
  { name: "Levi's", match: ['levi'] },
  { name: 'Prada', match: ['prada'] },
  { name: 'Puma', match: ['puma'] },
  { name: 'Quiksilver', match: ['quiksilver'] },
  { name: 'Vans', match: ['vans'] },
  { name: 'Saint Laurent', match: ['saint laurent', 'ysl'] },
]

export const normalize = (value: string) =>
  value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function getProductBrands(product: Product): Brand[] {
  const title = normalize(product.title)
  return BRANDS.filter((b) => b.match.some((m) => title.includes(m)))
}

export function hasProducts(brand: Brand) {
  return FEATURED_PRODUCTS.some((p) => getProductBrands(p).includes(brand))
}

/** Nome do ficheiro do logótipo em public/brands (ex.: "Tommy Hilfiger" → "tommy-hilfiger"). */
export const brandSlug = (brand: Brand) =>
  normalize(brand.name).replace(/'/g, '').replace(/\s+/g, '-')

// Marcas com produtos aparecem primeiro no carrossel
export const ALL_BRANDS = [...BRANDS].sort((a, b) => Number(hasProducts(b)) - Number(hasProducts(a)))
