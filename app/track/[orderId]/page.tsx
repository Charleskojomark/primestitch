"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, formatDate } from "@/lib/utils";
import {
  Scissors,
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  User,
  MapPin,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DeliveryBanner } from "@/components/ui/DeliveryBanner";
import { StatusTracker } from "@/components/ui/StatusTracker";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function OrderTrackingDetailPage() {
  const params = useParams();
  const { orders } = usePrimeStitch();

  const decodedId = decodeURIComponent(params.orderId as string);
  const targetId = decodedId.startsWith("#") ? decodedId : `#${decodedId}`;

  const order = orders.find((o) => o.id === targetId);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-error mx-auto" />
        <h1 className="text-2xl font-bold font-display text-primary">Order Not Found</h1>
        <p className="text-sm text-text-muted">
          We could not find an active tailoring record for "{targetId}". Please verify your order ID.
        </p>
        <Link href="/track">
          <Button variant="primary" size="md">
            &larr; Return to Tracking Lookup
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/track"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Look Up Another Order</span>
        </Link>
      </div>

      {/* Hero Delivery Banner */}
      <DeliveryBanner
        date={order.guaranteedDeliveryDate}
        variant="hero"
        showGuaranteeCopy
      />

      {/* Main Tracker Container */}
      <Card className="p-6 md:p-8 space-y-8">
        {/* Order Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-primary">
                {order.id}
              </span>
              <Badge
                variant={order.isLate ? "error" : order.isAtRisk ? "tape" : "verified"}
                size="sm"
              >
                {order.isLate ? "🚨 LATE" : order.isAtRisk ? "⚠️ AT RISK" : "ON SCHEDULE"}
              </Badge>
            </div>
            <h2 className="text-lg font-bold font-display text-primary">
              {order.items[0]?.designName} ({order.items[0]?.fabricName})
            </h2>
            <p className="text-xs text-text-muted font-mono">
              Ordered by {order.customerName} on {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <WhatsAppButton orderId={order.id} label="Chat with Bench Tailor" />
          </div>
        </div>

        {/* 9-Stage Tracker Component */}
        <StatusTracker
          currentStage={order.status}
          history={order.history}
          assignedTailorName={order.assignedTailorName}
          isAtRisk={order.isAtRisk}
          isLate={order.isLate}
        />

        {/* Garment Details & Delivery Address Accordion */}
        <div className="pt-6 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-surface-muted rounded-sm border border-border-subtle space-y-2">
            <span className="font-bold text-primary uppercase text-[11px] block font-sans">
              Garment Specifications
            </span>
            <div className="space-y-1 text-text-muted">
              <div>Design: <strong className="text-primary">{order.items[0]?.designName}</strong></div>
              <div>Fabric: <strong className="text-primary">{order.items[0]?.fabricName}</strong></div>
              <div>Shade: <strong className="text-primary">{order.items[0]?.colorName}</strong></div>
              <div>Total: <strong className="text-primary tabular-nums">{formatNaira(order.totalAmount)}</strong> ({order.paymentStatus === "fully_paid" ? "Fully Paid" : "60% Deposit Paid"})</div>
            </div>
          </div>

          <div className="p-4 bg-surface-muted rounded-sm border border-border-subtle space-y-2">
            <span className="font-bold text-primary uppercase text-[11px] block font-sans">
              Destination & Handover
            </span>
            <div className="space-y-1 text-text-muted">
              <div>Address: <strong className="text-primary">{order.deliveryAddress}</strong></div>
              <div>Area: <strong className="text-primary">{order.deliveryArea}</strong></div>
              <div>Contact Phone: <strong className="text-primary">{order.customerPhone}</strong></div>
              <div>Handover Window: <strong className="text-accent-emerald">2:00 PM – 4:00 PM WAT</strong></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

