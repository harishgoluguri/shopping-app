import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { CartItem, Product, Coupon } from '../types';
import { COUPONS } from '../constants';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  discount: number;
  cartTotal: number;
  cartItemCount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sdgCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to local storage on change
  useEffect(() => {
    localStorage.setItem('sdgCart', JSON.stringify(cart));
  }, [cart]);

  // Recalculate discount whenever cart or coupon changes. 
  // If cart total drops below minOrderValue, remove coupon automatically? 
  // For better UX, we can just keep it but set discount to 0 in UI, or auto-remove. 
  // Here we will auto-remove if invalid.
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (appliedCoupon && appliedCoupon.minOrderValue && cartSubtotal < appliedCoupon.minOrderValue) {
      setAppliedCoupon(null);
    }
  }, [cartSubtotal, appliedCoupon]);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.minOrderValue && cartSubtotal < appliedCoupon.minOrderValue) return 0;
    
    if (appliedCoupon.type === 'percentage') {
      return (cartSubtotal * appliedCoupon.value) / 100;
    } else {
      return appliedCoupon.value;
    }
  }, [cartSubtotal, appliedCoupon]);

  const cartTotal = Math.max(0, cartSubtotal - discount);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.selectedSize === size) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.selectedSize === size)));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const coupon = COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase().trim());
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (coupon.minOrderValue && cartSubtotal < coupon.minOrderValue) {
      return { success: false, message: `Minimum order of ₹${coupon.minOrderValue} required.` };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon '${coupon.code}' applied!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartSubtotal,
      discount,
      cartTotal, 
      cartItemCount,
      appliedCoupon,
      applyCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};