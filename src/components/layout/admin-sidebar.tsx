"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Shirt,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { factories } from "@/data/factories";
import { products } from "@/data/products";

const pendingFactories = factories.filter((f) => f.status === "PENDING").length;
const pendingProducts = products.filter(
  (p) => p.status === "PENDING_APPROVAL"
).length;

const navItems = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    label: "Factories",
    href: "/admin/factories",
    icon: Building2,
    badge: pendingFactories,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
    badge: pendingProducts,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
    badge: null,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    badge: null,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-60 flex-col bg-zinc-950">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 px-4 border-b border-zinc-800">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-600">
          <Shirt className="h-4 w-4 text-white" />
        </div>
        <span className="font-semibold text-white text-sm">ClothsB2B</span>
        <span className="ml-auto text-xs bg-violet-900 text-violet-300 px-1.5 py-0.5 rounded font-medium">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-violet-400" : "text-zinc-500"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {item.badge != null && item.badge > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-xs font-medium text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-zinc-800">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-colors"
        >
          <Settings className="h-4 w-4 text-zinc-500" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
