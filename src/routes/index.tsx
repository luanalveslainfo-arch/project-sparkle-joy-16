import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { HeroParticles } from "@/components/HeroParticles";
import { mockProducts, mockBundle } from "@/lib/products-data";
import { useCartStore } from "@/lib/cart-store";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { addToCart } = useCartStore();

  const handleAddBundle = () => {
    // Add all 3 items from the bundle with default size
    mockProducts.forEach(product => {
      addToCart(product, "M", 1);
    });
  };

  return (
    <div className="bg-black text-white selection:bg-red-900/30 overflow-x-hidden">
      {/* 1. HERO */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <HeroParticles />
        <img 
          src="/hero.png" 
          alt="Memento Mori" 
          className="absolute inset-0 w-full h-full object-cover object-top z-0 opacity-40 grayscale" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-10" />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative z-20 flex flex-col items-center text-center px-4"
        >
          <h1 className="text-[12vw] md:text-[8rem] font-madness tracking-tighter leading-none mb-4 text-white">
            ARCANE
          </h1>
          <p className="text-zinc-500 tracking-[0.8em] uppercase text-[10px] md:text-xs mb-12 font-light">
            MEMENTO MORI
          </p>
          <Link 
            to="/produto/$productId" 
            params={{ productId: "1" }}
            className="border border-white/20 bg-white/5 backdrop-blur-sm text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-white hover:text-black hover:border-white"
          >
            ENTRAR NO DROP
          </Link>
        </motion.div>
      </section>

      {/* 2. MANIFESTO */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-32 text-center bg-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-xl space-y-12"
        >
          <div className="space-y-6">
            <p className="text-zinc-400 text-sm md:text-base tracking-wide leading-relaxed font-light italic">
              "Ninguém nasce disciplinado. Alguns escolhem esse caminho. A Arcane existe para aqueles que decidiram atravessar a escuridão."
            </p>
          </div>
          <Link 
            to="/manifesto" 
            className="inline-block text-[9px] font-bold tracking-[0.5em] text-zinc-500 hover:text-white transition-colors uppercase border-b border-zinc-800 pb-1"
          >
            LER MANIFESTO COMPLETO
          </Link>
        </motion.div>
      </section>

      {/* 3. DROP 001 HEADER */}
      <section className="py-32 flex flex-col items-center justify-center text-center bg-black border-t border-zinc-900/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-zinc-600 tracking-[0.5em] text-[10px] uppercase font-bold">DROP 001</h2>
          <h3 className="text-4xl md:text-6xl font-madness text-white tracking-widest">MEMENTO MORI</h3>
          <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase pt-4">
            "Apenas três peças. Nada além do necessário."
          </p>
        </motion.div>
      </section>

      {/* 3.5 SEÇÃO: OS TRÊS ESCOLHIDOS */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] tracking-[0.6em] text-zinc-600 uppercase font-bold text-center mb-16"
          >
            OS TRÊS ESCOLHIDOS
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {mockProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center"
              >
                <Link 
                  to="/produto/$productId" 
                  params={{ productId: product.id.toString() }}
                  className="relative w-full aspect-[3/4] bg-black overflow-hidden border border-white/5 transition-all duration-700 hover:border-white/20"
                >
                  {/* Front Image */}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                  />
                  {/* Back Image (Hover) */}
                  {product.backImage && (
                    <img 
                      src={product.backImage} 
                      alt={`${product.name} back`} 
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-105"
                    />
                  )}
                  {/* Mobile Toggle Logic (handled by hover classes in modern mobile browsers or we can add a simple tap handler if needed, but the requirement was smooth zoom/glow) */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-t from-white/10 to-transparent transition-opacity duration-700" />
                </Link>
                
                <div className="mt-6 text-center space-y-2">
                  <h3 className="font-madness text-xl tracking-widest text-white">{product.name}</h3>
                  <p className="text-zinc-500 text-[9px] tracking-[0.3em] uppercase">{product.category}</p>
                  <p className="text-white text-xs font-bold tracking-widest pt-2">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DROP 001 - MEMENTO MORI (Narrative Layout) */}
      <div className="space-y-0">
        <section className="relative w-full h-[60vh] flex flex-col items-center justify-center bg-black border-t border-zinc-900/50">
          <div className="text-center space-y-4 px-4">
            <h2 className="text-zinc-600 tracking-[0.5em] text-[10px] uppercase font-bold">LIMITED RELEASE</h2>
            <p className="text-zinc-500 text-sm italic font-light max-w-md mx-auto">
              Estes são os únicos artefatos disponíveis do Drop 001. Uma coleção forjada para aqueles que não aceitam a mediocridade.
            </p>
          </div>
        </section>
      </div>

      {/* 7. KIT MEMENTO MORI */}
      <section className="relative min-h-screen flex items-center justify-center py-32 bg-zinc-950 border-t border-zinc-900">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="max-w-4xl w-full px-6 flex flex-col items-center text-center space-y-16"
        >
          <div className="space-y-6">
            <h2 className="text-5xl md:text-8xl font-madness text-white tracking-tighter">KIT MEMENTO MORI</h2>
            <div className="space-y-2">
              <p className="text-zinc-500 tracking-[0.4em] text-[10px] md:text-xs uppercase">As três peças. Uma identidade. Um único Drop.</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              <span className="text-zinc-700 line-through text-2xl font-light tracking-widest">{mockBundle.originalPrice}</span>
              <span className="text-white text-5xl md:text-6xl font-black tracking-tighter">{mockBundle.price}</span>
            </div>
            <span className="text-red-900 text-[10px] font-bold tracking-[0.5em] uppercase">ECONOMIA DE R$ 100,00</span>
          </div>

          <button 
            onClick={handleAddBundle}
            className="w-full md:w-auto bg-white text-black px-16 py-6 text-[10px] font-black uppercase tracking-[0.5em] transition-all hover:bg-transparent hover:text-white border border-white"
          >
            OBTER O KIT COMPLETO
          </button>
        </motion.div>
      </section>

      {/* 8. COMUNIDADE */}
      <section className="py-40 bg-black flex flex-col items-center justify-center text-center px-6 border-t border-zinc-900/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-xl space-y-10"
        >
          <h2 className="text-white text-xs font-bold tracking-[0.5em] uppercase">COMUNIDADE</h2>
          <p className="text-zinc-500 text-sm md:text-base font-light tracking-wide leading-relaxed">
            "Os primeiros membros estão chegando. O Drop 001 marca o início da Arcane."
          </p>
          <button className="text-[9px] font-bold tracking-[0.5em] text-white uppercase border-b border-white pb-1 hover:text-zinc-400 transition-colors">
            ENTRAR PARA A COMUNIDADE
          </button>
        </motion.div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-black py-20 px-6 border-t border-zinc-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="font-madness text-3xl text-white tracking-widest">ARCANE</span>
            <p className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase">MEMENTO MORI © 2026</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-8 text-[9px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
            <Link to="/manifesto" className="hover:text-white transition-colors">Manifesto</Link>
            <span className="text-zinc-800 cursor-default" title="Forging the next drop.">Oversized</span>
            <span className="text-zinc-800 cursor-default" title="Forging the next drop.">Hoodies</span>
            <span className="text-zinc-800 cursor-default" title="Forging the next drop.">Pants</span>
            <Link to="/medidas" className="hover:text-white transition-colors">Medidas</Link>
            <Link to="/envios" className="hover:text-white transition-colors">Envios</Link>
            <a href="https://wa.me/5521965226593" target="_blank" rel="noopener" className="hover:text-white transition-colors">Suporte</a>
          </nav>

          <div className="flex items-center gap-6">
            <a 
              href="https://wa.me/5521965226593" 
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <Phone size={16} />
            </a>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating (Hidden on desktop if preferred, but keeping discrete) */}
      <a 
        href="https://wa.me/5521965226593" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-zinc-900/50 backdrop-blur-md text-white/50 p-4 rounded-full border border-white/5 hover:text-white hover:border-white/20 transition-all duration-300"
      >
        <Phone size={20} />
      </a>
    </div>
  );
}

