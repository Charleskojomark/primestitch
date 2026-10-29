import React from "react";
import { cn, formatDate } from "@/lib/utils";
import { Calendar, ShieldCheck, Clock } from "lucide-react";
import { Badge } from "./Badge";

interface DeliveryBannerProps {
  date: string | Date;
  variant?: "hero" | "compact" | "card";
  className?: string;
  showGuaranteeCopy?: boolean;
}

export function DeliveryBanner({
  date,
  variant = "card",
  className,
  showGuaranteeCopy = true,
}: DeliveryBannerProps) {
  const formatted = typeof date === "string" ? formatDate(date) : formatDate(date);

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "inline-flex items-center flex-wrap gap-1.5 sm:gap-2 bg-primary text-on-primary px-2.5 sm:px-3 py-1.5 rounded-sm border border-[#1E2E4A] shadow-subtle max-w-full text-xs",
          className
        )}
      >
        <span className="w-2 h-2 rounded-full bg-accent-tape animate-pulse shrink-0" />
        <span className="text-[11px] sm:text-xs uppercase tracking-wider text-accent-tape font-mono font-bold shrink-0">
          Guaranteed:
        </span>
        <span className="text-[11px] sm:text-xs font-semibold text-white font-mono tabular-nums">
          {formatted}
        </span>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-primary text-on-primary p-5 md:p-6 rounded-md border-2 border-primary shadow-raised tape-measure-top",
          className
        )}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="tape" size="sm" className="whitespace-nowrap shrink-0">
                ⚡ Prime Promise
              </Badge>
              <span className="text-xs text-slate-300 flex items-center gap-1.5 font-mono whitespace-nowrap">
                <Clock className="w-3.5 h-3.5 text-accent-tape shrink-0" />
                <span>2:00 PM WAT Handover</span>
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">
              Ready on <span className="text-accent-tape underline decoration-accent-tape/40 decoration-2 underline-offset-4">{formatted}</span>
            </h3>
            {showGuaranteeCopy && (
              <p className="text-xs md:text-sm text-slate-300 text-pretty">
                Every stage logged by the assigned tailor. On your doorstep by the promised hour, or your next outfit is free.
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 self-start md:self-center bg-[#142238] px-3.5 py-2.5 rounded-sm border border-slate-700/60">
            <ShieldCheck className="w-6 h-6 text-accent-emerald shrink-0" />
            <div className="text-left text-xs">
              <div className="font-semibold text-white">100% Date Guarantee</div>
              <div className="text-slate-400">Strict Nigerian atelier SLA</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-4 rounded-md border border-border-seam bg-surface-muted/60 relative overflow-hidden",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-sm bg-primary text-accent-tape shrink-0 mt-0.5">
          <Calendar className="w-4 h-4" />
        </div>
        <div className="space-y-1 text-sm flex-1">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <span className="font-bold text-xs uppercase tracking-wider text-text-muted font-mono">
              Guaranteed Delivery Date
            </span>
            <Badge variant="tape" size="sm">
              Locked In
            </Badge>
          </div>
          <div className="text-base font-bold font-display text-primary tabular-nums">
            {formatted} • 2:00 PM WAT
          </div>
          {showGuaranteeCopy && (
            <p className="text-xs text-text-muted text-pretty">
              Your outfit, ready on the day you need it. No stories.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

