import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-zinc-900 text-xl">FactoryHub</span>
        </div>

        <p className="text-7xl font-bold text-zinc-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Page not found
        </h1>
        <p className="text-sm text-zinc-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/store">Browse Catalog</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
