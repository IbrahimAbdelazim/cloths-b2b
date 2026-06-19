import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Package,
  ShoppingBag,
  Truck,
  Users,
  Factory,
  BarChart3,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/layout/marketing-nav";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <MarketingNav />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 bg-indigo-950 border border-indigo-800 rounded-full px-3 py-1.5 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              The modern B2B wholesale platform
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              Where Factories
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                Meet Retailers
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
              Connect with 200+ verified manufacturers worldwide. Order bulk
              products from apparel to footwear, bags to accessories at
              competitive wholesale prices with full MOQ flexibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-8 text-base"
              >
                <Link href="/register/customer">
                  Start Buying
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white h-12 px-8 text-base"
              >
                <Link href="/register/factory">List Your Factory</Link>
              </Button>
            </div>
          </div>

          {/* Abstract product grid illustration */}
          <div className="mt-16 grid grid-cols-4 gap-3 opacity-40 pointer-events-none select-none max-w-2xl">
            {[
              { bg: "bg-indigo-800", h: "h-32" },
              { bg: "bg-blue-800", h: "h-24" },
              { bg: "bg-slate-700", h: "h-36" },
              { bg: "bg-indigo-900", h: "h-28" },
              { bg: "bg-blue-900", h: "h-24" },
              { bg: "bg-slate-600", h: "h-32" },
              { bg: "bg-indigo-800", h: "h-20" },
              { bg: "bg-blue-800", h: "h-36" },
            ].map((card, i) => (
              <div key={i} className={`${card.bg} ${card.h} rounded-xl`} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-slate-800 border-y border-slate-700 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                value: "200+",
                label: "Verified Factories",
                sub: "Across 20+ countries",
              },
              {
                value: "10,000+",
                label: "Wholesale Products",
                sub: "Updated daily",
              },
              {
                value: "$50M+",
                label: "In Orders Placed",
                sub: "Trusted by 500+ stores",
              },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-base font-medium text-slate-800">
                  {stat.label}
                </p>
                <p className="text-sm text-slate-800 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Buyers */}
      <section id="for-buyers" className="py-20 px-6 bg-white text-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="space-y-3">
                {[
                  {
                    name: "Essential Cotton Tee",
                    factory: "Sunrise Garments · Bangladesh",
                    moq: "MOQ 50 units",
                    price: "from $7.20/unit",
                    color: "bg-amber-100 text-amber-800",
                  },
                  {
                    name: "Slim Fit Denim Jeans",
                    factory: "BestWear Co. · Turkey",
                    moq: "MOQ 100 units",
                    price: "from $14.50/unit",
                    color: "bg-amber-100 text-amber-800",
                  },
                  {
                    name: "Performance Dry-Fit Tee",
                    factory: "VietTex · Vietnam",
                    moq: "MOQ 50 units",
                    price: "from $8.00/unit",
                    color: "bg-amber-100 text-amber-800",
                  },
                ].map((product) => (
                  <div
                    key={product.name}
                    className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm"
                  >
                    <div className="h-12 w-12 rounded-lg bg-slate-200 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-zinc-900 text-sm">
                        {product.name}
                      </p>
                      <p className="text-xs text-zinc-500 flex items-center gap-1">
                        <BadgeCheck className="h-3 w-3 text-emerald-500" />
                        {product.factory}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${product.color}`}
                      >
                        {product.moq}
                      </span>
                      <p className="text-sm font-semibold text-emerald-700 mt-1">
                        {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">
                For Store Owners
              </p>
              <h2 className="text-3xl font-bold text-zinc-900 mb-5 leading-tight">
                Source directly from verified factories
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: ShoppingBag,
                    title: "Virtual Showroom",
                    desc: "Browse thousands of verified products with high-res images, material specs, and lead times.",
                  },
                  {
                    icon: Package,
                    title: "MOQ Flexibility",
                    desc: "Start with minimum order quantities as low as 50 units. Scale up for better pricing tiers.",
                  },
                  {
                    icon: BadgeCheck,
                    title: "Verified Factories",
                    desc: "Every factory is KYC verified by our team. Check certifications, audits, and production capacity.",
                  },
                  {
                    icon: BarChart3,
                    title: "Bulk Pricing Tiers",
                    desc: "See transparent volume pricing. Order more, pay less — up to 40% savings at higher quantities.",
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="h-9 w-9 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                      <feature.icon className="h-4.5 w-4.5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 text-sm">
                        {feature.title}
                      </p>
                      <p className="text-sm text-zinc-500 mt-0.5">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                asChild
                className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Link href="/register/customer">
                  Start Buying
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* For Factories */}
      <section
        id="for-factories"
        className="py-20 px-6 bg-slate-50 text-zinc-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">
                For Manufacturers
              </p>
              <h2 className="text-3xl font-bold text-zinc-900 mb-5 leading-tight">
                Reach global buyers at scale
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: Globe,
                    title: "Easy Onboarding",
                    desc: "List your factory in minutes. Upload your product catalog with photos, specs, and pricing tiers.",
                  },
                  {
                    icon: BadgeCheck,
                    title: "KYC Verification",
                    desc: "Get our Verified badge after document review. Builds buyer trust and increases conversions.",
                  },
                  {
                    icon: Truck,
                    title: "Order Management",
                    desc: "Track every order from confirmation to delivery. Update fulfillment status in real time.",
                  },
                  {
                    icon: BarChart3,
                    title: "Analytics",
                    desc: "See which products sell, at what quantities, and who's buying. Data-driven growth.",
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                      <feature.icon className="h-4.5 w-4.5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 text-sm">
                        {feature.title}
                      </p>
                      <p className="text-sm text-zinc-500 mt-0.5">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                asChild
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link href="/register/factory">
                  List Your Factory
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Visual */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-zinc-900">
                  Factory Dashboard
                </p>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                  Verified
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Products", value: "24" },
                  { label: "Orders", value: "147" },
                  { label: "Revenue (30d)", value: "$48.2K" },
                  { label: "Pending", value: "3 🟡" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-slate-50 rounded-lg p-3 border border-slate-100"
                  >
                    <p className="text-xs text-zinc-400 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-lg font-bold text-zinc-900">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
              {/* Mini chart */}
              <div className="flex items-end gap-1 h-20 border-b border-slate-100 mb-2">
                {[35, 60, 45, 80, 55, 90, 70, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-500 rounded-t-sm opacity-70"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="text-xs text-zinc-400 text-center">
                Revenue last 8 weeks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-white text-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-zinc-900 mb-3">
              How It Works
            </h2>
            <p className="text-slate-800 max-w-xl mx-auto">
              From registration to your first order in days, not months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Factories */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-7 w-7 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Factory className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <p className="font-semibold text-zinc-900">For Manufacturers</p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "Register your factory",
                    desc: "Create an account and submit your company details, registration number, and certifications.",
                  },
                  {
                    step: "02",
                    title: "KYC verification",
                    desc: "Our team reviews your documents within 1-3 business days and verifies your factory.",
                  },
                  {
                    step: "03",
                    title: "List your products",
                    desc: "Upload products with photos, specs, price tiers, and MOQ for each item.",
                  },
                  {
                    step: "04",
                    title: "Receive orders & earn",
                    desc: "Accept orders, fulfill shipments, and get paid securely through the platform.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="text-2xl font-bold text-slate-800 w-10 shrink-0 leading-none">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 text-sm">
                        {item.title}
                      </p>
                      <p className="text-sm text-zinc-500 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Buyers */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-7 w-7 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Users className="h-3.5 w-3.5 text-indigo-600" />
                </div>
                <p className="font-semibold text-zinc-900">For Store Owners</p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "Create a free account",
                    desc: "Sign up with your store details. No subscription fees — pay only for what you order.",
                  },
                  {
                    step: "02",
                    title: "Browse the catalog",
                    desc: "Search 10,000+ verified products filtered by category, MOQ, price range, and origin.",
                  },
                  {
                    step: "03",
                    title: "Configure your order",
                    desc: "Select sizes, colors, and quantity. See live pricing tiers update as you adjust.",
                  },
                  {
                    step: "04",
                    title: "Track your shipment",
                    desc: "Get real-time tracking from factory floor to your door. Full transparency.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="text-2xl font-bold text-slate-800 w-10 shrink-0 leading-none">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 text-sm">
                        {item.title}
                      </p>
                      <p className="text-sm text-zinc-500 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your wholesale business?
          </h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto">
            Join hundreds of brands and factories already using FactoryHub to
            streamline their wholesale operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-indigo-700 hover:bg-indigo-50 h-12 px-8 text-base font-semibold"
            >
              <Link href="/register/customer">
                I&apos;m a Buyer
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-transparent border-indigo-300 text-white hover:bg-indigo-700 hover:text-white h-12 px-8 text-base"
            >
              <Link href="/register/factory">I&apos;m a Manufacturer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-white text-lg">FactoryHub</span>
              </div>
              <p className="text-slate-800 text-sm max-w-xs">
                The modern B2B wholesale clothing platform connecting factories
                and retailers worldwide.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-semibold text-white mb-3">Platform</p>
                <ul className="space-y-2 text-slate-800">
                  <li>
                    <Link
                      href="/store"
                      className="hover:text-white transition-colors"
                    >
                      Browse Catalog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register/factory"
                      className="hover:text-white transition-colors"
                    >
                      List Factory
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-3">Portals</p>
                <ul className="space-y-2 text-slate-800">
                  <li>
                    <Link
                      href="/admin"
                      className="hover:text-white transition-colors"
                    >
                      Admin
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/factory"
                      className="hover:text-white transition-colors"
                    >
                      Factory
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/store"
                      className="hover:text-white transition-colors"
                    >
                      Store
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-3">Company</p>
                <ul className="space-y-2 text-slate-800">
                  <li>
                    <span className="cursor-default">About</span>
                  </li>
                  <li>
                    <span className="cursor-default">Contact</span>
                  </li>
                  <li>
                    <span className="cursor-default">Privacy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-800">
            © 2026 FactoryHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
