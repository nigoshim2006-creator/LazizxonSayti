"use client";

import { motion } from "framer-motion";
import { type Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
  searchQuery?: string;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query || query.length < 2) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="search-highlight">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function ProductCard({
  product,
  index = 0,
  searchQuery = "",
}: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative"
    >
      <div className="glass-card overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-surface-soft">
          <motion.img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover object-center transition-transform duration-700"
            whileHover={{ scale: 1.08 }}
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full
                           bg-accent-blue text-white shadow-lg shadow-accent-blue/30"
              >
                New
              </motion.span>
            )}
            {product.isTrending && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full
                           bg-gradient-to-r from-accent-blue to-accent-cyan text-white
                           shadow-lg shadow-accent-blue/20"
              >
                🔥 Trending
              </motion.span>
            )}
          </div>

          {product.originalPrice && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 text-[11px] font-bold text-white rounded-full
                             bg-rose-500/90 backdrop-blur-sm">
                SALE
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick add button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => alert(`${product.title} added to cart!`)}
            className="absolute bottom-3 left-3 right-3 py-2.5 rounded-xl text-sm font-semibold
                       bg-white/90 backdrop-blur-sm text-navy-900 opacity-0 group-hover:opacity-100
                       translate-y-2 group-hover:translate-y-0 transition-all duration-300
                       hover:bg-white hover:shadow-lg"
          >
            Add to Cart
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          {/* Brand */}
          <span className="text-[11px] font-semibold uppercase tracking-widest text-accent-blue">
            {highlightText(product.brand, searchQuery)}
          </span>

          {/* Title */}
          <h3 className="text-sm font-semibold text-navy-900 leading-snug line-clamp-2">
            {highlightText(product.title, searchQuery)}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? "text-amber-400"
                      : "text-gray-200"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px] font-medium text-gray-400">
              {product.rating}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-lg font-bold text-navy-900">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && (
            <div className="flex items-center gap-1.5">
              {product.colors.map((color, i) => (
                <span
                  key={i}
                  className="w-3.5 h-3.5 rounded-full border border-white/50 ring-1 ring-gray-200/50"
                  style={{ backgroundColor: color }}
                />
              ))}
              <span className="text-[10px] text-gray-400 ml-1">
                +{product.colors.length} colors
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
