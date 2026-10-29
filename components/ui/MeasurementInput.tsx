"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, HelpCircle } from "lucide-react";

interface MeasurementInputProps {
  label: string;
  field: string;
  value?: number;
  unit: "in" | "cm";
  hint?: string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  required?: boolean;
}

export function MeasurementInput({
  label,
  field,
  value,
  unit,
  hint,
  onChange,
  min = unit === "in" ? 10 : 25,
  max = unit === "in" ? 70 : 180,
  required = false,
}: MeasurementInputProps) {
  const [showHint, setShowHint] = useState(false);
  const currentVal = value ?? 0;

  // Sanity validation: check if out of bounds
  const hasValue = value !== undefined && value > 0;
  const isOutOfRange = hasValue && (currentVal < min || currentVal > max);

  const handleStep = (delta: number) => {
    const step = unit === "in" ? 0.5 : 1;
    const next = Math.max(0, Number(((value || min) + delta * step).toFixed(1)));
    onChange(next);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <label
          htmlFor={`measure-${field}`}
          className="font-medium text-on-surface flex items-center gap-1.5"
        >
          <span>{label}</span>
          {required && <span className="text-error">*</span>}
          {hint && (
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-text-muted hover:text-primary transition-colors focus:outline-none"
              aria-label={`Show measuring tip for ${label}`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </label>
        <span className="text-text-muted font-mono text-[11px]">
          Target: {min}–{max} {unit}
        </span>
      </div>

      {showHint && hint && (
        <div className="text-[12px] text-text-muted bg-surface-muted p-2 rounded-sm border border-border-subtle flex items-start gap-1.5 animate-fadeIn">
          <span className="text-primary font-bold">✂ Guide:</span>
          <span>{hint}</span>
        </div>
      )}

      <div className="relative flex items-center">
        <input
          id={`measure-${field}`}
          type="number"
          step={unit === "in" ? "0.5" : "1"}
          value={value !== undefined && value > 0 ? value : ""}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            onChange(isNaN(val) ? 0 : val);
          }}
          placeholder="0.0"
          className={cn(
            "w-full h-12 px-3.5 pr-20 text-base font-mono font-medium tabular-nums bg-surface-card border rounded-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all",
            isOutOfRange ? "border-error focus:ring-error" : "border-border-seam"
          )}
        />
        <div className="absolute right-2 flex items-center gap-1">
          <span className="text-xs font-mono font-bold text-text-muted px-1.5 uppercase">
            {unit}
          </span>
          <div className="flex flex-col border border-border-seam rounded-sm bg-surface-muted overflow-hidden">
            <button
              type="button"
              onClick={() => handleStep(1)}
              className="px-2 py-0.5 hover:bg-slate-200 text-xs font-bold leading-none select-none"
              aria-label={`Increase ${label}`}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => handleStep(-1)}
              className="px-2 py-0.5 hover:bg-slate-200 text-xs font-bold leading-none select-none border-t border-border-subtle"
              aria-label={`Decrease ${label}`}
            >
              -
            </button>
          </div>
        </div>
      </div>

      {isOutOfRange && (
        <p className="text-xs text-error flex items-center gap-1 pt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>
            Tolerance warning: standard range is {min} to {max} {unit}. Double-check tape placement.
          </span>
        </p>
      )}
    </div>
  );
}

