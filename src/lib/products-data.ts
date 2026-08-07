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
  description?: string;
}

export const mockProducts: Product[] = [
  { 
    id: 1, 
    name: "THE CRUCIBLE", 
    subtitle: "A disciplina transforma através da dor.",
    price: "R$ 179,90", 
    priceNumber: 179.90, 
    installments: "12x de R$ 14,99", 
    image: "/images/products/ivory_front.png", // Assuming this is the white/black detailed one
    backImage: "/images/products/ivory_back.png",
    category: "Forged Compression",
    colorLabel: "Bone White / Obsidian",
    description: "O Crisol (Crucible) é o recipiente onde o metal é submetido ao fogo para ser purificado. Esta peça representa a transformação através da dor. Nada sai do fogo igual entrou. Alguns fogem do fogo. Outros são forjados por ele. O Crucible representa aqueles que aceitaram pagar o preço da evolução. A disciplina não é confortável. Ela queima. Ela molda. Ela permanece."
  },
  { 
    id: 2, 
    name: "BLOOD OATH", 
    subtitle: "Um juramento feito com sangue.",
    price: "R$ 179,90", 
    priceNumber: 179.90, 
    installments: "12x de R$ 14,99", 
    image: "/images/products/crimson_front.png",
    backImage: "/images/products/crimson_back.png",
    category: "Elite Compression",
    colorLabel: "Crimson Red",
    description: "Um juramento feito com sangue. Não é uma promessa. É um compromisso sem retorno. Toda grande transformação exige um preço. O Blood Oath simboliza o momento em que você deixa de negociar com suas próprias desculpas. A partir daqui existe apenas uma direção. Em frente."
  },
  { 
    id: 3, 
    name: "SHADOW CREED", 
    subtitle: "Algumas das maiores batalhas são vencidas em silêncio.",
    price: "R$ 179,90", 
    priceNumber: 179.90, 
    installments: "12x de R$ 14,99", 
    image: "/images/products/obsidian_front.png",
    backImage: "/images/products/obsidian_back.png",
    category: "Performance Compression",
    colorLabel: "Obsidian Black",
    description: "Esta peça representa a elite. Quase secreta. Nem toda força precisa ser anunciada. Algumas das maiores batalhas são vencidas em silêncio. O Shadow Creed pertence àqueles que trabalham quando ninguém está olhando."
  }
];

export const mockBundle: Product = {
  id: 999,
  name: "THE FORGED SET",
  price: "R$ 499,90",
  priceNumber: 499.90,
  originalPrice: "R$ 539,70",
  installments: "12x de R$ 41,66",
  image: "/images/products/crimson_front.png",
  category: "Elite Bundle",
  isCombo: true,
  comboItems: [
    { name: "CRUCIBLE", price: 166.63 },
    { name: "BLOOD OATH", price: 166.63 },
    { name: "SHADOW CREED", price: 166.64 }
  ]
};