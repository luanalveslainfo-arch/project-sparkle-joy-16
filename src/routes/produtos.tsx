import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useCartStore } from "@/lib/cart-store";

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

  const products = useMemo(() => ({
    arcane: [
      { id: 1, name: "COMPRESSION VEIN", price: "R$ 189,90", priceNumber: 189.90, installments: "12x de R$ 15,82", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2158?q=80&w=800" },
      { id: 2, name: "ANGELIC BLADE", price: "R$ 179,90", priceNumber: 179.90, installments: "12x de R$ 14,99", image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=800" },
      { id: 7, name: "SHADOW FABRIC", price: "R$ 149,90", priceNumber: 149.90, installments: "12x de R$ 12,49", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800" },
      { id: 8, name: "DARK TEXTURE", price: "R$ 159,90", priceNumber: 159.90, installments: "12x de R$ 13,32", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800" }
    ],
    oversized: [
      { id: 3, name: "GOTHIC CROSS", price: "R$ 159,90", priceNumber: 159.90, installments: "12x de R$ 13,32", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800" },
      { id: 4, name: "FALLEN ANGEL", price: "R$ 165,90", priceNumber: 165.90, installments: "12x de R$ 13,82", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800" },
      { id: 9, name: "OBSIDIAN OVER", price: "R$ 175,90", priceNumber: 175.90, installments: "12x de R$ 14,65", image: "https://images.unsplash.com/photo-1571945153237-4929e783ab4a?q=80&w=800" },
      { id: 10, name: "PHANTOM RELIC", price: "R$ 169,90", priceNumber: 169.90, installments: "12x de R$ 14,15", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800" }
    ],
    sweatshirts: [
      { id: 5, name: "ZIP-UP GOTHIC", price: "R$ 289,90", priceNumber: 289.90, installments: "12x de R$ 24,15", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800" },
      { id: 6, name: "TRIBAL BAGGY", price: "R$ 219,90", priceNumber: 219.90, installments: "12x de R$ 18,32", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800" },
      { id: 11, name: "VOID HOODIE", price: "R$ 299,90", priceNumber: 299.90, installments: "12x de R$ 24,99", image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=800" },
      { id: 12, name: "STATIC CARGO", price: "R$ 249,90", priceNumber: 249.90, installments: "12x de R$ 20,82", image: "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?q=80&w=800" }
    ]
  }), []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 px-4 md:px-8 pb-20" style={{ fontFamily: THEME.FONTS.SANS }}>
      <header className="mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-widest uppercase mb-4" style={{ fontFamily: THEME.FONTS.DISPLAY }}>NOSSAS PEÇAS</h1>
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">O arsenal para sua disciplina</p>
      </header>

      <div className="max-w-7xl mx-auto space-y-32">
        {Object.entries(products).map(([category, items]) => (
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
