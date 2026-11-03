"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePrimeStitch } from "@/lib/store";
import { Scissors, Ruler, ArrowLeft, Phone, MapPin, Mail, ShieldCheck, Check, Edit2, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export default function AdminTeamPage() {
  const { tailors, measurers, staffEmail, linkStaffEmail, updateTailorEmail, updateMeasurerEmail } = usePrimeStitch();

  const [editingStaff, setEditingStaff] = useState<{
    id: string;
    name: string;
    email: string;
    role: "admin" | "tailor" | "measurer";
  } | null>(null);

  const [inputEmail, setInputEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleOpenEdit = (
    id: string,
    name: string,
    currentEmail: string,
    role: "admin" | "tailor" | "measurer"
  ) => {
    setEditingStaff({ id, name, email: currentEmail, role });
    setInputEmail(currentEmail || "");
    setSuccessMsg(null);
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff || !inputEmail.trim()) return;

    linkStaffEmail(editingStaff.role, editingStaff.id, inputEmail.trim());
    setSuccessMsg(`Email successfully linked to ${editingStaff.name}!`);

    setTimeout(() => {
      setEditingStaff(null);
      setSuccessMsg(null);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-seam pb-6">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-primary tracking-tight mt-1">
            Atelier Artisans &amp; Field Roster
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Manage bench allocations, doorstep fitters, and linked email identities for all operational personnel.
          </p>
        </div>
      </div>

      {/* Admin Email Account Card */}
      <Card className="p-4 sm:p-5 border-l-4 border-l-primary bg-surface-card shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-secondary" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-primary">Operations Admin Account</h3>
              <Badge variant="verified" size="sm">Primary Administrator</Badge>
            </div>
            <p className="text-xs font-mono text-text-muted flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-secondary" />
              <span>Linked Email: </span>
              <strong className="text-primary">{staffEmail || "admin@primestitch.com"}</strong>
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            handleOpenEdit(
              "admin-01",
              "Operations Administrator",
              staffEmail || "admin@primestitch.com",
              "admin"
            )
          }
          className="w-full sm:w-auto font-mono text-xs"
          rightIcon={<Edit2 className="w-3.5 h-3.5" />}
        >
          Update Admin Email
        </Button>
      </Card>

      {/* 1. Tailors Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h2 className="text-lg sm:text-xl font-bold font-display text-primary flex items-center gap-2">
            <Scissors className="w-5 h-5 text-secondary -rotate-45" />
            <span>Master Tailors &amp; Bench Capacity ({tailors.length})</span>
          </h2>
          <span className="text-xs font-mono text-text-muted">
            Aba Atelier Capacity: 15 Garments / Day
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tailors.map((tailor) => {
            const utilizationPct = Math.round(
              (tailor.currentWorkload / tailor.maxCapacity) * 100
            );
            const isNearCapacity = utilizationPct >= 80;

            return (
              <Card key={tailor.id} className="p-4 sm:p-5 space-y-4 shadow-subtle hover:border-slate-400 transition-colors">
                <div className="flex items-center gap-3">
                  <PlaceholderImage
                    src={tailor.avatar}
                    alt={tailor.avatarAlt || `Portrait of Master Tailor ${tailor.name}`}
                    aspectRatio="1/1"
                    rounded="full"
                    dimensionsBadge={tailor.avatarDimensions || "600 × 600 px (1:1)"}
                    category="avatar"
                    className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-primary shrink-0"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="font-bold text-base text-primary truncate">
                      {tailor.name}
                    </h3>
                    <span className="text-xs text-text-muted block">
                      ★ {tailor.rating} Rating
                    </span>
                    <span className="text-[11px] font-mono text-primary flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-secondary shrink-0" />
                      <span className="truncate">{tailor.area}</span>
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
                    <span className="text-text-muted">Active Workload:</span>
                    <strong
                      className={
                        isNearCapacity ? "text-amber-700 font-bold" : "text-primary"
                      }
                    >
                      {tailor.currentWorkload} / {tailor.maxCapacity} ({utilizationPct}%)
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

                {/* Linked Email Bar */}
                <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-text-muted truncate max-w-[180px]">
                    <Mail className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span className="truncate">{tailor.email || "No email linked"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(tailor.id, tailor.name, tailor.email || "", "tailor")}
                    className="text-[11px] text-primary font-bold hover:underline shrink-0"
                  >
                    {tailor.email ? "Edit Email" : "+ Link Email"}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 2. Field Measurers Section */}
      <div className="space-y-4 pt-6 border-t border-border-seam">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h2 className="text-lg sm:text-xl font-bold font-display text-primary flex items-center gap-2">
            <Ruler className="w-5 h-5 text-secondary" />
            <span>Doorstep Field Fitters ({measurers.length})</span>
          </h2>
          <span className="text-xs font-mono text-text-muted">
            Active in Aba &amp; Nationwide Corridors
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {measurers.map((measurer) => (
            <Card key={measurer.id} className="p-4 sm:p-5 space-y-4 shadow-subtle hover:border-slate-400 transition-colors">
              <div className="flex items-center gap-3">
                <PlaceholderImage
                  src={measurer.avatar}
                  alt={measurer.avatarAlt || `Portrait of Field Measurer ${measurer.name}`}
                  aspectRatio="1/1"
                  rounded="full"
                  dimensionsBadge={measurer.avatarDimensions || "600 × 600 px (1:1)"}
                  category="avatar"
                  className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-primary shrink-0"
                />
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-primary truncate">
                      {measurer.name}
                    </h3>
                    <Badge variant={measurer.activeToday ? "verified" : "neutral"} size="sm">
                      {measurer.activeToday ? "On Call" : "Off Duty"}
                    </Badge>
                  </div>
                  <span className="text-xs text-text-muted block">
                    ★ {measurer.rating} Rating
                  </span>
                  <span className="text-[11px] font-mono text-primary flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-secondary shrink-0" />
                    <span className="truncate">{measurer.area}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-1 text-text-muted border-t border-border-subtle">
                <span>Phone: {measurer.phone}</span>
                <span className="text-accent-emerald font-bold">Certified Fitter</span>
              </div>

              {/* Linked Email Bar */}
              <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-text-muted truncate max-w-[180px]">
                  <Mail className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span className="truncate">{measurer.email || "No email linked"}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(measurer.id, measurer.name, measurer.email || "", "measurer")}
                  className="text-[11px] text-primary font-bold hover:underline shrink-0"
                >
                  {measurer.email ? "Edit Email" : "+ Link Email"}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Staff Email Modal */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 space-y-4 bg-surface-card border-2 border-primary shadow-raised animate-fadeIn">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-secondary" />
                <h3 className="font-bold text-base font-display text-primary">
                  Link Staff Email
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingStaff(null)}
                className="text-text-muted hover:text-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEmail} className="space-y-4">
              <div className="space-y-1 text-xs">
                <span className="font-mono text-text-muted">Staff Member:</span>
                <strong className="block text-sm text-primary">{editingStaff.name} ({editingStaff.role.toUpperCase()})</strong>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <label className="font-bold text-primary block uppercase">
                  Staff Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="e.g. tailor@primestitch.com"
                  className="w-full h-11 px-3 border border-border-seam rounded-sm bg-surface-card text-primary font-mono text-xs focus:outline-none focus:border-primary"
                  autoFocus
                />
                <p className="text-[11px] text-text-muted">
                  Used for production notifications, customer measurement logs, and system sign-in.
                </p>
              </div>

              {successMsg && (
                <div className="p-3 bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald text-xs font-mono rounded-sm flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-border-subtle">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingStaff(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" variant="primary">
                  Save &amp; Link Email
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
