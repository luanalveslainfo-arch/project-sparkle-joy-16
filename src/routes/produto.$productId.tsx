import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { X, Minus, Plus, ShoppingBag, ChevronDown, ChevronUp, ArrowLeft, Loader2, ShieldCheck, CreditCard, Truck } from "lucide-react";
import { TrustBadges } from "@/components/TrustBadges";
import { motion } from "framer-motion";

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
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedSize2, setSelectedSize2] = useState<string | null>(null);
  const [purchaseType, setPurchaseType] = useState<"single" | "combo">("single");
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sizes = ["P", "M", "G", "GG"];
  const totalSlides = 3;

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.offsetWidth;
      const newActiveSlide = Math.round(scrollLeft / width);
      if (newActiveSlide !== activeSlide) {
        setActiveSlide(newActiveSlide);
      }
    }
  }, [activeSlide]);

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
      sonnerToast.error(`Por favor, selecione o tamanho${purchaseType === 'combo' ? ' da 1ª peça' : ''}.`);
      return;
    }

    if (purchaseType === 'combo' && !selectedSize2) {
      sonnerToast.error("Por favor, selecione o tamanho da 2ª peça.");
      return;
    }
    
    if (purchaseType === 'combo') {
      // Add first item
      addToCart(product, selectedSize || undefined, 1);
      // Add second item (might be same ID/size, but addToCart handles it)
      addToCart(product, selectedSize2 || undefined, 1);
    } else {
      addToCart(product, selectedSize || undefined, 1);
    }
    
    setIsCartOpen(true);
    sonnerToast.success(`🩸 ${purchaseType === 'combo' ? 'Combo forjado' : product.name + ' adicionado'} ao arsenal.`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-40 md:pb-20 px-4 md:px-8" style={{ fontFamily: THEME.FONTS.SANS }}>
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
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="relative group/carousel">
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:flex-col gap-4 pb-4 md:pb-0 scroll-smooth"
              >
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
              
              {/* Mobile Carousel Indicators */}
              <div className="flex md:hidden justify-center gap-2 mt-4">
                {[...Array(totalSlides)].map((_, i) => (
                  <div 
                    key={i}
                    className={`h-[2px] transition-all duration-300 ${
                      activeSlide === i ? "w-8 bg-white opacity-100" : "w-4 bg-zinc-800 opacity-50"
                    }`}
                  ></div>
                ))}
              </div>

              {/* Swipe Hint */}
              {activeSlide === 0 && (
                <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 animate-pulse pointer-events-none">
                  <span className="text-[8px] text-white font-bold tracking-widest uppercase vertical-text">DESLIZE</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Info & Checkout */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24 h-fit space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-black tracking-widest leading-tight uppercase font-sans">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold tracking-wider">{product.price}</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">ATÉ 12X S/ JUROS OU PIX</span>
                </div>
                <span className="px-2 py-1 bg-red-950/30 text-red-700 text-[10px] font-bold uppercase tracking-widest border border-red-900/30">
                  7% OFF
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em]">ou {product.installments}</p>
            </div>

            <div className="space-y-8">
              {/* Purchase Type Selector */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Oferta de Drop</span>
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => setPurchaseType("single")}
                    className={`flex items-center justify-between p-4 border transition-all duration-300 rounded-sm ${purchaseType === 'single' ? 'bg-zinc-900 border-red-600 border-2' : 'bg-transparent border-zinc-800 hover:border-zinc-700'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${purchaseType === 'single' ? 'border-red-600' : 'border-zinc-700'}`}>
                        {purchaseType === 'single' && <div className="w-2 h-2 rounded-full bg-red-600" />}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-white">1 UNIDADE</span>
                    </div>
                    <span className="text-xs font-bold text-zinc-400">{product.price}</span>
                  </button>

                  <button 
                    onClick={() => setPurchaseType("combo")}
                    className={`flex items-center justify-between p-4 border transition-all duration-300 rounded-sm ${purchaseType === 'combo' ? 'bg-red-950/30 border-red-600 border-2' : 'bg-transparent border-zinc-800 hover:border-zinc-700'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${purchaseType === 'combo' ? 'border-red-600' : 'border-zinc-700'}`}>
                        {purchaseType === 'combo' && <div className="w-2 h-2 rounded-full bg-red-600" />}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-xs font-bold uppercase tracking-widest text-white">COMBO DUO (2 PEÇAS)</span>
                        <span className="text-[8px] font-black text-red-600 tracking-widest mt-1">[ ECONOMIZE R$ 80 ]</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white">R$ 299,90</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">
                    {purchaseType === 'combo' ? 'Tamanho da 1ª Peça' : 'Selecione o Tamanho'}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-red-600 animate-pulse">Poucas unidades disponíveis</span>
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

              {purchaseType === 'combo' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 pt-4 border-t border-zinc-900"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Tamanho da 2ª Peça</span>
                  <div className="flex gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size + "-2"}
                        onClick={() => setSelectedSize2(size)}
                        className={`w-12 h-12 flex items-center justify-center border text-xs font-bold transition-all duration-300 ${
                          selectedSize2 === size
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-white border-zinc-800 hover:border-zinc-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full max-md:p-4 max-md:bg-zinc-950/95 max-md:backdrop-blur-lg max-md:border-t max-md:border-zinc-900 max-md:z-[100] max-md:shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
              <button
                onClick={handleAddToCart}
                className="relative z-50 pointer-events-auto cursor-pointer w-full bg-white text-black py-4 md:py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98]"
              >
                ADICIONAR AO CARRINHO
              </button>
            </div>

            <div className="pt-4 border-t border-zinc-900">
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
