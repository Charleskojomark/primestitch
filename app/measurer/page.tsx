"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import {
  Ruler,
  Phone,
  MapPin,
  CheckCircle,
  Scissors,
  Camera,
  ArrowRight,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MeasurementInput } from "@/components/ui/MeasurementInput";

export default function MeasurerMobileWorkspacePage() {
  const router = useRouter();
  const { bookings, measurers, activeStaffId, orders, updateBooking } = usePrimeStitch();

  // Find active measurer
  const measurer =
    measurers.find((m) => m.id === activeStaffId) || measurers[0];

  const myAppointments = bookings.filter(
    (b) => b.measurerId === measurer.id || b.measurerName === measurer.name
  );

  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    myAppointments[0]?.id || ""
  );
  const [targetOrderId, setTargetOrderId] = useState<string>("#PS-8493");

  const [measurements, setMeasurements] = useState<any>({
    unit: "in",
    chest: 42,
    shoulder: 19,
    sleeveLength: 35,
    neck: 16.5,
    waist: 36,
    trouserLength: 42,
    thigh: 24,
    bicep: 15,
  });

  const [fitNotes, setFitNotes] = useState("Athletic broad build; customer requests 2-inch cuff break.");
  const [photoUploaded, setPhotoUploaded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBooking =
    myAppointments.find((b) => b.id === selectedBookingId) || myAppointments[0];

  const handleMeasurementChange = (field: string, val: number) => {
    setMeasurements((prev: any) => ({ ...prev, [field]: val }));
  };

  const handleSubmitMeasurements = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (selectedBooking) {
      updateBooking(selectedBooking.id, {
        status: "completed",
        recordedMeasurements: measurements,
        notes: fitNotes,
      });
    }

    setTimeout(() => {
      setIsSubmitting(false);
      // Sends customer directly to review & confirm screen as requested!
      router.push(`/measurement/confirm/${encodeURIComponent(targetOrderId)}`);
    }, 400);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Fitter Mobile Header */}
      <div className="bg-primary text-white p-5 rounded-md border-b-4 border-accent-tape tape-measure-top space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="tape" size="sm">
            Field Fitter Mobile Hub
          </Badge>
          <Link href="/staff/login" className="text-xs font-mono text-slate-300 hover:underline">
            Switch Staff
          </Link>
        </div>
        <h1 className="text-2xl font-bold font-display text-white">
          {measurer.name}
        </h1>
        <p className="text-xs text-slate-300 font-mono">
          Coverage: {measurer.area} • {myAppointments.length} Appointments Today
        </p>
      </div>

      {/* Appointment Selection Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-primary block">
          Select Active Appointment:
        </label>
        <div className="space-y-2">
          {myAppointments.map((app) => {
            const isSelected = selectedBookingId === app.id;
            return (
              <div
                key={app.id}
                onClick={() => setSelectedBookingId(app.id)}
                className={`p-3.5 rounded-sm border cursor-pointer transition-all text-xs select-none ${
                  isSelected
                    ? "bg-surface-card border-primary ring-2 ring-primary/20 shadow-subtle"
                    : "bg-surface-card border-border-seam hover:border-slate-400"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-primary">{app.id}</span>
                      <strong className="text-primary text-sm font-sans">{app.customerName}</strong>
                    </div>
                    <p className="text-text-muted mt-0.5">{app.address} ({app.area})</p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-primary block">{app.timeSlot}</span>
                    <Badge variant={app.status === "completed" ? "verified" : "neutral"} size="sm">
                      {app.status}
                    </Badge>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-border-subtle flex justify-between items-center text-text-muted">
                  <a
                    href={`tel:${app.customerPhone}`}
                    className="flex items-center gap-1 text-primary font-bold hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5 text-accent-tape" />
                    <span>Call Customer: {app.customerPhone}</span>
                  </a>
                  <span className="capitalize">{app.venueType}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Standard Anatomic Checklist Form */}
      <Card className="p-6 space-y-6">
        <div className="border-b border-border-subtle pb-4 space-y-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-display text-primary">
              Standard Fitting Checklist (Inches)
            </h2>
            <Badge variant="outline" size="sm">
              Laser Tape Active
            </Badge>
          </div>
          <p className="text-xs text-text-muted">
            Record all required anatomic points. Submitting sends data directly to the customer for final lock.
          </p>
        </div>

        <form onSubmit={handleSubmitMeasurements} className="space-y-6">
          {/* Target Order Linking */}
          <div className="space-y-1.5 text-xs font-mono bg-surface-muted p-3 rounded-sm border border-border-subtle">
            <label className="font-bold text-primary block">
              LINK MEASUREMENTS TO ORDER:
            </label>
            <select
              value={targetOrderId}
              onChange={(e) => setTargetOrderId(e.target.value)}
              className="w-full h-10 px-3 border border-border-seam rounded-sm bg-surface-card font-mono text-xs"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.id} — {o.customerName} ({o.items[0]?.designName})
                </option>
              ))}
            </select>
          </div>

          {/* Standard Anatomic Checklist Input Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MeasurementInput
              label="Chest Circumference"
              field="chest"
              unit="in"
              value={measurements.chest}
              min={30}
              max={60}
              hint="Tape across fullest pectoral line."
              onChange={(val) => handleMeasurementChange("chest", val)}
              required
            />
            <MeasurementInput
              label="Shoulder Breadth"
              field="shoulder"
              unit="in"
              value={measurements.shoulder}
              min={14}
              max={25}
              hint="Bone to bone across upper back."
              onChange={(val) => handleMeasurementChange("shoulder", val)}
              required
            />
            <MeasurementInput
              label="Sleeve Length"
              field="sleeveLength"
              unit="in"
              value={measurements.sleeveLength}
              min={20}
              max={40}
              hint="Shoulder down to wrist bone."
              onChange={(val) => handleMeasurementChange("sleeveLength", val)}
              required
            />
            <MeasurementInput
              label="Neck Circumference"
              field="neck"
              unit="in"
              value={measurements.neck}
              min={13}
              max={22}
              hint="Base of neck, 2-finger breathing gap."
              onChange={(val) => handleMeasurementChange("neck", val)}
              required
            />
            <MeasurementInput
              label="Waistline"
              field="waist"
              unit="in"
              value={measurements.waist}
              min={26}
              max={56}
              hint="Where waistband sits comfortably."
              onChange={(val) => handleMeasurementChange("waist", val)}
              required
            />
            <MeasurementInput
              label="Trouser Outseam Length"
              field="trouserLength"
              unit="in"
              value={measurements.trouserLength}
              min={36}
              max={50}
              hint="Waist down outside seam to shoe heel break."
              onChange={(val) => handleMeasurementChange("trouserLength", val)}
              required
            />
            <MeasurementInput
              label="Thigh Circumference"
              field="thigh"
              unit="in"
              value={measurements.thigh}
              min={18}
              max={36}
              onChange={(val) => handleMeasurementChange("thigh", val)}
            />
            <MeasurementInput
              label="Bicep Circumference"
              field="bicep"
              unit="in"
              value={measurements.bicep}
              min={10}
              max={24}
              onChange={(val) => handleMeasurementChange("bicep", val)}
            />
          </div>

          {/* Reference Photos & Notes */}
          <div className="space-y-4 pt-2 border-t border-border-subtle">
            <div className="space-y-1.5 text-xs">
              <label className="font-medium text-on-surface">Artisan Fitting Notes</label>
              <textarea
                rows={2}
                value={fitNotes}
                onChange={(e) => setFitNotes(e.target.value)}
                placeholder="Posture notes, dropped shoulder, custom ease preferences..."
                className="w-full p-3 border border-border-seam rounded-sm bg-surface-card"
              />
            </div>

            <div className="p-3 bg-surface-muted rounded-sm border border-border-subtle flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-text-muted">
                <Camera className="w-4 h-4 text-primary" />
                <span>Reference Posture Photo Attached (Front & Side)</span>
              </div>
              <span className="text-accent-emerald font-bold">✓ Ready</span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <Button
              size="lg"
              type="submit"
              isLoading={isSubmitting}
              className="w-full text-base font-bold shadow-raised"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Submit Measurements to Customer Confirmation &rarr;
            </Button>
            <p className="text-[11px] text-center text-text-muted font-mono mt-2">
              Submitting advances order and opens the customer verification lock screen.
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}

