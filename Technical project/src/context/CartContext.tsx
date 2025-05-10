import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  restaurantId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);

  // Calculate cart total whenever items change
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);
    setCartTotal(total);
    
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [items]);

  const addToCart = (item: MenuItem) => {
    // Check if trying to add item from a different restaurant
    if (items.length > 0 && restaurantId !== item.restaurantId) {
      if (!confirm('Adding items from a different restaurant will clear your current cart. Continue?')) {
        return;
      }
      setItems([]);
    }

    setRestaurantId(item.restaurantId);

    setItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.item.id === item.id);
      
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(cartItem => 
          cartItem.item.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.item.id !== itemId));
    
    // Reset restaurantId if cart becomes empty
    if (items.length === 1) {
      setRestaurantId(null);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setRestaurantId(null);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      restaurantId
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};