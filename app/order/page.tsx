"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, calculateGuaranteedDelivery, formatDate } from "@/lib/utils";
import {
  Scissors,
  Check,
  ChevronRight,
  ArrowLeft,
  Calendar,
  MapPin,
  Ruler,
  User,
  ShieldCheck,
  HelpCircle,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { MeasurementInput } from "@/components/ui/MeasurementInput";
import { DeliveryBanner } from "@/components/ui/DeliveryBanner";

export default function OrderPage() {
  const router = useRouter();
  const {
    draftOrder,
    updateDraftOrder,
    designs,
    customerProfile,
  } = usePrimeStitch();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [unit, setUnit] = useState<"in" | "cm">(
    draftOrder.measurements?.unit || "in"
  );

  const selectedDesign =
    designs.find((d) => d.id === draftOrder.designId) || designs[0];

  // Delivery calculation based on lead days
  const deliveryCalc = calculateGuaranteedDelivery(selectedDesign.standardLeadDays);

  const itemTotal = (draftOrder.unitPrice || selectedDesign.startingPrice) * (draftOrder.quantity || 1);

  // Measurement updates handler
  const handleMeasurementChange = (field: string, val: number) => {
    updateDraftOrder({
      measurements: {
        unit,
        ...draftOrder.measurements,
        [field]: val,
      },
    });
  };

  const handleUnitToggle = (newUnit: "in" | "cm") => {
    setUnit(newUnit);
    // Convert current measurements roughly if needed
    const factor = newUnit === "cm" ? 2.54 : 1 / 2.54;
    const current = draftOrder.measurements || {};
    const converted: any = { unit: newUnit };
    for (const key of Object.keys(current)) {
      if (key !== "unit" && typeof (current as any)[key] === "number") {
        converted[key] = Number(((current as any)[key] * factor).toFixed(1));
      }
    }
    updateDraftOrder({ measurements: converted });
  };

  const handleUseSavedProfile = () => {
    updateDraftOrder({
      measurementMethod: "saved_profile",
      measurements: customerProfile.savedMeasurements,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Stepper Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-text-muted">
          <span>MADE-TO-MEASURE ORDER INTAKE</span>
          <span>STEP {step} OF 4</span>
        </div>

        {/* Stepper Indicator */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { num: 1, label: "Design" },
            { num: 2, label: "Measurements" },
            { num: 3, label: "Delivery" },
            { num: 4, label: "Review" },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              disabled={step < s.num}
              onClick={() => setStep(s.num as any)}
              className={`h-11 rounded-sm border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
                step === s.num
                  ? "bg-primary text-white border-primary shadow-subtle"
                  : step > s.num
                  ? "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/40"
                  : "bg-surface-card text-text-muted border-border-seam opacity-60"
              }`}
            >
              {step > s.num ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <span>0{s.num}</span>
              )}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: DESIGN & FABRIC RECAP */}
      {step === 1 && (
        <Card className="p-6 space-y-6">
          <div className="border-b border-border-subtle pb-4 space-y-1">
            <h2 className="text-xl font-bold font-display text-primary">
              Step 1: Confirm Outfit & Fabric Specs
            </h2>
            <p className="text-xs text-text-muted">
              Verify your chosen silhouette, textile weight, and color choice before entering measurements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-full sm:w-36 h-48 bg-slate-200 rounded-sm overflow-hidden shrink-0 border border-border-seam">
              <img
                src={selectedDesign.heroImage}
                alt={selectedDesign.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <span className="text-xs font-mono text-accent-tape bg-primary px-2 py-0.5 rounded-sm uppercase font-bold">
                  {selectedDesign.category}
                </span>
                <h3 className="text-xl font-bold font-display text-primary mt-1">
                  {draftOrder.designName || selectedDesign.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-surface-muted rounded-sm border border-border-subtle">
                  <span className="text-text-muted block text-[10px]">SELECTED FABRIC:</span>
                  <span className="font-bold text-primary">
                    {draftOrder.fabricName || selectedDesign.fabrics[0].name}
                  </span>
                </div>
                <div className="p-2.5 bg-surface-muted rounded-sm border border-border-subtle">
                  <span className="text-text-muted block text-[10px]">ATELIER SHADE:</span>
                  <div className="flex items-center gap-1.5 font-bold text-primary">
                    <span
                      className="w-3 h-3 rounded-full border border-black/20"
                      style={{ backgroundColor: draftOrder.colorHex || "#0B1528" }}
                    />
                    <span>{draftOrder.colorName || "Atelier Midnight"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-border-subtle">
                <span className="font-mono text-text-muted">Unit Price</span>
                <span className="font-bold font-mono text-primary text-base tabular-nums">
                  {formatNaira(draftOrder.unitPrice || selectedDesign.startingPrice)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 border-t border-border-subtle">
            <Link href={`/designs/${selectedDesign.id}`} className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Change Design / Fabric
              </Button>
            </Link>
            <Button size="md" onClick={() => setStep(2)} rightIcon={<ChevronRight className="w-4 h-4 shrink-0" />} className="w-full sm:w-auto">
              Proceed to Measurements
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: MEASUREMENTS (3 Paths) */}
      {step === 2 && (
        <Card className="p-6 space-y-6">
          <div className="border-b border-border-subtle pb-4 space-y-1">
            <h2 className="text-xl font-bold font-display text-primary">
              Step 2: Anatomical Measurements
            </h2>
            <p className="text-xs text-text-muted">
              Choose how you want to be measured. We do not use generic S/M/L sizing.
            </p>
          </div>

          {/* 3 Path Selection Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: "self",
                title: "Enter Measurements",
                desc: "Guided tape-measure input with anatomic tolerance checks.",
                icon: Ruler,
              },
              {
                id: "booked_measurer",
                title: "Book Lagos Measurer",
                desc: "A master fitter visits your home/office in Lagos.",
                icon: Scissors,
              },
              {
                id: "saved_profile",
                title: "Use Saved Profile",
                desc: `Existing profile for ${customerProfile.name}`,
                icon: User,
              },
            ].map((p) => {
              const isSelected = draftOrder.measurementMethod === p.id;
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    updateDraftOrder({ measurementMethod: p.id as any });
                    if (p.id === "saved_profile") handleUseSavedProfile();
                  }}
                  className={`p-4 rounded-sm border cursor-pointer transition-all select-none ${
                    isSelected
                      ? "bg-primary text-white border-primary shadow-subtle ring-2 ring-primary/20"
                      : "bg-surface-card text-on-surface border-border-seam hover:border-slate-400"
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-accent-tape" : "text-primary"}`} />
                  <h3 className="font-bold text-sm">{p.title}</h3>
                  <p className={`text-xs mt-1 ${isSelected ? "text-slate-300" : "text-text-muted"}`}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* PATH A: SELF-MEASURED */}
          {draftOrder.measurementMethod === "self" && (
            <div className="space-y-6 pt-4 border-t border-border-subtle">
              {/* Unit Toggle (Inches vs Centimeters) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-surface-muted p-3 rounded-sm">
                <span className="text-xs font-mono font-bold text-primary uppercase">
                  Measurement Unit:
                </span>
                <div className="flex border border-border-seam rounded-sm overflow-hidden font-mono text-xs w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleUnitToggle("in")}
                    className={`flex-1 sm:flex-initial px-3.5 py-1.5 font-bold transition-colors ${
                      unit === "in" ? "bg-primary text-white" : "bg-surface-card text-text-muted hover:bg-slate-100"
                    }`}
                  >
                    Inches (in)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitToggle("cm")}
                    className={`flex-1 sm:flex-initial px-3.5 py-1.5 font-bold transition-colors ${
                      unit === "cm" ? "bg-primary text-white" : "bg-surface-card text-text-muted hover:bg-slate-100"
                    }`}
                  >
                    Centimeters (cm)
                  </button>
                </div>
              </div>

              {/* Guided Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MeasurementInput
                  label="Chest / Bust"
                  field="chest"
                  unit={unit}
                  value={draftOrder.measurements?.chest}
                  min={unit === "in" ? 30 : 75}
                  max={unit === "in" ? 60 : 155}
                  hint="Measure horizontally around the fullest part of your chest, keeping tape level."
                  onChange={(val) => handleMeasurementChange("chest", val)}
                  required
                />
                <MeasurementInput
                  label="Shoulder Breadth"
                  field="shoulder"
                  unit={unit}
                  value={draftOrder.measurements?.shoulder}
                  min={unit === "in" ? 14 : 35}
                  max={unit === "in" ? 25 : 65}
                  hint="Measure across the top of back from tip of left shoulder bone to right shoulder bone."
                  onChange={(val) => handleMeasurementChange("shoulder", val)}
                  required
                />
                <MeasurementInput
                  label="Sleeve Length"
                  field="sleeveLength"
                  unit={unit}
                  value={draftOrder.measurements?.sleeveLength}
                  min={unit === "in" ? 20 : 50}
                  max={unit === "in" ? 40 : 100}
                  hint="Measure from shoulder point down past elbow to wrist bone."
                  onChange={(val) => handleMeasurementChange("sleeveLength", val)}
                  required
                />
                <MeasurementInput
                  label="Neck Circumference"
                  field="neck"
                  unit={unit}
                  value={draftOrder.measurements?.neck}
                  min={unit === "in" ? 13 : 33}
                  max={unit === "in" ? 22 : 56}
                  hint="Measure around base of neck where shirt collar sits. Allow two fingers room."
                  onChange={(val) => handleMeasurementChange("neck", val)}
                  required
                />
                <MeasurementInput
                  label="Waistline"
                  field="waist"
                  unit={unit}
                  value={draftOrder.measurements?.waist}
                  min={unit === "in" ? 26 : 65}
                  max={unit === "in" ? 56 : 145}
                  hint="Measure around natural waistline where trouser waistband sits."
                  onChange={(val) => handleMeasurementChange("waist", val)}
                  required
                />
                <MeasurementInput
                  label="Trouser Outseam Length"
                  field="trouserLength"
                  unit={unit}
                  value={draftOrder.measurements?.trouserLength}
                  min={unit === "in" ? 36 : 90}
                  max={unit === "in" ? 50 : 130}
                  hint="Measure from top of waistband down the outside leg to desired shoe break."
                  onChange={(val) => handleMeasurementChange("trouserLength", val)}
                  required
                />
              </div>
            </div>
          )}

          {/* PATH B: BOOKED MEASURER */}
          {draftOrder.measurementMethod === "booked_measurer" && (
            <div className="space-y-4 pt-4 border-t border-border-subtle bg-surface-muted p-4 rounded-sm">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Scissors className="w-4 h-4 text-secondary -rotate-45" />
                <span>Mobile Fitter Direct Booking</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                A certified PrimeStitch master fitter will visit your address in Lagos equipped with professional laser and cloth measuring tapes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-mono text-text-muted block">VENUE TYPE:</label>
                  <select
                    value={draftOrder.bookingDetails?.venueType || "home"}
                    onChange={(e) =>
                      updateDraftOrder({
                        bookingDetails: {
                          ...draftOrder.bookingDetails,
                          venueType: e.target.value as any,
                          address: draftOrder.bookingDetails?.address || "",
                          area: draftOrder.bookingDetails?.area || "Lekki Phase 1",
                          date: draftOrder.bookingDetails?.date || "2026-10-30",
                          timeSlot: draftOrder.bookingDetails?.timeSlot || "11:00 AM - 12:30 PM",
                        },
                      })
                    }
                    className="w-full h-10 px-3 border border-border-seam rounded-sm bg-surface-card"
                  >
                    <option value="home">Home Fitting</option>
                    <option value="office">Office / Workplace</option>
                    <option value="event_venue">Event Venue / Hotel</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-text-muted block">LAGOS COVERAGE AREA:</label>
                  <select
                    value={draftOrder.bookingDetails?.area || "Lekki Phase 1"}
                    onChange={(e) =>
                      updateDraftOrder({
                        bookingDetails: {
                          ...draftOrder.bookingDetails,
                          area: e.target.value,
                          venueType: draftOrder.bookingDetails?.venueType || "home",
                          address: draftOrder.bookingDetails?.address || "",
                          date: draftOrder.bookingDetails?.date || "2026-10-30",
                          timeSlot: draftOrder.bookingDetails?.timeSlot || "11:00 AM - 12:30 PM",
                        },
                      })
                    }
                    className="w-full h-10 px-3 border border-border-seam rounded-sm bg-surface-card"
                  >
                    <option value="Lekki Phase 1">Lekki Phase 1 / Oniru</option>
                    <option value="Ikoyi">Ikoyi / Banana Island</option>
                    <option value="Victoria Island">Victoria Island</option>
                    <option value="Ikeja GRA">Ikeja GRA / Maryland</option>
                    <option value="Yaba">Yaba / Surulere</option>
                    <option value="Ajah">Ajah / Sangotedo</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-surface-card rounded-sm border border-border-subtle text-xs text-text-muted font-mono flex items-center justify-between">
                <span>Fitting Session Fee:</span>
                <span className="font-bold text-accent-emerald">
                  {itemTotal >= 100000 ? "FREE (Orders > ₦100k)" : "₦5,000"}
                </span>
              </div>
            </div>
          )}

          {/* PATH C: SAVED PROFILE */}
          {draftOrder.measurementMethod === "saved_profile" && (
            <div className="space-y-4 pt-4 border-t border-border-subtle">
              <div className="p-4 bg-surface-muted rounded-sm border border-border-seam space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase text-text-muted">
                      Loaded Fit Profile
                    </span>
                    <h3 className="font-bold text-primary text-base">
                      {customerProfile.name}
                    </h3>
                  </div>
                  <Badge variant="verified" size="sm">
                    Verified Fit
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div className="bg-surface-card p-2 rounded-sm border border-border-subtle">
                    <span className="text-text-muted block text-[10px]">CHEST</span>
                    <span className="font-bold text-primary">
                      {customerProfile.savedMeasurements.chest} in
                    </span>
                  </div>
                  <div className="bg-surface-card p-2 rounded-sm border border-border-subtle">
                    <span className="text-text-muted block text-[10px]">SHOULDER</span>
                    <span className="font-bold text-primary">
                      {customerProfile.savedMeasurements.shoulder} in
                    </span>
                  </div>
                  <div className="bg-surface-card p-2 rounded-sm border border-border-subtle">
                    <span className="text-text-muted block text-[10px]">WAIST</span>
                    <span className="font-bold text-primary">
                      {customerProfile.savedMeasurements.waist} in
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-text-muted font-mono">
                  Recorded by {customerProfile.savedMeasurements.verifiedBy} on{" "}
                  {customerProfile.savedMeasurements.recordedAt}.
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-between items-center border-t border-border-subtle">
            <Button variant="outline" size="sm" onClick={() => setStep(1)}>
              &larr; Back
            </Button>
            <Button size="md" onClick={() => setStep(3)} rightIcon={<ChevronRight className="w-4 h-4" />}>
              Proceed to Delivery Address
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: DELIVERY DETAILS & EVENT DATE */}
      {step === 3 && (
        <Card className="p-6 space-y-6">
          <div className="border-b border-border-subtle pb-4 space-y-1">
            <h2 className="text-xl font-bold font-display text-primary">
              Step 3: Delivery Address & Event Timeline
            </h2>
            <p className="text-xs text-text-muted">
              Where should our priority dispatcher deliver your outfit in Lagos?
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-xs">
                <label className="font-medium text-on-surface">Recipient Full Name *</label>
                <input
                  type="text"
                  value={draftOrder.customerName || customerProfile.name}
                  onChange={(e) => updateDraftOrder({ customerName: e.target.value })}
                  placeholder="e.g. Oluwaseun Balogun"
                  className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card"
                />
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-medium text-on-surface">Phone Number (WhatsApp Active) *</label>
                <input
                  type="tel"
                  value={draftOrder.customerPhone || customerProfile.phone}
                  onChange={(e) => updateDraftOrder({ customerPhone: e.target.value })}
                  placeholder="e.g. +234 803 000 0000"
                  className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-medium text-on-surface">Delivery Street Address (Lagos) *</label>
              <textarea
                rows={2}
                value={draftOrder.deliveryAddress || "Plot 14 Admiralty Way, Lekki Phase 1, Lagos"}
                onChange={(e) => updateDraftOrder({ deliveryAddress: e.target.value })}
                placeholder="Street address, building number, gate code, landmarks..."
                className="w-full p-3 border border-border-seam rounded-sm bg-surface-card"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-xs">
                <label className="font-medium text-on-surface">Specific Event / Occasion Date (Optional)</label>
                <input
                  type="date"
                  value={draftOrder.eventDate || ""}
                  onChange={(e) => updateDraftOrder({ eventDate: e.target.value })}
                  className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card font-mono"
                />
                <span className="text-[11px] text-text-muted">
                  Helps our master cutter coordinate earlier dispatch if available.
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-medium text-on-surface">Reference Photo or Style Inspiration</label>
                <div className="border border-dashed border-border-seam p-3 rounded-sm flex items-center justify-between bg-surface-muted">
                  <div className="flex items-center gap-2 text-text-muted">
                    <Upload className="w-4 h-4 text-primary" />
                    <span>Upload reference image</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      updateDraftOrder({
                        referencePhotoUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400",
                      })
                    }
                    className="text-[11px] font-mono text-primary font-bold hover:underline"
                  >
                    {draftOrder.referencePhotoUrl ? "✓ Image Attached" : "Attach Sample Photo"}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-medium text-on-surface">Special Tailoring Notes</label>
              <input
                type="text"
                value={draftOrder.notes || ""}
                onChange={(e) => updateDraftOrder({ notes: e.target.value })}
                placeholder="e.g. Prefer snug cuffs, high collar, 2 inches cuff break on trousers..."
                className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-border-subtle">
            <Button variant="outline" size="sm" onClick={() => setStep(2)}>
              &larr; Back
            </Button>
            <Button size="md" onClick={() => setStep(4)} rightIcon={<ChevronRight className="w-4 h-4" />}>
              Review Order & Date SLA
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 4: REVIEW & PROCEED TO CHECKOUT */}
      {step === 4 && (
        <Card className="p-6 space-y-6">
          <div className="border-b border-border-subtle pb-4 space-y-1">
            <h2 className="text-xl font-bold font-display text-primary">
              Step 4: Final Atelier Review
            </h2>
            <p className="text-xs text-text-muted">
              Confirm your bespoke configuration and lock in your delivery date commitment.
            </p>
          </div>

          {/* Prominent Guaranteed Delivery Banner */}
          <DeliveryBanner
            date={deliveryCalc.deliveryDate}
            variant="hero"
            showGuaranteeCopy
          />

          {/* Order Summary Grid */}
          <div className="bg-surface-muted p-4 rounded-sm border border-border-seam space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div>
                <span className="font-bold text-sm text-primary">
                  {draftOrder.designName || selectedDesign.name}
                </span>
                <span className="block text-text-muted">
                  {draftOrder.fabricName || selectedDesign.fabrics[0].name} • {draftOrder.colorName}
                </span>
              </div>
              <span className="font-mono text-sm font-bold text-primary tabular-nums">
                {formatNaira(itemTotal)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-text-muted font-mono">
              <div>
                <strong className="text-primary block font-sans">Measurement Method:</strong>
                <span className="capitalize">{draftOrder.measurementMethod?.replace("_", " ")}</span>
              </div>
              <div>
                <strong className="text-primary block font-sans">Delivery Address:</strong>
                <span>{draftOrder.deliveryAddress || "Lagos, Nigeria"}</span>
              </div>
            </div>

            {/* Deposit vs Full Payment selector */}
            <div className="pt-3 border-t border-border-subtle space-y-2">
              <label className="font-bold text-primary block font-sans">
                Select Payment Structure:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateDraftOrder({ paymentTier: "deposit_60" })}
                  className={`p-3 rounded-sm border text-left transition-all ${
                    draftOrder.paymentTier === "deposit_60"
                      ? "bg-primary text-white border-primary shadow-subtle"
                      : "bg-surface-card border-border-seam text-on-surface"
                  }`}
                >
                  <span className="font-bold block text-sm">60% Custom Deposit</span>
                  <span className="font-mono text-xs tabular-nums block mt-1">
                    Pay {formatNaira(Math.round(itemTotal * 0.6))} now
                  </span>
                  <span className="text-[10px] opacity-80 block">
                    Balance ({formatNaira(itemTotal - Math.round(itemTotal * 0.6))}) on delivery
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => updateDraftOrder({ paymentTier: "full_100" })}
                  className={`p-3 rounded-sm border text-left transition-all ${
                    draftOrder.paymentTier === "full_100"
                      ? "bg-primary text-white border-primary shadow-subtle"
                      : "bg-surface-card border-border-seam text-on-surface"
                  }`}
                >
                  <span className="font-bold block text-sm">100% Full Payment</span>
                  <span className="font-mono text-xs tabular-nums block mt-1">
                    Pay {formatNaira(itemTotal)} now
                  </span>
                  <span className="text-[10px] text-accent-emerald font-semibold block">
                    ✓ Priority cutter allocation
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 border-t border-border-subtle">
            <Button variant="outline" size="sm" onClick={() => setStep(3)} className="w-full sm:w-auto">
              &larr; Back to Delivery
            </Button>
            <Link href="/checkout" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto font-bold shadow-raised whitespace-normal py-3 h-auto text-center" rightIcon={<ShieldCheck className="w-5 h-5 text-accent-tape shrink-0" />}>
                Proceed to Secure Checkout & Lock Date
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}

