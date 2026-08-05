import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
    <div className="pb-20 px-4 md:px-8">
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
      </div>
      
      {/* Voltar para Home */}
      <div className="mt-24 text-center">
        <Link to="/" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Voltar para a página inicial</Link>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
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
