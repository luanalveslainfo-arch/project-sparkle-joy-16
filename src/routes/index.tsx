import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Shield, Star, Phone } from "lucide-react";
import { useMemo } from "react";
import { toast as sonnerToast } from "sonner";
import { motion } from "framer-motion";

import { useCartStore } from "@/lib/cart-store";
import { mockProducts } from "@/lib/products-data";
import { HeroParticles } from "@/components/HeroParticles";

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
        {/* Particles */}
        <HeroParticles />
        
        {/* Background Image using Native <img> for Vite optimization */}
        <img 
          src="/hero.png" 
          alt="Memento Mori" 
          className="absolute inset-0 w-full h-full object-cover object-top z-0" 
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/85 z-10" />

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 cursor-default"
        >
          <h2 className="text-5xl md:text-7xl lg:text-[11rem] tracking-tight leading-[0.85] mb-8 font-madness text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            MEMENTO <br /> <span className="text-red-700 drop-shadow-[0_0_50px_rgba(185,28,28,0.6)]">MORI</span>
          </h2>
          <p className="text-zinc-200 tracking-[0.5em] uppercase text-[10px] md:text-xs max-w-xl mx-auto font-light mb-10">
            BEYOND THE SHADOWS OF MORTALITY LIES THE PATH OF DISCIPLINE
          </p>
          <Link 
            to="/manifesto" 
            className="relative z-50 pointer-events-auto border border-white bg-black/50 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98] mt-8 cursor-pointer"
          >
            LER O MANIFESTO
          </Link>
        </motion.div>
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

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-24 md:space-y-32">
        {Object.entries(productsByCategory).map(([category, items]) => (
          <section key={category} className="py-12 md:py-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center mb-10 border-b border-zinc-800 pb-8"
            >
              <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-[0.2em] uppercase text-white mb-8 text-center">
                {category === 'arcane' ? 'Drop Arcano' : category === 'oversized' ? 'Camisas Oversized' : 'Moletons e Calças'}
              </h3>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
            >
              {items.map((p) => (
                <div key={p.id} className="relative z-10">
                  <Link 
                    to="/produto/$productId" 
                    params={{ productId: p.id.toString() }} 
                    className="block cursor-pointer relative z-10 pointer-events-auto"
                  >
                    <ProductCard product={p} />
                  </Link>
                </div>
              ))}
            </motion.div>
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

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col items-start text-left relative z-10"
    >
      <div className="relative w-full aspect-[3/4] bg-zinc-950 flex items-center justify-center overflow-hidden mb-4 rounded-sm shadow-none group-hover:shadow-[0_10px_25px_rgba(185,28,28,0.2)] transition-shadow duration-300">
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover brightness-75 transition-all duration-700" 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-zinc-300">{product.name}</h4>
        <div className="flex flex-col">
          <span className="text-base font-semibold text-white">{product.price}</span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">ATÉ 12X S/ JUROS OU PIX</span>
        </div>
      </div>
    </motion.div>
  );
}

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
