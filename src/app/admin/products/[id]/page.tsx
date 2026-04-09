"use client";
import { useState } from "react";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Package,
  ShieldCheck,
  ShieldX,
  Tag,
  Clock,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency, formatMOQ } from "@/lib/utils";
import { getProductById } from "@/data/products";
import { getFactoryById } from "@/data/factories";

export default function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(id);
  const [status, setStatus] = useState(product?.status ?? "PENDING_APPROVAL");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return <div className="text-center py-20 text-zinc-400">Product not found</div>;
  }

  const factory = getFactoryById(product.factoryId);

  function handleApprove() {
    setStatus("APPROVED");
    toast.success(`"${product!.name}" approved and published`);
  }

  function handleReject() {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    setStatus("REJECTED");
    setShowRejectForm(false);
    toast.error(`"${product!.name}" rejected`);
  }

  const uniqueColors = [...new Set(product.variants.map((v) => v.color))];
  const uniqueSizes = [...new Set(product.variants.map((v) => v.size))];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">{product.name}</h1>
          <p className="text-sm text-zinc-500">Product review</p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={status} className="text-sm px-3 py-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Images */}
          {product.images.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-zinc-50 mb-3">
                  <Image
                    src={product.images[selectedImage]?.url ?? ""}
                    alt={product.images[selectedImage]?.altText ?? product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-2">
                    {product.images.map((img, i) => (
                      <button
                        key={img.id}
                        onClick={() => setSelectedImage(i)}
                        className={`relative h-16 w-16 rounded-md overflow-hidden border-2 transition-colors ${
                          i === selectedImage ? "border-violet-500" : "border-zinc-200"
                        }`}
                      >
                        <Image src={img.url} alt={img.altText} fill className="object-cover" sizes="64px" />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Product details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4 text-violet-500" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-zinc-600 leading-relaxed">{product.description}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Category", value: product.category },
                  { label: "Materials", value: product.materials || "—" },
                  { label: "Country of Origin", value: product.countryOfOrigin || "—" },
                  { label: "Lead Time", value: product.leadTimeDays ? `${product.leadTimeDays} days` : "—" },
                  { label: "Sample Available", value: product.sampleAvailable ? `Yes — ${formatCurrency(product.samplePrice ?? 0)}` : "No" },
                  { label: "MOQ", value: formatMOQ(product.moq) },
                ].map((pair) => (
                  <div key={pair.label}>
                    <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide">{pair.label}</p>
                    <p className="text-sm text-zinc-900 mt-0.5">{pair.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price tiers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4 text-violet-500" />
                Price Tiers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="text-left py-2 text-xs font-medium text-zinc-500">Min Qty</th>
                    <th className="text-left py-2 text-xs font-medium text-zinc-500">Max Qty</th>
                    <th className="text-right py-2 text-xs font-medium text-zinc-500">Price / Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {product.priceTiers.map((tier, i) => (
                    <tr key={i}>
                      <td className="py-2 text-zinc-700">{tier.minQty} units</td>
                      <td className="py-2 text-zinc-500">{tier.maxQty ? `${tier.maxQty} units` : "Unlimited"}</td>
                      <td className="py-2 text-right font-semibold text-emerald-700">
                        {formatCurrency(tier.pricePerUnit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Layers className="h-4 w-4 text-violet-500" />
                Variants ({product.variants.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-zinc-100">
                      <th className="text-left py-2 font-medium text-zinc-500">Size</th>
                      <th className="text-left py-2 font-medium text-zinc-500">Color</th>
                      <th className="text-left py-2 font-medium text-zinc-500">SKU</th>
                      <th className="text-right py-2 font-medium text-zinc-500">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {product.variants.map((v) => (
                      <tr key={v.id}>
                        <td className="py-2 text-zinc-700 font-medium">{v.size}</td>
                        <td className="py-2 text-zinc-600">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-3.5 w-3.5 rounded-full border border-zinc-200"
                              style={{ backgroundColor: v.colorHex }}
                            />
                            {v.color}
                          </div>
                        </td>
                        <td className="py-2 text-zinc-400 font-mono">{v.sku}</td>
                        <td className="py-2 text-right text-zinc-700">{v.stock.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Review Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Status</span>
                <StatusBadge status={status} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Submitted</span>
                <span className="text-zinc-700">{new Date(product.createdAt).toLocaleDateString()}</span>
              </div>

              {status === "PENDING_APPROVAL" && (
                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={handleApprove}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Approve Product
                  </Button>
                  {!showRejectForm ? (
                    <Button
                      variant="outline"
                      className="w-full text-rose-600 border-rose-200 hover:bg-rose-50"
                      onClick={() => setShowRejectForm(true)}
                    >
                      <ShieldX className="h-4 w-4" />
                      Reject
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Rejection reason…"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="text-sm resize-none"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button variant="destructive" className="flex-1 text-xs h-8" onClick={handleReject}>
                          Confirm
                        </Button>
                        <Button variant="outline" className="flex-1 text-xs h-8" onClick={() => setShowRejectForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {status === "APPROVED" && (
                <div className="pt-2 border-t border-zinc-100 text-sm text-emerald-600 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Product is live
                </div>
              )}
              {status === "REJECTED" && (
                <div className="pt-2 border-t border-zinc-100">
                  <p className="text-xs text-rose-600">Rejected.</p>
                  {rejectionReason && <p className="text-xs text-zinc-500 mt-1">{rejectionReason}</p>}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Factory info */}
          {factory && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Factory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-900">{factory.companyName}</p>
                  <StatusBadge status={factory.status} />
                </div>
                <p className="text-xs text-zinc-500">{factory.city}, {factory.country}</p>
                <Link
                  href={`/admin/factories/${factory.id}`}
                  className="text-xs text-violet-600 hover:underline flex items-center gap-1"
                >
                  View factory profile
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {product.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
