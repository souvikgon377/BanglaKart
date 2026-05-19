"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  language: "EN" | "BN";
  toggleLanguage: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  t: (enKey: string, bnKey: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const readStoredCart = () => {
  const savedCart = window.localStorage.getItem("banglakart_cart");
  if (!savedCart) return [];

  try {
    return JSON.parse(savedCart) as CartItem[];
  } catch (e) {
    console.error("Failed to parse cart", e);
    return [];
  }
};

const readStoredLanguage = () => {
  const savedLanguage = window.localStorage.getItem("banglakart_lang");
  return savedLanguage === "BN" || savedLanguage === "EN" ? savedLanguage : "EN";
};

const readStoredTheme = () => {
  const savedTheme = window.localStorage.getItem("banglakart_theme");
  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [language, setLanguage] = useState<"EN" | "BN">("EN");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Load persisted browser state after hydration so SSR and first client render match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(readStoredCart());
    setLanguage(readStoredLanguage());
    setTheme(readStoredTheme());
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Save cart to localStorage when changed
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("banglakart_cart", JSON.stringify(newCart));
  };

  const addToCart = (product: Product) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      saveCart(newCart);
    } else {
      saveCart([...cart, { product, quantity: 1 }]);
    }
    // Automatically open cart drawer for better UX
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    saveCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    saveCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    saveCart([]);
  };

  const toggleLanguage = () => {
    const nextLang = language === "EN" ? "BN" : "EN";
    setLanguage(nextLang);
    localStorage.setItem("banglakart_lang", nextLang);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("banglakart_theme", nextTheme);
  };

  // Helper helper to return active translation
  const t = (enKey: string, bnKey: string) => {
    return language === "EN" ? enKey : bnKey;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        language,
        toggleLanguage,
        theme,
        toggleTheme,
        t,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
