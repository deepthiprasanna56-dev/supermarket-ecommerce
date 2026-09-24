import ProductCard from './ProductCard';
import EmptyState from '../common/EmptyState';

export default function ProductGrid({
  products = [],
  viewMode = 'grid',
  onQuickView,
  emptyTitle = 'No products found',
  emptyDescription = 'Try adjusting your filters or search term to discover more groceries.'
}) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon="search"
        title={emptyTitle}
        description={emptyDescription}
        actionText="Clear All Filters"
        actionLink="/shop"
      />
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode="list"
            onQuickView={onQuickView}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode="grid"
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
