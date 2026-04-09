"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shirt, ArrowRight, Building2, ShoppingBag, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findUser } from "@/data/users";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function loginAs(role: "ADMIN" | "FACTORY" | "CUSTOMER") {
    const credentials: Record<string, { email: string; password: string }> = {
      ADMIN: { email: "admin@clothsb2b.com", password: "admin123" },
      FACTORY: { email: "factory@clothsb2b.com", password: "factory123" },
      CUSTOMER: { email: "store@clothsb2b.com", password: "store123" },
    };
    const cred = credentials[role];
    handleLogin(cred.email, cred.password);
  }

  function handleLogin(emailVal: string, passwordVal: string) {
    setLoading(true);
    const user = findUser(emailVal, passwordVal);
    if (!user) {
      toast.error("Invalid email or password");
      setLoading(false);
      return;
    }
    localStorage.setItem("demo_role", user.role);
    localStorage.setItem("demo_user_id", user.id);
    localStorage.setItem("demo_user_name", user.name);
    if (user.factoryId) localStorage.setItem("demo_factory_id", user.factoryId);
    if (user.customerId) localStorage.setItem("demo_customer_id", user.customerId);

    toast.success(`Welcome back, ${user.name}!`);
    setTimeout(() => {
      if (user.role === "ADMIN") router.push("/admin");
      else if (user.role === "FACTORY") router.push("/factory");
      else router.push("/store");
    }, 400);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
            <Shirt className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg">ClothsB2B</span>
        </div>
        <div>
          <blockquote className="space-y-4">
            <p className="text-3xl font-bold text-white leading-tight">
              The Modern B2B<br />Clothing Platform
            </p>
            <p className="text-slate-400 text-base">
              Connect verified factories with retail store owners.<br />
              Bulk ordering made simple.
            </p>
          </blockquote>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: "200+", label: "Verified Factories" },
              { value: "10K+", label: "Products" },
              { value: "$50M+", label: "In Orders" },
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-800 rounded-lg p-4">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-600 text-xs">
          © 2026 ClothsB2B. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Shirt className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg text-zinc-900">ClothsB2B</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Sign in</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Enter your credentials to access your portal
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-zinc-400">Quick demo access</span>
            </div>
          </div>

          {/* Demo buttons */}
          <div className="space-y-2">
            <button
              onClick={() => loginAs("ADMIN")}
              className="w-full flex items-center gap-3 rounded-lg border border-zinc-200 p-3 hover:bg-zinc-50 transition-colors text-left"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-100">
                <ShieldCheck className="h-4 w-4 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900">Admin Portal</p>
                <p className="text-xs text-zinc-500">admin@clothsb2b.com</p>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-400 ml-auto" />
            </button>
            <button
              onClick={() => loginAs("FACTORY")}
              className="w-full flex items-center gap-3 rounded-lg border border-zinc-200 p-3 hover:bg-zinc-50 transition-colors text-left"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100">
                <Building2 className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900">Factory Portal</p>
                <p className="text-xs text-zinc-500">factory@clothsb2b.com</p>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-400 ml-auto" />
            </button>
            <button
              onClick={() => loginAs("CUSTOMER")}
              className="w-full flex items-center gap-3 rounded-lg border border-zinc-200 p-3 hover:bg-zinc-50 transition-colors text-left"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-100">
                <ShoppingBag className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900">Store Owner Portal</p>
                <p className="text-xs text-zinc-500">store@clothsb2b.com</p>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-400 ml-auto" />
            </button>
          </div>

          <p className="text-center text-sm text-zinc-500">
            New store owner?{" "}
            <Link href="/register/customer" className="text-indigo-600 hover:underline font-medium">
              Register
            </Link>
            {" · "}
            <Link href="/register/factory" className="text-blue-600 hover:underline font-medium">
              Apply as factory
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
