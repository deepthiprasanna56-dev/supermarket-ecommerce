import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Sun, Moon, MapPin, Truck, PhoneCall, Sparkles } from 'lucide-react';

export default function AnnouncementBar({ onOpenLocationModal }) {
  const { theme, toggleTheme } = useTheme();
  const { deliveryPincode } = useAuth();

  return (
    <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/60 select-none">
      <div className="max-w-none mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Highlights & Free Shipping */}
        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300">
            <Truck className="w-3.5 h-3.5 text-lime-400" />
            <span>Free Doorstep Delivery on orders over $45</span>
          </span>
          <span className="hidden lg:inline text-emerald-600">|</span>
          <span className="hidden lg:inline-flex items-center gap-1.5 text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Daily Farm Harvests at 5:00 AM</span>
          </span>
        </div>

        {/* Right: Location, Help & Theme */}
        <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
          {/* Location button */}
          <button
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 hover:text-white transition-colors bg-emerald-900/60 hover:bg-emerald-900 px-2.5 py-1 rounded-full border border-emerald-800"
            title="Change delivery location"
          >
            <MapPin className="w-3.5 h-3.5 text-lime-400" />
            <span className="font-semibold text-emerald-200">{deliveryPincode.zip}</span>
            <span className="hidden sm:inline text-emerald-300/80">({deliveryPincode.city})</span>
            <span className="text-[10px] text-lime-400 font-bold ml-0.5">CHANGE</span>
          </button>

          {/* Support */}
          <a
            href="tel:18005553737"
            className="hidden sm:flex items-center gap-1 hover:text-white transition-colors text-emerald-300"
          >
            <PhoneCall className="w-3 h-3" />
            <span>1-800-555-FRESH</span>
          </a>

          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 p-1 px-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-all duration-200"
            aria-label="Toggle theme mode"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[10px] font-semibold hidden md:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-lime-300" />
                <span className="text-[10px] font-semibold hidden md:inline">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

