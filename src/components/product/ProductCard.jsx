import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import {
  Heart,
  Eye,
  Plus,
  Star,
  Sparkles,
  Leaf,
  Flame,
  Check
} from 'lucide-react';
import ProductImage from './ProductImage';

export default function ProductCard({
  product,
  onQuickView,
  viewMode = 'grid' // 'grid' or 'list'
}) {
  const { addToCart, items } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const variants = product.variants || [{ label: product.unit, price: product.price }];
  const currentVariant = variants[selectedVariantIndex] || variants[0];
  const price = currentVariant ? currentVariant.price : product.price;

  const isWished = isInWishlist(product.id);
  const cartItem = items.find(
    (i) => i.productId === product.id && i.unit === currentVariant.label
  );
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, currentVariant);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  if (viewMode === 'list') {
    return (
      <div className="group relative bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 p-4 transition-all duration-300 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700 flex flex-col sm:flex-row gap-5 items-center">
        {/* Thumbnail & Badges */}
        <div className="relative w-full sm:w-48 aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <ProductImage
              src={product.images[0]}
              product={product}
              alt={product.name}
              loading="lazy"
              className="w-full h-full"
              imageClassName="transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            {product.badge && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 dark:bg-stone-900/90 text-emerald-700 dark:text-emerald-400 shadow-sm border border-emerald-100 dark:border-emerald-800">
                {product.badge}
              </span>
            )}
            {product.discount && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-500 text-white shadow-sm">
                −{product.discount}%
              </span>
            )}
          </div>

          {/* Quick Actions (Wishlist & Quick View) */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
                isWished
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 scale-105'
                  : 'bg-white/90 dark:bg-stone-900/90 text-stone-500 hover:text-rose-500'
              }`}
              title="Save to wishlist"
            >
              <Heart className={`w-4 h-4 ${isWished ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={handleQuickViewClick}
              className="p-2 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 backdrop-blur-md transition-colors shadow-sm"
              title="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 w-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-400 dark:text-stone-500 mb-1">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                {product.brand}
              </span>
              <span>•</span>
              <span>{product.category}</span>
              {product.isOrganic && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center gap-0.5 text-lime-600 dark:text-lime-400 font-medium">
                    <Leaf className="w-3 h-3" /> Organic
                  </span>
                </>
              )}
            </div>

            <Link
              to={`/product/${product.id}`}
              className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors line-clamp-1"
            >
              {product.name}
            </Link>

            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1 mb-2">
              {product.description}
            </p>

            <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <span className="font-bold">{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 mt-3">
            {/* Variant Selector */}
            {variants.length > 1 && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-stone-400">Size:</span>
                <div className="flex gap-1">
                  {variants.map((v, i) => (
                    <button
                      key={v.label}
                      type="button"
                      onClick={() => setSelectedVariantIndex(i)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                        selectedVariantIndex === i
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                          : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 ml-auto">
              <div className="text-right">
                <div className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
                  ${price.toFixed(2)}
                </div>
                {product.oldPrice && (
                  <div className="text-xs text-stone-400 line-through">
                    ${product.oldPrice.toFixed(2)}
                  </div>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                {inCartQty > 0 ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added ({inCartQty})</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Card View (Default)
  return (
    <div className="group relative bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1">
      {/* Top Image Container */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <ProductImage
            src={product.images[0]}
            product={product}
            alt={product.name}
            loading="lazy"
            className="w-full h-full"
            imageClassName="transition-transform duration-500 group-hover:scale-108"
          />
        </Link>

        {/* Badges on Image */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start pointer-events-none">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-white/95 dark:bg-stone-900/95 text-emerald-800 dark:text-emerald-300 shadow-sm border border-emerald-100 dark:border-emerald-800 backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase bg-rose-500 text-white shadow-sm">
              −{product.discount}%
            </span>
          )}
        </div>

        {/* Quick Action Buttons (Wishlist & QuickView) */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 transition-opacity">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isWished
                ? 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 scale-105'
                : 'bg-white/90 dark:bg-stone-900/90 text-stone-500 hover:text-rose-500'
            }`}
            title="Save to wishlist"
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWished ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={handleQuickViewClick}
            className="p-2 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 backdrop-blur-md transition-colors shadow-sm"
            title="Quick view"
            aria-label="Quick view product"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Unit */}
          <div className="flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-semibold truncate max-w-[120px]">
              {product.brand}
            </span>
            <span className="text-[10px]">{currentVariant.unit || product.unit}</span>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-bold text-stone-900 dark:text-stone-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors line-clamp-2 leading-snug mb-1.5"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 mb-2">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-bold text-stone-700 dark:text-stone-200">{product.rating}</span>
            <span className="text-stone-400">({product.reviewsCount})</span>
          </div>

          {/* Variant Selector Dropdown if multiple variants */}
          {variants.length > 1 && (
            <div className="mb-2.5">
              <select
                value={selectedVariantIndex}
                onChange={(e) => setSelectedVariantIndex(Number(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="w-full text-[11px] font-medium py-1 px-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {variants.map((v, i) => (
                  <option key={v.label} value={i}>
                    {v.label} — ${v.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2 mt-2">
          <div>
            <div className="text-base font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
              ${price.toFixed(2)}
            </div>
            {product.oldPrice && (
              <div className="text-[11px] text-stone-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm flex items-center gap-1 active:scale-95 ${
              inCartQty > 0
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
            title="Add to grocery bag"
          >
            {inCartQty > 0 ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{inCartQty}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
