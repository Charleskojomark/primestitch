"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import { formatNaira, calculateGuaranteedDelivery, formatDate } from "@/lib/utils";
import {
  CreditCard,
  Building2,
  PhoneCall,
  ShieldCheck,
  Lock,
  Clock,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DeliveryBanner } from "@/components/ui/DeliveryBanner";

export default function CheckoutPage() {
  const router = useRouter();
  const { draftOrder, updateDraftOrder, createOrderFromDraft } = usePrimeStitch();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "ussd">("card");
  const [cardNumber, setCardNumber] = useState("5399 •••• •••• 4021");
  const [cardExpiry, setCardExpiry] = useState("08/28");
  const [cardCvv, setCardCvv] = useState("321");
  const [isProcessing, setIsProcessing] = useState(false);

  const qty = draftOrder.quantity || 1;
  const unitPrice = draftOrder.unitPrice || 65000;
  const totalAmount = unitPrice * qty;

  const payableAmount =
    draftOrder.paymentTier === "deposit_60"
      ? Math.round(totalAmount * 0.6)
      : totalAmount;
  const balanceDue = totalAmount - payableAmount;

  // Delivery calculation
  const deliveryCalc = calculateGuaranteedDelivery(7);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const order = createOrderFromDraft();
      setIsProcessing(false);
      router.push(`/order/success?orderId=${encodeURIComponent(order.id)}`);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/order"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Order Form</span>
        </Link>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="tape" size="sm">
            Secure Atelier Checkout
          </Badge>
          <span className="text-xs font-mono text-text-muted">PAYSTACK SECURED</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-primary tracking-tight">
          Authorize Tailoring & Lock Delivery
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Paystack-Style Payment Form */}
        <div className="lg:col-span-7 space-y-6 min-w-0">
          <Card className="p-4 sm:p-6 md:p-8 space-y-6">
            {/* Paystack Channel Tabs */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-primary block">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {[
                  { id: "card", label: "Debit Card", icon: CreditCard },
                  { id: "transfer", label: "Bank Transfer", icon: Building2 },
                  { id: "ussd", label: "USSD Code", icon: PhoneCall },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`min-touch-target py-2.5 px-1 sm:p-3 rounded-sm border text-[11px] sm:text-xs font-mono flex flex-col items-center justify-center gap-1 text-center transition-all ${
                        isSelected
                          ? "bg-primary text-white border-primary font-bold shadow-subtle"
                          : "bg-surface-card text-on-surface border-border-seam hover:bg-surface-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="leading-tight break-words">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handlePay} className="space-y-4">
              {/* CHANNEL 1: CARD */}
              {paymentMethod === "card" && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5 text-xs">
                    <label className="font-medium text-on-surface">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full h-11 px-3.5 pl-10 border border-border-seam rounded-sm bg-surface-card font-mono text-sm tabular-nums"
                      />
                      <CreditCard className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1.5">
                      <label className="font-medium text-on-surface">Card Expiry</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card font-mono text-sm tabular-nums"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-medium text-on-surface">CVV Code</label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full h-11 px-3.5 border border-border-seam rounded-sm bg-surface-card font-mono text-sm tabular-nums"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CHANNEL 2: BANK TRANSFER */}
              {paymentMethod === "transfer" && (
                <div className="p-4 bg-surface-muted rounded-sm border border-border-seam space-y-3 text-xs">
                  <span className="font-bold text-primary block text-sm">
                    Transfer to PrimeStitch Dedicated Atelier Account:
                  </span>
                  <div className="bg-surface-card p-3 rounded-sm border border-border-subtle font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-text-muted">BANK:</span>
                      <strong className="text-primary font-bold">Wema Bank / Paystack</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">ACCOUNT NO:</span>
                      <strong className="text-primary font-bold text-base tabular-nums">9021 8849 20</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">ACCOUNT NAME:</span>
                      <strong className="text-primary font-bold">PrimeStitch Tailoring Ltd</strong>
                    </div>
                  </div>
                  <p className="text-[11px] text-text-muted">
                    Instant automated webhook reconciliation. Your order is confirmed immediately after transfer.
                  </p>
                </div>
              )}

              {/* CHANNEL 3: USSD */}
              {paymentMethod === "ussd" && (
                <div className="p-4 bg-surface-muted rounded-sm border border-border-seam space-y-3 text-xs font-mono">
                  <span className="font-bold text-primary block text-sm font-sans">
                    Dial on your registered phone:
                  </span>
                  <div className="space-y-2">
                    <div className="p-2.5 bg-surface-card rounded-sm border border-border-subtle flex justify-between items-center">
                      <span>GTBank (*737#):</span>
                      <strong className="text-primary">*737*50*5000*9021#</strong>
                    </div>
                    <div className="p-2.5 bg-surface-card rounded-sm border border-border-subtle flex justify-between items-center">
                      <span>Zenith Bank (*966#):</span>
                      <strong className="text-primary">*966*00*9021#</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Action Button */}
              <div className="pt-4 space-y-3">
                <Button
                  size="lg"
                  type="submit"
                  isLoading={isProcessing}
                  className="w-full text-sm sm:text-base font-bold shadow-raised whitespace-normal py-3.5 h-auto text-center"
                  leftIcon={<Lock className="w-4 h-4 text-accent-tape shrink-0" />}
                >
                  Pay {formatNaira(payableAmount)} & Lock Guaranteed Date
                </Button>
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-text-muted font-mono text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                  <span>256-bit TLS Encryption • Certified Nigerian Payment Gateway</span>
                </div>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Column: Order Summary & Guaranteed Date */}
        <div className="lg:col-span-5 space-y-6">
          {/* Prominent Guaranteed Date Reminder */}
          <DeliveryBanner
            date={deliveryCalc.deliveryDate}
            variant="card"
            showGuaranteeCopy
          />

          <Card className="p-5 space-y-4">
            <h3 className="font-bold text-sm font-display uppercase tracking-wider text-primary border-b border-border-subtle pb-2">
              Order Breakdown
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-bold text-sm text-primary">
                <span>{draftOrder.designName}</span>
                <span className="font-mono tabular-nums">{formatNaira(totalAmount)}</span>
              </div>
              <div className="text-text-muted font-mono">
                {draftOrder.fabricName} • {draftOrder.colorName} • Qty: {qty}
              </div>
              <div className="text-text-muted font-mono">
                Method: <span className="capitalize">{draftOrder.measurementMethod?.replace("_", " ")}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border-subtle space-y-2 text-xs font-mono">
              <div className="flex justify-between text-text-muted">
                <span>Custom Tailoring Subtotal:</span>
                <span className="tabular-nums">{formatNaira(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Doorstep Delivery Across Nigeria:</span>
                <span className="text-accent-emerald font-bold">FREE (Promised Date SLA)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border-seam text-base font-bold text-primary font-display">
                <span>Paying Today ({draftOrder.paymentTier === "deposit_60" ? "60% Deposit" : "100% Full"}):</span>
                <span className="font-mono text-accent-emerald tabular-nums">
                  {formatNaira(payableAmount)}
                </span>
              </div>
              {balanceDue > 0 && (
                <div className="flex justify-between text-[11px] text-text-muted pt-1">
                  <span>Balance payable upon doorstep delivery:</span>
                  <span className="tabular-nums font-bold text-primary">
                    {formatNaira(balanceDue)}
                  </span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

