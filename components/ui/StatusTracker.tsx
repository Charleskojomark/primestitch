"use client";

import React, { useState } from "react";
import { Stage, STAGES, OrderHistoryEntry } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, Clock, User, Scissors } from "lucide-react";
import { Badge } from "./Badge";

interface StatusTrackerProps {
  currentStage: Stage;
  history: OrderHistoryEntry[];
  assignedTailorName?: string;
  isAtRisk?: boolean;
  isLate?: boolean;
  className?: string;
}

export function StatusTracker({
  currentStage,
  history,
  assignedTailorName = "Master Tunde Adeleke",
  isAtRisk = false,
  isLate = false,
  className,
}: StatusTrackerProps) {
  const currentIndex = STAGES.indexOf(currentStage);
  const [viewMode, setViewMode] = useState<"pipeline" | "timeline">("pipeline");

  // Descriptions for each of the 9 stages
  const stageDescriptions: Record<Stage, string> = {
    Received: "Order deposit processed & queued for cutter review",
    Confirmed: "Measurements validated against anatomic tolerances",
    Cutting: "Fabric chalked and sheared from individual pattern pieces",
    Sewing: "Structural seams, inner canvas, and lining assembled",
    Finishing: "Buttonholes, embroidery, hems, and high-temp pressing",
    "Quality check": "14-point dimension audit and tolerance check",
    Ready: "Garment tagged, inspected, and bagged in suit carrier",
    Dispatched: "Assigned priority courier with dispatch link",
    Delivered: "Handed over to customer with signature confirmation",
  };

  return (
    <div className={cn("space-y-6", className)} aria-live="polite">
      {/* Alert banner for at-risk or late */}
      {isLate ? (
        <div className="bg-error/10 border-2 border-error p-4 rounded-sm flex items-start gap-3">
          <div className="p-1.5 bg-error text-white rounded-sm shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs md:text-sm">
            <span className="font-bold text-error uppercase tracking-wider font-mono">
              Delivery SLA Alert: Late Notice
            </span>
            <p className="text-on-surface">
              Your order has passed its scheduled handover time. Per our Prime Promise, an automatic ₦15,000 credit has been applied and our Senior Logistics Master is managing expedited delivery.
            </p>
          </div>
        </div>
      ) : isAtRisk ? (
        <div className="bg-amber-500/10 border border-amber-500 p-4 rounded-sm flex items-start gap-3">
          <div className="p-1.5 bg-amber-500 text-white rounded-sm shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs md:text-sm">
            <span className="font-bold text-amber-700 uppercase tracking-wider font-mono">
              At-Risk Stage Schedule
            </span>
            <p className="text-on-surface">
              Finishing requires additional artisan attention. A second senior tailor has been assigned to guarantee on-time completion by the committed date.
            </p>
          </div>
        </div>
      ) : null}

      {/* Mode switcher (mobile-friendly pipeline vs detailed history log) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-seam pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-mono uppercase text-text-muted">
            Stage {currentIndex + 1} of 9
          </span>
          <h4 className="text-lg font-bold font-display text-primary flex items-center gap-2">
            <span>{currentStage}</span>
            <Badge variant="tape" size="sm">
              Live Progress
            </Badge>
          </h4>
        </div>
        <div className="flex border border-border-seam rounded-sm overflow-hidden text-xs font-mono self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("pipeline")}
            className={cn(
              "px-3 py-1.5 select-none transition-colors",
              viewMode === "pipeline"
                ? "bg-primary text-on-primary font-bold"
                : "bg-surface-card text-text-muted hover:bg-surface-muted"
            )}
          >
            Pipeline
          </button>
          <button
            type="button"
            onClick={() => setViewMode("timeline")}
            className={cn(
              "px-3 py-1.5 select-none transition-colors border-l border-border-seam",
              viewMode === "timeline"
                ? "bg-primary text-on-primary font-bold"
                : "bg-surface-card text-text-muted hover:bg-surface-muted"
            )}
          >
            History Log ({history.length})
          </button>
        </div>
      </div>

      {viewMode === "pipeline" ? (
        <div className="space-y-6 w-full max-w-full overflow-hidden">
          {/* Active Tailor Card */}
          <div className="p-3.5 bg-surface-muted rounded-sm border border-border-subtle flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-primary text-accent-tape shrink-0">
                <Scissors className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-text-muted block text-[11px] uppercase tracking-wider font-mono">
                  Currently Assigned Tailor
                </span>
                <span className="font-semibold text-primary text-sm">
                  {assignedTailorName}
                </span>
              </div>
            </div>
            <div className="text-left xs:text-right">
              <span className="text-[11px] font-mono text-accent-emerald font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                Active at Bench
              </span>
              <span className="text-text-muted text-[11px] font-mono">Aba Master Atelier</span>
            </div>
          </div>

          {/* Mobile scroll indicator */}
          <div className="sm:hidden text-[11px] font-mono text-text-muted flex items-center justify-between px-1">
            <span>Scroll stages horizontally</span>
            <span>&larr; Swipe &rarr;</span>
          </div>

          {/* Stepper nodes: Horizontal scroll on mobile, full width on desktop */}
          <div className="w-full max-w-full overflow-x-auto pb-4 pt-2 scroll-touch scrollbar-thin">
            <div className="flex items-start min-w-[760px] relative justify-between px-1">
              {STAGES.map((stage, idx) => {
                const isCompleted = idx < currentIndex;
                const isActive = idx === currentIndex;
                const isUpcoming = idx > currentIndex;

                return (
                  <div
                    key={stage}
                    className="flex flex-col items-center text-center relative z-10 w-20"
                    aria-current={isActive ? "step" : undefined}
                  >
                    {/* Connecting stitch line */}
                    {idx < STAGES.length - 1 && (
                      <div
                        className={cn(
                          "absolute top-4 left-1/2 w-full h-[2px] -z-10",
                          idx < currentIndex
                            ? "bg-accent-emerald"
                            : "border-t border-dashed border-border-seam"
                        )}
                        style={{ width: "calc(100% + 8px)" }}
                      />
                    )}

                    {/* Node circle */}
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs transition-all",
                        isCompleted && "bg-accent-emerald text-white shadow-subtle",
                        isActive &&
                          "bg-accent-tape text-on-accent-tape font-bold ring-4 ring-accent-tape/30 scale-110",
                        isUpcoming &&
                          "bg-surface-card border-2 border-border-seam text-text-muted"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    {/* Stage Label */}
                    <div className="mt-2.5 space-y-0.5">
                      <span
                        className={cn(
                          "block text-xs font-semibold leading-tight",
                          isActive
                            ? "text-primary font-bold underline decoration-accent-tape decoration-2"
                            : isCompleted
                            ? "text-accent-emerald"
                            : "text-text-muted"
                        )}
                      >
                        {stage}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Stage Highlight Box */}
          <div className="bg-surface-card p-4 rounded-sm border-l-4 border-l-accent-tape border-y border-r border-border-seam space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="font-mono text-accent-tape font-bold uppercase bg-primary px-2.5 py-1 rounded-sm w-fit shrink-0 whitespace-nowrap shadow-subtle">
                Stage {currentIndex + 1}: {currentStage}
              </span>
              <span className="text-text-muted font-mono text-xs sm:text-right">
                {stageDescriptions[currentStage]}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Detailed History Timeline View */
        <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:border-l before:border-dashed before:border-border-seam">
          {history.map((entry, i) => (
            <div key={i} className="relative space-y-1 text-xs">
              <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-accent-emerald ring-2 ring-white" />
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="font-bold text-sm text-primary font-display">
                  {entry.stage}
                </span>
                <span className="text-text-muted font-mono text-[11px]">
                  {entry.timestamp}
                </span>
              </div>
              <p className="text-on-surface text-pretty">{entry.note}</p>
              <div className="text-[11px] text-text-muted font-mono flex items-center gap-1 pt-0.5">
                <User className="w-3 h-3 text-secondary" />
                <span>Logged by {entry.actorName}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

