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
  const [item2Option, setItem2Option] = useState<"same" | "other">("same");
  const [item2Product, setItem2Product] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      const product2 = item2Option === 'other' && item2Product ? item2Product : product;
      
      // We'll add them as a single "Combo" unit or separate units.
      // The user asked to show two pieces separate in the drawer.
      // To ensure the combo price (R$ 299,90), we'll add them with a custom price property.
      
      const comboUnitPrice = 149.95; // 299.90 / 2
      
      addToCart({ ...product, price: "R$ 149,95", priceNumber: 149.95, name: `${product.name} (PEÇA 1)` }, selectedSize || undefined, 1);
      addToCart({ ...product2, price: "R$ 149,95", priceNumber: 149.95, name: `${product2.name} (PEÇA 2)` }, selectedSize2 || undefined, 1);
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
                <div className="min-w-full md:min-w-0 snap-center">
                  <ProductImage src={product.backImage || product.image} alt={`${product.name} back`} />
                </div>
                <div className="min-w-full md:min-w-0 snap-center aspect-[3/4] bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden group">
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                   <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-700 font-bold z-10">MEMENTO MORI</span>
                   <img src={product.image} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-sm scale-110" alt="texture" />
                </div>
              </div>
              
              {/* Mobile Carousel Indicators */}
              <div className="flex md:hidden justify-center gap-3 mt-6">
                {[...Array(totalSlides)].map((_, i) => (
                  <div 
                    key={i}
                    className={`h-[3px] transition-all duration-300 ${
                      activeSlide === i ? "w-10 bg-white opacity-100" : "w-5 bg-zinc-800 opacity-50"
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
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.5em] text-red-800 uppercase block mb-2">DROP 001 | MEMENTO MORI</span>
                <h1 className="text-4xl md:text-6xl font-madness tracking-widest leading-tight text-white uppercase">
                  {product.name}
                </h1>
              </div>
              <div className="space-y-4">
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">{product.category}</p>
                <div className="max-w-md">
                  <p className="text-zinc-300 text-sm leading-relaxed font-light italic">
                    "{product.subtitle || 'Forged for those who refuse mediocrity.'}"
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1 pt-4">
                <span className="text-3xl font-bold tracking-wider">{product.price}</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">ATÉ 12X S/ JUROS OU PIX</span>
              </div>
            </div>

            <div className="space-y-8">
              {/* Purchase Type Selector */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600">SELECIONE SEU PACK</span>
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={() => setPurchaseType("single")}
                    className={`flex items-center justify-between p-6 border transition-all duration-500 ${purchaseType === 'single' ? 'bg-zinc-900 border-white/40' : 'bg-transparent border-zinc-900 hover:border-zinc-800'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${purchaseType === 'single' ? 'border-white' : 'border-zinc-800'}`}>
                        {purchaseType === 'single' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">THE INITIATION (1 UNIT)</span>
                    </div>
                    <span className="text-xs font-bold text-zinc-400">{product.price}</span>
                  </button>

                  <button 
                    onClick={() => setPurchaseType("combo")}
                    className={`flex items-center justify-between p-6 border transition-all duration-500 ${purchaseType === 'combo' ? 'bg-zinc-900 border-red-900/50' : 'bg-transparent border-zinc-900 hover:border-zinc-800'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${purchaseType === 'combo' ? 'border-red-900' : 'border-zinc-800'}`}>
                        {purchaseType === 'combo' && <div className="w-1.5 h-1.5 rounded-full bg-red-900" />}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">ARCANE RITUAL (2 PACK)</span>
                        <span className="text-[8px] font-black text-red-900 tracking-[0.4em] mt-1">SAVE R$ 80 - THE FORGED SET</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white">R$ 299,90</span>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4 pt-4 border-t border-zinc-900">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">
                      {purchaseType === 'combo' ? 'ITEM 1: ' + product.name : 'Selecione o Tamanho'}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-red-600 animate-pulse">Poucas unidades disponíveis</span>
                  </div>
                  <div className="flex gap-4">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-16 h-16 flex items-center justify-center border-2 text-xs font-black transition-all duration-500 ${
                          selectedSize === size
                            ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            : "bg-transparent text-white border-zinc-900 hover:border-zinc-700"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {purchaseType === 'combo' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8 pt-8 border-t border-zinc-900"
                  >
                    <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600">ITEM II: CONFIGURATION</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setItem2Option("same")}
                          className={`flex-1 py-3 text-[9px] uppercase tracking-widest font-bold border transition-all duration-500 ${item2Option === 'same' ? 'bg-zinc-900 border-white/20 text-white' : 'border-zinc-900 text-zinc-600'}`}
                        >
                          Same Model
                        </button>
                        <button 
                          onClick={() => setIsModalOpen(true)}
                          className={`flex-1 py-3 text-[9px] uppercase tracking-widest font-bold border transition-all duration-500 ${item2Option === 'other' ? 'bg-zinc-900 border-white/20 text-white' : 'border-zinc-900 text-zinc-600'}`}
                        >
                          {item2Option === 'other' && item2Product ? item2Product.name : "Select Other"}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600">ITEM II: SIZE</span>
                      <div className="flex gap-4">
                        {sizes.map((size) => (
                          <button
                            key={size + "-2"}
                            onClick={() => setSelectedSize2(size)}
                            className={`w-16 h-16 flex items-center justify-center border-2 text-xs font-black transition-all duration-500 ${
                              selectedSize2 === size
                                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                : "bg-transparent text-white border-zinc-900 hover:border-zinc-700"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="md:relative max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full max-md:p-4 max-md:bg-zinc-950/95 max-md:backdrop-blur-lg max-md:border-t max-md:border-zinc-900 max-md:z-[100] max-md:shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
              <button
                onClick={handleAddToCart}
                className="relative z-50 pointer-events-auto cursor-pointer w-full bg-white text-black py-4 md:py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
              >
                FORJAR DESTINO
              </button>
            </div>


            <div className="pt-8 border-t border-zinc-900">
              <TrustBadges />
            </div>


            <div className="pt-8">
              <Accordion title="SIGNIFICADO & HISTÓRIA">
                <div className="space-y-6">
                  <p className="text-zinc-300 leading-relaxed italic">
                    {product.description || 'Esta peça foi forjada para suportar o peso da sua ambição.'}
                  </p>
                </div>
              </Accordion>
              
              <Accordion title="FORJADA PARA">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-zinc-300 text-[10px] uppercase tracking-widest flex items-center gap-2">✓ Academia</p>
                  <p className="text-zinc-300 text-[10px] uppercase tracking-widest flex items-center gap-2">✓ Lifestyle</p>
                  <p className="text-zinc-300 text-[10px] uppercase tracking-widest flex items-center gap-2">✓ Treino pesado</p>
                  <p className="text-zinc-300 text-[10px] uppercase tracking-widest flex items-center gap-2">✓ Uso diário</p>
                </div>
              </Accordion>

              <Accordion title="THE ARCANE STANDARD">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <p className="text-zinc-300 text-[10px] uppercase tracking-widest flex items-center gap-2">⚔ Costuras reforçadas</p>
                    <p className="text-zinc-300 text-[10px] uppercase tracking-widest flex items-center gap-2">✠ Compressão premium</p>
                    <p className="text-zinc-300 text-[10px] uppercase tracking-widest flex items-center gap-2">⛓ Elasticidade 4-way</p>
                    <p className="text-zinc-300 text-[10px] uppercase tracking-widest flex items-center gap-2">⬛ Tecido respirável</p>
                    <p className="text-zinc-300 text-[10px] uppercase tracking-widest flex items-center gap-2">⚔ Impressão durável</p>
                    <p className="text-zinc-300 text-[10px] uppercase tracking-widest flex items-center gap-2">✠ Treino intenso</p>
                  </div>
                </div>
              </Accordion>

              <Accordion title="Tabela de Medidas">
                <p>Nossas peças possuem modelagem OVERSIZED e de COMPRESSÃO intencionais. Para o caimento perfeito, escolha seu tamanho habitual. Se busca um visual ainda mais amplo, opte por um tamanho acima.</p>
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

              <Accordion title="THE ARCANE CODE">
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold italic leading-relaxed">
                  "Você não compra uma ARCANE para parecer forte. Você compra porque decidiu se tornar alguém que não recua."
                </div>
              </Accordion>

              <div className="pt-12 pb-8 border-t border-zinc-900 text-center">
                <p className="text-zinc-600 text-[9px] md:text-[10px] uppercase tracking-[0.4em] leading-relaxed italic max-w-sm mx-auto opacity-50">
                  ✠ ARCANE MEMENTO MORI ✠
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Compact Modal for Item 2 selection */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-zinc-950 border border-zinc-800 w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 rounded-sm space-y-6"
          >
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <h2 className="text-sm font-black uppercase tracking-widest">Escolher 2ª Peça</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {mockProducts.filter(p => p.id !== product.id).map((p) => (
                <button 
                  key={p.id}
                  onClick={() => {
                    setItem2Product(p as Product);
                    setItem2Option("other");
                    // Delay slightly for visual feedback on mobile
                    setTimeout(() => setIsModalOpen(false), 200);
                  }}
                  className={`group space-y-3 text-left p-2 transition-all duration-300 ${item2Product?.id === p.id ? 'bg-zinc-900 ring-1 ring-white/20' : ''}`}
                >
                  <div className={`aspect-[3/4] overflow-hidden border transition-all duration-500 ${item2Product?.id === p.id ? 'border-white' : 'border-zinc-900 group-hover:border-white'}`}>
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className={`w-full h-full object-cover transition-all duration-500 ${item2Product?.id === p.id ? 'scale-105' : 'group-hover:scale-105'}`} 
                    />
                  </div>
                  <div className="space-y-1">
                    <p className={`text-[9px] uppercase font-bold tracking-[0.2em] transition-colors ${item2Product?.id === p.id ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>{p.name}</p>
                    <p className="text-[8px] uppercase tracking-widest text-zinc-500">{p.colorLabel}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
