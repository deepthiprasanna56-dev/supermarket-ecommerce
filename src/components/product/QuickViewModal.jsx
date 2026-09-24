import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../common/Modal';
import QuantitySelector from './QuantitySelector';
import ProductImage from './ProductImage';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import {
  Star,
  Heart,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Truck,
  Leaf
} from 'lucide-react';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const variants = product.variants || [{ label: product.unit, price: product.price }];
  const currentVariant = variants[selectedVariantIndex] || variants[0];
  const price = currentVariant ? currentVariant.price : product.price;
  const isWished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, currentVariant);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl">
      <div className="grid min-w-0 grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 items-start">
        {/* Left: Product Images Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800">
            <ProductImage
              src={product.images[selectedImgIndex] || product.images[0]}
              product={product}
              alt={product.name}
              className="w-full h-full"
              imageClassName="transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 dark:bg-stone-900/90 text-emerald-700 dark:text-emerald-400 shadow-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImgIndex(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImgIndex === i
                      ? 'border-emerald-600 scale-105 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <ProductImage src={img} product={product} alt="" className="w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Controls */}
        <div className="min-w-0 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {product.brand}
              </span>
              <span>{product.category}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <div className="flex text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="font-bold text-stone-800 dark:text-stone-200">{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
              ${price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-stone-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
            {product.oldPrice && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                Save ${(product.oldPrice - price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            {product.description}
          </p>

          {/* Variants Selector */}
          {variants.length > 1 && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-stone-500">
                Select Option / Weight:
              </label>
              <div className="flex flex-wrap gap-2">
                {variants.map((v, i) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setSelectedVariantIndex(i)}
                    className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition-all ${
                      selectedVariantIndex === i
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shadow-sm'
                        : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {v.label} · ${v.price.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart & Wishlist */}
          <div className="flex items-center gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
            <QuantitySelector quantity={quantity} onChange={setQuantity} size="md" />

            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add ${(price * quantity).toFixed(2)} to Bag</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-xl border transition-colors ${
                isWished
                  ? 'border-rose-300 bg-rose-50 text-rose-600 dark:bg-rose-950 dark:border-rose-800'
                  : 'border-stone-200 dark:border-stone-700 text-stone-500 hover:text-rose-500'
              }`}
              title="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${isWished ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>30-min express slot</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Fresh Guarantee</span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>View complete product details & customer reviews</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
