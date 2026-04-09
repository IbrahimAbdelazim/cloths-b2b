"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Truck, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency } from "@/lib/utils";
import { getOrderById } from "@/data/orders";
import type { OrderStatus } from "@/types";

const STATUS_OPTIONS: OrderStatus[] = ["CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function FactoryOrderDetailClient({ id }: { id: string }) {
  const order = getOrderById(id);
  const [status, setStatus] = useState<OrderStatus>(order?.status ?? "PENDING");
  const [tracking, setTracking] = useState(order?.trackingNumber ?? "");
  const [carrier, setCarrier] = useState(order?.shippingCarrier ?? "");

  if (!order) {
    return <div className="text-center py-20 text-zinc-400">Order not found</div>;
  }

  function handleUpdate() {
    toast.success(`Order ${order!.orderNumber} updated to ${status}`);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/factory/orders"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="font-mono text-xl font-bold text-zinc-900">{order.orderNumber}</h1>
          <p className="text-sm text-zinc-500">Placed {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={status} className="text-sm px-3 py-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Order Items</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-50">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 px-6 py-4">
                    {item.imageUrl && (
                      <div className="relative h-16 w-16 rounded-md overflow-hidden border border-zinc-100 shrink-0">
                        <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" sizes="64px" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-zinc-900">{item.productName}</p>
                      <p className="text-sm text-zinc-500">{item.variantDesc}</p>
                      <p className="text-xs text-zinc-400 mt-1">{item.quantity.toLocaleString()} units × {formatCurrency(item.unitPrice)}</p>
                    </div>
                    <p className="font-semibold text-zinc-900 shrink-0">{formatCurrency(item.lineTotal)}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-zinc-100 space-y-1">
                <div className="flex justify-between text-sm text-zinc-500"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
                <div className="flex justify-between text-sm text-zinc-500"><span>Shipping</span><span>{formatCurrency(order.shippingCost)}</span></div>
                <div className="flex justify-between text-sm font-semibold text-zinc-900 pt-1 border-t border-zinc-100"><span>Total</span><span>{formatCurrency(order.totalAmount)}</span></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Buyer Information</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">Store</p>
                <p className="text-zinc-900 font-medium">{order.customerStore}</p>
                <p className="text-zinc-500">{order.customerName}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">Shipping Address</p>
                <p className="text-zinc-700">{order.shippingAddress.street}</p>
                <p className="text-zinc-500">{order.shippingAddress.city}, {order.shippingAddress.country} {order.shippingAddress.postalCode}</p>
              </div>
              {order.buyerNote && (
                <div className="col-span-2">
                  <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">Buyer Note</p>
                  <p className="text-zinc-600">{order.buyerNote}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Truck className="h-4 w-4 text-blue-500" />Fulfillment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Order Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as OrderStatus)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tracking Number</Label>
                <Input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="e.g. DHL-9876543210" />
              </div>
              <div className="space-y-2">
                <Label>Carrier</Label>
                <Input value={carrier} onChange={(e) => setCarrier(e.target.value)} placeholder="e.g. DHL Express" />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleUpdate}>
                <CheckCircle className="h-4 w-4" />Update Fulfillment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
