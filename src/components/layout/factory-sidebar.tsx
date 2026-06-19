"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  User,
  Shirt,
  BadgeCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/factory", icon: LayoutDashboard },
  { label: "Products", href: "/factory/products", icon: Package },
  { label: "Orders", href: "/factory/orders", icon: ShoppingBag },
  { label: "Account", href: "/factory/account", icon: User },
];

interface FactorySidebarProps {
  companyName: string;
}

export function FactorySidebar({ companyName }: FactorySidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-60 flex-col bg-white border-r border-zinc-200">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 px-4 border-b border-zinc-200">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600">
          <Shirt className="h-4 w-4 text-white" />
        </div>
        <span className="font-semibold text-zinc-900 text-sm">FactoryHub</span>
      </div>

      {/* Company info */}
      <div className="px-4 py-3 border-b border-zinc-100">
        <p className="text-xs text-zinc-500 mb-0.5">Factory Portal</p>
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-zinc-900 truncate">
            {companyName}
          </p>
          <BadgeCheck className="h-4 w-4 text-blue-500 shrink-0" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/factory"
              ? pathname === "/factory"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600 pl-[10px]"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-blue-600" : "text-zinc-400",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
