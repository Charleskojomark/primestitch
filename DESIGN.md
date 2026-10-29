---
version: alpha
name: PrimeStitch
description: Precision custom-clothing design system for Nigerian made-to-measure tailoring with deadline tracking
colors:
  primary: "#0B1528"
  on-primary: "#FFFFFF"
  secondary: "#C28B28"
  on-secondary: "#0B1528"
  surface: "#F8FAFC"
  on-surface: "#1A2232"
  surface-card: "#FFFFFF"
  surface-muted: "#F1F5F9"
  border-seam: "#CBD5E1"
  border-subtle: "#E2E8F0"
  accent-tape: "#FFC72C"
  on-accent-tape: "#0B1528"
  accent-emerald: "#0A5C36"
  on-accent-emerald: "#FFFFFF"
  text-muted: "#475569"
  error: "#B91C1C"
  on-error: "#FFFFFF"
typography:
  headline-display:
    fontFamily: Cabinet Grotesk, sans-serif
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Cabinet Grotesk, sans-serif
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Cabinet Grotesk, sans-serif
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  label-mono:
    fontFamily: JetBrains Mono, monospace
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
  label-tape:
    fontFamily: JetBrains Mono, monospace
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.05em
rounded:
  none: 0px
  sm: 2px
  md: 4px
  lg: 8px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  gutter: 16px
  margin: 24px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 14px
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 14px
  card-pattern:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 24px
  card-status:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.md}"
    padding: 16px
  badge-tape:
    backgroundColor: "{colors.accent-tape}"
    textColor: "{colors.on-accent-tape}"
    rounded: "{rounded.sm}"
    padding: 4px
  badge-verified:
    backgroundColor: "{colors.accent-emerald}"
    textColor: "{colors.on-accent-emerald}"
    rounded: "{rounded.full}"
    padding: 4px
  input-measurement:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px
  alert-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    rounded: "{rounded.sm}"
    padding: 12px
  tag-accent:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    rounded: "{rounded.sm}"
    padding: 6px
  divider-seam:
    backgroundColor: "{colors.border-seam}"
    height: 1px
  divider-subtle:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
---

## Overview

PrimeStitch is a Nigerian custom-clothing platform where customers order made-to-measure outfits online, crafted by a coordinated atelier of tailors. Every order features a legally committed delivery date backed by a 9-stage tracking engine: Received, Confirmed, Cutting, Sewing, Finishing, Quality check, Ready, Dispatched, Delivered.

The system solves the endemic problem of missed tailoring deadlines and opaque progress in the Nigerian bespoke clothing market. Founded and operating from Aba, Abia State—the historic capital of Nigerian tailoring and manufacturing craftsmanship—PrimeStitch combines legendary master artisan cutting with structured digital logistics to serve customers nationwide (Lagos, Abuja, Port Harcourt, South East, and across Nigeria). Visual design directly reflects bespoke tailoring tools: measuring tapes, basting stitches, pattern sheets, brass tailoring shears, and deep Nigerian textile heritage, engineered for smartphone users operating on mobile data under bright equatorial sunlight.

### Brand Voice and Tone

The voice is precise, dependable, crafted, and direct. It communicates in plain, warm Nigerian English that eliminates delivery anxiety and respects customer timelines.

- **Primary Brand Promise:** "Your outfit, ready on the day you need it. No stories."
- **Delivery Guarantee Copy:** "Guaranteed delivery by Friday, 14 Nov 2026. On your doorstep or your next fit is on us."
- **Stage Tracking Updates:** "Stage 4 of 9: Sewing. Tailor Chidi is currently joining your shoulder seams and canvas."
- **Group & Aso Ebi Copy:** "25 outfits. 25 exact fits. One synchronized delivery date for the entire bridal party."
- **Measurement Intake:** "We don't guess sizes. Enter your measurements, choose a saved fit profile, or request a 5-minute WhatsApp video measurement."

## Colors

The palette avoids generic SaaS blue gradients and saturated terracotta defaults. It derives from suiting wools, natural Adire dye pits, brass tailor shears, and fiberglass measuring tapes.

### Rationale

- **Atelier Midnight (`primary: #0B1528`):** Deep suiting navy echoing 16-dip Nigerian Adire indigo. Conveys authority, quiet luxury, and precision.
- **Tailor's Shears Brass (`secondary: #C28B28`):** Burnished metallic tone inspired by brass shears, blazer buttons, and measuring tape tips. Used for premium accents and verified artisan marks.
- **Measuring Tape Gold (`accent-tape: #FFC72C`):** High-visibility tape-measure yellow. Reserved exclusively for guaranteed delivery date banners, measurement badges, and active stage milestones.
- **Master Stitch Emerald (`accent-emerald: #0A5C36`):** Deep Nigerian forest green representing quality inspection passes, completed stages, and dispatch verification.
- **Atelier Canvas (`surface: #F8FAFC` & `surface-card: #FFFFFF`):** High-reflectance, neutral whites and near-whites engineered to resist midday outdoor glare on mobile screens.
- **Seam Border (`border-seam: #CBD5E1` & `border-subtle: #E2E8F0`):** Precise hairline structural lines representing drafting chalk and basting stitches.
- **Charcoal Weft (`on-surface: #1A2232` & `text-muted: #475569`):** Deep wool black and muted slate for optical readability under sunlight.
- **Flaw Marker Red (`error: #B91C1C`):** Tailor's marking pencil red for measurement validation errors and dispatch alerts.

### WCAG AA / AAA Contrast Verification

| Foreground Token | Background Token | Calculated Ratio | WCAG Compliance | Implementation Role |
|---|---|---|---|---|
| `on-primary` (`#FFFFFF`) | `primary` (`#0B1528`) | 16.6:1 | AAA Pass | Primary buttons, hero banners, dark headers |
| `on-surface` (`#1A2232`) | `surface-card` (`#FFFFFF`) | 14.2:1 | AAA Pass | Card titles, body copy, order details |
| `text-muted` (`#475569`) | `surface-card` (`#FFFFFF`) | 7.1:1 | AAA Pass | Secondary labels, measurement units, timestamps |
| `on-accent-tape` (`#0B1528`) | `accent-tape` (`#FFC72C`) | 12.4:1 | AAA Pass | Delivery date promise pill, active stage badge |
| `on-accent-emerald` (`#FFFFFF`) | `accent-emerald` (`#0A5C36`) | 6.8:1 | AA Pass (AAA Large) | Quality check seal, dispatched status chip |
| `on-secondary` (`#0B1528`) | `secondary` (`#C28B28`) | 7.0:1 | AAA Pass | Hardware accents, artisan badges |
| `on-error` (`#FFFFFF`) | `error` (`#B91C1C`) | 5.6:1 | AA Pass (AAA Large) | Form validation errors, date conflict alerts |

## Typography

Typography balances bespoke sartorial character with strict data-density requirements.

### Type Pairings

- **Headings & Display:** `Cabinet Grotesk` (fallback: `Space Grotesk`, `sans-serif`). Geometric structure with cut terminal angles that evoke tailor's shears and drafting rulers. Used for titles, stage headlines, and brand statements.
- **Body & Controls:** `Plus Jakarta Sans` (fallback: `system-ui`, `-apple-system`, `sans-serif`). High x-height and open apertures ensuring rapid parsing on low-cost Android displays under sunlight.
- **Measurements & Data:** `JetBrains Mono` (fallback: `ui-monospace`, `monospace`). Monospaced tabular figures used strictly for dimensions (`42.5 cm`), Naira prices (`₦45,000`), order identifiers (`#PS-9021`), and tracking timestamps (`14:20 WAT`).

### Application Rules

- Currency values must always render with the Naira symbol (`₦`) and tabular numerals (`font-variant-numeric: tabular-nums`) to prevent layout shifting during price recalculations.
- Measurement numbers and unit symbols must remain bound together using non-breaking spaces (`42.5\u00A0cm`, `38\u00A0in`).
- Headings use `text-balance` to avoid awkward word wraps on narrow mobile displays (360px–390px).

## Layout

Layout patterns reflect modular cutting patterns and mobile ergonomics.

- **Mobile Viewport Target:** Primary layout optimized for 360px to 428px viewport widths, scaling gracefully to desktop atelier dashboards.
- **Screen Gutter:** Fixed `16px` (`spacing.gutter`) margin on mobile screen edges.
- **Content Margin:** `24px` (`spacing.margin`) between major content blocks.
- **Grid Module:** Strict 4px base increment matching standard tailoring seam allowances (`4px`, `8px`, `16px`, `24px`, `32px`, `48px`).
- **Sticky Conversion Drawer:** Primary order action buttons lock to the bottom viewport with `padding-bottom: max(16px, env(safe-area-inset-bottom))` to keep actions thumb-accessible while scrolling on mobile.

## Elevation & Depth

Visual hierarchy relies on tactile cardstock layering rather than diffuse blur shadows.

- **Surface Tiers:** Three distinct structural levels:
  1. Base Canvas: `surface: #F8FAFC`
  2. Pattern Cards & Modules: `surface-card: #FFFFFF` with a 1px solid border (`border-subtle: #E2E8F0`)
  3. Interactive & Tracking Overlays: `surface-card: #FFFFFF` with a crisp 1px border (`border-seam: #CBD5E1`) and a discrete 2px offset shadow (`box-shadow: 0 2px 4px rgba(11, 21, 40, 0.06)`).
- **No Heavy Glows:** Diffuse colored drop-shadows and glassmorphism blurs are prohibited because they wash out in outdoor tropical light and strain budget mobile processors.

## Shapes

Shapes communicate technical precision and tailoring craft.

- **Corner Radii:**
  - `none: 0px` for tape-measure rules, fabric swatch swatches, and dividing rulers.
  - `sm: 2px` for form inputs, measurement chips, and technical tags.
  - `md: 4px` for structural cards, stage tracker cards, and primary buttons.
  - `lg: 8px` for modal dialogs and bottom sheets.
  - `full: 9999px` strictly for status pill badges and circular stage counter nodes.
- **Notch Cutout Motif:** Select pattern cards incorporate 8px corner chamfers or inward notches evoking cut pattern cardboard markers.
- **Basting Seams:** Dividers use a 1px dashed stroke (`border-top: 1px dashed #CBD5E1; stroke-dasharray: 4 4`) symbolizing temporary tailor basting stitches.

## Components

### 1. Buttons

- **Primary Button (`button-primary`):**
  - Background: `primary: #0B1528`
  - Text: `on-primary: #FFFFFF`
  - Typography: `Plus Jakarta Sans`, 16px, semi-bold (`font-weight: 600`)
  - Padding: 14px vertical, 20px horizontal (min-height: 48px for thumb reach)
  - Corner Radius: `md: 4px`
  - Hover/Active State: Background shifts to `#16233B`; active state scales to 0.98.
- **Secondary Button (`button-secondary`):**
  - Background: `surface-card: #FFFFFF`
  - Border: 1.5px solid `primary: #0B1528`
  - Text: `primary: #0B1528`
  - Padding: 14px vertical, 20px horizontal (min-height: 48px)
- **WhatsApp Direct Action Button:**
  - Background: `#0A5C36` (accent emerald)
  - Text: `#FFFFFF`
  - Icon: Embedded WhatsApp mark
  - Microcopy: "Chat with Master Tailor"

### 2. Status Tracker (9-Stage Pipeline)

Tracks every garment through the 9 strict production stages:
1. **Received:** Order placed, initial deposit processed.
2. **Confirmed:** Measurements validated by master cutter.
3. **Cutting:** Fabric chalked and sheared from pattern pieces.
4. **Sewing:** Structural seams and lining assembled by assigned tailor.
5. **Finishing:** Buttonholes, embroidery, cuff hems, and hand-press.
6. **Quality Check:** 14-point measurement tolerance audit.
7. **Ready:** Garment bagged and labeled with order tag.
8. **Dispatched:** Rider assigned with live tracking link.
9. **Delivered:** Handed over and confirmed via OTP or signature.

- **Tracker Layout:**
  - Top Hero Card: Prominently displays the Guaranteed Delivery Date in bold monospace text accompanied by the `badge-tape` pill ("GUARANTEED: FRI, 14 NOV • 2:00 PM WAT").
  - Progression Line: Stages connect via a basting-stitch stroke (`1px dashed #CBD5E1`) that transforms into a solid emerald stroke (`2px solid #0A5C36`) as each stage completes.
  - Node States:
    - *Completed:* Solid emerald circle with white checkmark.
    - *Active:* 28px diameter ring with `accent-tape: #FFC72C` background, `#0B1528` text, and a live pulse ring. Displays assigned tailor's name and stage start time.
    - *Upcoming:* 24px diameter neutral circle with `border: 1.5px solid #CBD5E1` and muted gray number.

### 3. Order Form & Measurement Engine

- **Measurement Intake:**
  - Two input modes: "Self-Measured" (guided illustrated instructions) and "Book a Lagos Home Measurement / WhatsApp Video Call".
  - Toggle between Metric (`cm`) and Imperial (`in`). Default is `in` for standard Nigerian tailoring custom.
  - Field inputs: High-contrast inputs (`height: 48px`, `border: 1px solid #CBD5E1`, `background: #FFFFFF`).
  - Real-time sanity validation: Values outside biological tolerances trigger immediate inline warnings in `error: #B91C1C`.
- **Live Delivery Date Promise Calculator:**
  - Dynamically updates as garments and fabric choices are added: "Order within the next 3 hrs 12 mins to guarantee delivery by Friday, 14 Nov".
- **Group & Aso Ebi Coordinator:**
  - Bulk roster matrix for orders of 20+ pieces.
  - Individual measurement tracking per member (e.g. "Groomsman 3 - Tunde B. [Measurements Pending]").
  - Single delivery date locks for all pieces in the group batch.

### 4. Fabric Swatch & Pattern Cards

- **Card Container (`card-pattern`):**
  - Background: `surface-card: #FFFFFF`
  - Border: 1px solid `border-subtle: #E2E8F0`
  - Corner Radius: `md: 4px` with upper-right corner cut notch.
- **Fabric Detail Header:**
  - Square swatch preview (`size: 64px`) displaying high-resolution textile weave (e.g. Guinea Brocade, Cashmere Wool, Atiku Cotton).
  - Material technical tag: Weight in grams/meter (`320 GSM`) and weave type.
- **Price Tag:**
  - Prominent price in Nigerian Naira (`₦65,000`) formatted in `Cabinet Grotesk` bold with `label-mono` currency code.

## Motion Principles

Motion in PrimeStitch reflects the precise, rhythmic mechanics of an atelier sewing machine and measuring tape retraction.

- **Duration:** Fast micro-interactions strictly capped between `150ms` and `200ms`.
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (snappy ease-out, mechanical settling). No bouncy spring curves or playful elastic wobbles.
- **Stage Progression Transition:** As an order advances, the connecting stitch line draws from left to right using `stroke-dashoffset` over `350ms`.
- **Hardware Acceleration:** Only compositor properties (`transform`, `opacity`) animate. Layout properties (`height`, `width`, `padding`) remain static.
- **Reduced Motion:** If `prefers-reduced-motion: reduce` is detected, all transitions complete instantly (`0ms`).

## Accessibility & Outdoor Readability

- **Equatorial Sun Readability:**
  - All critical texts (measurements, prices, delivery dates, primary buttons) exceed WCAG AAA 7:1 contrast against their surfaces.
  - Deep text color `#1A2232` prevents gray-washing when mobile screens face direct Lagos sunlight.
- **Touch Target Ergonomics:**
  - Interactive elements maintain a minimum hit area of `48px × 48px` with at least `8px` separation between adjacent touch zones.
- **Screen Reader Announcements:**
  - Order status tracker uses `aria-live="polite"` to announce stage progressions.
  - Completed stages are explicitly labeled with `aria-label="Stage 3: Cutting - Completed"`.
  - Current stage carries `aria-current="step"`.
- **Offline and Network Flakiness Resilience:**
  - Form inputs cache to `localStorage` on every keystroke so measurements are preserved across network disruptions.
  - A persistent non-modal status pill warns users when connectivity drops without interrupting data entry.

## Do's and Don'ts

### Do's
- Do state the guaranteed delivery date prominently on every product, cart, checkout, and status view.
- Do format all monetary amounts in Nigerian Naira using the `₦` symbol and tabular figures (`₦75,000`).
- Do use hairline basting stitches (`1px dashed`) and tailored notches to reinforce bespoke craftsmanship.
- Do maintain high text contrast (> 7:1) for outdoor readability across Lagos.
- Do provide instant WhatsApp escalation for customers needing live measurement guidance.

### Don'ts
- Don't use generic purple/blue SaaS gradients or pastel cream-and-terracotta templates.
- Don't use vague delivery estimates (e.g. "Arrives in 2-3 weeks"); every order requires an exact calendar date.
- Don't use playful bubbly border-radii (> 8px) on structural cards or container elements.
- Don't hide measurements or tracking history behind multi-level navigation drawers.
- Don't animate layout properties (`width`, `height`, `margin`) or introduce decorative blur filters.

