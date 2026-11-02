"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, calculateGuaranteedDelivery, formatDate } from "@/lib/utils";
import { Layers, Filter, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Logo } from "@/components/ui/Logo";

export default function DesignsPage() {
  const { designs } = usePrimeStitch();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Traditional", "Formal", "Contemporary", "Corporate", "Events"];

  const filteredDesigns =
    selectedCategory === "All"
      ? designs
      : designs.filter((d) => d.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="tape" size="sm">
            Bespoke Portfolio
          </Badge>
          <span className="text-xs font-mono text-text-muted">8 SIGNATURE PATTERNS · ABA ATELIER</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-primary tracking-tight">
          Made-to-Measure Garment Catalogue
        </h1>
        <p className="text-xs sm:text-sm text-text-muted max-w-2xl text-pretty">
          Every piece is cut from individual paper patterns drafted to your anatomic measurements with locked delivery dates.
        </p>
      </div>

      {/* Sleek, Compact Category Chip Rail (Single-line horizontal scroll on mobile, zero vertical bulk) */}
      <div className="sticky top-16 z-30 bg-surface/95 backdrop-blur-md py-2 -mx-4 px-4 sm:mx-0 sm:px-0 border-y border-border-seam/80">
        <div className="flex items-center justify-between gap-3">
          {/* Horizontal scrollable chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1 shrink-0 max-w-full">
            {categories.map((cat) => {
              const count = cat === "All" ? designs.length : designs.filter((d) => d.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-9 px-3 text-xs font-mono uppercase tracking-wider rounded-full transition-all shrink-0 flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? "bg-primary text-white font-bold shadow-sm ring-1 ring-primary"
                      : "bg-surface-card text-text-muted hover:text-primary hover:bg-surface-muted border border-border-seam"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? "bg-accent-tape text-primary"
                        : "bg-surface-muted text-text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick status counter on larger screens or clear link */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-text-muted shrink-0 pl-2">
            <span>
              <strong className="text-primary font-bold">{filteredDesigns.length}</strong> items
            </span>
            {selectedCategory !== "All" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="text-error hover:underline font-bold"
              >
                (Reset)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Designs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDesigns.map((design) => {
          const promise = calculateGuaranteedDelivery(design.standardLeadDays);

          return (
            <Card
              key={design.id}
              hasNotch
              className="flex flex-col justify-between group overflow-hidden bg-surface-card hover:border-primary transition-all shadow-card"
            >
              <div>
                {/* Image Container with category pill and guarantee banner */}
                <div className="relative">
                  <PlaceholderImage
                    src={design.heroImage}
                    alt={design.imageAlt || `${design.name} bespoke garment silhouette`}
                    aspectRatio="3/4"
                    label={design.name}
                    dimensionsBadge={design.imageDimensions || "1200 × 1600 px (3:4)"}
                    category="garment"
                    showBadge
                    imageClassName="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <Badge variant="tape" size="sm">
                      {design.category}
                    </Badge>
                  </div>
                  {design.featured && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <Badge variant="brass" size="sm">
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Guaranteed Date Overlay on image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 bg-primary/95 text-white p-2.5 text-[11px] font-mono flex items-center justify-between border-t border-accent-tape">
                    <span className="text-accent-tape font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Ready:
                    </span>
                    <span className="font-semibold text-white">
                      {formatDate(promise.deliveryDate)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h2 className="font-bold text-lg font-display text-primary group-hover:text-secondary transition-colors">
                      {design.name}
                    </h2>
                    <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                      {design.description}
                    </p>
                  </div>

                  {/* Fabric Swatch preview options */}
                  <div className="pt-2 border-t border-border-subtle space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-text-muted block">
                      Fabric Options ({design.fabrics.length}):
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {design.fabrics.map((fab) => (
                        <span
                          key={fab.id}
                          className="text-[10px] bg-surface-muted px-2 py-0.5 rounded-sm border border-border-subtle text-on-surface font-mono"
                        >
                          {fab.gsm} GSM • {fab.name.split(" ")[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="pt-2 flex items-baseline justify-between border-t border-border-subtle">
                    <span className="text-xs text-text-muted font-mono">Starting at</span>
                    <span className="font-extrabold text-xl font-display text-primary tabular-nums">
                      {formatNaira(design.startingPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 pt-0">
                <Link href={`/designs/${design.id}`}>
                  <Button variant="primary" size="md" className="w-full font-mono text-xs">
                    <span>View & Configure Fit</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredDesigns.length === 0 && (
        <div className="text-center py-16 bg-surface-card rounded-md border border-border-seam space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-surface-muted flex items-center justify-center border border-border-subtle">
            <Logo variant="icon" tone="dark" height={28} className="opacity-40 grayscale" />
          </div>
          <p className="text-sm text-text-muted font-mono">
            No designs found in the selected category.
          </p>
          <Button variant="outline" size="sm" onClick={() => setSelectedCategory("All")}>
            Reset Category Filter
          </Button>
        </div>
      )}
    </div>
  );
}

