import { categories } from '../../data/categories';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategorySection() {
  return (
    <section className="py-14 max-w-none mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            BROWSE THE AISLES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Explore Supermarket Departments
          </h2>
        </div>
        <Link
          to="/shop"
          className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1.5 group"
        >
          <span>View All Aisles</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={cat.name === '100% Organic' ? '/shop?organic=true' : `/shop?category=${encodeURIComponent(cat.name)}`}
            className="group relative rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 transition-all duration-300 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 flex flex-col justify-between min-h-[170px]"
          >
            {/* Top row: Emoji & Item count */}
            <div className="flex items-center justify-between">
              <span className="text-3xl p-2 rounded-xl bg-stone-100 dark:bg-stone-800 group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full">
                {cat.itemCount} items
              </span>
            </div>

            {/* Bottom: Name & Subtitle */}
            <div className="pt-4">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                {cat.description}
              </p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Shop aisle</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Subtle background ambient gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </Link>
        ))}
      </div>
    </section>
  );
}

