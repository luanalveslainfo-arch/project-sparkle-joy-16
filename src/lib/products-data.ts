export interface Product {
  id: number;
  name: string;
  price: string;
  priceNumber: number;
  installments: string;
  image: string;
  backImage?: string;
  category: string;
}

export const mockProducts: Product[] = [
  { 
    id: 1, 
    name: "COMPRESSION VEIN", 
    price: "R$ 189,90", 
    priceNumber: 189.90, 
    installments: "12x de R$ 15,82", 
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2158?q=80&w=800",
    category: "arcane"
  },
  { 
    id: 2, 
    name: "ANGELIC BLADE", 
    price: "R$ 179,90", 
    priceNumber: 179.90, 
    installments: "12x de R$ 14,99", 
    image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=800",
    category: "arcane"
  },
  { 
    id: 7, 
    name: "SHADOW FABRIC", 
    price: "R$ 149,90", 
    priceNumber: 149.90, 
    installments: "12x de R$ 12,49", 
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800",
    category: "arcane"
  },
  { 
    id: 8, 
    name: "DARK TEXTURE", 
    price: "R$ 159,90", 
    priceNumber: 159.90, 
    installments: "12x de R$ 13,32", 
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800",
    category: "arcane"
  },
  { 
    id: 3, 
    name: "GOTHIC CROSS", 
    price: "R$ 159,90", 
    priceNumber: 159.90, 
    installments: "12x de R$ 13,32", 
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800",
    category: "oversized"
  },
  { 
    id: 4, 
    name: "FALLEN ANGEL", 
    price: "R$ 165,90", 
    priceNumber: 165.90, 
    installments: "12x de R$ 13,82", 
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800",
    category: "oversized"
  },
  { 
    id: 9, 
    name: "OBSIDIAN OVER", 
    price: "R$ 175,90", 
    priceNumber: 175.90, 
    installments: "12x de R$ 14,65", 
    image: "https://images.unsplash.com/photo-1571945153237-4929e783ab4a?q=80&w=800",
    category: "oversized"
  },
  { 
    id: 10, 
    name: "PHANTOM RELIC", 
    price: "R$ 169,90", 
    priceNumber: 169.90, 
    installments: "12x de R$ 14,15", 
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800",
    category: "oversized"
  },
  { 
    id: 5, 
    name: "ZIP-UP GOTHIC", 
    price: "R$ 289,90", 
    priceNumber: 289.90, 
    installments: "12x de R$ 24,15", 
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800",
    category: "sweatshirts"
  },
  { 
    id: 6, 
    name: "TRIBAL BAGGY", 
    price: "R$ 219,90", 
    priceNumber: 219.90, 
    installments: "12x de R$ 18,32", 
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800",
    category: "sweatshirts"
  },
  { 
    id: 11, 
    name: "VOID HOODIE", 
    price: "R$ 299,90", 
    priceNumber: 299.90, 
    installments: "12x de R$ 24,99", 
    image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=800",
    category: "sweatshirts"
  },
  { 
    id: 12, 
    name: "STATIC CARGO", 
    price: "R$ 249,90", 
    priceNumber: 249.90, 
    installments: "12x de R$ 20,82", 
    image: "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?q=80&w=800",
    category: "sweatshirts"
  }
];
