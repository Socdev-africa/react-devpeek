// src/stores/cartStore.ts
import { create } from 'zustand';
import { CartState } from '../types/CartTypes';
import { Product } from '../types/ProductTypes';

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  couponCode: null,
  discount: 0,
  taxRate: 0.08, // 8% tax rate
  
  addItem: (product: Product) => {
    set(state => {
      const existingItemIndex = state.items.findIndex(item => item.productId === product.id);

      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return { items: updatedItems };
      } else {
        // Add new item
        const newItem = {
          id: `cart-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        };
        return { items: [...state.items, newItem] };
      }
    });
  },
  
  removeItem: (id: string) => {
    set(state => ({
      items: state.items.filter(item => item.id !== id)
    }));
  },
  
  updateQuantity: (id: string, quantity: number) => {
    set(state => ({
      items: state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    }));
  },
  
  clearCart: () => {
    set({ items: [], couponCode: null, discount: 0 });
  },
  
  applyCoupon: (code: string) => {
    // Simple mock coupon logic
    let discountPercent = 0;
    if (code === 'SAVE10') discountPercent = 0.1;
    if (code === 'SAVE20') discountPercent = 0.2;
    if (code === 'HALF') discountPercent = 0.5;

    set({ couponCode: code, discount: discountPercent });
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getSubtotal: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  getTaxAmount: () => {
    const subtotal = get().getSubtotal();
    const discountAmount = get().getDiscountAmount();
    return (subtotal - discountAmount) * get().taxRate;
  },
  
  getDiscountAmount: () => {
    return get().getSubtotal() * get().discount;
  },
  
  getTotal: () => {
    const subtotal = get().getSubtotal();
    const tax = get().getTaxAmount();
    const discount = get().getDiscountAmount();
    return subtotal - discount + tax;
  }
}));

export default useCartStore;