import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AccountPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';

  const {
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
    orders
  } = useAuth();

  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  // Login / Register state if logged out
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  // Profile Edit state
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });

  // Add Address Modal state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({
    type: 'Home',
    fullName: user.name,
    street: '',
    city: '',
    state: 'NY',
    zipCode: '',
    phone: user.phone,
    isDefault: false
  });

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(authEmail, authPassword);
    } else {
      register(authName, authEmail);
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateUserProfile(profileForm);
  };

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (!newAddressForm.street || !newAddressForm.city || !newAddressForm.zipCode) {
      addToast('Please fill in street, city and ZIP', 'warning');
      return;
    }
    addAddress(newAddressForm);
    setShowAddressModal(false);
    setNewAddressForm({
      type: 'Home',
      fullName: user.name,
      street: '',
      city: '',
      state: 'NY',
      zipCode: '',
      phone: user.phone,
      isDefault: false
    });
  };

  const handleReorder = (order) => {
    order.items?.forEach((item) => {
      const p = products.find((prod) => prod.id === item.id) || {
        id: item.id,
        name: item.name,
        price: item.price,
        unit: item.unit,
        images: [item.image || '']
      };
      addToCart(p, item.quantity);
    });
    addToast(`Reordered ${order.items?.length || 0} items from ${order.id}! Added to cart.`, 'success');
  };

  // Wishlist products
  const wishlistedProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  // If user is logged out, show Login / Register Card
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold text-xl shadow-md">
              ✦
            </div>
            <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100">
              {authMode === 'login' ? 'Welcome Back!' : 'Create FreshMart Account'}
            </h2>
            <p className="text-xs text-stone-500">
              Access your order history, saved addresses, and member reward discounts.
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMode === 'login'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow'
                  : 'text-stone-500'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMode === 'register'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow'
                  : 'text-stone-500'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-3.5">
            {authMode === 'register' && (
              <div>
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 mt-2"
            >
              {authMode === 'login' ? 'Sign In to FreshMart' : 'Create Free Account & Get 50 Pts'}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-stone-400">
            Demo Mode: You can sign in with any email and password!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Profile Card / Hero */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-800/40">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-400 shadow-md shrink-0">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl font-black tracking-tight">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30 text-[10px] font-extrabold uppercase">
                {user.tier}
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 mt-1">{user.email} · {user.phone}</p>
            <div className="flex items-center gap-4 text-xs text-emerald-300 font-semibold mt-2">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{user.rewardPoints} Fresh Points</span>
              </span>
              <span>•</span>
              <span>Member since {user.memberSince}</span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-stone-800/80 hover:bg-rose-950/60 border border-stone-700 hover:border-rose-700 text-stone-300 hover:text-rose-300 text-xs font-bold transition-colors flex items-center gap-1.5 self-center sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 dark:border-stone-800">
        {[
          { id: 'profile', label: 'Profile Details', icon: User },
          { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
          { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
          { id: 'addresses', label: `Saved Addresses (${addresses.length})`, icon: MapPin },
          { id: 'settings', label: 'Account Settings', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profile Information */}
      {activeTab === 'profile' && (
        <div className="max-w-xl p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Personal Information
          </h2>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: My Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <EmptyState
              icon="orders"
              title="No orders placed yet"
              description="Your order history will appear here once you make your first supermarket grocery purchase."
              actionText="Shop Now"
              actionLink="/shop"
            />
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                        {order.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                        {order.status}
                      </span>
                    </div>
                    <div className="text-stone-400 mt-0.5">
                      Ordered on {order.date} · Delivery window: {order.deliveryTime}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                      Total: ${Number(order.total).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleReorder(order)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder Basket</span>
                    </button>
                  </div>
                </div>

                {/* Items preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 flex items-center gap-3 text-xs"
                    >
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=100&q=80'}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover bg-stone-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-stone-900 dark:text-stone-100 truncate">
                          {item.name}
                        </div>
                        <div className="text-stone-400">
                          {item.quantity}x {item.unit} · ${Number(item.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistedProducts.length === 0 ? (
            <EmptyState
              icon="wishlist"
              title="Your wishlist is empty"
              description="Save your favorite avocados, organic milk, and sourdough loaves for quick 1-click reordering."
              actionText="Browse Groceries"
              actionLink="/shop"
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlistedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Delivery Locations
            </h2>
            <button
              onClick={() => setShowAddressModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-stone-900 dark:text-stone-100 text-sm">
                    {addr.type} ({addr.fullName})
                  </span>
                  {addr.isDefault && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                      DEFAULT
                    </span>
                  )}
                </div>
                <div className="text-stone-600 dark:text-stone-300">{addr.street}</div>
                <div className="text-stone-500">
                  {addr.city}, {addr.state} {addr.zipCode}
                </div>
                <div className="text-[11px] text-stone-400">Tel: {addr.phone}</div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  {!addr.isDefault ? (
                    <button
                      type="button"
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-xs text-emerald-600 font-semibold hover:underline"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Default Address
                    </span>
                  )}
                  {addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteAddress(addr.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Account Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-xl p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-5 text-xs">
          <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Account Preferences
          </h2>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer">
              <div>
                <div className="font-bold text-stone-900 dark:text-stone-100">
                  SMS Order Tracking Updates
                </div>
                <div className="text-stone-400">Receive text alerts when driver is 10 mins away</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-600" />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer">
              <div>
                <div className="font-bold text-stone-900 dark:text-stone-100">
                  Fresh Harvest Weekly Newsletter
                </div>
                <div className="text-stone-400">Exclusive member coupons and farm season arrivals</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-600" />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer">
              <div>
                <div className="font-bold text-stone-900 dark:text-stone-100">
                  Substitute Out-of-Stock Items
                </div>
                <div className="text-stone-400">Allow personal shopper to choose equivalent organic pick</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-600" />
            </label>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddressModal && (
        <Modal
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          title="Add New Delivery Address"
        >
          <form onSubmit={handleCreateAddress} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  Address Type
                </label>
                <select
                  value={newAddressForm.type}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={newAddressForm.fullName}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                Street Address
              </label>
              <input
                type="text"
                required
                value={newAddressForm.street}
                onChange={(e) => setNewAddressForm({ ...newAddressForm, street: e.target.value })}
                placeholder="e.g. 124 Main Street, Apt 5"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={newAddressForm.city}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, city: e.target.value })}
                  placeholder="New York"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  State
                </label>
                <input
                  type="text"
                  required
                  value={newAddressForm.state}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, state: e.target.value })}
                  placeholder="NY"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={newAddressForm.zipCode}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, zipCode: e.target.value })}
                  placeholder="10001"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            <div className="pt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setShowAddressModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow"
              >
                Save Address
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

