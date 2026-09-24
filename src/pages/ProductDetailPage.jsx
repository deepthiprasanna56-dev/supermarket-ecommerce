import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductImage from '../components/product/ProductImage';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import QuantitySelector from '../components/product/QuantitySelector';
import ProductCard from '../components/product/ProductCard';
import RecentlyViewed from '../components/product/RecentlyViewed';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  MapPin,
  Leaf,
  Check,
  Share2,
  Clock,
  Sparkles,
  MessageSquarePlus
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addRecentlyViewed, deliveryPincode, changePincode } = useAuth();
  const { addToast } = useToast();

  const product = products.find((p) => p.id === Number(id)) || products[0];

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Variant & Quantity
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Delivery Pincode Checker
  const [zipInput, setZipInput] = useState(deliveryPincode.zip);
  const [pincodeStatus, setPincodeStatus] = useState(deliveryPincode.status);

  // Customer Reviews state
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      name: 'Rebecca M.',
      rating: 5,
      date: 'Yesterday',
      verified: true,
      comment: 'Super fresh, perfectly ripe, and packaged with great care in the chilled bag. Will definitely reorder weekly!'
    },
    {
      id: 'rev-2',
      name: 'Michael T.',
      rating: 5,
      date: '4 days ago',
      verified: true,
      comment: 'Outstanding quality and taste. Beats the supermarket shelves hands down. Arrived within 30 minutes.'
    }
  ]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');

  // Track recently viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-emerald-600 underline mt-2 block">
          Return to shop
        </Link>
      </div>
    );
  }

  const variants = product.variants || [{ label: product.unit, price: product.price }];
  const currentVariant = variants[selectedVariantIndex] || variants[0];
  const price = currentVariant ? currentVariant.price : product.price;
  const isWished = isInWishlist(product.id);

  // Handle Zoom mouse movement
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, currentVariant);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentVariant);
    navigate('/checkout');
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!zipInput.trim() || zipInput.trim().length < 5) {
      addToast('Please enter a 5-digit ZIP code', 'warning');
      return;
    }
    changePincode(zipInput.trim());
    setPincodeStatus('Delivery available in 30 mins (Express Slot)');
    addToast(`Delivery available for ${zipInput}! Estimated slot: Today by 6:00 PM`, 'success');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Product link copied to clipboard!', 'info');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) {
      addToast('Please fill in your name and comment', 'error');
      return;
    }
    const newRev = {
      id: `rev-${Date.now()}`,
      name: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      verified: true,
      comment: newReviewText.trim()
    };
    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewText('');
    setShowReviewModal(false);
    addToast('Thank you! Your verified review has been published.', 'success');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs font-mono text-stone-400 dark:text-stone-500">
        <Link to="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-emerald-600 transition-colors">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link
          to={`/shop?category=${encodeURIComponent(product.category)}`}
          className="hover:text-emerald-600 transition-colors"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-stone-900 dark:text-stone-100 font-bold">{product.name}</span>
      </nav>

      {/* Main Top Section: Gallery & Purchase Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery & Zoom (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 cursor-crosshair group shadow-sm select-none"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <ProductImage
              src={product.images[selectedImageIndex] || product.images[0]}
              product={product}
              alt={product.name}
              className="w-full h-full"
              imageClassName={`transition-transform duration-200 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                    }
                  : undefined
              }
            />

            {/* Badges on Top */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
              {product.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/95 dark:bg-stone-900/95 text-emerald-700 dark:text-emerald-400 shadow-md">
                  {product.badge}
                </span>
              )}
              {product.discount && (
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-rose-500 text-white shadow-md">
                  SAVE {product.discount}%
                </span>
              )}
            </div>

            {/* Zoom helper label */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-stone-900/70 text-white text-[10px] backdrop-blur-md pointer-events-none flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
              <span>⌕ Hover to zoom in</span>
            </div>
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shadow-sm ${
                    selectedImageIndex === i
                      ? 'border-emerald-600 scale-105 ring-2 ring-emerald-500/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <ProductImage src={img} product={product} alt="" className="w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Pricing, Variant, Actions & Delivery Checker (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {product.brand}
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1 text-stone-500 hover:text-emerald-600 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rating & Stock status */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-xs">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-extrabold text-stone-900 dark:text-stone-100 ml-1">
                  {product.rating}
                </span>
                <span className="text-stone-400">({product.reviewsCount} customer reviews)</span>
              </div>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>In Stock ({product.stock} available)</span>
              </span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100">
              ${price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-base text-stone-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
            {product.oldPrice && (
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                Save ${(product.oldPrice - price).toFixed(2)}
              </span>
            )}
            <span className="text-xs text-stone-400 ml-auto font-mono">
              Unit: {currentVariant.unit || product.unit}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {product.description}
          </p>

          {/* Variant Selector */}
          {variants.length > 1 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Select Pack Size / Weight:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {variants.map((v, i) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setSelectedVariantIndex(i)}
                    className={`text-xs px-4 py-2 rounded-xl border font-bold transition-all ${
                      selectedVariantIndex === i
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shadow-sm scale-102'
                        : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    <span>{v.label}</span>
                    <span className="ml-1.5 opacity-80">${v.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity, Add to Cart, Buy Now & Wishlist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <QuantitySelector quantity={quantity} onChange={setQuantity} size="lg" />

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Grocery Bag (${(price * quantity).toFixed(2)})</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border transition-colors shadow-sm ${
                  isWished
                    ? 'border-rose-300 bg-rose-50 text-rose-600 dark:bg-rose-950 dark:border-rose-800'
                    : 'border-stone-200 dark:border-stone-700 text-stone-500 hover:text-rose-500'
                }`}
                title="Add to wishlist"
              >
                <Heart className={`w-5 h-5 ${isWished ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Instant Buy Now Button */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-sm rounded-xl transition-all shadow flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-lime-400 fill-lime-400" />
              <span>Instant Buy Now with Express Checkout</span>
            </button>
          </div>

          {/* Delivery Availability Checker */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Check Delivery Pincode Availability</span>
            </div>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={5}
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 5-digit ZIP"
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold"
              >
                Check Slot
              </button>
            </form>
            <div className="text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{pincodeStatus}</span>
            </div>
          </div>

          {/* Assurance pillars */}
          <div className="grid grid-cols-2 gap-3 text-xs text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Chilled insulated cold pack</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-emerald-600" />
              <span>100% money back freshness</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Nutrition Details Tabs */}
      <div className="pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Specifications */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 space-y-4">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Product Specifications & Origin
          </h3>
          <dl className="divide-y divide-stone-100 dark:divide-stone-800 text-xs">
            <div className="py-2.5 flex justify-between">
              <dt className="text-stone-400">Origin / Farm</dt>
              <dd className="font-semibold text-stone-800 dark:text-stone-200">{product.specs?.origin || 'Certified Regional Farm'}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-stone-400">Storage Guidance</dt>
              <dd className="font-semibold text-stone-800 dark:text-stone-200">{product.specs?.storage || 'Keep chilled'}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-stone-400">Estimated Shelf Life</dt>
              <dd className="font-semibold text-stone-800 dark:text-stone-200">{product.specs?.shelfLife || '1-2 weeks'}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-stone-400">Certifications</dt>
              <dd className="font-semibold text-emerald-700 dark:text-emerald-400">{product.specs?.certifications || 'USDA Certified'}</dd>
            </div>
          </dl>
        </div>

        {/* Nutrition Table */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 space-y-4">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Nutrition Facts ({product.nutrition?.servingSize || 'Per 100g'})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700">
              <div className="text-xs text-stone-400 font-semibold">Calories</div>
              <div className="text-base font-extrabold text-stone-900 dark:text-stone-100 mt-0.5">
                {product.nutrition?.calories || '110 kcal'}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700">
              <div className="text-xs text-stone-400 font-semibold">Total Fat</div>
              <div className="text-base font-extrabold text-stone-900 dark:text-stone-100 mt-0.5">
                {product.nutrition?.fat || '2g'}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700">
              <div className="text-xs text-stone-400 font-semibold">Carbs</div>
              <div className="text-base font-extrabold text-stone-900 dark:text-stone-100 mt-0.5">
                {product.nutrition?.carbs || '14g'}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700">
              <div className="text-xs text-stone-400 font-semibold">Protein</div>
              <div className="text-base font-extrabold text-stone-900 dark:text-stone-100 mt-0.5">
                {product.nutrition?.protein || '5g'}
              </div>
            </div>
          </div>
          <p className="text-[11px] text-stone-400 italic">
            * Percent Daily Values are based on a 2,000 calorie diet.
          </p>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="pt-8 border-t border-stone-200 dark:border-stone-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100">
              Customer Ratings & Reviews
            </h3>
            <p className="text-xs text-stone-500">
              Verified feedback from shoppers who purchased this item.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewModal(true)}
            className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Breakdown & Reviews List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Breakdown Stats (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 space-y-4">
            <div className="text-center">
              <div className="text-4xl font-black text-stone-900 dark:text-stone-100">
                {product.rating}
              </div>
              <div className="flex justify-center text-amber-400 my-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs text-stone-400">
                Based on {product.reviewsCount + reviewsList.length - 2} reviews
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-8 text-stone-500 font-semibold">5 ★</span>
                <div className="flex-1 bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-400 h-2 rounded-full w-[85%]" />
                </div>
                <span className="w-8 text-right text-stone-400 font-mono">85%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 text-stone-500 font-semibold">4 ★</span>
                <div className="flex-1 bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-400 h-2 rounded-full w-[12%]" />
                </div>
                <span className="w-8 text-right text-stone-400 font-mono">12%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 text-stone-500 font-semibold">3 ★</span>
                <div className="flex-1 bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-400 h-2 rounded-full w-[3%]" />
                </div>
                <span className="w-8 text-right text-stone-400 font-mono">3%</span>
              </div>
            </div>
          </div>

          {/* Reviews List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {rev.name}
                    </span>
                    {rev.verified && (
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-stone-400">{rev.date}</span>
                </div>

                <div className="flex text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-stone-200 dark:border-stone-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100">
              Frequently Bought Together in {product.category}
            </h3>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              See all
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Strip */}
      <RecentlyViewed currentProductId={product.id} />

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setShowReviewModal(false)}
          />
          <div className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 dark:border-stone-800 z-10 space-y-4">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Write a Product Review
            </h3>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewReviewRating(s)}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          s <= newReviewRating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Maria G."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  Your Feedback
                </label>
                <textarea
                  rows={4}
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="How was the freshness, taste, and packaging?"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

