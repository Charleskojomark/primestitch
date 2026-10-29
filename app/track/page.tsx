"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import { Search, Clock, AlertCircle, ArrowRight, Scissors, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function TrackLookupPage() {
  const router = useRouter();
  const { orders } = usePrimeStitch();

  const [query, setQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const clean = query.trim().toUpperCase();
    const formatted = clean.startsWith("#") ? clean : `#${clean}`;

    // Check if matching order ID or phone
    const found = orders.find(
      (o) =>
        o.id.toUpperCase() === formatted ||
        o.id.toUpperCase() === clean ||
        o.customerPhone.includes(clean)
    );

    if (found) {
      router.push(`/track/${encodeURIComponent(found.id)}`);
    } else {
      setErrorMsg(`No active tailoring order found for "${query}". Check your order number (e.g. #PS-8492) or WhatsApp phone number.`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <Badge variant="tape" size="sm">
          Live Atelier Tracking Engine
        </Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-primary tracking-tight">
          Track Your 9-Stage Progress
        </h1>
        <p className="text-sm text-text-muted text-pretty">
          Every PrimeStitch garment is logged live by the assigned master tailor at each production station. Enter your order code to see bench progress.
        </p>
      </div>

      {/* Search Input Card */}
      <Card hasTapeTop className="p-6 md:p-8 space-y-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="track-query" className="text-xs font-mono font-bold uppercase tracking-wider text-primary block">
              Enter Order Number or Phone Number
            </label>
            <div className="relative">
              <input
                id="track-query"
                type="text"
                required
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="e.g. #PS-8492 or +234 802 334 1982"
                className="w-full h-14 px-4 pl-12 text-base font-mono border-2 border-border-seam rounded-sm bg-surface-card text-on-surface focus:border-primary focus:outline-none transition-all"
              />
              <Search className="w-5 h-5 text-text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-error/10 border border-error rounded-sm text-xs text-error flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <Button size="lg" type="submit" className="w-full font-bold shadow-raised">
            Track Progress &amp; View Guaranteed Date &rarr;
          </Button>
        </form>

        {/* Quick Demo Order Links to demonstrate each state required by prompt */}
        <div className="pt-6 border-t border-border-subtle space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-text-muted block font-bold">
            Or Click a Sample Order to Test Pipeline States:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {[
              { id: "#PS-8492", stage: "Stage 4: Sewing", status: "On Track", badge: "verified" },
              { id: "#PS-8493", stage: "Stage 3: Cutting", status: "On Track", badge: "verified" },
              { id: "#PS-8495", stage: "Stage 5: Finishing", status: "⚠️ AT RISK", badge: "tape" },
              { id: "#PS-8496", stage: "Stage 4: Sewing", status: "🚨 LATE (Credit Active)", badge: "error" },
              { id: "#PS-8491", stage: "Stage 9: Delivered", status: "✓ On Time", badge: "verified" },
            ].map((demo) => (
              <Link
                key={demo.id}
                href={`/track/${encodeURIComponent(demo.id)}`}
                className="p-3 bg-surface-muted rounded-sm border border-border-subtle hover:border-primary transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="text-primary font-bold block">{demo.id}</strong>
                  <span className="text-text-muted text-[11px]">{demo.stage}</span>
                </div>
                <Badge variant={demo.badge as any} size="sm">
                  {demo.status}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

