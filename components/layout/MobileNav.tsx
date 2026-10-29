"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Layers, Clock, Ruler, User } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  // Hide mobile nav in staff views so staff has full dedicated view
  if (pathname.startsWith("/admin") || pathname.startsWith("/tailor") || pathname.startsWith("/measurer")) {
    return null;
  }

  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/designs", label: "Designs", icon: Layers },
    { href: "/track", label: "Track", icon: Clock },
    { href: "/measurement/book", label: "Measure", icon: Ruler },
    { href: "/account", label: "Account", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-card border-t border-border-seam shadow-raised pb-safe">
      <div className="grid grid-cols-5 h-14">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-touch-target transition-colors relative",
                isActive ? "text-primary font-bold" : "text-text-muted hover:text-on-surface"
              )}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-full" />
              )}
              <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5]")} />
              <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

