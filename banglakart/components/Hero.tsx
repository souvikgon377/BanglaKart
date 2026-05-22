"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const { t } = useCart();

  return (
    <section className="relative overflow-hidden bg-radial from-[#e6f6f2] via-background to-background dark:from-[#052018] dark:via-background dark:to-background py-20 md:py-28 transition-colors duration-300">
      
      {/* Absolute decorative blurred blobs */}
      <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute top-1/3 right-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left gap-6">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-3 py-1.5 text-xs font-bold text-stone-750 dark:border-stone-850 dark:bg-stone-900/70 dark:text-stone-300 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
              {t("Direct-from-Artisan Collective", "সরাসরি কারিগরদের উৎপাদিত পণ্য")}
            </div>

            {/* Main Title */}
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-5xl md:text-6xl font-sans leading-[1.1]">
              {t("Embrace the Soul of", "বরণ করুন")}
              <br />
              <span className="bg-gradient-to-r from-primary via-gold to-accent bg-clip-text text-transparent">
                {t("Bengal Craft & Heritage", "বাংলার খাঁটি ঐতিহ্য")}
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-xl text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              {t(
                "From the magical threads of Bengal Jamdani to the deep forest honey of Sundarbans. Discover handcrafted treasures, organic delicacies, and legacy apparel of West Bengal.",
                "বেঙ্গল জামদানির বুনন থেকে সুন্দরবনের খাঁটি বন্য মধু। সরাসরি আমাদের হস্তশিল্পী ও কৃষকদের দ্বারা তৈরিকৃত খাঁটি বাংলার পণ্যের সমাহার।"
              )}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto rounded-xl bg-primary hover:bg-primary-hover px-8 py-4 text-sm font-bold text-white shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 cursor-pointer text-center"
              >
                {t("Explore Heritage Shop", "ঐতিহ্যবাহী দোকান দেখুন")}
              </button>
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto rounded-xl border border-stone-300 bg-white/50 backdrop-blur-xs hover:bg-stone-50 px-8 py-4 text-sm font-bold text-stone-700 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-350 dark:hover:text-white transition-all cursor-pointer text-center"
              >
                {t("Learn Our Story", "আমাদের কারিগরদের গল্প")}
              </button>
            </div>

            {/* Stats Block */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-stone-200/60 dark:border-stone-850 w-full max-w-lg mt-4 text-center lg:text-left">
              <div>
                <p className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white">100%</p>
                <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mt-0.5">{t("Direct Trade", "সরাসরি কারিগর")}</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-primary">12+</p>
                <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mt-0.5">{t("Artisan Hubs", "দেশীয় অঞ্চল")}</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-accent">৳ 0</p>
                <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mt-0.5">{t("Middlemen Fee", "মধ্যস্বত্বভোগীহীন")}</p>
              </div>
            </div>

          </div>

          {/* Right Floating Card Illustration Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Glassmorphic Frame */}
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl bg-white/40 dark:bg-stone-900/40 p-4 border border-white/40 dark:border-stone-800/40 shadow-2xl backdrop-blur-md overflow-hidden transform hover:rotate-1 transition-transform duration-500">
              
              {/* Animated rising sun motif */}
              <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-accent/80 opacity-90 blur-xl" />
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/40 opacity-80 blur-xl" />
              
              {/* Heritage Showcase Card Mock */}
              <div className="relative h-full w-full rounded-2xl bg-stone-950 overflow-hidden flex flex-col justify-end p-6 border border-stone-800 shadow-inner">
                {/* Traditional motif representation (Bengal Jamdani pattern overlay) */}
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                  <svg className="w-full h-full" fill="none" stroke="#d4af37" strokeWidth="1.5">
                    <pattern id="motif-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M20 0 L40 20 L20 40 L0 20 Z" />
                      <circle cx="20" cy="20" r="4" fill="#f42a41" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#motif-pattern)" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-2">
                  <span className="rounded-full bg-primary text-[10px] font-bold text-white px-2.5 py-0.5 inline-block">
                    {t("Jamdani Weaver Association", "জামদানি তাঁত সমিতি")}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white leading-tight">
                    {t("Preserving 1000 years of handloom legacy", "হাজার বছরের প্রাচীন তাঁতশিল্প সংরক্ষণ")}
                  </h3>
                  <p className="text-xs text-stone-400">
                    West Bengal, India
                  </p>
                </div>
              </div>

            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-4 right-4 md:right-10 rounded-2xl bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-800 p-3 shadow-xl flex items-center gap-2 transform translate-y-2 animate-bounce">
              <span className="text-xl">🏆</span>
              <div>
                <p className="text-xs font-bold text-stone-900 dark:text-white leading-none">UNESCO Heritage</p>
                <span className="text-[10px] text-stone-400 font-semibold">Jamdani Traditional Art</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
