import { useState } from 'react';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function GroceryEssentials({ onQuickView }) {
  const [activeTab, setActiveTab] = useState('Best Sellers');

  const tabs = ['Best Sellers', 'Dairy & Eggs', 'Pantry Staples', 'Beverages & Juices'];

  const getFilteredProducts = () => {
    if (activeTab === 'Best Sellers') {
      return products.filter((p) => p.badge === 'Best Seller').slice(0, 4);
    }
    return products.filter((p) => p.category === activeTab).slice(0, 4);
  };

  const displayedProducts = getFilteredProducts();

  return (
    <section className="py-14 bg-stone-100/60 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800">
      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STOCK YOUR KITCHEN</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
              Everyday Grocery Essentials
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === tab
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <span>Browse all pantry & dairy groceries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

