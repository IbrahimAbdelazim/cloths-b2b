"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { StoreSidebar } from "@/components/layout/store-sidebar";
import { PortalHeader } from "@/components/layout/portal-header";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState("Store Owner");

  useEffect(() => {
    const role = localStorage.getItem("demo_role");
    const name = localStorage.getItem("demo_user_name");
    if (role !== "CUSTOMER") {
      router.push("/login");
      return;
    }
    if (name) setUserName(name);
  }, [router]);

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumb = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = seg.charAt(0).toUpperCase() + seg.slice(1);
    return { label, href: i < segments.length - 1 ? href : undefined };
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <StoreSidebar />
      <div className="flex-1 flex flex-col ml-60 min-h-screen">
        <PortalHeader
          userName={userName}
          breadcrumb={breadcrumb}
          portalLabel="Store Owner"
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
