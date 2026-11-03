"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Logo } from "@/components/ui/Logo";

export default function AuthRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    // Check if an explicit redirect_url was passed in the query
    const targetUrl = searchParams.get("redirect_url") || searchParams.get("return_to");
    if (targetUrl && !targetUrl.startsWith("/auth/redirect")) {
      router.replace(targetUrl);
      return;
    }

    if (!isSignedIn) {
      router.replace("/account");
      return;
    }

    // Role-based destination routing based on Clerk user metadata
    const userRole = (user?.publicMetadata?.role as string) || (user?.unsafeMetadata?.role as string);

    if (userRole === "admin") {
      router.replace("/admin");
    } else if (userRole === "tailor") {
      router.replace("/tailor");
    } else if (userRole === "measurer") {
      router.replace("/measurer");
    } else {
      router.replace("/account");
    }
  }, [isLoaded, isSignedIn, user, router, searchParams]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="animate-pulse">
        <Logo variant="icon" tone="dark" height={40} />
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-bold font-display text-primary">
          Synchronizing PrimeStitch Atelier...
        </h2>
        <p className="text-xs font-mono text-text-muted">
          Redirecting to your authorized workspace...
        </p>
      </div>
      <div className="w-48 bg-slate-200 h-1 rounded-full overflow-hidden">
        <div className="bg-accent-tape h-full w-2/3 animate-pulse" />
      </div>
    </div>
  );
}

