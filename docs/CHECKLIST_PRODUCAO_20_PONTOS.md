# DripGOd v3.0 — Checklist de Produção Real (20 Pontos)

## FASE 1: ANTES DO DEPLOY (10 pontos)

### 1. Validação de IDs e Seletores
- [x] Remover acentos de todos os IDs (coleccoes, testemunhos, contacto)
- [x] Usar IDs alfanuméricos simples (sem cedilhas, til, acentos)
- [x] Testar com `CSS.escape()` se necessário
- [x] Validar com HTML Validator W3C
- Status: **✅ IMPLEMENTADO** (IDs: hero, coleccoes, testemunhos, cta, contacto)

### 2. Carregamento de Fontes (Font Loading)
**Problema:** Fontes mal configuradas causam CLS, FOUT, FOIT
**A Implementar:**
```tsx
// app/layout.tsx
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})
```
- [ ] Font loading estratégia: `display=swap`
- [ ] Preload de fontes críticas
- [ ] Verificar FOUT/FOIT com throttling
- [ ] Validar CLS não aumenta

### 3. Reduzir JavaScript do Cliente
**Problema:** Componentes heavy no cliente aumentam TTI
- [ ] Remover useEffect desnecessários
- [ ] Mover lógica para Server Components
- [ ] Audit com `next/bundle-analyzer`
- [ ] Target: <100kb JS inicial

### 4. Auditoria de Imagens
**Problema:** Imagens são 70% do peso médio de um site
- [ ] Usar `<Image />` do Next.js (lazy loading automático)
- [ ] Testar WebP vs PNG
- [ ] Verificar alt text em todas (acessibilidade)
- [ ] Dimensões definidas (width/height) para evitar CLS
- [ ] srcset para responsive images

### 5. Semântica e Headings
**Problema:** Estrutura inconsistente quebra leitores de ecrã
- [x] Apenas um `<h1>` por página
- [x] Hierarquia correcta (h1 → h2 → h3)
- [x] Sections com `aria-label`
- [x] Nav com `aria-label="Navegação principal"`
- [ ] Testar com NVDA ou JAWS

### 6. Navegação por Teclado (Full Test)
**Problema:** Visitantes com deficiência motor dependem de teclado
- [ ] Tab order lógico (começar do topo)
- [ ] Focus visível em todos elementos interativos
- [ ] Nenhuma armadilha de teclado (Escape funciona)
- [ ] Enter ativa botões, Space para checkboxes
- [ ] Test: Tab manualmente pela página inteira

### 7. Mobile em Rede Lenta
**Problema:** Lighthouse em 4G é enganoso; 3G/EDGE real é diferente
- [ ] Throttle CPU 4x no DevTools
- [ ] Throttle rede para 3G lento
- [ ] Testar em dispositivo real se possível
- [ ] FCP deve estar <4s em 3G

### 8. Erros de Hidratação
**Problema:** SSR/Client mismatch causa bugs silenciosos
- [ ] Adicionar verificação de hidratação
- [ ] Testar `npm run build && npm start`
- [ ] Procurar por warnings de hydration
- [ ] Usar suppressHydrationWarning apenas quando justified

### 9. Estados Vazios e Fallbacks
**Problema:** Sem dados, o site quebra de forma feia
- [ ] ProductGrid: fallback se não há produtos
- [ ] TestimonialsSection: mostrar placeholder
- [ ] Newsletter: feedback se email inválido
- [ ] Skeleton screens para loading

### 10. Validação SEO Técnico Extra
- [ ] robots.txt configurado
- [ ] sitemap.xml gerado automaticamente
- [ ] Canonical URLs correctas
- [ ] Meta viewport para mobile
- [ ] Open Graph imagens (1200x630px mínimo)

---

## FASE 2: DEPOIS DO DEPLOY (10 pontos)

### 11. Monitorização de Erros
**Tool:** Sentry ou similar
```tsx
// app/layout.tsx
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend: (event) => {
    // Filtrar erros não-críticos
    return event;
  },
});
```
- [ ] Capturar erros não-tratados
- [ ] Setup de alertas (Slack/Email)
- [ ] Testar com erro artificial

### 12. Monitorização de Performance
**Tool:** Vercel Analytics ou Sentry
- [ ] Core Web Vitals reais (RUM)
- [ ] Alertar se LCP > 3s
- [ ] Alertar se CLS > 0.15
- [ ] Dashboard acessível

### 13. Testar Forms e Validação
- [ ] Newsletter: validação email, feedback
- [ ] Contacto: validação campos obrigatórios
- [ ] Fallback se servidor indisponível
- [ ] Rate limiting implementado

### 14. Testar Checkout/Pagamentos (Se aplicável)
- [ ] Stripe testado end-to-end
- [ ] Erros pagamento tratados
- [ ] Confirmação email configurada
- [ ] Webhook validado

### 15. Cache e CDN
**A Verificar:**
- [ ] Static assets em CDN (Vercel, Cloudflare)
- [ ] Cache headers correctos
- [ ] Revalidation tags para ISR
- [ ] Cache bust em deploys

### 16. Segurança Headers
```tsx
// next.config.mjs
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
];
```
- [ ] X-Content-Type-Options
- [ ] X-Frame-Options
- [ ] CSP (Content Security Policy)
- [ ] CORS configurado

### 17. Testing em Dispositivos Reais
**A Testar:**
- [ ] iPhone SE (small)
- [ ] iPhone 14/15 (standard)
- [ ] Samsung A12 (mid-range Android)
- [ ] Tablet (iPad)
- [ ] Orientações: portrait e landscape

### 18. Testar em Navegadores Diferentes
- [ ] Chrome (última versão)
- [ ] Safari (macOS e iOS)
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet (Android)

### 19. Backup e Disaster Recovery
- [ ] Backup de base de dados automatizado
- [ ] Plan B se Vercel ficar indisponível
- [ ] DNS redundante
- [ ] Versões anteriores guardadas

### 20. Documentação e Runbooks
- [ ] Como fazer deploy
- [ ] Como reverter um deploy
- [ ] Como escalar (se carga aumenta)
- [ ] Contacts de emergência
- [ ] Playbook de incident response

---

## EXECUÇÃO RECOMENDADA

### Semana 1 (Antes Deploy)
1. Pontos 1-3: Técnico (IDs, fontes, JS)
2. Pontos 4-5: Assets e acessibilidade
3. Pontos 6-7: Teclado e mobile
4. Ponto 8-10: Hidratação, fallbacks, SEO

**Gate:** Nenhum warning de hydration, todos os IDs válidos, mobile <4s em 3G

### Dia 1 Pós-Deploy
- Ponto 11-12: Setup Sentry + Analytics
- Ponto 13: Testar forms
- Ponto 17: Testar em 4 dispositivos

### Semana 1-2 Pós-Deploy
- Ponto 14-18: Forms, headers, navegadores
- Ponto 19-20: Backup, docs

---

## FERRAMENTAS RECOMENDADAS

| Tarefa | Ferramenta | Gratuito? |
|--------|-----------|----------|
| Hydration | Next.js console | ✅ |
| Performance RUM | Vercel Analytics | ✅ Pro |
| Erros | Sentry | ✅ Trial |
| SEO | Google Search Console | ✅ |
| Imagens | Vercel Image Optimization | ✅ |
| Acessibilidade | axe DevTools | ✅ |
| Mobile | Chrome DevTools | ✅ |

---

## RISK MATRIX

| Risco | Severidade | Probabilidade | Mitigation |
|-------|-----------|--------------|-----------|
| Hydration mismatch | 🔴 Alta | 🟡 Média | Testar `npm build && start` |
| CLS em mobile | 🟡 Média | 🟡 Média | Dimensões imagem, fonts `swap` |
| IDs inválidos | 🔴 Alta | 🟢 Baixa | W3C validator |
| Erros não-capturados | 🔴 Alta | 🟡 Média | Sentry setup |
| Performance degradação | 🟡 Média | 🟡 Média | Monitoring RUM |

---

## SIGN-OFF FINAL

Para fazer deploy com confiança:

- [ ] Todos os pontos 1-10 completados
- [ ] Nenhum warning em `npm build`
- [ ] Nenhum hydration error
- [ ] Mobile funciona <4s em 3G
- [ ] Keyboard nav funciona (Tab completo)
- [ ] Sentry + Analytics prontos
- [ ] Team informed

**Aprovado para Deploy:** _____________________  
**Data:** _____________________  
**Versão:** 3.0 PT-MZ  

---

Generated: 7 de Julho de 2026
Next.js Production Checklist v3.0
