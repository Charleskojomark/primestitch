import React from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Phone, MessageSquare } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-primary text-on-primary pt-12 pb-24 md:pb-12 border-t-4 border-accent-tape tape-measure-top">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-700/60">
          {/* Brand Promise & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-tape rounded">
              <Logo variant="stacked" tone="light" height={54} />
            </Link>
            <p className="text-xs text-slate-300 text-pretty leading-relaxed">
              Nigeria&apos;s made-to-measure tailoring house. Every outfit is assigned a master tailor with stage-by-stage transparency and a locked delivery date.
            </p>
            <div className="flex items-center gap-2 text-accent-tape text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Guaranteed Delivery Date SLA</span>
            </div>
          </div>

          {/* Customer Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">
              Bespoke Services
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/designs" className="hover:text-accent-tape transition-colors">
                  Made-to-Measure Catalogue
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-accent-tape transition-colors">
                  Start an Order
                </Link>
              </li>
              <li>
                <Link href="/measurement/book" className="hover:text-accent-tape transition-colors">
                  Book a Doorstep Measurement
                </Link>
              </li>
              <li>
                <Link href="/bulk" className="hover:text-accent-tape transition-colors">
                  Aso Ebi & Group Orders (20+ Pieces)
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-accent-tape transition-colors">
                  Track 9-Stage Production
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Hub & Nationwide Delivery */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">
              Crafted in Aba • Nationwide Delivery
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>
                  <strong>Master Atelier:</strong> Factory Road & Commercial Hub, Aba, Abia State
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>
                  <strong>Nationwide Dispatch:</strong> Lagos, Abuja, Port Harcourt, South East & Nationwide
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Aba craftsmanship with doorstep fitters and guaranteed on-time delivery across Nigeria.
              </p>
            </div>
          </div>

          {/* Direct Concierge Contact */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">
              Concierge & Staff
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-tape" />
                <span className="font-mono">+234 803 492 8110</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent-emerald" />
                <span>WhatsApp: Instant Tailor Desk</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/staff/login"
                  className="inline-block px-3 py-1.5 rounded-sm bg-slate-800 text-accent-tape hover:bg-slate-700 text-xs font-mono font-semibold"
                >
                  Atelier Staff Portal &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono gap-3">
          <div>
            &copy; {new Date().getFullYear()} PrimeStitch Atelier Nigeria Ltd. All rights reserved.
          </div>
          <div>
            "Your outfit, ready on the day you need it. No stories."
          </div>
        </div>
      </div>
    </footer>
  );
}

