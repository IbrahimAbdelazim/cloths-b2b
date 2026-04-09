"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency } from "@/lib/utils";
import { getOrderById } from "@/data/orders";
import type { OrderStatus } from "@/types";

const STATUS_STEPS: { status: OrderStatus; label: string }[] = [
  { status: "PENDING", label: "Placed" },
  { status: "CONFIRMED", label: "Confirmed" },
  { status: "PROCESSING", label: "Processing" },
  { status: "SHIPPED", label: "Shipped" },
  { status: "DELIVERED", label: "Delivered" },
];

const STATUS_ORDER: Record<OrderStatus, number> = {
  PENDING: 0,
  CONFIRMED: 1,
  PROCESSING: 2,
  SHIPPED: 3,
  DELIVERED: 4,
  CANCELLED: -1,
};

function StatusStepper({ currentStatus }: { currentStatus: OrderStatus }) {
  const currentIndex = STATUS_ORDER[currentStatus];
  const isCancelled = currentStatus === "CANCELLED";

  if (isCancelled) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 bg-rose-50 border border-rose-100 rounded-lg">
        <span className="h-2 w-2 rounded-full bg-rose-500" />
        <span className="text-sm font-medium text-rose-700">Order Cancelled</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Track line */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-zinc-100 mx-8" />
      <div
        className="absolute top-4 left-0 h-0.5 bg-indigo-500 mx-8 transition-all duration-500"
        style={{
          width: `calc(${(currentIndex / (STATUS_STEPS.length - 1)) * 100}% - 0%)`,
          right: "auto",
        }}
      />

      <div className="relative flex justify-between">
        {STATUS_STEPS.map((step, i) => {
          const isDone = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isFuture = i > currentIndex;

          return (
            <div key={step.status} className="flex flex-col items-center gap-2 w-16">
              <div
                className={`relative z-10 h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  isDone
                    ? "bg-indigo-600 border-indigo-600"
                    : isCurrent
                    ? "bg-white border-indigo-600 shadow-md shadow-indigo-100"
                    : "bg-white border-zinc-200"
                }`}
              >
                {isDone ? (
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : isCurrent ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-zinc-200" />
                )}
              </div>
              <span
                className={`text-xs text-center leading-tight ${
                  isDone || isCurrent ? "text-indigo-700 font-medium" : "text-zinc-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function StoreOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="text-center py-20 text-zinc-400">Order not found</div>
    );
  }

  const placedDate = new Date(order.createdAt);
  const shippedDate = order.shippedAt ? new Date(order.shippedAt) : null;
  const deliveredDate = order.deliveredAt ? new Date(order.deliveredAt) : null;
  const eta = order.estimatedDelivery ? new Date(order.estimatedDelivery) : null;

  const dateForStatus: Partial<Record<OrderStatus, Date | null>> = {
    PENDING: placedDate,
    CONFIRMED: placedDate,
    PROCESSING: placedDate,
    SHIPPED: shippedDate,
    DELIVERED: deliveredDate,
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/store/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="font-mono text-xl font-bold text-zinc-900">
            {order.orderNumber}
          </h1>
          <p className="text-sm text-zinc-500">
            {order.factoryName} ·{" "}
            {placedDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={order.status} className="text-sm px-3 py-1" />
        </div>
      </div>

      {/* Status stepper */}
      <Card>
        <CardContent className="p-6">
          <StatusStepper currentStatus={order.status} />

          {/* Timeline dates */}
          {order.status !== "CANCELLED" && (
            <div className="mt-6 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-24 text-xs text-zinc-400 font-medium">Placed</span>
                <span className="text-zinc-600">
                  {placedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              {shippedDate && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-24 text-xs text-zinc-400 font-medium">Shipped</span>
                  <span className="text-zinc-600">
                    {shippedDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {deliveredDate ? (
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-24 text-xs text-zinc-400 font-medium">Delivered</span>
                  <span className="text-zinc-600">
                    {deliveredDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ) : eta ? (
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-24 text-xs text-zinc-400 font-medium">Est. Arrival</span>
                  <span className="text-zinc-600">
                    {eta.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ) : null}
            </div>
          )}

          {/* Tracking info */}
          {order.trackingNumber && (
            <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-500 font-medium mb-0.5">
                  {order.shippingCarrier}
                </p>
                <p className="font-mono text-sm font-semibold text-indigo-700">
                  {order.trackingNumber}
                </p>
              </div>
              <Button variant="outline" size="sm" className="text-xs border-indigo-200 text-indigo-600 hover:bg-indigo-100">
                <ExternalLink className="h-3 w-3 mr-1" />
                Track
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                Order Items ({order.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-50">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 px-6 py-4">
                    {item.imageUrl ? (
                      <div className="relative h-16 w-16 rounded-md overflow-hidden border border-zinc-100 shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 rounded-md bg-zinc-100 flex items-center justify-center shrink-0">
                        <Package className="h-6 w-6 text-zinc-300" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-zinc-900 text-sm">
                        {item.productName}
                      </p>
                      <p className="text-sm text-zinc-500">{item.variantDesc}</p>
                      <p className="text-xs text-zinc-400 mt-1">
                        {item.quantity.toLocaleString()} units ×{" "}
                        {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                    <p className="font-semibold text-zinc-900 shrink-0">
                      {formatCurrency(item.lineTotal)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-zinc-100 space-y-1.5">
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>Shipping</span>
                  <span>{formatCurrency(order.shippingCost)}</span>
                </div>
                <div className="flex justify-between font-semibold text-zinc-900 pt-1 border-t border-zinc-100">
                  <span>Total</span>
                  <span>{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4 text-zinc-400" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-600 space-y-0.5">
              <p className="font-medium text-zinc-900">{order.customerStore}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </CardContent>
          </Card>

          {order.buyerNote && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Your Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 italic">
                  &ldquo;{order.buyerNote}&rdquo;
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
