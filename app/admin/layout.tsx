"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { usePrimeStitch } from "@/lib/store";
import { ShieldAlert, Lock, Loader2 } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { staffRole } = usePrimeStitch();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Check local store role and cookie
    const hasStoreAdmin = staffRole === "admin";
    const hasCookieAdmin = typeof document !== "undefined" && document.cookie.includes("primestitch_role=admin");

    if (hasStoreAdmin || hasCookieAdmin) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      const redirectUrl = `/staff/login?redirect=${encodeURIComponent(pathname)}&role=admin&error=admin_required`;
      router.replace(redirectUrl);
    }
  }, [staffRole, pathname, router]);

  if (isAuthorized === null) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-xs font-mono text-text-muted">Verifying Atelier Security Credentials...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4 text-center">
        <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold font-display text-primary">Atelier Access Restricted</h2>
        <p className="text-xs text-text-muted max-w-sm">
          This operational workstation requires verified Operations Administrator credentials. Redirecting to secure staff login...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
