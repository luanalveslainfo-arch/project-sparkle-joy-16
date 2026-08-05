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
import { useEffect, type ReactNode, useState } from "react";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

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
      { title: "Arcane | Streetwear & Fitness" },
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
        href: "https://fonts.googleapis.com/css2?family=Almendra+Display&family=Metal+Mania&family=Outfit:wght@300;400;700;900&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
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
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, remainingForFreeShipping, freeShippingProgress } = useCartStore();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-[70] flex flex-col transform transition-transform duration-300 ease-in-out`}>
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
                className="h-full transition-all duration-500"
                style={{ 
                  width: `${freeShippingProgress}%`,
                  backgroundColor: freeShippingProgress >= 100 ? '#8B0000' : 'white'
                }}
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
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();

  // Task 4: Scroll restoration fix using useLocation and window.scrollTo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {/* Task 3: Render Cart Drawer globally */}
      <GlobalCartDrawer />
      <ScrollRestoration />
    </QueryClientProvider>
  );
}
