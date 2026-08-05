import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { toast as sonnerToast } from "sonner";

export const Route = createFileRoute("/manifesto")({
  component: Manifesto,
});

const THEME = {
  FONTS: {
    DISPLAY: "'Almendra Display', serif",
    SANS: "'Outfit', sans-serif",
  },
};

function Manifesto() {
  const { isCartOpen } = useCartStore();

  return (
    <div className={`min-h-screen bg-black selection:bg-[#8B0000]/30 overflow-x-hidden ${isCartOpen ? 'overflow-hidden' : ''}`}>
      <main className="max-w-3xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-tight mb-16 font-black text-white" 
          style={{ fontFamily: THEME.FONTS.DISPLAY }}
        >
          MEMENTO <span className="text-[#8B0000]">MORI</span>
        </motion.h1>

        {/* Content */}
        <div className="space-y-12 mb-20">
          {[
            "A mediocridade é o conforto dos fracos. Na Arcane, acreditamos que o verdadeiro caráter é forjado na escuridão, longe dos aplausos e sob o peso da disciplina implacável.",
            "Memento Mori não é sobre a morte, é sobre a urgência da vida. É lembrar que o tempo escorre pelas mãos e que cada fraqueza que você não domina, dominará você.",
            "Nossas armaduras não são para qualquer um. Elas são feitas para aqueles que abraçam sua própria sombra, que entendem que o caminho para o topo é solitário e que as cicatrizes são as medalhas dos implacáveis."
          ].map((text, i) => (
            <motion.p 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light tracking-wide text-justify md:text-center"
            >
              {text}
            </motion.p>
          ))}
          
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-zinc-200 text-xl md:text-2xl font-bold uppercase tracking-[0.2em] mt-16 italic"
          >
            Vista sua disciplina. Domine seu caos. Bem-vindo à Arcane.
          </motion.p>
        </div>

        {/* Action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link 
            to="/produtos" 
            className="bg-white text-black px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-zinc-200 hover:tracking-[0.3em] active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            FORJAR MEU ARSENAL
          </Link>
        </motion.div>
      </main>

      {/* Aesthetic Divider */}
      <div className="w-full flex justify-center py-20">
        <div className="w-px h-32 bg-gradient-to-b from-zinc-800 to-transparent" />
      </div>

      <Footer />
    </div>
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
          <div className="space-y-6 text-left">
            <h2 className="text-4xl select-none tracking-widest font-black uppercase" style={{ fontFamily: THEME.FONTS.DISPLAY }}>ARCANE</h2>
            <p className="text-zinc-500 text-xs uppercase tracking-widest leading-relaxed max-w-xs">
              Beyond the shadows of mortality lies the path of discipline.
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-6 text-left">
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
          <div className="space-y-6 text-left">
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
