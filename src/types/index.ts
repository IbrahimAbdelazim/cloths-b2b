export type UserRole = "ADMIN" | "FACTORY" | "CUSTOMER";
export type FactoryStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
export type ProductStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED";
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
export type SubscriptionPlan = "STARTER" | "PROFESSIONAL" | "ENTERPRISE";
export type IndustryType =
  | "APPAREL"
  | "FOOTWEAR"
  | "ACCESSORIES"
  | "BAGS"
  | "OTHER";

export interface SubscriptionFeatures {
  maxProducts: number | null; // null means unlimited
  maxOrders: number | null;
  customBranding: boolean;
  prioritySupport: boolean;
  analyticsAccess: boolean;
  bulkUpload: boolean;
  apiAccess: boolean;
}

export interface Subscription {
  plan: SubscriptionPlan;
  price: number; // monthly price in USD
  currency: string;
  features: SubscriptionFeatures;
  startedAt: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface PriceTier {
  minQty: number;
  maxQty: number | null;
  pricePerUnit: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  color: string;
  colorHex: string;
  sku: string;
  stock: number;
  isActive: boolean;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string;
  sortOrder: number;
}

export interface Factory {
  id: string;
  userId: string;
  companyName: string;
  registrationNo: string;
  taxId: string;
  website: string;
  description: string;
  logoUrl: string;
  country: string;
  city: string;
  status: FactoryStatus;
  rejectionReason?: string;
  verifiedAt?: string;
  yearsInBusiness: number;
  employeeCount: string;
  certifications: string[];
  specialties: string[];
  productCount: number;
  joinedAt: string;
  contactName: string;
  contactEmail: string;
  industryType: IndustryType;
  subscription: Subscription;
}

export interface Product {
  id: string;
  factoryId: string;
  factory?: Factory;
  name: string;
  slug: string;
  description: string;
  category: string;
  subCategory?: string;
  moq: number;
  currency: string;
  priceTiers: PriceTier[];
  leadTimeDays: number;
  sampleAvailable: boolean;
  samplePrice?: number;
  materials: string;
  careInstructions?: string;
  countryOfOrigin: string;
  images: ProductImage[];
  variants: ProductVariant[];
  status: ProductStatus;
  rejectionReason?: string;
  approvedAt?: string;
  tags: string[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  productName: string;
  variantDesc: string;
  imageUrl?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerStore: string;
  factoryId: string;
  factoryName?: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  status: OrderStatus;
  shippingAddress: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  trackingNumber?: string;
  shippingCarrier?: string;
  estimatedDelivery?: string;
  shippedAt?: string;
  deliveredAt?: string;
  buyerNote?: string;
  factoryNote?: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  factoryId: string;
  factoryName: string;
  quantity: number;
  pricePerUnit: number;
  moq: number;
  imageUrl?: string;
  size: string;
  color: string;
  colorHex: string;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  factoryId?: string;
  customerId?: string;
}
