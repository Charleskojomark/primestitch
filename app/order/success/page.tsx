"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import {
  CheckCircle,
  Clock,
  Scissors,
  ArrowRight,
  ShieldCheck,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DeliveryBanner } from "@/components/ui/DeliveryBanner";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "#PS-8492";
  const { orders } = usePrimeStitch();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-16 space-y-8 animate-fadeIn">
      <Card hasTapeTop className="p-8 text-center space-y-6">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-accent-emerald text-white flex items-center justify-center mx-auto shadow-raised">
          <CheckCircle className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <Badge variant="verified" size="md">
            Order Authorized • {order.id}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-primary tracking-tight">
            Your Bespoke Order is Locked In
          </h1>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto text-pretty leading-relaxed">
            Thank you, {order.customerName}. Your fabric has been reserved in our cutting room and assigned to a master tailor.
          </p>
        </div>

        {/* Guaranteed Delivery Date Banner */}
        <DeliveryBanner
          date={order.guaranteedDeliveryDate}
          variant="hero"
          showGuaranteeCopy
        />

        {/* Assigned Tailor Info */}
        <div className="p-4 bg-surface-muted rounded-md border border-border-seam flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-accent-tape flex items-center justify-center shrink-0">
              <Scissors className="w-5 h-5 -rotate-45" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-text-muted block">
                Assigned Master Tailor
              </span>
              <strong className="text-primary font-bold text-sm">
                {order.assignedTailorName || "Master Tunde Adeleke"}
              </strong>
            </div>
          </div>
          <Badge variant="neutral" size="sm">
            Bench #3 Lekki
          </Badge>
        </div>

        {/* 3 Next Steps */}
        <div className="text-left space-y-2 pt-2 border-t border-border-subtle text-xs">
          <span className="font-mono text-text-muted uppercase tracking-wider block font-bold">
            What Happens Now:
          </span>
          <div className="space-y-2 text-on-surface">
            <div className="flex items-start gap-2">
              <span className="font-mono font-bold text-accent-emerald">1.</span>
              <span>Our master cutter validates your anatomic measurements against fabric warp and weft.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono font-bold text-accent-emerald">2.</span>
              <span>Fabric is sheared on our cutting tables; stage moves to <strong>Cutting</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono font-bold text-accent-emerald">3.</span>
              <span>You receive automated WhatsApp photo updates at each completed stage.</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Link href={`/track/${order.id}`} className="flex-1">
            <Button size="lg" className="w-full font-bold shadow-raised" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open 9-Stage Live Tracker
            </Button>
          </Link>
          <WhatsAppButton orderId={order.id} label="WhatsApp Tailor Concierge" />
        </div>
      </Card>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono">Loading order confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

