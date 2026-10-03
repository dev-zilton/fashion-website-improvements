// Tons usados para desenhar as bolinhas de cor (chaves sem acentos, em minúsculas).
const COLOR_HEX: Record<string, string> = {
  preto: '#111111',
  branco: '#f5f5f5',
  cinzento: '#8c8c8c',
  'cinzento claro': '#c4c4c4',
  'cinzento escuro': '#4a4a4a',
  azul: '#2f6fd6',
  'azul claro': '#8ecbf0',
  'azul ceu': '#87ceeb',
  'azul escuro': '#1f3a6b',
  'azul lavado': '#7d9cc0',
  'azul marinho': '#1c2541',
  'azul medio': '#3f6db3',
  'azul petroleo': '#1f5f6b',
  'azul royal': '#2347c4',
  vermelho: '#d32f2f',
  verde: '#2e7d32',
  'verde escuro': '#1e4d3a',
  'verde claro': '#a5d6a7',
  'verde militar': '#4b5320',
  'verde caqui': '#8a8551',
  'verde menta': '#98e0c4',
  menta: '#98e0c4',
  'verde oliva': '#6b7a3a',
  'verde salvia': '#9caf88',
  bege: '#d9c6a5',
  creme: '#f2e8d0',
  areia: '#d8c7a3',
  camel: '#c19a6b',
  castanho: '#6b4226',
  rosa: '#f3a5c0',
  roxo: '#6a3d9a',
  coral: '#ff7f6b',
  bordo: '#6d1a2a',
  laranja: '#f28c28',
  amarelo: '#f2c418',
  dourado: '#c9a227',
  prateado: '#c0c0c0',
}

// Nomes que não são uma mistura simples de tons e precisam de um desenho próprio
const SPECIAL_BACKGROUNDS: Record<string, string> = {
  'branco multicor':
    'conic-gradient(#f5f5f5 0 180deg, #d32f2f 180deg 225deg, #f2c418 225deg 270deg, #2e7d32 270deg 315deg, #2f6fd6 315deg)',
  camuflado: 'conic-gradient(#4b5320 0 90deg, #8a8551 90deg 180deg, #6b4226 180deg 270deg, #2e3b1f 270deg)',
}

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

function mix(hexes: string[]): string {
  if (hexes.length === 1) return hexes[0]
  if (hexes.length === 2) return `linear-gradient(135deg, ${hexes[0]} 50%, ${hexes[1]} 50%)`
  const [a, b, c] = hexes
  return `conic-gradient(${a} 0 120deg, ${b} 120deg 240deg, ${c} 240deg)`
}

/** Fundo CSS da bolinha para um nome como "Preto e Vermelho"; null se o nome não for só cores. */
function swatchBackground(name: string): string | null {
  const special = SPECIAL_BACKGROUNDS[normalize(name)]
  if (special) return special
  const hexes = normalize(name)
    .split(/\s*,\s*|\s+e\s+/)
    .map((part) => COLOR_HEX[part])
  if (hexes.length === 0 || hexes.some((h) => !h)) return null
  return mix(hexes)
}

/**
 * Bolinha aproximada para o nome de um modelo, usando só as palavras de cor
 * (ex.: "Medalhão Preto" → preto). Em "Zegna Logo Amarelo – Preto" conta a cor depois do travessão.
 */
function looseBackground(name: string): string | null {
  const strict = swatchBackground(name)
  if (strict) return strict
  const words = normalize(name.split(' – ').pop() ?? name).split(/[\s,]+/)
  const hexes: string[] = []
  for (let i = 0; i < words.length; i++) {
    const pair = COLOR_HEX[`${words[i]} ${words[i + 1]}`]
    const hex = pair ?? COLOR_HEX[words[i]]
    if (pair) i++
    if (hex && !hexes.includes(hex)) hexes.push(hex)
  }
  return hexes.length ? mix(hexes.slice(0, 3)) : null
}

export interface Swatch {
  name: string
  background: string
}

/**
 * Bolinhas para uma lista de cores. Devolve null quando alguma opção é um modelo
 * (ex.: "Medalhão Preto"), para que a página mostre os nomes escritos.
 */
export function getSwatches(colors: string[]): Swatch[] | null {
  if (colors.length === 0) return null
  const swatches = colors.map((name) => ({ name, background: swatchBackground(name) }))
  return swatches.every((s) => s.background) ? (swatches as Swatch[]) : null
}

/** Bolinha de uma opção com nome de modelo, para pôr ao lado do nome escrito. */
export function getModelSwatch(name: string): string | null {
  return looseBackground(name)
}

export interface CardSwatches {
  items: Swatch[]
  /** true quando cada bolinha corresponde a uma cor que se pode escolher (e por isso leva à cor) */
  linkable: boolean
}

/**
 * Bolinhas para o cartão da loja, iguais em todos os produtos:
 * cores para escolher (com link), cores dos modelos (sem repetir) ou a cor única da peça.
 */
export function getCardSwatches(colors: string[], baseColor?: string): CardSwatches | null {
  const selectable = getSwatches(colors)
  if (selectable) return { items: selectable, linkable: true }
  const names = colors.length ? colors : baseColor ? [baseColor] : []
  const items: Swatch[] = []
  for (const name of names) {
    const background = looseBackground(name)
    if (background && !items.some((s) => s.background === background)) items.push({ name, background })
  }
  return items.length ? { items, linkable: false } : null
}
