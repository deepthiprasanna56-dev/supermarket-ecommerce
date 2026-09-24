import { useState, useEffect } from 'react';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';
import { Link } from 'react-router-dom';
import { Flame, Clock, ArrowRight, Zap } from 'lucide-react';

export default function FlashDeals({ onQuickView }) {
  // Countdown timer state initialized to 7 hours 42 mins 19 secs
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 }; // reset cycle
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter((p) => p.isDeal).slice(0, 4);

  const format2 = (n) => String(n).padStart(2, '0');

  return (
    <section className="py-14 bg-gradient-to-b from-rose-50/50 to-stone-50 dark:from-stone-900/40 dark:to-stone-950 border-y border-rose-100 dark:border-stone-800">
      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Countdown Timer */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <Flame className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>LIMITED QUANTITY FLASH SALE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
              Today&rsquo;s Fresh Grocery Deals
            </h2>
          </div>

          {/* Real-time Ticking Countdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-400 mr-2">
              <Clock className="w-4 h-4 text-rose-500" />
              <span>Ends in:</span>
            </div>
            <div className="flex items-center gap-1 font-mono">
              <div className="px-2.5 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-800 text-white font-extrabold text-sm shadow">
                {format2(timeLeft.hours)}
              </div>
              <span className="text-stone-900 dark:text-stone-100 font-bold">:</span>
              <div className="px-2.5 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-800 text-white font-extrabold text-sm shadow">
                {format2(timeLeft.minutes)}
              </div>
              <span className="text-stone-900 dark:text-stone-100 font-bold">:</span>
              <div className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white font-extrabold text-sm shadow">
                {format2(timeLeft.seconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {dealProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* View All Deals button */}
        <div className="mt-8 text-center">
          <Link
            to="/shop?deals=true"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-stone-900 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shadow-sm"
          >
            <span>See All 12 Flash Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

