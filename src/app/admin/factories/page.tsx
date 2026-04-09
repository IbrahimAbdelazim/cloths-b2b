"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { factories as allFactories } from "@/data/factories";
import type { FactoryStatus } from "@/types";

const tabs: { label: string; value: FactoryStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Suspended", value: "SUSPENDED" },
];

export default function AdminFactoriesPage() {
  const [filter, setFilter] = useState<FactoryStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const filtered = allFactories.filter((f) => {
    const matchesStatus = filter === "ALL" || f.status === filter;
    const matchesSearch =
      f.companyName.toLowerCase().includes(search.toLowerCase()) ||
      f.country.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Factories</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage factory registrations and verification</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-zinc-200 pb-0">
        {tabs.map((tab) => {
          const count =
            tab.value === "ALL"
              ? allFactories.length
              : allFactories.filter((f) => f.status === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm border-b-2 -mb-px transition-colors ${
                filter === tab.value
                  ? "border-violet-600 text-violet-700 font-medium"
                  : "border-transparent text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {tab.label}
              <span className={`text-xs rounded-full px-1.5 py-0.5 ${
                filter === tab.value ? "bg-violet-100 text-violet-700" : "bg-zinc-100 text-zinc-500"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search factories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500">Company</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Location</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Employees</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Certifications</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Status</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Joined</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filtered.map((factory) => (
                  <tr key={factory.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-zinc-900">{factory.companyName}</p>
                        <p className="text-xs text-zinc-500">{factory.contactEmail}</p>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-zinc-600">
                      {factory.city}, {factory.country}
                    </td>
                    <td className="px-3 py-4 text-zinc-600">{factory.employeeCount}</td>
                    <td className="px-3 py-4">
                      <div className="flex flex-wrap gap-1">
                        {factory.certifications.slice(0, 2).map((cert) => (
                          <span key={cert} className="text-xs bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">
                            {cert}
                          </span>
                        ))}
                        {factory.certifications.length > 2 && (
                          <span className="text-xs text-zinc-400">+{factory.certifications.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <StatusBadge status={factory.status} />
                    </td>
                    <td className="px-3 py-4 text-zinc-500 text-xs">
                      {new Date(factory.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/factories/${factory.id}`}>
                          <ExternalLink className="h-3.5 w-3.5" />
                          Review
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-zinc-400 text-sm">
                No factories match your filter
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
