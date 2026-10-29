import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Clock, Scissors, ArrowLeft, CheckCircle, Scale, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | PrimeStitch Nigerian Bespoke Atelier",
  description:
    "PrimeStitch Terms of Service: Locked delivery date guarantees, 60/40 payment terms, measurement intake standards, fit guarantee, and Nigerian tailoring policies.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-primary transition-colors py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Atelier Homepage</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3 border-b border-border-seam pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="tape" size="sm">
            Legal & Production Charter
          </Badge>
          <span className="text-xs font-mono text-text-muted">EFFECTIVE DATE: OCTOBER 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-primary tracking-tight">
          Terms of Service & Craft Guarantee
        </h1>
        <p className="text-sm sm:text-base text-text-muted leading-relaxed">
          Welcome to PrimeStitch. By commissioning bespoke garments or accessing our 9-stage tracking platform, you enter into a legally binding agreement governed by Nigerian law and the operational terms below.
        </p>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div className="bg-surface-card border border-border-subtle p-3.5 rounded-sm flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-accent-tape shrink-0" />
          <span><strong>Locked SLA:</strong> On-time delivery guarantee</span>
        </div>
        <div className="bg-surface-card border border-border-subtle p-3.5 rounded-sm flex items-center gap-2.5">
          <Scissors className="w-4 h-4 text-secondary shrink-0" />
          <span><strong>Aba Master Tailors:</strong> Master cut & bench sewn</span>
        </div>
        <div className="bg-surface-card border border-border-subtle p-3.5 rounded-sm flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-accent-emerald shrink-0" />
          <span><strong>Perfect Fit:</strong> Free adjustment guarantee</span>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8 text-sm leading-relaxed text-on-surface">
        {/* Section 1 */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-lg font-display">
            <span className="w-6 h-6 rounded-sm bg-primary text-white text-xs flex items-center justify-center font-mono">1</span>
            <h2>Atelier Operations & Master Cutting</h2>
          </div>
          <p>
            PrimeStitch operates from Aba, Abia State—the historic hub of Nigerian textile craftsmanship and industrial tailoring—with nationwide logistics hubs serving Lagos, Abuja, Port Harcourt, and all 36 states. Every garment commissioned through our service is handcrafted by a dedicated master tailor assigned to your specific fit profile.
          </p>
          <p>
            We specialize in bespoke Nigerian ceremonial and executive menswear and womenswear, including Senator sets, Royal Kaftans, Isiagu tunics, contemporary native wear, and corporate outfits.
          </p>
        </Card>

        {/* Section 2 */}
        <Card hasTapeTop className="p-6 sm:p-8 space-y-4 border-2 border-accent-tape/40">
          <div className="flex items-center gap-2 text-primary font-bold text-lg font-display">
            <span className="w-6 h-6 rounded-sm bg-accent-tape text-on-accent-tape text-xs flex items-center justify-center font-mono">2</span>
            <h2>The Prime Delivery Date SLA Guarantee</h2>
          </div>
          <p className="font-semibold text-primary">
            "Your outfit, ready on the day you need it. No stories."
          </p>
          <p>
            Unlike conventional Nigerian tailoring characterized by uncommitted turnaround and event-morning delays, PrimeStitch assigns a <strong>Guaranteed Delivery Date</strong> at the moment of order authorization. This date is calculated dynamically based on active master tailor bench capacity, fabric curing, and quality control auditing.
          </p>
          <div className="p-4 bg-surface-muted rounded-sm border-l-4 border-l-accent-tape space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase">
              <ShieldCheck className="w-4 h-4 text-accent-tape" />
              <span>Breach Remedy & SLA Compensation</span>
            </div>
            <p className="text-xs text-text-muted">
              If PrimeStitch fails to dispatch your garment by the locked Guaranteed Delivery Date due to our internal production delay, your delivery fee is fully waived, and PrimeStitch will issue a credit voucher equivalent to 100% of the delayed garment’s value (up to ₦60,000) redeemable toward your next custom outfit.
            </p>
          </div>
          <p className="text-xs text-text-muted">
            <em>Exceptions:</em> Delays resulting from external force majeure, state-wide logistics curfews, or customer delays in providing measurements or fabric approvals do not constitute an SLA breach.
          </p>
        </Card>

        {/* Section 3 */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-lg font-display">
            <span className="w-6 h-6 rounded-sm bg-primary text-white text-xs flex items-center justify-center font-mono">3</span>
            <h2>Measurement Intake & Sizing Accuracy</h2>
          </div>
          <p>
            Precise tailored fit depends on anatomical precision. Customers may supply measurements via three certified channels:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Direct Input:</strong> Entering self or tailor-taken measurements into your digital Fit Profile.
            </li>
            <li>
              <strong>WhatsApp 5-Minute Guided Video:</strong> A live video session with our master fitter who instructs you on placing tape markers.
            </li>
            <li>
              <strong>Doorstep Certified Fitter:</strong> Booking a physical home or office visit by an accredited PrimeStitch mobile measurer in supported metropolitan areas.
            </li>
          </ul>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-900 space-y-1">
            <strong>4-Hour Locking Window:</strong> Once measurements are confirmed and fabric enters Stage 3 (Cutting), the pattern is locked onto the cloth. Any dimension changes requested after cutting has commenced may incur recutting charges.
          </div>
        </Card>

        {/* Section 4 */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-lg font-display">
            <span className="w-6 h-6 rounded-sm bg-primary text-white text-xs flex items-center justify-center font-mono">4</span>
            <h2>Payment Structure & Deposit Terms</h2>
          </div>
          <p>
            To honor dedicated artisan time and reserve high-grade suiting fabrics and trims, PrimeStitch operates on transparent milestone billing:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>60% Bespoke Commitment Deposit:</strong> Payable at checkout to allocate bench time, procure premium fabrics, and commence pattern drafting.
            </li>
            <li>
              <strong>40% Completion Balance:</strong> Due upon Stage 6 (Quality Inspection Pass) with high-definition artisan bench photos prior to dispatch.
            </li>
            <li>
              <strong>100% Upfront Discount:</strong> Customers electing full payment receive priority cutting queue placement.
            </li>
          </ul>
          <p className="text-xs text-text-muted">
            All payments are processed securely in Nigerian Naira (₦) through Paystack or certified banking rails.
          </p>
        </Card>

        {/* Section 5 */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-lg font-display">
            <span className="w-6 h-6 rounded-sm bg-primary text-white text-xs flex items-center justify-center font-mono">5</span>
            <h2>Alterations & Free Fit Guarantee</h2>
          </div>
          <p>
            Every bespoke outfit includes our <strong>14-Day Free Fit Adjustment Guarantee</strong>. If your garment arrives and deviates from your confirmed measurements by more than 1.5 cm, PrimeStitch will adjust the seams at zero labor cost to you.
          </p>
          <p className="text-xs text-text-muted">
            In metropolitan hubs (Lagos, Abuja, Port Harcourt, Aba), our courier rider can collect the outfit directly from your address for immediate bench adjustment.
          </p>
        </Card>

        {/* Section 6 */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-lg font-display">
            <span className="w-6 h-6 rounded-sm bg-primary text-white text-xs flex items-center justify-center font-mono">6</span>
            <h2>Aso Ebi & Ceremonial Group Orders (20+ Pieces)</h2>
          </div>
          <p>
            For weddings, coronation ceremonies, and corporate uniform contracts:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>A dedicated Lead Tailor is assigned to coordinate unified fabric lots to guarantee colorway consistency.</li>
            <li>Roster member measurements must be submitted at least 18 days prior to the wedding or ceremonial event date.</li>
            <li>Synchronized single-date courier dispatch is executed for all verified roster members.</li>
          </ul>
        </Card>

        {/* Section 7 */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-lg font-display">
            <span className="w-6 h-6 rounded-sm bg-primary text-white text-xs flex items-center justify-center font-mono">7</span>
            <h2>Governing Law & Legal Jurisdiction</h2>
          </div>
          <p>
            These Terms shall be governed by and construed in accordance with the substantive laws of the <strong>Federal Republic of Nigeria</strong>. Any disputes arising out of or related to this agreement that cannot be resolved amicably shall be submitted to the jurisdiction of the competent courts of Abia State or Lagos State.
          </p>
        </Card>
      </div>

      {/* Support & Concierge CTA */}
      <div className="p-6 bg-surface-card rounded-md border border-border-seam flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-primary text-base font-display">Have Questions About Our Tailoring Terms?</h3>
          <p className="text-xs text-text-muted mt-0.5">Our master tailoring concierge is available via WhatsApp or telephone.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/privacy">
            <Button variant="outline" size="sm">
              View Privacy Policy
            </Button>
          </Link>
          <Link href="/order">
            <Button variant="primary" size="sm">
              Start an Order
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

