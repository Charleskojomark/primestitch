"use client";

import React, { useState } from "react";
import { Scissors, User, Camera, Layers, Shirt, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type AspectRatio = "3/4" | "1/1" | "16/9" | "4/3" | "custom";

interface PlaceholderImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string; // Required descriptive alt text for accessibility
  aspectRatio?: AspectRatio;
  dimensionsBadge?: string; // e.g. "1200 × 1600 px"
  label?: string; // e.g. "Garment Silhouette"
  category?: "garment" | "avatar" | "workshop" | "reference" | "fabric";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  imageClassName?: string;
  showBadge?: boolean;
  priority?: boolean;
}

const ASPECT_RATIO_CLASSES: Record<AspectRatio, string> = {
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  custom: "",
};

const ROUNDED_CLASSES = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export function PlaceholderImage({
  src,
  alt,
  aspectRatio = "3/4",
  dimensionsBadge,
  label,
  category = "garment",
  rounded = "sm",
  className,
  imageClassName,
  showBadge = false,
  ...props
}: PlaceholderImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset load/error state if src changes dynamically (e.g. in Admin Media Manager)
  React.useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  // Pick suitable category icon
  const CategoryIcon =
    category === "avatar"
      ? User
      : category === "reference"
      ? Camera
      : category === "fabric"
      ? Layers
      : category === "garment"
      ? Scissors
      : Shirt;

  const defaultDimensions =
    dimensionsBadge ||
    (aspectRatio === "3/4"
      ? "1200 × 1600 px (3:4)"
      : aspectRatio === "1/1"
      ? "600 × 600 px (1:1)"
      : aspectRatio === "16/9"
      ? "1600 × 900 px (16:9)"
      : "800 × 600 px (4:3)");

  const isFullRound = rounded === "full";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-muted select-none group",
        ASPECT_RATIO_CLASSES[aspectRatio],
        ROUNDED_CLASSES[rounded],
        className
      )}
      {...props}
    >
      {/* Actual Image if valid source exists & has not errored */}
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300",
            !isLoaded && "opacity-0",
            isLoaded && "opacity-100",
            imageClassName
          )}
        />
      ) : null}

      {/* Bespoke Tailoring Placeholder Slot (Renders while loading, if error, or if no src provided) */}
      {(!src || hasError || !isLoaded) && (
        <div
          className={cn(
            "w-full h-full flex flex-col items-center justify-center p-4 text-center bg-surface-muted border-2 border-dashed border-border-seam transition-opacity",
            src && !hasError && isLoaded ? "hidden" : "flex",
            isFullRound ? "p-1" : "p-4"
          )}
          aria-label={alt}
          role="img"
        >
          {/* Subtle Basting / Tailoring Motif */}
          <div className="flex flex-col items-center justify-center gap-1.5 max-w-[90%]">
            <div
              className={cn(
                "rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-border-subtle",
                isFullRound ? "w-8 h-8" : "w-10 h-10 sm:w-12 sm:h-12"
              )}
            >
              <CategoryIcon className={cn("stroke-[1.75]", isFullRound ? "w-4 h-4" : "w-5 h-5")} />
            </div>

            {!isFullRound && (
              <>
                <span className="font-display font-bold text-xs sm:text-sm text-primary line-clamp-1">
                  {label || alt}
                </span>

                <span className="font-mono text-[10px] text-text-muted bg-surface-card px-2 py-0.5 rounded-sm border border-border-subtle shadow-subtle">
                  {defaultDimensions}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Optional Corner Dimensions Badge (Visible on hover or if showBadge is true) */}
      {showBadge && !isFullRound && (
        <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/90 text-white px-2 py-0.5 rounded-sm text-[10px] font-mono tracking-wider shadow-subtle pointer-events-none">
          {defaultDimensions}
        </div>
      )}
    </div>
  );
}

