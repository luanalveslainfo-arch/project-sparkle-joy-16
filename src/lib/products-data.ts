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
    name: "COMPRESSION ABYSS", 
    subtitle: "Forged for those who chose discipline.",
    price: "R$ 179,90", 
    priceNumber: 179.90, 
    installments: "12x de R$ 14,99", 
    image: "/images/products/crimson_front.png",
    backImage: "/images/products/crimson_back.png",
    category: "Compression Shirt",
    colorLabel: "Crimson Red"
  },
  { 
    id: 2, 
    name: "HOLLOW SHORTS", 
    subtitle: "Silence is the strongest weapon.",
    price: "R$ 179,90", 
    priceNumber: 179.90, 
    installments: "12x de R$ 14,99", 
    image: "/images/products/obsidian_front.png",
    backImage: "/images/products/obsidian_back.png",
    category: "Performance Shorts",
    colorLabel: "Obsidian Black"
  },
  { 
    id: 3, 
    name: "CARGO SERAPH", 
    subtitle: "Purity forged in darkness.",
    price: "R$ 179,90", 
    priceNumber: 179.90, 
    installments: "12x de R$ 14,99", 
    image: "/images/products/ivory_front.png",
    backImage: "/images/products/ivory_back.png",
    category: "Cargo Performance",
    colorLabel: "Ivory White"
  }
];

export const mockBundle: Product = {
  id: 999,
  name: "THE INITIATION PACK",
  price: "R$ 499,90",
  priceNumber: 499.90,
  originalPrice: "R$ 539,70",
  installments: "12x de R$ 41,66",
  image: "/images/products/crimson_front.png",
  category: "Elite Bundle",
  isCombo: true,
  comboItems: [
    { name: "ABYSS", price: 166.63 },
    { name: "HOLLOW", price: 166.63 },
    { name: "SERAPH", price: 166.64 }
  ]
};