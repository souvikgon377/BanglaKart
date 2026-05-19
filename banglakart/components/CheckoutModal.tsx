"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
}

type CheckoutStep = "billing" | "payment" | "processing" | "success";
type PaymentMethod = "bkash" | "nagad" | "card";

export default function CheckoutModal({
  isOpen,
  onClose,
  totalAmount,
}: CheckoutModalProps) {
  const { clearCart, language, t } = useCart();
  const [step, setStep] = useState<CheckoutStep>("billing");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bkash");
  
  // Billing form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  // Payment credentials state
  const [walletNumber, setWalletNumber] = useState("");
  const [pin, setPin] = useState("");

  if (!isOpen) return null;

  const handleBillingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim() && address.trim()) {
      setStep("payment");
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "card" || walletNumber.trim()) {
      setStep("processing");
      setTimeout(() => {
        setStep("success");
        clearCart();
      }, 2500); // Simulate processing payment delay
    }
  };

  const handleClose = () => {
    setStep("billing");
    setName("");
    setPhone("");
    setAddress("");
    setWalletNumber("");
    setPin("");
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(language === "EN" ? "en-US" : "bn-BD");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in transition-all duration-300">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden transform scale-100 transition-all">
        
        {/* Header (unless success) */}
        {step !== "success" && step !== "processing" && (
          <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4 dark:border-stone-800">
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              {t("Secure Checkout", "নিরাপদ চেকআউট")}
            </h2>
            <button
              onClick={handleClose}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          
          {/* Step indicator */}
          {step !== "success" && step !== "processing" && (
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  step === "billing" ? "bg-primary text-white" : "bg-primary-light text-primary"
                }`}>1</span>
                <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">{t("Delivery", "ডেলিভারি")}</span>
              </div>
              <div className="h-[1px] w-12 bg-stone-200 dark:bg-stone-800" />
              <div className="flex items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  step === "payment" ? "bg-primary text-white" : "bg-stone-100 text-stone-400 dark:bg-stone-800"
                }`}>2</span>
                <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">{t("Payment", "পেমেন্ট")}</span>
              </div>
            </div>
          )}

          {/* STEP 1: BILLING */}
          {step === "billing" && (
            <form onSubmit={handleBillingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  {t("Full Name", "পূর্ণ নাম")}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("e.g. Abul Hasan", "উদাঃ আবুল হাসান")}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white dark:border-stone-800 dark:bg-stone-850 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  {t("Phone Number", "মোবাইল নম্বর")}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white dark:border-stone-800 dark:bg-stone-850 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  {t("Delivery Address", "ডেলিভারি ঠিকানা")}
                </label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t("House/Road/Area, City", "বাসা/রোড/এলাকা, জেলা")}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white dark:border-stone-800 dark:bg-stone-850 dark:text-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
                <div>
                  <span className="text-xs text-stone-500">{t("Total Payable:", "মোট প্রদেয়:")}</span>
                  <p className="text-lg font-extrabold text-primary">৳ {formatCurrency(totalAmount)}</p>
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-primary hover:bg-primary-hover px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer"
                >
                  {t("Proceed to Payment", "পেমেন্টে এগিয়ে যান")}
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === "payment" && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              
              {/* Selector Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bkash")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === "bkash"
                      ? "border-pink-600 bg-pink-50/50 dark:bg-pink-950/20"
                      : "border-stone-200 dark:border-stone-850 hover:bg-stone-50"
                  }`}
                >
                  <div className="h-6 w-10 bg-pink-600 rounded flex items-center justify-center text-white text-[8px] font-bold">bKash</div>
                  <span className="text-[10px] font-bold mt-1 text-stone-700 dark:text-stone-300">bKash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("nagad")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === "nagad"
                      ? "border-orange-600 bg-orange-50/50 dark:bg-orange-950/20"
                      : "border-stone-200 dark:border-stone-850 hover:bg-stone-50"
                  }`}
                >
                  <div className="h-6 w-10 bg-orange-600 rounded flex items-center justify-center text-white text-[8px] font-bold">Nagad</div>
                  <span className="text-[10px] font-bold mt-1 text-stone-700 dark:text-stone-300">Nagad</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary-light/50 dark:bg-primary/20"
                      : "border-stone-200 dark:border-stone-850 hover:bg-stone-50"
                  }`}
                >
                  <div className="h-6 w-10 bg-stone-800 text-stone-400 rounded flex items-center justify-center text-[8px] font-bold">CARDS</div>
                  <span className="text-[10px] font-bold mt-1 text-stone-700 dark:text-stone-300">{t("Card", "কার্ড")}</span>
                </button>
              </div>

              {/* Mobile Wallet Form */}
              {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                <div className="space-y-4 p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-150 dark:border-stone-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase">
                      {paymentMethod === "bkash" ? "bKash Mobile Wallet" : "Nagad Mobile Wallet"}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {t("Wallet Number", "মোবাইল ওয়ালেট নম্বর")}
                    </label>
                    <input
                      type="tel"
                      required
                      value={walletNumber}
                      onChange={(e) => setWalletNumber(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {t("Secret PIN", "গোপন পিন")}
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="••••"
                      className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>
              )}

              {/* Credit Card Mock Form */}
              {paymentMethod === "card" && (
                <div className="space-y-4 p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-150 dark:border-stone-800">
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase">
                    Credit / Debit Card
                  </span>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Card Number (4111 2222 3333 4444)"
                      className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setStep("billing")}
                  className="text-sm font-bold text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  {t("← Back", "← পিছনে যান")}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary hover:bg-primary-hover px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer"
                >
                  {t("Pay & Confirm Order", "পেমেন্ট ও অর্ডার নিশ্চিত করুন")}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PROCESSING */}
          {step === "processing" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative mb-6">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-stone-200 border-t-primary" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
                {t("Verifying Transaction...", "লেনদেন যাচাই করা হচ্ছে...")}
              </h3>
              <p className="text-sm text-stone-500 max-w-xs">
                {t(
                  "Connecting to secure bank gateway. Please do not close this window or refresh the page.",
                  "নিরাপদ ব্যাংকিং গেটওয়ের সাথে সংযোগ স্থাপন করা হচ্ছে। অনুগ্রহ করে উইন্ডোটি বন্ধ বা রিফ্রেশ করবেন না।"
                )}
              </p>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-scale-up">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 mb-6 border border-emerald-250">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">
                {t("Order Placed Successfully!", "অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!")}
              </h3>
              <p className="text-sm text-stone-500 max-w-sm mb-6">
                {t(
                  `Thank you for shopping at BanglaKart, ${name}! Your order has been placed. We have sent a confirmation message to ${phone}.`,
                  `বাংলাকার্ট থেকে কেনাকাটা করার জন্য ধন্যবাদ, ${name}! আপনার অর্ডারটি সফল হয়েছে। আমরা ${phone} নম্বরে একটি নিশ্চিতকরণ বার্তা পাঠিয়েছি।`
                )}
              </p>
              <button
                onClick={handleClose}
                className="w-full rounded-xl bg-primary hover:bg-primary-hover py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                {t("Continue Shopping", "কেনাকাটা চালিয়ে যান")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
