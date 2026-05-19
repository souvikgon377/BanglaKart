"use client";

import Script from "next/script";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

type RazorpayCheckout = new (options: Record<string, unknown>) => {
  open: () => void;
};

declare global {
  interface Window {
    Razorpay?: RazorpayCheckout;
  }
}

export default function PaymentPage() {
  const { cart, clearCart, language, t } = useCart();
  const [scriptReady, setScriptReady] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [message, setMessage] = useState("");

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(language === "EN" ? "en-IN" : "bn-BD");
  };

  const startPayment = async () => {
    setMessage("");

    if (!scriptReady || !window.Razorpay) {
      setMessage("Razorpay checkout is still loading. Please try again in a moment.");
      return;
    }

    if (subtotal < 1) {
      setMessage("Your cart is empty. Add items before starting payment.");
      return;
    }

    setIsPaying(true);

    try {
      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: subtotal, currency: "INR" }),
      });
      const order = (await orderResponse.json()) as RazorpayOrder & { error?: string };

      if (!orderResponse.ok) {
        throw new Error(order.error ?? "Could not create Razorpay order.");
      }

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "BanglaKart",
        description: "Authentic Bangladeshi heritage products",
        order_id: order.id,
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#006a4e",
        },
        handler: (response: RazorpayResponse) => {
          clearCart();
          setMessage(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
          setIsPaying(false);
        },
        modal: {
          ondismiss: () => setIsPaying(false),
        },
      });

      razorpay.open();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Payment failed to start.");
      setIsPaying(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setScriptReady(true)}
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Razorpay Checkout</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-stone-950 dark:text-white">
            {t("Complete your BanglaKart payment", "BanglaKart পেমেন্ট সম্পন্ন করুন")}
          </h1>
          <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
            {t(
              "Pay securely with cards, UPI, wallets, netbanking, and other Razorpay-supported methods.",
              "কার্ড, UPI, ওয়ালেট, নেটব্যাংকিং এবং Razorpay সমর্থিত অন্যান্য মাধ্যমে নিরাপদে পেমেন্ট করুন।"
            )}
          </p>

          <div className="mt-8 space-y-3">
            {cart.length === 0 ? (
              <div className="rounded-xl border border-dashed border-stone-300 p-5 text-sm text-stone-500 dark:border-stone-700">
                {t("Your cart is empty.", "আপনার কার্ট খালি।")}
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-stone-150 p-4 dark:border-stone-800"
                >
                  <div>
                    <h2 className="text-sm font-bold text-stone-900 dark:text-white">
                      {language === "EN" ? item.product.name : item.product.banglaName}
                    </h2>
                    <p className="mt-1 text-xs text-stone-500">
                      {item.quantity} x ₹{formatCurrency(item.product.price)}
                    </p>
                  </div>
                  <p className="text-sm font-black text-primary">
                    ₹{formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-lg font-black text-stone-950 dark:text-white">
            {t("Payment Summary", "পেমেন্ট সারাংশ")}
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-400">
              <span>{t("Subtotal", "উপমোট")}</span>
              <span className="font-bold text-stone-900 dark:text-white">₹{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-400">
              <span>{t("Gateway", "গেটওয়ে")}</span>
              <span className="font-bold text-primary">Razorpay</span>
            </div>
            <div className="h-px bg-stone-200 dark:bg-stone-800" />
            <div className="flex items-center justify-between text-lg font-black">
              <span>{t("Total", "মোট")}</span>
              <span className="text-primary">₹{formatCurrency(subtotal)}</span>
            </div>
          </div>

          <button
            onClick={startPayment}
            disabled={isPaying || !scriptReady || subtotal < 1}
            className="mt-6 w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPaying ? t("Opening Razorpay...", "Razorpay খুলছে...") : t("Pay with Razorpay", "Razorpay দিয়ে পেমেন্ট করুন")}
          </button>

          {message && (
            <p className="mt-4 rounded-xl bg-stone-50 p-3 text-sm text-stone-700 dark:bg-stone-950 dark:text-stone-300">
              {message}
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}
