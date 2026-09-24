import { useCart } from '../../context/CartContext';
import { Truck, CheckCircle2 } from 'lucide-react';

export default function FreeShippingBar() {
  const {
    subtotal,
    amountNeededForFreeShipping,
    freeShippingProgress,
    isFreeDeliveryQualified
  } = useCart();

  return (
    <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
      <div className="flex items-center justify-between font-semibold mb-2 text-stone-900 dark:text-stone-100">
        <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
          <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          {isFreeDeliveryQualified ? (
            <span className="font-bold flex items-center gap-1">
              You unlocked FREE Doorstep Delivery! <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
            </span>
          ) : (
            <span>
              Add <strong className="text-emerald-700 dark:text-emerald-300 font-extrabold">${amountNeededForFreeShipping.toFixed(2)}</strong> more to get <strong>FREE Delivery</strong>
            </span>
          )}
        </span>
        <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
          {Math.round(freeShippingProgress)}%
        </span>
      </div>

      <div className="w-full bg-emerald-200 dark:bg-emerald-900/60 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 to-lime-400 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${freeShippingProgress}%` }}
        />
      </div>
    </div>
  );
}
