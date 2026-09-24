import { categories } from '../../data/categories';
import { Star, RotateCcw, Filter, ChevronDown, Check } from 'lucide-react';

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedBrands,
  onToggleBrand,
  priceRange,
  onChangePriceRange,
  minRating,
  onSelectRating,
  onlyOrganic,
  onToggleOrganic,
  onlyDeals,
  onToggleDeals,
  availableBrands = [],
  onResetFilters,
  activeFilterCount = 0
}) {
  return (
    <aside className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
            Filters
          </h3>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Department
        </h4>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCategory('All')}
            className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              selectedCategory === 'All'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <span>All Departments</span>
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.name)}
                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span>{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </span>
                <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-stone-400'}`}>
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Highlights: Organic & Deals */}
      <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Preferences
        </h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-xs font-medium text-stone-700 dark:text-stone-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyOrganic}
              onChange={(e) => onToggleOrganic(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 rounded border-stone-300 dark:border-stone-700 dark:bg-stone-800"
            />
            <span className="flex items-center gap-1.5">
              <span>🌱 100% Certified Organic</span>
            </span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-medium text-stone-700 dark:text-stone-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyDeals}
              onChange={(e) => onToggleDeals(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 rounded border-stone-300 dark:border-stone-700 dark:bg-stone-800"
            />
            <span className="flex items-center gap-1.5">
              <span>🔥 Deals & Flash Sales</span>
            </span>
          </label>
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Max Price
          </span>
          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">
            ${priceRange}
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="35"
          step="1"
          value={priceRange}
          onChange={(e) => onChangePriceRange(Number(e.target.value))}
          className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
        <div className="flex justify-between text-[10px] text-stone-400 font-mono">
          <span>$2</span>
          <span>$18</span>
          <span>$35</span>
        </div>
      </div>

      {/* Brands Filter */}
      {availableBrands.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Brands
          </h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {availableBrands.map((brand) => {
              const isChecked = selectedBrands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center gap-2.5 text-xs text-stone-700 dark:text-stone-300 cursor-pointer hover:text-emerald-600 transition-colors select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleBrand(brand)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300 dark:border-stone-700 dark:bg-stone-800"
                  />
                  <span className="truncate">{brand}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Customer Rating Filter */}
      <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Customer Rating
        </h4>
        <div className="space-y-1">
          {[
            { val: 0, label: 'All Ratings' },
            { val: 4.8, label: '4.8 ★ & above' },
            { val: 4.5, label: '4.5 ★ & above' },
            { val: 4.0, label: '4.0 ★ & above' }
          ].map((r) => (
            <button
              key={r.val}
              type="button"
              onClick={() => onSelectRating(r.val)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                minRating === r.val
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <span>{r.label}</span>
              {minRating === r.val && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
