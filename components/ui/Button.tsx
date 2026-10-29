"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "tape" | "whatsapp" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "h-9 min-h-[36px] px-3.5 text-xs rounded-sm",
      md: "h-12 min-h-[48px] px-5 text-sm rounded-md", // 48px standard touch target
      lg: "h-14 min-h-[56px] px-7 text-base rounded-md", // Large mobile CTA
    };

    const variantStyles = {
      primary:
        "bg-primary text-on-primary hover:bg-[#16233B] shadow-subtle border border-primary",
      secondary:
        "bg-surface-card text-primary border-2 border-primary hover:bg-surface-muted",
      outline:
        "bg-transparent text-on-surface border border-border-seam hover:bg-surface-muted",
      ghost:
        "bg-transparent text-primary hover:bg-surface-muted hover:text-primary",
      tape:
        "bg-accent-tape text-on-accent-tape font-bold border border-[#E5B520] hover:bg-[#E5B520] shadow-subtle",
      whatsapp:
        "bg-accent-emerald text-on-accent-emerald font-semibold hover:bg-[#074729] shadow-subtle",
      danger:
        "bg-error text-on-error font-semibold hover:bg-[#991515] shadow-subtle",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

