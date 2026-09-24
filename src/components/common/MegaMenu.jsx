import { categories } from '../../data/categories';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';

export default function MegaMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Department Columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="space-y-2.5">
                <Link
                  to={`/shop?category=${encodeURIComponent(cat.name)}`}
                  onClick={onClose}
                  className="flex items-center gap-2 group"
                >
                  <span className="text-xl p-1 rounded-lg bg-stone-100 dark:bg-stone-800 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {cat.name}
                    </h4>
                    <span className="text-[11px] text-stone-400 dark:text-stone-500">
                      {cat.itemCount} items
                    </span>
                  </div>
                </Link>

                <ul className="space-y-1 pl-8 text-xs text-stone-600 dark:text-stone-400">
                  {cat.subcategories.map((sub) => (
                    <li key={sub}>
                      <Link
                        to={`/shop?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub)}`}
                        onClick={onClose}
                        className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors block py-0.5"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Promo Card inside Mega Menu */}
          <div className="lg:col-span-1 bg-gradient-to-br from-emerald-900 to-teal-950 rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 text-xs font-bold uppercase tracking-wider mb-4 border border-lime-400/30">
                <Tag className="w-3.5 h-3.5" />
                <span>Weekly Harvest Deal</span>
              </span>
              <h3 className="text-xl font-extrabold leading-tight text-white mb-2">
                20% Off All Organic Produce
              </h3>
              <p className="text-xs text-emerald-200/90 leading-relaxed mb-4">
                Use code <span className="font-mono font-bold text-lime-300 bg-emerald-800/80 px-2 py-0.5 rounded">FRESH20</span> at checkout on orders $30+.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-300 mb-6">
                <ShieldCheck className="w-4 h-4 text-lime-400" />
                <span>100% Certified Organic Guarantee</span>
              </div>
            </div>

            <Link
              to="/shop?category=Fresh%20Produce"
              onClick={onClose}
              className="relative z-10 w-full py-2.5 px-4 bg-lime-400 hover:bg-lime-300 text-stone-950 font-bold text-xs rounded-xl transition-all duration-200 shadow-md text-center flex items-center justify-center gap-2"
            >
              <span>Shop Fresh Produce</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Background decorative glow */}
            <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-lime-500/20 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

