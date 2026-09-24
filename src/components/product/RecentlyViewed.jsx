import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';
import { Link } from 'react-router-dom';
import { Eye, Star, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function RecentlyViewed({ currentProductId = null }) {
  const { recentlyViewed } = useAuth();
  const { addToCart } = useCart();

  const recentProducts = recentlyViewed
    .filter((id) => id !== currentProductId)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 6);

  if (recentProducts.length === 0) return null;

  return (
    <div className="pt-10 border-t border-stone-200 dark:border-stone-800">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
          Recently Viewed Groceries
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {recentProducts.map((p) => (
          <div
            key={p.id}
            className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group"
          >
            <Link to={`/product/${p.id}`} className="block">
              <div className="aspect-square rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 mb-2">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-[10px] text-stone-400 uppercase font-semibold truncate">
                {p.category}
              </div>
              <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate group-hover:text-emerald-600 transition-colors">
                {p.name}
              </h4>
            </Link>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <span className="text-xs font-extrabold text-stone-900 dark:text-stone-100">
                ${p.price.toFixed(2)}
              </span>
              <button
                type="button"
                onClick={() => addToCart(p, 1)}
                className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white transition-colors"
                title="Add to cart"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
