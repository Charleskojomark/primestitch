"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import { Scissors, ShieldCheck, Ruler, UserCheck, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";

export default function StaffLoginPage() {
  const router = useRouter();
  const { loginStaff, staffRole, logoutStaff, tailors, measurers } = usePrimeStitch();

  const [selectedRole, setSelectedRole] = useState<"admin" | "tailor" | "measurer">("admin");
  const [selectedStaffId, setSelectedStaffId] = useState<string>("admin-01");

  const handleRoleSelect = (role: "admin" | "tailor" | "measurer") => {
    setSelectedRole(role);
    if (role === "admin") setSelectedStaffId("admin-01");
    if (role === "tailor") setSelectedStaffId(tailors[0]?.id || "tl-01");
    if (role === "measurer") setSelectedStaffId(measurers[0]?.id || "ms-01");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginStaff(selectedRole, selectedStaffId);
    if (selectedRole === "admin") router.push("/admin");
    if (selectedRole === "tailor") router.push("/tailor");
    if (selectedRole === "measurer") router.push("/measurer");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-1">
          <Link href="/" aria-label="PrimeStitch">
            <Logo variant="icon" tone="dark" height={32} />
          </Link>
        </div>
        <Badge variant="tape" size="sm">
          Internal Atelier Systems
        </Badge>
        <h1 className="text-3xl font-extrabold font-display text-primary tracking-tight">
          Staff Operational Portal
        </h1>
        <p className="text-xs sm:text-sm text-text-muted">
          Select an operational role to manage order pipelines, update cutting benches, or record doorstep measurements.
        </p>
      </div>

      <Card hasTapeTop className="p-6 md:p-8 space-y-6">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-primary block">
              1. Choose Staff Role:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: "admin",
                  title: "Operations Admin",
                  desc: "All orders, dispatch & team metrics",
                  icon: ShieldCheck,
                },
                {
                  id: "tailor",
                  title: "Master Tailor",
                  desc: "Bench mobile view & stage updates",
                  icon: Scissors,
                },
                {
                  id: "measurer",
                  title: "Field Measurer",
                  desc: "Doorstep fittings & measurement intake",
                  icon: Ruler,
                },
              ].map((r) => {
                const isSelected = selectedRole === r.id;
                const Icon = r.icon;
                return (
                  <div
                    key={r.id}
                    onClick={() => handleRoleSelect(r.id as any)}
                    className={`p-4 rounded-sm border cursor-pointer transition-all select-none ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-subtle ring-2 ring-primary/20"
                        : "bg-surface-card text-on-surface border-border-seam hover:border-slate-400"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-accent-tape" : "text-primary"}`} />
                    <h3 className="font-bold text-sm">{r.title}</h3>
                    <p className={`text-[11px] mt-1 ${isSelected ? "text-slate-300" : "text-text-muted"}`}>
                      {r.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Specific Staff Member Selector */}
          {selectedRole === "tailor" && (
            <div className="space-y-1.5 text-xs">
              <label className="font-mono text-text-muted block font-bold">
                SELECT TAILOR BENCH IDENTITY:
              </label>
              <select
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                className="w-full h-11 px-3 border border-border-seam rounded-sm bg-surface-card font-mono"
              >
                {tailors.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.area} • {t.currentWorkload}/{t.maxCapacity} active)
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedRole === "measurer" && (
            <div className="space-y-1.5 text-xs">
              <label className="font-mono text-text-muted block font-bold">
                SELECT MEASURER IDENTITY:
              </label>
              <select
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                className="w-full h-11 px-3 border border-border-seam rounded-sm bg-surface-card font-mono"
              >
                {measurers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.area})
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button size="lg" type="submit" className="w-full font-bold shadow-raised" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Enter {selectedRole.toUpperCase()} Workspace
          </Button>
        </form>

        {staffRole && (
          <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
            <span className="text-text-muted">
              Currently signed in as: <strong>{staffRole}</strong>
            </span>
            <button
              type="button"
              onClick={logoutStaff}
              className="text-error font-bold hover:underline"
            >
              Sign Out
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}

