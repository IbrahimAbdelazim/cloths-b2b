"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STORE_TYPES = ["Boutique", "Chain Store", "Online Retailer", "Department Store", "Multi-brand", "Other"];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "Canada",
  "UAE",
  "Saudi Arabia",
  "Japan",
  "South Korea",
  "Other",
];

export default function CustomerRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
    storeType: "",
    country: "",
    city: "",
  });

  function update(key: string, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit() {
    if (!form.name || !form.email || !form.password || !form.storeName) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("demo_role", "CUSTOMER");
      localStorage.setItem("demo_user_name", form.name);
      localStorage.setItem("demo_customer_id", "customer-1");
      setLoading(false);
      router.push("/store");
    }, 600);
  }

  return (
    <div>
      {/* Logo mobile */}
      <div className="flex items-center gap-2 mb-8 lg:hidden">
        <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center">
          <ShoppingBag className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="font-bold text-zinc-900">ClothsB2B</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Create buyer account</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Browse verified factories and place wholesale orders
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="James Wilson"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="james@mystore.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />
        </div>

        <div className="border-t border-zinc-100 pt-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            Store Details
          </p>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="storeName">Store Name *</Label>
              <Input
                id="storeName"
                placeholder="City Threads Boutique"
                value={form.storeName}
                onChange={(e) => update("storeName", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="storeType">Store Type</Label>
              <select
                id="storeType"
                value={form.storeType}
                onChange={(e) => update("storeType", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">Select type</option>
                {STORE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <select
                  id="country"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="">Select</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 mt-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
          {!loading && <ArrowRight className="h-4 w-4 ml-2" />}
        </Button>

        <p className="text-xs text-center text-zinc-400">
          By creating an account you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

      <p className="text-center text-xs text-zinc-400 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-600 hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
