"use client";
import { useState, useEffect, useCallback } from "react";
import type { CartItem } from "@/types";
import { getPriceTierForQty } from "@/lib/utils";
import { getProductById } from "@/data";

const CART_KEY = "factoryhub_cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(loadCart());
  }, []);

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    saveCart(next);
  }, []);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variantId === item.variantId);
      let next: CartItem[];
      if (existing) {
        next = prev.map((i) =>
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      } else {
        next = [...prev, item];
      }
      saveCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((variantId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.variantId !== variantId);
      saveCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    setItems((prev) => {
      const next = prev.map((i) =>
        i.variantId === variantId ? { ...i, quantity } : i,
      );
      saveCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  // Group items by factory for separate checkout
  const getItemsByFactory = useCallback((): Record<string, CartItem[]> => {
    return items.reduce(
      (acc, item) => {
        if (!acc[item.factoryId]) acc[item.factoryId] = [];
        acc[item.factoryId].push(item);
        return acc;
      },
      {} as Record<string, CartItem[]>,
    );
  }, [items]);

  const getSubtotal = useCallback(() => {
    return items.reduce((sum, item) => {
      // Recalculate price tier based on current quantity
      const product = getProductById(item.productId);
      if (product) {
        const tier = getPriceTierForQty(product.priceTiers, item.quantity);
        if (tier) {
          return sum + tier.pricePerUnit * item.quantity;
        }
      }
      return sum + item.pricePerUnit * item.quantity;
    }, 0);
  }, [items]);

  const validateMOQ = useCallback(() => {
    const violations = items
      .filter((i) => i.quantity < i.moq)
      .map((i) => ({
        variantId: i.variantId,
        productName: i.productName,
        moq: i.moq,
        quantity: i.quantity,
      }));
    return { valid: violations.length === 0, violations };
  }, [items]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemsByFactory,
    getSubtotal,
    validateMOQ,
    totalItems,
  };
}
