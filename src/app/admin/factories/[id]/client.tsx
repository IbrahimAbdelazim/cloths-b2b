"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  MapPin,
  BadgeCheck,
  Calendar,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { getFactoryById } from "@/data/factories";
import { getProductsByFactory } from "@/data/products";

export default function AdminFactoryDetailClient({ id }: { id: string }) {
  const factory = getFactoryById(id);
  const [status, setStatus] = useState(factory?.status ?? "PENDING");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!factory) {
    return (
      <div className="text-center py-20 text-zinc-400">Factory not found</div>
    );
  }

  const products = getProductsByFactory(id);

  function handleApprove() {
    setStatus("APPROVED");
    toast.success(`${factory!.companyName} has been approved`);
  }

  function handleReject() {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    setStatus("REJECTED");
    setShowRejectForm(false);
    toast.error(`${factory!.companyName} has been rejected`);
  }

  const infoPairs = [
    { label: "Registration No.", value: factory.registrationNo || "—" },
    { label: "Tax ID", value: factory.taxId || "—" },
    { label: "Years in Business", value: factory.yearsInBusiness ? `${factory.yearsInBusiness} years` : "—" },
    { label: "Employee Count", value: factory.employeeCount || "—" },
    { label: "Website", value: factory.website || "—" },
    { label: "Contact", value: factory.contactEmail },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/factories">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">{factory.companyName}</h1>
          <p className="text-sm text-zinc-500">Factory application review</p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={status} className="text-sm px-3 py-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-violet-500" />
                Business Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-600">
                <MapPin className="h-4 w-4 text-zinc-400" />
                <span className="text-sm">{factory.city}, {factory.country}</span>
              </div>
              {factory.description && (
                <p className="text-sm text-zinc-600 leading-relaxed">{factory.description}</p>
              )}
              <div className="grid grid-cols-2 gap-4">
                {infoPairs.map((pair) => (
                  <div key={pair.label}>
                    <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide">{pair.label}</p>
                    <p className="text-sm text-zinc-900 mt-0.5">{pair.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-violet-500" />
                Certifications & Specialties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-2">Certifications</p>
                {factory.certifications.length === 0 ? (
                  <p className="text-sm text-zinc-400">No certifications provided</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {factory.certifications.map((cert) => (
                      <span key={cert} className="flex items-center gap-1 text-sm bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {factory.specialties.map((s) => (
                    <span key={s} className="text-sm bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {products.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Products ({products.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-zinc-50">
                  {products.map((p) => (
                    <div key={p.id} className="flex items-center justify-between px-6 py-3">
                      <div>
                        <p className="text-sm font-medium text-zinc-900">{p.name}</p>
                        <p className="text-xs text-zinc-500">{p.category}</p>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Review Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Current Status</span>
                <StatusBadge status={status} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Submitted</span>
                <span className="text-zinc-700">{new Date(factory.joinedAt).toLocaleDateString()}</span>
              </div>
              {factory.verifiedAt && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Verified At</span>
                  <span className="text-zinc-700">{new Date(factory.verifiedAt).toLocaleDateString()}</span>
                </div>
              )}

              {status === "PENDING" && (
                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={handleApprove}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Approve Factory
                  </Button>
                  {!showRejectForm ? (
                    <Button
                      variant="outline"
                      className="w-full text-rose-600 border-rose-200 hover:bg-rose-50"
                      onClick={() => setShowRejectForm(true)}
                    >
                      <ShieldX className="h-4 w-4" />
                      Reject
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Rejection reason (required)…"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="text-sm resize-none"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button variant="destructive" className="flex-1 text-xs h-8" onClick={handleReject}>
                          Confirm Reject
                        </Button>
                        <Button variant="outline" className="flex-1 text-xs h-8" onClick={() => setShowRejectForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {status === "APPROVED" && (
                <div className="pt-2 border-t border-zinc-100">
                  <div className="flex items-center gap-2 text-sm text-emerald-600">
                    <ShieldCheck className="h-4 w-4" />
                    This factory is verified
                  </div>
                </div>
              )}

              {status === "REJECTED" && (
                <div className="pt-2 border-t border-zinc-100">
                  <p className="text-xs text-rose-600">Factory has been rejected.</p>
                  {rejectionReason && (
                    <p className="text-xs text-zinc-500 mt-1">Reason: {rejectionReason}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4 text-zinc-400" />
                Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="flex h-2 w-2 rounded-full bg-zinc-300 mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-zinc-700">Application submitted</p>
                  <p className="text-xs text-zinc-400">{new Date(factory.joinedAt).toLocaleDateString()}</p>
                </div>
              </div>
              {factory.verifiedAt && (
                <div className="flex gap-3">
                  <div className="flex h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-zinc-700">Factory approved</p>
                    <p className="text-xs text-zinc-400">{new Date(factory.verifiedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              {status === "REJECTED" && (
                <div className="flex gap-3">
                  <div className="flex h-2 w-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-zinc-700">Factory rejected</p>
                    <p className="text-xs text-zinc-400">Today</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
