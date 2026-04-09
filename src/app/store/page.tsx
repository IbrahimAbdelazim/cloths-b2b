"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatMOQ, getPriceRange } from "@/lib/utils";
import { getApprovedProducts, productCategories } from "@/data/products";
import { getFactoryById } from "@/data/factories";

const allProducts = getApprovedProducts();

export default function StoreCatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("newest");
  const [moqFilter, setMoqFilter] = useState("ALL");

  const filtered = useMemo(() => {
    let result = allProducts;
    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()) ||
          p.materials?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "ALL") {
      result = result.filter((p) => p.category === category);
    }
    if (moqFilter === "0-100") result = result.filter((p) => p.moq <= 100);
    else if (moqFilter === "100-300") result = result.filter((p) => p.moq > 100 && p.moq <= 300);
    else if (moqFilter === "300+") result = result.filter((p) => p.moq > 300);

    if (sort === "price_asc") {
      result = [...result].sort((a, b) => {
        const aMin = Math.min(...a.priceTiers.map((t) => t.pricePerUnit));
        const bMin = Math.min(...b.priceTiers.map((t) => t.pricePerUnit));
        return aMin - bMin;
      });
    } else if (sort === "moq_asc") {
      result = [...result].sort((a, b) => a.moq - b.moq);
    }
    return result;
  }, [search, category, sort, moqFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Product Catalog</h1>
        <p className="text-sm text-zinc-500 mt-1">
          {allProducts.length} verified products from top factories
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search products, materials, categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-44">
            <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Categories</SelectItem>
            {productCategories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={moqFilter} onValueChange={setMoqFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="MOQ Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Any MOQ</SelectItem>
            <SelectItem value="0-100">≤ 100 units</SelectItem>
            <SelectItem value="100-300">100–300 units</SelectItem>
            <SelectItem value="300+">300+ units</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="moq_asc">MOQ: Low First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      <div>
        <p className="text-sm text-zinc-500 mb-4">{filtered.length} products</p>
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-20 text-center text-zinc-400 text-sm">
              No products match your filters
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product) => {
              const factory = getFactoryById(product.factoryId);
              const img = product.images[0];
              const minPrice = Math.min(...product.priceTiers.map((t) => t.pricePerUnit));

              return (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="relative aspect-square bg-zinc-50 overflow-hidden">
                    {img ? (
                      <Image
                        src={img.url}
                        alt={img.altText}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-200">
                        No image
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-zinc-400 font-medium mb-0.5">
                      {factory?.companyName} · {product.countryOfOrigin}
                    </p>
                    <h3 className="font-semibold text-zinc-900 text-sm leading-tight">{product.name}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{product.category}</p>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-medium">
                        {formatMOQ(product.moq)}
                      </span>
                      <div className="text-right">
                        <p className="text-xs text-zinc-400">from</p>
                        <p className="text-sm font-bold text-emerald-700">{formatCurrency(minPrice)}/unit</p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3 text-xs hover:border-indigo-600 hover:text-indigo-700"
                      asChild
                    >
                      <Link href={`/store/products/${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
