"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePrimeStitch } from "@/lib/store";
import {
  Scissors,
  Search,
  Calendar,
  Layers,
  User,
  ShoppingBag,
  Menu,
  X,
  Briefcase,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { draftOrder, staffRole } = usePrimeStitch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/designs", label: "Catalogue" },
    { href: "/track", label: "Track Order" },
    { href: "/measurement/book", label: "Book Measurer" },
    { href: "/bulk", label: "Bulk & Aso Ebi" },
    { href: "/account", label: "My Measurements" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface-card border-b border-border-seam shadow-subtle">
      {/* Prime Promise Top Bar */}
      <div className="bg-primary text-on-primary px-4 py-1.5 text-[11px] font-mono flex items-center justify-between border-b border-[#1A2C4B]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-tape animate-pulse" />
          <span className="text-accent-tape font-bold">PRIME PROMISE:</span>
          <span>Delivery on agreed date, or your next outfit is free.</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-300">
          <span>Lagos Atelier Delivery</span>
          <Link
            href={staffRole ? "/admin" : "/staff/login"}
            className="text-accent-tape hover:underline flex items-center gap-1 font-semibold"
          >
            <Briefcase className="w-3 h-3" />
            <span>{staffRole ? `Staff (${staffRole})` : "Staff Login"}</span>
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Monogram & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-sm bg-primary text-accent-tape flex items-center justify-center border border-primary group-hover:bg-[#16233B] transition-colors">
            <Scissors className="w-5 h-5 -rotate-45" />
          </div>
          <div>
            <span className="font-display font-extrabold text-xl tracking-tight text-primary flex items-center">
              PRIMESTITCH
              <span className="text-secondary text-sm font-normal ml-1">✂</span>
            </span>
            <span className="hidden sm:block text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Bespoke Nigerian Atelier
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary py-1 relative",
                  isActive
                    ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                    : "text-text-muted"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/order"
            className="flex items-center gap-2 bg-primary text-on-primary text-xs md:text-sm font-semibold px-4 py-2.5 rounded-sm hover:bg-[#16233B] transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-accent-tape" />
            <span>Start Order</span>
            {draftOrder.quantity > 0 && (
              <span className="w-4 h-4 rounded-full bg-accent-tape text-on-accent-tape text-[10px] flex items-center justify-center font-bold">
                1
              </span>
            )}
          </Link>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-primary hover:bg-surface-muted rounded-sm min-touch-target flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-card border-b border-border-seam px-4 py-4 space-y-3 animate-fadeIn">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 rounded-sm text-sm font-medium",
                    isActive
                      ? "bg-primary text-on-primary font-bold"
                      : "text-on-surface hover:bg-surface-muted"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
            <Link
              href="/staff/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-primary font-bold hover:underline flex items-center gap-1.5 py-1"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Staff Login (Tailors, Measurers, Admin)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

