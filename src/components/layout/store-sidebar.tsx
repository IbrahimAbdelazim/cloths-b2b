"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  ShoppingCart,
  ClipboardList,
  User,
  Shirt,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

const navItems = [
  { label: "Catalog", href: "/store", icon: LayoutGrid },
  { label: "My Orders", href: "/store/orders", icon: ClipboardList },
  { label: "Account", href: "/store/account", icon: User },
];

export function StoreSidebar() {
  const pathname = usePathname();
  const { totalItems, getSubtotal } = useCart();
  const subtotal = getSubtotal();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-60 flex-col bg-white border-r border-zinc-200">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 px-4 border-b border-zinc-200">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600">
          <Shirt className="h-4 w-4 text-white" />
        </div>
        <span className="font-semibold text-zinc-900 text-sm">FactoryHub</span>
        <span className="ml-auto text-xs bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-medium">
          Store
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/store"
              ? pathname === "/store"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-700 border-l-2 border-indigo-600 pl-[10px]"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-indigo-600" : "text-zinc-400",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Cart summary */}
      <div className="p-3 border-t border-zinc-100">
        <Link
          href="/store/cart"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
            pathname === "/store/cart"
              ? "bg-indigo-50 text-indigo-700"
              : "text-zinc-700 hover:bg-zinc-50",
          )}
        >
          <div className="relative">
            <ShoppingCart className="h-4 w-4 text-zinc-400" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium">Cart</p>
            {totalItems > 0 && (
              <p className="text-xs text-zinc-500">
                {formatCurrency(subtotal)}
              </p>
            )}
          </div>
        </Link>
      </div>
    </aside>
  );
}
