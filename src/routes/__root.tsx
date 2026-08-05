import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, type ReactNode, useState, useCallback, useRef } from "react";
import { X, ShoppingBag, Minus, Plus, Trash2, Menu } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { Toaster, toast as sonnerToast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";


import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Arcane | Memento Mori" },
      { name: "description", content: "Premium Dark Fitness Streetwear" },
      { property: "og:title", content: "Arcane | Streetwear & Fitness" },
      { property: "og:description", content: "Premium Dark Fitness Streetwear" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&family=UnifrakturMaguntia&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%2309090b'/><text x='50' y='65' font-family='Georgia, serif' font-size='65' font-weight='bold' fill='%23ffffff' text-anchor='middle'>A</text></svg>" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function GlobalCartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    remainingForFreeShipping, 
    freeShippingProgress, 
    activeCoupon, 
    discountValue, 
    applyCoupon, 
    removeCoupon,
    savedCep,
    savedShippingCost,
    setSavedCep,
    setSavedShippingCost
  } = useCartStore();
  
  const [couponInput, setCouponInput] = useState("");
  const [cepError, setCepError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Mask and Normalize CEP
  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  };

  const calculateShipping = async (value: string) => {
    const cleanCep = value.replace(/\D/g, '');
    
    if (cleanCep.length === 8) {
      setIsCalculating(true);
      setCepError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      if (cleanCep.startsWith('000')) {
        setCepError('CEP INVÁLIDO OU NÃO ENCONTRADO');
        setSavedShippingCost(null);
      } else if (cleanCep === '99999999') {
        setCepError('ERRO NA CONSULTA. TENTE NOVAMENTE');
        setSavedShippingCost(null);
      } else {
        setCepError(null);
        const cost = freeShippingProgress >= 100 ? 0 : 25;
        setSavedShippingCost(cost);
      }
      setIsCalculating(false);
    } else {
      setSavedShippingCost(null);
      if (cleanCep.length > 0 && cleanCep.length < 8) {
        setCepError(null);
      }
    }
  };

  // Debounced calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateShipping(savedCep);
    }, 500);
    return () => clearTimeout(timer);
  }, [savedCep, freeShippingProgress]);

  if (!isCartOpen) return null;

  const isCheckoutDisabled = isCalculating || !!cepError || savedShippingCost === null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-[10000] flex flex-col transform transition-transform duration-300 ease-in-out`}>
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
            <div className="flex justify-between items-end">
              <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                {remainingForFreeShipping > 0 
                  ? `Faltam ${remainingForFreeShipping.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} para Frete Grátis`
                  : "Você ganhou Frete Grátis! 🩸"}
              </p>
              {savedShippingCost !== null && !cepError && !isCalculating && (
                <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold">
                  {savedShippingCost === 0 ? "BÔNUS APLICADO" : "ENVIO EXPRESSO"}
                </span>
              )}
            </div>
            <div className="h-1 bg-zinc-800 w-full rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-500"
                style={{ 
                  width: `${freeShippingProgress}%`,
                  backgroundColor: freeShippingProgress >= 100 ? '#8B0000' : 'white'
                }}
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-8">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">SEU ARSENAL ESTÁ VAZIO</p>
                <p className="text-[8px] uppercase tracking-[0.2em] text-zinc-600 italic">EQUIPE-SE PARA A BATALHA</p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="border border-white/20 px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                VOLTAR ÀS SOMBRAS
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}-${idx}`} className="flex gap-4 group">
                {/* Product Image Placeholder */}
                <div className="w-20 h-24 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center text-[8px] uppercase text-zinc-600 text-center px-1 leading-tight">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale brightness-50" />
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
            
            {cart.length > 0 && (
              <div className="mt-8 pt-8 border-t border-zinc-900 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Cálculo de Frete</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={savedCep}
                      onChange={e => {
                        const formatted = formatCep(e.target.value);
                        setSavedCep(formatted);
                      }}
                      placeholder="00000-000"
                      className={`flex-1 bg-transparent border-b ${cepError ? 'border-red-900' : 'border-zinc-800'} text-white text-xs py-2 focus:outline-none focus:border-zinc-500 transition-colors ${isCalculating ? 'opacity-50' : ''}`}
                      disabled={isCalculating}
                    />
                    {isCalculating && (
                      <div className="absolute right-0 bottom-2">
                        <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  {cepError && (
                    <span className="text-[8px] text-red-900 uppercase font-bold tracking-widest">{cepError}</span>
                  )}
                </div>
                
                {savedShippingCost !== null && !cepError && !isCalculating && (
                  <div className="bg-zinc-900/50 p-3 rounded border border-zinc-800/50 flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-400">
                      <span>Frete ({savedCep})</span>
                      <span className={savedShippingCost === 0 ? "text-[#8B0000] font-bold" : "text-white"}>
                        {savedShippingCost === 0 ? 'GRÁTIS' : savedShippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                    <p className="text-[8px] text-zinc-600 uppercase tracking-tighter leading-none italic">
                      {savedShippingCost === 0 
                        ? "CONDIÇÃO ESPECIAL: VALOR DE CARRINHO SUPERIOR A R$ 299,00" 
                        : "ENTREGA ESTIMADA EM ATÉ 5 DIAS ÚTEIS APÓS A POSTAGEM"}
                    </p>
                  </div>
                )}
              </div>
            )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-zinc-900 bg-zinc-950">
            {/* Coupon System */}
            <div className="mb-6 flex items-end gap-3">
              <div className="flex-1 flex flex-col gap-1">
                <input 
                  type="text" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="CUPOM" 
                  className="bg-transparent border-b border-zinc-800 text-white text-xs py-2 uppercase tracking-widest focus:outline-none focus:border-zinc-500 transition-colors w-full"
                />
              </div>
              <button 
                onClick={() => {
                  if (applyCoupon(couponInput)) setCouponInput("");
                }}
                className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors py-2"
              >
                APLICAR
              </button>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-zinc-400">Total</span>
              <div className="flex flex-col items-end">
                {activeCoupon && (
                  <span className="text-[10px] text-zinc-500 line-through mb-1">
                    {(cartTotal / (1 - discountValue)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                )}
                <span className={`text-lg font-bold ${activeCoupon ? 'text-[#8B0000]' : 'text-white'}`}>
                  {(cartTotal + (savedShippingCost || 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>
            
            {activeCoupon && (
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">Cupom: {activeCoupon}</span>
                <button onClick={removeCoupon} className="text-[8px] uppercase tracking-widest text-red-900 hover:text-red-700">Remover</button>
              </div>
            )}

            <p className="text-[10px] text-zinc-500 mt-2 mb-6 text-center uppercase tracking-wider italic">
              Envio {savedShippingCost === 0 ? 'grátis' : 'calculado'} para sua região
            </p>
            <button 
              disabled={isCheckoutDisabled}
              className={`w-full ${isCheckoutDisabled ? 'bg-zinc-800 text-zinc-500 grayscale cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200'} transition-all duration-300 py-4 font-bold tracking-[0.2em] text-xs uppercase shadow-lg`}
            >
              {isCalculating ? 'CALCULANDO...' : 'FINALIZAR COMPRA'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const lastScrollY = useRef(0);
  const { cart, setIsCartOpen } = useCartStore();
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");


  // Task 1: Intelligent Header/Top Bar behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setShowTopBar(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setShowTopBar(false);
      } else {
        // Scrolling up
        setShowTopBar(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Task 4: Scroll restoration fix using useLocation and window.scrollTo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Welcome Modal Logic - Show after 6s on Home page only, once per session
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const hasSeenModal = sessionStorage.getItem('arcane_modal_seen');

    if (pathname === "/" && !hasSeenModal) {
      timer = setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem('arcane_modal_seen', 'true');
      }, 6000);
    } else {
      setShowModal(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const copyCoupon = () => {
    navigator.clipboard.writeText("ARCANE5");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const THEME = {
    FONTS: {
      DISPLAY: "'Almendra Display', serif",
      SANS: "'Outfit', sans-serif",
    }
  };

  const transitionClass = prefersReducedMotion ? "" : "transition-all duration-500 ease-in-out";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-black text-white selection:bg-red-900/30" style={{ fontFamily: THEME.FONTS.SANS }}>

        {/* Top Bar Marquee */}
        <div className={`h-8 bg-red-950 flex items-center overflow-hidden border-b border-red-900/30 fixed top-0 left-0 right-0 z-[40] w-full ${transitionClass} ${showTopBar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="flex whitespace-nowrap animate-marquee py-1">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[10px] uppercase tracking-[0.2em] font-bold text-white px-4">
                FRETE GRÁTIS ACIMA DE R$ 299 • 5% DE DESCONTO NO PIX • QUALIDADE PREMIUM GARANTIDA • MEMENTO MORI •
              </span>
            ))}
          </div>
        </div>

        {/* Global Header */}
        <header className={`fixed left-0 w-full z-[30] bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 flex items-center justify-between ${transitionClass} ${showTopBar ? 'translate-y-8' : 'translate-y-0'} top-0 h-16 md:h-20 px-4 md:px-12`}>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
              <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
              <Link to="/produtos" className="hover:text-white transition-colors duration-300">Produtos</Link>
              <Link to="/manifesto" className="hover:text-white transition-colors duration-300">Manifesto</Link>
              <a href="https://wa.me/5521965226593" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Contato</a>
            </nav>
            <button 
              className="md:hidden text-zinc-400 hover:text-white"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
          
          <Link to="/" className="text-4xl md:text-6xl absolute left-1/2 -translate-x-1/2 select-none font-madness text-white hover:text-white/90">
            ARCANE
          </Link>

          <div className="flex items-center gap-5">
            <button 
              aria-label="Carrinho" 
              className="relative group"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="text-zinc-400 group-hover:text-white w-4 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-[#8B0000] text-[8px] px-1 rounded-full text-white font-bold">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </button>
          </div>
        </header>

        {/* Padding to prevent content under fixed header */}
        <div className="h-24 md:h-28" />


        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[10001] flex">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <div className="relative w-[300px] h-full bg-zinc-950 border-r border-zinc-900 flex flex-col p-8 animate-in slide-in-from-left duration-300">
              <div className="flex items-center justify-between mb-12">
                <span className="text-4xl font-madness text-white">ARCANE</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-zinc-500 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-0">
                <Link 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="py-6 text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-white border-b border-zinc-900 transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/produtos" 
                  onClick={() => setIsMenuOpen(false)}
                  className="py-6 text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-white border-b border-zinc-900 transition-colors"
                >
                  Produtos
                </Link>
                <Link 
                  to="/manifesto" 
                  onClick={() => setIsMenuOpen(false)}
                  className="py-6 text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-white border-b border-zinc-900 transition-colors"
                >
                  Manifesto
                </Link>
                <a 
                  href="https://wa.me/5521965226593" 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-6 text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-white border-b border-zinc-900 transition-colors"
                >
                  Contato
                </a>

                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="py-6 text-sm font-bold text-left uppercase tracking-[0.3em] text-zinc-400 hover:text-white border-b border-zinc-900 transition-colors"
                >
                  Carrinho
                </button>
              </nav>
              <div className="mt-auto">
                <p className="text-[10px] uppercase tracking-widest text-zinc-600">Arcane • Memento Mori</p>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Welcome Pop-up */}
      {showModal && (
        <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4 pointer-events-auto">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative bg-zinc-950 border border-zinc-800 p-8 md:p-12 max-w-lg w-full text-center space-y-8 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-madness text-white">
                BEM-VINDO AO DROP ARCANO
              </h2>
              <p className="text-zinc-400 text-sm uppercase tracking-widest leading-relaxed">
                Garanta 5% de desconto na sua primeira compra usando o cupom abaixo:
              </p>
            </div>
            
            <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 rounded-sm group">
              <span className="font-mono text-xl font-bold tracking-widest text-white">ARCANE5</span>
              <button 
                onClick={copyCoupon}
                className="bg-white text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
              >
                {isCopied ? "COPIADO" : "COPIAR"}
              </button>
            </div>

            <button 
              onClick={handleCloseModal}
              className="w-full border border-zinc-700 text-zinc-400 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              FECHAR E EXPLORAR
            </button>
          </div>
        </div>
      )}

      {/* Global Cart Drawer */}
      <GlobalCartDrawer />
      <Toaster 
        position="bottom-right" 
        expand={!prefersReducedMotion}
        visibleToasts={3}
        duration={3000}
        toastOptions={{
          className: 'bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-none font-sans uppercase tracking-widest text-[10px] font-bold py-4 shadow-2xl',
          descriptionClassName: "text-zinc-500 font-bold",
          style: {
            background: '#09090b',
            color: '#f4f4f5',
            borderColor: '#27272a',
          },
        }}
        closeButton 
      />
      <ScrollRestoration />
    </QueryClientProvider>
  );
}
