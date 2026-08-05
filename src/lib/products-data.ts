export interface Product {
  id: number;
  name: string;
  price: string;
  priceNumber: number;
  installments: string;
  image: string;
  backImage?: string;
  category: string;
  isCombo?: boolean;
  originalPrice?: string;
  comboItems?: { name: string; price: number }[];
}

export const mockProducts: Product[] = [
  { 
    id: 1, 
    name: "ESSENTIAL OVERSIZED", 
    price: "R$ 179,90", 
    priceNumber: 179.90, 
    installments: "12x de R$ 14,99", 
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    category: "arcane"
  },
  { 
    id: 2, 
    name: "ANGELIC BLADE", 
    price: "R$ 179,90", 
    priceNumber: 179.90, 
    installments: "12x de R$ 14,99", 
    image: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?auto=format&fit=crop&q=80&w=800",
    category: "arcane"
  },
  { 
    id: 7, 
    name: "SHADOW FABRIC", 
    price: "R$ 149,90", 
    priceNumber: 149.90, 
    installments: "12x de R$ 12,49", 
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    category: "arcane"
  },
  { 
    id: 8, 
    name: "DARK TEXTURE", 
    price: "R$ 159,90", 
    priceNumber: 159.90, 
    installments: "12x de R$ 13,32", 
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb1?auto=format&fit=crop&q=80&w=800",
    category: "arcane"
  },
  { 
    id: 3, 
    name: "GOTHIC CROSS", 
    price: "R$ 159,90", 
    priceNumber: 159.90, 
    installments: "12x de R$ 13,32", 
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    category: "oversized"
  },
  { 
    id: 4, 
    name: "FALLEN ANGEL", 
    price: "R$ 165,90", 
    priceNumber: 165.90, 
    installments: "12x de R$ 13,82", 
    image: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?auto=format&fit=crop&q=80&w=800",
    category: "oversized"
  },
  { 
    id: 9, 
    name: "OBSIDIAN OVER", 
    price: "R$ 175,90", 
    priceNumber: 175.90, 
    installments: "12x de R$ 14,65", 
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    category: "oversized"
  },
  { 
    id: 10, 
    name: "PHANTOM RELIC", 
    price: "R$ 169,90", 
    priceNumber: 169.90, 
    installments: "12x de R$ 14,15", 
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb1?auto=format&fit=crop&q=80&w=800",
    category: "oversized"
  },
  { 
    id: 5, 
    name: "ZIP-UP GOTHIC", 
    price: "R$ 289,90", 
    priceNumber: 289.90, 
    installments: "12x de R$ 24,15", 
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    category: "sweatshirts"
  },
  { 
    id: 6, 
    name: "TRIBAL BAGGY", 
    price: "R$ 219,90", 
    priceNumber: 219.90, 
    installments: "12x de R$ 18,32", 
    image: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?auto=format&fit=crop&q=80&w=800",
    category: "sweatshirts"
  },
  { 
    id: 11, 
    name: "VOID HOODIE", 
    price: "R$ 299,90", 
    priceNumber: 299.90, 
    installments: "12x de R$ 24,99", 
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    category: "sweatshirts"
  },
  { 
    id: 12, 
    name: "STATIC CARGO", 
    price: "R$ 249,90", 
    priceNumber: 249.90, 
    installments: "12x de R$ 20,82", 
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb1?auto=format&fit=crop&q=80&w=800",
    category: "sweatshirts"
  }
];