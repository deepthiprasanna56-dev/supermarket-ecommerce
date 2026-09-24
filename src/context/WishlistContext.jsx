import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastContext';
import { products } from '../data/products';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart-wishlist');
      return saved ? JSON.parse(saved) : [1, 5, 10]; // sample default favorites
    } catch {
      return [1, 5, 10];
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('freshmart-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    const item = products.find(p => p.id === productId);
    const itemName = item ? item.name : 'Item';
    
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast(`${itemName} removed from wishlist`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast(`❤️ ${itemName} added to wishlist!`, 'success');
        return [...prev, productId];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
