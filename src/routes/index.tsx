import { createFileRoute } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, Mail, Instagram, Twitter, X, Phone, MessageSquare, Truck, Shield, Star, ArrowRight } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
  errorComponent: ({ error }) => {
    console.error("Index route error:", error);
    return <div className="p-4 text-red-500">Erro ao carregar a página principal.</div>;
  },
});

interface Product {
  id: number;
  name: string;
  price: string;
  installments: string;
  image: string;
  backImage?: string;
}

const STORAGE_KEYS = {
  MODAL_SHOWN: 'arcane_modal_shown_v1',
};

const THEME = {
  FONTS: {
    DISPLAY: "'Almendra Display', serif",
    SANS: "'Outfit', sans-serif",
  },
  COLORS: {
    PRIMARY: "#b91c1c",
  }
};

function Index() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const products = useMemo(() => ({
    arcane: [
      { id: 1, name: "COMPRESSION VEIN", price: "R$ 189,90", installments: "12x de R$ 15,82", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2158?q=80&w=800", backImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800" },
      { id: 2, name: "ANGELIC BLADE", price: "R$ 179,90", installments: "12x de R$ 14,99", image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=800", backImage: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800" },
      { id: 7, name: "SHADOW FABRIC", price: "R$ 149,90", installments: "12x de R$ 12,49", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800" },
      { id: 8, name: "DARK TEXTURE", price: "R$ 159,90", installments: "12x de R$ 13,32", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800" }
    ] as Product[],
    oversized: [
      { id: 3, name: "GOTHIC CROSS", price: "R$ 159,90", installments: "12x de R$ 13,32", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800", backImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800" },
      { id: 4, name: "FALLEN ANGEL", price: "R$ 165,90", installments: "12x de R$ 13,82", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800" },
      { id: 9, name: "OBSIDIAN OVER", price: "R$ 175,90", installments: "12x de R$ 14,65", image: "https://images.unsplash.com/photo-1571945153237-4929e783ab4a?q=80&w=800" },
      { id: 10, name: "PHANTOM RELIC", price: "R$ 169,90", installments: "12x de R$ 14,15", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800" }
    ] as Product[],
    sweatshirts: [
      { id: 5, name: "ZIP-UP GOTHIC", price: "R$ 289,90", installments: "12x de R$ 24,15", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800" },
      { id: 6, name: "TRIBAL BAGGY", price: "R$ 219,90", installments: "12x de R$ 18,32", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800" },
      { id: 11, name: "VOID HOODIE", price: "R$ 299,90", installments: "12x de R$ 24,99", image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=800" },
      { id: 12, name: "STATIC CARGO", price: "R$ 249,90", installments: "12x de R$ 20,82", image: "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?q=80&w=800" }
    ] as Product[]
  }), []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    try {
      const hasShownModal = localStorage.getItem(STORAGE_KEYS.MODAL_SHOWN);
      if (!hasShownModal) {
        timer = setTimeout(() => setShowModal(true), 1500);
      }
    } catch (e) {
      console.error("LocalStorage access error:", e);
      timer = setTimeout(() => setShowModal(true), 1500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    try {
      localStorage.setItem(STORAGE_KEYS.MODAL_SHOWN, 'true');
    } catch (e) {
      console.warn("Could not save modal state to localStorage", e);
    }
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Inscrição realizada com sucesso! Bem-vindo ao coven.");
      setEmail("");
    } catch (error) {
      toast.error("Erro ao realizar inscrição. Tente novamente.");
      console.error("Newsletter error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addToCart = useCallback((productName: string, size?: string) => {
    toast(`🩸 Item adicionado ao seu arsenal.`, {
      description: `${productName}${size ? ` - Tamanho: ${size}` : ''}`,
      className: "bg-[#0a0a0a] text-white border-l-4 border-[#b91c1c] rounded-none shadow-2xl",
      duration: 3000,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-foreground selection:bg-primary/30 overflow-x-hidden" style={{ fontFamily: THEME.FONTS.SANS }}>
      <header className="sticky top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-6">
          <button 
            className="cursor-pointer md:hidden text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu />
          </button>
          <nav className="hidden md:flex gap-6 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            <a href="#" className="hover:text-primary transition-colors duration-300">Home</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Produtos</a>
          </nav>
        </div>
        <h1 className="text-3xl md:text-4xl absolute left-1/2 -translate-x-1/2 select-none tracking-widest font-black" style={{ fontFamily: THEME.FONTS.DISPLAY }}>ARCANE</h1>
        <div className="flex items-center gap-5">
          <button aria-label="Carrinho" className="relative group">
            <ShoppingBag className="text-zinc-400 hover:text-white w-4 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-primary text-[8px] px-1 rounded-full text-white">0</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/75 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop" 
          alt="Gym Dark Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative text-center z-20 px-4 flex flex-col items-center">
          <h2 className="text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6 font-black" style={{ fontFamily: THEME.FONTS.DISPLAY }}>
            MEMENTO <br /> <span className="text-primary drop-shadow-[0_0_30px_rgba(185,28,28,0.3)]">MORI</span>
          </h2>
          <p className="text-zinc-200 tracking-[0.5em] uppercase text-[10px] md:text-xs max-w-xl mx-auto font-light mb-10">
            BEYOND THE SHADOWS OF MORTALITY LIES THE PATH OF DISCIPLINE
          </p>
          <button className="bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300">
            EXPLORAR A COLEÇÃO
          </button>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-zinc-950 border-y border-zinc-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck size={20} className="text-zinc-400" />
              <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">FRETE GRÁTIS ACIMA DE R$299</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield size={20} className="text-zinc-400" />
              <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">COMPRA 100% SEGURA</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star size={20} className="text-zinc-400" />
              <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">QUALIDADE PREMIUM GARANTIDA</span>
            </div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {Object.entries(products).map(([category, items]) => (
          <section key={category} className="py-16 md:py-24">
            <div className="flex items-center justify-center mb-10 border-b border-zinc-800 pb-8">
              <h3 className="text-2xl font-bold tracking-[0.2em] uppercase text-white">
                {category === 'arcane' ? 'Drop Arcano' : category === 'oversized' ? 'Camisas Oversized' : 'Moletons e Calças'}
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items
                .filter(p => p.image && !p.image.includes('broken') && p.image.startsWith('http'))
                .map((p) => (
                  <ProductCard key={p.id} product={p} onAdd={addToCart} />
                ))}
            </div>
          </section>
        ))}
      </main>

      <a 
        href="https://wa.me/5511999999999" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
        aria-label="Contato WhatsApp"
      >
        <Phone size={24} fill="currentColor" />
      </a>
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: Product, onAdd: (name: string, size?: string) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["P", "M", "G", "GG"];

  return (
    <div 
      className="group cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0a0a] mb-6">
        <div className="w-full h-full relative">
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${isHovered ? 'scale-105 opacity-0' : 'opacity-100'}`}
          />
          {product.backImage && (
            <img 
              src={product.backImage} 
              alt={`${product.name} back`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${isHovered ? 'scale-105 opacity-100' : 'opacity-0'}`}
            />
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-10">
          <div className="bg-black/75 backdrop-blur-md border-t border-white/5 p-4 flex justify-center gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                className={`w-10 h-10 flex items-center justify-center text-xs border transition-all duration-200 uppercase ${selectedSize === size ? "bg-white text-black border-white" : "bg-transparent border-white text-white hover:bg-white hover:text-black"}`}
              >
                {size}
              </button>
            ))}
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(product.name, selectedSize || undefined); }}
            className="w-full bg-zinc-900/95 hover:bg-zinc-800 text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors border-t border-white/5"
          >
            + Quick Add
          </button>
        </div>
      </div>
      
      <div className="space-y-1 text-left min-h-[4rem]">
        <h4 className="text-sm font-bold uppercase tracking-tight text-white transition-colors line-clamp-2">{product.name}</h4>
        <div className="flex flex-col">
          <span className="text-base font-bold text-white">{product.price}</span>
          <span className="text-sm text-zinc-400 font-medium">{product.installments}</span>
        </div>
      </div>
    </div>
  );
}
