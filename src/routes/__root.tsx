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
import { Toaster } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";
import { TrustBadges } from "@/components/TrustBadges";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCursor } from "@/components/GlowCursor";

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
      { title: "Arcane | Memento Mori - Dark Fitness & Streetwear" },
      { name: "description", content: "Explore a Arcane. Roupas fitness e streetwear com estética dark gótica. Memento Mori - Onde a disciplina encontra a mortalidade. Alta qualidade e design exclusivo." },
      { property: "og:title", content: "Arcane | Memento Mori - Dark Fitness & Streetwear" },
      { property: "og:description", content: "Explore a Arcane. Roupas fitness e streetwear com estética dark gótica. Memento Mori - Onde a disciplina encontra a mortalidade." },
      { property: "og:image", content: "https://project-sparkle-joy-16.lovable.app/hero.png" },
      { property: "og:url", content: "https://project-sparkle-joy-16.lovable.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://project-sparkle-joy-16.lovable.app/hero.png" },
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
        <GlowCursor />
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
      await new Promise(resolve => setTimeout(resolve, 800));
      if (cleanCep.startsWith('000')) {
        setCepError('CEP INVÁLIDO OU NÃO ENCONTRADO');
        setSavedShippingCost(null);
      } else {
        const cost = freeShippingProgress >= 100 ? 0 : 25;
        setSavedShippingCost(cost);
      }
      setIsCalculating(false);
    } else {
      setSavedShippingCost(null);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateShipping(savedCep);
    }, 500);
    return () => clearTimeout(timer);
  }, [savedCep, freeShippingProgress]);

  const isCheckoutDisabled = isCalculating || !!cepError || savedShippingCost === null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[9999]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-[10000] flex flex-col"
          >
            <div className="p-6 border-b border-zinc-900">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-sans text-lg font-bold tracking-widest text-white uppercase">SEU CARRINHO</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white p-1">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                    {remainingForFreeShipping > 0 
                      ? `Faltam ${remainingForFreeShipping.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} para Frete Grátis`
                      : "Você ganhou Frete Grátis! 🩸"}
                  </p>
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

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-8">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">SEU ARSENAL ESTÁ VAZIO</p>
                  <button onClick={() => setIsCartOpen(false)} className="border border-white/20 px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-white hover:text-black">
                    VOLTAR ÀS SOMBRAS
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${item.selectedSize}-${idx}`} className="flex gap-4">
                    <div className="w-20 h-24 bg-zinc-900 border border-zinc-800 rounded-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale brightness-50" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">{item.name}</h3>
                        <p className="text-[10px] text-zinc-400 uppercase mt-1">Tamanho: {item.selectedSize}</p>
                        <p className="text-xs font-bold text-white mt-1">{item.price}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-zinc-800 rounded-sm">
                          <button onClick={() => updateQuantity(item.id, item.selectedSize, -1)} className="w-8 h-8 flex items-center justify-center text-zinc-400"><Minus size={12} /></button>
                          <span className="w-8 h-8 flex items-center justify-center text-xs text-white font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.selectedSize, 1)} className="w-8 h-8 flex items-center justify-center text-zinc-400"><Plus size={12} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-zinc-500 hover:text-[#8B0000]"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {cart.length > 0 && (
                <div className="mt-8 pt-8 border-t border-zinc-900 space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Cálculo de Frete</label>
                    <input 
                      type="text"
                      value={savedCep}
                      onChange={e => setSavedCep(formatCep(e.target.value))}
                      placeholder="00000-000"
                      className="bg-transparent border-b border-zinc-800 text-white text-xs py-2 focus:outline-none"
                    />
                    {cepError && <span className="text-[8px] text-red-900 uppercase font-bold">{cepError}</span>}
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-900 bg-zinc-950">
                <div className="mb-6 flex items-end gap-3">
                  <input 
                    type="text" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="CUPOM" 
                    className="bg-transparent border-b border-zinc-800 text-white text-xs py-2 w-full uppercase"
                  />
                  <button onClick={() => { if (applyCoupon(couponInput)) setCouponInput(""); }} className="text-[10px] font-bold text-zinc-400 hover:text-white uppercase">APLICAR</button>
                </div>
                <div className="space-y-3 bg-zinc-950 p-5 border border-zinc-900 mb-6">
                  <div className="flex justify-between text-[10px] uppercase text-zinc-500">
                    <span>Subtotal</span>
                    <span>{cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                  {savedShippingCost !== null && (
                    <div className="flex justify-between text-[10px] uppercase text-zinc-500">
                      <span>Envio</span>
                      <span>{savedShippingCost === 0 ? 'GRÁTIS' : savedShippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                  )}
                  {activeCoupon && (
                    <div className="flex justify-between text-[10px] uppercase text-[#8B0000] font-black">
                      <span>Cupom: {activeCoupon}</span>
                      <span>-{(cartTotal * discountValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-zinc-900">
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase font-black text-white">Total</span>
                      <span className="text-xl font-black text-white">
                        {(cartTotal + (savedShippingCost || 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                  </div>
                </div>
                <button disabled={isCheckoutDisabled} className="w-full bg-white text-black py-4 font-bold uppercase text-xs">
                  {isCalculating ? 'CALCULANDO...' : 'FINALIZAR COMPRA'}
                </button>
                <div className="pt-6 border-t border-zinc-900 mt-4">
                  <TrustBadges />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
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

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShowTopBar(current < 50 || current < lastScrollY.current);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  useEffect(() => {
    const seen = sessionStorage.getItem('arcane_modal_seen');
    if (pathname === "/" && !seen) {
      const timer = setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem('arcane_modal_seen', 'true');
      }, 6000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [pathname]);

  const copyCoupon = () => {
    navigator.clipboard.writeText("ARCANE5");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-black text-white font-sans">
        <div className={`h-8 bg-red-950 fixed top-0 w-full z-[40] transition-transform duration-500 ${showTopBar ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex animate-marquee py-1">
            {[1, 2, 3, 4].map(i => (
              <span key={i} className="text-[10px] uppercase font-bold text-white px-4">FRETE GRÁTIS ACIMA DE R$ 299 • 5% DE DESCONTO NO PIX •</span>
            ))}
          </div>
        </div>

        <header className={`fixed left-0 w-full z-[30] bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 transition-transform duration-500 ${showTopBar ? 'translate-y-8' : 'translate-y-0'} top-0 h-16 md:h-20 px-4 md:px-12 flex items-center justify-between`}>
          <button className="md:hidden text-zinc-400" onClick={() => setIsMenuOpen(true)}><Menu size={20} /></button>
          <nav className="hidden md:flex gap-6 text-[10px] uppercase text-zinc-400 font-bold">
            <Link to="/">Home</Link><Link to="/produtos">Produtos</Link><Link to="/manifesto">Manifesto</Link>
          </nav>
          <Link to="/" className="text-4xl md:text-6xl absolute left-1/2 -translate-x-1/2 font-madness text-white">ARCANE</Link>
          <button onClick={() => setIsCartOpen(true)} className="relative"><ShoppingBag className="text-zinc-400" /><span className="absolute -top-1 -right-1 bg-[#8B0000] text-[8px] px-1 rounded-full">{cart.reduce((a, b) => a + b.quantity, 0)}</span></button>
        </header>

        <div className="h-24 md:h-28" />

        <AnimatePresence>
          {isMenuOpen && (
            <div className="fixed inset-0 z-[10001] flex">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
              <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="relative w-[300px] h-full bg-zinc-950 p-8 flex flex-col">
                <div className="flex justify-between mb-12"><span className="text-4xl font-madness">ARCANE</span><button onClick={() => setIsMenuOpen(false)}><X size={24} /></button></div>
                <nav className="flex flex-col"><Link to="/" onClick={() => setIsMenuOpen(false)} className="py-6 uppercase font-bold">Home</Link><Link to="/produtos" onClick={() => setIsMenuOpen(false)} className="py-6 uppercase font-bold">Produtos</Link></nav>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <main className="flex-1"><Outlet /></main>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 p-8 md:p-12 max-w-lg w-full text-center space-y-10">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4"><X size={20} /></button>
            <h2 className="text-3xl font-black uppercase font-sans">BEM-VINDO À ARCANE</h2>
            <p className="text-zinc-400 text-[10px] uppercase">GARANTA <span className="text-red-600 font-bold">5% DE DESCONTO</span> NA PRIMEIRA COMPRA: <span className="font-mono text-red-600">ARCANE5</span></p>
            <button onClick={copyCoupon} className="bg-zinc-100 text-black px-6 py-2 uppercase text-[10px] font-bold">{isCopied ? "COPIADO" : "COPIAR"}</button>
          </div>
        </div>
      )}

      <GlobalCartDrawer />
      <Toaster position="bottom-right" />
      <ScrollRestoration />
    </QueryClientProvider>
  );
}
