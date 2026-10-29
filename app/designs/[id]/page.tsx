"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, calculateGuaranteedDelivery, formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Scissors,
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DeliveryBanner } from "@/components/ui/DeliveryBanner";

export default function DesignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { designs, updateDraftOrder } = usePrimeStitch();

  const design = designs.find((d) => d.id === params.id) || designs[0];

  const [selectedFabricId, setSelectedFabricId] = useState<string>(
    design.fabrics[0]?.id || ""
  );
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(
    design.availableColors[0] || { name: "Default", hex: "#0B1528" }
  );
  const [quantity, setQuantity] = useState<number>(1);

  const selectedFabric =
    design.fabrics.find((f) => f.id === selectedFabricId) || design.fabrics[0];

  // Dynamic calculated price
  const unitPrice = design.startingPrice + (selectedFabric?.priceModifier || 0);
  const totalPrice = unitPrice * quantity;

  // Exact delivery date calculation
  const calculatedPromise = calculateGuaranteedDelivery(design.standardLeadDays);

  const handleStartOrder = () => {
    updateDraftOrder({
      designId: design.id,
      designName: design.name,
      fabricId: selectedFabric?.id,
      fabricName: selectedFabric?.name,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      quantity,
      unitPrice,
    });
    router.push("/order");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 pb-28 lg:pb-10 space-y-8">
      {/* Back Link */}
      <div>
        <Link
          href="/designs"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalogue</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery & Fabric details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative aspect-[3/4] bg-slate-200 rounded-md overflow-hidden border border-border-seam shadow-card">
            <img
              src={design.heroImage}
              alt={design.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="tape" size="md">
                {design.category}
              </Badge>
            </div>
          </div>

          {/* Delivery Promise Hero Card */}
          <DeliveryBanner
            date={calculatedPromise.deliveryDate}
            variant="hero"
            showGuaranteeCopy
          />
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2 border-b border-border-subtle pb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
              PrimeStitch Bespoke
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-primary tracking-tight">
              {design.name}
            </h1>
            <p className="text-sm text-text-muted text-pretty leading-relaxed">
              {design.description}
            </p>
          </div>

          {/* 1. Fabric Selection with GSM & Weave */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                1. Select Authenticated Fabric
              </label>
              <span className="text-[11px] text-text-muted font-mono">
                {selectedFabric?.gsm} GSM Weight
              </span>
            </div>

            <div className="space-y-2.5">
              {design.fabrics.map((fabric) => {
                const isSelected = fabric.id === selectedFabricId;
                return (
                  <div
                    key={fabric.id}
                    onClick={() => setSelectedFabricId(fabric.id)}
                    className={`p-3.5 rounded-sm border cursor-pointer transition-all select-none ${
                      isSelected
                        ? "bg-surface-card border-primary ring-2 ring-primary/20 shadow-subtle"
                        : "bg-surface-card border-border-seam hover:border-slate-400"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-primary">
                            {fabric.name}
                          </span>
                          <span className="text-[10px] font-mono bg-surface-muted px-2 py-0.5 rounded-sm text-text-muted border border-border-subtle">
                            {fabric.gsm} GSM
                          </span>
                        </div>
                        <p className="text-xs text-text-muted text-pretty">
                          {fabric.description}
                        </p>
                        <span className="text-[11px] font-mono text-secondary block pt-0.5">
                          Weave: {fabric.weave}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-xs font-bold text-primary tabular-nums">
                          {fabric.priceModifier > 0
                            ? `+${formatNaira(fabric.priceModifier)}`
                            : "Included"}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center ml-auto mt-1">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Color Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                2. Select Atelier Shade
              </label>
              <span className="text-xs font-mono text-primary font-bold">
                {selectedColor.name}
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {design.availableColors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`min-touch-target flex items-center gap-2 px-3 py-2 rounded-sm border text-xs font-mono transition-all ${
                      isSelected
                        ? "border-primary bg-primary text-white font-bold ring-2 ring-primary/20"
                        : "border-border-seam bg-surface-card text-on-surface hover:bg-surface-muted"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Quantity */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-primary block">
              3. Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border-seam rounded-sm bg-surface-card">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-sm font-bold hover:bg-surface-muted select-none"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-12 text-center font-mono font-bold text-sm tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-sm font-bold hover:bg-surface-muted select-none"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              {quantity >= 20 && (
                <span className="text-xs font-mono text-accent-emerald font-bold">
                  ✓ Bulk Aso Ebi pricing eligible
                </span>
              )}
            </div>
          </div>

          {/* Price Breakdown & Next Action */}
          <div className="bg-surface-muted p-5 rounded-md border border-border-seam space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono text-text-muted block">
                  Total Custom Investment
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-display text-primary tabular-nums">
                  {formatNaira(totalPrice)}
                </span>
              </div>
              <div className="text-right text-xs font-mono text-text-muted">
                <span>60% Deposit: </span>
                <strong className="text-primary tabular-nums">
                  {formatNaira(Math.round(totalPrice * 0.6))}
                </strong>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleStartOrder}
              className="w-full text-base font-bold shadow-raised"
              rightIcon={<Scissors className="w-4 h-4 -rotate-45" />}
            >
              Start My Order & Enter Measurements
            </Button>
            <p className="text-[11px] text-center text-text-muted font-mono">
              Delivery clock starts once measurements are confirmed.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-surface-card border-t-2 border-primary p-3 shadow-raised pb-safe">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <span className="text-[10px] font-mono uppercase text-text-muted block">
              Guaranteed {formatDate(calculatedPromise.deliveryDate)}
            </span>
            <span className="font-extrabold font-display text-primary text-lg tabular-nums">
              {formatNaira(totalPrice)}
            </span>
          </div>
          <Button size="md" onClick={handleStartOrder} className="font-bold">
            Start Order &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}

