import { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Check, Zap, Clock } from 'lucide-react';

export default function PincodeModal({ isOpen, onClose }) {
  const { deliveryPincode, changePincode } = useAuth();
  const [zipInput, setZipInput] = useState('');
  const [error, setError] = useState('');

  const quickLocations = [
    { zip: '10001', city: 'Manhattan, NY', time: '30 mins (Express)' },
    { zip: '10002', city: 'Lower East Side, NY', time: 'Today by 5 PM' },
    { zip: '10025', city: 'Upper West Side, NY', time: '30 mins (Express)' },
    { zip: '11201', city: 'Brooklyn Heights, NY', time: 'Today by 6 PM' },
    { zip: '90210', city: 'Beverly Hills, CA', time: 'Tomorrow 9 AM' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!zipInput.trim() || zipInput.trim().length < 5) {
      setError('Please enter a valid 5-digit ZIP code');
      return;
    }
    setError('');
    changePincode(zipInput.trim());
    setZipInput('');
    onClose();
  };

  const handleSelectQuick = (zip) => {
    changePincode(zip);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Choose Delivery Location">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-stone-600 dark:text-stone-300 mb-4">
            Enter your ZIP or PIN code to see accurate product availability, express 30-min slots, and local fresh farm deliveries.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                maxLength={5}
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 5-digit ZIP (e.g. 10001)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
            >
              Verify
            </button>
          </form>
          {error && <p className="text-xs text-rose-500 mt-1.5">{error}</p>}
        </div>

        {/* Current selection */}
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
              <Zap className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
                Current Location
              </div>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {deliveryPincode.city} ({deliveryPincode.zip})
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-white dark:bg-stone-900 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
            {deliveryPincode.status}
          </span>
        </div>

        {/* Popular Delivery Hubs */}
        <div>
          <h4 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2.5">
            Quick Select Hubs
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickLocations.map((loc) => {
              const isSelected = deliveryPincode.zip === loc.zip;
              return (
                <button
                  key={loc.zip}
                  type="button"
                  onClick={() => handleSelectQuick(loc.zip)}
                  className={`flex items-start justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                      : 'border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 bg-stone-50/50 dark:bg-stone-800/40'
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <span>{loc.city}</span>
                      <span className="text-xs text-stone-500 dark:text-stone-400">({loc.zip})</span>
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>{loc.time}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}
