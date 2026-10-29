"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, formatDate } from "@/lib/utils";
import {
  Scissors,
  CheckCircle,
  Clock,
  ArrowRight,
  User,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { STAGES, Stage } from "@/lib/types";

export default function TailorMobileWorkspacePage() {
  const { orders, tailors, updateOrderStatus, activeStaffId } = usePrimeStitch();

  // Find active tailor or default to Master Tunde
  const tailor =
    tailors.find((t) => t.id === activeStaffId) || tailors[0];

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [successNote, setSuccessNote] = useState("");

  // Jobs assigned to this tailor, sorted by guaranteed delivery date (earliest first)
  const myJobs = orders
    .filter((o) => o.assignedTailorId === tailor.id || o.assignedTailorName === tailor.name)
    .sort((a, b) => new Date(a.guaranteedDeliveryDate).getTime() - new Date(b.guaranteedDeliveryDate).getTime());

  const handleMarkComplete = (orderId: string, currentStage: Stage) => {
    const curIdx = STAGES.indexOf(currentStage);
    const nextStg = STAGES[curIdx + 1];
    if (!nextStg) return;

    updateOrderStatus(
      orderId,
      nextStg,
      `Bench stage completed by ${tailor.name}. Advanced to ${nextStg}.`
    );

    setSuccessNote(`Order ${orderId} marked ${currentStage} complete! Now at ${nextStg}.`);
    setTimeout(() => setSuccessNote(""), 3500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Bench Header */}
      <div className="bg-primary text-white p-5 rounded-md border-b-4 border-accent-tape tape-measure-top space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="tape" size="sm">
            Bench #3 • {tailor.area}
          </Badge>
          <Link href="/staff/login" className="text-xs font-mono text-slate-300 hover:underline">
            Switch Staff
          </Link>
        </div>
        <h1 className="text-2xl font-bold font-display text-white">
          {tailor.name}
        </h1>
        <p className="text-xs text-slate-300 font-mono">
          {tailor.specialty} • {myJobs.filter((j) => j.status !== "Delivered").length} Active Jobs on Bench
        </p>
      </div>

      {successNote && (
        <div className="p-3 bg-accent-emerald text-white rounded-sm text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 stroke-[3]" />
          <span>{successNote}</span>
        </div>
      )}

      {/* Jobs List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-primary uppercase">
            Today's Bench Queue (Sorted by SLA Due Date)
          </span>
          <span className="text-text-muted">{myJobs.length} Orders Total</span>
        </div>

        {myJobs.map((job) => {
          const isExpanded = expandedOrderId === job.id;
          const currentStageIndex = STAGES.indexOf(job.status);
          const nextStage = STAGES[currentStageIndex + 1];

          return (
            <Card
              key={job.id}
              className={`p-4 space-y-3 border-2 transition-all ${
                job.isLate
                  ? "border-error bg-error/5"
                  : job.isAtRisk
                  ? "border-amber-500 bg-amber-500/5"
                  : "border-border-seam bg-surface-card"
              }`}
            >
              {/* Job Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-12 shrink-0">
                    <PlaceholderImage
                      alt={`${job.items[0]?.designName} pattern silhouette`}
                      aspectRatio="3/4"
                      category="garment"
                      dimensionsBadge="3:4 • 1200 × 1600"
                      className="rounded-sm border border-border-seam shadow-subtle"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base text-primary">
                        {job.id}
                      </span>
                      <Badge
                        variant={job.isLate ? "error" : job.isAtRisk ? "tape" : "verified"}
                        size="sm"
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-sm text-primary font-display mt-0.5 truncate">
                      {job.items[0]?.designName}
                    </h3>
                    <p className="text-xs text-text-muted font-mono truncate">
                      Fabric: {job.items[0]?.fabricName} • {job.items[0]?.colorName}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-text-muted block uppercase">
                    Guaranteed Delivery:
                  </span>
                  <strong
                    className={`font-mono text-xs tabular-nums block ${
                      job.isLate ? "text-error font-bold" : "text-primary"
                    }`}
                  >
                    {formatDate(job.guaranteedDeliveryDate)}
                  </strong>
                </div>
              </div>

              {/* Anatomic Measurements Dropdown */}
              {job.items[0]?.measurements && (
                <div className="pt-2 border-t border-border-subtle">
                  <button
                    type="button"
                    onClick={() => setExpandedOrderId(isExpanded ? null : job.id)}
                    className="w-full flex items-center justify-between text-xs font-mono text-primary font-bold py-1 select-none"
                  >
                    <span>Cut Measurements Checklist ({isExpanded ? "Hide" : "Show Dimensions"})</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  {isExpanded && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 pt-2 text-xs font-mono animate-fadeIn">
                      {Object.entries(job.items[0].measurements)
                        .filter(([k, v]) => k !== "unit" && typeof v === "number")
                        .map(([k, v]) => (
                          <div key={k} className="p-2 bg-surface-muted rounded-sm border border-border-subtle min-w-0">
                            <span className="text-[10px] text-text-muted uppercase block truncate">{k}</span>
                            <strong className="text-primary font-bold">{v} in</strong>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* Single Large Action Button */}
              {nextStage ? (
                <div className="pt-2">
                  <Button
                    size="lg"
                    onClick={() => handleMarkComplete(job.id, job.status)}
                    className="w-full text-xs sm:text-sm md:text-base font-bold shadow-raised whitespace-normal py-3 h-auto text-center"
                    rightIcon={<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent-tape shrink-0" />}
                  >
                    Mark [{job.status}] Complete &rarr; Advance to {nextStage}
                  </Button>
                </div>
              ) : (
                <div className="p-2 text-center text-xs font-mono text-accent-emerald font-bold bg-accent-emerald/10 rounded-sm">
                  ✓ Garment Delivered to Customer
                </div>
              )}
            </Card>
          );
        })}

        {myJobs.length === 0 && (
          <div className="p-8 text-center bg-surface-card rounded-md border border-border-seam text-text-muted font-mono text-xs">
            No active jobs currently assigned to your bench.
          </div>
        )}
      </div>
    </div>
  );
}

