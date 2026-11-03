"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import {
  ShieldCheck,
  Lock,
  Loader2,
  LayoutDashboard,
  Package,
  CalendarCheck,
  Users,
  UploadCloud,
  LogOut,
  Mail,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { staffRole, staffEmail, logoutStaff, orders, bookings, tailors } = usePrimeStitch();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Check local store role and cookie
    const hasStoreAdmin = staffRole === "admin";
    const hasCookieAdmin =
      typeof document !== "undefined" &&
      document.cookie.includes("primestitch_role=admin");

    if (hasStoreAdmin || hasCookieAdmin) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      const redirectUrl = `/staff/login?redirect=${encodeURIComponent(
        pathname
      )}&role=admin&error=admin_required`;
      router.replace(redirectUrl);
    }
  }, [staffRole, pathname, router]);

  if (isAuthorized === null) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-xs font-mono text-text-muted">
          Verifying Atelier Security Credentials...
        </p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4 text-center">
        <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold font-display text-primary">
          Atelier Access Restricted
        </h2>
        <p className="text-xs text-text-muted max-w-sm">
          This operational workstation requires verified Operations Administrator credentials. Redirecting to secure staff login...
        </p>
      </div>
    );
  }

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin",
      count: null,
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: Package,
      active: pathname.startsWith("/admin/orders"),
      count: orders.length,
    },
    {
      href: "/admin/measurements",
      label: "Bookings",
      icon: CalendarCheck,
      active: pathname.startsWith("/admin/measurements"),
      count: bookings.length,
    },
    {
      href: "/admin/team",
      label: "Team",
      icon: Users,
      active: pathname.startsWith("/admin/team"),
      count: tailors.length,
    },
    {
      href: "/admin/media",
      label: "Lookbook",
      icon: UploadCloud,
      active: pathname.startsWith("/admin/media"),
      count: null,
    },
  ];

  return (
    <div className="min-h-screen bg-surface-muted/30 pb-16">
      {/* Admin Command Bar: Relative on mobile to prevent double sticky headers & clipping; sticky on desktop */}
      <div className="relative border-b border-border-seam bg-surface-card shadow-subtle md:sticky md:top-16 md:z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          {/* Top Row: User identity & Logout */}
          <div className="flex items-center justify-between py-2 border-b border-border-subtle/60 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <Badge variant="tape" size="sm" className="shrink-0 font-bold text-[10px] px-2 py-0.5">
                OPERATIONS ADMIN
              </Badge>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted truncate">
                <Mail className="w-3 h-3 text-secondary shrink-0" />
                <span className="truncate">{staffEmail || "admin@primestitch.com"}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={logoutStaff}
              className="flex items-center gap-1 text-[11px] font-mono text-error hover:text-error/80 font-bold px-2 py-1 rounded hover:bg-error/10 transition-colors shrink-0"
              title="Lock & Exit Workspace"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>

          {/* Bottom Row: Mobile-First Nav Tabs with Zero Visible Scrollbar */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar scrollbar-none py-2 -mx-1 px-1 font-mono text-xs [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-sm whitespace-nowrap transition-all select-none min-h-[38px] ${
                    item.active
                      ? "bg-primary text-white font-bold shadow-subtle"
                      : "text-text-muted hover:text-primary hover:bg-surface-muted bg-surface-card border border-border-subtle"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.active ? "text-accent-tape" : "text-secondary"}`} />
                  <span>{item.label}</span>
                  {item.count !== null && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                        item.active
                          ? "bg-white/20 text-white"
                          : "bg-surface-muted text-text-muted"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Admin Surface */}
      <main className="animate-fadeIn">{children}</main>
    </div>
  );
}
