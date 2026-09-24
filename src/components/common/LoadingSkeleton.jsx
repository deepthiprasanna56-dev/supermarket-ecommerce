export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 p-4 flex flex-col justify-between animate-pulse">
      <div className="w-full aspect-square rounded-xl bg-stone-200 dark:bg-stone-800 mb-4" />
      <div className="space-y-2.5">
        <div className="h-3 w-1/3 bg-stone-200 dark:bg-stone-800 rounded" />
        <div className="h-4 w-4/5 bg-stone-300 dark:bg-stone-700 rounded" />
        <div className="h-3 w-1/2 bg-stone-200 dark:bg-stone-800 rounded" />
        <div className="pt-2 flex items-center justify-between">
          <div className="h-5 w-16 bg-stone-300 dark:bg-stone-700 rounded" />
          <div className="h-8 w-8 bg-stone-200 dark:bg-stone-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-pulse py-8">
      <div className="aspect-square bg-stone-200 dark:bg-stone-800 rounded-3xl" />
      <div className="space-y-4">
        <div className="h-4 w-24 bg-stone-200 dark:bg-stone-800 rounded" />
        <div className="h-8 w-3/4 bg-stone-300 dark:bg-stone-700 rounded" />
        <div className="h-4 w-32 bg-stone-200 dark:bg-stone-800 rounded" />
        <div className="h-6 w-28 bg-stone-300 dark:bg-stone-700 rounded" />
        <div className="h-20 w-full bg-stone-200 dark:bg-stone-800 rounded-xl" />
        <div className="h-12 w-full bg-stone-300 dark:bg-stone-700 rounded-xl" />
      </div>
    </div>
  );
}
