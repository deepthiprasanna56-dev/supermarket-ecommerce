import { testimonials } from '../../data/testimonials';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-16 max-w-none mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          FROM OUR COMMUNITY
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
          Loved by Over 12,500+ Weekly Families
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
          Read real reviews from certified local shoppers who get their weekly groceries from FreshMart.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Stars & Quote Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-emerald-500/30" />
              </div>

              {/* Comment */}
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic mb-6">
                &ldquo;{t.comment}&rdquo;
              </p>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-11 h-11 rounded-full object-cover border border-emerald-300 dark:border-emerald-700 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                    {t.name}
                  </h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                </div>
                <div className="text-[11px] text-stone-400 truncate">{t.role}</div>
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                  {t.badge}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

