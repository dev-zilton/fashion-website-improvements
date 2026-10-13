import { useSyncExternalStore } from 'react'

// Fica verdadeiro pouco depois de a página acabar de abrir. Serve para descarregar as fotos
// que ainda não estão no ecrã sem competirem com o título do topo (LCP).
let loaded = false
const listeners = new Set<() => void>()

function markLoaded() {
  loaded = true
  listeners.forEach((listener) => listener())
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') setTimeout(markLoaded, 300)
  else window.addEventListener('load', () => setTimeout(markLoaded, 300), { once: true })
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function usePageLoaded() {
  return useSyncExternalStore(subscribe, () => loaded, () => false)
}
