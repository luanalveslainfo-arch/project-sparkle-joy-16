import { createFileRoute } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, Mail, Instagram, Twitter, X, Phone, MessageSquare } from "lucide-react";
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
      { id: 2, name: "ANGELIC BLADE", price: "R$ 179,90", installments: "12x de R$ 14,99", image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=800" }
    ] as Product[],
    oversized: [
      { id: 3, name: "GOTHIC CROSS", price: "R$ 159,90", installments: "12x de R$ 13,32", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800" },
      { id: 4, name: "FALLEN ANGEL", price: "R$ 165,90", installments: "12x de R$ 13,82", image: "https://images.unsplash.com/photo-1599058917233-57c0e62097b9?q=80&w=800" }
    ] as Product[],
    sweatshirts: [
      { id: 5, name: "ZIP-UP GOTHIC", price: "R$ 289,90", installments: "12x de R$ 24,15", image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=800" },
      { id: 6, name: "TRIBAL BAGGY", price: "R$ 219,90", installments: "12x de R$ 18,32", image: "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?q=80&w=800" }
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
    toast.success(`${productName} adicionado ao carrinho!`);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-foreground selection:bg-primary/30" style={{ fontFamily: THEME.FONTS.SANS }}>
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
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-6">
          <Menu className="cursor-pointer md:hidden text-zinc-400 hover:text-white" />
          <nav className="hidden md:flex gap-6 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Produtos</a>
            <a href="#" className="hover:text-white transition-colors">Medidas</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </nav>
        </div>
        <h1 className="text-2xl md:text-3xl absolute left-1/2 -translate-x-1/2 select-none tracking-tighter font-bold" style={{ fontFamily: THEME.FONTS.DISPLAY }}>ARCANE</h1>
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
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black z-10" />
        <div className="relative text-center z-20 px-4">
          <h2 className="text-7xl md:text-[12rem] uppercase tracking-tighter leading-none mb-6 font-black" style={{ fontFamily: THEME.FONTS.DISPLAY }}>
            MEMENTO <br /> <span className="text-primary drop-shadow-[0_0_30px_rgba(185,28,28,0.3)]">MORI</span>
          </h2>
          <p className="text-zinc-500 tracking-[0.5em] uppercase text-xs md:text-sm max-w-xl mx-auto font-light">
            Beyond the shadows of mortality lies the path of discipline.
          </p>
        </div>
      </section>

      {/* Product Sections */}
      <main className="max-w-7xl mx-auto px-4 py-24 space-y-32">
        {Object.entries(products).map(([category, items]) => (
          <section key={category}>
            <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
              <h3 className="text-2xl uppercase tracking-[0.2em] font-light" style={{ fontFamily: THEME.FONTS.DISPLAY }}>
                {category === 'arcane' ? 'Drop Arcano' : category === 'oversized' ? 'Camisas Oversized' : 'Moletons e Calças'}
              </h3>
              <a href="#" className="text-[10px] text-zinc-500 hover:text-primary uppercase tracking-[0.2em] transition-colors font-medium">Shop All</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-sidebar border-t border-border/40 py-32 mt-32">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ fontFamily: THEME.FONTS.DISPLAY }}>Join the Coven</h4>
            <p className="text-zinc-500 text-sm mb-6">Assine nossa newsletter e receba drops exclusivos.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex group">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email" 
                autoComplete="email"
                className="bg-black border border-white/10 px-4 py-3 w-full focus:outline-none focus:border-red-900 transition-colors text-sm text-white" 
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                className="bg-red-800 hover:bg-red-700 px-6 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
                aria-label="Inscrever-se"
              >
                {isSubmitting ? <span className="animate-spin inline-block">●</span> : <Mail size={18} />}
              </button>
            </form>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-300">Explorar</h4>
              <nav className="flex flex-col gap-4">
                <a href="#" className="text-zinc-500 text-xs uppercase tracking-tighter hover:text-red-700 transition-colors">Drops</a>
                <a href="#" className="text-zinc-500 text-xs uppercase tracking-tighter hover:text-red-700 transition-colors">Acessórios</a>
                <a href="#" className="text-zinc-500 text-xs uppercase tracking-tighter hover:text-red-700 transition-colors">Outlet</a>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-300">Ajuda</h4>
              <nav className="flex flex-col gap-4">
                <a href="#" className="text-zinc-500 text-xs uppercase tracking-tighter hover:text-red-700 transition-colors">Envios</a>
                <a href="#" className="text-zinc-500 text-xs uppercase tracking-tighter hover:text-red-700 transition-colors">Trocas</a>
                <a href="#" className="text-zinc-500 text-xs uppercase tracking-tighter hover:text-red-700 transition-colors">Rastreio</a>
              </nav>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-300">Contato</h4>
            <div className="space-y-4 text-zinc-500 text-sm">
              <a href="tel:+5511999999999" className="flex items-center gap-3 hover:text-red-700 transition-colors"><MessageSquare size={16} /> WhatsApp: (11) 99999-9999</a>
              <a href="mailto:contato@arcane.com" className="flex items-center gap-3 hover:text-red-700 transition-colors"><Mail size={16} /> contato@arcane.com</a>
              <div className="flex gap-6 pt-4">
                <a href="#" aria-label="Instagram"><Instagram className="cursor-pointer hover:text-red-700 transition-colors" /></a>
                <a href="#" aria-label="Twitter"><Twitter className="cursor-pointer hover:text-red-700 transition-colors" /></a>
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

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a] mb-6 transition-all duration-500">
        {!hasError ? (
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-2 opacity-30">
            <ShoppingBag size={24} className="text-white" />
            <span className="text-[8px] uppercase tracking-widest text-white">Image Off</span>
          </div>
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product.name);
            }}
            className="w-full bg-black border border-white/20 text-white py-3 font-bold text-[9px] tracking-[0.2em] hover:bg-[#b91c1c] hover:border-[#b91c1c] transition-colors uppercase"
          >
            + Quick Add
          </button>
        </div>
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
