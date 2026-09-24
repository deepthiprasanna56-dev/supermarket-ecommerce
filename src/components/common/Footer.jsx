import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import {
  Leaf,
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Heart
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    addToast('🎉 Subscribed to the Fresh Harvest newsletter! Enjoy $10 off your next haul.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      {/* Trust Pillars */}
      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-stone-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-800/50 border border-stone-700/50">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Min Fast Delivery</h4>
              <p className="text-xs text-stone-400 mt-0.5">Direct to your doorstep in chilled bags</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-800/50 border border-stone-700/50">
            <div className="w-12 h-12 rounded-xl bg-lime-500/10 text-lime-400 flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Farm Fresh</h4>
              <p className="text-xs text-stone-400 mt-0.5">Sustainably sourced from local certified growers</p>
            </div>
          </div>

          <div id="freshness-guarantee" className="flex items-center gap-4 p-4 rounded-2xl bg-stone-800/50 border border-stone-700/50 scroll-mt-32">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Freshness Guarantee</h4>
              <p className="text-xs text-stone-400 mt-0.5">Not crisp or fresh? We refund without questions</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-800/50 border border-stone-700/50">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Instant Contactless Support</h4>
              <p className="text-xs text-stone-400 mt-0.5">Available 7 days a week from 6 AM to 11 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Leaf className="w-5 h-5 fill-white/20" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Fresh<span className="text-emerald-400">Mart</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Your neighborhood online supermarket. Everyday low prices on farm-fresh produce, organic dairy, artisanal bakery, prime meats, and pantry essentials.
            </p>

            {/* Newsletter form */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Join our Fresh Letter
              </label>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for $10 off..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                Weekly recipes, member flash sales, and zero spam.
              </p>
            </form>
          </div>

          {/* Quick Departments */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Aisles & Departments
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/shop?category=Fresh%20Produce" className="hover:text-white transition-colors">
                  Fresh Fruits & Veggies
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Dairy%20%26%20Eggs" className="hover:text-white transition-colors">
                  Dairy, Milk & Farm Eggs
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Bakery%20%26%20Bread" className="hover:text-white transition-colors">
                  Fresh Artisan Breads
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Meat%20%26%20Seafood" className="hover:text-white transition-colors">
                  Wild Seafood & Poultry
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Pantry%20Staples" className="hover:text-white transition-colors">
                  Pantry & Olive Oils
                </Link>
              </li>
              <li>
                <Link to="/shop?organic=true" className="hover:text-white transition-colors text-emerald-400 font-semibold">
                  100% Certified Organic
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/account?tab=orders" className="hover:text-white transition-colors">
                  Track Your Delivery
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Shopping Cart & Bag
                </Link>
              </li>
              <li>
                <Link to="/account?tab=addresses" className="hover:text-white transition-colors">
                  Delivery Addresses
                </Link>
              </li>
              <li>
                <Link to="/shop?deals=true" className="hover:text-white transition-colors">
                  Today&rsquo;s Flash Coupons
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Fresh VIP Rewards (520 pts)
                </Link>
              </li>
              <li>
                <Link to="/#freshness-guarantee" className="hover:text-white transition-colors">
                  Freshness Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Mobile App */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              FreshMart Mobile App
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Order on the go with real-time driver tracking and exclusive mobile coupons.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-800 border border-stone-700 hover:border-stone-600 transition-colors cursor-pointer">
                <span className="text-2xl"></span>
                <div className="text-left text-xs leading-tight">
                  <div className="text-[10px] text-stone-400 uppercase">Download on the</div>
                  <div className="font-bold text-white">Apple App Store</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-800 border border-stone-700 hover:border-stone-600 transition-colors cursor-pointer">
                <span className="text-xl">▶</span>
                <div className="text-left text-xs leading-tight">
                  <div className="text-[10px] text-stone-400 uppercase">Get it on</div>
                  <div className="font-bold text-white">Google Play Store</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Badges */}
      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div>
          © 2026 FreshMart Supermarket Inc. All rights reserved. Made with{' '}
          <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500 mx-0.5" /> for healthy tables.
        </div>

        {/* Accepted Payment badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700 text-[10px] font-mono font-bold text-stone-300">
            VISA
          </span>
          <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700 text-[10px] font-mono font-bold text-stone-300">
            MASTERCARD
          </span>
          <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700 text-[10px] font-mono font-bold text-stone-300">
            AMEX
          </span>
          <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700 text-[10px] font-mono font-bold text-stone-300">
            APPLE PAY
          </span>
          <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700 text-[10px] font-mono font-bold text-stone-300">
            GOOGLE PAY
          </span>
        </div>
      </div>
    </footer>
  );
}

