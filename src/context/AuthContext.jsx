import { createContext, useContext, useEffect, useState } from 'react';
import { mockOrders } from '../data/mockOrders';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const DEFAULT_USER = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 382-9014',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  memberSince: 'January 2024',
  rewardPoints: 520,
  tier: 'Fresh VIP Member'
};

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    type: 'Home',
    isDefault: true,
    fullName: 'Alex Johnson',
    street: '742 Evergreen Terrace, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '+1 (555) 382-9014',
    instructions: 'Ring apartment 4B or leave with door concierge'
  },
  {
    id: 'addr-2',
    type: 'Office',
    isDefault: false,
    fullName: 'Alex Johnson',
    street: '350 5th Avenue, Suite 2100',
    city: 'New York',
    state: 'NY',
    zipCode: '10118',
    phone: '+1 (555) 382-9014',
    instructions: 'Front desk reception on the 21st floor'
  }
];

export function AuthProvider({ children }) {
  const { addToast } = useToast();

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart-user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('freshmart-logged-in');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart-addresses');
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart-orders');
      return saved ? JSON.parse(saved) : mockOrders;
    } catch {
      return mockOrders;
    }
  });

  const [deliveryPincode, setDeliveryPincode] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart-pincode');
      return saved ? JSON.parse(saved) : { zip: '10001', city: 'Manhattan, NY', status: 'Available in 30 mins' };
    } catch {
      return { zip: '10001', city: 'Manhattan, NY', status: 'Available in 30 mins' };
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart-recent');
      return saved ? JSON.parse(saved) : [1, 2, 5, 8];
    } catch {
      return [1, 2, 5, 8];
    }
  });

  useEffect(() => {
    localStorage.setItem('freshmart-user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('freshmart-logged-in', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('freshmart-addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('freshmart-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('freshmart-pincode', JSON.stringify(deliveryPincode));
  }, [deliveryPincode]);

  useEffect(() => {
    localStorage.setItem('freshmart-recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addRecentlyViewed = (productId) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  const login = (email, password) => {
    setIsLoggedIn(true);
    addToast(`Welcome back, ${user.name}!`, 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    addToast('You have been logged out', 'info');
  };

  const register = (name, email) => {
    const updated = { ...user, name: name || 'Shopper', email: email || 'shopper@freshmart.com' };
    setUser(updated);
    setIsLoggedIn(true);
    addToast(`Welcome to FreshMart, ${updated.name}! 50 welcome points added.`, 'success');
  };

  const updateUserProfile = (fields) => {
    setUser((prev) => ({ ...prev, ...fields }));
    addToast('Profile details updated successfully', 'success');
  };

  const addAddress = (addressData) => {
    const newAddr = {
      ...addressData,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0 ? true : Boolean(addressData.isDefault)
    };
    setAddresses((prev) => {
      if (newAddr.isDefault) {
        return [newAddr, ...prev.map((a) => ({ ...a, isDefault: false }))];
      }
      return [...prev, newAddr];
    });
    addToast('New delivery address added', 'success');
  };

  const deleteAddress = (addressId) => {
    setAddresses((prev) => prev.filter((a) => a.id !== addressId));
    addToast('Address removed', 'info');
  };

  const setDefaultAddress = (addressId) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === addressId
      }))
    );
    addToast('Default delivery address updated', 'success');
  };

  const placeNewOrder = (orderData) => {
    const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      status: 'Order Placed',
      statusColor: 'emerald',
      deliveryTime: orderData.deliverySlot || 'Today · 5:00 PM - 7:00 PM',
      address: orderData.addressText || `${addresses[0]?.street}, ${addresses[0]?.city}`,
      items: orderData.items,
      subtotal: orderData.subtotal,
      delivery: orderData.deliveryFee,
      discount: orderData.discountAmount,
      total: orderData.grandTotal,
      paymentMethod: orderData.paymentMethod || 'Credit Card'
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const changePincode = (zip) => {
    const availableZips = {
      '10001': { city: 'Manhattan, NY', status: 'Express 30-min Delivery' },
      '10002': { city: 'Lower East Side, NY', status: 'Same Day Delivery' },
      '10025': { city: 'Upper West Side, NY', status: 'Express 30-min Delivery' },
      '11201': { city: 'Brooklyn Heights, NY', status: 'Same Day Delivery' },
      '90210': { city: 'Beverly Hills, CA', status: 'Next Day Fresh Morning' }
    };

    if (availableZips[zip]) {
      const match = availableZips[zip];
      setDeliveryPincode({ zip, ...match });
      addToast(`Delivery available to ${match.city} (${zip})! ${match.status}`, 'success');
      return true;
    } else {
      setDeliveryPincode({ zip, city: 'Standard Zone', status: 'Standard 1-2 Day Delivery' });
      addToast(`Standard delivery available for PIN ${zip}`, 'info');
      return true;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        register,
        updateUserProfile,
        addresses,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        placeNewOrder,
        deliveryPincode,
        changePincode,
        recentlyViewed,
        addRecentlyViewed
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
