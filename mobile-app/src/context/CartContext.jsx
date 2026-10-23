import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, showNotification } = useAuth();
  const [items, setItems] = useState([
    {
      id: "flt-003",
      name: "Califnco 5-Micron Spun Sediment Filter (Pack of 4)",
      category: "filters",
      price: 499,
      wholesalePrice: 280,
      minWholesaleQty: 15,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80"
    }
  ]);

  const [useWalletCredits, setUseWalletCredits] = useState(false);

  const isDealer = user.role === 'dealer' && user.dealerStatus === 'approved';

  const getItemPrice = (product) => {
    return isDealer ? product.wholesalePrice : product.price;
  };

  const addToCart = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    showNotification(
      'Added to Cart',
      `${product.name} added to cart. (${isDealer ? 'Wholesale Price Applied' : 'Retail Price'})`,
      'success'
    );
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(i => (i.id === productId ? { ...i, quantity: qty } : i))
    );
  };

  const removeFromCart = (productId) => {
    setItems(prev => prev.filter(i => i.id !== productId));
    showNotification('Item Removed', 'Product removed from cart.', 'info');
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => {
    const price = isDealer ? item.wholesalePrice : item.price;
    return sum + (price * item.quantity);
  }, 0);

  const walletDiscount = (useWalletCredits && user.walletCredits > 0)
    ? Math.min(user.walletCredits, subtotal)
    : 0;

  const total = Math.max(0, subtotal - walletDiscount);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        walletDiscount,
        total,
        totalQuantity,
        getItemPrice,
        useWalletCredits,
        setUseWalletCredits,
        isDealer
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
