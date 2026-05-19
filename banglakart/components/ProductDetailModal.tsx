"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  const { addToCart, language, t } = useCart();
  const [activeTab, setActiveTab] = useState<"overview" | "story">("overview");

  if (!product) return null;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(language === "EN" ? "en-US" : "bn-BD");
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl dark:bg-stone-900 border border-stone-200 dark:border-stone-850 overflow-hidden z-10 flex flex-col md:flex-row transform scale-100 transition-all max-h-[90vh] md:max-h-none">
        
        {/* Left Side: Product Illustration */}
        <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-6 md:p-12 border-b md:border-b-0 md:border-r border-stone-100 dark:border-stone-800">
          <div
            className="w-full max-w-sm md:max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-md"
            dangerouslySetInnerHTML={{ __html: product.imageSvg }}
          />
          {/* Close button inside image for mobile */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:hidden rounded-full bg-white/80 backdrop-blur-xs p-2 text-stone-600 shadow-md cursor-pointer hover:bg-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[80vh]">
          
          <div>
            {/* Header / Origin */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="rounded-full bg-primary-light text-primary px-3 py-1 text-xs font-bold dark:bg-primary/20">
                📍 {language === "EN" ? product.origin : product.banglaOrigin}
              </span>
              {/* Close Button for Desktop */}
              <button
                onClick={onClose}
                className="hidden md:block rounded-full hover:bg-stone-100 dark:hover:bg-stone-850 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-black text-stone-900 dark:text-white leading-tight">
              {language === "EN" ? product.name : product.banglaName}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-2 mb-6">
              <span className="text-amber-500 text-sm">★</span>
              <span className="text-sm font-bold text-stone-800 dark:text-stone-200">{product.rating}</span>
              <span className="text-xs text-stone-400">({product.reviewsCount} {t("reviews", "টি পর্যালোচনা")})</span>
              <span className="h-3 w-[1px] bg-stone-300 mx-2" />
              <span className="text-xs text-emerald-600 font-bold">{t("In Stock", "স্টক আছে")}</span>
            </div>

            {/* Custom Tabs Navigation */}
            <div className="flex border-b border-stone-100 dark:border-stone-800 mb-4">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3 text-xs md:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors mr-6 cursor-pointer ${
                  activeTab === "overview"
                    ? "border-primary text-primary"
                    : "border-transparent text-stone-400 hover:text-stone-600"
                }`}
              >
                {t("Overview", "সংক্ষিপ্ত বিবরণ")}
              </button>
              <button
                onClick={() => setActiveTab("story")}
                className={`pb-3 text-xs md:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  activeTab === "story"
                    ? "border-primary text-primary"
                    : "border-transparent text-stone-400 hover:text-stone-600"
                }`}
              >
                📖 {t("The Heritage Story", "ঐতিহ্যবাহী লোকগাথা")}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="min-h-[140px] text-sm md:text-base leading-relaxed text-stone-600 dark:text-stone-400">
              {activeTab === "overview" ? (
                <p className="animate-fade-in">
                  {language === "EN" ? product.description : product.banglaDescription}
                </p>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-950/20 border border-amber-100/50 dark:border-amber-900/10 animate-fade-in">
                  <p className="italic text-stone-700 dark:text-stone-300 font-serif leading-relaxed">
                    &ldquo;{language === "EN" ? product.story : product.banglaStory}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pricing & Add to Cart */}
          <div className="pt-6 mt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-6">
            <div className="flex flex-col">
              <span className="text-xs text-stone-400 font-semibold">{t("Price", "মূল্য")}</span>
              <span className="text-xl md:text-2xl font-black text-primary">
                ৳{formatCurrency(product.price)}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex-1 max-w-xs rounded-xl bg-primary hover:bg-primary-hover py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer text-center"
            >
              {t("Add to Shopping Cart", "কার্টে যোগ করুন")}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
