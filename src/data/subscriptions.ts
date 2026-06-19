import type { SubscriptionPlan, SubscriptionFeatures } from "@/types";

export interface SubscriptionPlanData {
  id: SubscriptionPlan;
  name: string;
  price: number;
  currency: string;
  billingPeriod: "monthly" | "annual";
  features: SubscriptionFeatures;
  description: string;
  popular?: boolean;
}

export const subscriptionPlans: SubscriptionPlanData[] = [
  {
    id: "STARTER",
    name: "Starter",
    price: 49,
    currency: "USD",
    billingPeriod: "monthly",
    description: "Perfect for small manufacturers getting started",
    features: {
      maxProducts: 25,
      maxOrders: 50,
      customBranding: false,
      prioritySupport: false,
      analyticsAccess: false,
      bulkUpload: false,
      apiAccess: false,
    },
  },
  {
    id: "PROFESSIONAL",
    name: "Professional",
    price: 149,
    currency: "USD",
    billingPeriod: "monthly",
    description: "For growing manufacturers scaling their business",
    popular: true,
    features: {
      maxProducts: 200,
      maxOrders: 500,
      customBranding: true,
      prioritySupport: true,
      analyticsAccess: true,
      bulkUpload: true,
      apiAccess: false,
    },
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    price: 399,
    currency: "USD",
    billingPeriod: "monthly",
    description: "For established manufacturers with high volume",
    features: {
      maxProducts: null, // unlimited
      maxOrders: null, // unlimited
      customBranding: true,
      prioritySupport: true,
      analyticsAccess: true,
      bulkUpload: true,
      apiAccess: true,
    },
  },
];

export const industryTypes = [
  { value: "APPAREL", label: "Apparel & Clothing", icon: "👕" },
  { value: "FOOTWEAR", label: "Footwear & Shoes", icon: "👟" },
  {
    value: "ACCESSORIES",
    label: "Accessories (Belts, Jewelry, etc.)",
    icon: "⌚",
  },
  { value: "BAGS", label: "Bags & Luggage", icon: "👜" },
  { value: "OTHER", label: "Other Products", icon: "📦" },
] as const;
