import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hasTapeTop?: boolean;
  hasNotch?: boolean;
}

export function Card({
  className,
  hasTapeTop = false,
  hasNotch = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface-card text-on-surface border border-border-seam rounded-md shadow-card transition-all",
        hasTapeTop && "tape-measure-top",
        hasNotch && "notch-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-4 md:p-6 border-b border-border-subtle", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 md:p-6", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "p-4 md:p-6 border-t border-border-subtle bg-surface-muted/50 rounded-b-md flex items-center justify-between",
        className
      )}
      {...props}
    />
  );
}

