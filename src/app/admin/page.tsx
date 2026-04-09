"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Package,
  ShoppingBag,
  DollarSign,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency } from "@/lib/utils";
import { factories as initialFactories } from "@/data/factories";
import { products as initialProducts } from "@/data/products";
import { orders } from "@/data/orders";

export default function AdminDashboard() {
  const [factories, setFactories] = useState(initialFactories);
  const [products, setProducts] = useState(initialProducts);

  const pendingFactories = factories.filter((f) => f.status === "PENDING");
  const pendingProducts = products.filter((p) => p.status === "PENDING_APPROVAL");
  const totalOrders = orders.length;
  const gmv = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  function approveFactory(id: string) {
    setFactories((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "APPROVED" as const, verifiedAt: new Date().toISOString() } : f
      )
    );
    toast.success("Factory approved successfully");
  }

  function rejectFactory(id: string) {
    setFactories((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "REJECTED" as const, rejectionReason: "Does not meet requirements" } : f
      )
    );
    toast.error("Factory rejected");
  }

  function approveProduct(id: string) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "APPROVED" as const, approvedAt: new Date().toISOString() } : p
      )
    );
    toast.success("Product approved");
  }

  function rejectProduct(id: string) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "REJECTED" as const, rejectionReason: "Does not meet standards" } : p
      )
    );
    toast.error("Product rejected");
  }

  const stats = [
    {
      label: "Pending Factories",
      value: pendingFactories.length,
      icon: Building2,
      color: "text-amber-500",
      bg: "bg-amber-50",
      urgent: pendingFactories.length > 0,
    },
    {
      label: "Products to Review",
      value: pendingProducts.length,
      icon: Package,
      color: "text-amber-500",
      bg: "bg-amber-50",
      urgent: pendingProducts.length > 0,
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      urgent: false,
    },
    {
      label: "Platform GMV",
      value: formatCurrency(gmv),
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      urgent: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Overview</h1>
        <p className="text-sm text-zinc-500 mt-1">Platform summary and pending actions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className={stat.urgent ? "border-amber-200" : ""}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-zinc-900 mt-1">{stat.value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Factories */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Factory Applications</CardTitle>
              <Link href="/admin/factories" className="text-xs text-violet-600 hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {pendingFactories.length === 0 ? (
              <div className="px-6 pb-6 text-center text-sm text-zinc-400">
                No pending applications
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {pendingFactories.slice(0, 4).map((factory) => (
                  <div key={factory.id} className="flex items-center gap-3 px-6 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 truncate">
                        {factory.companyName}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {factory.city}, {factory.country}
                      </p>
                    </div>
                    <StatusBadge status={factory.status} />
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="success"
                        className="h-7 px-2 text-xs"
                        onClick={() => approveFactory(factory.id)}
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 px-2 text-xs"
                        onClick={() => rejectFactory(factory.id)}
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Products */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Products Pending Approval</CardTitle>
              <Link href="/admin/products" className="text-xs text-violet-600 hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {pendingProducts.length === 0 ? (
              <div className="px-6 pb-6 text-center text-sm text-zinc-400">
                No pending products
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {pendingProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 px-6 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-zinc-500">{product.category}</p>
                    </div>
                    <StatusBadge status={product.status} />
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="success"
                        className="h-7 px-2 text-xs"
                        onClick={() => approveProduct(product.id)}
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 px-2 text-xs"
                        onClick={() => rejectProduct(product.id)}
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent Orders</CardTitle>
            <Link href="/admin/orders" className="text-xs text-violet-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left px-6 py-2 text-xs font-medium text-zinc-500">Order</th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-zinc-500">Store</th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-zinc-500">Factory</th>
                  <th className="text-right px-3 py-2 text-xs font-medium text-zinc-500">Total</th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-zinc-500">Status</th>
                  <th className="text-left px-6 py-2 text-xs font-medium text-zinc-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-3 font-mono text-xs text-zinc-700">{order.orderNumber}</td>
                    <td className="px-3 py-3 text-zinc-700">{order.customerStore}</td>
                    <td className="px-3 py-3 text-zinc-500">{order.factoryName}</td>
                    <td className="px-3 py-3 text-right font-medium text-zinc-900">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-3 text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
