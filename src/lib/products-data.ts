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
  subtitle?: string;
  colorLabel?: string;
}

export const mockProducts: Product[] = [
  { 
    id: 1, 
    name: "UNDEFINED", 
    subtitle: "Forged through pain.",
    price: "R$ 179,90", 
    priceNumber: 179.90, 
    installments: "12x de R$ 14,99", 
    image: "/images/products/crimson_front.png",
    backImage: "/images/products/crimson_back.png",
    category: "Compression Shirt",
    colorLabel: "Preto + Vermelho"
  },
  { 
    id: 2, 
    name: "UNDEFINED", 
    subtitle: "Silence is the strongest weapon.",
    price: "R$ 179,90", 
    priceNumber: 179.90, 
    installments: "12x de R$ 14,99", 
    image: "/images/products/obsidian_front.png",
    backImage: "/images/products/obsidian_back.png",
    category: "Compression Shirt",
    colorLabel: "Preto + Vermelho Escuro"
  },
  { 
    id: 3, 
    name: "UNDEFINED", 
    subtitle: "Purity forged in darkness.",
    price: "R$ 179,90", 
    priceNumber: 179.90, 
    installments: "12x de R$ 14,99", 
    image: "/images/products/ivory_front.png",
    backImage: "/images/products/ivory_back.png",
    category: "Compression Shirt",
    colorLabel: "Preto + Branco"
  }
];

export const mockBundle: Product = {
  id: 999,
  name: "KIT MEMENTO MORI",
  price: "R$ 499,90",
  priceNumber: 499.90,
  originalPrice: "R$ 539,70",
  installments: "12x de R$ 41,66",
  image: "/images/products/crimson_front.png",
  category: "bundle",
  isCombo: true,
  comboItems: [
    { name: "UNDEFINED 01", price: 166.63 },
    { name: "UNDEFINED 02", price: 166.63 },
    { name: "UNDEFINED 03", price: 166.64 }
  ]
};