"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productCategories } from "@/data/products";
import type { PriceTier } from "@/types";

const STEPS = ["Basic Info", "Pricing & MOQ", "Variants", "Review"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "One Size"];
const COLORS = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#1C1C1C" },
  { name: "Navy", hex: "#1B2A4A" },
  { name: "Grey", hex: "#9E9E9E" },
  { name: "Red", hex: "#D32F2F" },
  { name: "Blue", hex: "#1565C0" },
  { name: "Green", hex: "#2E7D32" },
  { name: "Camel", hex: "#C19A6B" },
];

export default function NewProductPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step 1
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [leadTimeDays, setLeadTimeDays] = useState("21");

  // Step 2
  const [moq, setMoq] = useState("50");
  const [priceTiers, setPriceTiers] = useState<PriceTier[]>([
    { minQty: 50, maxQty: 99, pricePerUnit: 0 },
    { minQty: 100, maxQty: null, pricePerUnit: 0 },
  ]);
  const [sampleAvailable, setSampleAvailable] = useState(false);
  const [samplePrice, setSamplePrice] = useState("");

  // Step 3
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["S", "M", "L"]);
  const [selectedColors, setSelectedColors] = useState<typeof COLORS>([COLORS[0], COLORS[1]]);

  function addPriceTier() {
    const last = priceTiers[priceTiers.length - 1];
    const newMin = last ? (last.maxQty ? last.maxQty + 1 : 500) : 50;
    setPriceTiers([...priceTiers, { minQty: newMin, maxQty: null, pricePerUnit: 0 }]);
  }

  function removePriceTier(i: number) {
    setPriceTiers(priceTiers.filter((_, idx) => idx !== i));
  }

  function updateTier(i: number, field: keyof PriceTier, value: string) {
    setPriceTiers(
      priceTiers.map((t, idx) =>
        idx === i
          ? { ...t, [field]: field === "maxQty" ? (value === "" ? null : Number(value)) : Number(value) }
          : t
      )
    );
  }

  function toggleSize(s: string) {
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function toggleColor(c: (typeof COLORS)[0]) {
    setSelectedColors((prev) =>
      prev.find((x) => x.name === c.name) ? prev.filter((x) => x.name !== c.name) : [...prev, c]
    );
  }

  function handleSubmit() {
    toast.success("Product saved as Draft! Submit for review to publish.");
    router.push("/factory/products");
  }

  const canNext = [
    name && category && description,
    moq && priceTiers.length > 0,
    selectedSizes.length > 0 && selectedColors.length > 0,
    true,
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/factory/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">New Product</h1>
          <p className="text-sm text-zinc-500">Add a product to your catalog</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                i < step
                  ? "bg-blue-600 text-white"
                  : i === step
                  ? "bg-blue-100 text-blue-700 border-2 border-blue-600"
                  : "bg-zinc-100 text-zinc-400"
              }`}
            >
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span
              className={`text-sm ${
                i === step ? "text-zinc-900 font-medium" : "text-zinc-400"
              }`}
            >
              {s}
            </span>
            {i < STEPS.length - 1 && <div className="h-px w-6 bg-zinc-200 mx-1" />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Product Name *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Essential Cotton T-Shirt" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {productCategories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Country of Origin</Label>
                <Input value={countryOfOrigin} onChange={(e) => setCountryOfOrigin(e.target.value)} placeholder="e.g. Bangladesh" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product — fabric weight, fit, features…"
                rows={4}
              />
              <p className="text-xs text-zinc-400 text-right">{description.length}/2000</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Materials</Label>
                <Input value={materials} onChange={(e) => setMaterials(e.target.value)} placeholder="e.g. 100% Cotton, 180gsm" />
              </div>
              <div className="space-y-2">
                <Label>Lead Time (days)</Label>
                <Input type="number" value={leadTimeDays} onChange={(e) => setLeadTimeDays(e.target.value)} placeholder="21" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Pricing */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pricing & MOQ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Minimum Order Quantity (MOQ) *</Label>
              <Input
                type="number"
                value={moq}
                onChange={(e) => setMoq(e.target.value)}
                placeholder="50"
                className="max-w-xs"
              />
              <p className="text-xs text-zinc-400">Buyers must order at least this many units per size/color variant</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Price Tiers *</Label>
                <Button variant="outline" size="sm" onClick={addPriceTier} className="text-xs h-7">
                  <Plus className="h-3.5 w-3.5" />
                  Add Tier
                </Button>
              </div>
              <div className="rounded-lg border border-zinc-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50">
                    <tr>
                      <th className="text-left px-4 py-2 text-xs font-medium text-zinc-500">Min Qty</th>
                      <th className="text-left px-4 py-2 text-xs font-medium text-zinc-500">Max Qty</th>
                      <th className="text-left px-4 py-2 text-xs font-medium text-zinc-500">Price / Unit (USD)</th>
                      <th className="w-8" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {priceTiers.map((tier, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            value={tier.minQty}
                            onChange={(e) => updateTier(i, "minQty", e.target.value)}
                            className="h-8 w-24"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            value={tier.maxQty ?? ""}
                            onChange={(e) => updateTier(i, "maxQty", e.target.value)}
                            placeholder="∞"
                            className="h-8 w-24"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            step="0.01"
                            value={tier.pricePerUnit || ""}
                            onChange={(e) => updateTier(i, "pricePerUnit", e.target.value)}
                            placeholder="0.00"
                            className="h-8 w-28"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-rose-600"
                            onClick={() => removePriceTier(i)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-zinc-100">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="sample"
                  checked={sampleAvailable}
                  onChange={(e) => setSampleAvailable(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-blue-600"
                />
                <Label htmlFor="sample">Sample available</Label>
              </div>
              {sampleAvailable && (
                <div className="space-y-2 ml-7">
                  <Label>Sample Price (USD)</Label>
                  <Input
                    type="number"
                    value={samplePrice}
                    onChange={(e) => setSamplePrice(e.target.value)}
                    placeholder="0.00"
                    className="max-w-xs"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Variants */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sizes & Colors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Available Sizes *</Label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    className={`h-9 min-w-9 px-3 rounded-md border text-sm font-medium transition-colors ${
                      selectedSizes.includes(s)
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-zinc-200 text-zinc-700 hover:border-blue-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Available Colors *</Label>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((c) => {
                  const selected = !!selectedColors.find((x) => x.name === c.name);
                  return (
                    <button
                      key={c.name}
                      onClick={() => toggleColor(c)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-colors ${
                        selected
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-zinc-200 text-zinc-600 hover:border-blue-200"
                      }`}
                    >
                      <div
                        className="h-4 w-4 rounded-full border border-zinc-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      {c.name}
                      {selected && <Check className="h-3.5 w-3.5 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedSizes.length > 0 && selectedColors.length > 0 && (
              <div className="space-y-2">
                <Label>Variant Preview</Label>
                <div className="overflow-x-auto rounded-lg border border-zinc-200">
                  <table className="w-full text-xs">
                    <thead className="bg-zinc-50">
                      <tr>
                        <th className="text-left px-3 py-2 font-medium text-zinc-500">Size</th>
                        {selectedColors.map((c) => (
                          <th key={c.name} className="text-center px-3 py-2 font-medium text-zinc-500">
                            <div className="flex items-center justify-center gap-1">
                              <div
                                className="h-3 w-3 rounded-full border border-zinc-200"
                                style={{ backgroundColor: c.hex }}
                              />
                              {c.name}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {selectedSizes.map((size) => (
                        <tr key={size}>
                          <td className="px-3 py-2 font-medium text-zinc-700">{size}</td>
                          {selectedColors.map((c) => (
                            <td key={c.name} className="px-3 py-2 text-center">
                              <Input
                                type="number"
                                placeholder="Stock"
                                className="h-7 w-20 text-center text-xs mx-auto"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-zinc-400">
                  {selectedSizes.length * selectedColors.length} variants will be created
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Review & Save</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wide font-medium mb-1">Product</p>
                <p className="font-medium text-zinc-900">{name || "—"}</p>
                <p className="text-zinc-500">{category}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wide font-medium mb-1">MOQ</p>
                <p className="font-medium text-zinc-900">{moq} units</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wide font-medium mb-1">Price Tiers</p>
                <div className="space-y-0.5">
                  {priceTiers.map((t, i) => (
                    <p key={i} className="text-zinc-700">
                      {t.minQty}–{t.maxQty ?? "∞"} units: ${t.pricePerUnit}/unit
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wide font-medium mb-1">Variants</p>
                <p className="text-zinc-700">{selectedSizes.length} sizes × {selectedColors.length} colors</p>
                <p className="text-zinc-500 text-xs">{selectedSizes.join(", ")}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-100 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium">What happens next?</p>
              <p className="text-xs text-blue-600 mt-1">
                Your product will be saved as a <strong>Draft</strong>. You can then submit it for admin review.
                Once approved, it will appear in the store catalog.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => step > 0 && setStep(step - 1)}
          disabled={step === 0}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!canNext[step]}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Check className="h-4 w-4" />
            Save as Draft
          </Button>
        )}
      </div>
    </div>
  );
}
