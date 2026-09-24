import { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  ArrowRight,
  Download,
  ShoppingBag
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const order = location.state?.order || {
    id: 'ORD-98214',
    date: new Date().toISOString().split('T')[0],
    deliveryTime: 'Today · 5:00 PM - 7:00 PM',
    address: '742 Evergreen Terrace, Apt 4B, New York, NY 10001',
    items: [
      { id: 1, name: 'Organic Hass Avocados', quantity: 2, price: 4.99, unit: '4 pack' },
      { id: 8, name: 'Artisan Sourdough Country Loaf', quantity: 1, price: 5.99, unit: '750 g' }
    ],
    total: 15.97,
    paymentMethod: 'Credit Card'
  };

  useEffect(() => {
    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if unavailable
    }
  }, []);

  const handleDownloadInvoice = () => {
    addToast(`Invoice #${order.id}.pdf generated and downloaded!`, 'success');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg ring-8 ring-emerald-50 dark:ring-emerald-900/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          ORDER CONFIRMED & PACKING
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Your Fresh Groceries Are On The Way!
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
          We received your order <strong className="text-stone-800 dark:text-stone-200">{order.id}</strong>. Our produce specialists are hand-picking your fresh harvest right now.
        </p>
      </div>

      {/* Real-time Order Tracking Timeline */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
          Live Delivery Status
        </h3>

        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="font-bold text-stone-900 dark:text-stone-100 text-[11px]">Placed</div>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow">
              <Package className="w-4 h-4" />
            </div>
            <div className="font-bold text-stone-900 dark:text-stone-100 text-[11px]">Cold Pack</div>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow animate-pulse">
              <Truck className="w-4 h-4" />
            </div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">On Courier</div>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-stone-400 text-[11px]">At Doorstep</div>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-xs flex items-center justify-between text-emerald-900 dark:text-emerald-200">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Estimated Window: <strong>{order.deliveryTime}</strong></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            Refrigerated Van
          </span>
        </div>
      </div>

      {/* Order Summary Receipt Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
              Receipt Details
            </div>
            <div className="text-stone-400">Order Placed on {order.date}</div>
          </div>
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Invoice PDF</span>
          </button>
        </div>

        {/* Delivery Address */}
        <div className="flex items-start gap-2 text-stone-600 dark:text-stone-300">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-stone-900 dark:text-stone-100">Delivering To:</div>
            <div>{order.address}</div>
          </div>
        </div>

        {/* Items List */}
        <div className="divide-y divide-stone-100 dark:divide-stone-800 pt-2">
          {order.items?.map((item, idx) => (
            <div key={idx} className="py-2 flex justify-between items-center">
              <div>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-stone-400 ml-2">({item.unit})</span>
              </div>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Total Row */}
        <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-between items-baseline font-bold text-sm text-stone-900 dark:text-stone-100">
          <span>Amount Paid ({order.paymentMethod})</span>
          <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
            ${Number(order.total).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Shop More Groceries</span>
        </Link>
        <Link
          to="/account?tab=orders"
          className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <span>View Order History</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
