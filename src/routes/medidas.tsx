import { createFileRoute } from "@tanstack/react-router";
import { useCartStore } from "@/lib/cart-store";

export const Route = createFileRoute("/medidas")({
  component: Medidas,
});

const THEME = {
  FONTS: {
    DISPLAY: "'Almendra Display', serif",
    SANS: "'Outfit', sans-serif",
  },
};

function Medidas() {
  const { isCartOpen } = useCartStore();

  return (
    <div className={`min-h-screen bg-black selection:bg-[#8B0000]/30 overflow-x-hidden ${isCartOpen ? 'overflow-hidden' : ''}`}>
      <main className="max-w-4xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center">
        {/* Title */}
        <h1 
          className="text-4xl md:text-6xl uppercase tracking-tighter leading-tight mb-16 font-black text-white text-center" 
          style={{ fontFamily: THEME.FONTS.DISPLAY }}
        >
          TABELA DE <span className="text-[#8B0000]">MEDIDAS</span>
        </h1>

        {/* Content */}
        <div className="w-full space-y-12 mb-20">
          <div className="bg-zinc-950/50 border border-zinc-900 p-8 rounded-sm">
            <p className="text-zinc-300 text-lg leading-relaxed font-light tracking-wide text-center">
              "Nossas peças possuem modelagem OVERSIZED e de COMPRESSÃO intencionais. Para o caimento perfeito, escolha seu tamanho habitual. Se busca um visual ainda mais amplo, opte por um tamanho acima."
            </p>
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse border border-zinc-800 text-zinc-300 uppercase tracking-widest text-[10px] md:text-xs">
              <thead>
                <tr className="bg-zinc-900/50">
                  <th className="border border-zinc-800 p-4 text-left">TAMANHO</th>
                  <th className="border border-zinc-800 p-4 text-left">ALTURA (CM)</th>
                  <th className="border border-zinc-800 p-4 text-left">LARGURA (CM)</th>
                  <th className="border border-zinc-800 p-4 text-left">INDICADO PARA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-zinc-800 p-4">P</td>
                  <td className="border border-zinc-800 p-4">72</td>
                  <td className="border border-zinc-800 p-4">56</td>
                  <td className="border border-zinc-800 p-4">ATÉ 1.70M / 70KG</td>
                </tr>
                <tr className="bg-zinc-900/20">
                  <td className="border border-zinc-800 p-4">M</td>
                  <td className="border border-zinc-800 p-4">74</td>
                  <td className="border border-zinc-800 p-4">58</td>
                  <td className="border border-zinc-800 p-4">ATÉ 1.80M / 85KG</td>
                </tr>
                <tr>
                  <td className="border border-zinc-800 p-4">G</td>
                  <td className="border border-zinc-800 p-4">76</td>
                  <td className="border border-zinc-800 p-4">60</td>
                  <td className="border border-zinc-800 p-4">ATÉ 1.90M / 100KG</td>
                </tr>
                <tr className="bg-zinc-900/20">
                  <td className="border border-zinc-800 p-4">GG</td>
                  <td className="border border-zinc-800 p-4">78</td>
                  <td className="border border-zinc-800 p-4">62</td>
                  <td className="border border-zinc-800 p-4">ACIMA DE 1.90M / 100KG+</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest text-center italic">
            * Margem de erro de 2cm para mais ou para menos.
          </p>
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