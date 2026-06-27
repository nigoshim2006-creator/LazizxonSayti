"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { placeholderTags } from "@/data/products";
import SearchOverlay from "./SearchOverlay";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  resultCount: number;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  resultCount,
}: NavbarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  // Cycle through placeholder tags
  useEffect(() => {
    if (searchQuery || isFocused) {
      setShowPlaceholder(false);
      return;
    }

    setShowPlaceholder(true);
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderTags.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [searchQuery, isFocused]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  const handleClear = useCallback(() => {
    onSearchChange("");
    inputRef.current?.focus();
  }, [onSearchChange]);

  // Close overlay on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Glassmorphism navbar */}
        <div className="backdrop-blur-2xl bg-white/80 border-b border-white/20 shadow-glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20 gap-4">
              {/* Logo */}
              <motion.a
                href="/"
                className="flex items-center gap-2 shrink-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-blue/30">
                  <span className="text-white font-display font-extrabold text-sm">SP</span>
                </div>
                <span className="font-display font-bold text-lg text-navy-900 hidden sm:block">
                  sp<span className="text-accent-blue">.</span>market
                </span>
              </motion.a>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-auto relative">
                <motion.div
                  className="relative"
                  initial={false}
                  animate={{
                    scale: isFocused ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`relative flex items-center transition-all duration-300 rounded-2xl
                                ${
                                  isFocused
                                    ? "glass-card-strong ring-2 ring-accent-blue/30 shadow-lg shadow-accent-blue/10"
                                    : "glass-card hover:shadow-glass-lg"
                                }`}
                  >
                    {/* Search icon */}
                    <div className="pl-4 pr-2 flex items-center pointer-events-none">
                      <svg
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isFocused ? "text-accent-blue" : "text-gray-400"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>

                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                      className="flex-1 bg-transparent border-0 outline-none py-3 md:py-3.5 text-sm
                                 text-navy-900 placeholder-gray-400 font-medium"
                      autoComplete="off"
                      aria-label="Search products"
                    />

                    {/* Animated placeholder */}
                    {showPlaceholder && !searchQuery && (
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={placeholderIndex}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.3 }}
                          className="absolute left-11 text-sm text-gray-400 font-medium pointer-events-none"
                        >
                          Search &quot;{placeholderTags[placeholderIndex]}&quot;
                        </motion.span>
                      </AnimatePresence>
                    )}

                    {/* Right side icons */}
                    <div className="flex items-center gap-1 pr-2">
                      {searchQuery && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={handleClear}
                          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                          aria-label="Clear search"
                        >
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </motion.button>
                      )}
                      {/* Search shortcut hint */}
                      <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-1 rounded-lg text-[11px] font-medium
                                      bg-gray-100 text-gray-400 border border-gray-200">
                        <span>⌘</span>K
                      </kbd>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Favorites */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl
                             glass-card hover:bg-white transition-all"
                  aria-label="Favorites"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </motion.button>

                {/* Cart */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center justify-center w-10 h-10 rounded-xl
                             bg-gradient-to-br from-accent-blue to-accent-cyan text-white
                             shadow-lg shadow-accent-blue/30 transition-all"
                  aria-label="Cart"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white
                                   text-[10px] font-bold flex items-center justify-center shadow-lg">
                    3
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isFocused && searchQuery.length >= 2 && (
          <SearchOverlay
            searchQuery={searchQuery}
            resultCount={resultCount}
            onClose={() => {
              setIsFocused(false);
              inputRef.current?.blur();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
