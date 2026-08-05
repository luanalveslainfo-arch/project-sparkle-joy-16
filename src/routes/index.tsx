import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Shield, Star, Phone } from "lucide-react";
import { useMemo } from "react";
import { toast as sonnerToast } from "sonner";
import { motion } from "framer-motion";

import { useCartStore } from "@/lib/cart-store";
import { mockProducts } from "@/lib/products-data";
import { AshParticles } from "@/components/AshParticles";
import { ProductSkeleton } from "@/components/Skeleton";
import { ProductCard } from "@/components/ProductCard";
import { InteractiveGrid } from "@/components/InteractiveGrid";
import { MagneticButton } from "@/components/MagneticButton";
import { useState, useEffect } from "react";

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
  priceNumber: number;
  installments: string;
  image: string;
  backImage?: string;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string | undefined;
}




const STORAGE_KEYS = {
  MODAL_SHOWN: 'arcane_modal_shown_v2',
};

const THEME = {
  FONTS: {
    DISPLAY: "font-gothic",
    SANS: "font-sans",
  },
  COLORS: {
    PRIMARY: "#8B0000",
  }
};

function Index() {
  const { isCartOpen } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for skeleton visibility
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const productsByCategory = useMemo(() => {
    return {
      arcane: mockProducts.filter(p => p.category === 'arcane'),
      oversized: mockProducts.filter(p => p.category === 'oversized'),
      sweatshirts: mockProducts.filter(p => p.category === 'sweatshirts'),
    };
  }, []);


  return (
    <div className={`selection:bg-primary/30 overflow-x-hidden ${isCartOpen ? 'overflow-hidden' : ''}`}>

      {/* Hero */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Image using Native <img> for Vite optimization */}
        <img 
          src="/hero.png" 
          alt="Arcane | Memento Mori - Dark Fitness & Streetwear" 
          width="1920"
          height="1080"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top z-0" 
        />
        
        {/* Ash Particles Canvas */}
        <AshParticles />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/85 z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 cursor-default">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-7xl md:text-[11rem] tracking-tight leading-[0.85] mb-8 font-madness text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            MEMENTO <br /> <span className="text-red-700 drop-shadow-[0_0_50px_rgba(185,28,28,0.6)]">MORI</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-zinc-200 tracking-[0.5em] uppercase text-[10px] md:text-xs max-w-xl mx-auto font-light mb-10"
          >
            BEYOND THE SHADOWS OF MORTALITY LIES THE PATH OF DISCIPLINE
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          >
            <MagneticButton className="flex items-center justify-center mt-8">
              <Link 
                to="/manifesto" 
                className="relative z-50 pointer-events-auto border border-white bg-black/50 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out hover:bg-white hover:text-black cursor-pointer"
              >
                LER O MANIFESTO
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories / Drops */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center gap-4 group">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 transition-colors group-hover:border-red-900/50">
              <Truck size={24} className="text-zinc-500 group-hover:text-red-700 transition-colors" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-white">Logística Premium</h4>
              <p className="text-[9px] tracking-widest text-zinc-500 uppercase">Frete grátis acima de R$299</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4 group">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 transition-colors group-hover:border-red-900/50">
              <Shield size={24} className="text-zinc-500 group-hover:text-red-700 transition-colors" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-white">Fortaleza Blindada</h4>
              <p className="text-[9px] tracking-widest text-zinc-500 uppercase">Compra 100% Segura</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4 group">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 transition-colors group-hover:border-red-900/50">
              <Star size={24} className="text-zinc-500 group-hover:text-red-700 transition-colors" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-white">Forjado no Caos</h4>
              <p className="text-[9px] tracking-widest text-zinc-500 uppercase">Qualidade Premium Garantida</p>
            </div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {Object.entries(productsByCategory).map(([category, items]) => (
          <section key={category} className="py-20 md:py-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center mb-16"
            >
              <h3 className="text-2xl md:text-4xl font-madness tracking-wider text-white mb-4 text-center">
                {category === 'arcane' ? 'Drop Arcane' : category === 'oversized' ? 'Camisas Oversized' : 'Moletons e Calças'}
              </h3>
              <div className="w-12 h-[1px] bg-red-800" />
            </motion.div>
            <InteractiveGrid>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 relative z-10">
                {isLoading 
                  ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
                  : items.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))
                }
              </div>
            </InteractiveGrid>
          </section>
        ))}
      </main>

      <Footer />


      <a 
        href="https://wa.me/5521965226593" 
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

// ProductCard removed from here and moved to src/components/ProductCard.tsx

function Footer() {
  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input');
    
    sonnerToast("Bem-vindo à Seita. Aguarde nossas instruções nas sombras.", {
      style: {
        background: '#09090b',
        border: '1px solid #18181b',
        color: 'white',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontSize: '10px',
        fontWeight: 'bold',
        fontFamily: THEME.FONTS.SANS
      }
    });

    if (input) input.value = '';
  };

  return (
    <footer className="bg-black border-t border-zinc-800 pt-16 pb-12 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          {/* Column 1 */}
          <div className="space-y-6">
            <h2 className="text-5xl select-none font-madness text-white">ARCANE</h2>
            <p className="text-zinc-500 text-xs uppercase tracking-widest leading-relaxed max-w-xs">
              Beyond the shadows of mortality lies the path of discipline.
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Links Úteis</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest text-zinc-400">
              <li><Link to="/manifesto" className="transition-colors duration-200 hover:text-white">Nossa Visão (Manifesto)</Link></li>
              <li><Link to="/medidas" className="transition-colors duration-200 hover:text-white">Tabela de Medidas</Link></li>
              <li><Link to="/envios" className="transition-colors duration-200 hover:text-white">Prazos e Envios</Link></li>
              <li>
                <a 
                  href="https://wa.me/5521965226593" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="transition-colors duration-200 hover:text-white"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">JUNTE-SE À SEITA</h4>
            <form className="flex flex-col space-y-4" onSubmit={handleNewsletter}>
              <div className="flex items-center border-b border-zinc-600 pb-2 focus-within:border-white transition-colors duration-300 w-full md:w-2/3">
                <input 
                  type="email" 
                  required
                  placeholder="SEU MELHOR E-MAIL" 
                  className="bg-transparent w-full text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-0 border-none p-0 tracking-widest"
                />
                <button 
                  type="submit"
                  className="text-xs font-bold tracking-widest uppercase text-white hover:text-zinc-400 transition-colors bg-transparent border-none p-0 ml-4 whitespace-nowrap"
                >
                  ASSINAR
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-10 text-center">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">© 2024 Arcane. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
