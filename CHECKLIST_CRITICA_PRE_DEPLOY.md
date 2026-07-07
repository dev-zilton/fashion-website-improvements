# Checklist Crítica de Pré-Deploy - DripGOd v3.0

## Status: REVISÃO DE ROBUSTEZ EM PROGRESSO

Identificados **6 pontos críticos** que precisam correcção antes de considerarmos o site "100% production-ready".

---

## 🚨 Problemas Críticos Encontrados

### 1. IDs com Acentos (CRÍTICO)
**Problema:** URLs com `#colec%C3%B5es` causam erros em `querySelector`

```
❌ Actual: href="/coleccoes" (URL OK, mas sem ID hash correspondente)
⚠️ Issue: Menu links apontam para `/coleccoes` mas faltam IDs nas sections
```

**Impacto:** Navegação por âncora quebra em alguns browsers. Links como `#colecções` não funcionam correctamente.

**Solução:**
- Renomear todos os IDs para ASCII simples: `colecoes`, `novidades`, `sobre`, `contacto`
- Usar `CSS.escape()` para qualquer dinamismo com IDs
- Validar todos os links de navegação

---

### 2. Navegação por Âncoras Inconsistente
**Problema:** Menu aponta para URLs (`/coleccoes`) mas não há seções com IDs correspondentes

```tsx
// ❌ Problema
navItems.map((item) => (
  <Link href={`/#${item.toLowerCase()}`}>  // Tenta #coleccoes
    {item}
  </Link>
))

// ⚠️ Mas não existe <section id="coleccoes">
```

**Solução:**
- Adicionar seções com IDs nas páginas
- Usar formato consistente: `id="coleccoes"` (sem acentos)
- Testar navegação com teclado e browser real

---

### 3. Componentes Client-Side Desnecessários
**Problema:** Muitos componentes que poderiam ser estáticos ou SSR estão como `'use client'`

```tsx
// ❌ ProductCard tem 'use client' mas pode ser estático
// ✅ Apenas componentes com interação devem ter 'use client'
```

**Impacto:** 
- Mais JavaScript enviado ao browser
- Pior performance em dispositivos fracos
- Mais dificuldade em manutenção

**Solução:**
- Auditar todos os `'use client'` e remover se possível
- Mover estado para RSC quando viável
- Usar `useCallback` e `memo` correctamente

---

### 4. Semântica HTML Incompleta
**Problema:** Faltam atributos semânticos importantes

```tsx
// ❌ Faltam role, aria-label em elementos críticos
<button onClick={toggleMenu}>
  {isOpen ? <X size={20} /> : <Menu size={20} />}
</button>

// ✅ Correcto
<button
  onClick={toggleMenu}
  aria-label="Abrir menu"
  aria-expanded={isOpen}
>
```

**Solução:**
- Adicionar `aria-expanded` em menus
- Usar `role="navigation"` em navs
- Adicionar `aria-label` onde necessário

---

### 5. Imagens e Fontes sem Optimização Completa
**Problema:** Preload ausente, formatos não-modernos

```tsx
// ❌ Sem preload
<link href="https://fonts.googleapis.com/..." rel="stylesheet" />

// ✅ Com preload
<link rel="preload" as="font" href="..." crossOrigin="anonymous" />
```

**Impacto:** Regressões em LCP/CLS em produção real

**Solução:**
- Adicionar `preload` para fontes críticas
- Usar `next/image` com `priority` para hero
- Converter imagens para WebP com fallback

---

### 6. Falta de Observabilidade
**Problema:** Sem logs, monitorização ou error tracking

```tsx
// ❌ Nenhum tracking de erros
// ❌ Nenhum log de navegação
// ❌ Nenhum Web Vitals real
```

**Impacto:** Impossível saber se há problemas em produção

**Solução:**
- Adicionar Sentry para error tracking
- Implementar Web Vitals tracking
- Adicionar logs estruturados

---

## ✅ Plano de Correcção

### Fase 1: Correcções Críticas (HOJE)
1. Renomear IDs: `coleccoes`, `novidades`, `sobre`, `contacto`
2. Adicionar seções com IDs no page.tsx
3. Testar navegação com teclado
4. Validar menu links
5. Adicionar aria-expanded em menus

### Fase 2: Optimizações (HOJE)
1. Remover `'use client'` desnecessários
2. Adicionar `preload` para fontes
3. Adicionar `priority` para hero image
4. Validar semântica HTML completa

### Fase 3: Observabilidade (HOJE)
1. Implementar erro handling básico
2. Adicionar console de debug
3. Criar health check endpoint

### Fase 4: Validação Final (HOJE)
1. Lighthouse audit completo
2. Teste de acessibilidade com teclado
3. Teste em mobile lento (3G)
4. Teste sem JavaScript
5. Build de produção local

---

## 📋 Checklist de Validação

### Navegação
- [ ] Todos os IDs em ASCII simples
- [ ] Links de menu funcionam com teclado
- [ ] Skip link funciona
- [ ] Sem erros de querySelector
- [ ] Mobile menu abre/fecha correctamente

### Acessibilidade
- [ ] aria-expanded em menus
- [ ] aria-label em botões sem texto
- [ ] Contraste validado
- [ ] Navegação completa com teclado
- [ ] Leitor de ecrã testado

### Performance
- [ ] Preload de fontes críticas
- [ ] Priority de hero image
- [ ] Sem render blocking
- [ ] Code splitting validado
- [ ] Build produção <1MB

### Segurança
- [ ] Sem eval() ou dynamic scripts
- [ ] CSP headers configurados
- [ ] Inputs sanitizados
- [ ] HTTPS forced
- [ ] Sem dados sensíveis expostos

### Observabilidade
- [ ] Error tracking ativo
- [ ] Web Vitals tracking
- [ ] Logs estruturados
- [ ] Health check endpoint
- [ ] Sentry integrado

---

## 🚀 Validação Final Antes de Deploy

```bash
# 1. Build de produção
pnpm build

# 2. Teste local
pnpm start

# 3. Verificar erros
# - Abrir DevTools Console
# - Carregar página
# - Verificar sem erros

# 4. Validar selectors
# F12 > Console:
# document.querySelector('#coleccoes')  // Deve retornar elemento

# 5. Teste de navegação
# - Click em "COLECÇÕES" no menu
# - Scroll automático para section
# - Nenhum erro no console

# 6. Teste sem JavaScript
# - Desabilitar JS no DevTools
# - Página ainda funciona?
# - Links funcionam?

# 7. Lighthouse final
npx lighthouse http://localhost:3000
```

---

## 📊 Resultado Esperado Após Correcções

| Critério | Antes | Depois |
|----------|-------|--------|
| Performance | 90-100 | 95-100 |
| Accessibility | 95-100 | 100 |
| Best Practices | 95-100 | 100 |
| SEO | 100 | 100 |
| Robustez | ⚠️ 70% | ✅ 100% |
| Manutenibilidade | ⚠️ 75% | ✅ 95% |

---

## 🎯 Minha Recomendação

O projecto está **muito forte visualmente e em métricas**, mas ainda precisa dessa camada de "produção de verdade":
- Nomes consistentes e previsíveis
- Menos fragilidade nos seletores
- Melhor separação server/client
- Validação em cenários reais

É esse último 10% que **evita bugs chatos após deploy** e torna o site realmente robusto.

---

Status: PRONTO PARA IMPLEMENTAR CORRECÇÕES
Data: 7 de Julho de 2026
Próximo Passo: Implementar Fase 1 (Correcções Críticas)

