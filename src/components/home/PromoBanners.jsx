import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';

export default function PromoBanners() {
  return (
    <section className="py-6 max-w-none mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner 1: Bakery & Breakfast */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-900 to-amber-950 text-white p-8 flex flex-col justify-between min-h-[260px] shadow-lg group">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80"
            alt="Artisan Breads & Croissants"
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />

          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-800/60 px-3 py-1 rounded-full border border-amber-600/40">
              <Tag className="w-3 h-3" />
              <span>BAKED FRESH AT 5:00 AM</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-tight">
              Artisan Hearth Breads & French Pastries
            </h3>
            <p className="text-xs text-amber-200/90 max-w-sm">
              Naturally leavened 36-hour sourdough and flaky Normandy butter croissants.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <Link
              to="/shop?category=Bakery%20%26%20Bread"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition-colors shadow-md"
            >
              <span>Explore Bakery Aisle</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Banner 2: Wild Seafood & Prime Meat */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-950 to-emerald-950 text-white p-8 flex flex-col justify-between min-h-[260px] shadow-lg group">
          <img
            src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80"
            alt="Wild Salmon & Prime Cuts"
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />

          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-700/40">
              <Tag className="w-3 h-3" />
              <span>MSC CERTIFIED SUSTAINABLE</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-tight">
              Wild Alaskan Seafood & Organic Poultry
            </h3>
            <p className="text-xs text-teal-200/90 max-w-sm">
              Direct from Bristol Bay fisheries in temperature-controlled insulated cooling boxes.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <Link
              to="/shop?category=Meat%20%26%20Seafood"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-stone-950 font-bold text-xs transition-colors shadow-md"
            >
              <span>Shop Meat & Seafood</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

