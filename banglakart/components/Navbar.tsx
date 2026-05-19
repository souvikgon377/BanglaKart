"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  onSearchChange: (searchQuery: string) => void;
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export default function Navbar({
  onSearchChange,
  selectedCategory,
  onCategorySelect,
}: NavbarProps) {
  const { cart, setIsCartOpen, language, toggleLanguage, theme, toggleTheme, t } = useCart();
  const [searchValue, setSearchValue] = useState("");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearchChange(val);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/85 backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-950/85 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onCategorySelect("all")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20 transition-transform duration-300 hover:scale-105">
              {/* Bangladeshi rising sun / kart icon */}
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="6" fill="#f42a41" />
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7.2 14.63c0-.04.01-.07.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.2l.03-.04z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-2xl font-sans">
                Bangla<span className="text-primary dark:text-primary">Kart</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-semibold text-accent tracking-widest leading-none">
                {t("Heritage Market", "ঐতিহ্যবাহী বাজার")}
              </span>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={handleSearch}
              placeholder={t("Search traditional items...", "ঐতিহ্যবাহী পণ্য খুঁজুন...")}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary-light dark:border-stone-800 dark:bg-stone-900/50 dark:text-white dark:focus:border-primary dark:focus:bg-stone-950 dark:focus:ring-primary/20"
            />
          </div>

          {/* Utilities Panel */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-semibold hover:bg-stone-50 active:scale-95 dark:border-stone-800 dark:hover:bg-stone-900 dark:text-stone-300 transition-all cursor-pointer"
              aria-label="Toggle language"
            >
              <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.5M11.4 18.9c.47-.83.98-1.7 1.4-2.5M12.9 16.4c.5-1.5.5-3 0-4.5m-3-3a9 9 0 11-9 9" />
              </svg>
              {language === "EN" ? "বাংলা" : "English"}
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 active:scale-95 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 transition-all cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-10h-1M4.34 12h-1m15.07 6.07-.71-.71M6.34 6.34l-.71-.71m12.78 0-.71.71M6.34 17.66l-.71.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white transition-all cursor-pointer"
              aria-label="Open cart"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-stone-950">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Links (Under Navbar) */}
      <div className="border-t border-stone-100 bg-stone-50/50 dark:border-stone-900 dark:bg-stone-950/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-start overflow-x-auto gap-4 py-2 scrollbar-none">
            {/* Quick search input for mobile */}
            <div className="relative block md:hidden flex-shrink-0 w-44">
              <input
                type="text"
                value={searchValue}
                onChange={handleSearch}
                placeholder={t("Search...", "খুঁজুন...")}
                className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-xs outline-none focus:border-primary dark:border-stone-800 dark:bg-stone-900 dark:text-white"
              />
            </div>
            
            {/* Category Buttons */}
            {[
              { id: "all", name: "All Products", bnName: "সব পণ্য" },
              { id: "apparel", name: "Apparel", bnName: "পোশাক" },
              { id: "food", name: "Sweets & Organic", bnName: "খাদ্য ও পানীয়" },
              { id: "crafts", name: "Handicrafts", bnName: "হস্তশিল্প" },
              { id: "home", name: "Home Decor", bnName: "গৃহসজ্জা" },
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategorySelect(cat.id)}
                  className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-900 dark:hover:text-stone-200"
                  }`}
                >
                  {language === "EN" ? cat.name : cat.bnName}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
