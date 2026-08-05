import { createFileRoute, Link } from "@tanstack/react-router";
import { useCartStore } from "@/lib/cart-store";

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
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-tight mb-16 font-black text-white" 
          style={{ fontFamily: THEME.FONTS.DISPLAY }}
        >
          MEMENTO <span className="text-[#8B0000]">MORI</span>
        </h1>

        {/* Content */}
        <div className="space-y-12 mb-20">
          <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light tracking-wide text-justify md:text-center">
            A mediocridade é o conforto dos fracos. Na Arcane, acreditamos que o verdadeiro caráter é forjado na escuridão, longe dos aplausos e sob o peso da disciplina implacável.
          </p>
          
          <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light tracking-wide text-justify md:text-center">
            Memento Mori não é sobre a morte, é sobre a urgência da vida. É lembrar que o tempo escorre pelas mãos e que cada fraqueza que você não domina, dominará você.
          </p>
          
          <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light tracking-wide text-justify md:text-center">
            Nossas armaduras não são para qualquer um. Elas são feitas para aqueles que abraçam sua própria sombra, que entendem que o caminho para o topo é solitário e que as cicatrizes são as medalhas dos implacáveis.
          </p>
          
          <p className="text-zinc-200 text-xl md:text-2xl font-bold uppercase tracking-[0.2em] mt-16 italic">
            Vista sua disciplina. Domine seu caos. Bem-vindo à Arcane.
          </p>
        </div>

        {/* Action */}
        <Link 
          to="/produtos" 
          className="bg-white text-black px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-zinc-200 hover:tracking-[0.3em] active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          FORJAR MEU ARSENAL
        </Link>
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
  return (
    <footer className="bg-black border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl select-none tracking-widest font-black uppercase mb-8" style={{ fontFamily: THEME.FONTS.DISPLAY }}>ARCANE</h2>
        <p className="text-xs text-zinc-600 uppercase tracking-widest italic">Est. 2024 — Beyond the shadows</p>
      </div>
    </footer>
  );
}
