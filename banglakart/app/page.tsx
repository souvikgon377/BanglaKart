"use client";

import React, { useState, useRef } from "react";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

export default function Home() {
  const { t } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);

  const catalogRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter products based on Category AND Search Query
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.banglaName.includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.banglaDescription.includes(searchLower) ||
      product.origin.toLowerCase().includes(searchLower) ||
      product.banglaOrigin.includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Navigation Header */}
      <Navbar
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Hero Section */}
      <Hero onExploreClick={scrollToCatalog} />

      {/* Product Catalog Section */}
      <main
        ref={catalogRef}
        className="flex-1 mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8 bg-background scroll-mt-20"
      >
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-stone-200/60 dark:border-stone-850">
          <div>
            <h2 className="text-2xl font-black text-stone-900 dark:text-white sm:text-3xl font-sans tracking-tight">
              {selectedCategory === "all"
                ? t("Featured Heritage Collections", "ঐতিহ্যবাহী পণ্যসম্ভার")
                : selectedCategory === "apparel"
                ? t("Heritage Apparel & Sarees", "ঐতিহ্যবাহী শাড়ি ও পোশাক")
                : selectedCategory === "food"
                ? t("Organic Delicacies & Tea", "অর্গানিক খাবার ও চা")
                : selectedCategory === "crafts"
                ? t("Handicrafts & Collectibles", "হস্তশিল্প ও কারুশিল্প")
                : t("Home & Living Accents", "বাঙালি গৃহসজ্জা")}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t(
                `Showing ${filteredProducts.length} unique treasures sourced directly from native regions.`,
                `সরাসরি দেশীয় অঞ্চল থেকে সংগৃহীত ${filteredProducts.length}টি অনন্য পণ্য পাওয়া গিয়েছে।`
              )}
            </p>
          </div>
          
          {/* Active Category Tag Indicator */}
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="self-start md:self-auto rounded-full bg-stone-100 hover:bg-stone-200 px-3.5 py-1.5 text-xs font-bold text-stone-600 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-750 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>✕</span> Clear Filter
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setActiveProductDetail}
              />
            ))}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-3xl p-8 max-w-lg mx-auto">
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="text-base font-bold text-stone-900 dark:text-white mb-1">
              {t("No products found", "কোনো পণ্য পাওয়া যায়নি")}
            </h3>
            <p className="text-xs text-stone-550 max-w-xs mb-6 leading-relaxed">
              {t(
                "We couldn't find matches for your search. Try adjusting your filters or category search terms.",
                "আপনার খোঁজা শব্দের সাথে মিলছে এমন কোনো পণ্য পাওয়া যায়নি। অনুগ্রহ করে অন্য কোনো শব্দ দিয়ে চেষ্টা করুন।"
              )}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="rounded-xl bg-primary hover:bg-primary-hover px-5 py-2.5 text-xs font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer"
            >
              {t("Reset Search Filters", "সব ফিল্টার রিসেট করুন")}
            </button>
          </div>
        )}
      </main>

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer />

      {/* High-Fidelity Product Detail Overlay Modal */}
      <ProductDetailModal
        product={activeProductDetail}
        onClose={() => setActiveProductDetail(null)}
      />

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
