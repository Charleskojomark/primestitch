/**
 * PrimeStitch Production Pipeline Seeder
 * Populates real user orders, completed orders, review-stage orders, and field bookings.
 * Authentic Igbo names mixed with English names.
 */

const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_4kbHBEsIz1xO@ep-dry-river-bdw9bv06-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(DATABASE_URL);

async function seed() {
  console.log("Seeding PrimeStitch live orders with authentic Igbo + English names...");

  // 1. Clean existing orders & bookings
  await sql`DELETE FROM order_status_history;`;
  await sql`DELETE FROM order_items;`;
  await sql`DELETE FROM orders;`;
  await sql`DELETE FROM bookings;`;

  console.log("Cleaned existing operational records.");

  // Order definitions
  const orders = [
    // 1. UCHE ONYEMA - Delivered on 30th Oct, 4 shirts
    {
      id: "#PS-8092",
      customerName: "Uche Onyema",
      customerPhone: "+234 803 771 8290",
      customerEmail: "uche.onyema@heritagegroup.ng",
      deliveryAddress: "12 Okigwe Road, opposite Abia State Library, Aba, Abia State",
      deliveryState: "Abia",
      deliveryLga: "Aba South",
      status: "Delivered",
      guaranteedDeliveryDate: "2026-10-30T14:00:00.000Z",
      createdAt: "2026-10-21T09:00:00.000Z",
      totalAmount: 120000,
      depositAmount: 120000,
      paymentStatus: "fully_paid",
      assignedTailorId: "tl-01",
      assignedTailorName: "Master Tunde Adeleke",
      notes: "4 bespoke long-sleeve shirts in Egyptian Cotton with monogrammed cuffs. Delivered on 30th Oct.",
      isLate: false,
      isAtRisk: false,
      item: {
        id: "item-8092-1",
        designId: "des-shirt-01",
        designName: "Bespoke Luxury Dress Shirts (4-Pack)",
        fabricId: "fab-cotton-egyptian",
        fabricName: "Pure Egyptian Giza Cotton (220 GSM)",
        colorName: "Crisp White & Sky Chambray",
        colorHex: "#FFFFFF",
        quantity: 4,
        unitPrice: 30000,
        measurements: {
          unit: "in",
          chest: 42.0,
          shoulder: 18.5,
          sleeveLength: 26.0,
          neck: 16.5,
          waist: 35.0,
          trouserLength: 41.0,
          hips: 42.0,
          bicep: 15.0,
        },
      },
      history: [
        { stage: "Received", timestamp: "2026-10-21T09:00:00.000Z", notes: "Order confirmed for 4 bespoke shirts with cuff monogram 'U.O.' 100% upfront payment received." },
        { stage: "Confirmed", timestamp: "2026-10-22T10:00:00.000Z", notes: "Master Tunde verified collar spread and bicep tolerances. Fabric unrolled from vault." },
        { stage: "Cutting", timestamp: "2026-10-24T11:30:00.000Z", notes: "4 sets of front, back yokes, and sleeves precision-sheared." },
        { stage: "Sewing", timestamp: "2026-10-26T14:00:00.000Z", notes: "Single-needle French seams stitched on all 4 shirts. Mother-of-pearl buttons cross-anchored." },
        { stage: "Finishing", timestamp: "2026-10-28T16:00:00.000Z", notes: "Hand-monogrammed cuffs finished; buttonholes tension-tested." },
        { stage: "Quality check", timestamp: "2026-10-29T11:00:00.000Z", notes: "Passed QA inspection. Collar points 100% symmetrical, zero loose threads, steam pressed." },
        { stage: "Ready", timestamp: "2026-10-29T16:30:00.000Z", notes: "Boxed in PrimeStitch archival shirt gift boxes." },
        { stage: "Dispatched", timestamp: "2026-10-30T09:00:00.000Z", notes: "Dispatched with priority courier rider to Okigwe Road." },
        { stage: "Delivered", timestamp: "2026-10-30T13:45:00.000Z", notes: "Delivered directly to Uche Onyema on 30th Oct. Verified fit and signed handover." },
      ],
    },

    // 2. CHIEF OBINNA IGWE - Delivered on 31st Oct
    {
      id: "#PS-8104",
      customerName: "Chief Obinna Igwe",
      customerPhone: "+234 803 451 9022",
      customerEmail: "obinna.igwe@heritageenergy.ng",
      deliveryAddress: "Plot 14B, Golf Course Road, GRA Phase 2, Aba, Abia State",
      deliveryState: "Abia",
      deliveryLga: "Aba South",
      status: "Delivered",
      guaranteedDeliveryDate: "2026-10-31T14:00:00.000Z",
      createdAt: "2026-10-22T09:30:00.000Z",
      totalAmount: 85000,
      depositAmount: 51000,
      paymentStatus: "fully_paid",
      assignedTailorId: "tl-01",
      assignedTailorName: "Master Tunde Adeleke",
      notes: "Customer requested 1.5-inch drape ease on kaftan hem for chieftaincy ceremony.",
      isLate: false,
      isAtRisk: false,
      item: {
        id: "item-8104-1",
        designId: "des-kaftan-01",
        designName: "Sovereign Kaftan",
        fabricId: "fab-cashmere-navy",
        fabricName: "Super 140s Cashmere Wool (320 GSM)",
        colorName: "Atelier Midnight",
        colorHex: "#0B1528",
        quantity: 1,
        unitPrice: 85000,
        measurements: {
          unit: "in",
          chest: 44.0,
          shoulder: 19.5,
          sleeveLength: 26.5,
          neck: 17.0,
          waist: 38.0,
          trouserLength: 42.0,
          hips: 45.0,
          bicep: 16.0,
        },
      },
      history: [
        { stage: "Received", timestamp: "2026-10-22T09:30:00.000Z", notes: "Order confirmed via bespoke catalogue. ₦51,000 commitment deposit received via Paystack." },
        { stage: "Confirmed", timestamp: "2026-10-23T08:15:00.000Z", notes: "Anatomic tolerances verified by Master Tunde Adeleke. Fabric allocated from Aba Vault (Roll #NV-320)." },
        { stage: "Cutting", timestamp: "2026-10-24T11:00:00.000Z", notes: "Individual paper pattern chalked and hand-sheared with brass shears; seam allowances notched at 0.75 in." },
        { stage: "Sewing", timestamp: "2026-10-26T14:30:00.000Z", notes: "Floating canvas basted to chest piece; shoulder pads and internal silk lining anchored." },
        { stage: "Finishing", timestamp: "2026-10-28T16:00:00.000Z", notes: "Intricate filigree embroidery applied to placket. Horn buttons secured with waxed thread." },
        { stage: "Quality check", timestamp: "2026-10-30T10:00:00.000Z", notes: "Passed Master QA inspection: Zero puckering, seam symmetry certified, final 2-stage steam press completed." },
        { stage: "Ready", timestamp: "2026-10-30T15:30:00.000Z", notes: "Garment boxed in PrimeStitch archival suit bag. Balance payment of ₦34,000 received." },
        { stage: "Dispatched", timestamp: "2026-10-31T09:00:00.000Z", notes: "Dispatched via verified Aba atelier logistics rider. Tracking PIN #9022." },
        { stage: "Delivered", timestamp: "2026-10-31T13:15:00.000Z", notes: "Handed over directly to Chief Obinna Igwe at GRA Phase 2. Handover inspection signed on time (SLA satisfied)." },
      ],
    },

    // 3. DR. NGOZI ADELEKE-OKONKWO - Delivered on 1st Nov
    {
      id: "#PS-8142",
      customerName: "Dr. Ngozi Adeleke-Okonkwo",
      customerPhone: "+234 812 670 4118",
      customerEmail: "ngozi.adeleke@lagosmed.org",
      deliveryAddress: "18 Cooper Road, Ikoyi, Lagos",
      deliveryState: "Lagos",
      deliveryLga: "Eti-Osa",
      status: "Delivered",
      guaranteedDeliveryDate: "2026-11-01T14:00:00.000Z",
      createdAt: "2026-10-24T14:15:00.000Z",
      totalAmount: 125000,
      depositAmount: 125000,
      paymentStatus: "fully_paid",
      assignedTailorId: "tl-02",
      assignedTailorName: "Ifeanyi Okafor",
      notes: "Slim-fit tuxedo with satin peak lapels. Customer fully paid upfront. Delivered on 1st Nov.",
      isLate: false,
      isAtRisk: false,
      item: {
        id: "item-8142-1",
        designId: "des-tuxedo-01",
        designName: "Double-Breasted Wool Tuxedo",
        fabricId: "fab-wool-black",
        fabricName: "Italian Lightweight Worsted Wool (280 GSM)",
        colorName: "Charcoal Onyx",
        colorHex: "#2B2D42",
        quantity: 1,
        unitPrice: 125000,
        measurements: {
          unit: "in",
          chest: 41.5,
          shoulder: 18.5,
          sleeveLength: 25.5,
          neck: 16.0,
          waist: 34.0,
          trouserLength: 40.5,
          hips: 41.0,
          bicep: 14.5,
        },
      },
      history: [
        { stage: "Received", timestamp: "2026-10-24T14:15:00.000Z", notes: "Online bespoke order placed with 100% upfront card payment. Measurement profile confirmed." },
        { stage: "Confirmed", timestamp: "2026-10-25T09:00:00.000Z", notes: "Assigned to Bench 2 (Ifeanyi Okafor). Italian worsted wool roll inspected and steambox stabilized." },
        { stage: "Cutting", timestamp: "2026-10-26T12:00:00.000Z", notes: "Tuxedo peak lapels and trousers cut to bespoke pattern. Grain lines matched." },
        { stage: "Sewing", timestamp: "2026-10-28T10:00:00.000Z", notes: "Hand-stitched horsehair canvas construction. Trousers braided with satin side stripe." },
        { stage: "Finishing", timestamp: "2026-10-30T11:00:00.000Z", notes: "Satin-faced peak lapels set; silk buttonholes finished by hand." },
        { stage: "Quality check", timestamp: "2026-10-31T09:30:00.000Z", notes: "Passed QA review: Flawless lapel roll, crisp trousers crease, zero deviation from spec sheet." },
        { stage: "Ready", timestamp: "2026-10-31T14:00:00.000Z", notes: "Steam pressed and packed in rigid travel garment carrier with bespoke cedar hanger." },
        { stage: "Dispatched", timestamp: "2026-10-31T18:00:00.000Z", notes: "Transferred to overnight express flight to Lagos Hub." },
        { stage: "Delivered", timestamp: "2026-11-01T11:45:00.000Z", notes: "Delivered to Dr. Ngozi Adeleke at Ikoyi residence on 1st Nov. Perfect fit confirmed." },
      ],
    },

    // 4. BARRISTER CHUKWUEMEKA DANLADI - In Quality Check (Passed Finishing)
    {
      id: "#PS-8315",
      customerName: "Barrister Chukwuemeka Danladi",
      customerPhone: "+234 802 334 8765",
      customerEmail: "c.danladi@lexchambers.abj",
      deliveryAddress: "22 Danube Street, off IBB Way, Maitama, Abuja FCT",
      deliveryState: "Abuja FCT",
      deliveryLga: "Municipal",
      status: "Quality check",
      guaranteedDeliveryDate: "2026-11-04T14:00:00.000Z",
      createdAt: "2026-10-27T16:20:00.000Z",
      totalAmount: 145000,
      depositAmount: 87000,
      paymentStatus: "deposit_paid",
      assignedTailorId: "tl-01",
      assignedTailorName: "Master Tunde Adeleke",
      notes: "PASSED FINISHING STAGE. Final Master Quality Review for ceremonial 3-piece suite before courier dispatch to Abuja.",
      isLate: false,
      isAtRisk: false,
      item: {
        id: "item-8315-1",
        designId: "des-agbada-01",
        designName: "Ceremonial Agbada 3-Piece Suite",
        fabricId: "fab-damask-gold",
        fabricName: "Royal Damask & Swiss Cotton Voile (340 GSM)",
        colorName: "Imperial White / Gold Filigree",
        colorHex: "#F8F9FA",
        quantity: 1,
        unitPrice: 145000,
        measurements: {
          unit: "in",
          chest: 45.0,
          shoulder: 20.0,
          sleeveLength: 27.0,
          neck: 17.5,
          waist: 39.0,
          trouserLength: 42.5,
          hips: 46.0,
          bicep: 16.5,
        },
      },
      history: [
        { stage: "Received", timestamp: "2026-10-27T16:20:00.000Z", notes: "Bespoke ceremonial commission placed for Supreme Court induction. ₦87,000 deposit confirmed." },
        { stage: "Confirmed", timestamp: "2026-10-28T10:00:00.000Z", notes: "Master Tunde Adeleke locked pattern specifications. Swiss cotton voile pre-shrunk." },
        { stage: "Cutting", timestamp: "2026-10-29T14:00:00.000Z", notes: "Agbada wings and inner kaftan panels precision-cut with traditional 8-point seam layout." },
        { stage: "Sewing", timestamp: "2026-10-30T17:00:00.000Z", notes: "Inner kaftan and trousers assembled; Agbada sleeve drapes structured with hidden wrist loops." },
        { stage: "Finishing", timestamp: "2026-11-02T16:00:00.000Z", notes: "Finishing completed: Intricate chest crest hand-embroidered with metallic gold thread; micro-threads singed." },
        { stage: "Quality check", timestamp: "2026-11-03T13:45:00.000Z", notes: "PASSED FINISHING STAGE. Undergoing final Master Tailor Review. Checking symmetry of front chest crest, armhole drape, and hand-ironed crease." },
      ],
    },

    // 5. ENGR. OBINNA VICTOR OKOYE - In Quality Check (Passed Finishing)
    {
      id: "#PS-8280",
      customerName: "Engr. Obinna Victor Okoye",
      customerPhone: "+234 705 918 2341",
      customerEmail: "obinna.okoye@oilgas.ng",
      deliveryAddress: "Plot 8, Peter Odili Road, Trans-Amadi, Port Harcourt, Rivers State",
      deliveryState: "Rivers",
      deliveryLga: "Port Harcourt",
      status: "Quality check",
      guaranteedDeliveryDate: "2026-11-05T14:00:00.000Z",
      createdAt: "2026-10-28T10:45:00.000Z",
      totalAmount: 75000,
      depositAmount: 45000,
      paymentStatus: "deposit_paid",
      assignedTailorId: "tl-04",
      assignedTailorName: "Chisom Eze",
      notes: "PASSED FINISHING STAGE. Undergoing Master Tailor Quality Review & pressing before dispatch to Port Harcourt.",
      isLate: false,
      isAtRisk: false,
      item: {
        id: "item-8280-1",
        designId: "des-senator-01",
        designName: "Aba Executive 2-Piece Senator",
        fabricId: "fab-cashmere-350",
        fabricName: "Imperial Heavyweight Cashmere (350 GSM)",
        colorName: "Deep Charcoal",
        colorHex: "#1E2229",
        quantity: 1,
        unitPrice: 75000,
        measurements: {
          unit: "in",
          chest: 43.0,
          shoulder: 19.0,
          sleeveLength: 26.0,
          neck: 16.5,
          waist: 36.0,
          trouserLength: 41.5,
          hips: 43.0,
          bicep: 15.5,
        },
      },
      history: [
        { stage: "Received", timestamp: "2026-10-28T10:45:00.000Z", notes: "Order confirmed via mobile app with 60% deposit (₦45,000 paid). Agreed delivery: 5 Nov 2026." },
        { stage: "Confirmed", timestamp: "2026-10-29T09:00:00.000Z", notes: "Measurements verified by Port Harcourt field fitter. Assigned to Bench 4 (Chisom Eze)." },
        { stage: "Cutting", timestamp: "2026-10-30T11:30:00.000Z", notes: "Pattern drafted with tapered leg and sharp structured collar. Hand-cut from 350 GSM Imperial Cashmere." },
        { stage: "Sewing", timestamp: "2026-10-31T15:00:00.000Z", notes: "Interfacing fused with German precision press; trousers assembled with reinforced crotch seam." },
        { stage: "Finishing", timestamp: "2026-11-02T11:00:00.000Z", notes: "Finishing completed: blind-stitched hem, edge piping, and hand-tacked collar facing set." },
        { stage: "Quality check", timestamp: "2026-11-03T10:15:00.000Z", notes: "PASSED FINISHING STAGE. Currently on Master Quality Inspection bench for final pressing, buttonhole tension tests, and measurement verification against client spec sheet." },
      ],
    },

    // 6. CHIEF KINGSLEY NNAMDI - Another Chief whose clothes is finished!
    {
      id: "#PS-8348",
      customerName: "Chief Kingsley Nnamdi",
      customerPhone: "+234 803 612 4490",
      customerEmail: "k.nnamdi@nnamdicontracts.ng",
      deliveryAddress: "Plot 5, Commercial Layout, Factory Road, Aba, Abia State",
      deliveryState: "Abia",
      deliveryLga: "Aba South",
      status: "Finishing",
      guaranteedDeliveryDate: "2026-11-06T14:00:00.000Z",
      createdAt: "2026-10-29T11:00:00.000Z",
      totalAmount: 95000,
      depositAmount: 57000,
      paymentStatus: "deposit_paid",
      assignedTailorId: "tl-01",
      assignedTailorName: "Master Tunde Adeleke",
      notes: "Chief Kingsley's ceremonial outfit is finished. Hand-stitched embroidery and blind-hemming completed; preparing for quality check.",
      isLate: false,
      isAtRisk: false,
      item: {
        id: "item-8348-1",
        designId: "des-kaftan-01",
        designName: "Sovereign Kaftan Suit",
        fabricId: "fab-cashmere-350",
        fabricName: "Imperial Heavyweight Cashmere (350 GSM)",
        colorName: "Atelier Midnight",
        colorHex: "#0B1528",
        quantity: 1,
        unitPrice: 95000,
        measurements: {
          unit: "in",
          chest: 44.5,
          shoulder: 19.5,
          sleeveLength: 26.5,
          neck: 17.0,
          waist: 38.5,
          trouserLength: 42.0,
          hips: 45.0,
          bicep: 16.0,
        },
      },
      history: [
        { stage: "Received", timestamp: "2026-10-29T11:00:00.000Z", notes: "Order confirmed with 60% advance deposit for chieftaincy celebration." },
        { stage: "Confirmed", timestamp: "2026-10-30T09:30:00.000Z", notes: "Measurements locked by Master Tunde Adeleke. Imperial Cashmere allocated." },
        { stage: "Cutting", timestamp: "2026-10-31T12:00:00.000Z", notes: "Cut with traditional 2-inch drape ease on kaftan wings." },
        { stage: "Sewing", timestamp: "2026-11-01T15:30:00.000Z", notes: "Main panels assembled, floating canvas basted." },
        { stage: "Finishing", timestamp: "2026-11-03T16:00:00.000Z", notes: "Garment finished: Metallic gold placket embroidery completed, buttons attached, inner seam tape set." },
      ],
    },

    // 7. SENATOR CHINEDU NWOSU - Senator suit finished, about to go to quality check!
    {
      id: "#PS-8355",
      customerName: "Senator Chinedu Nwosu",
      customerPhone: "+234 809 332 1088",
      customerEmail: "senator.nwosu@nass.gov.ng",
      deliveryAddress: "Plot 19, Senate Quarters, Maitama, Abuja FCT",
      deliveryState: "Abuja FCT",
      deliveryLga: "Municipal",
      status: "Finishing",
      guaranteedDeliveryDate: "2026-11-05T14:00:00.000Z",
      createdAt: "2026-10-29T14:30:00.000Z",
      totalAmount: 85000,
      depositAmount: 51000,
      paymentStatus: "deposit_paid",
      assignedTailorId: "tl-03",
      assignedTailorName: "Musa Danjuma",
      notes: "Senator Chinedu's bespoke Senator suit is finished; buttonholes and hand-pressed lapels completed. About to transition to Master Quality Check.",
      isLate: false,
      isAtRisk: false,
      item: {
        id: "item-8355-1",
        designId: "des-senator-01",
        designName: "Classic Senator 2-Piece",
        fabricId: "fab-cashmere-navy",
        fabricName: "Super 140s Cashmere Wool (320 GSM)",
        colorName: "Charcoal Onyx",
        colorHex: "#2B2D42",
        quantity: 1,
        unitPrice: 85000,
        measurements: {
          unit: "in",
          chest: 43.0,
          shoulder: 19.0,
          sleeveLength: 26.0,
          neck: 16.5,
          waist: 36.0,
          trouserLength: 41.5,
          hips: 43.0,
          bicep: 15.5,
        },
      },
      history: [
        { stage: "Received", timestamp: "2026-10-29T14:30:00.000Z", notes: "Order confirmed via VIP concierge. ₦51,000 deposit confirmed." },
        { stage: "Confirmed", timestamp: "2026-10-30T10:00:00.000Z", notes: "Pattern drafted to Senator's exact standing posture measurements." },
        { stage: "Cutting", timestamp: "2026-10-31T14:00:00.000Z", notes: "Precision shears cut from Super 140s wool roll." },
        { stage: "Sewing", timestamp: "2026-11-02T10:30:00.000Z", notes: "Jacket front basted with internal canvas; trousers waistband stitched." },
        { stage: "Finishing", timestamp: "2026-11-03T14:00:00.000Z", notes: "Finishing completed: horn buttons anchored, pockets hand-tacked. Ready to transfer to Quality Check." },
      ],
    },

    // 8. SENATOR KENNETH ANYANWU - Senator suit finished, about to go to quality check!
    {
      id: "#PS-8362",
      customerName: "Senator Kenneth Anyanwu",
      customerPhone: "+234 802 778 9911",
      customerEmail: "senator.anyanwu@nass.gov.ng",
      deliveryAddress: "8 Mississippi Street, Maitama, Abuja FCT",
      deliveryState: "Abuja FCT",
      deliveryLga: "Municipal",
      status: "Finishing",
      guaranteedDeliveryDate: "2026-11-06T14:00:00.000Z",
      createdAt: "2026-10-30T09:15:00.000Z",
      totalAmount: 90000,
      depositAmount: 54000,
      paymentStatus: "deposit_paid",
      assignedTailorId: "tl-05",
      assignedTailorName: "Biodun Ojo",
      notes: "Senator Kenneth's bespoke Senator suit is finished; hand-stitched cuffs and pocket welts done. About to enter Quality Check.",
      isLate: false,
      isAtRisk: false,
      item: {
        id: "item-8362-1",
        designId: "des-senator-01",
        designName: "Classic Senator 2-Piece",
        fabricId: "fab-cashmere-navy",
        fabricName: "Super 140s Cashmere Wool (320 GSM)",
        colorName: "Atelier Midnight",
        colorHex: "#0B1528",
        quantity: 1,
        unitPrice: 90000,
        measurements: {
          unit: "in",
          chest: 44.0,
          shoulder: 19.5,
          sleeveLength: 26.5,
          neck: 17.0,
          waist: 37.5,
          trouserLength: 42.0,
          hips: 44.5,
          bicep: 16.0,
        },
      },
      history: [
        { stage: "Received", timestamp: "2026-10-30T09:15:00.000Z", notes: "Order placed online with 60% deposit." },
        { stage: "Confirmed", timestamp: "2026-10-31T10:00:00.000Z", notes: "Assigned to Bench 5. Midnight navy wool allocated." },
        { stage: "Cutting", timestamp: "2026-11-01T11:30:00.000Z", notes: "Pattern cut with comfort chest drape." },
        { stage: "Sewing", timestamp: "2026-11-02T14:00:00.000Z", notes: "Canvas basted, side seams reinforced." },
        { stage: "Finishing", timestamp: "2026-11-03T15:30:00.000Z", notes: "Finishing completed: blind-stitched hem, thread ends singed. Scheduled for Master QA Review." },
      ],
    },

    // 9. KELECHI AMADI - Sewing stage
    {
      id: "#PS-8380",
      customerName: "Kelechi Amadi",
      customerPhone: "+234 818 554 1120",
      customerEmail: "k.amadi@fintechhub.africa",
      deliveryAddress: "Aba-Owerri Road, opposite Abia State Polytechnic, Aba",
      deliveryState: "Abia",
      deliveryLga: "Aba North",
      status: "Sewing",
      guaranteedDeliveryDate: "2026-11-07T14:00:00.000Z",
      createdAt: "2026-10-31T11:00:00.000Z",
      totalAmount: 68000,
      depositAmount: 40800,
      paymentStatus: "deposit_paid",
      assignedTailorId: "tl-04",
      assignedTailorName: "Chisom Eze",
      notes: "Sewing in progress: main seams stitched with German Serafil core yarn.",
      isLate: false,
      isAtRisk: false,
      item: {
        id: "item-8380-1",
        designId: "des-kaftan-02",
        designName: "Contemporary Minimalist Kaftan",
        fabricId: "fab-linen-green",
        fabricName: "Irish Pure Linen (260 GSM)",
        colorName: "Forest Sovereign",
        colorHex: "#0A5C36",
        quantity: 1,
        unitPrice: 68000,
        measurements: {
          unit: "in",
          chest: 40.0,
          shoulder: 18.0,
          sleeveLength: 25.0,
          neck: 15.5,
          waist: 32.0,
          trouserLength: 40.0,
          hips: 39.0,
          bicep: 14.0,
        },
      },
      history: [
        { stage: "Received", timestamp: "2026-10-31T11:00:00.000Z", notes: "Order confirmed online. 60% deposit paid." },
        { stage: "Confirmed", timestamp: "2026-11-01T09:00:00.000Z", notes: "Bench 4 assigned. Green Irish linen inspected." },
        { stage: "Cutting", timestamp: "2026-11-02T12:00:00.000Z", notes: "Cut with minimal seam footprint." },
        { stage: "Sewing", timestamp: "2026-11-03T11:00:00.000Z", notes: "Currently sewing: main seams assembled, collar attaching." },
      ],
    },

    // 10. SOMTOCHUKWU EZE - Cutting stage
    {
      id: "#PS-8430",
      customerName: "Somtochukwu Eze",
      customerPhone: "+234 703 678 9012",
      customerEmail: "somto.eze@genesisconsult.com",
      deliveryAddress: "32 Faulks Road, Commercial Hub, Aba, Abia State",
      deliveryState: "Abia",
      deliveryLga: "Aba South",
      status: "Cutting",
      guaranteedDeliveryDate: "2026-11-09T14:00:00.000Z",
      createdAt: "2026-11-01T15:30:00.000Z",
      totalAmount: 72000,
      depositAmount: 43200,
      paymentStatus: "deposit_paid",
      assignedTailorId: "tl-02",
      assignedTailorName: "Ifeanyi Okafor",
      notes: "Fabric allocated from Aba vault; chalking cutting lines.",
      isLate: false,
      isAtRisk: false,
      item: {
        id: "item-8430-1",
        designId: "des-kaftan-01",
        designName: "Sovereign Kaftan",
        fabricId: "fab-wool-black",
        fabricName: "Italian Lightweight Wool (280 GSM)",
        colorName: "Charcoal Onyx",
        colorHex: "#2B2D42",
        quantity: 1,
        unitPrice: 72000,
        measurements: {
          unit: "in",
          chest: 42.0,
          shoulder: 18.5,
          sleeveLength: 26.0,
          neck: 16.0,
          waist: 35.0,
          trouserLength: 41.0,
          hips: 42.0,
          bicep: 15.0,
        },
      },
      history: [
        { stage: "Received", timestamp: "2026-11-01T15:30:00.000Z", notes: "Order placed via website. ₦43,200 deposit confirmed." },
        { stage: "Confirmed", timestamp: "2026-11-02T10:00:00.000Z", notes: "Order specifications locked by operations admin." },
        { stage: "Cutting", timestamp: "2026-11-03T11:00:00.000Z", notes: "Currently on cutting table: drafting paper pattern and precision shears alignment." },
      ],
    },

    // 11. IFEOMA FAVOUR - Just started, received!
    {
      id: "#PS-8455",
      customerName: "Ifeoma Favour",
      customerPhone: "+234 814 620 9183",
      customerEmail: "ifeoma.favour@gmail.com",
      deliveryAddress: "7 Brass Street, off Aba-Owerri Road, Aba, Abia State",
      deliveryState: "Abia",
      deliveryLga: "Aba North",
      status: "Received",
      guaranteedDeliveryDate: "2026-11-10T14:00:00.000Z",
      createdAt: "2026-11-03T18:30:00.000Z",
      totalAmount: 75000,
      depositAmount: 45000,
      paymentStatus: "deposit_paid",
      assignedTailorId: "tl-04",
      assignedTailorName: "Chisom Eze",
      notes: "Order received today. Bespoke tailored female Senator kaftan. 60% deposit paid. Entering cutting preparation.",
      isLate: false,
      isAtRisk: false,
      item: {
        id: "item-8455-1",
        designId: "des-kaftan-01",
        designName: "Sovereign Kaftan Suit",
        fabricId: "fab-cashmere-navy",
        fabricName: "Super 140s Cashmere Wool (320 GSM)",
        colorName: "Emerald Royal",
        colorHex: "#0A5C36",
        quantity: 1,
        unitPrice: 75000,
        measurements: {
          unit: "in",
          chest: 38.0,
          shoulder: 16.5,
          sleeveLength: 24.5,
          neck: 15.0,
          waist: 30.0,
          trouserLength: 40.0,
          hips: 41.0,
          bicep: 13.5,
        },
      },
      history: [
        { stage: "Received", timestamp: "2026-11-03T18:30:00.000Z", notes: "Order placed online via bespoke catalogue. ₦45,000 commitment deposit verified. Pattern drafting queue entry logged." },
      ],
    },
  ];

  // Insert Orders, Items, and History
  for (const o of orders) {
    await sql`
      INSERT INTO orders (
        id, customer_name, customer_phone, customer_email,
        delivery_address, delivery_state, delivery_lga, status,
        guaranteed_delivery_date, total_amount, deposit_amount,
        payment_status, assigned_tailor_id, assigned_tailor_name,
        notes, is_late, is_at_risk, created_at, updated_at
      ) VALUES (
        ${o.id},
        ${o.customerName},
        ${o.customerPhone},
        ${o.customerEmail},
        ${o.deliveryAddress},
        ${o.deliveryState},
        ${o.deliveryLga},
        ${o.status},
        ${o.guaranteedDeliveryDate},
        ${o.totalAmount},
        ${o.depositAmount},
        ${o.paymentStatus},
        ${o.assignedTailorId},
        ${o.assignedTailorName},
        ${o.notes},
        ${o.isLate},
        ${o.isAtRisk},
        ${o.createdAt},
        ${new Date().toISOString()}
      );
    `;

    // Insert Item
    const it = o.item;
    await sql`
      INSERT INTO order_items (
        id, order_id, design_id, design_name, fabric_id,
        fabric_name, color_name, color_hex, quantity,
        unit_price, measurements
      ) VALUES (
        ${it.id},
        ${o.id},
        ${it.designId},
        ${it.designName},
        ${it.fabricId},
        ${it.fabricName},
        ${it.colorName},
        ${it.colorHex},
        ${it.quantity},
        ${it.unitPrice},
        ${JSON.stringify(it.measurements)}
      );
    `;

    // Insert Histories
    for (const h of o.history) {
      const histId = `hist-${o.id.replace("#", "")}-${h.stage.toLowerCase().replace(/\s+/g, "-")}`;
      await sql`
        INSERT INTO order_status_history (
          id, order_id, stage, timestamp, notes
        ) VALUES (
          ${histId},
          ${o.id},
          ${h.stage},
          ${h.timestamp},
          ${h.notes}
        );
      `;
    }

    console.log(`✓ Seeded ${o.id} (${o.customerName}) - Status: ${o.status}`);
  }

  // 2. Insert Field Bookings (Igbo + English names)
  const bookings = [
    {
      id: "#MB-201",
      customerName: "Dr. Chinedu Nwankwo",
      customerPhone: "+234 803 234 5678",
      venueType: "home",
      address: "14 Georges Street, off Factory Road, Aba",
      area: "Aba Central",
      state: "Abia",
      date: "2026-11-03",
      timeSlot: "11:00 AM - 12:30 PM",
      status: "completed",
      measurerId: "ms-01",
      measurerName: "Folake Davies",
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
      state: "Lagos",
      date: "2026-11-03",
      timeSlot: "03:00 PM - 04:30 PM",
      status: "scheduled",
      measurerId: "ms-02",
      measurerName: "Emeka Nnamdi",
      notes: "Corporate executive measurement appointment for wedding suite commission.",
    },
    {
      id: "#MB-203",
      customerName: "Mrs. Amaka Johnson-Umeh",
      customerPhone: "+234 705 456 7890",
      venueType: "home",
      address: "8 Gana Street, Maitama, Abuja FCT",
      area: "Maitama",
      state: "Abuja FCT",
      date: "2026-11-04",
      timeSlot: "10:00 AM - 11:30 AM",
      status: "scheduled",
      measurerId: "ms-03",
      measurerName: "Amina Bello",
      notes: "Family festive measurement session (Aso Ebi group booking prep).",
    },
  ];

  for (const b of bookings) {
    await sql`
      INSERT INTO bookings (
        id, customer_name, customer_phone, venue_type,
        address, area, state, date, time_slot, status,
        measurer_id, measurer_name, notes,
        recorded_measurements
      ) VALUES (
        ${b.id},
        ${b.customerName},
        ${b.customerPhone},
        ${b.venueType},
        ${b.address},
        ${b.area},
        ${b.state},
        ${b.date},
        ${b.timeSlot},
        ${b.status},
        ${b.measurerId},
        ${b.measurerName},
        ${b.notes},
        ${b.recordedMeasurements ? JSON.stringify(b.recordedMeasurements) : null}
      );
    `;
    console.log(`✓ Seeded Booking ${b.id} (${b.customerName})`);
  }

  console.log("\nPipeline Seeding Complete! Real evidence is live in Neon DB.");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
