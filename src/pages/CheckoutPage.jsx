import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  CreditCard,
  MapPin,
  Clock,
  Check,
  Lock,
  Smartphone,
  Banknote
} from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    discountAmount,
    deliveryFee,
    taxAmount,
    grandTotal,
    appliedCoupon,
    clearCart
  } = useCart();
  const { user, addresses, placeNewOrder } = useAuth();

  // All Hooks must be at top level unconditionally
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || 'custom');
  const [customAddress, setCustomAddress] = useState({
    firstName: user.name.split(' ')[0] || '',
    lastName: user.name.split(' ')[1] || '',
    email: user.email || '',
    phone: user.phone || '',
    street: '742 Evergreen Terrace, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    instructions: 'Ring apartment 4B or leave with door concierge'
  });

  const [selectedSlot, setSelectedSlot] = useState('Tomorrow · 9:00 AM – 11:00 AM (Free)');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '4242 •••• •••• 4242',
    name: user.name,
    expiry: '12/28',
    cvv: '982'
  });
  const [upiId, setUpiId] = useState('alex@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty, render notice after all hooks have been called
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-xs text-stone-500 mb-4">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="text-emerald-600 font-bold underline">
          Go to Grocery Shop
        </Link>
      </div>
    );
  }

  const deliverySlots = [
    { id: 'slot-1', title: 'Express 30-Min Rapid Slot', time: 'Arriving in 30 mins', fee: 'Free for VIP' },
    { id: 'slot-2', title: 'Today · 5:00 PM – 7:00 PM', time: 'Evening slot', fee: 'Free' },
    { id: 'slot-3', title: 'Tomorrow · 9:00 AM – 11:00 AM (Free)', time: 'Morning farm harvest', fee: 'Free' },
    { id: 'slot-4', title: 'Tomorrow · 2:00 PM – 4:00 PM', time: 'Afternoon slot', fee: 'Free' }
  ];

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const activeAddress = selectedAddressId === 'custom'
      ? `${customAddress.street}, ${customAddress.city}, ${customAddress.state} ${customAddress.zipCode}`
      : `${addresses.find((a) => a.id === selectedAddressId)?.street}, ${addresses.find((a) => a.id === selectedAddressId)?.city}`;

    setTimeout(() => {
      const orderPayload = {
        deliverySlot: selectedSlot,
        addressText: activeAddress,
        items: items.map((i) => ({
          id: i.productId,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          image: i.image,
          unit: i.unit
        })),
        subtotal,
        deliveryFee,
        discountAmount,
        grandTotal,
        paymentMethod: paymentMethod === 'card' ? 'Visa •••• 4242' : paymentMethod === 'apple' ? 'Apple Pay' : paymentMethod === 'upi' ? `UPI (${upiId})` : 'Cash on Delivery'
      };

      const createdOrder = placeNewOrder(orderPayload);
      clearCart();
      setIsProcessing(false);
      navigate('/order-success', { state: { order: createdOrder } });
    }, 1200);
  };

  return (
    <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          STEP 2 OF 2 · FINAL STEP
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
          Secure Doorstep Checkout
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Fields (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Customer & Delivery Address */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                1. Delivery Address & Contact
              </h2>
            </div>

            {/* Saved Addresses Selector */}
            {addresses.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Select a Saved Address
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                            : 'border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span className="text-stone-900 dark:text-stone-100">
                            {addr.type} ({addr.fullName})
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <div className="text-stone-600 dark:text-stone-300">{addr.street}</div>
                        <div className="text-stone-500">
                          {addr.city}, {addr.state} {addr.zipCode}
                        </div>
                        <div className="text-[11px] text-stone-400 mt-1">Tel: {addr.phone}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Manual Address Fields */}
            <div className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customAddress.firstName}
                    onChange={(e) => setCustomAddress({ ...customAddress, firstName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customAddress.lastName}
                    onChange={(e) => setCustomAddress({ ...customAddress, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Email for Receipt
                  </label>
                  <input
                    type="email"
                    required
                    value={customAddress.email}
                    onChange={(e) => setCustomAddress({ ...customAddress, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={customAddress.phone}
                    onChange={(e) => setCustomAddress({ ...customAddress, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Delivery Instructions / Apt / Suite
                  </label>
                  <input
                    type="text"
                    value={customAddress.instructions}
                    onChange={(e) => setCustomAddress({ ...customAddress, instructions: e.target.value })}
                    placeholder="e.g. Leave with doorman or ring doorbell"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Choose Delivery Slot */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
              <Clock className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                2. Select Delivery Window
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {deliverySlots.map((slot) => {
                const isSelected = selectedSlot === slot.title;
                return (
                  <div
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.title)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                        : 'border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span className="text-stone-900 dark:text-stone-100">{slot.title}</span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </div>
                    <div className="text-stone-500 text-[11px]">{slot.time}</div>
                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      {slot.fee}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Payment Method UI */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                3. Choose Payment Method
              </h2>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Credit / Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'apple'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                <span className="text-xl"></span>
                <span>Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span>UPI / GPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                <Banknote className="w-5 h-5" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* Card Inputs */}
            {paymentMethod === 'card' && (
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      placeholder="3 digits"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-2">
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 block">
                  Virtual Payment Address (UPI ID)
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@bank"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
            )}

            {paymentMethod === 'apple' && (
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300">
                You will be prompted to authenticate with Apple Pay Touch ID or Face ID upon clicking Place Order.
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                ✓ Cash on delivery available. You can pay with cash or card to our courier upon doorstep handover.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary Preview & Submit (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-5 sticky top-28">
            <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100 pb-3 border-b border-stone-100 dark:border-stone-800">
              Basket Summary ({items.length} items)
            </h3>

            {/* Quick Items Thumbnail Preview */}
            <div className="max-h-48 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800 pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover bg-stone-100 dark:bg-stone-800 border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate text-stone-900 dark:text-stone-100">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      {item.quantity}x {item.unit}
                    </div>
                  </div>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Details */}
            <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300 pt-3 border-t border-stone-100 dark:border-stone-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span>−${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Doorstep Delivery</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-stone-200 dark:border-stone-800 font-bold text-sm text-stone-900 dark:text-stone-100">
                <span>Total Due</span>
                <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-75 active:scale-95 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Fresh Order...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order (${grandTotal.toFixed(2)})</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-center text-stone-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Guaranteed Fresh or 100% Instant Refund</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

