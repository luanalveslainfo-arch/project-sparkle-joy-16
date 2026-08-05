import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { ProductSkeleton } from "@/components/Skeleton";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { mockProducts } from "@/lib/products-data";
import { ProductCard } from "@/components/ProductCard";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center mb-10 border-b border-zinc-900 pb-8"
            >
              <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-white">
                {category === 'arcane' ? 'Drop Arcane' : category === 'oversized' ? 'Camisas Oversized' : 'Moletons e Calças'}
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
                : items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))
              }
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

// ProductCard removed and moved to src/components/ProductCard.tsx
