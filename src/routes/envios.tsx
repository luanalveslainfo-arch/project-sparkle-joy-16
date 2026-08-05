import { createFileRoute } from "@tanstack/react-router";
import { useCartStore } from "@/lib/cart-store";

export const Route = createFileRoute("/envios")({
  component: Envios,
});

const THEME = {
  FONTS: {
    DISPLAY: "'Almendra Display', serif",
    SANS: "'Outfit', sans-serif",
  },
};

function Envios() {
  const { isCartOpen } = useCartStore();

  return (
    <div className={`min-h-screen bg-black selection:bg-[#8B0000]/30 overflow-x-hidden ${isCartOpen ? 'overflow-hidden' : ''}`}>
      <main className="max-w-3xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
        {/* Title */}
        <h1 
          className="text-4xl md:text-6xl uppercase tracking-tighter leading-tight mb-16 font-black text-white" 
          style={{ fontFamily: THEME.FONTS.DISPLAY }}
        >
          PRAZOS E <span className="text-[#8B0000]">ENVIOS</span>
        </h1>

        {/* Content */}
        <div className="space-y-12 mb-20">
          <div className="bg-zinc-950/50 border border-zinc-900 p-10 rounded-sm space-y-8">
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light tracking-wide">
              "Nosso arsenal é forjado internacionalmente. O tempo de processamento é de 1 a 3 dias úteis. O prazo de entrega estimado para o Brasil é de 7 a 15 dias úteis. Todas as remessas possuem código de rastreio enviado diretamente para o seu e-mail."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] border-b border-zinc-800 pb-2">PROCESSAMENTO</h4>
              <p className="text-zinc-400 text-xs uppercase tracking-widest leading-relaxed">
                Cada pedido é verificado individualmente para garantir a qualidade suprema do tecido e da estampa antes de deixar o quartel-general.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] border-b border-zinc-800 pb-2">RASTREAMENTO</h4>
              <p className="text-zinc-400 text-xs uppercase tracking-widest leading-relaxed">
                Você receberá o código em até 72h após o envio. O rastreio pode ser acompanhado diretamente pelo site dos Correios.
              </p>
            </div>
          </div>
        </div>
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