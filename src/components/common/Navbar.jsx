import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import SearchBar from './SearchBar';
import MegaMenu from './MegaMenu';
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  MapPin,
  Flame,
  Leaf
} from 'lucide-react';

export default function Navbar({ onOpenLocationModal }) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItemsCount, subtotal, setIsCartOpen, cartBadgeBounced } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isLoggedIn, deliveryPincode } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      {/* Main Navbar */}
      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Left: Mobile hamburger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 fill-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-none">
                  Fresh<span className="text-emerald-600 dark:text-emerald-400">Mart</span>
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-700 dark:text-emerald-400">
                  Supermarket
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-4">
            <SearchBar />
          </div>

          {/* Right: Actions (Location, Wishlist, Cart Drawer, Account) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Location Badge (hidden on mobile, in bar) */}
            <button
              onClick={onOpenLocationModal}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 bg-stone-50 dark:bg-stone-800/60 text-left transition-colors"
            >
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="text-[11px] leading-tight">
                <div className="text-stone-400 dark:text-stone-500 font-medium">Deliver to</div>
                <div className="font-bold text-stone-800 dark:text-stone-200 truncate max-w-[100px]">
                  {deliveryPincode.city}
                </div>
              </div>
            </button>

            {/* Wishlist */}
            <Link
              to="/account?tab=wishlist"
              className="relative p-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Profile */}
            <Link
              to="/account"
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="My Account"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center shrink-0 border border-emerald-300 dark:border-emerald-700">
                {isLoggedIn && user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                )}
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <span className="text-stone-400 dark:text-stone-500 block text-[10px]">
                  {isLoggedIn ? 'Hello,' : 'Welcome'}
                </span>
                <span className="font-bold text-stone-800 dark:text-stone-100 truncate block max-w-[80px]">
                  {isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}
                </span>
              </div>
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white transition-all shadow-md hover:shadow-emerald-600/25 ${
                cartBadgeBounced ? 'ring-4 ring-emerald-300 dark:ring-emerald-700 scale-105' : ''
              }`}
              aria-label="Open shopping cart drawer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span
                    className={`absolute -top-2 -right-2.5 min-w-[20px] h-5 px-1 bg-amber-400 text-stone-950 text-[11px] font-extrabold rounded-full flex items-center justify-center shadow transition-transform ${
                      cartBadgeBounced ? 'scale-125' : 'scale-100'
                    }`}
                  >
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left text-xs leading-tight">
                <span className="text-[10px] text-emerald-100 uppercase font-mono font-medium">Cart</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Sub-Nav Bar with Departments Mega Menu & Nav Links */}
      <div className="hidden lg:block border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/60">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 text-sm font-semibold">
            {/* Mega Menu Button */}
            <div className="relative">
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm text-xs font-bold uppercase tracking-wider"
              >
                <Menu className="w-4 h-4" />
                <span>All Departments</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Quick Links */}
            <nav className="flex items-center gap-6 text-stone-600 dark:text-stone-300 text-xs font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${
                    isActive ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${
                    isActive ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''
                  }`
                }
              >
                Shop All Groceries
              </NavLink>
              <NavLink
                to="/shop?deals=true"
                className="flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-bold"
              >
                <Flame className="w-3.5 h-3.5 fill-rose-500" />
                <span>Today&rsquo;s Flash Deals</span>
              </NavLink>
              <NavLink
                to="/shop?category=Fresh%20Produce"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Fresh Produce
              </NavLink>
              <NavLink
                to="/shop?category=Dairy%20%26%20Eggs"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Dairy & Eggs
              </NavLink>
              <NavLink
                to="/shop?organic=true"
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-emerald-700 dark:text-emerald-300"
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>100% Organic</span>
              </NavLink>
              <NavLink
                to="/shop?category=Bakery%20%26%20Bread"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Bakery
              </NavLink>
              <NavLink
                to="/shop?category=Meat%20%26%20Seafood"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Meat & Seafood
              </NavLink>
            </nav>

            {/* Fresh Express Guarantee Pill */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>30 Min Express Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-6 space-y-4">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Shop All Products
            </Link>
            <Link
              to="/shop?deals=true"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <Flame className="w-4 h-4" />
              <span>Today&rsquo;s Flash Deals</span>
            </Link>
            <Link
              to="/shop?category=Fresh%20Produce"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Fresh Produce & Fruits
            </Link>
            <Link
              to="/shop?category=Dairy%20%26%20Eggs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Dairy & Eggs
            </Link>
            <Link
              to="/shop?category=Bakery%20%26%20Bread"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Bakery & Bread
            </Link>
            <Link
              to="/shop?category=Meat%20%26%20Seafood"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Meat & Seafood
            </Link>
            <Link
              to="/shop?category=Pantry%20Staples"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Pantry Staples
            </Link>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLocationModal();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-semibold"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Deliver to: {deliveryPincode.city}</span>
              </span>
              <span className="text-emerald-600">Change</span>
            </button>
            <Link
              to="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-2.5 text-center bg-stone-100 dark:bg-stone-800 rounded-xl text-xs font-bold"
            >
              My Account & Orders
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

