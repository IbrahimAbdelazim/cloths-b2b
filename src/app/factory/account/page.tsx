"use client";
import { useEffect, useState } from "react";
import { BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { getFactoryById } from "@/data/factories";
import type { Factory } from "@/types";

export default function FactoryAccountPage() {
  const [factory, setFactory] = useState<Factory | null>(null);

  useEffect(() => {
    const factoryId = localStorage.getItem("demo_factory_id") ?? "factory-1";
    const f = getFactoryById(factoryId);
    if (f) setFactory(f);
  }, []);

  if (!factory) return null;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Account</h1>
        <p className="text-sm text-zinc-500 mt-1">Your factory profile</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{factory.companyName}</CardTitle>
            <StatusBadge status={factory.status} />
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: "Registration No.", value: factory.registrationNo || "—" },
            { label: "Tax ID", value: factory.taxId || "—" },
            { label: "Location", value: `${factory.city}, ${factory.country}` },
            { label: "Employees", value: factory.employeeCount },
            { label: "Years in Business", value: `${factory.yearsInBusiness} years` },
            { label: "Contact", value: factory.contactEmail },
          ].map((pair) => (
            <div key={pair.label}>
              <p className="text-xs text-zinc-400 uppercase tracking-wide font-medium mb-0.5">{pair.label}</p>
              <p className="text-zinc-900">{pair.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Certifications</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {factory.certifications.map((cert) => (
              <span key={cert} className="flex items-center gap-1.5 text-sm bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md border border-emerald-200">
                <BadgeCheck className="h-3.5 w-3.5" />
                {cert}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {factory.description && (
        <Card>
          <CardHeader><CardTitle className="text-sm">About</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 leading-relaxed">{factory.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
