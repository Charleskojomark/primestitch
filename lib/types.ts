export type Stage =
  | "Received"
  | "Confirmed"
  | "Cutting"
  | "Sewing"
  | "Finishing"
  | "Quality check"
  | "Ready"
  | "Dispatched"
  | "Delivered";

export const STAGES: Stage[] = [
  "Received",
  "Confirmed",
  "Cutting",
  "Sewing",
  "Finishing",
  "Quality check",
  "Ready",
  "Dispatched",
  "Delivered",
];

export interface Fabric {
  id: string;
  name: string;
  gsm: number;
  weave: string;
  description: string;
  priceModifier: number; // in Naira added to base
  colors: string[];
  swatchImage?: string;
  swatchAlt?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  category: "garments" | "artisans" | "fabrics" | "stages" | "posture";
  aspectRatio: "3/4" | "1/1" | "16/9" | "4/3";
  dimensions: string;
  url: string;
  alt: string;
  notes?: string;
  defaultUrl: string;
  defaultAlt: string;
}

export interface Design {
  id: string;
  slug: string;
  name: string;
  category: "Traditional" | "Formal" | "Contemporary" | "Corporate" | "Events";
  startingPrice: number;
  description: string;
  heroImage: string;
  imageAlt?: string;
  imageDimensions?: string;
  fabrics: Fabric[];
  availableColors: { name: string; hex: string }[];
  standardLeadDays: number;
  featured?: boolean;
}

export interface MeasurementSet {
  unit: "in" | "cm";
  chest?: number;
  shoulder?: number;
  sleeveLength?: number;
  neck?: number;
  waist?: number;
  trouserLength?: number;
  thigh?: number;
  hips?: number;
  bicep?: number;
  wrist?: number;
  notes?: string;
  recordedAt?: string;
  verifiedBy?: string;
}

export interface Tailor {
  id: string;
  name: string;
  area: string; // Atelier bench or regional cluster
  specialty: string;
  currentWorkload: number; // count of active garments
  maxCapacity: number;
  avatar: string;
  avatarAlt?: string;
  avatarDimensions?: string;
  rating: number;
  phone: string;
}

export interface Measurer {
  id: string;
  name: string;
  area: string; // Field coverage regions
  avatar: string;
  avatarAlt?: string;
  avatarDimensions?: string;
  phone: string;
  rating: number;
  activeToday: boolean;
}

export interface OrderHistoryEntry {
  stage: Stage;
  timestamp: string;
  note: string;
  actorName: string;
}

export interface OrderItem {
  designId: string;
  designName: string;
  fabricId: string;
  fabricName: string;
  colorName: string;
  colorHex: string;
  quantity: number;
  unitPrice: number;
  measurements?: MeasurementSet;
  measurementMethod: "self" | "booked_measurer" | "saved_profile";
}

export interface Order {
  id: string; // e.g. #PS-8492
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  deliveryArea: string; // e.g. "Ikeja, Lagos"
  eventDate?: string;
  notes?: string;
  referencePhotoUrl?: string;

  items: OrderItem[];
  status: Stage;
  isAtRisk: boolean;
  isLate: boolean;

  createdAt: string;
  confirmedAt?: string;
  guaranteedDeliveryDate: string; // exact calendar date
  assignedTailorId?: string;
  assignedTailorName?: string;

  paymentStatus: "pending" | "deposit_paid" | "fully_paid";
  paymentTier: "deposit_60" | "full_100";
  totalAmount: number;
  depositAmount: number;
  balanceAmount: number;

  history: OrderHistoryEntry[];
}

export interface MeasurementBooking {
  id: string; // e.g. #MB-104
  customerName: string;
  customerPhone: string;
  venueType: "home" | "office" | "event_venue";
  address: string;
  area: string;
  date: string;
  timeSlot: string;
  sessionFee: number; // 0 if order value >= 100k, else 5000
  measurerId?: string;
  measurerName?: string;
  measurerPhone?: string;
  status: "scheduled" | "completed" | "missed" | "cancelled";
  recordedMeasurements?: MeasurementSet;
  notes?: string;
}

export interface BulkRosterItem {
  id: string;
  memberRole: string; // e.g. "Groomsman 1", "Bride's Father", "Branch Manager"
  memberName: string;
  measurementStatus: "pending" | "recorded" | "confirmed";
  sizeNotes?: string;
  measurements?: MeasurementSet;
}

export interface BulkOrderRequest {
  id: string;
  groupName: string; // e.g. "Adewale Wedding Aso Ebi"
  occasion: string;
  targetDeliveryDate: string;
  totalPieces: number;
  designId: string;
  designName: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  location: string;
  roster: BulkRosterItem[];
  bookingRequested: boolean;
  status: "pending_quote" | "quote_sent" | "confirmed";
  createdAt: string;
}

export interface CapacitySchedule {
  dailyGarmentCapacity: number;
  standardTurnaroundDays: number;
  expressAvailable: boolean;
}

