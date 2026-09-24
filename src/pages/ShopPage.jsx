import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';
import FilterSidebar from '../components/product/FilterSidebar';
import QuickViewModal from '../components/product/QuickViewModal';
import RecentlyViewed from '../components/product/RecentlyViewed';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  X
} from 'lucide-react';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Derived States
  const selectedCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const onlyDeals = searchParams.get('deals') === 'true';
  const onlyOrganic = searchParams.get('organic') === 'true';

  // Local In-page Filters
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(35);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const handleSelectCategory = (cat) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (cat === '100% Organic') {
        next.delete('category');
        next.set('organic', 'true');
      } else if (cat === 'All') next.delete('category');
      else next.set('category', cat);
      return next;
    });
    setPage(1);
  };

  const handleToggleOrganic = (val) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val) next.set('organic', 'true');
      else next.delete('organic');
      return next;
    });
    setPage(1);
  };

  const handleToggleDeals = (val) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val) next.set('deals', 'true');
      else next.delete('deals');
      return next;
    });
    setPage(1);
  };

  // Extract all unique brands
  const availableBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);
  }, []);

  // Filtered & Sorted products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Search term from URL
      if (initialSearch) {
        const query = initialSearch.toLowerCase();
        const match =
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query);
        if (!match) return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      // Price range
      if (p.price > priceRange) {
        return false;
      }
      // Rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }
      // Organic
      if (onlyOrganic && !p.isOrganic) {
        return false;
      }
      // Deals
      if (onlyDeals && !p.isDeal) {
        return false;
      }
      return true;
    });
  }, [
    selectedCategory,
    initialSearch,
    selectedBrands,
    priceRange,
    minRating,
    onlyOrganic,
    onlyDeals
  ]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortOption) {
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'popular':
        return list.sort((a, b) => b.reviewsCount - a.reviewsCount);
      case 'newest':
        return list.sort((a, b) => b.id - a.id);
      case 'featured':
      default:
        return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredProducts, sortOption]);

  // Pagination slice
  const paginatedProducts = sortedProducts.slice(0, page * itemsPerPage);
  const hasMore = paginatedProducts.length < sortedProducts.length;

  // Active filter counter
  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedBrands.length +
    (priceRange < 35 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (onlyOrganic ? 1 : 0) +
    (onlyDeals ? 1 : 0) +
    (initialSearch ? 1 : 0);

  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceRange(35);
    setMinRating(0);
    setSearchParams({});
    setPage(1);
  };

  const handleToggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setPage(1);
  };

  return (
    <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner / Breadcrumb Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="text-xs font-mono font-medium text-stone-400 dark:text-stone-500 mb-1">
            Home / Shop / <span className="text-stone-900 dark:text-stone-100 font-bold">{selectedCategory}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            {selectedCategory === 'All' ? 'All Supermarket Groceries' : selectedCategory}
          </h1>
          {initialSearch && (
            <p className="text-xs text-stone-500 mt-1">
              Showing search results for &ldquo;
              <strong className="text-stone-900 dark:text-stone-100">{initialSearch}</strong>
              &rdquo;
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
            Showing <strong className="text-stone-900 dark:text-stone-100">{paginatedProducts.length}</strong> of{' '}
            <strong className="text-stone-900 dark:text-stone-100">{sortedProducts.length}</strong> products
          </span>
        </div>
      </div>

      {/* Control Bar: Mobile Filter Button, Sort Dropdown & Grid/List View Toggle */}
      <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm">
        {/* Left: Mobile Filter trigger */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Active Filter Pills (Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 flex-wrap flex-1 mr-4">
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200">
              <span>{selectedCategory}</span>
              <button aria-label="Remove category filter" onClick={() => handleSelectCategory('All')}>
                <X className="w-3 h-3 hover:text-rose-500" />
              </button>
            </span>
          )}
          {onlyOrganic && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-lime-100 dark:bg-lime-950 text-lime-800 dark:text-lime-200">
              <span>Organic</span>
              <button aria-label="Remove organic filter" onClick={() => handleToggleOrganic(false)}>
                <X className="w-3 h-3 hover:text-rose-500" />
              </button>
            </span>
          )}
          {onlyDeals && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200">
              <span>Flash Deals</span>
              <button aria-label="Remove deals filter" onClick={() => handleToggleDeals(false)}>
                <X className="w-3 h-3 hover:text-rose-500" />
              </button>
            </span>
          )}
          {selectedBrands.map((b) => (
            <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              <span>{b}</span>
              <button onClick={() => handleToggleBrand(b)}>
                <X className="w-3 h-3 hover:text-rose-500" />
              </button>
            </span>
          ))}
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-xs text-stone-500 hover:text-rose-600 underline font-medium ml-2"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Right: Sort and View mode switcher */}
        <div className="flex items-center gap-2.5 ml-auto">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
              <option value="popular">Most Popular</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center rounded-xl border border-stone-200 dark:border-stone-700 p-0.5 bg-stone-50 dark:bg-stone-800">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-stone-900 text-emerald-600 shadow-sm'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
              title="Grid view"
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-stone-900 text-emerald-600 shadow-sm'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
              title="List view"
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm sticky top-28">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            selectedBrands={selectedBrands}
            onToggleBrand={handleToggleBrand}
            priceRange={priceRange}
            onChangePriceRange={(val) => {
              setPriceRange(val);
              setPage(1);
            }}
            minRating={minRating}
            onSelectRating={(r) => {
              setMinRating(r);
              setPage(1);
            }}
            onlyOrganic={onlyOrganic}
            onToggleOrganic={handleToggleOrganic}
            onlyDeals={onlyDeals}
            onToggleDeals={handleToggleDeals}
            availableBrands={availableBrands}
            onResetFilters={resetFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {/* Product Grid & Pagination */}
        <div className="lg:col-span-3 space-y-8">
          <ProductGrid
            products={paginatedProducts}
            viewMode={viewMode}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          {/* Load More Button */}
          {hasMore && (
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={() => setPage((prev) => prev + 1)}
                className="px-8 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:border-emerald-500 text-stone-800 dark:text-stone-100 font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all"
              >
                Load More Groceries ({sortedProducts.length - paginatedProducts.length} remaining)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recently Viewed Strip */}
      <RecentlyViewed />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Mobile Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white dark:bg-stone-900 shadow-2xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-4">
                <h3 className="font-bold text-stone-900 dark:text-stone-100">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-stone-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  handleSelectCategory(cat);
                  setIsMobileFilterOpen(false);
                }}
                selectedBrands={selectedBrands}
                onToggleBrand={handleToggleBrand}
                priceRange={priceRange}
                onChangePriceRange={setPriceRange}
                minRating={minRating}
                onSelectRating={setMinRating}
                onlyOrganic={onlyOrganic}
                onToggleOrganic={handleToggleOrganic}
                onlyDeals={onlyDeals}
                onToggleDeals={handleToggleDeals}
                availableBrands={availableBrands}
                onResetFilters={resetFilters}
                activeFilterCount={activeFilterCount}
              />

              <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Apply Filters ({sortedProducts.length} Results)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

