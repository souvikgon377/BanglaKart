"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    language,
    t,
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(language === "EN" ? "en-US" : "bn-BD");
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-stone-900 border-l border-stone-200 dark:border-stone-850 animate-slide-in">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-5 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              {t("Shopping Cart", "শপিং কার্ট")}
            </h2>
            <span className="rounded-full bg-primary-light text-primary px-2.5 py-0.5 text-xs font-bold dark:bg-primary/20">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-50 hover:text-stone-600 dark:hover:bg-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-50 dark:bg-stone-800 text-stone-450">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-bold text-stone-800 dark:text-white">
                  {t("Your cart is empty", "আপনার কার্টটি খালি")}
                </p>
                <p className="text-xs text-stone-500 mt-1 max-w-[240px]">
                  {t(
                    "Explore our beautiful collections and add authentic items to your cart.",
                    "আমাদের বৈচিত্র্যময় সংগ্রহ দেখুন এবং আপনার পছন্দের পণ্যগুলো যোগ করুন।"
                  )}
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-xl border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 text-sm font-bold transition-all duration-300"
              >
                {t("Start Shopping", "কেনাকাটা শুরু করুন")}
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 rounded-xl border border-stone-150 p-3 dark:border-stone-800 hover:shadow-sm transition-shadow"
              >
                {/* SVG Image Thumbnail */}
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-stone-50 border border-stone-100 dark:border-stone-800">
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: item.product.imageSvg }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-stone-800 dark:text-white truncate">
                    {language === "EN" ? item.product.name : item.product.banglaName}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {t("Origin:", "উৎস:")} {language === "EN" ? item.product.origin : item.product.banglaOrigin}
                  </p>
                  <p className="text-sm font-extrabold text-primary mt-1">
                    ৳{formatCurrency(item.product.price)}
                  </p>
                </div>

                {/* Quantity Control & Remove */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-stone-400 hover:text-accent"
                    title="Remove item"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50/50 p-1 dark:border-stone-800 dark:bg-stone-850">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="flex h-5 w-5 items-center justify-center rounded-md text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-800"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="flex h-5 w-5 items-center justify-center rounded-md text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-800"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer summary */}
        {cart.length > 0 && (
          <div className="border-t border-stone-100 bg-stone-50/50 p-6 dark:border-stone-800 dark:bg-stone-950/20">
            <div className="space-y-3.5 mb-6">
              <div className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-400">
                <span>{t("Subtotal", "উপমোট")}</span>
                <span className="font-semibold text-stone-800 dark:text-white">৳{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-400">
                <span>{t("Delivery Fee", "ডেলিভারি চার্জ")}</span>
                <span className="font-semibold text-emerald-600">{t("FREE", "ফ্রি")}</span>
              </div>
              <div className="h-[1px] bg-stone-200 dark:bg-stone-800" />
              <div className="flex items-center justify-between text-base font-extrabold">
                <span className="text-stone-900 dark:text-white">{t("Total Payable", "মোট প্রদেয়")}</span>
                <span className="text-primary text-lg">৳{formatCurrency(subtotal)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full rounded-xl bg-primary hover:bg-primary-hover py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer"
            >
              {t("Checkout Now", "চেকআউট করুন")}
            </button>
            <Link
              href="/payment"
              onClick={() => setIsCartOpen(false)}
              className="mt-3 flex w-full items-center justify-center rounded-xl border border-primary px-5 py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white active:scale-95"
            >
              {t("Pay with Razorpay", "Razorpay দিয়ে পেমেন্ট করুন")}
            </Link>
          </div>
        )}
      </div>

      {/* Checkout Payment Gateway Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(false); // Close cart on checkout complete/close
        }}
        totalAmount={subtotal}
      />
    </>
  );
}
