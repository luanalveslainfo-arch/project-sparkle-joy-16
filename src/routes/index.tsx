import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { HeroParticles } from "@/components/HeroParticles";
import { mockProducts } from "@/lib/products-data";
import { useCartStore } from "@/lib/cart-store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { addToCart } = useCartStore();

  const scrollToManifesto = () => {
    const manifesto = document.getElementById('manifesto');
    if (manifesto) {
      manifesto.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-black text-white selection:bg-red-900/30 overflow-x-hidden">
      {/* 1. HERO */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <HeroParticles />
        <img 
          src="/hero.png" 
          alt="Memento Mori" 
          className="absolute inset-0 w-full h-full object-cover object-top z-0 opacity-60 brightness-125 contrast-110 saturate-110 grayscale-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black z-10" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 flex flex-col items-center text-center px-4"
        >
          <h1 className="text-[14vw] md:text-[9rem] font-madness tracking-tighter leading-none mb-4 text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            ARCANE
          </h1>
          <p className="text-zinc-300 tracking-[0.9em] uppercase text-[12px] md:text-sm mb-14 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            MEMENTO MORI
          </p>
          <button 
            onClick={scrollToManifesto}
            className="border border-white/20 bg-white/5 backdrop-blur-md text-white px-14 py-6 text-[11px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-white hover:text-black hover:border-white hover:scale-105 active:scale-95 duration-500 cursor-pointer"
          >
            LER O MANIFESTO
          </button>
        </motion.div>
      </section>

      {/* 2. MANIFESTO */}
      <section id="manifesto" className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-32 text-center bg-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl space-y-12"
        >
          <div className="space-y-10">
            <p className="text-zinc-300 text-base md:text-lg tracking-wide leading-relaxed font-light italic">
              Ninguém nasce disciplinado. A disciplina não é uma herança, é uma conquista diária. Alguns escolhem o caminho do conforto, outros escolhem a resistência.
            </p>
            <p className="text-zinc-300 text-base md:text-lg tracking-wide leading-relaxed font-light italic">
              A Arcane existe para aqueles que decidiram atravessar a escuridão. Para aqueles que entendem que o silêncio é a nossa ferramenta mais poderosa e o sacrifício é o preço do nosso domínio.
            </p>
            <p className="text-zinc-300 text-base md:text-lg tracking-wide leading-relaxed font-light italic">
              Não somos uma marca. Somos um lembrete constante de que o tempo é limitado e o legado é a única coisa que perdura. Memento Mori.
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

      {/* 3. OS TRÊS ESCOLHIDOS */}
      <section className="py-32 bg-black border-t border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] tracking-[0.6em] text-zinc-600 uppercase font-bold text-center mb-24"
          >
            OS TRÊS ESCOLHIDOS
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-8 lg:gap-16">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. ARCANE CODE */}
      <section className="py-40 bg-zinc-950 border-t border-zinc-900/50">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-16">
          <h2 className="text-[10px] tracking-[0.6em] text-zinc-600 uppercase font-bold">THE ARCANE CODE</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {["Discipline.", "Silence.", "Sacrifice.", "Consistency.", "Memento Mori."].map((item, i) => (
              <div key={i} className="text-white text-sm font-light tracking-widest">
                ☩ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-black py-20 px-6 border-t border-zinc-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="font-madness text-3xl text-white tracking-widest">ARCANE</span>
            <p className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase">MEMENTO MORI © 2026</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-8 text-[9px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
            <Link to="/manifesto" className="hover:text-white transition-colors">Manifesto</Link>
            <span className="text-zinc-800">Forging...</span>
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
    </div>
  );
}
