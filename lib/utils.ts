import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export { calculateGuaranteedDelivery } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency with Naira symbol and commas with tabular numbers
 * e.g. formatNaira(45000) -> "₦45,000"
 */
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

/**
 * Format date in clear bespoke atelier fashion
 * e.g. "Friday, 14 Nov 2026" or "14 Nov 2026 • 2:00 PM WAT"
 */
export function formatDate(dateStr: string | Date, includeTime = false): string {
  const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  if (isNaN(d.getTime())) return dateStr as string;

  const dateFormatted = d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (!includeTime) return dateFormatted;

  const timeFormatted = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dateFormatted} • ${timeFormatted} WAT`;
}
