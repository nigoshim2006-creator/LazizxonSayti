"use client";

import { motion } from "framer-motion";
import { products, categories, type ProductCategory } from "@/data/products";

interface SearchOverlayProps {
  searchQuery: string;
  resultCount: number;
  onClose: () => void;
}

export default function SearchOverlay({
  searchQuery,
  resultCount,
  onClose,
}: SearchOverlayProps) {
  // Get results grouped by category
  const resultsByCategory = categories
    .map((cat) => {
      const items = products.filter(
        (p) =>
          p.category === cat.id &&
          (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.titleUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      return { ...cat, items };
    })
    .filter((cat) => cat.items.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-40 pt-20 md:pt-24"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm" />

      {/* Overlay panel */}
      <motion.div
        initial={{ opacity: 0, y: -10, scaleY: 0.98 }}
        animate={{ opacity: 1, y: 0, scaleY: 1 }}
        exit={{ opacity: 0, y: -10, scaleY: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto max-w-2xl glass-card-strong max-h-[60vh] overflow-y-auto
                   rounded-2xl shadow-glass-xl border border-white/30 mx-4 sm:mx-auto"
      >
        {/* Search header */}
        <div className="sticky top-0 z-10 backdrop-blur-2xl bg-white/90 border-b border-gray-100 px-5 py-3.5
                        flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-600">
              Results for &quot;<span className="text-navy-900 font-semibold">{searchQuery}</span>&quot;
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue font-semibold">
              {resultCount}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            aria-label="Close search"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Results */}
        <div className="p-5 space-y-6">
          {resultsByCategory.length > 0 ? (
            resultsByCategory.map((cat, ci) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.05 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">{cat.icon}</span>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {cat.title}
                  </h4>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cat.items.slice(0, 4).map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50
                                 transition-all text-left group"
                    >
                      {/* Thumb */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-soft shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-navy-900 truncate group-hover:text-accent-blue transition-colors">
                          {item.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-400">{item.brand}</span>
                          <span className="text-xs font-semibold text-navy-900">{item.price}</span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg
                        className="w-4 h-4 text-gray-300 group-hover:text-accent-blue group-hover:translate-x-0.5 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-500 font-medium">
                No results found for &quot;{searchQuery}&quot;
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Try searching for krossovka, butsa, sumka, or soat
              </p>
            </motion.div>
          )}
        </div>        {/* Footer hint */}
        <div className="sticky bottom-0 backdrop-blur-2xl bg-white/90 border-t border-gray-100 px-5 py-2.5
                        flex items-center justify-end text-xs text-gray-400 rounded-b-2xl">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 font-medium">ESC</kbd>
            to close
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
