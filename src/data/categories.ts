import type { IndustryType } from "@/types";

export interface Category {
  id: string;
  name: string;
  industryType: IndustryType;
  subcategories?: string[];
}

export const productCategories: Category[] = [
  // Apparel Categories
  {
    id: "tshirts",
    name: "T-Shirts",
    industryType: "APPAREL",
    subcategories: ["Crew Neck", "V-Neck", "Polo", "Long Sleeve"],
  },
  {
    id: "denim",
    name: "Denim",
    industryType: "APPAREL",
    subcategories: ["Jeans", "Jackets", "Skirts", "Shorts"],
  },
  {
    id: "activewear",
    name: "Activewear",
    industryType: "APPAREL",
    subcategories: ["Leggings", "Sports Bras", "Shorts", "Tops"],
  },
  {
    id: "outerwear",
    name: "Outerwear",
    industryType: "APPAREL",
    subcategories: ["Jackets", "Coats", "Hoodies", "Vests"],
  },
  {
    id: "formal",
    name: "Formal Wear",
    industryType: "APPAREL",
    subcategories: ["Shirts", "Trousers", "Dresses", "Suits"],
  },
  {
    id: "knitwear",
    name: "Knitwear",
    industryType: "APPAREL",
    subcategories: ["Sweaters", "Cardigans", "Pullovers"],
  },

  // Footwear Categories
  {
    id: "dress-shoes",
    name: "Dress Shoes",
    industryType: "FOOTWEAR",
    subcategories: ["Oxfords", "Loafers", "Derby", "Monk Straps"],
  },
  {
    id: "casual-shoes",
    name: "Casual Shoes",
    industryType: "FOOTWEAR",
    subcategories: ["Sneakers", "Slip-Ons", "Boat Shoes"],
  },
  {
    id: "boots",
    name: "Boots",
    industryType: "FOOTWEAR",
    subcategories: [
      "Ankle Boots",
      "Chelsea Boots",
      "Work Boots",
      "Combat Boots",
    ],
  },
  {
    id: "athletic-shoes",
    name: "Athletic Shoes",
    industryType: "FOOTWEAR",
    subcategories: ["Running Shoes", "Training Shoes", "Basketball Shoes"],
  },
  {
    id: "sandals",
    name: "Sandals",
    industryType: "FOOTWEAR",
    subcategories: ["Slides", "Flip Flops", "Strappy Sandals"],
  },

  // Bags & Luggage Categories
  {
    id: "backpacks",
    name: "Backpacks",
    industryType: "BAGS",
    subcategories: [
      "School Backpacks",
      "Hiking Backpacks",
      "Laptop Backpacks",
      "Fashion Backpacks",
    ],
  },
  {
    id: "handbags",
    name: "Handbags",
    industryType: "BAGS",
    subcategories: ["Tote Bags", "Shoulder Bags", "Crossbody Bags", "Clutches"],
  },
  {
    id: "travel-bags",
    name: "Travel Bags",
    industryType: "BAGS",
    subcategories: ["Suitcases", "Duffel Bags", "Carry-On", "Garment Bags"],
  },
  {
    id: "messenger",
    name: "Messenger & Briefcases",
    industryType: "BAGS",
    subcategories: ["Messenger Bags", "Briefcases", "Portfolio Bags"],
  },

  // Accessories Categories
  {
    id: "belts",
    name: "Belts",
    industryType: "ACCESSORIES",
    subcategories: ["Leather Belts", "Fabric Belts", "Braided Belts"],
  },
  {
    id: "wallets",
    name: "Wallets & Small Leather Goods",
    industryType: "ACCESSORIES",
    subcategories: [
      "Bifold Wallets",
      "Trifold Wallets",
      "Card Holders",
      "Money Clips",
    ],
  },
  {
    id: "jewelry",
    name: "Jewelry",
    industryType: "ACCESSORIES",
    subcategories: ["Necklaces", "Bracelets", "Earrings", "Rings"],
  },
  {
    id: "watches",
    name: "Watches",
    industryType: "ACCESSORIES",
    subcategories: ["Analog Watches", "Digital Watches", "Smart Watches"],
  },
  {
    id: "hats-scarves",
    name: "Hats & Scarves",
    industryType: "ACCESSORIES",
    subcategories: ["Baseball Caps", "Beanies", "Scarves", "Bandanas"],
  },
  {
    id: "sunglasses",
    name: "Sunglasses",
    industryType: "ACCESSORIES",
    subcategories: ["Aviator", "Wayfarer", "Round", "Sport"],
  },
];

export function getCategoriesByIndustry(
  industryType: IndustryType,
): Category[] {
  return productCategories.filter((cat) => cat.industryType === industryType);
}

export function getAllCategoryNames(): string[] {
  return productCategories.map((cat) => cat.name);
}
