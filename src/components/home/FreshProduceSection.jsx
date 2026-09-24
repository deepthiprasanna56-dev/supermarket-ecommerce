import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';

export default function FreshProduceSection({ onQuickView }) {
  const produceItems = products
    .filter((p) => p.category === 'Fresh Produce')
    .slice(0, 4);

  return (
    <section className="py-14 max-w-none mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Leaf className="w-3.5 h-3.5" />
            <span>FARM HARVEST TO TABLE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Crisp Fresh Vegetables & Fruits
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Picked at peak ripeness from certified organic regional farms.
          </p>
        </div>

        <Link
          to="/shop?category=Fresh%20Produce"
          className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1.5 group"
        >
          <span>Explore All Produce</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {produceItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
}

