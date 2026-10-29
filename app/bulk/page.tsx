"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, formatDate } from "@/lib/utils";
import {
  Users,
  CheckCircle,
  Plus,
  Trash2,
  Calendar,
  Clock,
  ShieldCheck,
  Building,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DeliveryBanner } from "@/components/ui/DeliveryBanner";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BulkRosterItem } from "@/lib/types";

export default function BulkAsoEbiPage() {
  const { createBulkRequest, designs } = usePrimeStitch();

  const [groupName, setGroupName] = useState("Adeyemi & Oduwole Wedding Aso Ebi");
  const [occasion, setOccasion] = useState("Traditional Wedding & Reception");
  const [targetDeliveryDate, setTargetDeliveryDate] = useState("2026-11-28");
  const [designId, setDesignId] = useState("des-asoebi");
  const [contactName, setContactName] = useState("Bisi Adeyemi (Chief Bridesmaid)");
  const [contactPhone, setContactPhone] = useState("+234 803 555 4920");
  const [contactEmail, setContactEmail] = useState("bisi.adeyemi@weddings.ng");
  const [location, setLocation] = useState("Havilah Event Centre, Oniru, Victoria Island, Lagos");
  const [bookingRequested, setBookingRequested] = useState(true);
  const [submittedRequest, setSubmittedRequest] = useState<any>(null);

  const [roster, setRoster] = useState<BulkRosterItem[]>([
    { id: "1", memberRole: "Chief Bridesmaid", memberName: "Bisi Adeyemi", measurementStatus: "confirmed", sizeNotes: "Tall fit, 5'10\"" },
    { id: "2", memberRole: "Bridesmaid 1", memberName: "Chidinma Nwosu", measurementStatus: "confirmed", sizeNotes: "Standard Size 10" },
    { id: "3", memberRole: "Bridesmaid 2", memberName: "Funmi Adeleke", measurementStatus: "pending", sizeNotes: "Awaiting fitting" },
    { id: "4", memberRole: "Bridesmaid 3", memberName: "Zainab Sanusi", measurementStatus: "pending", sizeNotes: "Will measure at Oniru session" },
    { id: "5", memberRole: "Mother of the Bride", memberName: "Mrs. Toyin Adeyemi", measurementStatus: "confirmed", sizeNotes: "Modest neckline" },
  ]);

  const addRosterMember = () => {
    const nextIdx = roster.length + 1;
    setRoster([
      ...roster,
      {
        id: String(Date.now()),
        memberRole: `Group Member ${nextIdx}`,
        memberName: "",
        measurementStatus: "pending",
        sizeNotes: "",
      },
    ]);
  };

  const removeRosterMember = (id: string) => {
    if (roster.length <= 1) return;
    setRoster(roster.filter((m) => m.id !== id));
  };

  const updateMember = (id: string, updates: Partial<BulkRosterItem>) => {
    setRoster(roster.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selDesign = designs.find((d) => d.id === designId) || designs[0];
    const newReq = createBulkRequest({
      groupName,
      occasion,
      targetDeliveryDate,
      totalPieces: roster.length,
      designId: selDesign.id,
      designName: selDesign.name,
      contactName,
      contactPhone,
      contactEmail,
      location,
      bookingRequested,
      roster,
    });
    setSubmittedRequest(newReq);
  };

  if (submittedRequest) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-6 text-center animate-fadeIn">
        <Card hasTapeTop className="p-8 space-y-6">
          <div className="w-16 h-16 rounded-full bg-accent-emerald text-white flex items-center justify-center mx-auto shadow-raised">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <Badge variant="verified" size="md">
              Group Quote Requested • {submittedRequest.id}
            </Badge>
            <h1 className="text-3xl font-extrabold font-display text-primary">
              Group Order Synchronized
            </h1>
            <p className="text-sm text-text-muted max-w-md mx-auto text-pretty">
              Your group roster of {submittedRequest.totalPieces} pieces for "{submittedRequest.groupName}" has been submitted to the Master Cutter.
            </p>
          </div>

          <div className="p-4 bg-primary text-white rounded-md text-left space-y-1 font-mono text-xs">
            <div className="flex justify-between text-accent-tape font-bold">
              <span>TARGET SYNCHRONIZED DELIVERY:</span>
              <span>{formatDate(submittedRequest.targetDeliveryDate)}</span>
            </div>
            <div className="text-slate-300">
              Joint fitting location: {submittedRequest.location}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link href="/designs" className="flex-1">
              <Button size="lg" className="w-full">
                Return to Catalogue &rarr;
              </Button>
            </Link>
            <WhatsAppButton label="Discuss Group Quote on WhatsApp" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="brass" size="sm">
            Celebration Coordination
          </Badge>
          <span className="text-xs font-mono text-text-muted">20+ PIECES SYNCHRONIZED</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-primary tracking-tight">
          Aso Ebi, Bridal Trains & Corporate Fleets
        </h1>
        <p className="text-sm md:text-base text-text-muted max-w-2xl text-pretty leading-relaxed">
          Eliminate tailoring heartbreak for your big day. We synchronize pattern cutting, manage individual fittings across Lagos, and guarantee one shared delivery date for the entire group.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Occasion & Event Details */}
        <Card className="p-4 sm:p-6 md:p-8 space-y-6">
          <div className="border-b border-border-subtle pb-4 space-y-1">
            <h2 className="text-xl font-bold font-display text-primary">
              1. Event & Timeline Details
            </h2>
            <p className="text-xs text-text-muted">
              All pieces in this batch will be calibrated to deliver on the single target date below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-xs">
              <label className="font-medium text-on-surface">Group or Wedding Name *</label>
              <input
                type="text"
                required
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g. The Adeleke Wedding Aso Ebi"
                className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-medium text-on-surface">Occasion Type *</label>
              <input
                type="text"
                required
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                placeholder="e.g. Traditional Wedding, Corporate Uniforms..."
                className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 text-xs">
              <label className="font-medium text-on-surface">Select Silhouette / Design *</label>
              <select
                value={designId}
                onChange={(e) => setDesignId(e.target.value)}
                className="w-full h-11 px-3 border border-border-seam rounded-sm bg-surface-card font-mono"
              >
                {designs.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-medium text-on-surface">One Shared Delivery Date *</label>
              <input
                type="date"
                required
                value={targetDeliveryDate}
                onChange={(e) => setTargetDeliveryDate(e.target.value)}
                className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card font-mono"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-medium text-on-surface">Group Fitting Location (Lagos) *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Venue / Hotel address"
                className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border-subtle pt-4">
            <div className="space-y-1.5 text-xs">
              <label className="font-medium text-on-surface">Group Coordinator Name *</label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-medium text-on-surface">Coordinator Phone (WhatsApp) *</label>
              <input
                type="tel"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card font-mono"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-medium text-on-surface">Coordinator Email *</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card"
              />
            </div>
          </div>
        </Card>

        {/* Step 2: Interactive Member Roster Table */}
        <Card className="p-4 sm:p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
            <div>
              <h2 className="text-xl font-bold font-display text-primary flex items-center gap-2">
                <span>2. Member Roster Table</span>
                <Badge variant="tape" size="sm">
                  {roster.length} Pieces
                </Badge>
              </h2>
              <p className="text-xs text-text-muted">
                Track each member's role, name, fitting status, and individual size notes.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRosterMember}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              className="w-full sm:w-auto"
            >
              Add Member Row
            </Button>
          </div>

          {/* Mobile scroll hint */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted sm:hidden">
            <span>&larr; Swipe table horizontally &rarr;</span>
          </div>

          {/* Roster Table */}
          <div className="w-full max-w-full overflow-x-auto scroll-touch rounded-sm border border-border-subtle p-1">
            <table className="w-full min-w-[580px] text-left text-xs">
              <thead>
                <tr className="border-b border-border-seam font-mono text-text-muted uppercase text-[11px]">
                  <th className="pb-3 w-10">#</th>
                  <th className="pb-3">Role in Group</th>
                  <th className="pb-3">Member Full Name</th>
                  <th className="pb-3">Fit Status</th>
                  <th className="pb-3">Height / Sizing Notes</th>
                  <th className="pb-3 w-10 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {roster.map((member, idx) => (
                  <tr key={member.id} className="hover:bg-surface-muted/50">
                    <td className="py-2.5 font-mono text-text-muted">{idx + 1}</td>
                    <td className="py-2.5 pr-2">
                      <input
                        type="text"
                        value={member.memberRole}
                        onChange={(e) => updateMember(member.id, { memberRole: e.target.value })}
                        className="w-full h-9 px-2.5 border border-border-seam rounded-sm bg-surface-card text-xs"
                      />
                    </td>
                    <td className="py-2.5 pr-2">
                      <input
                        type="text"
                        placeholder="e.g. Tunde Adebayo"
                        value={member.memberName}
                        onChange={(e) => updateMember(member.id, { memberName: e.target.value })}
                        className="w-full h-9 px-2.5 border border-border-seam rounded-sm bg-surface-card text-xs"
                      />
                    </td>
                    <td className="py-2.5 pr-2">
                      <select
                        value={member.measurementStatus}
                        onChange={(e) =>
                          updateMember(member.id, { measurementStatus: e.target.value as any })
                        }
                        className="w-full h-9 px-2 border border-border-seam rounded-sm bg-surface-card text-xs font-mono"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="recorded">Recorded</option>
                      </select>
                    </td>
                    <td className="py-2.5 pr-2">
                      <input
                        type="text"
                        placeholder="e.g. 6'2 tall, slim waist..."
                        value={member.sizeNotes || ""}
                        onChange={(e) => updateMember(member.id, { sizeNotes: e.target.value })}
                        className="w-full h-9 px-2.5 border border-border-seam rounded-sm bg-surface-card text-xs"
                      />
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => removeRosterMember(member.id)}
                        disabled={roster.length <= 1}
                        className="p-2 text-text-muted hover:text-error disabled:opacity-30"
                        aria-label={`Remove member ${idx + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-surface-muted rounded-sm border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <input
                id="req-booking"
                type="checkbox"
                checked={bookingRequested}
                onChange={(e) => setBookingRequested(e.target.checked)}
                className="w-4 h-4 rounded text-primary"
              />
              <label htmlFor="req-booking" className="font-semibold text-primary">
                Send 2 Master Fitters for a Dedicated On-Site Fitting Session
              </label>
            </div>
            <span className="font-mono text-accent-emerald font-bold">
              ✓ Free for 20+ Pieces
            </span>
          </div>

          <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="text-xs text-text-muted font-mono text-center sm:text-left">
              Total garments in synchronized batch: <strong>{roster.length}</strong>
            </div>
            <Button size="lg" type="submit" className="w-full sm:w-auto font-bold shadow-raised text-center whitespace-normal">
              Submit Roster & Receive Synchronized Quote &rarr;
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}

