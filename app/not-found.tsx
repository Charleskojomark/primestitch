import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Empty / Error state: icon-only in muted color */}
        <div className="w-16 h-16 mx-auto rounded-full bg-surface-muted flex items-center justify-center border border-border-subtle">
          <Logo
            variant="icon"
            tone="dark"
            height={32}
            className="opacity-40 grayscale"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-text-muted uppercase">
            Error 404 • Pattern Missing
          </span>
          <h1 className="text-3xl font-extrabold font-display text-primary tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-text-muted leading-relaxed">
            The page or tailoring order you are looking for does not exist or has been relocated to another bench.
          </p>
        </div>

        <div>
          <Link href="/">
            <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

