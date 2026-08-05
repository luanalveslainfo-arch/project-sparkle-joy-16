import { createFileRoute } from "@tanstack/react-router";
import heroAsset from "@/assets/hero-bg.png.asset.json";
import { Search, ShoppingBag, User, Menu, Mail, Instagram, Twitter, X, Phone, MessageSquare, Truck, Shield, Star, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
  errorComponent: ({ error }) => {
    console.error("Index route error:", error);
    return <div className="p-4 text-red-500">Erro ao carregar a página principal.</div>;
  },
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




const STORAGE_KEYS = {
  MODAL_SHOWN: 'arcane_modal_shown_v1',
};

const THEME = {
  FONTS: {
    DISPLAY: "'Almendra Display', serif",
    SANS: "'Outfit', sans-serif",
  },
  COLORS: {
    PRIMARY: "#8B0000",
  }
};

function Index() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);


  const products = useMemo(() => ({
    arcane: [
      { id: 1, name: "COMPRESSION VEIN", price: "R$ 189,90", priceNumber: 189.90, installments: "12x de R$ 15,82", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2158?q=80&w=800", backImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800" },
      { id: 2, name: "ANGELIC BLADE", price: "R$ 179,90", priceNumber: 179.90, installments: "12x de R$ 14,99", image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=800", backImage: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800" },
      { id: 7, name: "SHADOW FABRIC", price: "R$ 149,90", priceNumber: 149.90, installments: "12x de R$ 12,49", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800" },
      { id: 8, name: "DARK TEXTURE", price: "R$ 159,90", priceNumber: 159.90, installments: "12x de R$ 13,32", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800" }
    ] as Product[],
    oversized: [
      { id: 3, name: "GOTHIC CROSS", price: "R$ 159,90", priceNumber: 159.90, installments: "12x de R$ 13,32", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800", backImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800" },
      { id: 4, name: "FALLEN ANGEL", price: "R$ 165,90", priceNumber: 165.90, installments: "12x de R$ 13,82", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800" },
      { id: 9, name: "OBSIDIAN OVER", price: "R$ 175,90", priceNumber: 175.90, installments: "12x de R$ 14,65", image: "https://images.unsplash.com/photo-1571945153237-4929e783ab4a?q=80&w=800" },
      { id: 10, name: "PHANTOM RELIC", price: "R$ 169,90", priceNumber: 169.90, installments: "12x de R$ 14,15", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800" }
    ] as Product[],
    sweatshirts: [
      { id: 5, name: "ZIP-UP GOTHIC", price: "R$ 289,90", priceNumber: 289.90, installments: "12x de R$ 24,15", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800" },
      { id: 6, name: "TRIBAL BAGGY", price: "R$ 219,90", priceNumber: 219.90, installments: "12x de R$ 18,32", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800" },
      { id: 11, name: "VOID HOODIE", price: "R$ 299,90", priceNumber: 299.90, installments: "12x de R$ 24,99", image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=800" },
      { id: 12, name: "STATIC CARGO", price: "R$ 249,90", priceNumber: 249.90, installments: "12x de R$ 20,82", image: "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?q=80&w=800" }
    ] as Product[]
  }), []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    try {
      const hasShownModal = localStorage.getItem(STORAGE_KEYS.MODAL_SHOWN);
      if (!hasShownModal) {
        timer = setTimeout(() => setShowModal(true), 1500);
      }
    } catch (e) {
      console.error("LocalStorage access error:", e);
      timer = setTimeout(() => setShowModal(true), 1500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    try {
      localStorage.setItem(STORAGE_KEYS.MODAL_SHOWN, 'true');
    } catch (e) {
      console.warn("Could not save modal state to localStorage", e);
    }
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Inscrição realizada com sucesso! Bem-vindo ao coven.");
      setEmail("");
    } catch (error) {
      toast.error("Erro ao realizar inscrição. Tente novamente.");
      console.error("Newsletter error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addToCart = useCallback((product: Product, size?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    
    setIsCartOpen(true);
    
    toast(`🩸 Item adicionado ao seu arsenal.`, {
      description: `${product.name}${size ? ` - Tamanho: ${size}` : ''}`,
      className: "bg-[#0a0a0a] text-white border-l-4 border-[#8B0000] rounded-none shadow-2xl",
      duration: 3000,
    });
  }, []);

  const removeFromCart = useCallback((id: number, size?: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  }, []);

  const updateQuantity = useCallback((id: number, size: string | undefined, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const cartTotal = useMemo(() => 
    cart.reduce((acc, item) => acc + (item.priceNumber * item.quantity), 0)
  , [cart]);

  const FREE_SHIPPING_THRESHOLD = 299;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const freeShippingProgress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className={`min-h-screen bg-[#000000] text-foreground selection:bg-primary/30 overflow-x-hidden ${isCartOpen ? 'overflow-hidden' : ''}`} style={{ fontFamily: THEME.FONTS.SANS }}>
      {/* Cart Drawer */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
        />
      )}
      
      <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-[70] flex flex-col transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Cart Header */}
        <div className="p-6 border-b border-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-sans text-lg font-bold tracking-widest text-white uppercase">SEU CARRINHO</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-zinc-400 hover:text-white p-1"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Free Shipping Progress */}
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-zinc-400">
              {remainingForFreeShipping > 0 
                ? `Faltam R$ ${remainingForFreeShipping.toFixed(2).replace('.', ',')} para Frete Grátis`
                : "Você ganhou Frete Grátis! 🩸"}
            </p>
            <div className="h-1 bg-zinc-800 w-full rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 gap-4 opacity-50">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-[10px] uppercase tracking-[0.2em]">Seu arsenal está vazio</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}-${idx}`} className="flex gap-4 group">
                {/* Product Image Placeholder */}
                <div className="w-20 h-24 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center text-[8px] uppercase text-zinc-600 text-center px-1 leading-tight">
                  IMAGEM EM BREVE
                </div>
                
                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">{item.name}</h3>
                    {item.selectedSize && (
                      <p className="text-[10px] text-zinc-400 uppercase mt-1">Tamanho: {item.selectedSize}</p>
                    )}
                    <p className="text-xs font-bold text-white mt-1">{item.price}</p>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-zinc-800 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center text-xs text-white border-x border-zinc-800 font-bold">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-zinc-500 hover:text-[#8B0000] transition-colors p-2"
                      aria-label="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-zinc-900 bg-zinc-950">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-zinc-400">Subtotal</span>
              <span className="text-lg font-bold text-white">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2 mb-6 text-center uppercase tracking-wider italic">
              Frete calculado no checkout
            </p>
            <button className="w-full bg-white text-black hover:bg-zinc-200 transition-colors py-4 font-bold tracking-[0.2em] text-xs uppercase">
              FINALIZAR COMPRA
            </button>
          </div>
        )}
      </div>

      <header className="fixed top-0 left-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 p-4 flex items-center justify-between transition-all duration-300">

        <div className="flex items-center gap-6">
          <button 
            className="cursor-pointer md:hidden text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu />
          </button>
          <nav className="hidden md:flex gap-6 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            <a href="#" className="hover:text-[#8B0000] transition-colors duration-300">Home</a>
            <a href="#" className="hover:text-[#8B0000] transition-colors duration-300">Produtos</a>
          </nav>
        </div>
        <h1 className="text-3xl md:text-4xl absolute left-1/2 -translate-x-1/2 select-none tracking-widest font-black" style={{ fontFamily: THEME.FONTS.DISPLAY }}>ARCANE</h1>
        <div className="flex items-center gap-5">
          <button 
            aria-label="Carrinho" 
            className="relative group"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="text-zinc-400 hover:text-white w-4 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-[#8B0000] text-[8px] px-1 rounded-full text-white">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: `url(${heroAsset.url})` }}>
        <div className="absolute inset-0 bg-black/80 z-0" />
        <div className="relative text-center z-10 px-4 flex flex-col items-center">
          <h2 className="text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6 font-black" style={{ fontFamily: THEME.FONTS.DISPLAY }}>
            MEMENTO <br /> <span className="text-[#8B0000] drop-shadow-[0_0_40px_rgba(139,0,0,0.4)]">MORI</span>
          </h2>
          <p className="text-zinc-200 tracking-[0.5em] uppercase text-[10px] md:text-xs max-w-xl mx-auto font-light mb-10">
            BEYOND THE SHADOWS OF MORTALITY LIES THE PATH OF DISCIPLINE
          </p>
          <button className="bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] mt-8">
            EXPLORAR A COLEÇÃO
          </button>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-zinc-950 border-y border-zinc-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck size={20} className="text-zinc-400" />
              <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">FRETE GRÁTIS ACIMA DE R$299</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield size={20} className="text-zinc-400" />
              <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">COMPRA 100% SEGURA</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star size={20} className="text-zinc-400" />
              <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">QUALIDADE PREMIUM GARANTIDA</span>
            </div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {Object.entries(products).map(([category, items]) => (
          <section key={category} className="py-20 md:py-32">
            <div className="flex items-center justify-center mb-10 border-b border-zinc-800 pb-8">
              <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-[0.2em] uppercase text-white mb-8 text-center">
                {category === 'arcane' ? 'Drop Arcano' : category === 'oversized' ? 'Camisas Oversized' : 'Moletons e Calças'}
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />

      <a 
        href="https://wa.me/5511999999999" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
        aria-label="Contato WhatsApp"
      >
        <Phone size={24} fill="currentColor" />
      </a>
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: Product, onAdd: (product: Product, size?: string) => void }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["P", "M", "G", "GG"];

  return (
    <div className="group flex flex-col items-start text-left">
      <div className="relative w-full aspect-[3/4] bg-zinc-950 flex items-center justify-center overflow-hidden mb-4 rounded-sm">
        <span className="text-xs text-zinc-800 font-sans tracking-widest uppercase">Imagem em breve</span>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center 
          opacity-0 md:group-hover:opacity-100 
          max-md:relative max-md:opacity-100 max-md:bg-transparent max-md:backdrop-blur-none max-md:p-0 max-md:mt-4
          transition-all duration-500 ease-out p-4">
          
          <div className="flex flex-row flex-wrap justify-center max-md:justify-start">
            {sizes.map(size => (
              <button
                key={size}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                className={`border transition-colors w-10 h-10 flex items-center justify-center font-sans text-sm m-1 ${selectedSize === size ? "bg-white text-black border-white" : "border-zinc-600 bg-transparent text-white hover:bg-white hover:text-black"}`}
              >
                {size}
              </button>
            ))}
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(product.name, selectedSize || undefined); }}
            className="w-full bg-zinc-900 text-white border border-zinc-700 font-sans font-bold uppercase py-3 mt-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-xs tracking-wider"
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

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 pt-16 pb-12 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          {/* Column 1 */}
          <div className="space-y-6">
            <h2 className="text-4xl select-none tracking-widest font-black uppercase" style={{ fontFamily: THEME.FONTS.DISPLAY }}>ARCANE</h2>
            <p className="text-zinc-500 text-xs uppercase tracking-widest leading-relaxed max-w-xs">
              Beyond the shadows of mortality lies the path of discipline.
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Links Úteis</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest text-zinc-400">
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Rastrear Pedido</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Trocas e Devoluções</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Termos de Serviço</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">JUNTE-SE À SEITA</h4>
            <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center border-b border-zinc-600 pb-2 focus-within:border-white transition-colors duration-300 w-full md:w-2/3">
                <input 
                  type="email" 
                  placeholder="SEU MELHOR E-MAIL" 
                  className="bg-transparent w-full text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-0 border-none p-0 tracking-widest"
                />
                <button className="text-xs font-bold tracking-widest uppercase text-white hover:text-zinc-400 transition-colors bg-transparent border-none p-0 ml-4 whitespace-nowrap">
                  ASSINAR
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-10 text-center">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">© 2024 Arcane. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
