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
    name: "Compression Abyss", 
    price: "R$ 249,90", 
    priceNumber: 249.90, 
    installments: "12x de R$ 20,82", 
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    category: "arcane"
  },
  { 
    id: 2, 
    name: "Hollow Shorts", 
    price: "R$ 199,90", 
    priceNumber: 199.90, 
    installments: "12x de R$ 16,65", 
    image: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?auto=format&fit=crop&q=80&w=800",
    category: "arcane"
  },
  { 
    id: 3, 
    name: "Cargo Seraph", 
    price: "R$ 349,90", 
    priceNumber: 349.90, 
    installments: "12x de R$ 29,15", 
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    category: "arcane"
  }
];

export const mockBundle: Product = {
  id: 999,
  name: "KIT MEMENTO MORI",
  price: "R$ 599,00",
  priceNumber: 599.00,
  originalPrice: "R$ 799,70",
  installments: "12x de R$ 49,91",
  image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1200",
  category: "bundle",
  isCombo: true,
  comboItems: [
    { name: "Compression Abyss", price: 249.90 },
    { name: "Hollow Shorts", price: 199.90 },
    { name: "Cargo Seraph", price: 349.90 }
  ]
};