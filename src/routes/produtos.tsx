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
                <div key={p.id} className="relative z-10">
                  <Link 
                    to="/produto/$productId" 
                    params={{ productId: p.id.toString() }} 
                    className="block cursor-pointer relative z-10 pointer-events-auto"
                  >
                    <ProductCard product={p} onAdd={addToCart} />
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

function ProductCard({ product, onAdd }: { product: any, onAdd: (product: any, size?: string) => void }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["P", "M", "G", "GG"];

  return (
    <div className="group flex flex-col items-start text-left relative z-10">
      <div className="relative w-full aspect-[3/4] bg-zinc-950 flex items-center justify-center overflow-hidden mb-4 rounded-sm">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center 
          opacity-0 md:group-hover:opacity-100 
          max-md:relative max-md:opacity-100 max-md:bg-transparent max-md:backdrop-blur-none max-md:p-0 max-md:mt-4
          transition-all duration-500 ease-out p-4">
          
          <div className="flex flex-row flex-wrap justify-center max-md:justify-start">
            {sizes.map(size => (
              <button
                key={size}
                onClick={(e) => { 
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  setSelectedSize(size); 
                }}
                className={`relative z-20 border transition-colors w-10 h-10 flex items-center justify-center font-sans text-sm m-1 cursor-pointer ${selectedSize === size ? "bg-white text-black border-white" : "border-zinc-600 bg-transparent text-white hover:bg-white hover:text-black"}`}
              >
                {size}
              </button>
            ))}
          </div>
          <button 
            onClick={(e) => { 
              e.preventDefault();
              e.stopPropagation(); 
              onAdd(product, selectedSize || undefined); 
            }}
            className="relative z-20 w-full bg-zinc-900 text-white border border-zinc-700 font-sans font-bold uppercase py-3 mt-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-xs tracking-wider cursor-pointer"
          >
            ADICIONAR
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col gap-1 max-md:mt-2">
        <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-zinc-300">{product.name}</h4>
        <span className="text-base font-semibold text-white">{product.price}</span>
      </div>
    </div>
  );
}
