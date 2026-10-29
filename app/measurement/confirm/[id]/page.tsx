"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, calculateGuaranteedDelivery, formatDate } from "@/lib/utils";
import {
  Scissors,
  CheckCircle,
  Clock,
  ShieldCheck,
  Ruler,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DeliveryBanner } from "@/components/ui/DeliveryBanner";

export default function ConfirmMeasurementPage() {
  const params = useParams();
  const router = useRouter();
  const { orders, confirmOrderMeasurements } = usePrimeStitch();

  // Find order by ID (e.g. PS-8493 or #PS-8493)
  const decodedId = decodeURIComponent(params.id as string);
  const targetId = decodedId.startsWith("#") ? decodedId : `#${decodedId}`;

  const order = orders.find((o) => o.id === targetId) || orders[0];

  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmedSuccess, setConfirmedSuccess] = useState(false);

  // Delivery date calculated starting today upon confirmation
  const deliveryCalc = calculateGuaranteedDelivery(7);

  const measurements = order.items[0]?.measurements || {
    unit: "in" as const,
    chest: 42,
    shoulder: 19,
    sleeveLength: 35,
    neck: 16.5,
    waist: 36,
    trouserLength: 42,
    thigh: 24,
    bicep: 15,
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      confirmOrderMeasurements(order.id, measurements);
      setIsConfirming(false);
      setConfirmedSuccess(true);
    }, 400);
  };

  if (confirmedSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-6 text-center animate-fadeIn">
        <Card hasTapeTop className="p-8 space-y-6">
          <div className="w-16 h-16 rounded-full bg-accent-emerald text-white flex items-center justify-center mx-auto shadow-raised">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <Badge variant="verified" size="md">
              Order {order.id} • Confirmed
            </Badge>
            <h1 className="text-3xl font-extrabold font-display text-primary">
              Measurements Locked & Production Started
            </h1>
            <p className="text-sm text-text-muted max-w-md mx-auto text-pretty">
              Your exact measurements have been approved by the master cutter. The atelier delivery clock is officially ticking.
            </p>
          </div>

          <DeliveryBanner
            date={deliveryCalc.deliveryDate}
            variant="hero"
            showGuaranteeCopy
          />

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link href={`/track/${order.id}`} className="flex-1">
              <Button size="lg" className="w-full font-bold">
                Watch 9-Stage Live Tracker &rarr;
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="tape" size="sm">
            Critical Step • Order {order.id}
          </Badge>
          <span className="text-xs font-mono text-text-muted">FINAL VERIFICATION</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-primary tracking-tight">
          Review & Lock Your Measurements
        </h1>
        <p className="text-sm text-text-muted text-pretty">
          Please review the recorded anatomical dimensions below before giving final authorization.
        </p>
      </div>

      {/* Critical SLA Promise Box */}
      <div className="p-4 bg-primary text-white rounded-md border-l-4 border-l-accent-tape space-y-1.5 shadow-subtle">
        <div className="flex items-center gap-2 text-accent-tape font-mono text-xs uppercase font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Atelier Delivery SLA Contract</span>
        </div>
        <p className="text-sm font-semibold text-white">
          "Your delivery date is locked once you confirm. The delivery clock starts at confirmation, not at order placement."
        </p>
        <p className="text-xs text-slate-300">
          Once confirmed, cutting shears touch the fabric within 4 hours. No further sizing adjustments can be made without altering production schedule.
        </p>
      </div>

      {/* Measurements Table Card */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <div className="space-y-0.5">
            <span className="text-xs font-mono uppercase text-text-muted">
              Garment Silhouette
            </span>
            <h3 className="font-bold text-lg font-display text-primary">
              {order.items[0]?.designName} ({order.items[0]?.fabricName})
            </h3>
          </div>
          <Badge variant="outline" size="sm">
            Unit: {measurements.unit === "in" ? "Inches" : "Centimeters"}
          </Badge>
        </div>

        {/* Measurement Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Chest Circumference", val: measurements.chest },
            { label: "Shoulder Breadth", val: measurements.shoulder },
            { label: "Sleeve Length", val: measurements.sleeveLength },
            { label: "Neck Circumference", val: measurements.neck },
            { label: "Waistline", val: measurements.waist },
            { label: "Trouser Outseam", val: measurements.trouserLength },
            { label: "Thigh", val: measurements.thigh },
            { label: "Hips", val: measurements.hips },
            { label: "Bicep", val: measurements.bicep },
          ]
            .filter((m) => m.val !== undefined && m.val > 0)
            .map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-surface-muted rounded-sm border border-border-subtle space-y-1"
              >
                <span className="text-[10px] font-mono uppercase text-text-muted block">
                  {item.label}
                </span>
                <span className="text-lg font-bold font-mono text-primary tabular-nums">
                  {item.val} {measurements.unit}
                </span>
              </div>
            ))}
        </div>

        {/* Future Guaranteed Delivery Date preview */}
        <div className="pt-2">
          <DeliveryBanner
            date={deliveryCalc.deliveryDate}
            variant="card"
            showGuaranteeCopy
          />
        </div>

        {/* Confirmation CTA Button */}
        <div className="pt-4 border-t border-border-subtle space-y-3">
          <Button
            size="lg"
            isLoading={isConfirming}
            onClick={handleConfirm}
            className="w-full text-base font-bold shadow-raised"
            rightIcon={<CheckCircle className="w-5 h-5 text-accent-tape" />}
          >
            Confirm My Measurements & Lock Delivery Date
          </Button>

          <p className="text-[11px] text-center text-text-muted font-mono">
            By confirming, you authorize our cutting team to begin shearing your fabric.
          </p>
        </div>
      </Card>
    </div>
  );
}

