"use client";

import React from "react";
import Link from "next/link";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, formatDate } from "@/lib/utils";
import {
  Scissors,
  Clock,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Users,
  Ruler,
  Layers,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { STAGES } from "@/lib/types";

export default function AdminDashboardPage() {
  const { orders, bookings, tailors, measurers } = usePrimeStitch();

  // Metrics
  const totalOrders = orders.length;
  const atRiskOrders = orders.filter((o) => o.isAtRisk && !o.isLate);
  const lateOrders = orders.filter((o) => o.isLate);
  const deliveredOrders = orders.filter((o) => o.status === "Delivered");

  // On-time rate calculation
  const onTimeRate = Math.round(
    ((totalOrders - lateOrders.length) / (totalOrders || 1)) * 100
  );

  // Stage distribution counts
  const stageCounts: Record<string, number> = {};
  STAGES.forEach((s) => {
    stageCounts[s] = orders.filter((o) => o.status === s).length;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-seam pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="tape" size="sm">
              Atelier Command Center
            </Badge>
            <span className="text-xs font-mono text-text-muted">LAGOS OPERATIONS</span>
          </div>
          <h1 className="text-3xl font-extrabold font-display text-primary tracking-tight mt-1">
            Production & Delivery SLA Dashboard
          </h1>
        </div>

        {/* Navigation Tabs to sub-admin views */}
        <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
          <Link href="/admin/orders">
            <Button variant="outline" size="sm">
              All Orders ({orders.length})
            </Button>
          </Link>
          <Link href="/admin/measurements">
            <Button variant="outline" size="sm">
              Bookings ({bookings.length})
            </Button>
          </Link>
          <Link href="/admin/team">
            <Button variant="outline" size="sm">
              Team & Benches ({tailors.length})
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* On-Time Delivery Rate */}
        <Card className="p-5 space-y-2 border-t-4 border-t-accent-emerald">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-text-muted">On-Time SLA Rate</span>
            <TrendingUp className="w-4 h-4 text-accent-emerald" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-primary tabular-nums">
            {onTimeRate}%
          </div>
          <span className="text-[11px] text-accent-emerald font-semibold block">
            Target: &gt;98% guaranteed handover
          </span>
        </Card>

        {/* Active In-Production */}
        <Card className="p-5 space-y-2 border-t-4 border-t-primary">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-text-muted">Active On Bench</span>
            <Scissors className="w-4 h-4 text-primary -rotate-45" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-primary tabular-nums">
            {orders.filter((o) => o.status !== "Delivered").length}
          </div>
          <span className="text-[11px] text-text-muted font-mono block">
            Across 5 master tailors
          </span>
        </Card>

        {/* At Risk Orders */}
        <Card className="p-5 space-y-2 border-t-4 border-t-accent-tape">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-text-muted">At-Risk Orders</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-700 tabular-nums">
            {atRiskOrders.length}
          </div>
          <span className="text-[11px] text-amber-700 font-semibold block">
            Bench attention required
          </span>
        </Card>

        {/* Late Orders - Highlighted in ERROR COLOR */}
        <Card className="p-5 space-y-2 border-t-4 border-t-error bg-error/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-error font-bold">Late Orders SLA</span>
            <AlertCircle className="w-4 h-4 text-error" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-error tabular-nums">
            {lateOrders.length}
          </div>
          <span className="text-[11px] text-error font-bold block">
            Automatic credit triggered
          </span>
        </Card>
      </div>

      {/* SLA CRITICAL ALERTS SECTION (Late & At Risk) */}
      {(lateOrders.length > 0 || atRiskOrders.length > 0) && (
        <div className="space-y-3">
          <h2 className="text-base font-bold font-mono uppercase tracking-wider text-error flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>SLA Attention Required: Behind Schedule Orders</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lateOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 bg-surface-card border-2 border-error rounded-sm shadow-subtle space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-error text-base">{ord.id}</span>
                    <Badge variant="error" size="sm">
                      🚨 LATE
                    </Badge>
                  </div>
                  <span className="text-xs font-mono text-error font-bold">
                    Passed {formatDate(ord.guaranteedDeliveryDate)}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <div>Customer: <strong className="text-primary">{ord.customerName}</strong> ({ord.customerPhone})</div>
                  <div>Outfit: <strong>{ord.items[0]?.designName}</strong> • Current Stage: <strong className="text-error uppercase">{ord.status}</strong></div>
                  <div>Tailor Assigned: <strong>{ord.assignedTailorName}</strong></div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-error/20 text-xs">
                  <span className="text-[11px] text-error font-semibold">
                    ₦15,000 credit issued; priority rider booked
                  </span>
                  <Link href={`/admin/orders/${encodeURIComponent(ord.id)}`}>
                    <Button variant="danger" size="sm">
                      Intervene on Order &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

            {atRiskOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 bg-surface-card border-2 border-amber-500 rounded-sm shadow-subtle space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-700 text-base">{ord.id}</span>
                    <Badge variant="tape" size="sm">
                      ⚠️ AT RISK
                    </Badge>
                  </div>
                  <span className="text-xs font-mono text-amber-700 font-bold">
                    Due {formatDate(ord.guaranteedDeliveryDate)}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <div>Customer: <strong className="text-primary">{ord.customerName}</strong></div>
                  <div>Outfit: <strong>{ord.items[0]?.designName}</strong> • Current Stage: <strong>{ord.status}</strong></div>
                  <div>Tailor Assigned: <strong>{ord.assignedTailorName}</strong></div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-amber-200 text-xs">
                  <span className="text-[11px] text-amber-800 font-semibold">
                    Due in &lt;24 hours. Reassign or reinforce bench.
                  </span>
                  <Link href={`/admin/orders/${encodeURIComponent(ord.id)}`}>
                    <Button variant="tape" size="sm">
                      Manage Stage &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9 Stages Visual Distribution */}
      <Card className="p-6 space-y-4">
        <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-primary">
          Orders By Production Stage (Active Pipeline)
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {STAGES.map((stg) => {
            const count = stageCounts[stg] || 0;
            return (
              <div
                key={stg}
                className="p-3 bg-surface-muted rounded-sm border border-border-subtle text-center space-y-1"
              >
                <span className="text-[10px] font-mono uppercase text-text-muted block truncate">
                  {stg}
                </span>
                <span className="text-xl font-bold font-mono text-primary tabular-nums">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Two Columns: Recent Orders Table & Today's Measurement Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Orders (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-display text-primary">
              Live Atelier Pipeline
            </h2>
            <Link href="/admin/orders" className="text-xs font-mono text-primary font-bold hover:underline">
              View All Orders &rarr;
            </Link>
          </div>

          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-surface-muted border-b border-border-seam uppercase text-[11px] text-text-muted">
                  <tr>
                    <th className="p-3">Order</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Outfit</th>
                    <th className="p-3">Stage</th>
                    <th className="p-3">Guaranteed Date</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {orders.slice(0, 6).map((ord) => (
                    <tr key={ord.id} className="hover:bg-surface-muted/50">
                      <td className="p-3 font-bold text-primary">{ord.id}</td>
                      <td className="p-3 font-sans text-on-surface truncate max-w-[120px]">
                        {ord.customerName}
                      </td>
                      <td className="p-3 font-sans text-text-muted truncate max-w-[140px]">
                        {ord.items[0]?.designName}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={ord.isLate ? "error" : ord.isAtRisk ? "tape" : "neutral"}
                          size="sm"
                        >
                          {ord.status}
                        </Badge>
                      </td>
                      <td className="p-3 tabular-nums">{formatDate(ord.guaranteedDeliveryDate)}</td>
                      <td className="p-3 text-right">
                        <Link href={`/admin/orders/${encodeURIComponent(ord.id)}`}>
                          <span className="text-primary font-bold hover:underline">
                            Inspect &rarr;
                          </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Today's Measurement Appointments (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-display text-primary">
              Today's Field Fittings
            </h2>
            <Link href="/admin/measurements" className="text-xs font-mono text-primary font-bold hover:underline">
              Manage &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {bookings.slice(0, 3).map((b) => (
              <Card key={b.id} className="p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-primary">{b.id}</span>
                  <Badge variant={b.status === "scheduled" ? "verified" : "error"} size="sm">
                    {b.status}
                  </Badge>
                </div>
                <div>
                  <strong className="text-primary block font-sans text-sm">{b.customerName}</strong>
                  <span className="text-text-muted block">{b.address} ({b.area})</span>
                </div>
                <div className="text-[11px] font-mono text-text-muted pt-1 border-t border-border-subtle flex justify-between">
                  <span>Slot: {b.timeSlot}</span>
                  <span>Fitter: {b.measurerName?.split(" ")[0]}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

