import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const checkAuth = () => {
      const username = localStorage.getItem('username');
      if (!username) {
        setCart([]);
      }
    };

    window.addEventListener('storage', checkAuth);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAuth();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', checkAuth);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const addToCart = (item) => setCart(prev => [...prev, item]);
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
