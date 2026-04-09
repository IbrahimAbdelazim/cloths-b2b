import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PriceTier } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatMOQ(moq: number): string {
  return `Min. ${moq.toLocaleString()} units`;
}

export function getPriceTierForQty(
  tiers: PriceTier[],
  qty: number
): PriceTier | null {
  const sorted = [...tiers].sort((a, b) => a.minQty - b.minQty);
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (qty >= sorted[i].minQty) return sorted[i];
  }
  return sorted[0] ?? null;
}

export function getPriceRange(tiers: PriceTier[]): string {
  if (!tiers.length) return "—";
  const prices = tiers.map((t) => t.pricePerUnit);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return formatCurrency(min);
  return `${formatCurrency(min)} – ${formatCurrency(max)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function truncate(str: string, length: number): string {
  return str.length <= length ? str : str.slice(0, length) + "…";
}

export function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${dateStr}-${rand}`;
}

export function getStatusStyle(status: string): string {
  const map: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800",
    PENDING_APPROVAL: "bg-amber-100 text-amber-800",
    APPROVED: "bg-emerald-100 text-emerald-800",
    REJECTED: "bg-rose-100 text-rose-800",
    SUSPENDED: "bg-zinc-100 text-zinc-600",
    DRAFT: "bg-zinc-100 text-zinc-600",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-purple-100 text-purple-800",
    SHIPPED: "bg-sky-100 text-sky-800",
    DELIVERED: "bg-emerald-100 text-emerald-800",
    CANCELLED: "bg-rose-100 text-rose-800",
    UNFULFILLED: "bg-zinc-100 text-zinc-600",
    PARTIAL: "bg-amber-100 text-amber-800",
    FULFILLED: "bg-emerald-100 text-emerald-800",
  };
  return map[status] ?? "bg-zinc-100 text-zinc-600";
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    PENDING_APPROVAL: "Pending Approval",
  };
  return (
    map[status] ??
    status
      .split("_")
      .map((w) => w[0] + w.slice(1).toLowerCase())
      .join(" ")
  );
}
