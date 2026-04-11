"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { subscriptionPlans, industryTypes } from "@/data/subscriptions";
import type { SubscriptionPlan, IndustryType } from "@/types";

const STEPS = ["Account Info", "Business Info", "Plan & Industry"];

const EMPLOYEE_RANGES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];

const COUNTRIES = [
  "Bangladesh",
  "China",
  "India",
  "Turkey",
  "Vietnam",
  "Pakistan",
  "Indonesia",
  "Portugal",
  "Italy",
  "Egypt",
  "Other",
];

export default function FactoryRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    country: "",
    city: "",
    registrationNo: "",
    employeeRange: "",
    description: "",
    industryType: "" as IndustryType | "",
    subscriptionPlan: "" as SubscriptionPlan | "",
  });

  function update(key: string, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handleNext() {
    if (step === 0) {
      if (!form.name || !form.email || !form.password) {
        toast.error("Please fill in all required fields");
        return;
      }
      if (form.password !== form.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (form.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
    }
    if (step === 1) {
      if (!form.companyName || !form.country || !form.city) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    setStep(step + 1);
  }

  function handleSubmit() {
    if (!form.industryType || !form.subscriptionPlan) {
      toast.error("Please select your industry type and subscription plan");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("demo_role", "FACTORY");
      localStorage.setItem("demo_user_name", form.name);
      localStorage.setItem("demo_factory_id", "factory-pending");
      localStorage.setItem("demo_subscription_plan", form.subscriptionPlan);
      localStorage.setItem("demo_industry_type", form.industryType);
      setLoading(false);
      router.push("/pending");
    }, 800);
  }

  return (
    <div>
      {/* Logo mobile */}
      <div className="flex items-center gap-2 mb-8 lg:hidden">
        <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center">
          <Building2 className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="font-bold text-zinc-900">FactoryHub</span>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                i < step
                  ? "bg-indigo-600 text-white"
                  : i === step
                    ? "border-2 border-indigo-600 text-indigo-600"
                    : "border-2 border-zinc-200 text-zinc-400"
              }`}
            >
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span
              className={`text-xs font-medium ${i === step ? "text-zinc-900" : "text-zinc-400"}`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-8 mx-1 rounded ${i < step ? "bg-indigo-600" : "bg-zinc-200"}`}
              />
            )}
          </div>
        ))}
      </div>

      {step === 0 && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-zinc-900">
              Create your account
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Start your factory registration — takes 2 minutes
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Rahman Chowdhury"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="rahman@factory.com"
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
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11"
              onClick={handleNext}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-zinc-900">
              Business Information
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Tell us about your factory
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="Sunrise Garments Ltd."
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="country">Country *</Label>
                <select
                  id="country"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="">Select country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Dhaka"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="registrationNo">
                Registration Number{" "}
                <span className="text-zinc-400 font-normal">(optional)</span>
              </Label>
              <Input
                id="registrationNo"
                placeholder="e.g. BD-2019-4521"
                value={form.registrationNo}
                onChange={(e) => update("registrationNo", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="employeeRange">Employee Count</Label>
              <select
                id="employeeRange"
                value={form.employeeRange}
                onChange={(e) => update("employeeRange", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">Select range</option>
                {EMPLOYEE_RANGES.map((r) => (
                  <option key={r} value={r}>
                    {r} employees
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">
                About Your Factory{" "}
                <span className="text-zinc-400 font-normal">(optional)</span>
              </Label>
              <textarea
                id="description"
                rows={3}
                placeholder="Specializations, certifications, production capacity..."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(0)}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <Button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={handleNext}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-zinc-900">
              Choose Your Industry & Plan
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Select the industry you serve and subscription plan
            </p>
          </div>

          <div className="space-y-6">
            {/* Industry Type Selection */}
            <div className="space-y-3">
              <Label>Industry Type *</Label>
              <div className="grid gap-2">
                {industryTypes.map((industry) => (
                  <button
                    key={industry.value}
                    type="button"
                    onClick={() => update("industryType", industry.value)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                      form.industryType === industry.value
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <span className="text-2xl">{industry.icon}</span>
                    <span className="font-medium text-sm">
                      {industry.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription Plan Selection */}
            <div className="space-y-3">
              <Label>Subscription Plan *</Label>
              <div className="grid gap-3">
                {subscriptionPlans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => update("subscriptionPlan", plan.id)}
                    className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                      form.subscriptionPlan === plan.id
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-2 right-4 bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Popular
                      </div>
                    )}
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-bold text-lg">{plan.name}</h3>
                      <div className="text-right">
                        <span className="text-2xl font-bold">
                          ${plan.price}
                        </span>
                        <span className="text-sm text-zinc-500">/mo</span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-600 mb-3">
                      {plan.description}
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <Check className="h-3.5 w-3.5 text-indigo-600" />
                        <span className="text-zinc-600">
                          {plan.features.maxProducts === null
                            ? "Unlimited products"
                            : `Up to ${plan.features.maxProducts} products`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check className="h-3.5 w-3.5 text-indigo-600" />
                        <span className="text-zinc-600">
                          {plan.features.maxOrders === null
                            ? "Unlimited orders"
                            : `Up to ${plan.features.maxOrders} orders/month`}
                        </span>
                      </div>
                      {plan.features.customBranding && (
                        <div className="flex items-center gap-2 text-xs">
                          <Check className="h-3.5 w-3.5 text-indigo-600" />
                          <span className="text-zinc-600">Custom branding</span>
                        </div>
                      )}
                      {plan.features.analyticsAccess && (
                        <div className="flex items-center gap-2 text-xs">
                          <Check className="h-3.5 w-3.5 text-indigo-600" />
                          <span className="text-zinc-600">
                            Advanced analytics
                          </span>
                        </div>
                      )}
                      {plan.features.apiAccess && (
                        <div className="flex items-center gap-2 text-xs">
                          <Check className="h-3.5 w-3.5 text-indigo-600" />
                          <span className="text-zinc-600">API access</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(1)}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <Button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        </>
      )}

      <p className="text-center text-xs text-zinc-400 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-indigo-600 hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
