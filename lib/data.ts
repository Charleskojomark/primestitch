import { Design, Tailor, Measurer, Order, CapacitySchedule, MeasurementBooking, BulkOrderRequest, MediaAsset } from "./types";

export const INITIAL_CAPACITY: CapacitySchedule = {
  dailyGarmentCapacity: 15,
  standardTurnaroundDays: 7,
  expressAvailable: true,
};

export const INITIAL_DESIGNS: Design[] = [
  {
    id: "des-kaftan",
    slug: "royal-kaftan",
    name: "Royal Grand Kaftan",
    category: "Traditional",
    startingPrice: 55000,
    description: "Architectural silhouette featuring subtle hand-embroidered neckline, clean stitch seams, and side vents crafted for majestic movement.",
    heroImage: "/images/designs/kaftan.svg",
    imageAlt: "Full-length portrait of a Nigerian gentleman wearing an Architectural Royal Grand Kaftan in ivory Guinea brocade with intricate geometric neckline embroidery and side vents, photographed in a warm natural-light studio.",
    imageDimensions: "1200 × 1600 px (3:4)",
    standardLeadDays: 7,
    featured: true,
    fabrics: [
      {
        id: "fab-brocade-guinea",
        name: "Imperial Guinea Brocade",
        gsm: 280,
        weave: "Jacquard Lustre Weave",
        description: "Heavyweight 100% combed cotton with crisp starch finish that holds rigid architectural lines.",
        priceModifier: 15000,
        colors: ["#FFFFFF", "#0B1528", "#C28B28", "#0A5C36"],
      },
      {
        id: "fab-atiku-cotton",
        name: "Super Atiku Cotton",
        gsm: 240,
        weave: "Fine Twill Weave",
        description: "Soft, breathable weave offering superior outdoor drape under humid tropical weather.",
        priceModifier: 0,
        colors: ["#FFFFFF", "#F1F5F9", "#CBD5E1", "#0B1528"],
      },
      {
        id: "fab-raw-silk",
        name: "Lustrous Raw Silk Blend",
        gsm: 310,
        weave: "Textured Slub Weave",
        description: "Rich textural sheen with firm body designed for high-profile evening celebrations.",
        priceModifier: 25000,
        colors: ["#C28B28", "#0B1528", "#1A2232"],
      },
    ],
    availableColors: [
      { name: "Atelier Midnight Navy", hex: "#0B1528" },
      { name: "Chalk White", hex: "#FFFFFF" },
      { name: "Shears Brass Gold", hex: "#C28B28" },
      { name: "Verdant Palm Emerald", hex: "#0A5C36" },
    ],
  },
  {
    id: "des-agbada",
    slug: "ceremonial-isiagu-set",
    name: "Ceremonial Isiagu Native Set",
    category: "Traditional",
    startingPrice: 95000,
    description: "Authentic Eastern Nigerian ceremonial masterwork featuring sovereign gold embroidery motif, structured native tunic, and tailored matching trousers.",
    heroImage: "/images/designs/agbada.svg",
    imageAlt: "Authentic Eastern Nigerian ceremonial Isiagu native set in 16-dip deep indigo Adire damask with matching trousers, showing architectural shoulder draping and crisp basting folds.",
    imageDimensions: "1200 × 1600 px (3:4)",
    standardLeadDays: 7,
    featured: true,
    fabrics: [
      {
        id: "fab-adire-damask",
        name: "Artisan Adire Hand-Dyed Damask",
        gsm: 340,
        weave: "16-Dip Indigo Damask",
        description: "Hand-dyed by master artisans in Abeokuta, finished with water-repellent crisp pressing.",
        priceModifier: 30000,
        colors: ["#0B1528", "#1A2232"],
      },
      {
        id: "fab-super-wool-blend",
        name: "Super 140s Suiting Wool",
        gsm: 300,
        weave: "Worsted Twill",
        description: "Formal structured drape that resists creasing during long celebration banquets.",
        priceModifier: 20000,
        colors: ["#0B1528", "#1A2232", "#475569"],
      },
    ],
    availableColors: [
      { name: "Adire Deep Indigo", hex: "#0B1528" },
      { name: "Onyx Black", hex: "#1A2232" },
      { name: "Royal Brass", hex: "#C28B28" },
    ],
  },
  {
    id: "des-senator",
    slug: "executive-senator",
    name: "Executive Senator Suit",
    category: "Formal",
    startingPrice: 65000,
    description: "The modern Nigerian professional standard. Sharp mandarin collar, chest pocket flap, and side seam slits cut flush to measurement.",
    heroImage: "/images/designs/senator.svg",
    imageAlt: "Modern Executive Senator Suit in Atelier Midnight navy Italian wool-cashmere blend, featuring a structured mandarin band collar, concealed button placket, and tailored trousers.",
    imageDimensions: "1200 × 1600 px (3:4)",
    standardLeadDays: 6,
    featured: true,
    fabrics: [
      {
        id: "fab-cashmere-blend",
        name: "Italian Wool-Cashmere",
        gsm: 290,
        weave: "Micro-Herringbone",
        description: "Ultra-refined hand feel with subtle texture, cut with razor-sharp drape.",
        priceModifier: 18000,
        colors: ["#0B1528", "#1A2232", "#CBD5E1"],
      },
      {
        id: "fab-poly-viscose",
        name: "Tropical High-Twist Gabardine",
        gsm: 260,
        weave: "Dense Gabardine",
        description: "Wrinkle-immune and lightweight for daily commute between Victoria Island and Ikeja.",
        priceModifier: 0,
        colors: ["#0B1528", "#475569", "#1A2232", "#0A5C36"],
      },
    ],
    availableColors: [
      { name: "Atelier Midnight", hex: "#0B1528" },
      { name: "Charcoal Weft", hex: "#1A2232" },
      { name: "Forest Emerald", hex: "#0A5C36" },
      { name: "Slate Blue", hex: "#475569" },
    ],
  },
  {
    id: "des-suit",
    slug: "safari-native-set",
    name: "Safari Native Two-Piece Set",
    category: "Formal",
    startingPrice: 85000,
    description: "Structured Nigerian four-pocket safari native jacket with tailored trousers cut flush to measurement for executive events and meetings.",
    heroImage: "/images/designs/suit.svg",
    imageAlt: "Safari native two-piece set in charcoal Italian wool-cashmere with pick-stitched lapels, horn buttons, and precise trouser break.",
    imageDimensions: "1200 × 1600 px (3:4)",
    standardLeadDays: 7,
    featured: true,
    fabrics: [
      {
        id: "fab-british-wool",
        name: "Savile Pure Worsted Wool 150s",
        gsm: 320,
        weave: "Plain Weave Super 150s",
        description: "Imported Yorkshire mills wool, perfectly balanced for air-conditioned boardrooms and tropical heat.",
        priceModifier: 45000,
        colors: ["#0B1528", "#1A2232", "#475569"],
      },
      {
        id: "fab-summer-linen",
        name: "Irish Heavyweight Linen",
        gsm: 280,
        weave: "Crisp Plain Weave",
        description: "Bespoke destination wedding fabric that softens with age while maintaining structured shoulder line.",
        priceModifier: 20000,
        colors: ["#FFFFFF", "#F8FAFC", "#C28B28"],
      },
    ],
    availableColors: [
      { name: "Midnight Suiting", hex: "#0B1528" },
      { name: "Deep Charcoal", hex: "#1A2232" },
      { name: "Tailor's Chalk Gray", hex: "#475569" },
    ],
  },
  {
    id: "des-ankara",
    slug: "ankara-wrap-dress",
    name: "Architectural Ankara Wrap Dress",
    category: "Contemporary",
    startingPrice: 48000,
    description: "Modern asymmetric drape, structured bishop sleeves, and reinforced waist sash cut from authenticated Holland wax blocks.",
    heroImage: "/images/designs/ankara-dress.svg",
    imageAlt: "Architectural Ankara wrap dress in authentic geometric gold and navy wax block print, featuring asymmetric fluid drape, bishop sleeves, and reinforced waist sash.",
    imageDimensions: "1200 × 1600 px (3:4)",
    standardLeadDays: 6,
    featured: false,
    fabrics: [
      {
        id: "fab-wax-block",
        name: "Authenticated Block Cotton Wax",
        gsm: 220,
        weave: "100% Calico Plain Weave",
        description: "Double-sided vibrant print with vibrant wax resist cracking, colourfast in sun.",
        priceModifier: 8000,
        colors: ["#0B1528", "#FFC72C", "#0A5C36"],
      },
    ],
    availableColors: [
      { name: "Geometric Gold & Navy", hex: "#0B1528" },
      { name: "Tape Ochre Accent", hex: "#FFC72C" },
      { name: "Palm Emerald Motif", hex: "#0A5C36" },
    ],
  },
  {
    id: "des-shirt",
    slug: "corporate-oxford-shirt",
    name: "Crisp Cutaway Oxford Shirt",
    category: "Corporate",
    startingPrice: 32000,
    description: "Italian cutaway spread collar, double fused cuffs, split yoke back, and 22 stitches per inch fine seam construction.",
    heroImage: "/images/designs/shirt.svg",
    imageAlt: "Crisp cutaway French-cuff corporate shirt tailored from Giza 88 Egyptian pinpoint Oxford cotton in optic white with split yoke and mother-of-pearl buttons.",
    imageDimensions: "1200 × 1600 px (3:4)",
    standardLeadDays: 5,
    featured: false,
    fabrics: [
      {
        id: "fab-egyptian-oxford",
        name: "Giza 88 Egyptian Pinpoint Oxford",
        gsm: 175,
        weave: "2-Ply Pinpoint Oxford",
        description: "Silky breathable long-staple cotton with remarkable tensile strength.",
        priceModifier: 10000,
        colors: ["#FFFFFF", "#F1F5F9", "#0B1528"],
      },
    ],
    availableColors: [
      { name: "Atelier Optic White", hex: "#FFFFFF" },
      { name: "Ice Blue Weft", hex: "#F1F5F9" },
      { name: "French Navy", hex: "#0B1528" },
    ],
  },
  {
    id: "des-asoebi",
    slug: "celebration-aso-ebi-set",
    name: "Celebration Aso Ebi Ensemble",
    category: "Events",
    startingPrice: 78000,
    description: "Designed for synchronized group orders of 20+ pieces. Coordinated pattern cutting ensures precise silhouette harmony across family groups.",
    heroImage: "/images/designs/aso-ebi.svg",
    imageAlt: "Celebration Aso Ebi ensemble in champagne brass heavy silk crepe and organza, styled for Nigerian wedding ceremonies and coordinated family groups.",
    imageDimensions: "1200 × 1600 px (3:4)",
    standardLeadDays: 10,
    featured: true,
    fabrics: [
      {
        id: "fab-lustrous-crepe",
        name: "Heavy Silk Crepe & Organza",
        gsm: 290,
        weave: "Satin-Backed Crepe",
        description: "Heavy fluid drape that flatters all body structures with zero cling.",
        priceModifier: 15000,
        colors: ["#0B1528", "#C28B28", "#0A5C36"],
      },
    ],
    availableColors: [
      { name: "Champagne Brass", hex: "#C28B28" },
      { name: "Royal Midnight", hex: "#0B1528" },
      { name: "Emerald Glaze", hex: "#0A5C36" },
    ],
  },
  {
    id: "des-polo",
    slug: "atelier-uniform-polo",
    name: "Executive Uniform Pique Polo",
    category: "Corporate",
    startingPrice: 22000,
    description: "Heavyweight combed cotton pique with rib-knit non-curling collar and reinforced side vents. Built for corporate fleet durability.",
    heroImage: "/images/designs/polo.svg",
    imageAlt: "Executive uniform piqué polo in corporate navy combed double-piqué cotton with non-curling knit collar and reinforced side vents for corporate teams.",
    imageDimensions: "1200 × 1600 px (3:4)",
    standardLeadDays: 5,
    featured: false,
    fabrics: [
      {
        id: "fab-heavy-pique",
        name: "Combed Double-Pique Cotton",
        gsm: 250,
        weave: "Honeycomb Pique",
        description: "Wash-tested 50+ cycles with zero color bleed under tropical laundry conditions.",
        priceModifier: 0,
        colors: ["#0B1528", "#FFFFFF", "#1A2232"],
      },
    ],
    availableColors: [
      { name: "Corporate Navy", hex: "#0B1528" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Charcoal Slate", hex: "#1A2232" },
    ],
  },
];

export const INITIAL_TAILORS: Tailor[] = [
  {
    id: "tl-01",
    name: "Master Tunde Adeleke",
    email: "tunde.adeleke@primestitch.com",
    area: "Aba Master Atelier (Factory Road)",
    specialty: "Bespoke Suiting & Agbada Architecture",
    currentWorkload: 8,
    maxCapacity: 12,
    avatar: "/images/tailors/tl-tunde.svg",
    avatarAlt: "Close-up portrait of Master Tailor Tunde Adeleke at his cutting bench in the Aba Factory Road atelier with brass tailoring shears and measuring tape",
    avatarDimensions: "600 × 600 px (1:1)",
    rating: 4.9,
    phone: "+234 803 492 8110",
  },
  {
    id: "tl-02",
    name: "Chidi Okafor",
    email: "chidi.okafor@primestitch.com",
    area: "Aba Artisan Cluster (Ariaria)",
    specialty: "Senator Cuts & Pattern Drafting",
    currentWorkload: 6,
    maxCapacity: 10,
    avatar: "/images/tailors/tl-chidi.svg",
    avatarAlt: "Portrait of Master Pattern Drafter Chidi Okafor drafting geometric paper patterns at the Ariaria bench in Aba",
    avatarDimensions: "600 × 600 px (1:1)",
    rating: 4.8,
    phone: "+234 802 884 9201",
  },
  {
    id: "tl-03",
    name: "Amina Bello",
    email: "amina.bello@primestitch.com",
    area: "Aba Heritage Studio (Eziukwu)",
    specialty: "Hand Embroidery & Structural Dresses",
    currentWorkload: 9,
    maxCapacity: 10,
    avatar: "/images/tailors/tl-amina.svg",
    avatarAlt: "Portrait of Senior Embroidery Artisan Amina Bello examining hand embroidery threads at Eziukwu studio in Aba",
    avatarDimensions: "600 × 600 px (1:1)",
    rating: 5.0,
    phone: "+234 814 119 4022",
  },
  {
    id: "tl-04",
    name: "Femi Balogun",
    email: "femi.balogun@primestitch.com",
    area: "Aba Industrial Bench (Umungasi)",
    specialty: "Traditional Kaftans & Seam Construction",
    currentWorkload: 4,
    maxCapacity: 10,
    avatar: "/images/tailors/tl-femi.svg",
    avatarAlt: "Portrait of Master Tailor Femi Balogun overseeing basting seam assembly at Umungasi industrial bench in Aba",
    avatarDimensions: "600 × 600 px (1:1)",
    rating: 4.7,
    phone: "+234 809 332 1980",
  },
  {
    id: "tl-05",
    name: "Segun Ogundimu",
    email: "segun.ogundimu@primestitch.com",
    area: "Aba Express Unit (Brass Junction)",
    specialty: "Corporate Uniforms & Rapid Finishing",
    currentWorkload: 7,
    maxCapacity: 14,
    avatar: "/images/tailors/tl-segun.svg",
    avatarAlt: "Portrait of Finishing Inspector Segun Ogundimu conducting 14-point quality inspection at Brass Junction atelier in Aba",
    avatarDimensions: "600 × 600 px (1:1)",
    rating: 4.8,
    phone: "+234 816 771 9043",
  },
];

export const INITIAL_MEASURERS: Measurer[] = [
  {
    id: "ms-01",
    name: "Folake Davies",
    email: "folake.davies@primestitch.com",
    area: "Aba, Umuahia & Owerri Hub",
    avatar: "/images/measurers/ms-folake.svg",
    avatarAlt: "Portrait of Certified Doorstep Measurer Folake Davies with laser measuring rule and fabric samples in the South East",
    avatarDimensions: "600 × 600 px (1:1)",
    phone: "+234 803 910 4421",
    rating: 4.95,
    activeToday: true,
  },
  {
    id: "ms-02",
    name: "Kunle Williams",
    email: "kunle.williams@primestitch.com",
    area: "Port Harcourt & Enugu Corridors",
    avatar: "/images/measurers/ms-kunle.svg",
    avatarAlt: "Portrait of Doorstep Master Fitter Kunle Williams on client fitting appointment in Port Harcourt",
    avatarDimensions: "600 × 600 px (1:1)",
    phone: "+234 805 441 8290",
    rating: 4.9,
    activeToday: true,
  },
  {
    id: "ms-03",
    name: "Zainab Alabi",
    email: "zainab.alabi@primestitch.com",
    area: "Lagos & Western Dispatch",
    avatar: "/images/measurers/ms-zainab.svg",
    avatarAlt: "Portrait of Mobile Fitter Zainab Alabi holding cloth measuring tape on doorstep fitting in Lagos",
    avatarDimensions: "600 × 600 px (1:1)",
    phone: "+234 818 200 9314",
    rating: 4.85,
    activeToday: false,
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    "id": "#PS-8092",
    "customerName": "Uche Onyema",
    "customerPhone": "+234 803 771 8290",
    "customerEmail": "uche.onyema@heritagegroup.ng",
    "deliveryAddress": "12 Okigwe Road, opposite Abia State Library, Aba, Abia State",
    "deliveryArea": "Aba South, Abia",
    "notes": "4 bespoke long-sleeve shirts in Egyptian Cotton with monogrammed cuffs. Delivered on 30th Oct.",
    "status": "Delivered",
    "isAtRisk": false,
    "isLate": false,
    "createdAt": "2026-10-21T09:00:00.000Z",
    "guaranteedDeliveryDate": "2026-10-30T14:00:00.000Z",
    "assignedTailorId": "tl-01",
    "assignedTailorName": "Master Tunde Adeleke",
    "paymentStatus": "fully_paid",
    "paymentTier": "full_100",
    "totalAmount": 120000,
    "depositAmount": 120000,
    "balanceAmount": 0,
    "items": [
      {
        "designId": "des-shirt-01",
        "designName": "Bespoke Luxury Dress Shirts (4-Pack)",
        "fabricId": "fab-cotton-egyptian",
        "fabricName": "Pure Egyptian Giza Cotton (220 GSM)",
        "colorName": "Crisp White & Sky Chambray",
        "colorHex": "#FFFFFF",
        "quantity": 4,
        "unitPrice": 30000,
        "measurementMethod": "saved_profile",
        "measurements": {
          "unit": "in",
          "chest": 42,
          "shoulder": 18.5,
          "sleeveLength": 26,
          "neck": 16.5,
          "waist": 35,
          "trouserLength": 41,
          "hips": 42,
          "bicep": 15
        }
      }
    ],
    "history": [
      {
        "stage": "Received",
        "timestamp": "21 Oct, 10:00",
        "note": "Order confirmed for 4 bespoke shirts with cuff monogram 'U.O.' 100% upfront payment received.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Confirmed",
        "timestamp": "22 Oct, 11:00",
        "note": "Master Tunde verified collar spread and bicep tolerances. Fabric unrolled from vault.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Cutting",
        "timestamp": "24 Oct, 12:30",
        "note": "4 sets of front, back yokes, and sleeves precision-sheared.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Sewing",
        "timestamp": "26 Oct, 15:00",
        "note": "Single-needle French seams stitched on all 4 shirts. Mother-of-pearl buttons cross-anchored.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Finishing",
        "timestamp": "28 Oct, 17:00",
        "note": "Hand-monogrammed cuffs finished; buttonholes tension-tested.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Quality check",
        "timestamp": "29 Oct, 12:00",
        "note": "Passed QA inspection. Collar points 100% symmetrical, zero loose threads, steam pressed.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Ready",
        "timestamp": "29 Oct, 17:30",
        "note": "Boxed in PrimeStitch archival shirt gift boxes.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Dispatched",
        "timestamp": "30 Oct, 10:00",
        "note": "Dispatched with priority courier rider to Okigwe Road.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Delivered",
        "timestamp": "30 Oct, 14:45",
        "note": "Delivered directly to Uche Onyema on 30th Oct. Verified fit and signed handover.",
        "actorName": "Master Atelier"
      }
    ]
  },
  {
    "id": "#PS-8104",
    "customerName": "Chief Obinna Igwe",
    "customerPhone": "+234 803 451 9022",
    "customerEmail": "obinna.igwe@heritageenergy.ng",
    "deliveryAddress": "Plot 14B, Golf Course Road, GRA Phase 2, Aba, Abia State",
    "deliveryArea": "Aba South, Abia",
    "notes": "Customer requested 1.5-inch drape ease on kaftan hem for chieftaincy ceremony.",
    "status": "Delivered",
    "isAtRisk": false,
    "isLate": false,
    "createdAt": "2026-10-22T09:30:00.000Z",
    "guaranteedDeliveryDate": "2026-10-31T14:00:00.000Z",
    "assignedTailorId": "tl-01",
    "assignedTailorName": "Master Tunde Adeleke",
    "paymentStatus": "fully_paid",
    "paymentTier": "full_100",
    "totalAmount": 85000,
    "depositAmount": 51000,
    "balanceAmount": 34000,
    "items": [
      {
        "designId": "des-kaftan-01",
        "designName": "Sovereign Kaftan",
        "fabricId": "fab-cashmere-navy",
        "fabricName": "Super 140s Cashmere Wool (320 GSM)",
        "colorName": "Atelier Midnight",
        "colorHex": "#0B1528",
        "quantity": 1,
        "unitPrice": 85000,
        "measurementMethod": "saved_profile",
        "measurements": {
          "unit": "in",
          "chest": 44,
          "shoulder": 19.5,
          "sleeveLength": 26.5,
          "neck": 17,
          "waist": 38,
          "trouserLength": 42,
          "hips": 45,
          "bicep": 16
        }
      }
    ],
    "history": [
      {
        "stage": "Received",
        "timestamp": "22 Oct, 10:30",
        "note": "Order confirmed via bespoke catalogue. ₦51,000 commitment deposit received via Paystack.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Confirmed",
        "timestamp": "23 Oct, 09:15",
        "note": "Anatomic tolerances verified by Master Tunde Adeleke. Fabric allocated from Aba Vault (Roll #NV-320).",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Cutting",
        "timestamp": "24 Oct, 12:00",
        "note": "Individual paper pattern chalked and hand-sheared with brass shears; seam allowances notched at 0.75 in.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Sewing",
        "timestamp": "26 Oct, 15:30",
        "note": "Floating canvas basted to chest piece; shoulder pads and internal silk lining anchored.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Finishing",
        "timestamp": "28 Oct, 17:00",
        "note": "Intricate filigree embroidery applied to placket. Horn buttons secured with waxed thread.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Quality check",
        "timestamp": "30 Oct, 11:00",
        "note": "Passed Master QA inspection: Zero puckering, seam symmetry certified, final 2-stage steam press completed.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Ready",
        "timestamp": "30 Oct, 16:30",
        "note": "Garment boxed in PrimeStitch archival suit bag. Balance payment of ₦34,000 received.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Dispatched",
        "timestamp": "31 Oct, 10:00",
        "note": "Dispatched via verified Aba atelier logistics rider. Tracking PIN #9022.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Delivered",
        "timestamp": "31 Oct, 14:15",
        "note": "Handed over directly to Chief Obinna Igwe at GRA Phase 2. Handover inspection signed on time (SLA satisfied).",
        "actorName": "Master Atelier"
      }
    ]
  },
  {
    "id": "#PS-8142",
    "customerName": "Dr. Ngozi Adeleke-Okonkwo",
    "customerPhone": "+234 812 670 4118",
    "customerEmail": "ngozi.adeleke@lagosmed.org",
    "deliveryAddress": "18 Cooper Road, Ikoyi, Lagos",
    "deliveryArea": "Eti-Osa, Lagos",
    "notes": "Slim-fit tuxedo with satin peak lapels. Customer fully paid upfront. Delivered on 1st Nov.",
    "status": "Delivered",
    "isAtRisk": false,
    "isLate": false,
    "createdAt": "2026-10-24T14:15:00.000Z",
    "guaranteedDeliveryDate": "2026-11-01T14:00:00.000Z",
    "assignedTailorId": "tl-02",
    "assignedTailorName": "Ifeanyi Okafor",
    "paymentStatus": "fully_paid",
    "paymentTier": "full_100",
    "totalAmount": 125000,
    "depositAmount": 125000,
    "balanceAmount": 0,
    "items": [
      {
        "designId": "des-tuxedo-01",
        "designName": "Double-Breasted Wool Tuxedo",
        "fabricId": "fab-wool-black",
        "fabricName": "Italian Lightweight Worsted Wool (280 GSM)",
        "colorName": "Charcoal Onyx",
        "colorHex": "#2B2D42",
        "quantity": 1,
        "unitPrice": 125000,
        "measurementMethod": "saved_profile",
        "measurements": {
          "unit": "in",
          "chest": 41.5,
          "shoulder": 18.5,
          "sleeveLength": 25.5,
          "neck": 16,
          "waist": 34,
          "trouserLength": 40.5,
          "hips": 41,
          "bicep": 14.5
        }
      }
    ],
    "history": [
      {
        "stage": "Received",
        "timestamp": "24 Oct, 15:15",
        "note": "Online bespoke order placed with 100% upfront card payment. Measurement profile confirmed.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Confirmed",
        "timestamp": "25 Oct, 10:00",
        "note": "Assigned to Bench 2 (Ifeanyi Okafor). Italian worsted wool roll inspected and steambox stabilized.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Cutting",
        "timestamp": "26 Oct, 13:00",
        "note": "Tuxedo peak lapels and trousers cut to bespoke pattern. Grain lines matched.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Sewing",
        "timestamp": "28 Oct, 11:00",
        "note": "Hand-stitched horsehair canvas construction. Trousers braided with satin side stripe.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Finishing",
        "timestamp": "30 Oct, 12:00",
        "note": "Satin-faced peak lapels set; silk buttonholes finished by hand.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Quality check",
        "timestamp": "31 Oct, 10:30",
        "note": "Passed QA review: Flawless lapel roll, crisp trousers crease, zero deviation from spec sheet.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Ready",
        "timestamp": "31 Oct, 15:00",
        "note": "Steam pressed and packed in rigid travel garment carrier with bespoke cedar hanger.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Dispatched",
        "timestamp": "31 Oct, 19:00",
        "note": "Transferred to overnight express flight to Lagos Hub.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Delivered",
        "timestamp": "1 Nov, 12:45",
        "note": "Delivered to Dr. Ngozi Adeleke at Ikoyi residence on 1st Nov. Perfect fit confirmed.",
        "actorName": "Master Atelier"
      }
    ]
  },
  {
    "id": "#PS-8315",
    "customerName": "Barrister Chukwuemeka Danladi",
    "customerPhone": "+234 802 334 8765",
    "customerEmail": "c.danladi@lexchambers.abj",
    "deliveryAddress": "22 Danube Street, off IBB Way, Maitama, Abuja FCT",
    "deliveryArea": "Municipal, Abuja FCT",
    "notes": "PASSED FINISHING STAGE. Final Master Quality Review for ceremonial 3-piece suite before courier dispatch to Abuja.",
    "status": "Quality check",
    "isAtRisk": false,
    "isLate": false,
    "createdAt": "2026-10-27T16:20:00.000Z",
    "guaranteedDeliveryDate": "2026-11-04T14:00:00.000Z",
    "assignedTailorId": "tl-01",
    "assignedTailorName": "Master Tunde Adeleke",
    "paymentStatus": "deposit_paid",
    "paymentTier": "deposit_60",
    "totalAmount": 145000,
    "depositAmount": 87000,
    "balanceAmount": 58000,
    "items": [
      {
        "designId": "des-agbada-01",
        "designName": "Ceremonial Agbada 3-Piece Suite",
        "fabricId": "fab-damask-gold",
        "fabricName": "Royal Damask & Swiss Cotton Voile (340 GSM)",
        "colorName": "Imperial White / Gold Filigree",
        "colorHex": "#F8F9FA",
        "quantity": 1,
        "unitPrice": 145000,
        "measurementMethod": "saved_profile",
        "measurements": {
          "unit": "in",
          "chest": 45,
          "shoulder": 20,
          "sleeveLength": 27,
          "neck": 17.5,
          "waist": 39,
          "trouserLength": 42.5,
          "hips": 46,
          "bicep": 16.5
        }
      }
    ],
    "history": [
      {
        "stage": "Received",
        "timestamp": "27 Oct, 17:20",
        "note": "Bespoke ceremonial commission placed for Supreme Court induction. ₦87,000 deposit confirmed.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Confirmed",
        "timestamp": "28 Oct, 11:00",
        "note": "Master Tunde Adeleke locked pattern specifications. Swiss cotton voile pre-shrunk.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Cutting",
        "timestamp": "29 Oct, 15:00",
        "note": "Agbada wings and inner kaftan panels precision-cut with traditional 8-point seam layout.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Sewing",
        "timestamp": "30 Oct, 18:00",
        "note": "Inner kaftan and trousers assembled; Agbada sleeve drapes structured with hidden wrist loops.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Finishing",
        "timestamp": "2 Nov, 17:00",
        "note": "Finishing completed: Intricate chest crest hand-embroidered with metallic gold thread; micro-threads singed.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Quality check",
        "timestamp": "3 Nov, 14:45",
        "note": "PASSED FINISHING STAGE. Undergoing final Master Tailor Review. Checking symmetry of front chest crest, armhole drape, and hand-ironed crease.",
        "actorName": "Master Atelier"
      }
    ]
  },
  {
    "id": "#PS-8280",
    "customerName": "Engr. Obinna Victor Okoye",
    "customerPhone": "+234 705 918 2341",
    "customerEmail": "obinna.okoye@oilgas.ng",
    "deliveryAddress": "Plot 8, Peter Odili Road, Trans-Amadi, Port Harcourt, Rivers State",
    "deliveryArea": "Port Harcourt, Rivers",
    "notes": "PASSED FINISHING STAGE. Undergoing Master Tailor Quality Review & pressing before dispatch to Port Harcourt.",
    "status": "Quality check",
    "isAtRisk": false,
    "isLate": false,
    "createdAt": "2026-10-28T10:45:00.000Z",
    "guaranteedDeliveryDate": "2026-11-05T14:00:00.000Z",
    "assignedTailorId": "tl-04",
    "assignedTailorName": "Chisom Eze",
    "paymentStatus": "deposit_paid",
    "paymentTier": "deposit_60",
    "totalAmount": 75000,
    "depositAmount": 45000,
    "balanceAmount": 30000,
    "items": [
      {
        "designId": "des-senator-01",
        "designName": "Aba Executive 2-Piece Senator",
        "fabricId": "fab-cashmere-350",
        "fabricName": "Imperial Heavyweight Cashmere (350 GSM)",
        "colorName": "Deep Charcoal",
        "colorHex": "#1E2229",
        "quantity": 1,
        "unitPrice": 75000,
        "measurementMethod": "saved_profile",
        "measurements": {
          "unit": "in",
          "chest": 43,
          "shoulder": 19,
          "sleeveLength": 26,
          "neck": 16.5,
          "waist": 36,
          "trouserLength": 41.5,
          "hips": 43,
          "bicep": 15.5
        }
      }
    ],
    "history": [
      {
        "stage": "Received",
        "timestamp": "28 Oct, 11:45",
        "note": "Order confirmed via mobile app with 60% deposit (₦45,000 paid). Agreed delivery: 5 Nov 2026.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Confirmed",
        "timestamp": "29 Oct, 10:00",
        "note": "Measurements verified by Port Harcourt field fitter. Assigned to Bench 4 (Chisom Eze).",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Cutting",
        "timestamp": "30 Oct, 12:30",
        "note": "Pattern drafted with tapered leg and sharp structured collar. Hand-cut from 350 GSM Imperial Cashmere.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Sewing",
        "timestamp": "31 Oct, 16:00",
        "note": "Interfacing fused with German precision press; trousers assembled with reinforced crotch seam.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Finishing",
        "timestamp": "2 Nov, 12:00",
        "note": "Finishing completed: blind-stitched hem, edge piping, and hand-tacked collar facing set.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Quality check",
        "timestamp": "3 Nov, 11:15",
        "note": "PASSED FINISHING STAGE. Currently on Master Quality Inspection bench for final pressing, buttonhole tension tests, and measurement verification against client spec sheet.",
        "actorName": "Master Atelier"
      }
    ]
  },
  {
    "id": "#PS-8348",
    "customerName": "Chief Kingsley Nnamdi",
    "customerPhone": "+234 803 612 4490",
    "customerEmail": "k.nnamdi@nnamdicontracts.ng",
    "deliveryAddress": "Plot 5, Commercial Layout, Factory Road, Aba, Abia State",
    "deliveryArea": "Aba South, Abia",
    "notes": "Chief Kingsley's ceremonial outfit is finished. Hand-stitched embroidery and blind-hemming completed; preparing for quality check.",
    "status": "Finishing",
    "isAtRisk": false,
    "isLate": false,
    "createdAt": "2026-10-29T11:00:00.000Z",
    "guaranteedDeliveryDate": "2026-11-06T14:00:00.000Z",
    "assignedTailorId": "tl-01",
    "assignedTailorName": "Master Tunde Adeleke",
    "paymentStatus": "deposit_paid",
    "paymentTier": "deposit_60",
    "totalAmount": 95000,
    "depositAmount": 57000,
    "balanceAmount": 38000,
    "items": [
      {
        "designId": "des-kaftan-01",
        "designName": "Sovereign Kaftan Suit",
        "fabricId": "fab-cashmere-350",
        "fabricName": "Imperial Heavyweight Cashmere (350 GSM)",
        "colorName": "Atelier Midnight",
        "colorHex": "#0B1528",
        "quantity": 1,
        "unitPrice": 95000,
        "measurementMethod": "saved_profile",
        "measurements": {
          "unit": "in",
          "chest": 44.5,
          "shoulder": 19.5,
          "sleeveLength": 26.5,
          "neck": 17,
          "waist": 38.5,
          "trouserLength": 42,
          "hips": 45,
          "bicep": 16
        }
      }
    ],
    "history": [
      {
        "stage": "Received",
        "timestamp": "29 Oct, 12:00",
        "note": "Order confirmed with 60% advance deposit for chieftaincy celebration.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Confirmed",
        "timestamp": "30 Oct, 10:30",
        "note": "Measurements locked by Master Tunde Adeleke. Imperial Cashmere allocated.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Cutting",
        "timestamp": "31 Oct, 13:00",
        "note": "Cut with traditional 2-inch drape ease on kaftan wings.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Sewing",
        "timestamp": "1 Nov, 16:30",
        "note": "Main panels assembled, floating canvas basted.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Finishing",
        "timestamp": "3 Nov, 17:00",
        "note": "Garment finished: Metallic gold placket embroidery completed, buttons attached, inner seam tape set.",
        "actorName": "Master Atelier"
      }
    ]
  },
  {
    "id": "#PS-8355",
    "customerName": "Senator Chinedu Nwosu",
    "customerPhone": "+234 809 332 1088",
    "customerEmail": "senator.nwosu@nass.gov.ng",
    "deliveryAddress": "Plot 19, Senate Quarters, Maitama, Abuja FCT",
    "deliveryArea": "Municipal, Abuja FCT",
    "notes": "Senator Chinedu's bespoke Senator suit is finished; buttonholes and hand-pressed lapels completed. About to transition to Master Quality Check.",
    "status": "Finishing",
    "isAtRisk": false,
    "isLate": false,
    "createdAt": "2026-10-29T14:30:00.000Z",
    "guaranteedDeliveryDate": "2026-11-05T14:00:00.000Z",
    "assignedTailorId": "tl-03",
    "assignedTailorName": "Musa Danjuma",
    "paymentStatus": "deposit_paid",
    "paymentTier": "deposit_60",
    "totalAmount": 85000,
    "depositAmount": 51000,
    "balanceAmount": 34000,
    "items": [
      {
        "designId": "des-senator-01",
        "designName": "Classic Senator 2-Piece",
        "fabricId": "fab-cashmere-navy",
        "fabricName": "Super 140s Cashmere Wool (320 GSM)",
        "colorName": "Charcoal Onyx",
        "colorHex": "#2B2D42",
        "quantity": 1,
        "unitPrice": 85000,
        "measurementMethod": "saved_profile",
        "measurements": {
          "unit": "in",
          "chest": 43,
          "shoulder": 19,
          "sleeveLength": 26,
          "neck": 16.5,
          "waist": 36,
          "trouserLength": 41.5,
          "hips": 43,
          "bicep": 15.5
        }
      }
    ],
    "history": [
      {
        "stage": "Received",
        "timestamp": "29 Oct, 15:30",
        "note": "Order confirmed via VIP concierge. ₦51,000 deposit confirmed.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Confirmed",
        "timestamp": "30 Oct, 11:00",
        "note": "Pattern drafted to Senator's exact standing posture measurements.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Cutting",
        "timestamp": "31 Oct, 15:00",
        "note": "Precision shears cut from Super 140s wool roll.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Sewing",
        "timestamp": "2 Nov, 11:30",
        "note": "Jacket front basted with internal canvas; trousers waistband stitched.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Finishing",
        "timestamp": "3 Nov, 15:00",
        "note": "Finishing completed: horn buttons anchored, pockets hand-tacked. Ready to transfer to Quality Check.",
        "actorName": "Master Atelier"
      }
    ]
  },
  {
    "id": "#PS-8362",
    "customerName": "Senator Kenneth Anyanwu",
    "customerPhone": "+234 802 778 9911",
    "customerEmail": "senator.anyanwu@nass.gov.ng",
    "deliveryAddress": "8 Mississippi Street, Maitama, Abuja FCT",
    "deliveryArea": "Municipal, Abuja FCT",
    "notes": "Senator Kenneth's bespoke Senator suit is finished; hand-stitched cuffs and pocket welts done. About to enter Quality Check.",
    "status": "Finishing",
    "isAtRisk": false,
    "isLate": false,
    "createdAt": "2026-10-30T09:15:00.000Z",
    "guaranteedDeliveryDate": "2026-11-06T14:00:00.000Z",
    "assignedTailorId": "tl-05",
    "assignedTailorName": "Biodun Ojo",
    "paymentStatus": "deposit_paid",
    "paymentTier": "deposit_60",
    "totalAmount": 90000,
    "depositAmount": 54000,
    "balanceAmount": 36000,
    "items": [
      {
        "designId": "des-senator-01",
        "designName": "Classic Senator 2-Piece",
        "fabricId": "fab-cashmere-navy",
        "fabricName": "Super 140s Cashmere Wool (320 GSM)",
        "colorName": "Atelier Midnight",
        "colorHex": "#0B1528",
        "quantity": 1,
        "unitPrice": 90000,
        "measurementMethod": "saved_profile",
        "measurements": {
          "unit": "in",
          "chest": 44,
          "shoulder": 19.5,
          "sleeveLength": 26.5,
          "neck": 17,
          "waist": 37.5,
          "trouserLength": 42,
          "hips": 44.5,
          "bicep": 16
        }
      }
    ],
    "history": [
      {
        "stage": "Received",
        "timestamp": "30 Oct, 10:15",
        "note": "Order placed online with 60% deposit.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Confirmed",
        "timestamp": "31 Oct, 11:00",
        "note": "Assigned to Bench 5. Midnight navy wool allocated.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Cutting",
        "timestamp": "1 Nov, 12:30",
        "note": "Pattern cut with comfort chest drape.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Sewing",
        "timestamp": "2 Nov, 15:00",
        "note": "Canvas basted, side seams reinforced.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Finishing",
        "timestamp": "3 Nov, 16:30",
        "note": "Finishing completed: blind-stitched hem, thread ends singed. Scheduled for Master QA Review.",
        "actorName": "Master Atelier"
      }
    ]
  },
  {
    "id": "#PS-8380",
    "customerName": "Kelechi Amadi",
    "customerPhone": "+234 818 554 1120",
    "customerEmail": "k.amadi@fintechhub.africa",
    "deliveryAddress": "Aba-Owerri Road, opposite Abia State Polytechnic, Aba",
    "deliveryArea": "Aba North, Abia",
    "notes": "Sewing in progress: main seams stitched with German Serafil core yarn.",
    "status": "Sewing",
    "isAtRisk": false,
    "isLate": false,
    "createdAt": "2026-10-31T11:00:00.000Z",
    "guaranteedDeliveryDate": "2026-11-07T14:00:00.000Z",
    "assignedTailorId": "tl-04",
    "assignedTailorName": "Chisom Eze",
    "paymentStatus": "deposit_paid",
    "paymentTier": "deposit_60",
    "totalAmount": 68000,
    "depositAmount": 40800,
    "balanceAmount": 27200,
    "items": [
      {
        "designId": "des-kaftan-02",
        "designName": "Contemporary Minimalist Kaftan",
        "fabricId": "fab-linen-green",
        "fabricName": "Irish Pure Linen (260 GSM)",
        "colorName": "Forest Sovereign",
        "colorHex": "#0A5C36",
        "quantity": 1,
        "unitPrice": 68000,
        "measurementMethod": "saved_profile",
        "measurements": {
          "unit": "in",
          "chest": 40,
          "shoulder": 18,
          "sleeveLength": 25,
          "neck": 15.5,
          "waist": 32,
          "trouserLength": 40,
          "hips": 39,
          "bicep": 14
        }
      }
    ],
    "history": [
      {
        "stage": "Received",
        "timestamp": "31 Oct, 12:00",
        "note": "Order confirmed online. 60% deposit paid.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Confirmed",
        "timestamp": "1 Nov, 10:00",
        "note": "Bench 4 assigned. Green Irish linen inspected.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Cutting",
        "timestamp": "2 Nov, 13:00",
        "note": "Cut with minimal seam footprint.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Sewing",
        "timestamp": "3 Nov, 12:00",
        "note": "Currently sewing: main seams assembled, collar attaching.",
        "actorName": "Master Atelier"
      }
    ]
  },
  {
    "id": "#PS-8430",
    "customerName": "Somtochukwu Eze",
    "customerPhone": "+234 703 678 9012",
    "customerEmail": "somto.eze@genesisconsult.com",
    "deliveryAddress": "32 Faulks Road, Commercial Hub, Aba, Abia State",
    "deliveryArea": "Aba South, Abia",
    "notes": "Fabric allocated from Aba vault; chalking cutting lines.",
    "status": "Cutting",
    "isAtRisk": false,
    "isLate": false,
    "createdAt": "2026-11-01T15:30:00.000Z",
    "guaranteedDeliveryDate": "2026-11-09T14:00:00.000Z",
    "assignedTailorId": "tl-02",
    "assignedTailorName": "Ifeanyi Okafor",
    "paymentStatus": "deposit_paid",
    "paymentTier": "deposit_60",
    "totalAmount": 72000,
    "depositAmount": 43200,
    "balanceAmount": 28800,
    "items": [
      {
        "designId": "des-kaftan-01",
        "designName": "Sovereign Kaftan",
        "fabricId": "fab-wool-black",
        "fabricName": "Italian Lightweight Wool (280 GSM)",
        "colorName": "Charcoal Onyx",
        "colorHex": "#2B2D42",
        "quantity": 1,
        "unitPrice": 72000,
        "measurementMethod": "saved_profile",
        "measurements": {
          "unit": "in",
          "chest": 42,
          "shoulder": 18.5,
          "sleeveLength": 26,
          "neck": 16,
          "waist": 35,
          "trouserLength": 41,
          "hips": 42,
          "bicep": 15
        }
      }
    ],
    "history": [
      {
        "stage": "Received",
        "timestamp": "1 Nov, 16:30",
        "note": "Order placed via website. ₦43,200 deposit confirmed.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Confirmed",
        "timestamp": "2 Nov, 11:00",
        "note": "Order specifications locked by operations admin.",
        "actorName": "Master Atelier"
      },
      {
        "stage": "Cutting",
        "timestamp": "3 Nov, 12:00",
        "note": "Currently on cutting table: drafting paper pattern and precision shears alignment.",
        "actorName": "Master Atelier"
      }
    ]
  },
  {
    "id": "#PS-8455",
    "customerName": "Ifeoma Favour",
    "customerPhone": "+234 814 620 9183",
    "customerEmail": "ifeoma.favour@gmail.com",
    "deliveryAddress": "7 Brass Street, off Aba-Owerri Road, Aba, Abia State",
    "deliveryArea": "Aba North, Abia",
    "notes": "Order received today. Bespoke tailored female Senator kaftan. 60% deposit paid. Entering cutting preparation.",
    "status": "Received",
    "isAtRisk": false,
    "isLate": false,
    "createdAt": "2026-11-03T18:30:00.000Z",
    "guaranteedDeliveryDate": "2026-11-10T14:00:00.000Z",
    "assignedTailorId": "tl-04",
    "assignedTailorName": "Chisom Eze",
    "paymentStatus": "deposit_paid",
    "paymentTier": "deposit_60",
    "totalAmount": 75000,
    "depositAmount": 45000,
    "balanceAmount": 30000,
    "items": [
      {
        "designId": "des-kaftan-01",
        "designName": "Sovereign Kaftan Suit",
        "fabricId": "fab-cashmere-navy",
        "fabricName": "Super 140s Cashmere Wool (320 GSM)",
        "colorName": "Emerald Royal",
        "colorHex": "#0A5C36",
        "quantity": 1,
        "unitPrice": 75000,
        "measurementMethod": "saved_profile",
        "measurements": {
          "unit": "in",
          "chest": 38,
          "shoulder": 16.5,
          "sleeveLength": 24.5,
          "neck": 15,
          "waist": 30,
          "trouserLength": 40,
          "hips": 41,
          "bicep": 13.5
        }
      }
    ],
    "history": [
      {
        "stage": "Received",
        "timestamp": "3 Nov, 19:30",
        "note": "Order placed online via bespoke catalogue. ₦45,000 commitment deposit verified. Pattern drafting queue entry logged.",
        "actorName": "Master Atelier"
      }
    ]
  }
];

export const INITIAL_BOOKINGS: MeasurementBooking[] = [
  {
    id: "#MB-201",
    customerName: "Dr. Chinedu Nwankwo",
    customerPhone: "+234 803 234 5678",
    venueType: "home",
    address: "14 Georges Street, off Factory Road, Aba",
    area: "Aba Central",
    date: "2026-11-03",
    timeSlot: "11:00 AM - 12:30 PM",
    sessionFee: 0,
    status: "completed",
    measurerId: "ms-01",
    measurerName: "Folake Davies",
    measurerPhone: "+234 803 910 4421",
    notes: "Doorstep fitting completed. Measurements confirmed and linked to client profile.",
    recordedMeasurements: {
      unit: "in",
      chest: 42.5,
      shoulder: 19.0,
      sleeveLength: 26.0,
      neck: 16.5,
      waist: 36.0,
      trouserLength: 41.5,
      hips: 43.0,
      bicep: 15.0,
    },
  },
  {
    id: "#MB-202",
    customerName: "Chief Emeka Adeleke",
    customerPhone: "+234 812 987 6543",
    venueType: "office",
    address: "Plot 12B Admiralty Way, Lekki Phase 1, Lagos",
    area: "Lekki Phase 1",
    date: "2026-11-03",
    timeSlot: "03:00 PM - 04:30 PM",
    sessionFee: 5000,
    status: "scheduled",
    measurerId: "ms-02",
    measurerName: "Emeka Nnamdi",
    measurerPhone: "+234 802 110 5588",
    notes: "Corporate executive measurement appointment for wedding suite commission.",
  },
  {
    id: "#MB-203",
    customerName: "Mrs. Amaka Johnson-Umeh",
    customerPhone: "+234 705 456 7890",
    venueType: "home",
    address: "8 Gana Street, Maitama, Abuja FCT",
    area: "Maitama",
    date: "2026-11-04",
    timeSlot: "10:00 AM - 11:30 AM",
    sessionFee: 5000,
    status: "scheduled",
    measurerId: "ms-03",
    measurerName: "Amina Bello",
    measurerPhone: "+234 703 440 2211",
    notes: "Family festive measurement session (Aso Ebi group booking prep).",
  },
];

export const INITIAL_BULK_REQUESTS: BulkOrderRequest[] = [];

/**
 * Live delivery date calculation engine based on atelier capacity and design lead days.
 * The promise: "Your outfit, ready on the day you need it."
 */
export function calculateGuaranteedDelivery(
  leadDays: number,
  baseDate: Date = new Date(),
  isExpress: boolean = false
): { deliveryDate: Date; dateFormatted: string; daysCount: number } {
  const adjustedLead = isExpress ? Math.max(3, Math.ceil(leadDays * 0.6)) : leadDays;
  const result = new Date(baseDate);

  // Skip Sundays as atelier rest day
  let daysAdded = 0;
  while (daysAdded < adjustedLead) {
    result.setDate(result.getDate() + 1);
    if (result.getDay() !== 0) {
      daysAdded++;
    }
  }

  // Set guaranteed hour to 2:00 PM WAT
  result.setHours(14, 0, 0, 0);

  const dateFormatted = result.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return {
    deliveryDate: result,
    dateFormatted,
    daysCount: adjustedLead,
  };
}

export const INITIAL_MEDIA_ASSETS: MediaAsset[] = [
  // Section 1: Garment Silhouettes (3:4 Ratio)
  {
    id: "des-kaftan",
    name: "Architectural Royal Kaftan",
    category: "garments",
    aspectRatio: "3/4",
    dimensions: "1200 × 1600 px",
    url: "/images/designs/kaftan.svg",
    alt: "Full-length portrait of a Nigerian gentleman wearing an Architectural Royal Grand Kaftan in ivory Guinea brocade with intricate geometric neckline embroidery and side vents.",
    defaultUrl: "/images/designs/kaftan.svg",
    defaultAlt: "Full-length portrait of a Nigerian gentleman wearing an Architectural Royal Grand Kaftan in ivory Guinea brocade with intricate geometric neckline embroidery and side vents.",
    notes: "Hero garment on Home and Designs pages. Displays Guinea brocade texture and geometric embroidery.",
  },
  {
    id: "des-agbada",
    name: "Ceremonial Isiagu Native Set",
    category: "garments",
    aspectRatio: "3/4",
    dimensions: "1200 × 1600 px",
    url: "/images/designs/agbada.svg",
    alt: "Eastern Nigerian ceremonial Isiagu native set in deep indigo Adire damask with matching trousers, showing architectural shoulder draping and crisp basting folds.",
    defaultUrl: "/images/designs/agbada.svg",
    defaultAlt: "Eastern Nigerian ceremonial Isiagu native set in deep indigo Adire damask with matching trousers, showing architectural shoulder draping and crisp basting folds.",
    notes: "Eastern Nigerian ceremonial masterwork. Highlights sovereign gold embroidery motif and matching native trousers.",
  },
  {
    id: "des-senator",
    name: "Executive Senator Suit",
    category: "garments",
    aspectRatio: "3/4",
    dimensions: "1200 × 1600 px",
    url: "/images/designs/senator.svg",
    alt: "Modern Executive Senator Suit in Atelier Midnight navy Italian wool-cashmere blend, featuring a structured mandarin band collar, concealed button placket, and tailored trousers.",
    defaultUrl: "/images/designs/senator.svg",
    defaultAlt: "Modern Executive Senator Suit in Atelier Midnight navy Italian wool-cashmere blend, featuring a structured mandarin band collar, concealed button placket, and tailored trousers.",
    notes: "The professional Nigerian standard. Sharp mandarin collar and concealed placket.",
  },
  {
    id: "des-suit",
    name: "Safari Native Two-Piece Set",
    category: "garments",
    aspectRatio: "3/4",
    dimensions: "1200 × 1600 px",
    url: "/images/designs/suit.svg",
    alt: "Safari native two-piece set in charcoal Italian wool-cashmere with pick-stitched lapels, horn buttons, and precise trouser break.",
    defaultUrl: "/images/designs/suit.svg",
    defaultAlt: "Safari native two-piece set in charcoal Italian wool-cashmere with pick-stitched lapels, horn buttons, and precise trouser break.",
    notes: "Structured Nigerian four-pocket safari jacket with tailored native trousers cut flush to measurement.",
  },
  {
    id: "des-ankara",
    name: "Architectural Ankara Wrap Dress",
    category: "garments",
    aspectRatio: "3/4",
    dimensions: "1200 × 1600 px",
    url: "/images/designs/ankara-dress.svg",
    alt: "Architectural Ankara wrap dress in authentic geometric gold and navy wax block print, featuring asymmetric fluid drape, bishop sleeves, and reinforced waist sash.",
    defaultUrl: "/images/designs/ankara-dress.svg",
    defaultAlt: "Architectural Ankara wrap dress in authentic geometric gold and navy wax block print, featuring asymmetric fluid drape, bishop sleeves, and reinforced waist sash.",
    notes: "Contemporary tailored womenswear with asymmetric drape and authentic wax block motifs.",
  },
  {
    id: "des-shirt",
    name: "Crisp Cutaway Oxford Shirt",
    category: "garments",
    aspectRatio: "3/4",
    dimensions: "1200 × 1600 px",
    url: "/images/designs/shirt.svg",
    alt: "Crisp cutaway French-cuff corporate shirt tailored from Giza 88 Egyptian pinpoint Oxford cotton in optic white with split yoke and mother-of-pearl buttons.",
    defaultUrl: "/images/designs/shirt.svg",
    defaultAlt: "Crisp cutaway French-cuff corporate shirt tailored from Giza 88 Egyptian pinpoint Oxford cotton in optic white with split yoke and mother-of-pearl buttons.",
    notes: "Executive business shirt showing cutaway collar, French cuffs, and split back yoke.",
  },
  {
    id: "des-asoebi",
    name: "Celebration Aso Ebi Ensemble",
    category: "garments",
    aspectRatio: "3/4",
    dimensions: "1200 × 1600 px",
    url: "/images/designs/aso-ebi.svg",
    alt: "Celebration Aso Ebi ensemble in champagne brass heavy silk crepe and organza, styled for Nigerian wedding ceremonies and coordinated family groups.",
    defaultUrl: "/images/designs/aso-ebi.svg",
    defaultAlt: "Celebration Aso Ebi ensemble in champagne brass heavy silk crepe and organza, styled for Nigerian wedding ceremonies and coordinated family groups.",
    notes: "Bulk and ceremonial coordination. Shows fluid champagne drape and structural sleeves.",
  },
  {
    id: "des-polo",
    name: "Executive Uniform Piqué Polo",
    category: "garments",
    aspectRatio: "3/4",
    dimensions: "1200 × 1600 px",
    url: "/images/designs/polo.svg",
    alt: "Executive uniform piqué polo in corporate navy combed double-piqué cotton with non-curling knit collar and reinforced side vents for corporate teams.",
    defaultUrl: "/images/designs/polo.svg",
    defaultAlt: "Executive uniform piqué polo in corporate navy combed double-piqué cotton with non-curling knit collar and reinforced side vents for corporate teams.",
    notes: "Corporate fleet garment engineered for 50+ industrial laundry wash cycles.",
  },

  // Section 2: Artisans & Measurers (1:1 Square)
  {
    id: "tl-01",
    name: "Master Tunde Adeleke (Head Cutter)",
    category: "artisans",
    aspectRatio: "1/1",
    dimensions: "600 × 600 px",
    url: "/images/tailors/tl-tunde.svg",
    alt: "Close-up portrait of Master Tailor Tunde Adeleke at his cutting bench in the Aba Factory Road atelier with brass tailoring shears and measuring tape",
    defaultUrl: "/images/tailors/tl-tunde.svg",
    defaultAlt: "Close-up portrait of Master Tailor Tunde Adeleke at his cutting bench in the Aba Factory Road atelier with brass tailoring shears and measuring tape",
    notes: "Factory Road, Aba Atelier. Bespoke Suiting & Agbada Architecture specialist.",
  },
  {
    id: "tl-02",
    name: "Chidi Okafor (Pattern Drafter)",
    category: "artisans",
    aspectRatio: "1/1",
    dimensions: "600 × 600 px",
    url: "/images/tailors/tl-chidi.svg",
    alt: "Portrait of Master Pattern Drafter Chidi Okafor drafting geometric paper patterns at the Ariaria bench in Aba",
    defaultUrl: "/images/tailors/tl-chidi.svg",
    defaultAlt: "Portrait of Master Pattern Drafter Chidi Okafor drafting geometric paper patterns at the Ariaria bench in Aba",
    notes: "Ariaria Artisan Cluster, Aba. Senator Cuts & geometric draft specialist.",
  },
  {
    id: "tl-03",
    name: "Amina Bello (Senior Embroidery Artisan)",
    category: "artisans",
    aspectRatio: "1/1",
    dimensions: "600 × 600 px",
    url: "/images/tailors/tl-amina.svg",
    alt: "Portrait of Senior Embroidery Artisan Amina Bello examining delicate hand embroidery threads at Eziukwu studio in Aba",
    defaultUrl: "/images/tailors/tl-amina.svg",
    defaultAlt: "Portrait of Senior Embroidery Artisan Amina Bello examining delicate hand embroidery threads at Eziukwu studio in Aba",
    notes: "Eziukwu Heritage Studio, Aba. Hand embroidery & structural womenswear specialist.",
  },
  {
    id: "tl-04",
    name: "Femi Balogun (Basting Specialist)",
    category: "artisans",
    aspectRatio: "1/1",
    dimensions: "600 × 600 px",
    url: "/images/tailors/tl-femi.svg",
    alt: "Portrait of Master Tailor Femi Balogun overseeing basting seam assembly at Umungasi industrial bench in Aba",
    defaultUrl: "/images/tailors/tl-femi.svg",
    defaultAlt: "Portrait of Master Tailor Femi Balogun overseeing basting seam assembly at Umungasi industrial bench in Aba",
    notes: "Umungasi Industrial Bench, Aba. Traditional kaftans and basting assembly specialist.",
  },
  {
    id: "tl-05",
    name: "Segun Ogundimu (Finishing Inspector)",
    category: "artisans",
    aspectRatio: "1/1",
    dimensions: "600 × 600 px",
    url: "/images/tailors/tl-segun.svg",
    alt: "Portrait of Finishing Inspector Segun Ogundimu conducting 14-point quality inspection at Brass Junction atelier in Aba",
    defaultUrl: "/images/tailors/tl-segun.svg",
    defaultAlt: "Portrait of Finishing Inspector Segun Ogundimu conducting 14-point quality inspection at Brass Junction atelier in Aba",
    notes: "Brass Junction Express Unit, Aba. 14-point tolerance inspection lead.",
  },
  {
    id: "ms-01",
    name: "Folake Davies (Certified Measurer)",
    category: "artisans",
    aspectRatio: "1/1",
    dimensions: "600 × 600 px",
    url: "/images/measurers/ms-folake.svg",
    alt: "Portrait of Certified Doorstep Measurer Folake Davies with laser measuring rule and fabric samples in the South East",
    defaultUrl: "/images/measurers/ms-folake.svg",
    defaultAlt: "Portrait of Certified Doorstep Measurer Folake Davies with laser measuring rule and fabric samples in the South East",
    notes: "Doorstep fitter serving Aba, Umuahia, and Owerri metropolitan zones.",
  },
  {
    id: "ms-02",
    name: "Kunle Williams (Doorstep Master Fitter)",
    category: "artisans",
    aspectRatio: "1/1",
    dimensions: "600 × 600 px",
    url: "/images/measurers/ms-kunle.svg",
    alt: "Portrait of Doorstep Master Fitter Kunle Williams on client fitting appointment in Port Harcourt",
    defaultUrl: "/images/measurers/ms-kunle.svg",
    defaultAlt: "Portrait of Doorstep Master Fitter Kunle Williams on client fitting appointment in Port Harcourt",
    notes: "Field measurer serving Port Harcourt and Enugu corridors.",
  },
  {
    id: "ms-03",
    name: "Zainab Alabi (Mobile Field Fitter)",
    category: "artisans",
    aspectRatio: "1/1",
    dimensions: "600 × 600 px",
    url: "/images/measurers/ms-zainab.svg",
    alt: "Portrait of Mobile Fitter Zainab Alabi holding cloth measuring tape on doorstep fitting in Lagos",
    defaultUrl: "/images/measurers/ms-zainab.svg",
    defaultAlt: "Portrait of Mobile Fitter Zainab Alabi holding cloth measuring tape on doorstep fitting in Lagos",
    notes: "Western hub mobile fitter serving Lagos corporate and VIP client fittings.",
  },

  // Section 3: Fabric Swatches & Textures (1:1 Square)
  {
    id: "fab-brocade-guinea",
    name: "Imperial Guinea Brocade (280 GSM)",
    category: "fabrics",
    aspectRatio: "1/1",
    dimensions: "400 × 400 px",
    url: "/images/swatches/guinea-brocade.svg",
    alt: "Macro photograph of Imperial Guinea Brocade showing lustrous white jacquard geometric weave with crisp starch finish",
    defaultUrl: "/images/swatches/guinea-brocade.svg",
    defaultAlt: "Macro photograph of Imperial Guinea Brocade showing lustrous white jacquard geometric weave with crisp starch finish",
    notes: "100% combed cotton with jacquard lustre weave and stiff architectural body.",
  },
  {
    id: "fab-atiku-cotton",
    name: "Super Atiku Cotton (240 GSM)",
    category: "fabrics",
    aspectRatio: "1/1",
    dimensions: "400 × 400 px",
    url: "/images/swatches/atiku-cotton.svg",
    alt: "Close-up of Super Atiku cotton fabric in chalk white showing diagonal twill texture and breathable lightweight drape",
    defaultUrl: "/images/swatches/atiku-cotton.svg",
    defaultAlt: "Close-up of Super Atiku cotton fabric in chalk white showing diagonal twill texture and breathable lightweight drape",
    notes: "Breathable tropical twill weave offering superior outdoor drape in humid climates.",
  },
  {
    id: "fab-raw-silk",
    name: "Lustrous Raw Silk Blend (310 GSM)",
    category: "fabrics",
    aspectRatio: "1/1",
    dimensions: "400 × 400 px",
    url: "/images/swatches/raw-silk.svg",
    alt: "Textural macro of raw silk blend fabric in brass gold showing natural organic slub threads and subtle sheen",
    defaultUrl: "/images/swatches/raw-silk.svg",
    defaultAlt: "Textural macro of raw silk blend fabric in brass gold showing natural organic slub threads and subtle sheen",
    notes: "Textured slub weave with subtle sheen and firm body for celebratory evening wear.",
  },
  {
    id: "fab-adire-damask",
    name: "Artisan Adire Hand-Dyed Damask (340 GSM)",
    category: "fabrics",
    aspectRatio: "1/1",
    dimensions: "400 × 400 px",
    url: "/images/swatches/adire-damask.svg",
    alt: "Macro shot of hand-dyed Adire damask in 16-dip indigo navy showing traditional resist dye patterns and water-repellent sheen",
    defaultUrl: "/images/swatches/adire-damask.svg",
    defaultAlt: "Macro shot of hand-dyed Adire damask in 16-dip indigo navy showing traditional resist dye patterns and water-repellent sheen",
    notes: "Traditional 16-dip Abeokuta indigo damask with crisp water-repellent pressing.",
  },
  {
    id: "fab-super-wool",
    name: "Super 140s Suiting Wool (300 GSM)",
    category: "fabrics",
    aspectRatio: "1/1",
    dimensions: "400 × 400 px",
    url: "/images/swatches/super-wool.svg",
    alt: "Close-up of Super 140s worsted suiting wool in charcoal black showing crisp crease-resistant twill weave",
    defaultUrl: "/images/swatches/super-wool.svg",
    defaultAlt: "Close-up of Super 140s worsted suiting wool in charcoal black showing crisp crease-resistant twill weave",
    notes: "Worsted twill suiting wool with smooth yarn clarity and zero creasing memory.",
  },
  {
    id: "fab-cashmere-blend",
    name: "Italian Wool-Cashmere (290 GSM)",
    category: "fabrics",
    aspectRatio: "1/1",
    dimensions: "400 × 400 px",
    url: "/images/swatches/cashmere-blend.svg",
    alt: "Macro texture of Italian wool-cashmere blend in midnight navy showing microscopic herringbone chevron pattern",
    defaultUrl: "/images/swatches/cashmere-blend.svg",
    defaultAlt: "Macro texture of Italian wool-cashmere blend in midnight navy showing microscopic herringbone chevron pattern",
    notes: "Velvety brushed cashmere hand feel with micro-herringbone chevrons.",
  },
  {
    id: "fab-wax-block",
    name: "Authenticated Holland Wax Block (220 GSM)",
    category: "fabrics",
    aspectRatio: "1/1",
    dimensions: "400 × 400 px",
    url: "/images/swatches/wax-block.svg",
    alt: "Macro view of authentic geometric Holland wax block print showing sharp two-sided crackle resist and colorfast pigment",
    defaultUrl: "/images/swatches/wax-block.svg",
    defaultAlt: "Macro view of authentic geometric Holland wax block print showing sharp two-sided crackle resist and colorfast pigment",
    notes: "Calico plain weave with two-sided wax resist crackle and sun-proof colorfast pigments.",
  },
  {
    id: "fab-egyptian-oxford",
    name: "Giza 88 Pinpoint Oxford (175 GSM)",
    category: "fabrics",
    aspectRatio: "1/1",
    dimensions: "400 × 400 px",
    url: "/images/swatches/giza-oxford.svg",
    alt: "Macro texture of Giza 88 Egyptian pinpoint Oxford cotton showing basketweave grain and silky surface sheen",
    defaultUrl: "/images/swatches/giza-oxford.svg",
    defaultAlt: "Macro texture of Giza 88 Egyptian pinpoint Oxford cotton showing basketweave grain and silky surface sheen",
    notes: "2-ply pinpoint Oxford weave in optic white with silky finish and high tensile durability.",
  },

  // Section 4: 9-Stage Atelier Production Milestones (16:9 Landscape)
  {
    id: "stage-01",
    name: "Stage 01 - Received",
    category: "stages",
    aspectRatio: "16/9",
    dimensions: "1600 × 900 px",
    url: "/images/stages/stage-01-received.svg",
    alt: "Digital order ticket logging into the Aba atelier production intake queue with verified customer specifications",
    defaultUrl: "/images/stages/stage-01-received.svg",
    defaultAlt: "Digital order ticket logging into the Aba atelier production intake queue with verified customer specifications",
    notes: "Order docket logging into the Aba intake bench queue.",
  },
  {
    id: "stage-02",
    name: "Stage 02 - Confirmed",
    category: "stages",
    aspectRatio: "16/9",
    dimensions: "1600 × 900 px",
    url: "/images/stages/stage-02-confirmed.svg",
    alt: "Master cutter checking anatomic proportions with brass calipers against customer measurement set",
    defaultUrl: "/images/stages/stage-02-confirmed.svg",
    defaultAlt: "Master cutter checking anatomic proportions with brass calipers against customer measurement set",
    notes: "Anatomic proportions checked with master cutter calipers; delivery clock starts.",
  },
  {
    id: "stage-03",
    name: "Stage 03 - Cutting",
    category: "stages",
    aspectRatio: "16/9",
    dimensions: "1600 × 900 px",
    url: "/images/stages/stage-03-cutting.svg",
    alt: "Heavy brass tailoring shears shearing through starched Guinea brocade along drafted chalk lines on wooden cutting table",
    defaultUrl: "/images/stages/stage-03-cutting.svg",
    defaultAlt: "Heavy brass tailoring shears shearing through starched Guinea brocade along drafted chalk lines on wooden cutting table",
    notes: "Shears precision cutting drafted garment panels along grainlines.",
  },
  {
    id: "stage-04",
    name: "Stage 04 - Sewing",
    category: "stages",
    aspectRatio: "16/9",
    dimensions: "1600 × 900 px",
    url: "/images/stages/stage-04-sewing.svg",
    alt: "Industrial lockstitch machine operator joining canvas chest piece and front panels with white basting stitches",
    defaultUrl: "/images/stages/stage-04-sewing.svg",
    defaultAlt: "Industrial lockstitch machine operator joining canvas chest piece and front panels with white basting stitches",
    notes: "Walking-foot machine joining front panels and chest basting canvas.",
  },
  {
    id: "stage-05",
    name: "Stage 05 - Finishing",
    category: "stages",
    aspectRatio: "16/9",
    dimensions: "1600 × 900 px",
    url: "/images/stages/stage-05-finishing.svg",
    alt: "Artisan hand-stitching collar band lining and buttonhole thread loops with fine brass thimble",
    defaultUrl: "/images/stages/stage-05-finishing.svg",
    defaultAlt: "Artisan hand-stitching collar band lining and buttonhole thread loops with fine brass thimble",
    notes: "Fine hand needlework for collar band lining, horn buttons, and blind hem finishing.",
  },
  {
    id: "stage-06",
    name: "Stage 06 - Quality check",
    category: "stages",
    aspectRatio: "16/9",
    dimensions: "1600 × 900 px",
    url: "/images/stages/stage-06-qc.svg",
    alt: "Senior inspector applying steel measuring ruler against finished garment seam tolerances during 14-point audit",
    defaultUrl: "/images/stages/stage-06-qc.svg",
    defaultAlt: "Senior inspector applying steel measuring ruler against finished garment seam tolerances during 14-point audit",
    notes: "14-point millimeter tolerance inspection against initial recorded measurements.",
  },
  {
    id: "stage-07",
    name: "Stage 07 - Ready",
    category: "stages",
    aspectRatio: "16/9",
    dimensions: "1600 × 900 px",
    url: "/images/stages/stage-07-ready.svg",
    alt: "Completed bespoke kaftan hand-steamed and encased in breathable zippered PrimeStitch garment bag",
    defaultUrl: "/images/stages/stage-07-ready.svg",
    defaultAlt: "Completed bespoke kaftan hand-steamed and encased in breathable zippered PrimeStitch garment bag",
    notes: "Hand-steamed under heavy iron press and encased in breathable garment travel bag.",
  },
  {
    id: "stage-08",
    name: "Stage 08 - Dispatched",
    category: "stages",
    aspectRatio: "16/9",
    dimensions: "1600 × 900 px",
    url: "/images/stages/stage-08-dispatched.svg",
    alt: "Protective travel garment box being handed to priority logistics rider with guaranteed delivery tracking seal",
    defaultUrl: "/images/stages/stage-08-dispatched.svg",
    defaultAlt: "Protective travel garment box being handed to priority logistics rider with guaranteed delivery tracking seal",
    notes: "Handed to priority interstate courier rider with locked delivery tracking seal.",
  },
  {
    id: "stage-09",
    name: "Stage 09 - Delivered",
    category: "stages",
    aspectRatio: "16/9",
    dimensions: "1600 × 900 px",
    url: "/images/stages/stage-09-delivered.svg",
    alt: "Customer receiving unboxed bespoke outfit in pristine condition at their doorstep within SLA deadline",
    defaultUrl: "/images/stages/stage-09-delivered.svg",
    defaultAlt: "Customer receiving unboxed bespoke outfit in pristine condition at their doorstep within SLA deadline",
    notes: "Customer doorstep delivery verified within locked SLA deadline.",
  },

  // Section 5: Posture Verification (3:4 Ratio)
  {
    id: "posture-front",
    name: "Front Stance Reference Slot",
    category: "posture",
    aspectRatio: "3/4",
    dimensions: "900 × 1200 px",
    url: "/images/posture/posture-front.svg",
    alt: "Front vertical stance posture reference photograph showing shoulder slope and chest line for cutter pattern adjustments",
    defaultUrl: "/images/posture/posture-front.svg",
    defaultAlt: "Front vertical stance posture reference photograph showing shoulder slope and chest line for cutter pattern adjustments",
    notes: "Laser guide overlay verifying shoulder level, chest horizontal, and natural waistline balance.",
  },
  {
    id: "posture-side",
    name: "Side Profile Reference Slot",
    category: "posture",
    aspectRatio: "3/4",
    dimensions: "900 × 1200 px",
    url: "/images/posture/posture-side.svg",
    alt: "Side profile posture reference photograph showing spine curvature and armhang angle for sleeve draft",
    defaultUrl: "/images/posture/posture-side.svg",
    defaultAlt: "Side profile posture reference photograph showing spine curvature and armhang angle for sleeve draft",
    notes: "90-degree side profile guide showing spinal curvature, head carriage, and armhang angle.",
  },
];

