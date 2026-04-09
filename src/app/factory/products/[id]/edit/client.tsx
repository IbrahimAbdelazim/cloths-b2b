"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatMOQ, formatCurrency } from "@/lib/utils";
import { getProductById } from "@/data/products";

export default function EditProductClient({ id }: { id: string }) {
  const product = getProductById(id);
  const [submitted, setSubmitted] = useState(false);

  if (!product) {
    return <div className="text-center py-20 text-zinc-400">Product not found</div>;
  }

  function handleSubmitForReview() {
    toast.success(`"${product!.name}" submitted for admin review`);
    setSubmitted(true);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/factory/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-zinc-900">{product.name}</h1>
          <p className="text-sm text-zinc-500">Edit product</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <StatusBadge status={submitted ? "PENDING_APPROVAL" : product.status} />
          {(product.status === "DRAFT" || product.status === "REJECTED") && !submitted && (
            <Button size="sm" onClick={handleSubmitForReview} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Send className="h-3.5 w-3.5" />
              Submit for Review
            </Button>
          )}
        </div>
      </div>

      {product.status === "REJECTED" && product.rejectionReason && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
          <p className="text-sm font-medium text-rose-800">Rejection Reason</p>
          <p className="text-sm text-rose-600 mt-1">{product.rejectionReason}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-sm">Details</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Category", value: product.category },
              { label: "MOQ", value: formatMOQ(product.moq) },
              { label: "Materials", value: product.materials || "—" },
              { label: "Lead Time", value: `${product.leadTimeDays} days` },
              { label: "Origin", value: product.countryOfOrigin || "—" },
            ].map((pair) => (
              <div key={pair.label} className="flex justify-between text-sm">
                <span className="text-zinc-500">{pair.label}</span>
                <span className="text-zinc-900 font-medium">{pair.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Pricing</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left py-1.5 text-xs font-medium text-zinc-500">Qty Range</th>
                  <th className="text-right py-1.5 text-xs font-medium text-zinc-500">Price/Unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {product.priceTiers.map((tier, i) => (
                  <tr key={i}>
                    <td className="py-2 text-zinc-600">{tier.minQty}–{tier.maxQty ?? "∞"} units</td>
                    <td className="py-2 text-right font-semibold text-emerald-700">{formatCurrency(tier.pricePerUnit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Variants ({product.variants.length})</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left py-2 text-xs font-medium text-zinc-500">Size</th>
                <th className="text-left py-2 text-xs font-medium text-zinc-500">Color</th>
                <th className="text-left py-2 text-xs font-medium text-zinc-500">SKU</th>
                <th className="text-right py-2 text-xs font-medium text-zinc-500">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {product.variants.map((v) => (
                <tr key={v.id}>
                  <td className="py-2 font-medium text-zinc-900">{v.size}</td>
                  <td className="py-2 text-zinc-600">
                    <div className="flex items-center gap-2">
                      <div className="h-3.5 w-3.5 rounded-full border border-zinc-200" style={{ backgroundColor: v.colorHex }} />
                      {v.color}
                    </div>
                  </td>
                  <td className="py-2 font-mono text-xs text-zinc-400">{v.sku}</td>
                  <td className="py-2 text-right text-zinc-700">{v.stock.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
