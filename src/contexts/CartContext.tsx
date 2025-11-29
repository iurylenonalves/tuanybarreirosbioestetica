'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { errorLog } from '@/lib/logger';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: 'product' | 'service';
  slug: string;
  stock?: number;
  bundleWith?: string[]; // Array of product IDs that trigger a discount
  bundleDiscount?: number; // Discount percentage
}

interface CartState {
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  itemCount: number;
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  total: 0,
  subtotal: 0,
  discount: 0,
  itemCount: 0,
  isOpen: false,
};

// Helper to calculate total with bundle discounts
function calculateTotals(items: CartItem[]): { total: number; subtotal: number; discount: number } {
  let total = 0;
  let subtotal = 0;

  // Create a map of item quantities for quick lookup
  const itemQuantities = new Map<string, number>();
  items.forEach(item => {
    itemQuantities.set(item.id, item.quantity);
  });

  items.forEach(item => {
    let itemPrice = item.price;
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;
    
    // Check for bundle discount
    if (item.bundleWith && item.bundleDiscount && item.bundleWith.length > 0) {
      // Check if ANY of the bundled products are in the cart
      const hasBundlePartner = item.bundleWith.some(partnerId => {
        const partnerQty = itemQuantities.get(partnerId);
        return partnerQty && partnerQty > 0;
      });

      if (hasBundlePartner) {
        // Apply discount
        itemPrice = item.price * (1 - item.bundleDiscount / 100);
      }
    }

    total += itemPrice * item.quantity;
  });

  return {
    total,
    subtotal,
    discount: subtotal - total
  };
}

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        // Check stock if it's a product
        if (action.payload.type === 'product' && action.payload.stock !== undefined) {
          if (existingItem.quantity >= action.payload.stock) {
            return state; // Do not add if out of stock
          }
        }
        
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const { total, subtotal, discount } = calculateTotals(newItems);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        subtotal,
        discount,
        itemCount,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const { total, subtotal, discount } = calculateTotals(newItems);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        subtotal,
        discount,
        itemCount,
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id });
      }

      const newItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          // Check stock if it's a product
          if (item.type === 'product' && item.stock !== undefined) {
            const quantity = Math.min(action.payload.quantity, item.stock);
            return { ...item, quantity };
          }
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });

      const { total, subtotal, discount } = calculateTotals(newItems);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        subtotal,
        discount,
        itemCount,
      };
    }

    case 'CLEAR_CART':
      return {
        ...initialState,
        isOpen: state.isOpen,
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };

    case 'LOAD_CART': {
      const { total, subtotal, discount } = calculateTotals(action.payload);
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: action.payload,
        total,
        subtotal,
        discount,
        itemCount,
      };
    }

    default:
      return state;
  }
}

// Context
interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist cart in localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        errorLog('Erro ao carregar carrinho do localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}