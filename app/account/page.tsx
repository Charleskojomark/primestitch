"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, formatDate } from "@/lib/utils";
import {
  User,
  Ruler,
  Clock,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Scissors,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function CustomerAccountPage() {
  const { customerProfile, orders, updateDraftOrder, resetAllToSeed } = usePrimeStitch();

  const [activeTab, setActiveTab] = useState<"measurements" | "orders">("measurements");

  // Check if last measured is older than 6 months
  const lastMeasured = new Date(customerProfile.lastMeasuredDate);
  const now = new Date("2026-10-29"); // Current app time
  const diffMonths =
    (now.getFullYear() - lastMeasured.getFullYear()) * 12 +
    (now.getMonth() - lastMeasured.getMonth());

  const isOlderThan6Months = diffMonths >= 6;

  const handleReorder = (order: any) => {
    const item = order.items[0];
    updateDraftOrder({
      designId: item?.designId,
      designName: item?.designName,
      fabricId: item?.fabricId,
      fabricName: item?.fabricName,
      colorName: item?.colorName,
      colorHex: item?.colorHex,
      quantity: 1,
      unitPrice: item?.unitPrice,
      measurementMethod: "saved_profile",
      measurements: customerProfile.savedMeasurements,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Account Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-seam pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary text-accent-tape flex items-center justify-center font-bold text-xl font-display shadow-subtle shrink-0">
            {customerProfile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-display text-primary">
                {customerProfile.name}
              </h1>
              <Badge variant="verified" size="sm">
                Verified Fit Profile
              </Badge>
            </div>
            <p className="text-xs text-text-muted font-mono mt-0.5">
              {customerProfile.phone} • {customerProfile.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={resetAllToSeed}
          className="text-[11px] font-mono text-text-muted hover:text-error underline self-start sm:self-auto"
        >
          Reset Demo Data to Seed
        </button>
      </div>

      {/* 6-Month Re-Measure Warning Banner */}
      {isOlderThan6Months && (
        <div className="p-4 bg-amber-500/10 border-2 border-amber-500 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-amber-500 text-white rounded-sm shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-xs">
              <strong className="text-amber-800 font-bold block uppercase font-mono">
                Re-Measurement Recommended ({diffMonths} Months Since Last Tailor Fit)
              </strong>
              <p className="text-on-surface">
                Body measurements naturally fluctuate over 6 months. To guarantee a razor-sharp cut for your next outfit, we recommend booking a quick refresher fitting.
              </p>
            </div>
          </div>
          <Link href="/measurement/book" className="shrink-0">
            <Button variant="tape" size="sm" className="font-bold">
              Book Refresher Fitting &rarr;
            </Button>
          </Link>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-border-seam text-xs font-mono">
        <button
          type="button"
          onClick={() => setActiveTab("measurements")}
          className={`px-5 py-2.5 font-bold border-b-2 transition-colors ${
            activeTab === "measurements"
              ? "border-primary text-primary"
              : "border-transparent text-text-muted hover:text-primary"
          }`}
        >
          Saved Measurements Profile
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className={`px-5 py-2.5 font-bold border-b-2 transition-colors ${
            activeTab === "orders"
              ? "border-primary text-primary"
              : "border-transparent text-text-muted hover:text-primary"
          }`}
        >
          My Orders History ({orders.length})
        </button>
      </div>

      {/* TAB 1: SAVED MEASUREMENTS */}
      {activeTab === "measurements" && (
        <Card className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-text-muted uppercase">
                Active Anatomic Specification
              </span>
              <h3 className="text-lg font-bold font-display text-primary">
                Precision Measurements (Inches)
              </h3>
            </div>
            <span className="text-xs font-mono text-text-muted">
              Last verified: {customerProfile.savedMeasurements.recordedAt} by{" "}
              {customerProfile.savedMeasurements.verifiedBy}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            {[
              { label: "Chest Circumference", val: customerProfile.savedMeasurements.chest },
              { label: "Shoulder Breadth", val: customerProfile.savedMeasurements.shoulder },
              { label: "Sleeve Length", val: customerProfile.savedMeasurements.sleeveLength },
              { label: "Neck Circumference", val: customerProfile.savedMeasurements.neck },
              { label: "Waistline", val: customerProfile.savedMeasurements.waist },
              { label: "Trouser Outseam", val: customerProfile.savedMeasurements.trouserLength },
              { label: "Hips Circumference", val: customerProfile.savedMeasurements.hips },
              { label: "Bicep", val: customerProfile.savedMeasurements.bicep },
            ].map((m, i) => (
              <div key={i} className="p-3 bg-surface-muted rounded-sm border border-border-subtle space-y-1">
                <span className="text-[10px] text-text-muted uppercase block">{m.label}</span>
                <span className="text-base font-bold text-primary tabular-nums">
                  {m.val} in
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row gap-3">
            <Link href="/designs" className="flex-1">
              <Button size="md" className="w-full">
                Order a New Outfit With This Profile &rarr;
              </Button>
            </Link>
            <Link href="/measurement/book">
              <Button variant="outline" size="md">
                Update Fit In-Person
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* TAB 2: PAST ORDERS & REORDER */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {orders.map((ord) => (
            <Card key={ord.id} className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-primary">
                      {ord.id}
                    </span>
                    <Badge
                      variant={ord.isLate ? "error" : ord.isAtRisk ? "tape" : "verified"}
                      size="sm"
                    >
                      {ord.status}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-primary text-base">
                    {ord.items[0]?.designName} ({ord.items[0]?.fabricName})
                  </h4>
                </div>

                <div className="text-left sm:text-right text-xs font-mono">
                  <span className="text-text-muted block">Guaranteed Delivery:</span>
                  <strong className="text-primary font-bold">
                    {formatDate(ord.guaranteedDeliveryDate)}
                  </strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="text-text-muted">
                  Total: <strong className="text-primary tabular-nums">{formatNaira(ord.totalAmount)}</strong> • {ord.paymentStatus === "fully_paid" ? "Paid in Full" : "60% Deposit Paid"}
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/track/${ord.id}`}>
                    <Button variant="outline" size="sm">
                      Track Live Bench
                    </Button>
                  </Link>

                  <Link href="/order" onClick={() => handleReorder(ord)}>
                    <Button variant="primary" size="sm" leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
                      Reorder This Fit
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

