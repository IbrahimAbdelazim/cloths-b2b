"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Package,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { getProductById } from "@/data/products";
import { getPriceTierForQty } from "@/lib/utils";

function CartLineItem({
  item,
  onRemove,
  onQtyChange,
}: {
  item: import("@/types").CartItem;
  onRemove: (variantId: string) => void;
  onQtyChange: (variantId: string, qty: number) => void;
}) {
  const product = getProductById(item.productId);
  const activeTier = product
    ? getPriceTierForQty(product.priceTiers, item.quantity)
    : null;
  const unitPrice = activeTier?.pricePerUnit ?? item.pricePerUnit;
  const lineTotal = unitPrice * item.quantity;
  const moqMet = item.quantity >= item.moq;

  return (
    <div className="flex items-start gap-4 py-4">
      {item.imageUrl ? (
        <div className="relative h-16 w-16 rounded-lg overflow-hidden border border-zinc-100 shrink-0">
          <Image
            src={item.imageUrl}
            alt={item.productName}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      ) : (
        <div className="h-16 w-16 rounded-lg bg-zinc-100 shrink-0 flex items-center justify-center text-zinc-300">
          <Package className="h-6 w-6" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="font-medium text-zinc-900 text-sm">{item.productName}</p>
        <div className="flex items-center gap-1 mt-0.5">
          {item.colorHex && (
            <span
              className="inline-block h-3 w-3 rounded-full border border-zinc-300"
              style={{ backgroundColor: item.colorHex }}
            />
          )}
          <p className="text-xs text-zinc-500">
            {item.size} / {item.color}
          </p>
        </div>
        <p className="text-xs text-zinc-400 mt-0.5">
          {formatCurrency(unitPrice)}/unit
        </p>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <Input
              type="number"
              value={item.quantity}
              min={item.moq}
              step={item.moq}
              onChange={(e) => onQtyChange(item.variantId, Number(e.target.value))}
              className="h-8 w-24 text-sm"
            />
            <span className="text-xs text-zinc-400">units</span>
          </div>
          <button
            onClick={() => onRemove(item.variantId)}
            className="text-zinc-300 hover:text-rose-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {!moqMet && item.quantity > 0 && (
          <p className="text-xs text-rose-500 flex items-center gap-1 mt-1.5">
            <AlertTriangle className="h-3 w-3" />
            Min. {item.moq} units required
          </p>
        )}
      </div>

      <div className="text-right shrink-0">
        <p className="font-semibold text-zinc-900">{formatCurrency(lineTotal)}</p>
        {moqMet ? (
          <p className="text-xs text-emerald-600 flex items-center gap-0.5 justify-end mt-0.5">
            <CheckCircle className="h-3 w-3" />
            MOQ met
          </p>
        ) : (
          <p className="text-xs text-rose-400 mt-0.5">MOQ not met</p>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, getItemsByFactory, validateMOQ, clearCart } =
    useCart();
  const [placedFactories, setPlacedFactories] = useState<Set<string>>(new Set());

  const itemsByFactory = getItemsByFactory();
  const { violations } = validateMOQ();

  const factoryIds = Object.keys(itemsByFactory);

  function getFactorySubtotal(factoryItems: import("@/types").CartItem[]) {
    return factoryItems.reduce((sum, item) => {
      const product = getProductById(item.productId);
      const tier = product
        ? getPriceTierForQty(product.priceTiers, item.quantity)
        : null;
      const price = tier?.pricePerUnit ?? item.pricePerUnit;
      return sum + price * item.quantity;
    }, 0);
  }

  function hasFactoryViolations(factoryItems: import("@/types").CartItem[]) {
    return factoryItems.some((item) => item.quantity < item.moq);
  }

  function handlePlaceOrder(factoryId: string) {
    const factoryItems = itemsByFactory[factoryId];
    if (hasFactoryViolations(factoryItems)) {
      toast.error("Fix MOQ violations before placing the order");
      return;
    }
    setPlacedFactories((prev) => new Set([...prev, factoryId]));
    toast.success("Order placed! You'll receive a confirmation shortly.");
  }

  const totalGMV = factoryIds.reduce(
    (sum, fId) => sum + getFactorySubtotal(itemsByFactory[fId]),
    0
  );

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="h-16 w-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
          <ShoppingCart className="h-7 w-7 text-zinc-300" />
        </div>
        <h2 className="text-lg font-semibold text-zinc-900 mb-1">Your cart is empty</h2>
        <p className="text-sm text-zinc-500 mb-6">Browse the catalog to add products</p>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Link href="/store">Browse Catalog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Cart</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {items.length} item{items.length !== 1 ? "s" : ""} from {factoryIds.length}{" "}
            {factoryIds.length !== 1 ? "factories" : "factory"}
          </p>
        </div>
        {violations.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {violations.length} MOQ violation{violations.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Items grouped by factory */}
        <div className="lg:col-span-2 space-y-4">
          {factoryIds.map((factoryId) => {
            const factoryItems = itemsByFactory[factoryId];
            const factoryName = factoryItems[0].factoryName;
            const subtotal = getFactorySubtotal(factoryItems);
            const hasViolations = hasFactoryViolations(factoryItems);
            const isPlaced = placedFactories.has(factoryId);

            return (
              <Card key={factoryId} className={isPlaced ? "opacity-60" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-zinc-900">
                      {factoryName}
                      <span className="ml-2 font-normal text-zinc-400">
                        ({factoryItems.length} item{factoryItems.length !== 1 ? "s" : ""})
                      </span>
                    </CardTitle>
                    {isPlaced ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Order Placed
                      </span>
                    ) : hasViolations ? (
                      <span className="flex items-center gap-1 text-xs text-rose-500">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        MOQ issues
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-emerald-600">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Ready to order
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="divide-y divide-zinc-50">
                    {factoryItems.map((item) => (
                      <CartLineItem
                        key={item.variantId}
                        item={item}
                        onRemove={removeItem}
                        onQtyChange={updateQuantity}
                      />
                    ))}
                  </div>
                  <div className="border-t border-zinc-100 pt-4 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-zinc-500">Factory subtotal</span>
                      <span className="ml-2 font-semibold text-zinc-900">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                    {!isPlaced && (
                      <Button
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        disabled={hasViolations}
                        onClick={() => handlePlaceOrder(factoryId)}
                      >
                        Place Order
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Right: Summary */}
        <div>
          <div className="sticky top-20 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {factoryIds.map((factoryId) => {
                  const factoryItems = itemsByFactory[factoryId];
                  const name = factoryItems[0].factoryName;
                  const sub = getFactorySubtotal(factoryItems);
                  return (
                    <div key={factoryId} className="flex justify-between text-sm">
                      <span className="text-zinc-500 truncate mr-2">{name}</span>
                      <span className="text-zinc-900 font-medium shrink-0">
                        {formatCurrency(sub)}
                      </span>
                    </div>
                  );
                })}
                <div className="border-t border-zinc-100 pt-3 flex justify-between">
                  <span className="text-zinc-500 text-sm">Shipping</span>
                  <span className="text-sm text-zinc-400">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-zinc-900">Total</span>
                  <span className="font-bold text-zinc-900 text-lg">
                    {formatCurrency(totalGMV)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <p className="text-xs text-center text-zinc-400">
              Orders are placed per factory. All prices in USD.
            </p>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-zinc-500 hover:text-rose-600 hover:border-rose-200"
              onClick={() => {
                clearCart();
                setPlacedFactories(new Set());
                toast.success("Cart cleared");
              }}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
