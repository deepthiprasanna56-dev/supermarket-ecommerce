import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { products } from '../../data/products';

export default function SearchBar({ placeholder = 'Search 5,000+ groceries, organic fruits, daily essentials...' }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const popularSearches = ['Organic Avocados', 'Sourdough', 'Greek Yogurt', 'Wild Salmon', 'Olive Oil', 'Bananas'];

  const results = query.trim().length > 0
    ? products
        .filter((p) =>
          `${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectProduct = (productId) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/product/${productId}`);
  };

  const handleSelectTag = (tag) => {
    setQuery(tag);
    setIsOpen(false);
    navigate(`/shop?search=${encodeURIComponent(tag)}`);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-stone-400 dark:text-stone-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder={placeholder}
            className="w-full pl-11 pr-20 py-2.5 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-100/80 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-stone-900 transition-all shadow-inner"
          />
          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors shadow-sm"
              aria-label="Submit search"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </form>

      {/* Live Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-40 animate-in fade-in zoom-in-95 duration-150">
          {/* Quick popular tags if no query */}
          {query.trim().length === 0 ? (
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Popular Grocery Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleSelectTag(tag)}
                    className="text-xs px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 border border-stone-200/60 dark:border-stone-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              <div className="p-2 text-xs font-semibold text-stone-400 dark:text-stone-500 px-4">
                Found {results.length} matching items
              </div>
              <div className="max-h-80 overflow-y-auto p-1.5">
                {results.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSelectProduct(product.id)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/70 text-left transition-colors group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200 dark:border-stone-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                        {product.category} · {product.unit}
                      </div>
                      <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {product.name}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        ${product.price.toFixed(2)}
                      </div>
                      {product.oldPrice && (
                        <div className="text-xs text-stone-400 line-through">
                          ${product.oldPrice.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="w-full py-2.5 px-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View all results for &ldquo;{query}&rdquo;</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-stone-500 dark:text-stone-400">
              No products found matching &ldquo;<span className="font-semibold text-stone-800 dark:text-stone-200">{query}</span>&rdquo;.
              <div className="mt-2 text-xs text-stone-400">Try searching for apples, eggs, sourdough, or avocado.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
