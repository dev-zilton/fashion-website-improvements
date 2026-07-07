# DripGOd - Índice de Documentação

## 📚 Documentação Completa do Projecto

---

## 🎯 Comece Aqui

1. **[README.md](./README.md)** - Setup inicial e visão geral
2. **[QUICK_START.md](./QUICK_START.md)** - Guia rápido para começar

---

## 📖 Documentação por Tema

### Adaptação PT-Portugal + Moçambique
| Ficheiro | Descrição |
|----------|-----------|
| [ADAPTACAO_PT_MZ.md](./ADAPTACAO_PT_MZ.md) | Documentação técnica completa da adaptação |
| [RESUMO_MODIFICACOES_PT_MZ.md](./RESUMO_MODIFICACOES_PT_MZ.md) | Resumo executivo de todas as mudanças |
| [CHECKLIST_FINAL_PT_MZ.md](./CHECKLIST_FINAL_PT_MZ.md) | Checklist de validação com 10 secções |
| [DEPLOYMENT_GUIDE_PT_MZ.md](./DEPLOYMENT_GUIDE_PT_MZ.md) | Guia completo de deployment para produção |

### Projecto Original
| Ficheiro | Descrição |
|----------|-----------|
| [README.md](./README.md) | Setup e overview do projecto |
| [AUDIT_CHECKLIST.md](./AUDIT_CHECKLIST.md) | Auditoria técnica completa |
| [IMPROVEMENTS_IMPLEMENTED.md](./IMPROVEMENTS_IMPLEMENTED.md) | Detalhes de cada melhoria implementada |
| [RETIFICACOES_COMPLETAS.md](./RETIFICACOES_COMPLETAS.md) | Status completo de tudo |
| [QUICK_START.md](./QUICK_START.md) | Guia rápido para rodar localmente |

---

## 🌍 Versões do DripGOd

### v1.0 - Original
- ✅ Landing page premium
- ✅ Product grid 8 itens
- ✅ Hero com crossfade
- ✅ Animações suaves
- ✅ Responsividade completa

### v2.0 - Retificações
- ✅ Menu mobile animado
- ✅ Focus states visíveis
- ✅ Prefers-reduced-motion
- ✅ Parallax sutil
- ✅ Toast notifications
- ✅ Interações ricas
- ✅ IntersectionObserver
- ✅ Will-change otimizado
- ✅ Preload de imagens

### v3.0 - PT-Portugal + Moçambique (ACTUAL)
- ✅ Tradução PT-PT completa
- ✅ Contexto moçambicano (nomes, referências)
- ✅ Moeda Metical (MT)
- ✅ Animações de produto aprimoradas (3 transições)
- ✅ SEO em PT-MZ
- ✅ Metadados localizados

---

## 📋 Mudanças Principais PT-MZ

### Linguagem
```
COLEÇÕES → COLECÇÕES
CONTATO → CONTACTO
você → si
Inscrever → Subscrever
Conheça mais → Saber mais
```

### Contexto
```
Marina Silva → Marina Nhantumbo
Carlos Santos → Carlos Mateus
Brasil → Moçambique
```

### Moeda
```
$299 → 4.980 MT
$149 → 2.480 MT
$199 → 3.320 MT
etc...
```

### Animações
```
Scale: 1 → 1.05
TranslateY: 0 → -8px
Opacity: 1 → 0.95
Duration: 500ms
```

---

## 🔧 Componentes Principais

### Structure
```
app/
├── page.tsx          # Landing page principal
└── layout.tsx        # Layout root + metadados

components/
├── Header.tsx        # Navegação (PT-PT)
├── Hero.tsx          # Hero section + crossfade
├── ProductCard.tsx   # Card de produto (animações 3D)
├── ProductGrid.tsx   # Grid de 8 produtos
├── FeaturesSection.tsx
├── TestimonialsSection.tsx
├── CTASection.tsx
├── Footer.tsx
├── Toast.tsx
└── ...

hooks/
├── useMotionPreference.ts
├── useToast.ts
└── ...
```

---

## 🚀 Deployment

Para fazer deploy:
1. Ler: [DEPLOYMENT_GUIDE_PT_MZ.md](./DEPLOYMENT_GUIDE_PT_MZ.md)
2. Executar: `pnpm build`
3. Testar: `pnpm start`
4. Deploy via Vercel ou servidor próprio

---

## ✅ Checklist Pré-Deployment

Antes de deplorar, verificar:
- [ ] Ler [CHECKLIST_FINAL_PT_MZ.md](./CHECKLIST_FINAL_PT_MZ.md)
- [ ] Todos os testes passam
- [ ] Build sem erros
- [ ] Performance OK (Lighthouse > 90)
- [ ] SEO verificado
- [ ] Segurança validada

---

## 📊 Ficheiros de Referência Rápida

| Para... | Ler... |
|---------|--------|
| Saber como rodar localmente | [QUICK_START.md](./QUICK_START.md) |
| Entender as mudanças PT-PT | [ADAPTACAO_PT_MZ.md](./ADAPTACAO_PT_MZ.md) |
| Ver resumo executivo | [RESUMO_MODIFICACOES_PT_MZ.md](./RESUMO_MODIFICACOES_PT_MZ.md) |
| Validar tudo está correto | [CHECKLIST_FINAL_PT_MZ.md](./CHECKLIST_FINAL_PT_MZ.md) |
| Fazer deployment | [DEPLOYMENT_GUIDE_PT_MZ.md](./DEPLOYMENT_GUIDE_PT_MZ.md) |
| Auditar segurança | [AUDIT_CHECKLIST.md](./AUDIT_CHECKLIST.md) |
| Entender animações | [IMPROVEMENTS_IMPLEMENTED.md](./IMPROVEMENTS_IMPLEMENTED.md) |

---

## 🎨 Stack Técnico

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Animações:** Framer Motion
- **Componentes:** shadcn/ui
- **UI Icons:** Lucide React
- **Tipos:** TypeScript
- **Deploy:** Vercel (recomendado)

---

## 🌐 Localização

- **Idioma:** Português de Portugal (PT-PT)
- **Contexto:** Moçambique
- **Localidade:** Maputo (referência)
- **Moeda:** Metical (MT)
- **Locale:** pt_MZ

---

## 📞 Suporte

Para dúvidas sobre:
- **Setup:** Ver [QUICK_START.md](./QUICK_START.md)
- **Mudanças PT-MZ:** Ver [ADAPTACAO_PT_MZ.md](./ADAPTACAO_PT_MZ.md)
- **Deployment:** Ver [DEPLOYMENT_GUIDE_PT_MZ.md](./DEPLOYMENT_GUIDE_PT_MZ.md)
- **Validação:** Ver [CHECKLIST_FINAL_PT_MZ.md](./CHECKLIST_FINAL_PT_MZ.md)

---

## 📅 Histórico de Versões

| Versão | Data | Mudança Principal |
|--------|------|-------------------|
| v1.0 | Jun 2026 | Launch inicial |
| v2.0 | Jul 2026 | Retificações + melhorias |
| v3.0 | Jul 2026 | PT-Portugal + Moçambique |

---

## 🏁 Status Final

```
Status:     🟢 PRODUCTION READY
Versão:     3.0 (PT-Portugal + Moçambique)
Data:       7 de Julho de 2026
Linguagem:  Português de Portugal
Contexto:   Moçambique/Maputo
Moeda:      Metical (MT)
```

---

**Última Actualização:** 7 de Julho de 2026  
**Mantido por:** V0 AI Assistant
