"use client";
import { useRouter } from "next/navigation";
import { Clock, Mail, LogOut, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PendingPage() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("demo_role");
    localStorage.removeItem("demo_user_id");
    localStorage.removeItem("demo_user_name");
    localStorage.removeItem("demo_factory_id");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center gap-2 justify-center mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Shirt className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg text-zinc-900">ClothsB2B</span>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 mb-4">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <h1 className="text-xl font-bold text-zinc-900">Application Under Review</h1>
          <p className="text-sm text-zinc-600 mt-2">
            Your factory application has been submitted and is being reviewed by our team.
            We verify all factories to ensure quality and compliance.
          </p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-zinc-900">What happens next?</h2>
          <div className="space-y-3">
            {[
              { step: "1", title: "Document Verification", desc: "We review your business registration and certifications" },
              { step: "2", title: "Compliance Check", desc: "Our team verifies sustainability and labor standards" },
              { step: "3", title: "Account Activation", desc: "Once approved, you can start listing products" },
            ].map((s) => (
              <div key={s.step} className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900">{s.title}</p>
                  <p className="text-xs text-zinc-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-zinc-100">
            <p className="text-xs text-zinc-500 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              Estimated review time: <strong>1–3 business days</strong>
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Questions? Email us at{" "}
              <a href="mailto:verify@clothsb2b.com" className="text-blue-600 hover:underline">
                verify@clothsb2b.com
              </a>
            </p>
          </div>
        </div>

        <Button variant="outline" onClick={handleLogout} className="w-full">
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  );
}
