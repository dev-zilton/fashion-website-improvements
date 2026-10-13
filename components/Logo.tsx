/**
 * Logótipo DripGOd com auréola. As letras usam a cor do texto à volta (pretas no modo claro,
 * brancas no modo escuro e no rodapé invertido) e a auréola fica sempre dourada.
 * O tamanho define-se pela altura, ex.: className="h-8".
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span role="img" aria-label="DripGOd" className={`relative inline-block aspect-[1200/336] align-middle ${className}`}>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-current"
        style={{
          WebkitMaskImage: 'url(/brand/logo-letras.png)',
          maskImage: 'url(/brand/logo-letras.png)',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- camada pequena do logótipo, sempre visível */}
      <img src="/brand/logo-aureola.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full" />
    </span>
  )
}
