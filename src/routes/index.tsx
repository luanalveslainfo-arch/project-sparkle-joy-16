import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Shield, Star, Phone } from "lucide-react";
import { useMemo } from "react";

import { useCartStore } from "@/lib/cart-store";
import { mockProducts } from "@/lib/products-data";

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
    DISPLAY: "'Almendra Display', serif",
    SANS: "'Outfit', sans-serif",
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
        {/* Background Image using Native <img> for Vite optimization */}
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Memento Mori" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0" 
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/85 z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 cursor-default">
          <h2 className="text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6 font-black" style={{ fontFamily: THEME.FONTS.DISPLAY }}>
            MEMENTO <br /> <span className="text-[#8B0000] drop-shadow-[0_0_40px_rgba(139,0,0,0.4)]">MORI</span>
          </h2>
          <p className="text-zinc-200 tracking-[0.5em] uppercase text-[10px] md:text-xs max-w-xl mx-auto font-light mb-10">
            BEYOND THE SHADOWS OF MORTALITY LIES THE PATH OF DISCIPLINE
          </p>
          <Link 
            to="/produtos" 
            className="relative z-50 pointer-events-auto bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] mt-8 cursor-pointer"
          >
            EXPLORAR A COLEÇÃO
          </Link>
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
        {Object.entries(productsByCategory).map(([category, items]) => (
          <section key={category} className="py-20 md:py-32">
            <div className="flex items-center justify-center mb-10 border-b border-zinc-800 pb-8">
              <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-[0.2em] uppercase text-white mb-8 text-center">
                {category === 'arcane' ? 'Drop Arcano' : category === 'oversized' ? 'Camisas Oversized' : 'Moletons e Calças'}
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
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
            </div>
          </section>
        ))}
      </main>

      <Footer />


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

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col items-start text-left relative z-10">
      <div className="relative w-full aspect-[3/4] bg-zinc-950 flex items-center justify-center overflow-hidden mb-4 rounded-sm">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-zinc-300">{product.name}</h4>
        <span className="text-base font-semibold text-white">{product.price}</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 pt-16 pb-12 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          {/* Column 1 */}
          <div className="space-y-6">
            <h2 className="text-4xl select-none tracking-widest font-black uppercase" style={{ fontFamily: THEME.FONTS.DISPLAY }}>ARCANE</h2>
            <p className="text-zinc-500 text-xs uppercase tracking-widest leading-relaxed max-w-xs">
              Beyond the shadows of mortality lies the path of discipline.
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Links Úteis</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest text-zinc-400">
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Rastrear Pedido</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Trocas e Devoluções</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Termos de Serviço</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">JUNTE-SE À SEITA</h4>
            <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center border-b border-zinc-600 pb-2 focus-within:border-white transition-colors duration-300 w-full md:w-2/3">
                <input 
                  type="email" 
                  placeholder="SEU MELHOR E-MAIL" 
                  className="bg-transparent w-full text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-0 border-none p-0 tracking-widest"
                />
                <button className="text-xs font-bold tracking-widest uppercase text-white hover:text-zinc-400 transition-colors bg-transparent border-none p-0 ml-4 whitespace-nowrap">
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
