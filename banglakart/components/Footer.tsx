"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Footer() {
  const { t } = useCart();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-stone-900 border-t border-stone-800 text-stone-300 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="6" fill="#f42a41" />
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7.2 14.63c0-.04.01-.07.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.2l.03-.04z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Bangla<span className="text-primary">Kart</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              {t(
                "Connecting global hearts with authentic Bengali heritage. Sourced directly from local weavers, potters, honey collectors, and artisans.",
                "বিশ্বের কাছে পৌঁছে দিচ্ছি বাংলার খাঁটি ঐতিহ্য। সরাসরি আমাদের তাঁতি, কুমোর, মধু সংগ্রাহক ও কারিগরদের কাছ থেকে সংগৃহীত।"
              )}
            </p>
            <div className="flex gap-4 mt-2">
              {/* Mock Social Media icons */}
              {["facebook", "instagram", "twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="h-8 w-8 flex items-center justify-center rounded-lg bg-stone-800 text-stone-400 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <div className="h-4 w-4 capitalize text-[10px] font-bold text-center">
                    {social[0]}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t("Explore Categories", "পণ্য ক্যাটাগরি")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-primary hover:underline transition-all">
                  {t("Heritage Apparel", "ঐতিহ্যবাহী পোশাক")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline transition-all">
                  {t("Organic Delicacies", "অর্গানিক খাবার")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline transition-all">
                  {t("Handicrafts & Collectibles", "হস্তশিল্প ও কারুশিল্প")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline transition-all">
                  {t("Traditional Home Living", "বাঙালি গৃহসজ্জা")}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t("Support", "সহায়তা")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-primary hover:underline transition-all">
                  {t("Shipping & Delivery", "শিপিং ও ডেলিভারি")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline transition-all">
                  {t("Artisan Empowerment Fund", "কারিগর তহবিল")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline transition-all">
                  {t("Terms of Service", "ব্যবহারের শর্তাবলী")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary hover:underline transition-all">
                  {t("Contact Us", "যোগাযোগ করুন")}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t("Artisan Stories & Offers", "আমাদের গল্প ও অফার")}
            </h3>
            <p className="text-sm text-stone-400">
              {t(
                "Subscribe to receive stories of local artisans, cultural heritage, and exclusive discount codes.",
                "দেশীয় কারিগরদের গল্প, ঐতিহ্যবাহী উৎসবের বিবরণ এবং বিশেষ অফার পেতে সাবস্ক্রাইব করুন।"
              )}
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 mt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("Enter your email", "আপনার ইমেইল লিখুন")}
                className="w-full rounded-lg bg-stone-800 border border-stone-700 px-3 py-2 text-sm text-white placeholder-stone-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary hover:bg-primary-hover px-4 py-2 text-sm font-bold text-white transition-all active:scale-95 cursor-pointer"
              >
                {subscribed ? "✓" : t("Join", "যুক্ত হন")}
              </button>
            </form>
            {subscribed && (
              <span className="text-xs text-primary font-medium">
                {t("Thank you! You are now subscribed.", "ধন্যবাদ! আপনি যুক্ত হয়েছেন।")}
              </span>
            )}
          </div>
        </div>

        {/* Divider & Bottom Section */}
        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} BanglaKart. {t("All rights reserved.", "সর্বস্বত্ব সংরক্ষিত।")} Built with pride in West Bengal.
          </p>

          {/* Local Payment Badges */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-500 font-medium">
              {t("Secure Payment:", "নিরাপদ পেমেন্ট গেটওয়ে:")}
            </span>
            <div className="flex gap-2">
              {/* bKash Mock Badge */}
              <div className="h-7 w-12 rounded bg-pink-600 text-white flex items-center justify-center text-[10px] font-bold tracking-tight px-1 font-sans cursor-default hover:scale-105 transition-transform">
                bKash
              </div>
              {/* Nagad Mock Badge */}
              <div className="h-7 w-12 rounded bg-orange-600 text-white flex items-center justify-center text-[10px] font-bold tracking-tight px-1 font-sans cursor-default hover:scale-105 transition-transform">
                Nagad
              </div>
              {/* Card Badge */}
              <div className="h-7 w-12 rounded bg-stone-800 border border-stone-700 text-stone-400 flex items-center justify-center text-[9px] font-bold tracking-tight px-1 font-sans cursor-default hover:scale-105 transition-transform">
                Cards
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
