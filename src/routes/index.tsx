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
    DISPLAY: "'UnifrakturMaguntia', serif",
    SANS: "'Inter', sans-serif",
  },
  COLORS: {
    PRIMARY: "#b91c1c", // Blood red
    BG_DARK: "#0a0a0a",
  }
};

function Index() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use useMemo to prevent unnecessary re-renders of static data
  const products = useMemo(() => ({
    arcane: [
      { id: 1, name: "COMPRESSION VEIN", price: "R$ 189,90", installments: "12x de R$ 15,82", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?q=80&w=800" },
      { id: 2, name: "ANGELIC BLADE", price: "R$ 179,90", installments: "12x de R$ 14,99", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800" }
    ] as Product[],
    oversized: [
      { id: 3, name: "GOTHIC CROSS", price: "R$ 159,90", installments: "12x de R$ 13,32", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800" },
      { id: 4, name: "FALLEN ANGEL", price: "R$ 165,90", installments: "12x de R$ 13,82", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800" }
    ] as Product[],
    sweatshirts: [
      { id: 5, name: "ZIP-UP GOTHIC", price: "R$ 289,90", installments: "12x de R$ 24,15", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800" },
      { id: 6, name: "TRIBAL BAGGY", price: "R$ 219,90", installments: "12x de R$ 18,32", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800" }
    ] as Product[]
  }), []);

  useEffect(() => {
    try {
      const hasShownModal = localStorage.getItem(STORAGE_KEYS.MODAL_SHOWN);
      if (!hasShownModal) {
        const timer = setTimeout(() => setShowModal(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Gracefully handle localStorage errors (e.g. Private Browsing mode)
      console.error("LocalStorage access error:", e);
      const timer = setTimeout(() => setShowModal(true), 1500);
      return () => clearTimeout(timer);
    }
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
    <div className="min-h-screen bg-black text-white selection:bg-red-900/50" style={{ fontFamily: THEME.FONTS.SANS }}>
      {/* Discount Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className="relative bg-[#0a0a0a] border border-red-900/30 p-8 max-w-md w-full text-center shadow-2xl shadow-red-900/10">
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
      <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Menu className="cursor-pointer md:hidden text-zinc-400 hover:text-white" />
          <nav className="hidden md:flex gap-6 text-xs uppercase tracking-widest text-zinc-400">
            <a href="#" className="hover:text-red-700 transition-colors">Home</a>
            <a href="#" className="hover:text-red-700 transition-colors">Produtos</a>
            <a href="#" className="hover:text-red-700 transition-colors">Tabela de Medidas</a>
            <a href="#" className="hover:text-red-700 transition-colors">Contato</a>
          </nav>
        </div>
        <h1 className="text-4xl absolute left-1/2 -translate-x-1/2 select-none" style={{ fontFamily: THEME.FONTS.DISPLAY }}>ARCANE</h1>
        <div className="flex items-center gap-5">
          <button aria-label="Buscar"><Search className="text-zinc-400 hover:text-white w-5 transition-colors" /></button>
          <button aria-label="Minha conta"><User className="text-zinc-400 hover:text-white w-5 transition-colors" /></button>
          <button aria-label="Carrinho" className="relative group">
            <ShoppingBag className="text-zinc-400 hover:text-white w-5 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-red-700 text-[8px] px-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">0</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2000')] bg-cover bg-center brightness-[0.3] scale-110 motion-safe:animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        <div className="relative text-center z-10 px-4">
          <h2 className="text-6xl md:text-[10rem] uppercase tracking-tighter leading-none mb-4" style={{ fontFamily: THEME.FONTS.DISPLAY }}>
            MEMENTO <br /> <span className="text-red-800">MORI</span>
          </h2>
          <p className="text-zinc-500 tracking-[0.3em] uppercase text-sm md:text-base">Streetwear Essentials for the Fallen</p>
        </div>
      </section>

      {/* Product Sections */}
      <main className="container mx-auto px-4 py-24 space-y-32">
        {Object.entries(products).map(([category, items]) => (
          <section key={category}>
            <div className="flex items-center justify-between mb-12 border-b border-red-900/20 pb-4">
              <h3 className="text-3xl uppercase tracking-widest capitalize" style={{ fontFamily: THEME.FONTS.DISPLAY }}>
                {category === 'arcane' ? 'Drop Arcano' : category === 'oversized' ? 'Camisas Oversized' : 'Moletons e Calças'}
              </h3>
              <a href="#" className="text-xs text-red-700 hover:text-red-500 uppercase tracking-widest transition-colors">Ver tudo</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-24 mt-24">
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
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a] mb-6">
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75 grayscale hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product.name);
          }}
          className="absolute bottom-0 left-0 w-full bg-red-800 text-white py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-bold text-xs tracking-widest hover:bg-red-700"
        >
          ADICIONAR AO CARRINHO
        </button>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-bold uppercase tracking-widest group-hover:text-red-700 transition-colors">{product.name}</h4>
        <p className="text-red-700 font-bold">{product.price}</p>
        <p className="text-zinc-600 text-[10px] uppercase tracking-wider">{product.installments}</p>
      </div>
    </div>
  );
}
