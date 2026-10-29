"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, formatDate } from "@/lib/utils";
import { Ruler, ArrowLeft, CheckCircle, AlertCircle, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function AdminMeasurementsPage() {
  const { bookings, measurers, updateBooking } = usePrimeStitch();

  const [toastMsg, setToastMsg] = useState("");

  const handleAssignMeasurer = (bookingId: string, measurerId: string) => {
    const m = measurers.find((meas) => meas.id === measurerId);
    if (!m) return;
    updateBooking(bookingId, {
      measurerId: m.id,
      measurerName: m.name,
      measurerPhone: m.phone,
    });
    setToastMsg(`Assigned ${m.name} to booking ${bookingId}`);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleStatusChange = (bookingId: string, status: any) => {
    updateBooking(bookingId, { status });
    setToastMsg(`Booking ${bookingId} status updated to ${status}`);
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-seam pb-6">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Dashboard</span>
          </Link>
          <h1 className="text-3xl font-extrabold font-display text-primary tracking-tight mt-1">
            Doorstep Measurement Appointments
          </h1>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-accent-emerald text-white rounded-sm text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 stroke-[3]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Bookings Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-muted border-b border-border-seam uppercase text-[11px] text-text-muted">
              <tr>
                <th className="p-3.5">Booking ID</th>
                <th className="p-3.5">Customer & Phone</th>
                <th className="p-3.5">Venue & Area</th>
                <th className="p-3.5">Date & Time Slot</th>
                <th className="p-3.5">Assigned Measurer</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-surface-muted/50 transition-colors">
                  <td className="p-3.5 font-bold text-primary">{b.id}</td>
                  <td className="p-3.5 font-sans">
                    <strong className="text-primary block">{b.customerName}</strong>
                    <span className="text-text-muted text-[11px] font-mono">{b.customerPhone}</span>
                  </td>
                  <td className="p-3.5 font-sans">
                    <span className="capitalize text-primary font-semibold block">{b.venueType}</span>
                    <span className="text-text-muted text-[11px]">{b.address} ({b.area})</span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-primary block">{b.date}</span>
                    <span className="text-text-muted text-[11px]">{b.timeSlot}</span>
                  </td>
                  <td className="p-3.5">
                    <select
                      value={b.measurerId}
                      onChange={(e) => handleAssignMeasurer(b.id, e.target.value)}
                      className="h-8 px-2 border border-border-seam rounded-sm bg-surface-card text-xs"
                    >
                      {measurers.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.area.split(" ")[0]})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3.5">
                    <Badge
                      variant={
                        b.status === "completed"
                          ? "verified"
                          : b.status === "missed"
                          ? "error"
                          : "neutral"
                      }
                      size="sm"
                    >
                      {b.status}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {b.status === "scheduled" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(b.id, "completed")}
                            className="px-2 py-1 bg-accent-emerald text-white rounded-sm text-[10px] font-bold hover:bg-emerald-700"
                          >
                            Mark Completed
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(b.id, "missed")}
                            className="px-2 py-1 bg-error/10 text-error border border-error rounded-sm text-[10px] font-bold hover:bg-error/20"
                          >
                            Flag Missed
                          </button>
                        </>
                      )}
                      {b.status === "missed" && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(b.id, "scheduled")}
                          className="px-2 py-1 bg-primary text-white rounded-sm text-[10px] font-bold hover:bg-slate-800"
                        >
                          Reschedule
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

