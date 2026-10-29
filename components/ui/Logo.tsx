import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type LogoVariant = "horizontal" | "stacked" | "icon" | "wordmark";
export type LogoTone = "dark" | "light";

export interface LogoProps {
  /**
   * The logo variant layout to render:
   * - "horizontal": Primary navbar / header brand mark (needle icon + wordmark side-by-side)
   * - "stacked": Footer / display layout (needle icon centered above wordmark)
   * - "icon": Icon-only for staff sidebars, tracking, and compact states
   * - "wordmark": Typography-only brand name
   */
  variant?: LogoVariant;
  /**
   * Visual tone for contrast:
   * - "dark": Atelier Midnight navy for light surfaces (#FFFFFF, #F8FAFC)
   * - "light": Pure white for dark/navy surfaces (#0B1528, footer)
   */
  tone?: LogoTone;
  /**
   * Explicit height in pixels.
   * - "horizontal": 44px on desktop, 38px on mobile
   * - "stacked": 64px
   * - "icon": 28px (enforces minimum 24px)
   * - "wordmark": 28px
   */
  height?: number;
  /**
   * Whether to add explicit clear-space padding equal to half the icon height.
   */
  withClearSpace?: boolean;
  /**
   * Additional CSS classes applied to container.
   */
  className?: string;
  /**
   * Additional CSS classes applied directly to the image element.
   */
  imageClassName?: string;
  /**
   * Priority loading for above-the-fold surfaces like header.
   */
  priority?: boolean;
}

const LOGO_CONFIG: Record<
  LogoVariant,
  {
    darkSrc: string;
    lightSrc: string;
    aspectRatio: number; // width / height
    defaultHeight: number;
    minIconSize?: number;
  }
> = {
  horizontal: {
    // Tightly cropped to eliminate dead whitespace so the logo appears bold and legible
    darkSrc: "/brand/logo-horizontal-white-bg-tight.png",
    lightSrc: "/brand/logo-horizontal-white-tight.png",
    aspectRatio: 665 / 198, // ~3.359
    defaultHeight: 44,
  },
  stacked: {
    darkSrc: "/brand/logo-stacked-white-bg-tight.png",
    lightSrc: "/brand/logo-stacked-white-tight.png",
    aspectRatio: 503 / 332, // ~1.515
    defaultHeight: 64,
  },
  icon: {
    darkSrc: "/brand/logo-icon-transparent.png",
    lightSrc: "/brand/logo-icon-white.png",
    aspectRatio: 1, // 1:1 square
    defaultHeight: 28,
    minIconSize: 24,
  },
  wordmark: {
    darkSrc: "/brand/logo-wordmark.png",
    lightSrc: "/brand/logo-wordmark-white.png",
    aspectRatio: 757 / 330, // ~2.294
    defaultHeight: 28,
  },
};

export function Logo({
  variant = "horizontal",
  tone = "dark",
  height,
  withClearSpace = false,
  className,
  imageClassName,
  priority = false,
}: LogoProps) {
  const config = LOGO_CONFIG[variant];
  
  // Calculate effective dimensions
  let effHeight = height ?? config.defaultHeight;
  if (config.minIconSize && effHeight < config.minIconSize) {
    effHeight = config.minIconSize;
  }
  const effWidth = Math.round(effHeight * config.aspectRatio);

  const src = tone === "light" ? config.lightSrc : config.darkSrc;

  // Clear space: minimum clear space equal to icon height divided by 2
  const iconHeight = variant === "icon" ? effHeight : Math.round(effHeight * 0.55);
  const clearSpacePx = Math.max(8, Math.round(iconHeight / 2));

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center shrink-0 select-none",
        withClearSpace && `p-[${clearSpacePx}px]`,
        className
      )}
      style={withClearSpace ? { padding: `${clearSpacePx}px` } : undefined}
    >
      <Image
        src={src}
        alt="PrimeStitch"
        width={effWidth}
        height={effHeight}
        priority={priority}
        className={cn(
          "w-auto object-contain transition-opacity duration-200",
          variant === "icon" && "min-w-[24px] min-h-[24px]",
          imageClassName
        )}
      />
    </div>
  );
}
