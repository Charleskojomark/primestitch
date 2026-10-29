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
  loginStaff: (role: "admin" | "tailor" | "measurer", staffId?: string) => void;
  logoutStaff: () => void;
  resetAllToSeed: () => void;
}

const STORAGE_KEY_ORDERS = "primestitch_orders_v1";
const STORAGE_KEY_BOOKINGS = "primestitch_bookings_v1";
const STORAGE_KEY_BULK = "primestitch_bulk_v1";
const STORAGE_KEY_DRAFT = "primestitch_draft_order_v1";
const STORAGE_KEY_PROFILE = "primestitch_customer_profile_v1";
const STORAGE_KEY_STAFF = "primestitch_staff_session_v1";
const STORAGE_KEY_MEDIA = "primestitch_media_assets_v1";
const STORAGE_KEY_DESIGNS = "primestitch_designs_v1";
const STORAGE_KEY_TAILORS = "primestitch_tailors_v1";
const STORAGE_KEY_MEASURERS = "primestitch_measurers_v1";

const DEFAULT_DRAFT: DraftOrderState = {
  designId: "des-senator",
  designName: "Executive Senator Suit",
  fabricId: "fab-cashmere-blend",
  fabricName: "Italian Wool-Cashmere",
  colorName: "Atelier Midnight",
  colorHex: "#0B1528",
  quantity: 1,
  unitPrice: 83000,
  measurementMethod: "self",
  measurements: {
    unit: "in",
    chest: 40,
    shoulder: 18.5,
    sleeveLength: 34,
    neck: 16,
    waist: 34,
    trouserLength: 41,
  },
  paymentTier: "deposit_60",
};

const DEFAULT_PROFILE: CustomerProfileState = {
  name: "Oluwaseun Balogun",
  phone: "+234 802 334 1982",
  email: "seun.balogun@fintechcorp.ng",
  savedMeasurements: {
    unit: "in",
    chest: 40,
    shoulder: 18.5,
    sleeveLength: 34,
    neck: 16,
    waist: 34,
    trouserLength: 41,
    hips: 39,
    bicep: 14.5,
    wrist: 7.5,
    recordedAt: "2026-04-12",
    verifiedBy: "Kunle Williams",
  },
  lastMeasuredDate: "2026-04-12", // 6+ months ago relative to Oct 2026!
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
  const [isInitialized, setIsInitialized] = useState(false);

  // Hydrate from localStorage once mounted
  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedDesigns = localStorage.getItem(STORAGE_KEY_DESIGNS);
      if (storedDesigns) setDesigns(JSON.parse(storedDesigns));

      const storedTailors = localStorage.getItem(STORAGE_KEY_TAILORS);
      if (storedTailors) setTailors(JSON.parse(storedTailors));

      const storedMeasurers = localStorage.getItem(STORAGE_KEY_MEASURERS);
      if (storedMeasurers) setMeasurers(JSON.parse(storedMeasurers));

      const storedMedia = localStorage.getItem(STORAGE_KEY_MEDIA);
      if (storedMedia) setMediaAssets(JSON.parse(storedMedia));

      const storedBookings = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (storedBookings) setBookings(JSON.parse(storedBookings));

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
      }
    } catch (e) {
      console.warn("Failed to parse localStorage data", e);
    }
    setIsInitialized(true);
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
    return newBooking;
  };

  const updateBooking = (id: string, updates: Partial<MeasurementBooking>) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
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

  const loginStaff = (role: "admin" | "tailor" | "measurer", staffId?: string) => {
    setStaffRole(role);
    setActiveStaffId(staffId || (role === "tailor" ? "tl-01" : role === "measurer" ? "ms-01" : "admin-01"));
    try {
      localStorage.setItem(
        STORAGE_KEY_STAFF,
        JSON.stringify({
          role,
          staffId: staffId || (role === "tailor" ? "tl-01" : role === "measurer" ? "ms-01" : "admin-01"),
        })
      );
    } catch (e) {}
  };

  const logoutStaff = () => {
    setStaffRole(null);
    setActiveStaffId(null);
    try {
      localStorage.removeItem(STORAGE_KEY_STAFF);
    } catch (e) {}
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
        loginStaff,
        logoutStaff,
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
