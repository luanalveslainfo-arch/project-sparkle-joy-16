import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { HeroParticles } from "@/components/HeroParticles";
import { mockProducts } from "@/lib/products-data";
import { useCartStore } from "@/lib/cart-store";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { addToCart } = useCartStore();

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
            to="/manifesto" 
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
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col"
              >
                <Link 
                  to="/produto/$productId" 
                  params={{ productId: product.id.toString() }}
                  className="relative w-full aspect-[3/4] bg-zinc-950 overflow-hidden border border-white/5 transition-all duration-700 hover:border-white/20 active:scale-[0.98] tap-highlight-transparent"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 md:group-hover:opacity-0"
                  />
                  {/* Back Image */}
                  {product.backImage && (
                    <img 
                      src={product.backImage} 
                      alt={`${product.name} back`} 
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 scale-110 md:group-hover:opacity-100 md:group-hover:scale-105"
                    />
                  )}
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white text-black px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      Ver detalhes <ChevronRight size={10} />
                    </div>
                  </div>
                </Link>
                
                <div className="mt-8 space-y-3">
                  <h3 className="font-madness text-2xl text-white">{product.name}</h3>
                  <p className="text-zinc-500 text-[9px] tracking-[0.3em] uppercase">{product.category}</p>
                  <p className="text-white text-xs font-bold tracking-widest">{product.price}</p>
                </div>
              </motion.div>
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
