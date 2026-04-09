"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatMOQ, getPriceRange } from "@/lib/utils";
import { getProductsByFactory } from "@/data/products";
import type { Product, ProductStatus } from "@/types";

const tabs: { label: string; value: ProductStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Approved", value: "APPROVED" },
  { label: "Pending", value: "PENDING_APPROVAL" },
  { label: "Draft", value: "DRAFT" },
  { label: "Rejected", value: "REJECTED" },
];

export default function FactoryProductsPage() {
  const [filter, setFilter] = useState<ProductStatus | "ALL">("ALL");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const factoryId = localStorage.getItem("demo_factory_id") ?? "factory-1";
    setProducts(getProductsByFactory(factoryId));
  }, []);

  const filtered =
    filter === "ALL" ? products : products.filter((p) => p.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Products</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/factory/products/new">
            <Plus className="h-4 w-4" />
            New Product
          </Link>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-zinc-200">
        {tabs.map((tab) => {
          const count =
            tab.value === "ALL"
              ? products.length
              : products.filter((p) => p.status === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm border-b-2 -mb-px transition-colors ${
                filter === tab.value
                  ? "border-blue-600 text-blue-700 font-medium"
                  : "border-transparent text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {tab.label}
              <span
                className={`text-xs rounded-full px-1.5 py-0.5 ${
                  filter === tab.value
                    ? "bg-blue-100 text-blue-700"
                    : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-20 text-center">
            <p className="text-zinc-400 text-sm mb-4">No products yet</p>
            <Button asChild>
              <Link href="/factory/products/new">
                <Plus className="h-4 w-4" />
                Add Your First Product
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => {
            const img = product.images[0];
            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-square bg-zinc-50">
                  {img ? (
                    <Image
                      src={img.url}
                      alt={img.altText}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                      No image
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <StatusBadge status={product.status} />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-zinc-900 text-sm leading-tight">{product.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{product.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">
                        {formatMOQ(product.moq)}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-emerald-700">
                      {getPriceRange(product.priceTiers)}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3 text-xs" asChild>
                    <Link href={`/factory/products/${product.id}/edit`}>
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
