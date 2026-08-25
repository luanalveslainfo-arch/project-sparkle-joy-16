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
  subtitle?: string;
  colorLabel?: string;
  description?: string;
  isCombo?: boolean;
  originalPrice?: string;
  comboItems?: { name: string; price: number }[];
}
import { toast } from 'sonner';

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
  activeCoupon: string | null;
  discountValue: number;
  // CEP persistência
  savedCep: string;
  savedShippingCost: number | null;
  setSavedCep: (cep: string) => void;
  setSavedShippingCost: (cost: number | null) => void;
  
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  removeFromCart: (id: number, size?: string) => void;
  updateQuantity: (id: number, size: string | undefined, delta: number) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  calculateTotals: (cart: CartItem[], discountValue?: number) => { total: number, remaining: number, progress: number, autoDiscount: number };
}

const FREE_SHIPPING_THRESHOLD = 299;

const parsePrice = (val: any): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  // Rigorous cleaning for "R$ 149,90" or "1.200,00"
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
      activeCoupon: null,
      discountValue: 0,
      savedCep: '',
      savedShippingCost: null,

      setSavedCep: (cep) => set({ savedCep: cep }),
      setSavedShippingCost: (cost) => set({ savedShippingCost: cost }),

      calculateTotals: (cart: CartItem[], discountValue = get()?.discountValue || 0) => {
        const subtotal = cart.reduce((acc, item) => {
          const price = parsePrice(item.priceNumber || item.price);
          return acc + (price * item.quantity);
        }, 0);
        
        // Multi-item auto discount: 2+ items = 10% OFF
        const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
        const autoDiscount = totalItemsCount >= 2 ? 0.1 : 0;
        
        const totalAfterAutoDiscount = subtotal * (1 - autoDiscount);
        const total = totalAfterAutoDiscount * (1 - discountValue);
        
        const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
        const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
        
        return { total, remaining, progress, autoDiscount };
      },

      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      applyCoupon: (code) => {
        if (code.toUpperCase() === "ARCANE5") {
          const discount = 0.05; // 5%
          const { cart, calculateTotals } = get();
          const totals = calculateTotals(cart, discount);
          set({ 
            activeCoupon: "ARCANE5", 
            discountValue: discount,
            cartTotal: totals.total,
            remainingForFreeShipping: totals.remaining,
            freeShippingProgress: totals.progress
          });
          toast.success("Cupom ARCANE5 aplicado! 5% de desconto ativado.");
          return true;
        }
        toast.error("Cupom inválido");
        return false;
      },

      removeCoupon: () => {
        const { cart, calculateTotals } = get();
        const totals = calculateTotals(cart, 0);
        set({ 
          activeCoupon: null, 
          discountValue: 0,
          cartTotal: totals.total,
          remainingForFreeShipping: totals.remaining,
          freeShippingProgress: totals.progress
        });
      },

      addToCart: (product, size, quantity = 1) => {
        const { cart, calculateTotals } = get();
        const existing = cart.find(item => item.id === product.id && item.selectedSize === size);
        
        let newCart;
        if (existing) {
          newCart = cart.map(item => 
            (item.id === product.id && item.selectedSize === size) 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          );
        } else {
          newCart = [...cart, { ...product, quantity, selectedSize: size }];
        }
        
        const totals = calculateTotals(newCart);
        set({ 
          cart: newCart, 
          isCartOpen: true,
          cartTotal: totals.total,
          remainingForFreeShipping: totals.remaining,
          freeShippingProgress: totals.progress
        });
        
        toast.success("Artefato adicionado ao arsenal", {
          style: {
            backgroundColor: '#000',
            color: '#fff',
            border: '1px solid #27272a',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }
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
