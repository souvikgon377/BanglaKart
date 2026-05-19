"use client";

import React from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart, language, t } = useCart();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(language === "EN" ? "en-US" : "bn-BD");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the details modal when clicking add-to-cart
    addToCart(product);
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900 cursor-pointer"
    >
      {/* SVG Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-50 dark:bg-stone-950">
        <div
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          dangerouslySetInnerHTML={{ __html: product.imageSvg }}
        />
        
        {/* Origin Badge */}
        <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold text-stone-850 shadow-sm dark:bg-stone-900/95 dark:text-stone-200 border border-stone-100 dark:border-stone-800">
          📍 {language === "EN" ? product.origin : product.banglaOrigin}
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="rounded-xl bg-white/90 backdrop-blur-xs px-4 py-2 text-xs font-bold text-stone-900 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
            {t("Quick View", "পণ্য বিবরণী")}
          </span>
        </div>
      </div>

      {/* Info Card Content */}
      <div className="flex flex-1 flex-col p-4">
        
        {/* Category Label */}
        <span className="text-[10px] uppercase font-bold tracking-wider text-accent mb-1">
          {t(
            product.category === "apparel" ? "Apparel" : product.category === "food" ? "Food" : product.category === "crafts" ? "Crafts" : "Home Living",
            product.category === "apparel" ? "পোশাক" : product.category === "food" ? "খাদ্য" : product.category === "crafts" ? "হস্তশিল্প" : "গৃহসজ্জা"
          )}
        </span>

        {/* Product Title */}
        <h3 className="font-bold text-stone-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors text-sm sm:text-base">
          {language === "EN" ? product.name : product.banglaName}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-amber-500 text-xs">★</span>
          <span className="text-xs font-bold text-stone-800 dark:text-stone-200">{product.rating}</span>
          <span className="text-[10px] text-stone-400">({product.reviewsCount})</span>
        </div>

        {/* Price & Cart Trigger */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-400 leading-none">{t("Price", "মূল্য")}</span>
            <span className="text-base font-black text-primary mt-0.5">
              ৳{formatCurrency(product.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex h-9 items-center justify-center rounded-xl bg-primary hover:bg-primary-hover px-4 text-xs font-bold text-white shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
            aria-label="Add to cart"
          >
            {t("+ Add", "+ কার্টে")}
          </button>
        </div>
      </div>
    </div>
  );
}
