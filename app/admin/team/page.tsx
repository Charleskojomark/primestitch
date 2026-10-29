"use client";

import React from "react";
import Link from "next/link";
import { usePrimeStitch } from "@/lib/store";
import { Scissors, Ruler, ArrowLeft, Phone, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export default function AdminTeamPage() {
  const { tailors, measurers } = usePrimeStitch();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-seam pb-6">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Dashboard</span>
          </Link>
          <h1 className="text-3xl font-extrabold font-display text-primary tracking-tight mt-1">
            Atelier Artisans & Field Measurement Roster
          </h1>
        </div>
      </div>

      {/* 1. Tailors Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-primary flex items-center gap-2">
            <Scissors className="w-5 h-5 text-secondary -rotate-45" />
            <span>Master Tailors & Bench Capacity ({tailors.length})</span>
          </h2>
          <span className="text-xs font-mono text-text-muted">
            Max Daily Atelier Intake: 15 Garments
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tailors.map((tailor) => {
            const utilizationPct = Math.round(
              (tailor.currentWorkload / tailor.maxCapacity) * 100
            );
            const isNearCapacity = utilizationPct >= 80;

            return (
              <Card key={tailor.id} className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <PlaceholderImage
                    src={tailor.avatar}
                    alt={tailor.avatarAlt || `Portrait of Master Tailor ${tailor.name}`}
                    aspectRatio="1/1"
                    rounded="full"
                    dimensionsBadge={tailor.avatarDimensions || "600 × 600 px (1:1)"}
                    category="avatar"
                    className="w-14 h-14 border-2 border-primary shrink-0"
                  />
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-base text-primary">
                      {tailor.name}
                    </h3>
                    <span className="text-xs text-text-muted block">
                      ★ {tailor.rating} Rating
                    </span>
                    <span className="text-[11px] font-mono text-primary flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-secondary" />
                      {tailor.area}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-mono text-text-muted uppercase text-[10px] block">
                    SPECIALTY:
                  </span>
                  <p className="font-semibold text-primary">{tailor.specialty}</p>
                </div>

                {/* Bench Capacity Bar */}
                <div className="space-y-1.5 pt-2 border-t border-border-subtle">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-text-muted">Active Bench Workload:</span>
                    <strong
                      className={
                        isNearCapacity ? "text-amber-700 font-bold" : "text-primary"
                      }
                    >
                      {tailor.currentWorkload} / {tailor.maxCapacity} Garments ({utilizationPct}%)
                    </strong>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isNearCapacity ? "bg-amber-500" : "bg-accent-emerald"
                      }`}
                      style={{ width: `${utilizationPct}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-mono pt-1 text-text-muted">
                  <span>Phone: {tailor.phone}</span>
                  <Badge variant={isNearCapacity ? "tape" : "verified"} size="sm">
                    {isNearCapacity ? "High Load" : "Available"}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 2. Field Measurers Section */}
      <div className="space-y-4 pt-6 border-t border-border-seam">
        <h2 className="text-xl font-bold font-display text-primary flex items-center gap-2">
          <Ruler className="w-5 h-5 text-secondary" />
          <span>Doorstep Field Fitters ({measurers.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {measurers.map((measurer) => (
            <Card key={measurer.id} className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <PlaceholderImage
                  src={measurer.avatar}
                  alt={measurer.avatarAlt || `Portrait of Certified Measurer ${measurer.name}`}
                  aspectRatio="1/1"
                  rounded="full"
                  dimensionsBadge={measurer.avatarDimensions || "600 × 600 px (1:1)"}
                  category="avatar"
                  className="w-14 h-14 border-2 border-primary shrink-0"
                />
                <div className="space-y-0.5">
                  <h3 className="font-bold text-base text-primary">
                    {measurer.name}
                  </h3>
                  <span className="text-xs text-text-muted block">
                    ★ {measurer.rating} (Certified Master Measurer)
                  </span>
                  <Badge variant={measurer.activeToday ? "verified" : "neutral"} size="sm">
                    {measurer.activeToday ? "Active On Road" : "Off Duty"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="font-mono text-text-muted uppercase text-[10px] block">
                  FIELD COVERAGE REGIONS:
                </span>
                <p className="font-semibold text-primary">{measurer.area}</p>
              </div>

              <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
                <span>Direct: {measurer.phone}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

