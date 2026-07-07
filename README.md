# DripGOd - Premium Fashion E-commerce

Um site de moda premium construído com Next.js 16, React 19, Framer Motion e Tailwind CSS, seguindo as especificações de transições suaves, microinterações e design editorial.

## 🎨 Design System

### Cores
- **Primário**: Preto (#000000) - Elegância e luxo
- **Secundário**: Bege Quente (#f5f1ed) - Sofisticação
- **Acentos**: Ouro (#d4af37) - Premium
- **Neutros**: Cinzas e Brancos - Hierarquia visual

### Tipografia
- **Headings**: Playfair Display (serif elegante)
- **Body**: Inter (sans-serif moderna)
- Letter spacing generoso para estilo editorial

### Animações
- **Duração padrão**: 320ms para entradas, 240ms para saídas
- **Easing**: cubic-bezier(0.22, 1, 0.36, 1) para transições suaves
- **Respeita**: prefers-reduced-motion para acessibilidade

## 🚀 Funcionalidades

### Header
- Logo com marca DripGOd
- Navegação desktop responsiva
- Menu mobile com transições suaves
- Carrinho com indicador de quantidade

### Hero Section
- Crossfade automático entre 3 coleções (8s cada)
- Manchete com fonte serif grande
- Indicadores de coleção clicáveis
- Animação de scroll contínua

### Features Section
- 3 diferenciais principais (Qualidade, Segurança, Envio)
- Cards com hover effect
- Ícones animados
- Scroll reveal

### Product Grid
- 8 produtos premium
- Cards com imagens de produtos reais
- Hover com zoom de imagem (1.05x)
- Botão "Quick Add" com transição suave
- Botão Wishlist com toggle
- Staggered reveal animation (60ms entre items)

### Testimonials Section
- Carrossel de depoimentos
- Animações de fade entre slides
- Indicadores clicáveis
- Avaliação com estrelas

### CTA Section
- Seção final com call-to-action
- Dois botões (primário e secundário)
- Scroll reveal animation

### Footer
- Newsletter signup
- Links organizados em 4 categorias
- Social links
- Informações de pagamento
- Copyright dinâmico

## 📁 Estrutura do Projeto

```
app/
├── layout.tsx           # Layout raiz com fonts
├── globals.css          # Tema de cores e animações globais
└── page.tsx             # Homepage com todas as seções

components/
├── Header.tsx           # Navegação e logo
├── Hero.tsx             # Hero com crossfade
├── FeaturesSection.tsx  # Diferenciais
├── ProductCard.tsx      # Card individual de produto
├── ProductGrid.tsx      # Grid de 8 produtos
├── TestimonialsSection.tsx # Carrossel de depoimentos
├── CTASection.tsx       # Call-to-action final
├── Footer.tsx           # Rodapé
├── ScrollReveal.tsx     # Componente de scroll reveal reutilizável
└── RouteTransition.tsx  # Wrapper de transição de rotas

hooks/
└── useScrollReveal.ts   # Hook de Intersection Observer

public/
└── products/            # Imagens de produtos
```

## 🎬 Animações Implementadas

### Route Transitions
- Fade in/out com translateY (320ms)
- AnimatePresence para transições entre páginas

### Scroll Reveals
- Fade + translateY ao entrar na viewport
- Delay de 60ms entre items
- Uma só vez (unobserve após animação)

### Product Cards
- Image zoom on hover (1.05x)
- Scale + opacity
- Button slide in
- Staggered grid animation

### Hero
- Crossfade de backgrounds (1s)
- Floating scroll indicator
- Headline fade-in-up sequencial

### Features
- Card hover with translateY (-8px)
- Icon scale on hover
- Scroll reveal

## 🛠️ Tecnologias

- **Next.js 16** (App Router)
- **React 19** (com hooks)
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (animações)
- **Lucide React** (ícones)
- **Vercel Analytics**

## 💻 Como Rodar Localmente

```bash
# Instalar dependências
pnpm install

# Rodar dev server
pnpm dev

# Abrir em http://localhost:3000
```

## 🚀 Deploy

```bash
# Build para produção
pnpm build

# Testar build localmente
pnpm start
```

Publique no Vercel:
```bash
vercel
```

## 📱 Responsividade

- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Hero texto adapta de 5xl mobile para 8xl desktop
- Grid muda de 1 coluna → 2 → 4 colunas

## ♿ Acessibilidade

- ARIA labels em botões e links
- Focus states visíveis
- Respeita `prefers-reduced-motion`
- Semântica HTML5
- Contraste de cores adequado

## 📊 Performance

- Images otimizadas
- CSS crítico inline
- Lazy loading de componentes
- Transform/opacity for animations (GPU accelerated)

## 📝 Customizações Futuras

- Integração com Stripe para pagamento
- Backend de gerenciamento de produtos
- Sistema de autenticação
- Carrinho persistente
- Página de detalhes do produto
- Filtros e busca avançada
- Admin dashboard

---

**Desenvolvido com ❤️ para DripGOd**
