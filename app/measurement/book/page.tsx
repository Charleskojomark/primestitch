"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira } from "@/lib/utils";
import {
  Scissors,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Video,
  ShieldCheck,
  User,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function BookMeasurementPage() {
  const { measurers, createBooking, customerProfile } = usePrimeStitch();

  const [venueType, setVenueType] = useState<"home" | "office" | "event_venue">("home");
  const [address, setAddress] = useState("14 Admiralty Way, Lekki Phase 1, Lagos");
  const [area, setArea] = useState("Lekki Phase 1");
  const [date, setDate] = useState("2026-10-31");
  const [timeSlot, setTimeSlot] = useState("11:00 AM - 12:30 PM");
  const [customerName, setCustomerName] = useState(customerProfile.name);
  const [customerPhone, setCustomerPhone] = useState(customerProfile.phone);
  const [notes, setNotes] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Pick suitable measurer based on area
  const matchedMeasurer =
    measurers.find((m) => m.area.toLowerCase().includes(area.toLowerCase().split(" ")[0])) ||
    measurers[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking = createBooking({
      customerName,
      customerPhone,
      venueType,
      address,
      area,
      date,
      timeSlot,
      measurerId: matchedMeasurer.id,
      measurerName: matchedMeasurer.name,
      measurerPhone: matchedMeasurer.phone,
      sessionFee: 5000,
      notes,
    });
    setConfirmedBooking(newBooking);
  };

  if (confirmedBooking) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8 animate-fadeIn">
        <Card hasTapeTop className="p-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-accent-emerald text-white flex items-center justify-center mx-auto shadow-subtle">
            <CheckCircle className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <Badge variant="verified" size="sm">
              Appointment Locked • {confirmedBooking.id}
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-primary">
              Your Lagos Fitting is Confirmed
            </h1>
            <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto text-pretty">
              A certified PrimeStitch master fitter is assigned to your location. You will receive an SMS reminder 2 hours before arrival.
            </p>
          </div>

          {/* Assigned Measurer Card */}
          <div className="bg-surface-muted p-5 rounded-md border border-border-seam text-left flex items-center gap-4">
            <img
              src={matchedMeasurer.avatar}
              alt={matchedMeasurer.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary shrink-0"
            />
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">
                Assigned Master Fitter
              </span>
              <h3 className="font-bold text-base text-primary">
                {matchedMeasurer.name}
              </h3>
              <p className="text-xs text-text-muted">
                Coverage: {matchedMeasurer.area}
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-xs text-primary font-semibold">
                <Phone className="w-3.5 h-3.5 text-accent-tape" />
                <span>{matchedMeasurer.phone}</span>
              </div>
            </div>
          </div>

          {/* Appointment Recap Details */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono text-left bg-surface-card p-4 rounded-sm border border-border-subtle">
            <div>
              <span className="text-text-muted block text-[10px]">DATE & SLOT:</span>
              <strong className="text-primary font-sans text-sm">
                {confirmedBooking.date} • {confirmedBooking.timeSlot}
              </strong>
            </div>
            <div>
              <span className="text-text-muted block text-[10px]">LOCATION:</span>
              <span className="text-primary truncate block">{confirmedBooking.address}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link href="/designs" className="flex-1">
              <Button size="md" className="w-full">
                Browse Catalogue While Waiting &rarr;
              </Button>
            </Link>
            <WhatsAppButton label="Message Fitter on WhatsApp" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="tape" size="sm">
            Doorstep Bespoke Service
          </Badge>
          <span className="text-xs font-mono text-text-muted">LAGOS METROPOLITAN FITTERS</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-primary tracking-tight">
          Book a Professional Home or Office Measurement
        </h1>
        <p className="text-sm md:text-base text-text-muted max-w-2xl text-pretty leading-relaxed">
          Take the guesswork out of bespoke tailoring. A PrimeStitch master fitter brings cloth sample swatches, laser chest rules, and anatomical tapes directly to your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Booking Form */}
        <div className="lg:col-span-8 min-w-0">
          <Card className="p-4 sm:p-6 md:p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Venue Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-primary block">
                  1. Where should we meet you?
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
                  {[
                    { id: "home", label: "Home Fitting" },
                    { id: "office", label: "Office / Work" },
                    { id: "event_venue", label: "Event / Hotel" },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVenueType(v.id as any)}
                      className={`min-touch-target p-2 sm:p-3 rounded-sm border font-medium transition-all text-center leading-tight ${
                        venueType === v.id
                          ? "bg-primary text-white border-primary font-bold shadow-subtle"
                          : "bg-surface-card text-on-surface border-border-seam hover:bg-surface-muted"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lagos Area & Full Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <label className="font-medium text-on-surface">Lagos Area Coverage *</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full h-11 px-3 border border-border-seam rounded-sm bg-surface-card font-mono"
                  >
                    <option value="Lekki Phase 1">Lekki Phase 1 / Oniru</option>
                    <option value="Ikoyi">Ikoyi / Banana Island</option>
                    <option value="Victoria Island">Victoria Island</option>
                    <option value="Ikeja GRA">Ikeja GRA / Maryland</option>
                    <option value="Yaba">Yaba / Surulere</option>
                    <option value="Ajah">Ajah / Sangotedo</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-medium text-on-surface">Street Address & Landmark *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 14 Admiralty Way, Lekki"
                    className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <label className="font-medium text-on-surface">Preferred Appointment Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card font-mono"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-medium text-on-surface">Time Window *</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full h-11 px-3 border border-border-seam rounded-sm bg-surface-card font-mono"
                  >
                    <option value="09:00 AM - 10:30 AM">09:00 AM - 10:30 AM</option>
                    <option value="11:00 AM - 12:30 PM">11:00 AM - 12:30 PM</option>
                    <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM</option>
                    <option value="04:00 PM - 05:30 PM">04:00 PM - 05:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <label className="font-medium text-on-surface">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-medium text-on-surface">WhatsApp Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card font-mono"
                  />
                </div>
              </div>

              {/* Special instructions */}
              <div className="space-y-1.5 text-xs">
                <label className="font-medium text-on-surface">Gate Access / Special Instructions</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Call at the security estate gate; measuring for agbada & senator..."
                  className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card"
                />
              </div>

              {/* Fee Notice */}
              <div className="p-3.5 bg-surface-muted rounded-sm border border-border-subtle flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-text-muted block">Measurement Session Fee:</span>
                  <span className="font-bold text-primary text-sm">₦5,000</span>
                  <span className="text-[10px] text-accent-emerald block">
                    (Credited back 100% on any order above ₦100,000)
                  </span>
                </div>
                <Badge variant="tape" size="sm">
                  Pay On Arrival / Card
                </Badge>
              </div>

              <Button size="lg" type="submit" className="w-full font-bold shadow-raised">
                Confirm Measurement Booking &rarr;
              </Button>
            </form>
          </Card>
        </div>

        {/* Right Column: WhatsApp Video Alternative & Fitter Profile */}
        <div className="lg:col-span-4 space-y-6">
          {/* Matched Fitter Card */}
          <Card className="p-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted block font-bold">
              Assigned Specialist for {area}
            </span>
            <div className="flex items-center gap-3">
              <img
                src={matchedMeasurer.avatar}
                alt={matchedMeasurer.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary shrink-0"
              />
              <div className="space-y-0.5">
                <h3 className="font-bold text-sm text-primary">
                  {matchedMeasurer.name}
                </h3>
                <span className="text-xs text-text-muted block">
                  ★ {matchedMeasurer.rating} Rating (500+ Fits)
                </span>
                <span className="text-[11px] font-mono text-accent-emerald font-semibold">
                  Active in {area} today
                </span>
              </div>
            </div>
            <p className="text-xs text-text-muted text-pretty">
              Brings official tailoring tapes, fabric swatches, and enters your verified measurements directly into your PrimeStitch profile.
            </p>
          </Card>

          {/* WhatsApp Video-Measurement Alternative */}
          <Card className="p-5 bg-gradient-to-br from-[#0B1528] to-[#162744] text-white border-2 border-accent-emerald space-y-3">
            <div className="flex items-center gap-2 text-accent-emerald font-bold text-xs uppercase font-mono">
              <Video className="w-4 h-4" />
              <span>In A Hurry? 5-Min Video Fitting</span>
            </div>
            <h3 className="text-base font-bold font-display text-white">
              WhatsApp Video Measurement
            </h3>
            <p className="text-xs text-slate-300 text-pretty">
              Can&apos;t wait for a home visit? Connect live on WhatsApp video with our senior cutter right now. Have a friend or cloth tape ready.
            </p>
            <WhatsAppButton label="Start 5-Min Video Measurement" className="w-full" />
          </Card>
        </div>
      </div>
    </div>
  );
}

