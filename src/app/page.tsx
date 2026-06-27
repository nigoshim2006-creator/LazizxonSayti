"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CategoryBlock from "@/components/CategoryBlock";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return products;

    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.titleUz.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.subcategory.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Group products by category
  const productsByCategory = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      items: filteredProducts.filter((p) => p.category === cat.id),
    }));
  }, [filteredProducts]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const totalResults = productsByCategory.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );

  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        resultCount={totalResults}
      />

      {/* Hero Section */}
      {!searchQuery && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
            <div className="absolute top-40 right-1/4 w-80 h-80 bg-accent-cyan/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           bg-accent-blue/10 border border-accent-blue/20 mb-6"
              >
                <span className="glow-dot" />
                <span className="text-xs font-semibold text-accent-blue">
                  AI-Powered Sport Marketplace
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold
                           text-navy-900 leading-[1.1] tracking-tight"
              >
                Sport Meets
                <br />
                <span className="gradient-text">Cyber Intelligence</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-lg text-gray-500 max-w-xl leading-relaxed"
              >
                Discover premium footwear, esports apparel, professional football kits,
                and smart training gear — all powered by AI-driven curation.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 md:gap-10 mt-8"
              >
                {[
                  { value: "500+", label: "Products" },
                  { value: "50+", label: "Brands" },
                  { value: "99%", label: "Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-display font-bold text-navy-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 font-medium mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Search results info */}
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-28 md:pt-36 pb-6"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-navy-900">
                Search Results
              </h2>
              <span className="text-sm px-2.5 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue font-semibold">
                {totalResults} {totalResults === 1 ? "item" : "items"}
              </span>
              {totalResults === 0 && (
                <span className="text-sm text-gray-400">
                  Try adjusting your search terms
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Bento Grid Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
          {/* Block 1: Footwear (Featured - spans 2 cols) */}
          {productsByCategory
            .find((c) => c.id === "footwear")
            ?.items.length! > 0 && (
            <div className="lg:col-span-2">
              <CategoryBlock
                category={categories.find((c) => c.id === "footwear")!}
                products={
                  productsByCategory.find((c) => c.id === "footwear")!.items
                }
                searchQuery={searchQuery}
                layout="featured"
              />
            </div>
          )}

          {/* Block 2: Esports */}
          {productsByCategory.find((c) => c.id === "esports")?.items.length! >
            0 && (
            <CategoryBlock
              category={categories.find((c) => c.id === "esports")!}
              products={
                productsByCategory.find((c) => c.id === "esports")!.items
              }
              searchQuery={searchQuery}
              layout="tall"
            />
          )}

          {/* Block 3: Football */}
          {productsByCategory.find((c) => c.id === "football")?.items.length! >
            0 && (
            <CategoryBlock
              category={categories.find((c) => c.id === "football")!}
              products={
                productsByCategory.find((c) => c.id === "football")!.items
              }
              searchQuery={searchQuery}
              layout="default"
            />
          )}

          {/* Block 4: Training */}
          {productsByCategory.find((c) => c.id === "training")?.items.length! >
            0 && (
            <CategoryBlock
              category={categories.find((c) => c.id === "training")!}
              products={
                productsByCategory.find((c) => c.id === "training")!.items
              }
              searchQuery={searchQuery}
              layout="default"
            />
          )}

          {/* Block 5: Accessories */}
          {productsByCategory.find((c) => c.id === "accessories")?.items
            .length! > 0 && (
            <div className="lg:col-span-2">
              <CategoryBlock
                category={categories.find((c) => c.id === "accessories")!}
                products={
                  productsByCategory.find((c) => c.id === "accessories")!.items
                }
                searchQuery={searchQuery}
                layout="wide"
              />
            </div>
          )}
        </div>

        {/* Empty state */}
        {totalResults === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-navy-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn&apos;t find any products matching &ldquo;{searchQuery}&rdquo;.
              Try searching for krossovka, butsa, sumka, or soat.
            </p>
          </motion.div>
        )}
      </section>

      {/* AI Agency Section */}
      {!searchQuery && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative py-16 md:py-24 overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-800 to-navy-900" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-1/3 w-64 h-64 bg-accent-blue rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-accent-cyan rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                             bg-white/10 border border-white/10 mb-6"
                >
                  <svg className="w-3.5 h-3.5 text-accent-cyan" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span className="text-xs font-semibold text-accent-cyan">SP.AI — Version 1.0</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white leading-tight"
                >
                  AI-Powered
                  <br />
                  <span className="text-accent-cyan">Market Intelligence</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-gray-400 leading-relaxed max-w-lg"
                >
                  Our neural engine analyzes thousands of products to deliver personalized
                  recommendations, predict trends, and help you find the perfect gear —
                  whether for the pitch, the gym, or the arena.
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 gap-4 mt-8"
                >
                  {[
                    { title: "Smart Search", desc: "Semantic product discovery" },
                    { title: "Trend Prediction", desc: "AI-curated collections" },
                    { title: "Size Match", desc: "ML-powered fit finder" },
                    { title: "Price Intel", desc: "Real-time market analysis" },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="glass-card bg-white/5 border-white/10 backdrop-blur-xl p-4 hover:bg-white/10 transition-all"
                    >
                      <div className="font-semibold text-white text-sm">{feature.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{feature.desc}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right: Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="hidden lg:flex items-center justify-center"
              >
                <div className="relative w-full max-w-md aspect-square">
                  {/* Decorative neural network visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-80 h-80 rounded-full border border-accent-blue/20 animate-pulse" />
                    <div className="absolute w-60 h-60 rounded-full border border-accent-cyan/30" />
                    <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 backdrop-blur-3xl" />
                    <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan shadow-2xl shadow-accent-blue/50 animate-float" />
                  </div>

                  {/* Stats overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass-card bg-white/10 border-white/20 p-6 text-center">
                      <div className="text-4xl font-display font-bold text-white">99.7%</div>
                      <div className="text-xs text-accent-cyan font-medium mt-1">Match Accuracy</div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full w-[99.7%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
