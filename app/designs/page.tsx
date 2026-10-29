"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, calculateGuaranteedDelivery, formatDate } from "@/lib/utils";
import { Layers, Filter, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

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
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="tape" size="sm">
            Bespoke Portfolio
          </Badge>
          <span className="text-xs font-mono text-text-muted">8 SIGNATURE PATTERNS</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-primary tracking-tight">
          Made-to-Measure Garment Catalogue
        </h1>
        <p className="text-sm md:text-base text-text-muted max-w-2xl text-pretty">
          Every piece is cut from individual paper patterns drafted to your anatomic measurements.
          Select an outfit to choose authenticated fabrics, GSM weights, and view your exact guaranteed delivery date.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scroll-touch pb-2 scrollbar-none border-b border-border-seam w-full max-w-full">
        <Filter className="w-4 h-4 text-text-muted shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`min-touch-target px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-primary text-on-primary font-bold shadow-subtle"
                : "bg-surface-card text-text-muted hover:text-primary hover:bg-surface-muted border border-border-subtle"
            }`}
          >
            {cat} {cat === "All" ? `(${designs.length})` : `(${designs.filter((d) => d.category === cat).length})`}
          </button>
        ))}
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
                <div className="relative aspect-[3/4] bg-slate-200 overflow-hidden">
                  <img
                    src={design.heroImage}
                    alt={design.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <Badge variant="tape" size="sm">
                      {design.category}
                    </Badge>
                  </div>
                  {design.featured && (
                    <div className="absolute top-2.5 right-2.5">
                      <Badge variant="brass" size="sm">
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Guaranteed Date Overlay on image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-primary/95 text-white p-2.5 text-[11px] font-mono flex items-center justify-between border-t border-accent-tape">
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
        <div className="text-center py-16 bg-surface-card rounded-md border border-border-seam space-y-3">
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

