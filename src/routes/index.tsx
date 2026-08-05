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

/**
 * Robust Product type definition to ensure data integrity.
 */
interface Product {
  id: number;
  name: string;
  price: string;
  installments: string;
  image: string;
}

/**
 * Centralized constants for better maintainability and to prevent magic strings.
 */
const STORAGE_KEYS = {
  MODAL_SHOWN: 'arcane_modal_shown_v1',
};

const THEME = {
  FONTS: {
    DISPLAY: "'Almendra Display', serif",
    SANS: "'Outfit', sans-serif",
  },
  COLORS: {
    PRIMARY: "#b91c1c", // Blood red
    BG_DARK: "#000000",
  }
};

function Index() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use useMemo to prevent unnecessary re-renders of static data
  const products = useMemo(() => ({
    arcane: [
      { id: 1, name: "COMPRESSION VEIN", price: "R$ 189,90", installments: "12x de R$ 15,82", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2158?q=80&w=800" },
      { id: 2, name: "ANGELIC BLADE", price: "R$ 179,90", installments: "12x de R$ 14,99", image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=800" },
      { id: 7, name: "SHADOW FABRIC", price: "R$ 149,90", installments: "12x de R$ 12,49", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800" },
      { id: 8, name: "DARK TEXTURE", price: "R$ 159,90", installments: "12x de R$ 13,32", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800" }
    ] as Product[],
    oversized: [
      { id: 3, name: "GOTHIC CROSS", price: "R$ 159,90", installments: "12x de R$ 13,32", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800" },
      { id: 4, name: "FALLEN ANGEL", price: "R$ 165,90", installments: "12x de R$ 13,82", image: "https://images.unsplash.com/photo-1599058917233-57c0e62097b9?q=80&w=800" },
      { id: 9, name: "OBSIDIAN OVER", price: "R$ 175,90", installments: "12x de R$ 14,65", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800" },
      { id: 10, name: "PHANTOM RELIC", price: "R$ 169,90", installments: "12x de R$ 14,15", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800" }
    ] as Product[],
    sweatshirts: [
      { id: 5, name: "ZIP-UP GOTHIC", price: "R$ 289,90", installments: "12x de R$ 24,15", image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=800" },
      { id: 6, name: "TRIBAL BAGGY", price: "R$ 219,90", installments: "12x de R$ 18,32", image: "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?q=80&w=800" },
      { id: 11, name: "VOID HOODIE", price: "R$ 299,90", installments: "12x de R$ 24,99", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800" },
      { id: 12, name: "STATIC CARGO", price: "R$ 249,90", installments: "12x de R$ 20,82", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800" }
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

    // Basic client-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
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

  const addToCart = useCallback((productName: string) => {
    toast(`🩸 Item adicionado ao seu arsenal.`, {
      description: productName,
      className: "bg-[#0a0a0a] text-white border-l-4 border-[#b91c1c] rounded-none shadow-2xl",
      duration: 3000,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-foreground selection:bg-primary/30 overflow-x-hidden" style={{ fontFamily: THEME.FONTS.SANS }}>
      {/* Marquee Announcement Bar */}
      <div className="bg-[#b91c1c] text-white py-2 overflow-hidden whitespace-nowrap border-b border-black/20">
        <div className="inline-block animate-marquee uppercase text-[10px] md:text-xs font-bold tracking-[0.3em]">
          ⚔️ FRETE GRÁTIS PARA TODO O BRASIL ACIMA DE R$ 299 ⚔️ MEMENTO MORI ⚔️ ENVIOS EM ATÉ 24H ⚔️ FRETE GRÁTIS PARA TODO O BRASIL ACIMA DE R$ 299 ⚔️ MEMENTO MORI ⚔️ ENVIOS EM ATÉ 24H ⚔️
        </div>
      </div>

      {/* Discount Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className="relative bg-card border border-border/50 p-10 max-w-lg w-full text-center shadow-2xl ring-1 ring-primary/20 backdrop-blur-xl">
            <button 
              onClick={handleCloseModal} 
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-2"
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>
            <h2 id="modal-title" className="text-3xl mb-4 text-red-700" style={{ fontFamily: THEME.FONTS.DISPLAY }}>Oferta Arcano</h2>
            <p className="text-xl mb-6">Ganhe <span className="text-red-600 font-bold">5% OFF</span> na sua primeira compra.</p>
            <button 
              onClick={handleCloseModal}
              className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 transition-colors shadow-lg shadow-red-900/20 active:scale-[0.98]"
            >
              RESGATAR CUPOM
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-6">
          <Menu className="cursor-pointer md:hidden text-zinc-400 hover:text-white" />
          <nav className="hidden md:flex gap-6 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            <a href="#" className="hover:text-primary transition-colors duration-300">Home</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Produtos</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Medidas</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Contato</a>
          </nav>
        </div>
        <h1 className="text-3xl md:text-4xl absolute left-1/2 -translate-x-1/2 select-none tracking-widest font-black" style={{ fontFamily: THEME.FONTS.DISPLAY }}>ARCANE</h1>
        <div className="flex items-center gap-5">
          <button aria-label="Buscar"><Search className="text-zinc-400 hover:text-white w-4 transition-colors" /></button>
          <button aria-label="Minha conta"><User className="text-zinc-400 hover:text-white w-4 transition-colors" /></button>
          <button aria-label="Carrinho" className="relative group">
            <ShoppingBag className="text-zinc-400 hover:text-white w-4 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-primary text-[8px] px-1 rounded-full text-white">0</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop" 
          alt="Gym Dark Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 z-10" />
        <div className="relative text-center z-20 px-4">
          <h2 className="text-7xl md:text-[12rem] uppercase tracking-tighter leading-none mb-6 font-black" style={{ fontFamily: THEME.FONTS.DISPLAY }}>
            MEMENTO <br /> <span className="text-primary drop-shadow-[0_0_30px_rgba(185,28,28,0.3)]">MORI</span>
          </h2>
          <p className="text-zinc-500 tracking-[0.5em] uppercase text-xs md:text-sm max-w-xl mx-auto font-light">
            Beyond the shadows of mortality lies the path of discipline.
          </p>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-6">
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

      {/* Product Sections */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {Object.entries(products).map(([category, items]) => (
          <RevealOnScroll key={category}>
            <section className="py-16 md:py-24">
              <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                <h3 className="text-3xl uppercase tracking-[0.2em] font-light" style={{ fontFamily: THEME.FONTS.DISPLAY }}>
                  {category === 'arcane' ? 'Drop Arcano' : category === 'oversized' ? 'Camisas Oversized' : 'Moletons e Calças'}
                </h3>
                <a href="#" className="text-[10px] text-zinc-500 hover:text-primary uppercase tracking-[0.2em] transition-colors font-medium">Shop All</a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} onAdd={addToCart} />
                ))}
              </div>
            </section>
          </RevealOnScroll>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-sidebar border-t border-border/40 py-32 mt-32">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ fontFamily: THEME.FONTS.DISPLAY }}>Join the Coven</h4>
            <p className="text-zinc-500 text-sm mb-6">Assine nossa newsletter e receba drops exclusivos.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-4">
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu email" 
                  autoComplete="email"
                  className="bg-transparent border-b border-white/20 py-3 w-full focus:outline-none focus:border-primary transition-colors text-sm text-white placeholder:text-zinc-600" 
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className="absolute right-0 bottom-3 text-primary hover:text-red-500 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                  aria-label="Inscrever-se"
                >
                  {isSubmitting ? <span className="animate-spin inline-block text-[8px]">●</span> : <ArrowRight size={20} />}
                </button>
              </div>
            </form>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-300">Explorar</h4>
              <nav className="flex flex-col gap-4">
                <a href="#" className="text-zinc-500 text-xs uppercase tracking-tighter hover:text-primary transition-colors duration-300">Drops</a>
                <a href="#" className="text-zinc-500 text-xs uppercase tracking-tighter hover:text-primary transition-colors duration-300">Acessórios</a>
                <a href="#" className="text-zinc-500 text-xs uppercase tracking-tighter hover:text-primary transition-colors duration-300">Outlet</a>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-300">Ajuda</h4>
              <nav className="flex flex-col gap-4">
                <a href="#" className="text-zinc-500 text-xs uppercase tracking-tighter hover:text-primary transition-colors duration-300">Envios</a>
                <a href="#" className="text-zinc-500 text-xs uppercase tracking-tighter hover:text-primary transition-colors duration-300">Trocas</a>
                <a href="#" className="text-zinc-500 text-xs uppercase tracking-tighter hover:text-primary transition-colors duration-300">Rastreio</a>
              </nav>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-300">Contato</h4>
            <div className="space-y-4 text-zinc-500 text-sm">
              <a href="tel:+5511999999999" className="flex items-center gap-3 hover:text-primary transition-colors duration-300"><MessageSquare size={16} /> WhatsApp: (11) 99999-9999</a>
              <a href="mailto:contato@arcane.com" className="flex items-center gap-3 hover:text-primary transition-colors duration-300"><Mail size={16} /> contato@arcane.com</a>
              <div className="flex gap-6 pt-4">
                <a href="#" aria-label="Instagram"><Instagram className="cursor-pointer hover:text-primary transition-colors duration-300" /></a>
                <a href="#" aria-label="Twitter"><Twitter className="cursor-pointer hover:text-primary transition-colors duration-300" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-24 pt-8 border-t border-white/5 text-center">
          <p className="text-zinc-700 text-[10px] uppercase tracking-[0.5em]">© 2026 ARCANE CLOTHING - BEYOND THE SHADOWS</p>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: Product, onAdd: (name: string) => void }) {
  const [hasError, setHasError] = useState(false);
  const fallbackImage = null; // We will handle fallback manually now

  return (
    <div className="group cursor-pointer overflow-hidden">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111111] mb-6">
        {!hasError && product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold opacity-30">IMAGE UNAVAILABLE</span>
          </div>
        )}
        
        {/* Quick Add Overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product.name);
          }}
          className="absolute bottom-0 left-0 w-full bg-black/90 backdrop-blur-sm text-white py-4 text-sm font-bold uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out border-t border-white/10 z-10 hover:bg-[#b91c1c] hover:border-[#b91c1c]"
        >
          + Quick Add
        </button>
      </div>
      
      <div className="space-y-1 text-left">
        <h4 className="text-sm font-bold uppercase tracking-tight text-white transition-colors">{product.name}</h4>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">{product.price}</span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{product.installments}</span>
        </div>
      </div>
    </div>
  );
}
