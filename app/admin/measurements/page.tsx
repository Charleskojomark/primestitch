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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6">
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
            Doorstep Measurement Appointments
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Coordinate certified mobile fitters across Aba and regional corridors.
          </p>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-accent-emerald text-white rounded-sm text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 stroke-[3]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Bookings View: Responsive Cards for Mobile, Data Table for Desktop */}
      {bookings.length === 0 ? (
        <Card className="p-12 text-center bg-surface-card border border-border-seam">
          <div className="space-y-3">
            <Ruler className="w-12 h-12 mx-auto text-text-muted/50" />
            <div className="space-y-1">
              <h3 className="font-bold font-display text-primary text-sm">No Appointments Scheduled</h3>
              <p className="text-xs font-mono text-text-muted">
                Doorstep measurement requests booked by customers will appear here in real time.
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <>
          {/* Mobile Bookings Cards (block md:hidden) */}
          <div className="block md:hidden space-y-3">
            {bookings.map((b) => (
              <Card key={b.id} className="p-4 space-y-3 bg-surface-card border border-border-seam">
                <div className="flex items-center justify-between">
                  <span className="font-bold font-mono text-primary text-sm">{b.id}</span>
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
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-primary font-sans text-sm">{b.customerName}</strong>
                    <a href={`tel:${b.customerPhone}`} className="text-text-muted font-mono hover:text-primary underline text-[11px]">
                      {b.customerPhone}
                    </a>
                  </div>
                  <div className="text-text-muted">
                    <span className="capitalize font-medium text-primary">{b.venueType}</span>: {b.address} ({b.area})
                  </div>
                  <div className="text-[11px] font-mono text-text-muted flex items-center justify-between pt-1">
                    <span>Date: <strong className="text-primary">{b.date}</strong></span>
                    <span>Slot: <strong className="text-primary">{b.timeSlot}</strong></span>
                  </div>
                </div>

                {/* Measurer Assignment & Action */}
                <div className="pt-2 border-t border-border-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono text-text-muted">Fitter:</span>
                    <select
                      value={b.measurerId}
                      onChange={(e) => handleAssignMeasurer(b.id, e.target.value)}
                      className="h-8 px-2 border border-border-seam rounded-sm bg-surface-card text-xs flex-1"
                    >
                      {measurers.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.area.split(" ")[0]})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5 justify-end">
                    {b.status === "scheduled" && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(b.id, "completed")}
                          className="px-2.5 py-1.5 bg-accent-emerald text-white rounded-sm text-xs font-bold hover:bg-emerald-700 flex-1 sm:flex-none text-center"
                        >
                          Mark Completed
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(b.id, "missed")}
                          className="px-2.5 py-1.5 bg-error/10 text-error border border-error rounded-sm text-xs font-bold hover:bg-error/20 flex-1 sm:flex-none text-center"
                        >
                          Missed
                        </button>
                      </>
                    )}
                    {b.status === "missed" && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(b.id, "scheduled")}
                        className="px-2.5 py-1.5 bg-primary text-white rounded-sm text-xs font-bold hover:bg-slate-800 w-full sm:w-auto"
                      >
                        Reschedule
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Bookings Table (hidden md:block) */}
          <Card className="hidden md:block p-0 overflow-hidden w-full max-w-full">
            <div className="w-full max-w-full overflow-x-auto scroll-touch">
              <table className="w-full min-w-[720px] text-left text-xs font-mono">
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
        </>
      )}
    </div>
  );
}

