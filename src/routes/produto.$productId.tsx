import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { X, Minus, Plus, ShoppingBag, ChevronDown, ChevronUp, ArrowLeft, Loader2, ShieldCheck, CreditCard, Truck } from "lucide-react";
import { TrustBadges } from "@/components/TrustBadges";

import { useCartStore, type Product } from "@/lib/cart-store";
import { Toaster, toast as sonnerToast } from "sonner";
import { mockProducts } from "@/lib/products-data";

export const Route = createFileRoute("/produto/$productId")({
  component: ProductDetail,
});

// Accordion Component
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:text-zinc-300 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {isOpen && (
        <div className="pb-6 text-[11px] text-zinc-400 leading-relaxed uppercase tracking-wider">
          {children}
        </div>
      )}
    </div>
  );
}

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="aspect-[3/4] bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden group">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 animate-pulse">
          <Loader2 className="w-6 h-6 text-zinc-700 animate-spin" />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

function ProductDetail() {
  const { productId } = Route.useParams();
  const { addToCart, setIsCartOpen } = useCartStore();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["P", "M", "G", "GG"];

  // Force cast to Product since we have a fallback
  const product = useMemo(() => {
    const found = mockProducts.find(p => p.id === Number(productId));
    return (found || mockProducts[0]) as Product;
  }, [productId]);


  const THEME = {
    FONTS: {
      DISPLAY: "'Almendra Display', serif",
      SANS: "'Outfit', sans-serif",
    },
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      sonnerToast.error("Por favor, selecione um tamanho.");
      return;
    }
    
    addToCart(product, selectedSize);
    setIsCartOpen(true);
    
    sonnerToast.success(`🩸 ${product.name} adicionado ao arsenal.`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4 md:px-8" style={{ fontFamily: THEME.FONTS.SANS }}>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 uppercase tracking-widest text-sm relative z-50 pointer-events-auto cursor-pointer"
        >
          ← Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Photos */}
          <div className="w-full">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:flex-col gap-4 pb-4 md:pb-0">
              <div className="min-w-full md:min-w-0 snap-center">
                <ProductImage src={product.image} alt={product.name} />
              </div>
              <div className="min-w-full md:min-w-0 snap-center aspect-[3/4] bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
                 <span className="text-[10px] uppercase tracking-widest text-zinc-700 font-bold">ARCANE VISUALS II</span>
              </div>
              <div className="min-w-full md:min-w-0 snap-center aspect-[3/4] bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
                 <span className="text-[10px] uppercase tracking-widest text-zinc-700 font-bold">ARCANE VISUALS III</span>
              </div>
            </div>
          </div>

          {/* Right Column: Info & Checkout */}
          <div className="lg:sticky lg:top-24 h-fit space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-widest leading-tight uppercase font-sans">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold tracking-wider">{product.price}</span>
                <span className="px-2 py-1 bg-red-950/30 text-red-700 text-[10px] font-bold uppercase tracking-widest border border-red-900/30">
                  7% OFF
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em]">ou {product.installments}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Selecione o Tamanho</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-red-600 animate-pulse">Poucas unidades disponíveis para este drop</span>
              </div>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border text-xs font-bold transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-zinc-800 hover:border-zinc-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full max-md:p-4 max-md:bg-zinc-950/90 max-md:backdrop-blur-md max-md:border-t max-md:border-zinc-900 max-md:z-50">
              <button
                onClick={handleAddToCart}
                className="relative z-50 pointer-events-auto cursor-pointer w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98]"
              >
                ADICIONAR AO CARRINHO
              </button>
            </div>

            <div className="pt-6 border-t border-zinc-900 bg-zinc-950/50 p-4 rounded-sm">
              <div className="flex items-center justify-between mb-4 text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold border-b border-zinc-900 pb-2">
                <span>Garantias Arcane</span>
                <span className="text-emerald-900">5% OFF NO PIX</span>
              </div>
              <TrustBadges />
            </div>


            <div className="pt-8">
              <Accordion title="Descrição da Peça">
                Concebida para a elite. Tecido de alta compressão que esculpe o corpo enquanto permite máxima mobilidade. Estampa gótica exclusiva em serigrafia de alta densidade. Durabilidade extrema para treinos intensos.
              </Accordion>
              <Accordion title="Tabela de Medidas">
                "Nossas peças possuem modelagem OVERSIZED e de COMPRESSÃO intencionais. Para o caimento perfeito, escolha seu tamanho habitual. Se busca um visual ainda mais amplo, opte por um tamanho acima."
                <div className="mt-4">
                  <Link to="/medidas" className="text-white underline decoration-zinc-700 hover:decoration-white transition-colors">Ver tabela completa</Link>
                </div>
              </Accordion>
              <Accordion title="Envios e Prazos">
                Nosso arsenal é forjado internacionalmente. O tempo de processamento é de 1 a 3 dias úteis. O prazo de entrega estimado para o Brasil é de 7 a 15 dias úteis. Todas as remessas possuem código de rastreio enviado diretamente para o seu e-mail.
                <div className="mt-4">
                  <Link to="/envios" className="text-white underline decoration-zinc-700 hover:decoration-white transition-colors">Mais detalhes sobre envios</Link>
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
