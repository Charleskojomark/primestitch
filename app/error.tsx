"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { RotateCcw, ArrowLeft } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("PrimeStitch runtime exception:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error state: icon-only in muted color */}
        <div className="w-16 h-16 mx-auto rounded-full bg-surface-muted flex items-center justify-center border border-border-subtle">
          <Logo
            variant="icon"
            tone="dark"
            height={32}
            className="opacity-40 grayscale"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-error uppercase">
            Artisan Production Alert
          </span>
          <h1 className="text-3xl font-extrabold font-display text-primary tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-sm text-text-muted leading-relaxed">
            Our atelier encountered an unexpected stitch error while loading this surface. Please retry or contact your dedicated master tailor.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button variant="primary" size="md" onClick={() => reset()} leftIcon={<RotateCcw className="w-4 h-4" />}>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

