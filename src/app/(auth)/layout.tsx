import Link from "next/link";
import { Package } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left dark panel */}
      <div className="hidden lg:flex lg:w-[420px] xl:w-[480px] flex-col bg-slate-900 p-10 relative shrink-0">
        <Link href="/" className="flex items-center gap-2 mb-auto">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Package className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg">ClothsB2B</span>
        </Link>

        <div className="mb-auto">
          <h2 className="text-3xl font-bold text-white leading-snug mb-4">
            The Modern B2B
            <br />
            Clothing Platform
          </h2>
          <p className="text-slate-200 text-sm leading-relaxed mb-10">
            Connect with 200+ verified factories worldwide. Source bulk clothing at wholesale prices.
          </p>

          <div className="space-y-4">
            {[
              { value: "200+", label: "Verified Factories" },
              { value: "10K+", label: "Wholesale Products" },
              { value: "$50M+", label: "In Orders Placed" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold text-indigo-400">
                  {stat.value.replace(/[^0-9KM$+]/g, "").slice(0, 3)}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{stat.value}</p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-600">
          © 2026 ClothsB2B. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
