export interface Product {
  id: string
  title: string
  price: number
  image: string
  collection: string
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Blazer Premium Negro',
    price: 4980,
    image: '/products/blazer.png',
    collection: 'PEÇAS ESSENCIAIS',
  },
  {
    id: '2',
    title: 'T-Shirt Oversized',
    price: 2480,
    image: '/products/tee.png',
    collection: 'PRIMAVERA',
  },
  {
    id: '3',
    title: 'Calça Slim Fit',
    price: 3320,
    image: '/products/pants.png',
    collection: 'PEÇAS ESSENCIAIS',
  },
  {
    id: '4',
    title: 'Jaqueta Pele Deluxe',
    price: 9980,
    image: '/products/blazer.png',
    collection: 'MAPUTO PREMIUM',
  },
  {
    id: '5',
    title: 'Calções Cargo Vintage',
    price: 2320,
    image: '/products/pants.png',
    collection: 'PRIMAVERA',
  },
  {
    id: '6',
    title: 'Casaco Lã Premium',
    price: 7480,
    image: '/products/tee.png',
    collection: 'MAPUTO PREMIUM',
  },
  {
    id: '7',
    title: 'Sapatos Edição Limitada',
    price: 5820,
    image: '/products/blazer.png',
    collection: 'EDIÇÃO LIMITADA',
  },
  {
    id: '8',
    title: 'Acessórios Ouro Moçambique',
    price: 3320,
    image: '/products/pants.png',
    collection: 'ACESSÓRIOS',
  },
]
