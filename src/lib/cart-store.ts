import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  price: string;
  priceNumber: number;
  installments: string;
  image: string;
  backImage?: string;
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string | undefined;
}

interface CartStore {
  cart: CartItem[];
  isCartOpen: boolean;
  cartTotal: number;
  remainingForFreeShipping: number;
  freeShippingProgress: number;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (id: number, size?: string) => void;
  updateQuantity: (id: number, size: string | undefined, delta: number) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  calculateTotals: (cart: CartItem[]) => { total: number, remaining: number, progress: number };
}

const FREE_SHIPPING_THRESHOLD = 299;

const parsePrice = (val: any): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  // Rigorous cleaning for "R$ 179,90" or "1.200,00"
  const cleanStr = String(val).replace(/[R$\s.]/g, '').replace(',', '.');
  return Number(cleanStr) || 0;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      cartTotal: 0,
      remainingForFreeShipping: FREE_SHIPPING_THRESHOLD,
      freeShippingProgress: 0,

      calculateTotals: (cart: CartItem[]) => {
        const total = cart.reduce((acc, item) => {
          const price = parsePrice(item.priceNumber || item.price);
          return acc + (price * item.quantity);
        }, 0);
        
        const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
        const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
        
        return { total, remaining, progress };
      },

      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      addToCart: (product, size) => {
        const { cart, calculateTotals } = get();
        const existing = cart.find(item => item.id === product.id && item.selectedSize === size);
        
        let newCart;
        if (existing) {
          newCart = cart.map(item => 
            (item.id === product.id && item.selectedSize === size) 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
        } else {
          newCart = [...cart, { ...product, quantity: 1, selectedSize: size }];
        }
        
        const totals = calculateTotals(newCart);
        set({ 
          cart: newCart, 
          isCartOpen: true,
          cartTotal: totals.total,
          remainingForFreeShipping: totals.remaining,
          freeShippingProgress: totals.progress
        });
      },

      removeFromCart: (id, size) => {
        const { cart, calculateTotals } = get();
        const newCart = cart.filter(item => !(item.id === id && item.selectedSize === size));
        const totals = calculateTotals(newCart);
        set({ 
          cart: newCart,
          cartTotal: totals.total,
          remainingForFreeShipping: totals.remaining,
          freeShippingProgress: totals.progress
        });
      },

      updateQuantity: (id, size, delta) => {
        const { cart, calculateTotals } = get();
        const newCart = cart.map(item => {
          if (item.id === id && item.selectedSize === size) {
            const newQty = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        });
        
        const totals = calculateTotals(newCart);
        set({ 
          cart: newCart,
          cartTotal: totals.total,
          remainingForFreeShipping: totals.remaining,
          freeShippingProgress: totals.progress
        });
      },
    }),
    {
      name: 'arcane-cart-storage',
      // Ensure totals are recalculated on hydration if needed, 
      // though persist saves the state properties anyway.
    }
  )
);
