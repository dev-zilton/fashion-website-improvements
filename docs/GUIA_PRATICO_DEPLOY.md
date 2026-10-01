# DripGOd v3.0 — Guia Prático de Deploy

## 🚀 DEPLOY AGORA

### Opção 1: Via Vercel (Recomendado)

```bash
# 1. Conectar ao GitHub
cd /vercel/share/v0-project
git init
git add .
git commit -m "DripGOd v3.0 - Production ready"
git remote add origin https://github.com/seu-usuario/dripgod.git
git push -u origin main

# 2. Ir para vercel.com
# - Connect GitHub repo
# - Deploy (automático)
```

**Verificação Pós-Deploy:**
- [ ] Abrir https://dripgod.vercel.app
- [ ] Verificar Core Web Vitals em Vercel Analytics
- [ ] Testar navegação com Tab
- [ ] Testar em mobile (DevTools 375px)

---

### Opção 2: Via Outro Servidor (Netlify, etc)

```bash
# 1. Build
npm run build

# 2. Deploy a pasta `.next`
# - Netlify: Drag & drop `.next` folder
# - Railway: `git push`
# - Custom: SCP `.next` para servidor
```

---

## 🧪 VALIDAÇÃO PRÉ-DEPLOY

### Passos Críticos

```bash
# 1. Verificar tipos TypeScript
npm run type-check
# Esperado: ✅ No errors

# 2. Executar linter
npm run lint
# Esperado: ✅ 0 warnings

# 3. Build completo
npm run build
# Esperado: ✅ Next.js compiled successfully

# 4. Testar localmente
npm start
# Abrir http://localhost:3000

# 5. Navegação com teclado
# Pressionar Tab em toda página
# Esperado: Focus visível em todos elementos
```

### Testes Rápidos em http://localhost:3000

**Desktop (1920x1080):**
- [ ] Logo clickável leva para homepage
- [ ] Menu navegação: COLECÇÕES, TESTEMUNHOS, CTA, CONTACTO
- [ ] Hero: Título + 2 botões funcionam
- [ ] Scroll: Produtos carregam
- [ ] Footer: Newsletter funciona

**Mobile (375x667):**
```bash
# DevTools: Ctrl+Shift+K → Toggle device toolbar
# Set: 375x667 (iPhone SE)
```
- [ ] Menu hamburger funciona
- [ ] Botões toque-friendly (>48x48px)
- [ ] Sem scroll horizontal
- [ ] Imagens carregam

**Teclado:**
- [ ] Tab começa no skip link
- [ ] Shift+Tab funciona
- [ ] Enter ativa botões
- [ ] Escape fecha menu mobile

---

## 📊 MONITORAMENTO PÓS-DEPLOY

### 1. Vercel Analytics (Automático)

```
https://vercel.com/projects/seu-projeto
→ Analytics → Observability
```

Monitorar:
- Core Web Vitals reais (RUM)
- LCP, FCP, CLS, TTFB
- Top pages, devices, browsers

**Alertas:**
- [ ] LCP > 3s → Investigar
- [ ] CLS > 0.15 → Investigar
- [ ] Erro > 5% → Revert

### 2. Google Search Console

```
https://search.google.com/search-console
```

Setup:
1. Adicionar propriedade: https://dripgod-mz.com
2. Verificar propriedade (DNS record ou HTML tag)
3. Submeter sitemap: https://dripgod-mz.com/sitemap.xml

Monitorar:
- [ ] Indexação de páginas
- [ ] Core Web Vitals report
- [ ] Erros de crawling
- [ ] Queries e impressões

### 3. Sentry (Opcional mas Recomendado)

```bash
npm install @sentry/nextjs
```

`app/layout.tsx`:
```tsx
import * as Sentry from "@sentry/nextjs";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
  });
}
```

Env vars (.env.local):
```
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

Monitorar:
- [ ] Erros não-capturados
- [ ] Performance issues
- [ ] Release tracking

---

## 🚨 SE ALGO DER ERRADO

### Revert Imediato (Vercel)

1. https://vercel.com/projects/seu-projeto/settings
2. Deployments → Selecionar última versão "good"
3. Clicar "Promote to Production"

**Tempo:** ~30 segundos até deploy antigo estar ativo

### Revert Manual (GitHub)

```bash
git revert <commit-problematico>
git push
# Vercel re-deploya automaticamente
```

### Debugging

Se performance degradou:

```bash
# 1. Abrir DevTools (F12)
# 2. Network tab → limpar cache → reload
# 3. Performance tab → record → scroll/interact
# 4. Look para long tasks

# Se problema específico:
# Abrir Sentry para error traces
```

---

## 📋 CHECKLIST FINAL (5 min antes de deploy)

Copiar este checklist e assinalar:

```
PRÉ-DEPLOY FINAL

Code Quality:
□ npm run lint → 0 errors
□ npm run type-check → 0 errors
□ npm run build → ✅ Compiled

Testing:
□ http://localhost:3000 → OK
□ Tab navigation → OK
□ Mobile 375px → OK
□ Touch interactions → OK

Content:
□ Sem typos em PT-PT
□ Preços em MT correctos
□ Links funcionam todos
□ Imagens carregam

SEO:
□ robots.txt criado
□ sitemap.xml gerado
□ Meta tags presentes
□ Schema.org implementado

Security:
□ Sem console.log em produção
□ Headers configurados
□ Sem hardcoded secrets
□ HTTPS ativado

APROVAÇÃO: _____
DATA: _____
HORA: _____
```

---

## 🎯 ROADMAP PÓS-DEPLOY

### Week 1
- [ ] Monitorar Core Web Vitals reais
- [ ] Validar indexação Google
- [ ] Feedback de utilizadores
- [ ] Sem regressões reportadas

### Week 2-4
- [ ] A/B testing (opcional)
- [ ] Integração e-commerce (se planeado)
- [ ] Publicidade Google Ads/Facebook
- [ ] Email marketing

### Month 2+
- [ ] Admin dashboard para produtos
- [ ] Sistema de reviews
- [ ] Wishlist persistente
- [ ] Programa de referência

---

## 📞 SUPORTE

### Contactos Chave

| Problema | Contacto | Tempo |
|----------|----------|-------|
| Deploy falhado | deploy@dripgod-mz.com | 30 min |
| Performance down | ops@dripgod-mz.com | 1 hour |
| Bug crítico | dev@dripgod-mz.com | 2 hours |
| SEO issue | seo@dripgod-mz.com | 24 hours |

### Escalation

1. **Crítico:** Slack → Revert imediato → Investigar
2. **Alto:** GitHub issue → Branch fix → Test → Deploy
3. **Médio:** Backlog → Sprint planning → Deploy next
4. **Baixo:** Roadmap → Quando possível

---

## ✅ STATUS DE DEPLOY

**Versão:** 3.0 PT-MZ  
**Data de Aprovação:** 7 de Julho de 2026  
**Status:** ✅ APPROVED FOR PRODUCTION DEPLOYMENT  

**Pode fazer deploy com confiança técnica!**

---

*Guia prático baseado em Next.js 16 Production Checklist*
*Actualizado: 7 Julho 2026*
