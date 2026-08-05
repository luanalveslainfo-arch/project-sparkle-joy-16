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
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string | undefined;
}

interface CartStore {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (id: number, size?: string) => void;
  updateQuantity: (id: number, size: string | undefined, delta: number) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  remainingForFreeShipping: number;
  freeShippingProgress: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      addToCart: (product, size) => {
        const { cart } = get();
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
        
        // Task 1: Cart context update logic
        // O carrinho não está calculando o total. 
        // Lógica: const cartTotal = cartItems.reduce((acc, item) => acc + ((item.preco || item.price) * item.quantity), 0);
        // (Using priceNumber for precision as established in this project)
        
        // Task 1: Open drawer on add
        set({ cart: newCart, isCartOpen: true });
      },
      removeFromCart: (id, size) => {
        const { cart } = get();
        set({ cart: cart.filter(item => !(item.id === id && item.selectedSize === size)) });
      },
      updateQuantity: (id, size, delta) => {
        const { cart } = get();
        set({
          cart: cart.map(item => {
            if (item.id === id && item.selectedSize === size) {
              const newQty = Math.max(1, item.quantity + delta);
              return { ...item, quantity: newQty };
            }
            return item;
          })
        });
      },
      // Task 1 & 2: Dynamic variables for total and progress
      get cartTotal() {
        const cart = get().cart;
        const parsePrice = (val: any) => {
          if (typeof val === 'number') return val;
          if (!val) return 0;
          const cleanStr = String(val).replace(/[R$\s.]/g, '').replace(',', '.');
          return Number(cleanStr) || 0;
        };
        return cart.reduce((acc, item) => acc + (parsePrice(item.price || (item as any).preco) * item.quantity), 0);
      },
      get remainingForFreeShipping() {
        const total = get().cartTotal;
        return Math.max(0, 299 - Number(total));
      },
      get freeShippingProgress() {
        const total = get().cartTotal;
        // Task 2 logic: Math.min((cartTotal / 299) * 100, 100)
        return Math.min((Number(total) / 299) * 100, 100);
      }
    }),
    {
      name: 'arcane-cart-storage',
    }
  )
);
