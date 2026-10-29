"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, formatDate } from "@/lib/utils";
import {
  Scissors,
  ArrowLeft,
  CheckCircle,
  Clock,
  User,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DeliveryBanner } from "@/components/ui/DeliveryBanner";
import { STAGES, Stage } from "@/lib/types";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const { orders, tailors, updateOrderStatus, assignTailorToOrder } = usePrimeStitch();

  const decodedId = decodeURIComponent(params.id as string);
  const targetId = decodedId.startsWith("#") ? decodedId : `#${decodedId}`;

  const order = orders.find((o) => o.id === targetId) || orders[0];

  const [selectedTailor, setSelectedTailor] = useState(order.assignedTailorId || tailors[0].id);
  const [stageNote, setStageNote] = useState("");
  const [successToast, setSuccessToast] = useState("");

  const currentStageIndex = STAGES.indexOf(order.status);
  const nextStage = STAGES[currentStageIndex + 1] as Stage | undefined;

  const handleAdvance = (stageToAdvance: Stage) => {
    updateOrderStatus(order.id, stageToAdvance, stageNote);
    setStageNote("");
    setSuccessToast(`Stage successfully advanced to ${stageToAdvance}`);
    setTimeout(() => setSuccessToast(""), 3000);
  };

  const handleReassign = () => {
    assignTailorToOrder(order.id, selectedTailor);
    const t = tailors.find((tl) => tl.id === selectedTailor);
    setSuccessToast(`Order reassigned to ${t?.name}`);
    setTimeout(() => setSuccessToast(""), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Orders</span>
        </Link>
      </div>

      {successToast && (
        <div className="p-3 bg-accent-emerald text-white rounded-sm text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 stroke-[3]" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-seam pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xl font-bold text-primary">
              {order.id}
            </span>
            <Badge
              variant={order.isLate ? "error" : order.isAtRisk ? "tape" : "verified"}
              size="sm"
            >
              {order.status}
            </Badge>
          </div>
          <h1 className="text-xl font-bold font-display text-primary">
            {order.items[0]?.designName} ({order.items[0]?.fabricName})
          </h1>
          <p className="text-xs text-text-muted font-mono">
            Customer: {order.customerName} ({order.customerPhone}) • Ordered: {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="text-right">
          <DeliveryBanner date={order.guaranteedDeliveryDate} variant="compact" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stage Controls & Tailor Assignment (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Stage Progression Controller */}
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-primary border-b border-border-subtle pb-2">
              Advance Production Stage
            </h2>

            <div className="p-3 bg-surface-muted rounded-sm border border-border-subtle flex items-center justify-between text-xs font-mono">
              <span className="text-text-muted">Current Stage:</span>
              <strong className="text-primary text-sm uppercase">{order.status}</strong>
            </div>

            {nextStage ? (
              <div className="space-y-3 pt-2">
                <div className="space-y-1 text-xs">
                  <label className="font-mono text-text-muted block">
                    Bench Audit Log Note for this Stage Advance:
                  </label>
                  <input
                    type="text"
                    value={stageNote}
                    onChange={(e) => setStageNote(e.target.value)}
                    placeholder={`e.g. Completed ${order.status}; passed 14-point audit...`}
                    className="w-full h-10 px-3 border border-border-seam rounded-sm bg-surface-card text-xs font-mono"
                  />
                </div>

                <Button
                  size="lg"
                  onClick={() => handleAdvance(nextStage)}
                  className="w-full font-bold shadow-raised"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Advance Order to Stage: {nextStage}
                </Button>
              </div>
            ) : (
              <div className="p-3 bg-accent-emerald/10 text-accent-emerald rounded-sm text-xs font-mono font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Order has reached final stage: Delivered</span>
              </div>
            )}

            {/* Jump to any stage selector for manual override */}
            <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
              <span className="text-text-muted">Or override to stage:</span>
              <div className="flex gap-1.5">
                {STAGES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleAdvance(s)}
                    disabled={s === order.status}
                    className={`px-2 py-1 rounded-sm border text-[10px] ${
                      s === order.status
                        ? "bg-primary text-white font-bold opacity-60"
                        : "bg-surface-card text-text-muted hover:border-primary"
                    }`}
                  >
                    {s.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Master Tailor Assignment with Live Workload */}
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-primary border-b border-border-subtle pb-2">
              Assign Bench Tailor
            </h2>

            <div className="space-y-2 text-xs">
              <label className="font-mono text-text-muted block">
                Select Tailor (Live Active Capacity):
              </label>
              <select
                value={selectedTailor}
                onChange={(e) => setSelectedTailor(e.target.value)}
                className="w-full h-11 px-3 border border-border-seam rounded-sm bg-surface-card font-mono text-xs"
              >
                {tailors.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {t.specialty} ({t.currentWorkload}/{t.maxCapacity} active)
                  </option>
                ))}
              </select>
            </div>

            <Button variant="outline" size="sm" onClick={handleReassign} className="w-full">
              Update Tailor Assignment
            </Button>
          </Card>

          {/* Anatomic Measurements on Record */}
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-primary border-b border-border-subtle pb-2">
              Cut Dimensions on Record
            </h2>

            {order.items[0]?.measurements ? (
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                {Object.entries(order.items[0].measurements)
                  .filter(([k, v]) => k !== "unit" && typeof v === "number")
                  .map(([k, v]) => (
                    <div key={k} className="p-2 bg-surface-muted rounded-sm border border-border-subtle">
                      <span className="text-[10px] text-text-muted uppercase block">{k}</span>
                      <strong className="text-primary font-bold">{v} in</strong>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-xs text-text-muted font-mono">
                Awaiting doorstep measurement confirmation.
              </p>
            )}
          </Card>
        </div>

        {/* Right Column: Complete Timestamped History Log (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-primary border-b border-border-subtle pb-2">
              Stage Audit History Log
            </h2>

            <div className="space-y-3 relative pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[1px] before:border-l before:border-dashed before:border-border-seam text-xs">
              {order.history.map((h, i) => (
                <div key={i} className="relative space-y-0.5">
                  <span className="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-accent-emerald ring-2 ring-white" />
                  <div className="flex items-center justify-between font-mono">
                    <strong className="text-primary font-bold">{h.stage}</strong>
                    <span className="text-[10px] text-text-muted">{h.timestamp}</span>
                  </div>
                  <p className="text-on-surface text-pretty">{h.note}</p>
                  <span className="text-[10px] text-text-muted font-mono block">
                    By {h.actorName}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

