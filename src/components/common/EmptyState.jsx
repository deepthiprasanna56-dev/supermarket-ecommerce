import { ShoppingBag, Heart, Search, PackageX } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  icon = 'cart',
  title = 'No items found',
  description = 'Looks like there is nothing here right now.',
  actionText = 'Start Shopping',
  actionLink = '/shop',
  onAction = null
}) {
  const renderIcon = () => {
    switch (icon) {
      case 'wishlist':
        return <Heart className="w-16 h-16 text-rose-400 stroke-1" />;
      case 'search':
        return <Search className="w-16 h-16 text-amber-500 stroke-1" />;
      case 'orders':
        return <PackageX className="w-16 h-16 text-emerald-500 stroke-1" />;
      case 'cart':
      default:
        return <ShoppingBag className="w-16 h-16 text-emerald-500 stroke-1" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center max-w-md mx-auto">
      <div className="w-24 h-24 mb-6 rounded-full bg-stone-100 dark:bg-stone-800/80 flex items-center justify-center shadow-inner">
        {renderIcon()}
      </div>
      <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6">
        {description}
      </p>
      {actionText && (
        onAction ? (
          <button
            onClick={onAction}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            {actionText}
          </button>
        ) : (
          <Link
            to={actionLink}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 inline-flex items-center gap-2"
          >
            <span>{actionText}</span>
            <span>→</span>
          </Link>
        )
      )}
    </div>
  );
}
