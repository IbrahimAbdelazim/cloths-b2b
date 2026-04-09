"use client";
import { useEffect, useState } from "react";
import { User, MapPin, Mail, Store, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrdersByCustomer } from "@/data/orders";
import { formatCurrency } from "@/lib/utils";
import type { Order } from "@/types";

interface CustomerProfile {
  name: string;
  email: string;
  storeName: string;
  city: string;
  country: string;
  storeType: string;
}

export default function StoreAccountPage() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const name = localStorage.getItem("demo_user_name") ?? "James Wilson";
    const customerId = localStorage.getItem("demo_customer_id") ?? "customer-1";
    setProfile({
      name,
      email: "james@citythreads.com",
      storeName: "City Threads Boutique",
      city: "New York",
      country: "United States",
      storeType: "Boutique",
    });
    setOrders(getOrdersByCustomer(customerId));
  }, []);

  if (!profile) return null;

  const totalSpend = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const deliveredOrders = orders.filter((o) => o.status === "DELIVERED").length;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Account</h1>
        <p className="text-sm text-zinc-500 mt-1">Your store profile</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Orders", value: orders.length, icon: ShoppingBag },
          { label: "Completed", value: deliveredOrders, icon: ShoppingBag },
          {
            label: "Total Spend",
            value: formatCurrency(totalSpend),
            icon: ShoppingBag,
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="h-7 w-7 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-zinc-900 text-lg">{profile.name}</p>
              <p className="text-sm text-zinc-500">{profile.storeType} Owner</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-zinc-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-0.5">
                  Email
                </p>
                <p className="text-zinc-900">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Store className="h-4 w-4 text-zinc-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-0.5">
                  Store Name
                </p>
                <p className="text-zinc-900">{profile.storeName}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-zinc-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-0.5">
                  Location
                </p>
                <p className="text-zinc-900">
                  {profile.city}, {profile.country}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Store className="h-4 w-4 text-zinc-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-0.5">
                  Store Type
                </p>
                <p className="text-zinc-900">{profile.storeType}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent orders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {orders.length === 0 ? (
            <p className="text-sm text-zinc-400 px-6 py-4">No orders yet</p>
          ) : (
            <div className="divide-y divide-zinc-50">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between px-6 py-3"
                >
                  <div>
                    <p className="font-mono text-sm font-semibold text-zinc-900">
                      {order.orderNumber}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {order.factoryName} ·{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-zinc-900">
                      {formatCurrency(order.totalAmount)}
                    </p>
                    <span
                      className={`text-xs font-medium ${
                        order.status === "DELIVERED"
                          ? "text-emerald-600"
                          : order.status === "SHIPPED"
                          ? "text-sky-600"
                          : order.status === "PROCESSING"
                          ? "text-purple-600"
                          : "text-zinc-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
