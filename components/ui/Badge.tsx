import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "tape" | "verified" | "neutral" | "error" | "brass" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "tape",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  const variantStyles = {
    tape: "bg-accent-tape text-on-accent-tape font-mono font-bold rounded-sm border border-[#E5B520] tracking-wide",
    verified: "bg-accent-emerald text-on-accent-emerald font-semibold rounded-full",
    neutral: "bg-surface-muted text-text-muted font-medium rounded-sm border border-border-subtle",
    error: "bg-error text-on-error font-bold rounded-sm",
    brass: "bg-secondary text-on-secondary font-semibold rounded-sm",
    outline: "bg-transparent text-on-surface border border-border-seam rounded-sm font-mono",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 uppercase select-none whitespace-nowrap shrink-0",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

