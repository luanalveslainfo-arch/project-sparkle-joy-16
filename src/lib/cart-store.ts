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
      get cartTotal() {
        return get().cart.reduce((acc, item) => acc + (item.priceNumber * item.quantity), 0);
      }
    }),
    {
      name: 'arcane-cart-storage',
    }
  )
);
