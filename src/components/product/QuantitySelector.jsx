import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ quantity, onChange, min = 1, max = 99, size = 'md' }) {
  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity > min) onChange(quantity - 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (quantity < max) onChange(quantity + 1);
  };

  const sizeClasses = {
    sm: 'h-8 px-1 text-xs',
    md: 'h-10 px-2 text-sm',
    lg: 'h-12 px-3 text-base'
  }[size];

  const buttonSize = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-9 h-9'
  }[size];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 ${sizeClasses}`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={`${buttonSize} flex items-center justify-center rounded-lg text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-700 disabled:opacity-40 transition-colors`}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="min-w-[2rem] text-center font-bold text-stone-900 dark:text-stone-100 select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={`${buttonSize} flex items-center justify-center rounded-lg text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-700 disabled:opacity-40 transition-colors`}
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
