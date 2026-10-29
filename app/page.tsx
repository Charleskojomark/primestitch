"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, calculateGuaranteedDelivery, formatDate } from "@/lib/utils";
import {
  Scissors,
  ShieldCheck,
  Calendar,
  Clock,
  Ruler,
  Layers,
  ArrowRight,
  CheckCircle,
  Truck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { DeliveryBanner } from "@/components/ui/DeliveryBanner";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function HomePage() {
  const { designs, orders } = usePrimeStitch();
  const [calculatorDays, setCalculatorDays] = useState(7);

  // Sample order for live hero teaser
  const teaserOrder = orders.find((o) => o.id === "#PS-8492") || orders[0];
  const calculatedPromise = calculateGuaranteedDelivery(calculatorDays);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. HERO SECTION: Precise, Confident & Tailoring-Crafted */}
      <section className="relative overflow-hidden bg-primary text-on-primary pt-8 pb-16 md:py-20 tape-measure-top border-b-4 border-accent-tape">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Brand Promise */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#15233D] rounded-sm border border-slate-700/60 text-xs font-mono text-accent-tape">
                <Scissors className="w-3.5 h-3.5 -rotate-45" />
                <span>NIGERIA&apos;S GUARANTEED BESPOKE ATELIER</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] tracking-tight text-white text-balance">
                Your outfit, ready on the day you need it.
                <span className="block text-accent-tape mt-1">No stories.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl text-pretty leading-relaxed">
                Order made-to-measure kaftans, agbadas, suits, and dresses online.
                Every garment is crafted by a dedicated master tailor with a locked
                delivery date and 9-stage live progress tracking.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link href="/designs">
                  <Button size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Explore Made-to-Measure
                  </Button>
                </Link>
                <Link href="/measurement/book">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Book a Lagos Measurer
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-700/60 text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold font-mono text-accent-tape text-sm sm:text-base">100%</span>
                  <span className="block text-slate-300 text-[11px] sm:text-xs">Date SLA Guarantee</span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold font-mono text-accent-tape text-sm sm:text-base">9 Stages</span>
                  <span className="block text-slate-300 text-[11px] sm:text-xs">Live Tailor Updates</span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold font-mono text-accent-tape text-sm sm:text-base">Lagos Wide</span>
                  <span className="block text-slate-300 text-[11px] sm:text-xs">Doorstep Fitting Team</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Tracker Teaser Widget */}
            <div className="lg:col-span-5">
              <div className="bg-surface-card text-on-surface rounded-md border-2 border-border-seam shadow-raised overflow-hidden">
                <div className="bg-surface-muted px-4 py-3 border-b border-border-seam flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-emerald animate-pulse" />
                    <span className="font-mono font-bold text-xs text-primary">
                      LIVE ATELIER TRACKER
                    </span>
                  </div>
                  <Badge variant="tape" size="sm">
                    Order {teaserOrder.id}
                  </Badge>
                </div>

                <div className="p-5 space-y-4">
                  {/* Delivery Promise Badge */}
                  <div className="p-3 bg-primary text-white rounded-sm space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent-tape block">
                      Guaranteed Delivery Date
                    </span>
                    <div className="text-base font-bold font-display text-white">
                      {formatDate(teaserOrder.guaranteedDeliveryDate, true)}
                    </div>
                  </div>

                  {/* Active Garment Info */}
                  <div className="space-y-1 text-xs">
                    <div className="text-text-muted">Garment:</div>
                    <div className="font-bold text-sm text-primary">
                      {teaserOrder.items[0]?.designName} ({teaserOrder.items[0]?.fabricName})
                    </div>
                  </div>

                  {/* 3 Step Visual Teaser */}
                  <div className="space-y-2 pt-2 border-t border-border-subtle">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-text-muted">Current Production Stage:</span>
                      <span className="font-bold text-accent-emerald uppercase bg-accent-emerald/10 px-2 py-0.5 rounded-sm">
                        Stage 4: {teaserOrder.status}
                      </span>
                    </div>

                    {/* Progress Bar with basting seam effect */}
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden relative">
                      <div className="bg-accent-emerald h-full w-[44%] rounded-full" />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-text-muted">
                      <span>Assigned: {teaserOrder.assignedTailorName}</span>
                      <span>Bench #3 (Lekki)</span>
                    </div>
                  </div>

                  {/* Action Link to Live Tracker */}
                  <Link href={`/track/${teaserOrder.id}`} className="block pt-2">
                    <Button variant="outline" size="sm" className="w-full justify-between font-mono text-xs">
                      <span>View Live 9-Stage Tracker</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (4 Disciplined Steps) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="neutral" size="sm">
            THE PRIMESTITCH DISCIPLINE
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-primary">
            How made-to-measure should actually work.
          </h2>
          <p className="text-sm md:text-base text-text-muted text-pretty">
            No guessing, no endless delays, and no unanswered phone calls on the morning of your event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <Card className="p-6 space-y-3 border-t-4 border-t-primary relative">
            <span className="font-mono text-2xl font-bold text-slate-300 block">01</span>
            <h3 className="font-bold text-lg font-display text-primary">Choose Design & Fabric</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Select from authenticated Guinea brocades, hand-dyed Adire, Italian cashmeres, or pure suiting wools.
            </p>
          </Card>

          {/* Step 2 */}
          <Card className="p-6 space-y-3 border-t-4 border-t-secondary relative">
            <span className="font-mono text-2xl font-bold text-secondary block">02</span>
            <h3 className="font-bold text-lg font-display text-primary">Exact Measurements</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Measure at home with our guided step-by-step tool, or book a mobile fitter to come directly to your home or office in Lagos.
            </p>
          </Card>

          {/* Step 3 */}
          <Card className="p-6 space-y-3 border-t-4 border-t-accent-tape relative">
            <span className="font-mono text-2xl font-bold text-accent-tape block">03</span>
            <h3 className="font-bold text-lg font-display text-primary">Locked Delivery Date</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Once measurements are confirmed, our capacity engine locks your delivery date into the contract. That date is sacred.
            </p>
          </Card>

          {/* Step 4 */}
          <Card className="p-6 space-y-3 border-t-4 border-t-accent-emerald relative">
            <span className="font-mono text-2xl font-bold text-accent-emerald block">04</span>
            <h3 className="font-bold text-lg font-display text-primary">9-Stage Live Updates</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Watch your outfit progress through Cutting, Sewing, Finishing, and Quality Check. Receive WhatsApp notifications at every milestone.
            </p>
          </Card>
        </div>
      </section>

      {/* 3. INTERACTIVE GUARANTEED DELIVERY CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-primary text-white rounded-md p-6 md:p-10 border-2 border-primary shadow-raised tape-measure-top">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="tape" size="sm">
                Real-Time Atelier Capacity
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white">
                Test our delivery date promise right now.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 text-pretty max-w-xl">
                We calculate delivery based on active tailor bench queue, fabric sourcing, and quality audit tolerance. No arbitrary dates.
              </p>

              <div className="pt-2 space-y-2">
                <label className="text-xs font-mono text-slate-300 block">
                  Select Garment Type / Turnaround Tier:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Executive Shirt (5 Days)", days: 5 },
                    { label: "Senator Suit (6 Days)", days: 6 },
                    { label: "Royal Kaftan (7 Days)", days: 7 },
                    { label: "3-Piece Agbada (9 Days)", days: 9 },
                    { label: "Bespoke Suit (10 Days)", days: 10 },
                  ].map((tier) => (
                    <button
                      key={tier.days}
                      type="button"
                      onClick={() => setCalculatorDays(tier.days)}
                      className={`px-3 py-2 text-xs font-mono font-medium rounded-sm border transition-colors ${
                        calculatorDays === tier.days
                          ? "bg-accent-tape text-on-accent-tape font-bold border-accent-tape"
                          : "bg-[#14233D] text-slate-300 border-slate-700 hover:bg-[#1E3154]"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-5 bg-[#08101E] p-6 rounded-md border border-slate-700 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>ORDER PLACED TODAY</span>
                <span>LAGOS DELIVERY</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-accent-tape font-mono uppercase tracking-wider block">
                  GUARANTEED DELIVERY DATE:
                </span>
                <div className="text-2xl font-bold font-display text-white">
                  {calculatedPromise.dateFormatted}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Exact handover: 2:00 PM WAT
                </div>
              </div>

              <div className="p-3 bg-[#111C2E] rounded-sm text-xs text-slate-300 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-accent-emerald">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>On-Time Promise Active</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Includes full hand-press, 14-point audit, and protective suit bag dispatch across Lagos.
                </p>
              </div>

              <Link href="/designs">
                <Button variant="tape" size="md" className="w-full">
                  Lock In This Date With An Order &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED DESIGNS CATALOGUE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="neutral" size="sm">
              HANDCRAFTED PATTERNS
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-primary">
              Signature Nigerian Outfits
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Cut flush to your anatomical measurements with authentic premium fabrics.
            </p>
          </div>
          <Link href="/designs">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All 8 Designs
            </Button>
          </Link>
        </div>

        {/* 4 Featured Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {designs.slice(0, 4).map((design) => (
            <Card key={design.id} hasNotch className="flex flex-col justify-between group overflow-hidden">
              <div>
                {/* Image Container with tape tag */}
                <div className="relative aspect-[4/5] bg-slate-200 overflow-hidden">
                  <img
                    src={design.heroImage}
                    alt={design.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="tape" size="sm">
                      {design.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-base font-display text-primary group-hover:text-secondary transition-colors">
                    {design.name}
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-2">
                    {design.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-border-subtle">
                    <span className="text-text-muted font-mono">From</span>
                    <span className="font-bold font-mono text-primary text-base tabular-nums">
                      {formatNaira(design.startingPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link href={`/designs/${design.id}`}>
                  <Button variant="primary" size="sm" className="w-full font-mono text-xs">
                    Configure & Tailor &rarr;
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. BULK & ASO EBI SECTION (20+ Pieces) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-surface-card rounded-md border-2 border-border-seam p-6 md:p-10 relative overflow-hidden shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="brass" size="sm">
                  GROUPS & CELEBRATIONS
                </Badge>
                <span className="text-xs font-mono text-text-muted">20+ PIECES SYNCHRONIZED</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-primary">
                Aso Ebi & Corporate Uniforms with Zero Tears.
              </h2>

              <p className="text-sm text-text-muted leading-relaxed max-w-2xl text-pretty">
                Bridal trains, groomsmen, chieftaincy titles, and corporate bank branches.
                We coordinate individual fittings for every member, track measurements on a
                shared roster matrix, and deliver all pieces on one synchronized date.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-4 h-4 text-accent-emerald shrink-0" />
                  <span>One Synchronized Date</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-4 h-4 text-accent-emerald shrink-0" />
                  <span>Doorstep Fitting Session</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-4 h-4 text-accent-emerald shrink-0" />
                  <span>Individual Fit Profiles</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link href="/bulk">
                  <Button size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Open Bulk Roster Form
                  </Button>
                </Link>
                <WhatsAppButton label="Discuss Wedding Timeline" />
              </div>
            </div>

            <div className="lg:col-span-4 bg-surface-muted p-5 rounded-sm border border-border-seam space-y-3">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider block font-bold">
                Live Group Roster Preview
              </span>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 bg-surface-card rounded-sm border border-border-subtle">
                  <span>Groomsman 1 (Lekki)</span>
                  <span className="text-accent-emerald font-bold">Confirmed</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface-card rounded-sm border border-border-subtle">
                  <span>Groomsman 2 (Ikeja)</span>
                  <span className="text-accent-emerald font-bold">Confirmed</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface-card rounded-sm border border-border-subtle">
                  <span>Groomsman 3 (Yaba)</span>
                  <span className="text-amber-600 font-bold">Booked 29 Oct</span>
                </div>
              </div>
              <p className="text-[11px] text-text-muted">
                One master delivery deadline: Saturday, 28 Nov 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHATSAPP & CONCIERGE BANNER */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-[#0C1829] to-[#15233D] text-white p-6 md:p-8 rounded-md flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-accent-emerald">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-display text-white">
              Need immediate advice or have fabric already?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with our Master Tailors in Lagos. Send photos or schedule a WhatsApp video measurement.
            </p>
          </div>
          <WhatsAppButton label="Message Atelier Desk on WhatsApp" />
        </div>
      </section>
    </div>
  );
}

