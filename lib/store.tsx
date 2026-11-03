"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Order,
  Design,
  Tailor,
  Measurer,
  MeasurementBooking,
  BulkOrderRequest,
  Stage,
  MeasurementSet,
  OrderItem,
  STAGES,
  MediaAsset,
} from "./types";
import {
  INITIAL_DESIGNS,
  INITIAL_TAILORS,
  INITIAL_MEASURERS,
  INITIAL_ORDERS,
  INITIAL_BOOKINGS,
  INITIAL_BULK_REQUESTS,
  INITIAL_MEDIA_ASSETS,
  calculateGuaranteedDelivery,
} from "./data";

export interface DraftOrderState {
  designId?: string;
  designName?: string;
  fabricId?: string;
  fabricName?: string;
  colorName?: string;
  colorHex?: string;
  quantity: number;
  unitPrice: number;
  measurementMethod: "self" | "booked_measurer" | "saved_profile";
  measurements?: MeasurementSet;
  bookingDetails?: {
    venueType: "home" | "office" | "event_venue";
    address: string;
    area: string;
    date: string;
    timeSlot: string;
  };
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryAddress?: string;
  deliveryArea?: string;
  eventDate?: string;
  notes?: string;
  referencePhotoUrl?: string;
  paymentTier: "deposit_60" | "full_100";
}

export interface CustomerProfileState {
  name: string;
  phone: string;
  email: string;
  savedMeasurements: MeasurementSet;
  lastMeasuredDate: string;
}

interface PrimeStitchContextType {
  orders: Order[];
  designs: Design[];
  tailors: Tailor[];
  measurers: Measurer[];
  bookings: MeasurementBooking[];
  bulkRequests: BulkOrderRequest[];
  customerProfile: {
    name: string;
    phone: string;
    email: string;
    savedMeasurements: MeasurementSet;
    lastMeasuredDate: string; // ISO date string
  };
  draftOrder: DraftOrderState;
  staffRole: "admin" | "tailor" | "measurer" | null;
  activeStaffId: string | null;
  staffEmail: string | null;
  mediaAssets: MediaAsset[];

  // Actions
  updateDraftOrder: (updates: Partial<DraftOrderState>) => void;
  resetDraftOrder: () => void;
  createOrderFromDraft: () => Order;
  updateOrderStatus: (
    orderId: string,
    newStage: Stage,
    note?: string,
    nextTailorId?: string
  ) => void;
  assignTailorToOrder: (orderId: string, tailorId: string) => void;
  createBooking: (booking: Partial<MeasurementBooking>) => MeasurementBooking;
  updateBooking: (id: string, updates: Partial<MeasurementBooking>) => void;
  createBulkRequest: (req: Partial<BulkOrderRequest>) => BulkOrderRequest;
  saveCustomerMeasurements: (measurements: MeasurementSet) => void;
  confirmOrderMeasurements: (orderId: string, measurements: MeasurementSet) => void;
  updateMediaAsset: (id: string, updates: Partial<MediaAsset>) => void;
  resetMediaAsset: (id: string) => void;
  resetAllMediaAssets: () => void;
  addNewDesign: (design: Design) => void;
  addNewDesigns: (designs: Design[]) => void;
  loginStaff: (role: "admin" | "tailor" | "measurer", staffId?: string, email?: string) => void;
  logoutStaff: () => void;
  linkStaffEmail: (role: "admin" | "tailor" | "measurer", staffId: string, email: string) => void;
  updateTailorEmail: (tailorId: string, email: string) => void;
  updateMeasurerEmail: (measurerId: string, email: string) => void;
  resetAllToSeed: () => void;
}

const STORAGE_KEY_ORDERS = "primestitch_orders_v2";
const STORAGE_KEY_BOOKINGS = "primestitch_bookings_v2";
const STORAGE_KEY_BULK = "primestitch_bulk_v2";
const STORAGE_KEY_DRAFT = "primestitch_draft_order_v2";
const STORAGE_KEY_PROFILE = "primestitch_customer_profile_v2";
const STORAGE_KEY_STAFF = "primestitch_staff_session_v2";
const STORAGE_KEY_MEDIA = "primestitch_media_assets_v2";
const STORAGE_KEY_DESIGNS = "primestitch_designs_v2";
const STORAGE_KEY_TAILORS = "primestitch_tailors_v2";
const STORAGE_KEY_MEASURERS = "primestitch_measurers_v2";

const DEFAULT_DRAFT: DraftOrderState = {
  quantity: 1,
  unitPrice: 0,
  measurementMethod: "self",
  paymentTier: "deposit_60",
};

const DEFAULT_PROFILE: CustomerProfileState = {
  name: "",
  phone: "",
  email: "",
  savedMeasurements: {
    unit: "in",
  },
  lastMeasuredDate: "",
};

const PrimeStitchContext = createContext<PrimeStitchContextType | undefined>(undefined);

export function PrimeStitchProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [designs, setDesigns] = useState<Design[]>(INITIAL_DESIGNS);
  const [tailors, setTailors] = useState<Tailor[]>(INITIAL_TAILORS);
  const [measurers, setMeasurers] = useState<Measurer[]>(INITIAL_MEASURERS);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(INITIAL_MEDIA_ASSETS);
  const [bookings, setBookings] = useState<MeasurementBooking[]>(INITIAL_BOOKINGS);
  const [bulkRequests, setBulkRequests] = useState<BulkOrderRequest[]>(INITIAL_BULK_REQUESTS);
  const [customerProfile, setCustomerProfile] = useState<CustomerProfileState>(DEFAULT_PROFILE);
  const [draftOrder, setDraftOrder] = useState<DraftOrderState>(DEFAULT_DRAFT);
  const [staffRole, setStaffRole] = useState<"admin" | "tailor" | "measurer" | null>(null);
  const [activeStaffId, setActiveStaffId] = useState<string | null>(null);
  const [staffEmail, setStaffEmail] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Hydrate from localStorage once mounted
  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
        } else {
          setOrders(INITIAL_ORDERS);
        }
      } else {
        setOrders(INITIAL_ORDERS);
      }

      const storedDesigns = localStorage.getItem(STORAGE_KEY_DESIGNS);
      if (storedDesigns) {
        const parsed = JSON.parse(storedDesigns);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDesigns(parsed);
        } else {
          setDesigns(INITIAL_DESIGNS);
        }
      }

      const storedTailors = localStorage.getItem(STORAGE_KEY_TAILORS);
      if (storedTailors) {
        const parsed = JSON.parse(storedTailors);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTailors(parsed);
        } else {
          setTailors(INITIAL_TAILORS);
        }
      }

      const storedMeasurers = localStorage.getItem(STORAGE_KEY_MEASURERS);
      if (storedMeasurers) {
        const parsed = JSON.parse(storedMeasurers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMeasurers(parsed);
        } else {
          setMeasurers(INITIAL_MEASURERS);
        }
      }

      const storedMedia = localStorage.getItem(STORAGE_KEY_MEDIA);
      if (storedMedia) setMediaAssets(JSON.parse(storedMedia));

      const storedBookings = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (storedBookings) {
        const parsed = JSON.parse(storedBookings);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBookings(parsed);
        } else {
          setBookings(INITIAL_BOOKINGS);
        }
      } else {
        setBookings(INITIAL_BOOKINGS);
      }

      const storedBulk = localStorage.getItem(STORAGE_KEY_BULK);
      if (storedBulk) setBulkRequests(JSON.parse(storedBulk));

      const storedDraft = localStorage.getItem(STORAGE_KEY_DRAFT);
      if (storedDraft) setDraftOrder(JSON.parse(storedDraft));

      const storedProfile = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (storedProfile) setCustomerProfile(JSON.parse(storedProfile));

      const storedStaff = localStorage.getItem(STORAGE_KEY_STAFF);
      if (storedStaff) {
        const staffObj = JSON.parse(storedStaff);
        setStaffRole(staffObj.role);
        setActiveStaffId(staffObj.staffId);
        if (staffObj.email) setStaffEmail(staffObj.email);
      }
    } catch (e) {
      console.warn("Failed to parse localStorage data", e);
    }
    setIsInitialized(true);

    // Fetch live orders and bookings from Neon PostgreSQL cloud database
    fetch("/api/orders")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setOrders(data);
        }
      })
      .catch((err) => console.warn("Failed to sync orders from Neon DB", err));

    fetch("/api/bookings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBookings(data);
        }
      })
      .catch((err) => console.warn("Failed to sync bookings from Neon DB", err));

    fetch("/api/designs")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDesigns((prev) => {
            const existingIds = new Set(data.map((d: any) => d.id));
            const remaining = prev.filter((p) => !existingIds.has(p.id));
            return [...data, ...remaining];
          });
        }
      })
      .catch((err) => console.warn("Failed to sync designs from Neon DB", err));
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {}
  }, [orders, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(mediaAssets));
    } catch (e) {}
  }, [mediaAssets, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY_DESIGNS, JSON.stringify(designs));
    } catch (e) {}
  }, [designs, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY_TAILORS, JSON.stringify(tailors));
    } catch (e) {}
  }, [tailors, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY_MEASURERS, JSON.stringify(measurers));
    } catch (e) {}
  }, [measurers, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch (e) {}
  }, [bookings, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY_BULK, JSON.stringify(bulkRequests));
    } catch (e) {}
  }, [bulkRequests, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(draftOrder));
    } catch (e) {}
  }, [draftOrder, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(customerProfile));
    } catch (e) {}
  }, [customerProfile, isInitialized]);

  const updateDraftOrder = (updates: Partial<DraftOrderState>) => {
    setDraftOrder((prev) => ({ ...prev, ...updates }));
  };

  const resetDraftOrder = () => {
    setDraftOrder(DEFAULT_DRAFT);
  };

  const createOrderFromDraft = (): Order => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `#PS-${orderNum}`;
    const qty = draftOrder.quantity || 1;
    const itemTotal = (draftOrder.unitPrice || 65000) * qty;

    const depositAmount =
      draftOrder.paymentTier === "deposit_60"
        ? Math.round(itemTotal * 0.6)
        : itemTotal;
    const balanceAmount = itemTotal - depositAmount;

    // Delivery calculation
    const calc = calculateGuaranteedDelivery(7);

    const newOrder: Order = {
      id: newId,
      customerName: draftOrder.customerName || customerProfile.name,
      customerPhone: draftOrder.customerPhone || customerProfile.phone,
      customerEmail: draftOrder.customerEmail || customerProfile.email,
      deliveryAddress: draftOrder.deliveryAddress || "Doorstep Address, Nigeria",
      deliveryArea: draftOrder.deliveryArea || "Nationwide Delivery",
      eventDate: draftOrder.eventDate,
      notes: draftOrder.notes,
      referencePhotoUrl: draftOrder.referencePhotoUrl,
      items: [
        {
          designId: draftOrder.designId || "des-senator",
          designName: draftOrder.designName || "Executive Senator Suit",
          fabricId: draftOrder.fabricId || "fab-cashmere-blend",
          fabricName: draftOrder.fabricName || "Italian Wool-Cashmere",
          colorName: draftOrder.colorName || "Atelier Midnight",
          colorHex: draftOrder.colorHex || "#0B1528",
          quantity: qty,
          unitPrice: draftOrder.unitPrice || 65000,
          measurementMethod: draftOrder.measurementMethod || "self",
          measurements: draftOrder.measurements,
        },
      ],
      // If customer chose booked_measurer, order starts as "Received" awaiting measurement visit.
      // If self or saved, it starts as "Confirmed" right away!
      status: draftOrder.measurementMethod === "booked_measurer" ? "Received" : "Confirmed",
      isAtRisk: false,
      isLate: false,
      createdAt: new Date().toISOString(),
      confirmedAt: draftOrder.measurementMethod === "booked_measurer" ? undefined : new Date().toISOString(),
      guaranteedDeliveryDate: calc.deliveryDate.toISOString(),
      assignedTailorId: "tl-01",
      assignedTailorName: "Master Tunde Adeleke",
      paymentStatus: draftOrder.paymentTier === "full_100" ? "fully_paid" : "deposit_paid",
      paymentTier: draftOrder.paymentTier,
      totalAmount: itemTotal,
      depositAmount,
      balanceAmount,
      history: [
        {
          stage: "Received",
          timestamp: "Just now",
          note: `Order placed online with ${draftOrder.paymentTier === "deposit_60" ? "60% deposit" : "100% full payment"}.`,
          actorName: "Customer via App",
        },
        ...(draftOrder.measurementMethod !== "booked_measurer"
          ? [
              {
                stage: "Confirmed" as Stage,
                timestamp: "Just now",
                note: "Measurements verified against body proportion limits. Delivery clock locked.",
                actorName: "System Automated Check",
              },
            ]
          : []),
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Persist to Neon PostgreSQL cloud database
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    }).catch((err) => console.warn("Failed to persist order to Neon DB", err));

    // If booked measurer was chosen, also create a booking automatically!
    if (draftOrder.measurementMethod === "booked_measurer" && draftOrder.bookingDetails) {
      createBooking({
        customerName: newOrder.customerName,
        customerPhone: newOrder.customerPhone,
        venueType: draftOrder.bookingDetails.venueType,
        address: draftOrder.bookingDetails.address,
        area: draftOrder.bookingDetails.area,
        date: draftOrder.bookingDetails.date,
        timeSlot: draftOrder.bookingDetails.timeSlot,
        sessionFee: itemTotal >= 100000 ? 0 : 5000,
        notes: `Measurement booking for Order ${newId} (${newOrder.items[0].designName})`,
      });
    }

    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    newStage: Stage,
    note?: string,
    nextTailorId?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;

        const currentStageIndex = STAGES.indexOf(ord.status);
        const newStageIndex = STAGES.indexOf(newStage);

        let tailorName = ord.assignedTailorName;
        let tailorId = ord.assignedTailorId;

        if (nextTailorId) {
          const t = INITIAL_TAILORS.find((tailor) => tailor.id === nextTailorId);
          if (t) {
            tailorId = t.id;
            tailorName = t.name;
          }
        }

        const nowStr = new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        });

        const newHistoryEntry = {
          stage: newStage,
          timestamp: `${nowStr} WAT`,
          note: note || `Stage advanced to ${newStage}`,
          actorName: staffRole === "tailor" ? "Master Tailor" : "Operations Lead",
        };

        // Determine if at risk or late status resolves
        const isLate = ord.isLate && newStage === "Delivered" ? false : ord.isLate;
        const isAtRisk = newStage === "Delivered" || newStage === "Ready" ? false : ord.isAtRisk;

        return {
          ...ord,
          status: newStage,
          assignedTailorId: tailorId,
          assignedTailorName: tailorName,
          isLate,
          isAtRisk,
          history: [...ord.history, newHistoryEntry],
        };
      })
    );

    // Persist status change to Neon PostgreSQL cloud database
    fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStage, notes: note }),
    }).catch((err) => console.warn("Failed to update order in Neon DB", err));
  };

  const assignTailorToOrder = (orderId: string, tailorId: string) => {
    const tailor = INITIAL_TAILORS.find((t) => t.id === tailorId);
    if (!tailor) return;

    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              assignedTailorId: tailor.id,
              assignedTailorName: tailor.name,
              history: [
                ...ord.history,
                {
                  stage: ord.status,
                  timestamp: "Just now",
                  note: `Assigned to ${tailor.name} (${tailor.specialty})`,
                  actorName: "Admin Operations",
                },
              ],
            }
          : ord
      )
    );

    // Persist tailor assignment to Neon PostgreSQL cloud database
    fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignedTailorId: tailor.id, assignedTailorName: tailor.name }),
    }).catch((err) => console.warn("Failed to persist tailor assignment to Neon DB", err));
  };

  const createBooking = (bookingData: Partial<MeasurementBooking>): MeasurementBooking => {
    const bookingNum = Math.floor(100 + Math.random() * 900);
    const newBooking: MeasurementBooking = {
      id: `#MB-${bookingNum}`,
      customerName: bookingData.customerName || "Customer",
      customerPhone: bookingData.customerPhone || "+234 800 000 0000",
      venueType: bookingData.venueType || "home",
      address: bookingData.address || "Doorstep Address, Nigeria",
      area: bookingData.area || "Lekki Phase 1",
      date: bookingData.date || new Date().toISOString().split("T")[0],
      timeSlot: bookingData.timeSlot || "11:00 AM - 12:30 PM",
      sessionFee: bookingData.sessionFee ?? 5000,
      measurerId: bookingData.measurerId || "ms-01",
      measurerName: bookingData.measurerName || "Folake Davies",
      measurerPhone: bookingData.measurerPhone || "+234 803 910 4421",
      status: "scheduled",
      notes: bookingData.notes,
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Persist booking to Neon PostgreSQL cloud database
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    }).catch((err) => console.warn("Failed to persist booking to Neon DB", err));

    return newBooking;
  };

  const updateBooking = (id: string, updates: Partial<MeasurementBooking>) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );

    // Persist booking update to Neon PostgreSQL cloud database
    fetch(`/api/bookings/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).catch((err) => console.warn("Failed to update booking in Neon DB", err));
  };

  const createBulkRequest = (reqData: Partial<BulkOrderRequest>): BulkOrderRequest => {
    const reqNum = Math.floor(500 + Math.random() * 500);
    const newReq: BulkOrderRequest = {
      id: `#BLK-${reqNum}`,
      groupName: reqData.groupName || "Celebration Ensemble",
      occasion: reqData.occasion || "Event",
      targetDeliveryDate: reqData.targetDeliveryDate || "2026-11-30",
      totalPieces: reqData.totalPieces || 20,
      designId: reqData.designId || "des-asoebi",
      designName: reqData.designName || "Celebration Aso Ebi Ensemble",
      contactName: reqData.contactName || "Coordinator",
      contactPhone: reqData.contactPhone || "+234 800 000 0000",
      contactEmail: reqData.contactEmail || "events@weddings.ng",
      location: reqData.location || "Nigeria (Doorstep Delivery)",
      roster: reqData.roster || [],
      bookingRequested: reqData.bookingRequested ?? true,
      status: "pending_quote",
      createdAt: new Date().toISOString(),
    };

    setBulkRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const saveCustomerMeasurements = (measurements: MeasurementSet) => {
    setCustomerProfile((prev) => ({
      ...prev,
      savedMeasurements: {
        ...measurements,
        recordedAt: new Date().toISOString().split("T")[0],
      },
      lastMeasuredDate: new Date().toISOString().split("T")[0],
    }));
  };

  const confirmOrderMeasurements = (orderId: string, measurements: MeasurementSet) => {
    const calc = calculateGuaranteedDelivery(7);
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;

        const updatedItems = ord.items.map((it) => ({
          ...it,
          measurements,
        }));

        return {
          ...ord,
          status: "Confirmed",
          confirmedAt: new Date().toISOString(),
          guaranteedDeliveryDate: calc.deliveryDate.toISOString(),
          items: updatedItems,
          history: [
            ...ord.history,
            {
              stage: "Confirmed",
              timestamp: "Just now",
              note: "Measurements reviewed and approved by customer. Delivery date locked.",
              actorName: "Customer Confirmation",
            },
          ],
        };
      })
    );
  };

  const updateTailorEmail = (tailorId: string, email: string) => {
    setTailors((prev) =>
      prev.map((t) => (t.id === tailorId ? { ...t, email: email.trim() } : t))
    );
  };

  const updateMeasurerEmail = (measurerId: string, email: string) => {
    setMeasurers((prev) =>
      prev.map((m) => (m.id === measurerId ? { ...m, email: email.trim() } : m))
    );
  };

  const linkStaffEmail = (role: "admin" | "tailor" | "measurer", staffId: string, email: string) => {
    const cleanEmail = email.trim();
    setStaffEmail(cleanEmail);

    if (role === "tailor") {
      updateTailorEmail(staffId, cleanEmail);
    } else if (role === "measurer") {
      updateMeasurerEmail(staffId, cleanEmail);
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY_STAFF);
      const parsed = stored ? JSON.parse(stored) : {};
      localStorage.setItem(
        STORAGE_KEY_STAFF,
        JSON.stringify({ ...parsed, role, staffId, email: cleanEmail })
      );
    } catch (e) {}

    // Persist to server session cookies
    fetch("/api/auth/staff-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, staffId, email: cleanEmail }),
    }).catch(() => {});
  };

  const loginStaff = (role: "admin" | "tailor" | "measurer", staffId?: string, email?: string) => {
    const finalStaffId = staffId || (role === "tailor" ? "tl-01" : role === "measurer" ? "ms-01" : "admin-01");
    setStaffRole(role);
    setActiveStaffId(finalStaffId);
    if (email) {
      setStaffEmail(email.trim());
      if (role === "tailor") updateTailorEmail(finalStaffId, email);
      if (role === "measurer") updateMeasurerEmail(finalStaffId, email);
    }

    try {
      localStorage.setItem(
        STORAGE_KEY_STAFF,
        JSON.stringify({
          role,
          staffId: finalStaffId,
          email: email?.trim(),
        })
      );
    } catch (e) {}

    // Set HTTP session cookie for server authorization
    fetch("/api/auth/staff-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, staffId: finalStaffId, email: email?.trim() }),
    }).catch(() => {});
  };

  const logoutStaff = () => {
    setStaffRole(null);
    setActiveStaffId(null);
    setStaffEmail(null);
    try {
      localStorage.removeItem(STORAGE_KEY_STAFF);
    } catch (e) {}

    // Clear HTTP session cookie
    fetch("/api/auth/staff-session", {
      method: "DELETE",
    }).catch(() => {});
  };

  const updateMediaAsset = (id: string, updates: Partial<MediaAsset>) => {
    setMediaAssets((prev) =>
      prev.map((asset) => {
        if (asset.id !== id) return asset;
        return { ...asset, ...updates };
      })
    );

    // If this asset maps to a design
    setDesigns((prev) =>
      prev.map((des) => {
        if (des.id === id) {
          return {
            ...des,
            heroImage: updates.url !== undefined ? updates.url : des.heroImage,
            imageAlt: updates.alt !== undefined ? updates.alt : des.imageAlt,
          };
        }
        return des;
      })
    );

    // If this asset maps to a tailor
    setTailors((prev) =>
      prev.map((tl) => {
        if (tl.id === id) {
          return {
            ...tl,
            avatar: updates.url !== undefined ? updates.url : tl.avatar,
            avatarAlt: updates.alt !== undefined ? updates.alt : tl.avatarAlt,
          };
        }
        return tl;
      })
    );

    // If this asset maps to a measurer
    setMeasurers((prev) =>
      prev.map((ms) => {
        if (ms.id === id) {
          return {
            ...ms,
            avatar: updates.url !== undefined ? updates.url : ms.avatar,
            avatarAlt: updates.alt !== undefined ? updates.alt : ms.avatarAlt,
          };
        }
        return ms;
      })
    );
  };

  const resetMediaAsset = (id: string) => {
    const initial = INITIAL_MEDIA_ASSETS.find((a) => a.id === id);
    if (initial) {
      updateMediaAsset(id, { url: initial.defaultUrl, alt: initial.defaultAlt });
    }
  };

  const resetAllMediaAssets = () => {
    setMediaAssets(INITIAL_MEDIA_ASSETS);
    setDesigns(INITIAL_DESIGNS);
    setTailors(INITIAL_TAILORS);
    setMeasurers(INITIAL_MEASURERS);
    try {
      localStorage.removeItem(STORAGE_KEY_MEDIA);
      localStorage.removeItem(STORAGE_KEY_DESIGNS);
      localStorage.removeItem(STORAGE_KEY_TAILORS);
      localStorage.removeItem(STORAGE_KEY_MEASURERS);
    } catch (e) {}
  };

  const addNewDesign = (newDesign: Design) => {
    setDesigns((prev) => [newDesign, ...prev]);
    fetch("/api/designs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDesign),
    }).catch((err) => console.warn("Failed to persist design to Neon DB", err));
  };

  const addNewDesigns = (newDesignsList: Design[]) => {
    setDesigns((prev) => [...newDesignsList, ...prev]);
    fetch("/api/designs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDesignsList),
    }).catch((err) => console.warn("Failed to persist batch designs to Neon DB", err));
  };

  const resetAllToSeed = () => {
    setOrders(INITIAL_ORDERS);
    setBookings(INITIAL_BOOKINGS);
    setBulkRequests(INITIAL_BULK_REQUESTS);
    setCustomerProfile(DEFAULT_PROFILE);
    setDraftOrder(DEFAULT_DRAFT);
    resetAllMediaAssets();
    try {
      localStorage.removeItem(STORAGE_KEY_ORDERS);
      localStorage.removeItem(STORAGE_KEY_BOOKINGS);
      localStorage.removeItem(STORAGE_KEY_BULK);
      localStorage.removeItem(STORAGE_KEY_DRAFT);
      localStorage.removeItem(STORAGE_KEY_PROFILE);
    } catch (e) {}
  };

  return (
    <PrimeStitchContext.Provider
      value={{
        orders,
        designs,
        tailors,
        measurers,
        mediaAssets,
        bookings,
        bulkRequests,
        customerProfile,
        draftOrder,
        staffRole,
        activeStaffId,
        staffEmail,
        updateDraftOrder,
        resetDraftOrder,
        createOrderFromDraft,
        updateOrderStatus,
        assignTailorToOrder,
        createBooking,
        updateBooking,
        createBulkRequest,
        saveCustomerMeasurements,
        confirmOrderMeasurements,
        updateMediaAsset,
        resetMediaAsset,
        resetAllMediaAssets,
        addNewDesign,
        addNewDesigns,
        loginStaff,
        logoutStaff,
        linkStaffEmail,
        updateTailorEmail,
        updateMeasurerEmail,
        resetAllToSeed,
      }}
    >
      {children}
    </PrimeStitchContext.Provider>
  );
}

export function usePrimeStitch() {
  const context = useContext(PrimeStitchContext);
  if (!context) {
    throw new Error("usePrimeStitch must be used within a PrimeStitchProvider");
  }
  return context;
}
