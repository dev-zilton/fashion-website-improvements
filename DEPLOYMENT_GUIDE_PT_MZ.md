# DripGOd v3.0 - Guia de Deployment para Moçambique

## 🚀 Pronto para Produção

O site DripGOd está totalmente traduzido para **Português de Portugal**, localizado para **Moçambique**, e com preços em **Metical (MT)**.

---

## Opção 1: Deploy via Vercel (Recomendado)

### Passo 1: Preparar o Repositório
```bash
# Confirme que todas as mudanças foram commitidas
git status
git add .
git commit -m "feat: DripGOd v3.0 - PT-PT localization + Mozambique context + MT currency"
```

### Passo 2: Push para GitHub/GitLab
```bash
git push origin main
```

### Passo 3: Deploy via Vercel
1. Abra https://vercel.com/dashboard
2. Clique em "New Project"
3. Selecione o repositório do DripGOd
4. Configure as variáveis de ambiente (se necessário)
5. Clique em "Deploy"

### Passo 4: Configurar Domínio
```
Opção A: Usar domínio .mz moçambicano
  - dripgod.co.mz
  - moda.dripgod.mz

Opção B: Usar domínio internacional com subdomain MZ
  - mz.dripgod.com
  - mozambique.dripgod.com
```

---

## Opção 2: Deploy Manual (Self-hosted)

### Pré-requisitos
- Node.js 18+ instalado
- NPM/PNPM instalado
- Acesso a servidor de produção

### Build para Produção
```bash
# Instale dependências
pnpm install

# Build otimizado
pnpm build

# Teste o build localmente
pnpm start
```

### Deploy em Servidor
```bash
# Via Docker (recomendado)
docker build -t dripgod-mz .
docker run -p 3000:3000 dripgod-mz

# Via PM2 (Node.js)
npm install -g pm2
pm2 start "pnpm start" --name "dripgod-mz"
pm2 save
pm2 startup
```

---

## Configuração Pós-Deploy

### 1. Configurar DNS
```
Registos DNS necessários:
- A Record: @ → IP do servidor
- A Record: www → IP do servidor
- MX Records: Para email (se aplicável)
- CNAME: cdn → CDN provider (se usado)
```

### 2. Configurar HTTPS/SSL
```bash
# Via Let's Encrypt (grátis)
certbot certonly --webroot -w /var/www/dripgod -d dripgod.co.mz

# Configurar no servidor nginx/apache
# (Certificado auto-renova automaticamente)
```

### 3. Variáveis de Ambiente
```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://dripgod.co.mz
NEXT_PUBLIC_ANALYTICS=true
```

### 4. Configurar CDN (Opcional)
```
Recomendações:
- Cloudflare (DDoS protection + caching)
- AWS CloudFront
- Vercel Edge Network (automático se usar Vercel)
```

---

## Testes Pré-Deployment

### 1. Validação de Funcionalidades
```bash
# Teste todos os links PT-PT
- Verificar COLECÇÕES, NOVIDADES, SOBRE, CONTACTO
- Verificar carrinho funciona
- Verificar newsletter subscrição

# Teste preços em MT
- Verificar formato "XXXX MT"
- Verificar todos os 8 produtos têm preço
- Verificar moeda aparece em Product Cards
```

### 2. Validação de Performance
```bash
# Via Lighthouse
- Performance > 90
- Accessibility > 95
- Best Practices > 90
- SEO > 95

# Via GTmetrix
- Fully Loaded Time < 3s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
```

### 3. Validação de Segurança
```bash
# Verificar headers de segurança
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

# Verificar SSL/TLS
- Grade A+ em SSL Labs
- HSTS enabled
- Certificado válido
```

### 4. Validação de SEO
```bash
# Verificar meta tags
- title: "DripGOd - Moda Premium de Moçambique"
- description presente
- og:image configurado
- og:locale: pt_MZ

# Verificar estrutura
- Headings hierárquicos
- Alt text em imagens
- Semantic HTML
- Mobile-friendly
```

---

## Monitoring Pós-Deploy

### 1. Uptime Monitoring
```bash
# Ferramentas recomendadas:
- UptimeRobot (grátis)
- Pingdom
- StatusCake

# Configurar alertas para:
- Site down
- Resposta lenta (> 5s)
- SSL certificate expira em 30 dias
```

### 2. Error Tracking
```bash
# Integrar Sentry
npm install --save @sentry/nextjs

# Configurar variáveis
SENTRY_AUTH_TOKEN=xxx
NEXT_PUBLIC_SENTRY_DSN=xxx
```

### 3. Analytics
```bash
# Google Analytics (já integrado)
- Verificar eventos estão sendo rastreados
- Configurar goals de conversão
- Monitorar tráfego de Moçambique

# Alternativas:
- Plausible Analytics
- Fathom Analytics
```

### 4. Performance Monitoring
```bash
# Web Vitals
- Monitorar Core Web Vitals
- Alertas se LCP > 2.5s
- Alertas se INP > 200ms
- Alertas se CLS > 0.1
```

---

## Checklist Pré-Deployment

- [ ] Todas as mudanças PT-PT implementadas
- [ ] Preços em Metical (MT)
- [ ] Nomes moçambicanos corretos
- [ ] Animações funcionam
- [ ] Build passa sem erros: `pnpm build`
- [ ] Testes locais OK: `pnpm dev`
- [ ] Lighthouse score > 90
- [ ] SSL/HTTPS configurado
- [ ] DNS resolvido
- [ ] Variáveis de ambiente configuradas
- [ ] Backup de BD (se aplicável)
- [ ] Plano de rollback preparado

---

## Após o Deployment

### Comunicação
1. Notificar stakeholders
2. Anunciar nas redes sociais (Instagram, Facebook, TikTok)
3. Email para clientes existentes
4. Press release para media moçambicana

### Monitoramento Primeiras 48h
- Monitorar erros em tempo real
- Verificar performance do site
- Responder a feedback dos utilizadores
- Preparar hotfixes se necessário

---

## Rollback (Se Necessário)

```bash
# Via Vercel
1. Dashboard → Deployments
2. Encontrar deployment anterior
3. Clique em "..." → Promote to Production

# Via Git
git revert <commit-id>
git push origin main
# Vercel redeploy automaticamente
```

---

## Suporte Contínuo

### Atualizações Regulares
- [ ] Atualizar dependências (pnpm update)
- [ ] Verificar patches de segurança
- [ ] Testar em navegadores modernos
- [ ] Validar certificado SSL (30 dias antes de expirar)

### Manutenção
- [ ] Limpar cache CDN se necessário
- [ ] Moniterar espaço em disco
- [ ] Backup de dados regularmente
- [ ] Revisar logs de erro

---

## Contactos Importantes

```
Suporte Técnico Vercel: support@vercel.com
Suporte Técnico DripGOd: tech@dripgod.mz (configurar)
DNS Provider: [seu provider]
CDN Provider: [seu provider]
```

---

## Próximos Passos após Deployment

1. **Semana 1:** Monitorar performance e feedback
2. **Semana 2:** Coletar analytics e fazer pequenas otimizações
3. **Mês 1:** Análise completa de UX e performance
4. **Mês 2:** Implementar melhorias identificadas
5. **Trimestral:** Revisão estratégica e planeamento

---

**Status:** 🟢 PRONTO PARA DEPLOYMENT

**Versão:** DripGOd v3.0 (PT-Portugal + Moçambique)  
**Data:** 7 de Julho de 2026  
**Linguagem:** Português de Portugal  
**Moeda:** Metical (MT)  
**Contexto:** Moçambique/Maputo
