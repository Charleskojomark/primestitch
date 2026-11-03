"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, formatDate } from "@/lib/utils";
import { Search, Filter, Scissors, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { STAGES, Stage } from "@/lib/types";

export default function AdminOrdersListPage() {
  const { orders } = usePrimeStitch();

  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [selectedPayment, setSelectedPayment] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredOrders = orders.filter((o) => {
    const matchesStage = selectedStage === "All" || o.status === selectedStage;
    const matchesPayment =
      selectedPayment === "All" ||
      (selectedPayment === "fully_paid" && o.paymentStatus === "fully_paid") ||
      (selectedPayment === "deposit_paid" && o.paymentStatus === "deposit_paid");
    const matchesQuery =
      searchQuery === "" ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery);

    return matchesStage && matchesPayment && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-seam pb-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-primary tracking-tight mt-1">
            Master Orders Management
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Real-time tracking of all active atelier orders and locked delivery dates.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by order ID, name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 px-3 pl-9 border border-border-seam rounded-sm bg-surface-card text-xs font-mono"
            />
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-text-muted">Stage:</span>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="flex-1 h-10 px-2.5 border border-border-seam rounded-sm bg-surface-card"
            >
              <option value="All">All 9 Stages ({orders.length})</option>
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s} ({orders.filter((o) => o.status === s).length})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-text-muted">Payment:</span>
            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="flex-1 h-10 px-2.5 border border-border-seam rounded-sm bg-surface-card"
            >
              <option value="All">All Payment States</option>
              <option value="deposit_paid">60% Deposit Paid</option>
              <option value="fully_paid">100% Fully Paid</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Orders View: Responsive Cards for Mobile, Data Table for Desktop */}
      {filteredOrders.length === 0 ? (
        <Card className="p-12 text-center bg-surface-card border border-border-seam">
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-surface-muted flex items-center justify-center border border-border-subtle">
              <Logo variant="icon" tone="dark" height={24} className="opacity-40 grayscale" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold font-display text-primary text-sm">No Orders Found</h3>
              <p className="text-xs font-mono text-text-muted">
                {orders.length === 0
                  ? "No customer orders have been placed yet. New orders will appear here automatically."
                  : "No orders matched your search or filter parameters."}
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <>
          {/* Mobile Orders Cards (block md:hidden) */}
          <div className="block md:hidden space-y-3">
            {filteredOrders.map((ord) => (
              <Card key={ord.id} className="p-4 space-y-3 bg-surface-card border border-border-seam">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-primary text-sm">{ord.id}</span>
                    {ord.isLate ? (
                      <Badge variant="error" size="sm">LATE</Badge>
                    ) : ord.isAtRisk ? (
                      <Badge variant="tape" size="sm">AT RISK</Badge>
                    ) : null}
                  </div>
                  <Badge variant="neutral" size="sm">
                    {ord.status}
                  </Badge>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-primary font-sans text-sm">{ord.customerName}</strong>
                    <a
                      href={`tel:${ord.customerPhone}`}
                      className="text-text-muted font-mono hover:text-primary underline text-[11px]"
                    >
                      {ord.customerPhone}
                    </a>
                  </div>
                  <div className="text-text-muted">
                    <span className="font-medium text-primary">{ord.items[0]?.designName}</span> · {ord.items[0]?.fabricName}
                  </div>
                  <div className="text-[11px] text-text-muted flex items-center justify-between pt-1">
                    <span>Tailor: <strong className="text-primary">{ord.assignedTailorName}</strong></span>
                    <span className="tabular-nums font-bold text-primary">{formatNaira(ord.totalAmount)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border-subtle text-xs font-mono">
                  <span className={ord.isLate ? "text-error font-bold" : "text-text-muted"}>
                    Due: {formatDate(ord.guaranteedDeliveryDate)}
                  </span>
                  <Link href={`/admin/orders/${encodeURIComponent(ord.id)}`} className="w-auto">
                    <Button variant="primary" size="sm">
                      Manage &rarr;
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Orders Table (hidden md:block) */}
          <Card className="hidden md:block p-0 overflow-hidden w-full max-w-full">
            <div className="w-full max-w-full overflow-x-auto scroll-touch">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-surface-muted border-b border-border-seam uppercase text-[11px] text-text-muted">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Customer & Phone</th>
                    <th className="p-3.5">Outfit & Fabric</th>
                    <th className="p-3.5">Stage</th>
                    <th className="p-3.5">Assigned Tailor</th>
                    <th className="p-3.5">Guaranteed Delivery</th>
                    <th className="p-3.5">Financials</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-surface-muted/50 transition-colors">
                      <td className="p-3.5">
                        <span className="font-bold text-primary block">{ord.id}</span>
                        {ord.isLate ? (
                          <Badge variant="error" size="sm">LATE</Badge>
                        ) : ord.isAtRisk ? (
                          <Badge variant="tape" size="sm">AT RISK</Badge>
                        ) : null}
                      </td>
                      <td className="p-3.5 font-sans">
                        <strong className="text-primary block">{ord.customerName}</strong>
                        <span className="text-text-muted text-[11px] font-mono">{ord.customerPhone}</span>
                      </td>
                      <td className="p-3.5 font-sans">
                        <span className="font-semibold text-primary block">{ord.items[0]?.designName}</span>
                        <span className="text-text-muted text-[11px]">{ord.items[0]?.fabricName}</span>
                      </td>
                      <td className="p-3.5">
                        <Badge variant="neutral" size="sm">
                          {ord.status}
                        </Badge>
                      </td>
                      <td className="p-3.5 font-sans">
                        <span className="text-primary font-medium">{ord.assignedTailorName}</span>
                      </td>
                      <td className="p-3.5 tabular-nums">
                        <span className={ord.isLate ? "text-error font-bold" : "text-primary"}>
                          {formatDate(ord.guaranteedDeliveryDate)}
                        </span>
                      </td>
                      <td className="p-3.5 tabular-nums">
                        <strong className="text-primary block">{formatNaira(ord.totalAmount)}</strong>
                        <span className="text-text-muted text-[10px]">
                          {ord.paymentStatus === "fully_paid" ? "100% Paid" : "60% Deposit"}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link href={`/admin/orders/${encodeURIComponent(ord.id)}`}>
                          <Button variant="primary" size="sm">
                            Manage &rarr;
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

