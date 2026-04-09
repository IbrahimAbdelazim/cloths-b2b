"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency } from "@/lib/utils";
import { getOrdersByCustomer } from "@/data/orders";
import type { Order, OrderStatus } from "@/types";

const STATUS_TABS: { label: string; value: OrderStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
];

export default function StoreOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<OrderStatus | "ALL">("ALL");

  useEffect(() => {
    const customerId = localStorage.getItem("demo_customer_id") ?? "customer-1";
    setOrders(getOrdersByCustomer(customerId));
  }, []);

  const filtered =
    activeTab === "ALL" ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">My Orders</h1>
        <p className="text-sm text-zinc-500 mt-1">{orders.length} total orders</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 border-b border-zinc-200">
        {STATUS_TABS.map((tab) => {
          const count =
            tab.value === "ALL"
              ? orders.length
              : orders.filter((o) => o.status === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.value
                  ? "border-indigo-600 text-indigo-700"
                  : "border-transparent text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.value
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-20 text-center text-zinc-400 text-sm">
            No orders in this status
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <Card key={order.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  {/* Left: thumbnails + info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Image strip */}
                    <div className="flex -space-x-2 shrink-0">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div
                          key={item.id}
                          className="relative h-12 w-12 rounded-md overflow-hidden border-2 border-white"
                          style={{ zIndex: 3 - i }}
                        >
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.productName}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                              <Package className="h-4 w-4 text-zinc-300" />
                            </div>
                          )}
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="relative h-12 w-12 rounded-md border-2 border-white bg-zinc-100 flex items-center justify-center text-xs text-zinc-500 font-medium">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-mono text-sm font-semibold text-zinc-900">
                          {order.orderNumber}
                        </p>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-zinc-500 mt-0.5">{order.factoryName}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""} ·{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>

                      {order.trackingNumber && (
                        <p className="text-xs text-zinc-400 mt-1 font-mono">
                          {order.shippingCarrier} · {order.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: total + action */}
                  <div className="text-right shrink-0">
                    <p className="font-bold text-zinc-900">
                      {formatCurrency(order.totalAmount)}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs hover:border-indigo-600 hover:text-indigo-700"
                      asChild
                    >
                      <Link href={`/store/orders/${order.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
