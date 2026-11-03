"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import { Scissors, ShieldCheck, Ruler, Lock, AlertCircle, ArrowRight, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";

export default function StaffLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginStaff, staffRole, logoutStaff, tailors, measurers } = usePrimeStitch();

  const redirectTarget = searchParams.get("redirect");
  const authError = searchParams.get("error");
  const defaultRole = searchParams.get("role") as "admin" | "tailor" | "measurer" | null;

  const [selectedRole, setSelectedRole] = useState<"admin" | "tailor" | "measurer">(
    defaultRole || "admin"
  );
  const [selectedStaffId, setSelectedStaffId] = useState<string>("admin-01");
  const [passcode, setPasscode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (defaultRole) {
      setSelectedRole(defaultRole);
      if (defaultRole === "admin") setSelectedStaffId("admin-01");
      if (defaultRole === "tailor") setSelectedStaffId(tailors[0]?.id || "tl-01");
      if (defaultRole === "measurer") setSelectedStaffId(measurers[0]?.id || "ms-01");
    }
  }, [defaultRole, tailors, measurers]);

  const handleRoleSelect = (role: "admin" | "tailor" | "measurer") => {
    setSelectedRole(role);
    setLoginError(null);
    if (role === "admin") setSelectedStaffId("admin-01");
    if (role === "tailor") setSelectedStaffId(tailors[0]?.id || "tl-01");
    if (role === "measurer") setSelectedStaffId(measurers[0]?.id || "ms-01");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!passcode.trim()) {
      setLoginError("Please enter the authorization passcode for this workspace.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/staff-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: selectedRole,
          staffId: selectedStaffId,
          passcode: passcode.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Invalid authorization passcode. Access denied.");
        setIsSubmitting(false);
        return;
      }

      // Set local store state
      loginStaff(selectedRole, selectedStaffId);

      // Redirect to intended destination or role dashboard
      if (redirectTarget) {
        router.push(redirectTarget);
      } else if (selectedRole === "admin") {
        router.push("/admin");
      } else if (selectedRole === "tailor") {
        router.push("/tailor");
      } else if (selectedRole === "measurer") {
        router.push("/measurer");
      }
    } catch (err: any) {
      setLoginError(err.message || "Failed to authenticate staff session.");
    } finally {
      setIsSubmitting(false);
    }
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
          Internal Atelier Workspace
        </Badge>
        <h1 className="text-3xl font-extrabold font-display text-primary tracking-tight">
          Staff Operational Access
        </h1>
        <p className="text-xs sm:text-sm text-text-muted">
          Authorized personnel only. Enter your atelier credentials to manage order pipelines, update cutting benches, or record measurements.
        </p>
      </div>

      {authError && (
        <div className="p-4 bg-error/10 border border-error/30 rounded-sm text-xs font-mono text-error flex items-start gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="block font-bold">Restricted Access</strong>
            <span>
              {authError === "admin_required" && "Operations Administrator access is required to view that area."}
              {authError === "tailor_required" && "Master Tailor credentials are required to view the bench production queue."}
              {authError === "measurer_required" && "Field Measurer credentials are required to access appointments."}
              {!["admin_required", "tailor_required", "measurer_required"].includes(authError) && "Please authenticate with valid atelier credentials."}
            </span>
          </div>
        </div>
      )}

      {loginError && (
        <div className="p-4 bg-error/10 border border-error/30 rounded-sm text-xs font-mono text-error flex items-start gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{loginError}</span>
        </div>
      )}

      <Card hasTapeTop className="p-6 md:p-8 space-y-6 shadow-card">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-primary block">
              1. Select Workspace Role:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: "admin",
                  title: "Operations Admin",
                  desc: "Orders, SLA dispatch & media catalogue",
                  icon: ShieldCheck,
                },
                {
                  id: "tailor",
                  title: "Master Tailor",
                  desc: "Bench workstation & 9-stage updates",
                  icon: Scissors,
                },
                {
                  id: "measurer",
                  title: "Field Measurer",
                  desc: "Doorstep appointments & profile intake",
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

          {/* Passcode Security Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-secondary" />
                <span>2. Staff Authorization Passcode:</span>
              </label>
              <span className="text-[11px] font-mono text-text-muted">Security Guard Active</span>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter staff security passcode..."
                className="w-full h-12 pl-10 pr-4 border border-border-seam rounded-sm bg-surface-card font-mono text-sm tracking-widest text-primary focus:outline-none focus:border-primary"
              />
              <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-[11px] text-text-muted font-mono">
              Only authorized personnel with verified credentials can enter operational spaces.
            </p>
          </div>

          <Button
            size="lg"
            type="submit"
            disabled={isSubmitting}
            className="w-full font-bold shadow-raised"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {isSubmitting ? "Verifying Authorization..." : `Enter ${selectedRole.toUpperCase()} Workspace`}
          </Button>
        </form>

        {staffRole && (
          <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
            <span className="text-text-muted">
              Active Session: <strong className="text-primary uppercase">{staffRole}</strong>
            </span>
            <button
              type="button"
              onClick={logoutStaff}
              className="text-error font-bold hover:underline"
            >
              Sign Out &amp; Lock
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
