"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency, getPriceRange, formatMOQ } from "@/lib/utils";
import { products as allProducts } from "@/data/products";
import { getFactoryById } from "@/data/factories";
import type { ProductStatus } from "@/types";

const tabs: { label: string; value: ProductStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING_APPROVAL" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Draft", value: "DRAFT" },
];

export default function AdminProductsPage() {
  const [filter, setFilter] = useState<ProductStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const filtered = allProducts.filter((p) => {
    const matchesStatus = filter === "ALL" || p.status === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Products</h1>
        <p className="text-sm text-zinc-500 mt-1">Review and approve product listings</p>
      </div>

      <div className="flex gap-1 border-b border-zinc-200">
        {tabs.map((tab) => {
          const count =
            tab.value === "ALL"
              ? allProducts.length
              : allProducts.filter((p) => p.status === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm border-b-2 -mb-px transition-colors ${
                filter === tab.value
                  ? "border-violet-600 text-violet-700 font-medium"
                  : "border-transparent text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {tab.label}
              <span className={`text-xs rounded-full px-1.5 py-0.5 ${
                filter === tab.value ? "bg-violet-100 text-violet-700" : "bg-zinc-100 text-zinc-500"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <Input
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500">Product</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Factory</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Category</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">MOQ</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Price Range</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filtered.map((product) => {
                  const factory = getFactoryById(product.factoryId);
                  const img = product.images[0];
                  return (
                    <tr key={product.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          {img ? (
                            <div className="relative h-10 w-10 rounded-md overflow-hidden border border-zinc-100 shrink-0">
                              <Image
                                src={img.url}
                                alt={img.altText}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-zinc-100 shrink-0" />
                          )}
                          <p className="font-medium text-zinc-900">{product.name}</p>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-zinc-600">
                        {factory?.companyName ?? "—"}
                      </td>
                      <td className="px-3 py-3 text-zinc-600">{product.category}</td>
                      <td className="px-3 py-3">
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-medium">
                          {formatMOQ(product.moq)}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-zinc-700">
                        {getPriceRange(product.priceTiers)}
                      </td>
                      <td className="px-3 py-3">
                        <StatusBadge status={product.status} />
                      </td>
                      <td className="px-6 py-3">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/products/${product.id}`}>
                            <ExternalLink className="h-3.5 w-3.5" />
                            Review
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-zinc-400 text-sm">No products match your filter</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
