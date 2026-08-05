import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { X, Minus, Plus, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/produto/$productId")({
  component: ProductDetail,
});

interface Product {
  id: number;
  name: string;
  price: string;
  priceNumber: number;
  installments: string;
  image: string;
  backImage?: string;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string | undefined;
}

const THEME = {
  FONTS: {
    DISPLAY: "'Almendra Display', serif",
    SANS: "'Outfit', sans-serif",
  },
  COLORS: {
    PRIMARY: "#8B0000",
  }
};

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

function ProductDetail() {
  const { productId } = Route.useParams();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["P", "M", "G", "GG"];

  // Mock product data (matching index.tsx)
  const product: Product = {
    id: Number(productId),
    name: "CAMISA DE COMPRESSÃO MEMENTO MORI",
    price: "R$ 189,90",
    priceNumber: 189.9,
    installments: "12x de R$ 15,82",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2158?q=80&w=800",
  };

  // Function to add to cart (this would normally be in a Context or global state)
  // For now, we simulate the interaction by showing the toast
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Por favor, selecione um tamanho.");
      return;
    }
    
    // In a real app, this would dispatch to a store
    toast.success(`🩸 ${product.name} adicionado ao arsenal.`);
    
    // Trigger cart drawer - this would require a global state
    // For this implementation, we assume the user will handle the state management
    // but we provide the visual feedback
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4 md:px-8" style={{ fontFamily: THEME.FONTS.SANS }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Photos */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/4] bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="aspect-[3/4] bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
             <span className="text-[10px] uppercase tracking-widest text-zinc-600">Imagem do Produto</span>
          </div>
          <div className="aspect-[3/4] bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
             <span className="text-[10px] uppercase tracking-widest text-zinc-600">Imagem do Produto</span>
          </div>
        </div>

        {/* Right Column: Info & Checkout */}
        <div className="lg:sticky lg:top-24 h-fit space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-black tracking-widest leading-tight uppercase" style={{ fontFamily: THEME.FONTS.DISPLAY }}>
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
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Selecione o Tamanho</span>
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

          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98]"
          >
            ADICIONAR AO CARRINHO
          </button>

          <div className="pt-8">
            <Accordion title="Descrição da Peça">
              Concebida para a elite. Tecido de alta compressão que esculpe o corpo enquanto permite máxima mobilidade. Estampa gótica exclusiva em serigrafia de alta densidade. Durabilidade extrema para treinos intensos.
            </Accordion>
            <Accordion title="Tabela de Medidas">
              P: Altura 68cm | Largura 48cm<br />
              M: Altura 70cm | Largura 50cm<br />
              G: Altura 72cm | Largura 52cm<br />
              GG: Altura 74cm | Largura 54cm
            </Accordion>
            <Accordion title="Envios e Prazos">
              Despacho em até 48h úteis após confirmação do pagamento. Entrega via Sedex ou Transportadora Premium. Rastreamento em tempo real disponível.
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
