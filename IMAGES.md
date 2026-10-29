# PrimeStitch Image Standards & Asset Catalogue (`IMAGES.md`)

This document defines the photographic art direction, aspect-ratio standards, performance budgets, accessibility rules, and the complete registry of every image asset required across the **PrimeStitch** made-to-measure platform.

---

## 1. Imagery Standards & Rationale

PrimeStitch replaces the opacity of bespoke tailoring with precision and transparency. Every photograph must convey architectural structure, master craftsmanship, and Nigerian textile richness.

### Aspect Ratio Rules
To eliminate Cumulative Layout Shift (CLS) and ensure predictable mobile rendering, PrimeStitch strictly adheres to four standard aspect ratios:

| Aspect Ratio | Ratio Class | Role / Placement | Standard Resolution | Retina (2x) Target |
|---|---|---|---|---|
| **3:4 Portrait** | `aspect-[3/4]` | **Garment Silhouettes & Posture Checks** (Kaftans, Agbadas, Suits, Dresses, Fit Checks) | 900 × 1200 px | 1200 × 1600 px |
| **1:1 Square** | `aspect-square` | **Artisan Avatars & Fabric Swatches** (Master tailors, field measurers, weave macros) | 400 × 400 px | 600 × 600 px |
| **16:9 Landscape** | `aspect-[16:9]` | **Atelier Workshop, Cutting Tables & Stage Milestones** (Hero backgrounds, production tracking) | 1280 × 720 px | 1920 × 1080 px |
| **4:3 Landscape** | `aspect-[4/3]` | **Style Inspiration & Reference Thumbnails** (Customer reference uploads, bench attachments) | 800 × 600 px | 1200 × 900 px |

### Art Direction Guidelines
- **Lighting:** Warm natural directional studio light (simulating high-CRI afternoon daylight) to reveal the weave texture, starch stiffness, and topstitch precision.
- **Palette Alignment:** Backgrounds should remain neutral (`#F8FAFC` to `#CBD5E1`) or rich Atelier Midnight (`#0B1528`), allowing the garment and fabrics to command attention.
- **Subjects & Posing:** Confident, upright postures representing dignified Nigerian elegance. Garments must show clean shoulder lines, natural drape breaks, and crisp plackets.
- **Aba Atelier Authenticity:** Workshop and artisan shots should feature authentic tools—brass shears, measuring tapes draped over collars, tailor's chalk, wooden cutting benches, and heavy pressing irons.

### Performance & Compression Budgets
- **Format:** Modern **WebP** or **AVIF** primary formats with optimized progressive JPEG fallbacks.
- **File Weight Budgets:**
  - Full Garment Silhouettes (3:4): **$\le 180$ KB**
  - Artisan & Measurer Avatars (1:1): **$\le 50$ KB**
  - Stage & Atelier Action Scenes (16:9): **$\le 220$ KB**
  - Fabric Swatches (1:1): **$\le 35$ KB**
  - Customer Reference Uploads: **$\le 150$ KB**

---

## 2. Complete Asset Catalogue

### Section 1: Garment Signature Silhouettes (3:4 Ratio)

All garment catalogue imagery is displayed in vertical 3:4 portrait ratio across `/`, `/designs`, `/designs/[id]`, and `/order`.

| Asset ID | Garment Name | Recommended Dimensions | Ratio | Key Routes | Descriptive Accessibility Alt Text | Shot Brief & Styling Notes |
|---|---|---|---|---|---|---|
| `img-des-kaftan` | Architectural Royal Kaftan | **1200 × 1600 px** | 3:4 | `/`, `/designs`, `/designs/[id]`, `/order` | *Full-length portrait of a Nigerian gentleman wearing an Architectural Royal Grand Kaftan in ivory Guinea brocade with intricate geometric neckline embroidery and side vents, photographed in a warm natural-light studio.* | Full front three-quarter view. Crisp starched brocade holding sharp vertical lines. Ivory textile with golden embroidery sheen. |
| `img-des-agbada` | 3-Piece Agbada Grandeur | **1200 × 1600 px** | 3:4 | `/`, `/designs`, `/designs/[id]`, `/order` | *Three-piece ceremonial Agbada ensemble in 16-dip deep indigo Adire damask with matching buba and sokoto trousers, showing architectural shoulder draping and crisp basting folds.* | Full-length front view with arms slightly outstretched to showcase shoulder fold volume and hand-embroidered chest pocket. |
| `img-des-senator` | Executive Senator Suit | **1200 × 1600 px** | 3:4 | `/`, `/designs`, `/designs/[id]`, `/order` | *Modern Executive Senator Suit in Atelier Midnight navy Italian wool-cashmere blend, featuring a structured mandarin band collar, concealed button placket, and tailored trousers.* | Upright standing pose. Focus on sharp chest flap pocket, clean cuff finish, and precise ankle trouser break. |
| `img-des-suit` | Bespoke Two-Piece Suit | **1200 × 1600 px** | 3:4 | `/`, `/designs`, `/designs/[id]`, `/order` | *Bespoke two-piece tailored suit in Savile Row Super 150s worsted wool with canvassed chest, pick-stitched notch lapels, horn buttons, and precise trouser break.* | British-Nigerian cut hybrid. High armhole, nipped waist, natural shoulder roll, horn buttons, clean pocket square. |
| `img-des-ankara` | Architectural Ankara Wrap Dress | **1200 × 1600 px** | 3:4 | `/`, `/designs`, `/designs/[id]`, `/order` | *Architectural Ankara wrap dress in authentic geometric gold and navy wax block print, featuring asymmetric fluid drape, bishop sleeves, and reinforced waist sash.* | Full-length standing female model. Highlight asymmetric hemline, structured waist tie, and vibrant geometric Holland wax colorfastness. |
| `img-des-shirt` | Crisp Cutaway Oxford Shirt | **1200 × 1600 px** | 3:4 | `/`, `/designs`, `/designs/[id]`, `/order` | *Crisp cutaway French-cuff corporate shirt tailored from Giza 88 Egyptian pinpoint Oxford cotton in optic white with split yoke and mother-of-pearl buttons.* | Waist-up portrait showing cutaway spread collar standing firm without tie, French cuffs with brass links, mother-of-pearl cross-stitched buttons. |
| `img-des-asoebi` | Celebration Aso Ebi Ensemble | **1200 × 1600 px** | 3:4 | `/`, `/designs`, `/designs/[id]`, `/order` | *Celebration Aso Ebi ensemble in champagne brass heavy silk crepe and organza, styled for Nigerian wedding ceremonies and coordinated family groups.* | Studio group or solo bridesmaid styling. Shows fluid skirt drape, structural organza sleeves, and regal champagne sheen. |
| `img-des-polo` | Executive Uniform Piqué Polo | **1200 × 1600 px** | 3:4 | `/`, `/designs`, `/designs/[id]`, `/order` | *Executive uniform piqué polo in corporate navy combed double-piqué cotton with non-curling knit collar and reinforced side vents for corporate teams.* | Mid-shot showing firm non-curling ribbed collar, 3-button placket, clean embroidered chest crest slot, and side vent reinforcements. |

---

### Section 2: Master Tailor Portraits (1:1 Square)

Tailor avatars establish human accountability and bench ownership across `/admin/team`, `/tailor`, `/track/[orderId]`, and `/order/success`.

| Asset ID | Tailor Name & Hub | Recommended Dimensions | Ratio | Key Routes | Descriptive Accessibility Alt Text | Shot Brief & Context |
|---|---|---|---|---|---|---|
| `img-tl-tunde` | Master Tunde Adeleke (Factory Road, Aba) | **600 × 600 px** | 1:1 | `/admin/team`, `/tailor`, `/track/[id]` | *Close-up portrait of Master Tailor Tunde Adeleke at his cutting bench in the Aba Factory Road atelier with brass tailoring shears and measuring tape.* | Warm smile, measuring tape around neck, workshop cutting bench visible in background with chalk drafting lines. |
| `img-tl-chidi` | Chidi Okafor (Ariaria, Aba) | **600 × 600 px** | 1:1 | `/admin/team`, `/tailor`, `/track/[id]` | *Portrait of Master Pattern Drafter Chidi Okafor drafting geometric paper patterns at the Ariaria bench in Aba.* | Looking up from brown kraft pattern sheet, holding L-square ruler and tailoring pencil. |
| `img-tl-amina` | Amina Bello (Eziukwu, Aba) | **600 × 600 px** | 1:1 | `/admin/team`, `/tailor`, `/track/[id]` | *Portrait of Senior Embroidery Artisan Amina Bello examining delicate hand embroidery threads at Eziukwu studio in Aba.* | Focused artisan portrait with embroidery hoop and metallic brass threads on wooden bench. |
| `img-tl-femi` | Femi Balogun (Umungasi, Aba) | **600 × 600 px** | 1:1 | `/admin/team`, `/tailor`, `/track/[id]` | *Portrait of Master Tailor Femi Balogun overseeing basting seam assembly at Umungasi industrial bench in Aba.* | Head and shoulders portrait beside an industrial walking-foot sewing machine with white basting thread. |
| `img-tl-segun` | Segun Ogundimu (Brass Junction, Aba) | **600 × 600 px** | 1:1 | `/admin/team`, `/tailor`, `/track/[id]` | *Portrait of Finishing Inspector Segun Ogundimu conducting 14-point quality inspection at Brass Junction atelier in Aba.* | Holding finished garment on mahogany hanger, inspecting cuff buttonhole stitches under task lamp. |

---

### Section 3: Certified Doorstep Measurers (1:1 Square)

Field fitters build customer trust during home and office measurement bookings across `/measurement/book`, `/measurer`, and `/admin/team`.

| Asset ID | Measurer Name & Hub | Recommended Dimensions | Ratio | Key Routes | Descriptive Accessibility Alt Text | Shot Brief & Context |
|---|---|---|---|---|---|---|
| `img-ms-folake` | Folake Davies (Aba, Umuahia, Owerri) | **600 × 600 px** | 1:1 | `/measurement/book`, `/measurer`, `/admin/team` | *Portrait of Certified Doorstep Measurer Folake Davies with laser measuring rule and fabric samples in the South East.* | Professional outdoor/indoor portrait, carrying branded PrimeStitch leather tape case and swatch binder. |
| `img-ms-kunle` | Kunle Williams (Port Harcourt & Enugu) | **600 × 600 px** | 1:1 | `/measurement/book`, `/measurer`, `/admin/team` | *Portrait of Doorstep Master Fitter Kunle Williams on client fitting appointment in Port Harcourt.* | Confident, clean-cut portrait wearing branded PrimeStitch polo with fiberglass tape measure. |
| `img-ms-zainab` | Zainab Alabi (Lagos & Western Hub) | **600 × 600 px** | 1:1 | `/measurement/book`, `/measurer`, `/admin/team` | *Portrait of Mobile Fitter Zainab Alabi holding cloth measuring tape on doorstep fitting in Lagos.* | Friendly professional portrait in office lobby setting with client measurement clipboard. |

---

### Section 4: 9-Stage Atelier Production Milestones (16:9 Landscape)

Used for stage milestone visual tracking cards, progress modals, and audit logs in `/track/[orderId]` and `/admin/orders/[id]`.

| Stage No. | Stage Name | Recommended Dimensions | Ratio | Route | Descriptive Accessibility Alt Text | Visual Action Scene |
|---|---|---|---|---|---|---|
| **01** | Received | **1600 × 900 px** | 16:9 | `/track/[id]` | *Digital order ticket logging into the Aba atelier production intake queue with verified customer specifications.* | Close-up of order dossier and textile requisition voucher on atelier intake desk. |
| **02** | Confirmed | **1600 × 900 px** | 16:9 | `/track/[id]` | *Master cutter checking anatomic proportions with brass calipers against customer measurement set.* | Tailor analyzing chest, shoulder, and sleeve figures against fabric grainline. |
| **03** | Cutting | **1600 × 900 px** | 16:9 | `/track/[id]` | *Heavy brass tailoring shears shearing through starched Guinea brocade along drafted chalk lines on wooden cutting table.* | Action shot of shears slicing through fabric on long wooden bench; chalk marks visible. |
| **04** | Sewing | **1600 × 900 px** | 16:9 | `/track/[id]` | *Industrial lockstitch machine operator joining canvas chest piece and front panels with white basting stitches.* | High-speed needle movement joining shoulder canvas; focused hands guiding fabric. |
| **05** | Finishing | **1600 × 900 px** | 16:9 | `/track/[id]` | *Artisan hand-stitching collar band lining and buttonhole thread loops with fine brass thimble.* | Close macro of hand needlework, horn button attachment, and blind hem stitching. |
| **06** | Quality check | **1600 × 900 px** | 16:9 | `/track/[id]` | *Senior inspector applying steel measuring ruler against finished garment seam tolerances during 14-point audit.* | Measuring tape laid across chest and collar circumference against production checklist. |
| **07** | Ready | **1600 × 900 px** | 16:9 | `/track/[id]` | *Completed bespoke kaftan hand-steamed and encased in breathable zippered PrimeStitch garment bag.* | Steam rising from heavy iron press; garment hanging under studio spot lamp. |
| **08** | Dispatched | **1600 × 900 px** | 16:9 | `/track/[id]` | *Protective travel garment box being handed to priority logistics rider with guaranteed delivery tracking seal.* | Handover of sealed garment bag into courier transport container. |
| **09** | Delivered | **1600 × 900 px** | 16:9 | `/track/[id]` | *Customer receiving unboxed bespoke outfit in pristine condition at their doorstep within SLA deadline.* | Satisfied customer receiving package with signed delivery confirmation slip. |

---

### Section 5: Anatomic Posture Reference Photo Slots (3:4 Ratio)

Used by customers in `/order` (Step 3) and field measurers in `/measurer` to verify postural balance (dropped shoulder, prominent chest, spine curve).

| Asset ID | Slot Name | Recommended Dimensions | Ratio | Route | Descriptive Accessibility Alt Text | Photo Guidance for User / Measurer |
|---|---|---|---|---|---|---|
| `slot-posture-front` | Front Stance Reference | **900 × 1200 px** | 3:4 | `/order`, `/measurer` | *Front vertical stance posture reference photograph showing shoulder slope and chest line for cutter pattern adjustments.* | Full vertical silhouette from head to feet. Arms relaxed at sides, looking straight ahead, natural posture. |
| `slot-posture-side` | Side Profile Reference | **900 × 1200 px** | 3:4 | `/order`, `/measurer` | *Side profile posture reference photograph showing spine curvature and armhang angle for sleeve draft.* | Exact 90-degree side profile. Feet together, natural spine stance showing head carriage and lower back curve. |

---

### Section 6: Fabric Swatches & Texture Macros (1:1 Square)

Used on the design detail page (`/designs/[id]`) and fabric selector in `/order` to preview textile weave, weight (GSM), and hand-feel.

| Fabric ID | Textile Name | GSM | Weave Type | Dimensions | Ratio | Descriptive Accessibility Alt Text | Macro Texture Detail |
|---|---|---|---|---|---|---|---|
| `swatch-guinea-brocade` | Imperial Guinea Brocade | 280 | Jacquard Weave | **400 × 400 px** | 1:1 | *Macro photograph of Imperial Guinea Brocade showing lustrous white jacquard geometric weave with crisp starch finish.* | Extreme close-up showing light-reflecting relief pattern and dense combed cotton threads. |
| `swatch-atiku-cotton` | Super Atiku Cotton | 240 | Fine Twill | **400 × 400 px** | 1:1 | *Close-up of Super Atiku cotton fabric in chalk white showing diagonal twill texture and breathable lightweight drape.* | Clean diagonal twill lines under warm raking light showing softness and low wrinkle memory. |
| `swatch-raw-silk` | Lustrous Raw Silk Blend | 310 | Textured Slub | **400 × 400 px** | 1:1 | *Textural macro of raw silk blend fabric in brass gold showing natural organic slub threads and subtle sheen.* | Organic slubs and natural uneven filament silk threads with warm metallic reflection. |
| `swatch-adire-damask` | Artisan Hand-Dyed Adire | 340 | 16-Dip Damask | **400 × 400 px** | 1:1 | *Macro shot of hand-dyed Adire damask in 16-dip indigo navy showing traditional resist dye patterns and water-repellent sheen.* | Deep indigo blue with indigo dye pit nuances, wax resist veins, and heavy damask body. |
| `swatch-super-wool` | Super 140s Suiting Wool | 300 | Worsted Twill | **400 × 400 px** | 1:1 | *Close-up of Super 140s worsted suiting wool in charcoal black showing crisp crease-resistant twill weave.* | Smooth worsted yarn clarity, matte charcoal finish with no loose fibers. |
| `swatch-cashmere-blend` | Italian Wool-Cashmere | 290 | Micro-Herringbone | **400 × 400 px** | 1:1 | *Macro texture of Italian wool-cashmere blend in midnight navy showing microscopic herringbone chevron pattern.* | Velvety brushed cashmere hand feel with miniature herringbone chevron lines visible under macro zoom. |
| `swatch-wax-block` | Authenticated Holland Wax | 220 | Calico Plain | **400 × 400 px** | 1:1 | *Macro view of authentic geometric Holland wax block print showing sharp two-sided crackle resist and colorfast pigment.* | Vibrant gold, navy and emerald pigments with signature wax resist crackle lines. |
| `swatch-giza-oxford` | Giza 88 Pinpoint Oxford | 175 | 2-Ply Pinpoint | **400 × 400 px** | 1:1 | *Macro texture of Giza 88 Egyptian pinpoint Oxford cotton showing basketweave grain and silky surface sheen.* | Balanced two-ply warp and weft basketweave with clean pinpoint clarity. |

---

## 3. Implementation Verification Checklist

When adding or replacing any image on PrimeStitch, ensure:
- [x] Aspect ratio matches the designated standard (`3:4`, `1:1`, `16:9`, or `4:3`) using Tailwind aspect utilities (`aspect-[3/4]`, `aspect-square`, `aspect-[16/9]`, `aspect-[4/3]`).
- [x] Container uses `<PlaceholderImage />` from `@/components/ui/PlaceholderImage`.
- [x] `alt` attribute is non-empty and contains a descriptive phrase detailing the subject, cut, textile, and setting (never just "image" or "suit").
- [x] File weight is compressed to below the budget threshold for mobile cellular networks ($< 180\text{KB}$ for full silhouettes).
- [x] Image has `loading="lazy"` and `decoding="async"` (enabled by default in `<PlaceholderImage />`).
- [x] Fallback placeholder state contains proper tailoring motif icons, dimensions badge, and error tolerance.

