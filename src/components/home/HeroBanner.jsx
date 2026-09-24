import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Truck, ShieldCheck, Clock, Flame } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white py-12 lg:py-20">
      {/* Decorative ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold backdrop-blur-sm shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
              <span>FRESH HARVEST · WEEKLY SPECIALS UP TO 30% OFF</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Good Food, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-300 to-teal-200">
                Delivered in 30 Min.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Farm-fresh organic vegetables, artisan bakery sourdough, pasture-raised dairy, and daily pantry staples delivered straight from local growers to your kitchen.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-7 py-3.5 bg-lime-400 hover:bg-lime-300 text-stone-950 font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-lime-500/20 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>Shop Today&rsquo;s Harvest</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/shop?deals=true"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-800/80 hover:bg-emerald-700/80 text-emerald-100 font-semibold text-sm rounded-xl border border-emerald-600/50 backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Explore Flash Deals</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-left border-t border-emerald-800/60 text-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-lime-400 shrink-0" />
                <div>
                  <div className="font-bold text-white leading-tight">30-Min Fast</div>
                  <div className="text-[11px] text-emerald-300/80">Chilled delivery</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
                <div>
                  <div className="font-bold text-white leading-tight">100% Organic</div>
                  <div className="text-[11px] text-emerald-300/80">Certified crops</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-lime-400 shrink-0" />
                <div>
                  <div className="font-bold text-white leading-tight">Fresh Daily</div>
                  <div className="text-[11px] text-emerald-300/80">Packed at dawn</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Grocery Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-700/40 bg-stone-900 group">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                alt="Fresh Organic Vegetables & Groceries"
                className="w-full h-80 sm:h-96 object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent" />

              {/* Floating Promo Pill */}
              <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-xl text-stone-900 dark:text-stone-100 border border-stone-200/80 dark:border-stone-800">
                <div className="text-[10px] uppercase font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  NEW MEMBER PERK
                </div>
                <div className="text-xl font-black text-rose-600 dark:text-rose-400 leading-tight">
                  20% OFF
                </div>
                <div className="text-[11px] text-stone-500 font-medium">Use code FRESH20</div>
              </div>

              {/* Floating Customer Stat */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-stone-800 text-white flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold flex items-center gap-1.5">
                    <span>🌟 4.9/5 Rating</span>
                    <span className="text-xs text-stone-400">(4,200+ reviews)</span>
                  </div>
                  <div className="text-xs text-stone-300 mt-0.5">
                    12,500+ happy households stocked this week
                  </div>
                </div>
                <Link
                  to="/shop"
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

