"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  orderId?: string;
  label?: string;
  className?: string;
  variant?: "floating" | "inline";
}

export function WhatsAppButton({
  orderId,
  label = "Chat with Master Tailor",
  className,
  variant = "inline",
}: WhatsAppButtonProps) {
  const defaultText = orderId
    ? `Hello PrimeStitch! I'm inquiring about my order ${orderId}.`
    : `Hello PrimeStitch! I'd like to ask a question about made-to-measure tailoring.`;

  const waLink = `https://wa.me/2348034928110?text=${encodeURIComponent(defaultText)}`;

  if (variant === "floating") {
    return (
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Master Tailor on WhatsApp"
        className={cn(
          "fixed bottom-20 right-4 z-40 flex items-center gap-2 bg-[#0A5C36] text-white px-4 py-3 rounded-full shadow-raised border-2 border-white hover:bg-[#074729] active:scale-95 transition-all text-xs font-bold",
          className
        )}
      >
        <MessageSquare className="w-4 h-4 fill-current" />
        <span className="hidden sm:inline">WhatsApp Tailor</span>
      </a>
    );
  }

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-md bg-[#0A5C36] text-white hover:bg-[#074729] active:scale-98 transition-all font-semibold text-sm shadow-subtle",
        className
      )}
    >
      <MessageSquare className="w-4 h-4 fill-current" />
      <span>{label}</span>
    </a>
  );
}

