import { useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FlashDeals from '../components/home/FlashDeals';
import FreshProduceSection from '../components/home/FreshProduceSection';
import PromoBanners from '../components/home/PromoBanners';
import GroceryEssentials from '../components/home/GroceryEssentials';
import Testimonials from '../components/home/Testimonials';
import QuickViewModal from '../components/product/QuickViewModal';
import RecentlyViewed from '../components/product/RecentlyViewed';
import ThreeDProductCarousel from '../components/home/ThreeDProductCarousel';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="space-y-6">
      <HeroBanner />
      <CategorySection />
      <ThreeDProductCarousel />
      <FlashDeals onQuickView={(p) => setQuickViewProduct(p)} />
      <FreshProduceSection onQuickView={(p) => setQuickViewProduct(p)} />
      <PromoBanners />
      <GroceryEssentials onQuickView={(p) => setQuickViewProduct(p)} />

      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <RecentlyViewed />
      </div>

      <Testimonials />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

