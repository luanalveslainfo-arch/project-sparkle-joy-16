import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useCartStore } from "@/lib/cart-store";
import { mockProducts } from "@/lib/products-data";

export const Route = createFileRoute("/produtos")({
  component: ProdutosPage,
});

const THEME = {
  FONTS: {
    DISPLAY: "'Almendra Display', serif",
    SANS: "'Outfit', sans-serif",
  },
};

function ProdutosPage() {
  const { addToCart } = useCartStore();

  const productsByCategory = useMemo(() => {
    return {
      arcane: mockProducts.filter(p => p.category === 'arcane'),
      oversized: mockProducts.filter(p => p.category === 'oversized'),
      sweatshirts: mockProducts.filter(p => p.category === 'sweatshirts'),
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 px-4 md:px-8 pb-20" style={{ fontFamily: THEME.FONTS.SANS }}>
      <header className="mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-widest uppercase mb-4" style={{ fontFamily: THEME.FONTS.DISPLAY }}>NOSSAS PEÇAS</h1>
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">O arsenal para sua disciplina</p>
      </header>

      <div className="max-w-7xl mx-auto space-y-32">
        {Object.entries(productsByCategory).map(([category, items]) => (
          <section key={category}>
            <div className="flex items-center justify-center mb-10 border-b border-zinc-900 pb-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-white">
                {category === 'arcane' ? 'Drop Arcano' : category === 'oversized' ? 'Camisas Oversized' : 'Moletons e Calças'}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {items.map((p) => (
                <div key={p.id} className="relative z-10 group">
                  <Link to="/produto/$productId" params={{ productId: p.id.toString() }} className="block cursor-pointer">
                    <div className="aspect-[3/4] bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden mb-4 rounded-sm">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">{p.name}</h3>
                    <p className="text-base font-semibold text-white mt-1">{p.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      
      {/* Voltar para Home */}
      <div className="mt-24 text-center">
        <Link to="/" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Voltar para a página inicial</Link>
      </div>
    </div>
  );
}
