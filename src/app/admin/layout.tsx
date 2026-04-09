"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { PortalHeader } from "@/components/layout/portal-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    const role = localStorage.getItem("demo_role");
    const name = localStorage.getItem("demo_user_name");
    if (role !== "ADMIN") {
      router.push("/login");
      return;
    }
    if (name) setUserName(name);
  }, [router]);

  // Build breadcrumb from pathname
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumb = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label =
      seg === "admin"
        ? "Admin"
        : seg.charAt(0).toUpperCase() + seg.slice(1);
    return { label, href: i < segments.length - 1 ? href : undefined };
  });

  return (
    <div className="flex h-screen bg-zinc-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-60 min-h-screen">
        <PortalHeader
          userName={userName}
          userEmail="admin@clothsb2b.com"
          breadcrumb={breadcrumb}
          portalLabel="Administrator"
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
