import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: 'S' | 'M' | 'L';
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('lotusplanet_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('lotusplanet_cart', JSON.stringify(items));
  }, [items]);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const addToCart = (newItem: CartItem) => {
    setItems(prev => {
      const existingItem = prev.find(i => i.id === newItem.id && i.size === newItem.size);
      if (existingItem) {
        return prev.map(i => 
          (i.id === newItem.id && i.size === newItem.size) 
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setItems(prev => prev.map(i => 
      (i.id === id && i.size === size) ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items,
      cartCount,
      cartTotal,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
