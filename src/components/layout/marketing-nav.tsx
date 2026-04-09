import Link from "next/link";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MarketingNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Package className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-bold text-white text-lg">ClothsB2B</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link href="#for-buyers" className="hover:text-white transition-colors">
            For Buyers
          </Link>
          <Link href="#for-factories" className="hover:text-white transition-colors">
            For Factories
          </Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white hover:bg-slate-800">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Link href="/register/customer">Start Buying</Link>
          </Button>
          <Button size="sm" variant="outline" asChild className="bg-transparent border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white">
            <Link href="/register/factory">Start Selling</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
