"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BadgeCheck, ShoppingCart, AlertTriangle, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, getPriceTierForQty, formatMOQ } from "@/lib/utils";
import { getProductById } from "@/data/products";
import { getFactoryById } from "@/data/factories";
import { useCart } from "@/hooks/use-cart";

export default function StoreProductDetailClient({ id }: { id: string }) {
  const product = getProductById(id);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(product?.moq ?? 50);
  const [mainImage, setMainImage] = useState(0);

  if (!product) {
    return <div className="text-center py-20 text-zinc-400">Product not found</div>;
  }

  const factory = getFactoryById(product.factoryId);
  const uniqueColors = [...new Set(product.variants.map((v) => v.color))];
  const uniqueSizes = [...new Set(product.variants.map((v) => v.size))];
  const selectedVariant = product.variants.find((v) => v.size === selectedSize && v.color === selectedColor);
  const activeTier = getPriceTierForQty(product.priceTiers, quantity);
  const unitPrice = activeTier?.pricePerUnit ?? 0;
  const lineTotal = unitPrice * quantity;
  const moqMet = quantity >= product.moq;
  const sortedTiers = [...product.priceTiers].sort((a, b) => a.minQty - b.minQty);

  function handleAddToCart() {
    if (!selectedVariant) { toast.error("Please select a size and color"); return; }
    if (!moqMet) { toast.error(`Minimum order is ${product!.moq} units`); return; }
    addItem({
      productId: product!.id, variantId: selectedVariant.id, productName: product!.name,
      factoryId: product!.factoryId, factoryName: factory?.companyName ?? "Unknown Factory",
      quantity, pricePerUnit: unitPrice, moq: product!.moq,
      imageUrl: product!.images[0]?.url, size: selectedVariant.size,
      color: selectedVariant.color, colorHex: selectedVariant.colorHex,
    });
    toast.success(`Added ${quantity} units to cart`);
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/store"><ArrowLeft className="h-4 w-4" />Back to Catalog</Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {product.images.length > 0 ? (
            <div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100">
                <Image src={product.images[mainImage]?.url ?? ""} alt={product.images[mainImage]?.altText ?? product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {product.images.map((img, i) => (
                    <button key={img.id} onClick={() => setMainImage(i)} className={`relative h-16 w-16 rounded-lg overflow-hidden border-2 transition-colors ${i === mainImage ? "border-indigo-500" : "border-zinc-200"}`}>
                      <Image src={img.url} alt={img.altText} fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-square rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-300">No image</div>
          )}

          <Card>
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold text-zinc-900 text-sm">Product Specs</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Materials", value: product.materials || "—" },
                  { label: "MOQ", value: formatMOQ(product.moq) },
                  { label: "Lead Time", value: product.leadTimeDays ? `${product.leadTimeDays} days` : "—" },
                  { label: "Country of Origin", value: product.countryOfOrigin || "—" },
                  { label: "Sample", value: product.sampleAvailable ? `Yes — ${formatCurrency(product.samplePrice ?? 0)}` : "Not available" },
                ].map((pair) => (
                  <div key={pair.label}>
                    <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-0.5">{pair.label}</p>
                    <p className="text-zinc-800">{pair.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {factory && (
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-zinc-900 text-sm">Factory</h3>
                  <span className="flex items-center gap-1 text-xs text-emerald-600"><BadgeCheck className="h-3.5 w-3.5" />Verified</span>
                </div>
                <p className="font-medium text-zinc-900">{factory.companyName}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{factory.city}, {factory.country} · {factory.yearsInBusiness} yrs · {factory.employeeCount} employees</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {factory.certifications.slice(0, 3).map((cert) => (
                    <span key={cert} className="text-xs bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">{cert}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <div className="sticky top-20 space-y-4">
            <div>
              <p className="text-xs text-zinc-400 font-medium mb-0.5">{factory?.companyName}</p>
              <h1 className="text-2xl font-bold text-zinc-900">{product.name}</h1>
              <p className="text-sm text-zinc-500 mt-1">{product.category}</p>
            </div>
            {product.description && <p className="text-sm text-zinc-600 leading-relaxed">{product.description}</p>}

            <Card>
              <CardContent className="p-4">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Price Tiers</p>
                <div className="space-y-2">
                  {sortedTiers.map((tier, i) => {
                    const isActive = activeTier?.minQty === tier.minQty && activeTier?.maxQty === tier.maxQty;
                    return (
                      <div key={i} className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? "bg-indigo-50 border border-indigo-200" : "bg-zinc-50"}`}>
                        <span className={isActive ? "text-indigo-700 font-medium" : "text-zinc-600"}>{tier.minQty}{tier.maxQty ? `–${tier.maxQty}` : "+"} units</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${isActive ? "text-indigo-700" : "text-emerald-700"}`}>{formatCurrency(tier.pricePerUnit)}/unit</span>
                          {isActive && <Check className="h-4 w-4 text-indigo-500" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <p className="text-sm font-medium text-zinc-700">Color</p>
              <div className="flex flex-wrap gap-2">
                {uniqueColors.map((color) => {
                  const variant = product.variants.find((v) => v.color === color);
                  return (
                    <button key={color} onClick={() => setSelectedColor(color)} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${selectedColor === color ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-zinc-200 text-zinc-700 hover:border-zinc-300"}`}>
                      <div className="h-4 w-4 rounded-full border border-zinc-300" style={{ backgroundColor: variant?.colorHex }} />
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-zinc-700">Size</p>
              <div className="flex flex-wrap gap-2">
                {uniqueSizes.map((size) => {
                  const variant = product.variants.find((v) => v.size === size && (selectedColor ? v.color === selectedColor : true));
                  const outOfStock = variant && variant.stock === 0;
                  return (
                    <button key={size} onClick={() => !outOfStock && setSelectedSize(size)} disabled={!!outOfStock} className={`h-10 min-w-10 px-3 rounded-lg border text-sm font-medium transition-colors ${selectedSize === size ? "bg-indigo-600 border-indigo-600 text-white" : outOfStock ? "border-zinc-100 text-zinc-300 cursor-not-allowed" : "border-zinc-200 text-zinc-700 hover:border-indigo-300"}`}>
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-700">Quantity</p>
                <p className="text-xs text-zinc-400">Min. {product.moq} units</p>
              </div>
              <Input type="number" value={quantity} min={product.moq} step={product.moq} onChange={(e) => setQuantity(Number(e.target.value))} className="max-w-32" />
              {!moqMet && quantity > 0 && (
                <p className="text-xs text-rose-500 flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" />Minimum order is {product.moq} units</p>
              )}
            </div>

            <div className="rounded-xl border border-zinc-200 p-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-zinc-500">Unit price</span><span className="font-medium text-zinc-900">{formatCurrency(unitPrice)}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500 text-sm">{quantity.toLocaleString()} units</span><span className="text-xl font-bold text-zinc-900">{formatCurrency(lineTotal)}</span></div>
            </div>

            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11" disabled={!moqMet || !selectedVariant} onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />Add to Cart
            </Button>
            {!selectedVariant && <p className="text-xs text-center text-zinc-400">Select a size and color to add to cart</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
