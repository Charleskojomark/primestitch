"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePrimeStitch } from "@/lib/store";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
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
  LogOut,
  Shield,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { draftOrder, staffRole, staffEmail, logoutStaff } = usePrimeStitch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/designs", label: "Catalogue" },
    { href: "/track", label: "Track Order" },
    { href: "/measurement/book", label: "Book Measurer" },
    { href: "/bulk", label: "Bulk & Aso Ebi" },
    { href: "/account", label: "My Measurements" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface-card border-b border-border-seam shadow-subtle w-full max-w-full">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2">
        {/* Brand Horizontal Logo */}
        <Link
          href="/"
          className="flex items-center group shrink-0 min-h-[48px] px-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="PrimeStitch — Return to homepage"
        >
          <Logo
            variant="horizontal"
            tone="dark"
            priority
            height={38}
            imageClassName="h-[34px] sm:h-[38px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
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
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Auth Integration: Handles both Staff Workstation and Clerk Customer Accounts */}
          {staffRole ? (
            <div className="flex items-center gap-1.5">
              <Link
                href={staffRole === "admin" ? "/admin" : staffRole === "tailor" ? "/tailor" : "/measurer"}
                className="hidden md:flex items-center gap-1.5 text-xs font-mono font-semibold text-primary hover:text-white hover:bg-primary py-1.5 px-2.5 rounded-sm border border-border-seam transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-secondary" />
                <span>{staffRole === "admin" ? "Admin" : staffRole === "tailor" ? "Tailor" : "Measurer"}</span>
              </Link>
              <button
                type="button"
                onClick={logoutStaff}
                className="hidden md:flex items-center text-text-muted hover:text-error p-1.5 rounded transition-colors"
                title="Exit Staff Session"
                aria-label="Exit staff session"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal" fallbackRedirectUrl="/auth/redirect" signUpFallbackRedirectUrl="/auth/redirect">
                  <button
                    type="button"
                    className="hidden md:flex items-center gap-1.5 text-xs font-mono font-semibold text-primary hover:text-white hover:bg-primary py-2 px-3 rounded-sm border border-border-seam transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-secondary" />
                    <span>Sign In</span>
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          )}

          <Link
            href="/order"
            className="flex items-center justify-center gap-1.5 sm:gap-2 bg-primary text-on-primary text-xs sm:text-sm font-semibold h-10 px-2.5 sm:px-4 rounded-sm hover:bg-[#16233B] transition-colors whitespace-nowrap min-w-[40px] relative"
            aria-label={draftOrder.quantity > 0 ? `Order with ${draftOrder.quantity} item` : "Start Order"}
          >
            <ShoppingBag className="w-4 h-4 text-accent-tape shrink-0" />
            <span className="hidden sm:inline">Start Order</span>
            {draftOrder.quantity > 0 && (
              <span className="w-4 h-4 rounded-full bg-accent-tape text-on-accent-tape text-[10px] flex items-center justify-center font-bold shrink-0">
                {draftOrder.quantity}
              </span>
            )}
          </Link>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 p-0 text-primary hover:bg-surface-muted rounded-sm flex items-center justify-center min-touch-target"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

          {/* Auth & Staff Status in Mobile Drawer */}
          <div className="pt-3 border-t border-border-subtle text-xs font-mono">
            {staffRole ? (
              <div className="flex items-center justify-between py-1">
                <Link
                  href={staffRole === "admin" ? "/admin" : staffRole === "tailor" ? "/tailor" : "/measurer"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-primary font-bold hover:underline"
                >
                  <Badge variant="tape" size="sm">
                    {staffRole.toUpperCase()}
                  </Badge>
                  <span className="truncate">{staffEmail || "Workstation"} &rarr;</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logoutStaff();
                    setMobileMenuOpen(false);
                  }}
                  className="text-error font-bold text-[11px] hover:underline"
                >
                  Exit
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between py-1">
                <SignedIn>
                  <div className="flex items-center gap-2">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-text-muted">Account Active</span>
                  </div>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal" fallbackRedirectUrl="/auth/redirect" signUpFallbackRedirectUrl="/auth/redirect">
                    <button
                      type="button"
                      className="text-primary font-bold hover:underline flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-secondary" />
                      <span>Customer Sign In</span>
                    </button>
                  </SignInButton>
                </SignedOut>

                {!pathname.startsWith("/admin") && !pathname.startsWith("/tailor") && !pathname.startsWith("/measurer") && (
                  <Link
                    href="/staff/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-text-muted hover:text-primary flex items-center gap-1 py-1"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Staff Portal</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

