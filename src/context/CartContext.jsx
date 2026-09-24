import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastContext';
import { useWishlist } from './WishlistContext';
import { coupons } from '../data/coupons';

const CartContext = createContext();

const FREE_SHIPPING_THRESHOLD = 45.00;
const STANDARD_DELIVERY_FEE = 4.99;
const TAX_RATE = 0.05; // 5% grocery sales tax

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart-coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [cartBadgeBounced, setCartBadgeBounced] = useState(false);

  const { addToast } = useToast();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    localStorage.setItem('freshmart-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('freshmart-coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('freshmart-coupon');
    }
  }, [appliedCoupon]);

  const triggerBadgeBounce = () => {
    setCartBadgeBounced(true);
    setTimeout(() => setCartBadgeBounced(false), 800);
  };

  const addToCart = (product, quantity = 1, variant = null) => {
    const selectedVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : null);
    const unitPrice = selectedVariant ? selectedVariant.price : product.price;
    const variantLabel = selectedVariant ? selectedVariant.label : product.unit;
    const cartItemId = `${product.id}-${variantLabel}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [
          ...prevItems,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            price: unitPrice,
            image: product.images ? product.images[0] : '',
            unit: variantLabel,
            emoji: product.emoji || '🛒',
            quantity
          }
        ];
      }
    });

    triggerBadgeBounce();
    addToast(`Added ${quantity}x ${product.name} to cart!`, 'success');
  };

  const updateQuantity = (cartItemId, delta) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (cartItemId) => {
    const item = items.find((i) => i.id === cartItemId);
    setItems((prevItems) => prevItems.filter((i) => i.id !== cartItemId));
    if (item) {
      addToast(`Removed ${item.name} from cart`, 'info');
    }
  };

  const moveToWishlist = (cartItemId) => {
    const item = items.find((i) => i.id === cartItemId);
    if (item) {
      if (!isInWishlist(item.productId)) {
        toggleWishlist(item.productId);
      }
      removeFromCart(cartItemId);
      addToast(`Moved ${item.name} to wishlist`, 'success');
    }
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  // Pricing calculations
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Free shipping logic
  const isFreeDeliveryQualified = subtotal >= FREE_SHIPPING_THRESHOLD || (appliedCoupon && appliedCoupon.type === 'shipping');
  const deliveryFee = items.length === 0 ? 0 : (isFreeDeliveryQualified ? 0 : STANDARD_DELIVERY_FEE);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = (subtotal * appliedCoupon.discount) / 100;
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = Math.min(subtotal, appliedCoupon.discount);
    } else if (appliedCoupon.type === 'shipping') {
      discountAmount = STANDARD_DELIVERY_FEE;
    }
  }

  const taxAmount = (subtotal - discountAmount) > 0 ? (subtotal - discountAmount) * TAX_RATE : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + taxAmount);

  const applyCoupon = (codeStr) => {
    const cleanCode = (codeStr || '').trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode);

    if (!found) {
      addToast(`Coupon "${cleanCode}" is invalid. Try "FRESH20" or "SUPERMARKET"`, 'error');
      return false;
    }

    if (found.minSpend && subtotal < found.minSpend) {
      addToast(`Coupon "${cleanCode}" requires a minimum order of $${found.minSpend.toFixed(2)}`, 'warning');
      return false;
    }

    setAppliedCoupon(found);
    addToast(`Coupon ${found.code} applied! Saved with ${found.description}`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        moveToWishlist,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartBadgeBounced,
        totalItemsCount,
        subtotal,
        discountAmount,
        deliveryFee,
        taxAmount,
        grandTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        freeShippingProgress,
        isFreeDeliveryQualified
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
