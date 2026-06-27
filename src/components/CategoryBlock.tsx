"use client";

import { motion } from "framer-motion";
import { type Product, type CategoryInfo } from "@/data/products";
import ProductCard from "./ProductCard";

interface CategoryBlockProps {
  category: CategoryInfo;
  products: Product[];
  searchQuery: string;
  layout?: "default" | "wide" | "tall" | "featured";
}

export default function CategoryBlock({
  category,
  products,
  searchQuery,
  layout = "default",
}: CategoryBlockProps) {
  if (products.length === 0) return null;

  const gridCols =
    layout === "featured"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : layout === "wide"
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3";

  const spanClass =
    layout === "tall"
      ? "lg:row-span-2"
      : layout === "featured"
      ? "lg:col-span-2 lg:row-span-1"
      : "";

  return (
    <motion.section
      layout
      className={`bento-card ${spanClass} ${category.gradient}`}
    >
      {/* Decorative gradient orbs */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />

      {/* Category header */}
      <div className="relative flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-xl">{category.icon}</span>
            <span className="glow-dot" />
          </div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-navy-900">
            {category.title}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{category.description}</p>
        </div>
        <motion.button
          whileHover={{ x: 4 }}
          className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-accent-blue
                     hover:text-accent-cyan transition-colors mt-2"
        >
          View All
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Products grid */}
      <div className={`grid ${gridCols} gap-3 md:gap-4`}>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            searchQuery={searchQuery}
          />
        ))}
      </div>

      {/* Mobile view all */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="sm:hidden w-full mt-4 py-3 rounded-xl text-sm font-semibold
                   bg-navy-900/5 text-navy-900 hover:bg-navy-900/10 transition-colors"
      >
        View All {category.title}
      </motion.button>
    </motion.section>
  );
}
