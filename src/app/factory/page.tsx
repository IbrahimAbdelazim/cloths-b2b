"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, ShoppingBag, CheckCircle, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency } from "@/lib/utils";
import { getProductsByFactory } from "@/data/products";
import { getOrdersByFactory } from "@/data/orders";

export default function FactoryDashboard() {
  const [factoryId, setFactoryId] = useState("factory-1");

  useEffect(() => {
    const id = localStorage.getItem("demo_factory_id");
    if (id) setFactoryId(id);
  }, []);

  const products = getProductsByFactory(factoryId);
  const orders = getOrdersByFactory(factoryId);

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    {
      label: "Approved Products",
      value: products.filter((p) => p.status === "APPROVED").length,
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Pending Review",
      value: products.filter((p) => p.status === "PENDING_APPROVAL").length,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
    },
  ];

  const revenue = orders.reduce((sum, o) => sum + o.subtotal, 0);

  // Simulate recent chart data
  const chartBars = [45, 60, 38, 72, 55, 80, 68, 90, 75, 88, 92, 78].map((h) => h);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">Factory performance overview</p>
        </div>
        <Button asChild>
          <Link href="/factory/products/new">+ New Product</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500">{s.label}</p>
                  <p className="text-2xl font-bold text-zinc-900 mt-1">{s.value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg}`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue bar chart (visual only) */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Revenue — Last 12 Months
            </CardTitle>
            <p className="text-2xl font-bold text-zinc-900">{formatCurrency(revenue)}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1 h-32">
            {chartBars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-blue-100 hover:bg-blue-400 transition-colors"
                style={{ height: `${h}%` }}
                title={`Month ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-zinc-400 mt-2">
            <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
            <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Orders</CardTitle>
              <Link href="/factory/orders" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {orders.length === 0 ? (
              <p className="px-6 pb-6 text-sm text-zinc-400">No orders yet</p>
            ) : (
              <div className="divide-y divide-zinc-50">
                {orders.slice(0, 4).map((order) => (
                  <div key={order.id} className="flex items-center gap-3 px-6 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 truncate">{order.customerStore}</p>
                      <p className="text-xs text-zinc-500 font-mono">{order.orderNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-zinc-900">{formatCurrency(order.subtotal)}</p>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Products needing attention */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Products</CardTitle>
              <Link href="/factory/products" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-50">
              {products.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center gap-3 px-6 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 truncate">{p.name}</p>
                    <p className="text-xs text-zinc-500">{p.category}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
