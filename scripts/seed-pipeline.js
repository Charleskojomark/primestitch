/**
 * PrimeStitch Production Pipeline Seeder
 * Configured with EXACTLY 5 authentic Igbo + English orders:
 * 1. Ifeoma Favour (#PS-8455) - Received (just started today, SLA: 10 Nov)
 * 2. Senator Kenneth Anyanwu (#PS-8362) - Finishing (cuffs & welts finished, transitioning to QA)
 * 3. Senator Chinedu Nwosu (#PS-8355) - Quality check / In Review (passed finishing stage, in QA review)
 * 4. Chief Kingsley Nnamdi (#PS-8348) - Finishing (finished, hand-pressed, preparing for QA)
 * 5. Uche Onyema (#PS-8092) - Delivered on 30th Oct (4 bespoke shirts, Intellectual Giants School, Uratta Road, Aba)
 *
 * Today's Field Fittings / Bookings (STRICTLY ABA ADDRESSES):
 * 1. #MB-202 - Uche Onyema (SCHEDULED: Intellectual Giants School, Uratta Road, Aba)
 * 2. #MB-203 - Mrs. Amaka Johnson-Umeh (SCHEDULED: 28 Faulks Road, Near Brass Junction, Aba)
 * 3. #MB-201 - Dr. Chinedu Nwankwo (COMPLETED: 14 Georges Street, off Factory Road, Aba)
 */

const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_4kbHBEsIz1xO@ep-dry-river-bdw9bv06-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(DATABASE_URL);

async function seed() {
  console.log("Seeding PrimeStitch pipeline with EXACTLY 5 records & strictly Aba bookings...");

  // 1. Clean existing orders & bookings
  await sql`DELETE FROM order_status_history;`;
  await sql`DELETE FROM order_items;`;
  await sql`DELETE FROM orders;`;
  await sql`DELETE FROM bookings;`;

  console.log("Cleaned operational tables.");

  // EXACTLY 5 PIPELINE ORDERS
  const orders = [
    // 1. IFEOMA FAVOUR - Just started, received!
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
      notes: "Order received today. Bespoke tailored female Senator kaftan suit. 60% deposit paid. Entering cutting preparation.",
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
        {
          stage: "Received",
          timestamp: "2026-11-03T18:30:00.000Z",
          notes: "Order placed online via bespoke catalogue. ₦45,000 commitment deposit verified. Pattern drafting queue entry logged.",
        },
      ],
    },

    // 2. SENATOR KENNETH ANYANWU - Finished, about to go to quality check!
    {
      id: "#PS-8362",
      customerName: "Senator Kenneth Anyanwu",
      customerPhone: "+234 802 778 9911",
      customerEmail: "senator.anyanwu@nass.gov.ng",
      deliveryAddress: "Plot 8, Osisioma Industrial Layout, Express Junction, Aba, Abia State",
      deliveryState: "Abia",
      deliveryLga: "Osisioma",
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

    // 3. SENATOR CHINEDU NWOSU - Passed finishing stage, in Quality Check review!
    {
      id: "#PS-8355",
      customerName: "Senator Chinedu Nwosu",
      customerPhone: "+234 809 332 1088",
      customerEmail: "senator.nwosu@nass.gov.ng",
      deliveryAddress: "19 Faulks Road, Near Ariaria International Market, Aba, Abia State",
      deliveryState: "Abia",
      deliveryLga: "Aba South",
      status: "Quality check",
      guaranteedDeliveryDate: "2026-11-05T14:00:00.000Z",
      createdAt: "2026-10-29T14:30:00.000Z",
      totalAmount: 85000,
      depositAmount: 51000,
      paymentStatus: "deposit_paid",
      assignedTailorId: "tl-03",
      assignedTailorName: "Musa Danjuma",
      notes: "Senator Chinedu's bespoke Senator suit passed finishing stage. Currently in Review on Master Quality Check bench for final steam pressing and spec sheet audit.",
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
        { stage: "Finishing", timestamp: "2026-11-03T11:00:00.000Z", notes: "Finishing completed: horn buttons anchored, pockets hand-tacked." },
        { stage: "Quality check", timestamp: "2026-11-03T16:00:00.000Z", notes: "PASSED FINISHING STAGE. Currently on Master Quality Inspection bench for final pressing and measurement verification." },
      ],
    },

    // 4. CHIEF KINGSLEY NNAMDI - Clothes finished!
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

    // 5. UCHE ONYEMA - Delivered on 30th Oct, 4 shirts (Intellectual Giants School, Uratta Road)
    {
      id: "#PS-8092",
      customerName: "Uche Onyema",
      customerPhone: "+234 803 771 8290",
      customerEmail: "uche.onyema@heritagegroup.ng",
      deliveryAddress: "Intellectual Giants School, Uratta Road, Aba, Abia State",
      deliveryState: "Abia",
      deliveryLga: "Aba North",
      status: "Delivered",
      guaranteedDeliveryDate: "2026-10-30T14:00:00.000Z",
      createdAt: "2026-10-21T09:00:00.000Z",
      totalAmount: 120000,
      depositAmount: 120000,
      paymentStatus: "fully_paid",
      assignedTailorId: "tl-01",
      assignedTailorName: "Master Tunde Adeleke",
      notes: "4 bespoke long-sleeve shirts in Egyptian Cotton with monogrammed cuffs. Delivered on 30th Oct to Intellectual Giants School, Uratta Road, Aba.",
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
        { stage: "Dispatched", timestamp: "2026-10-30T09:00:00.000Z", notes: "Dispatched with priority courier rider to Intellectual Giants School, Uratta Road." },
        { stage: "Delivered", timestamp: "2026-10-30T13:45:00.000Z", notes: "Delivered directly to Uche Onyema at Intellectual Giants School, Uratta Road on 30th Oct. Verified fit and signed handover." },
      ],
    },
  ];

  // Insert exactly 5 orders
  for (const o of orders) {
    await sql`
      INSERT INTO orders (
        id, customer_name, customer_phone, customer_email, delivery_address,
        delivery_state, delivery_lga, status, guaranteed_delivery_date,
        total_amount, deposit_amount, payment_status, assigned_tailor_id,
        assigned_tailor_name, notes, is_late, is_at_risk, created_at
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
        ${o.createdAt}
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

    console.log(`✓ Seeded Order ${o.id}: ${o.customerName} (${o.status})`);
  }

  // 2. Insert Field Bookings (STRICTLY ABA ADDRESSES, with Uche Onyema at Intellectual Giants School, Uratta Road)
  const bookings = [
    {
      id: "#MB-202",
      customerName: "Uche Onyema",
      customerPhone: "+234 803 771 8290",
      venueType: "office",
      address: "Intellectual Giants School, Uratta Road, Aba",
      area: "Uratta Road",
      state: "Abia",
      date: "2026-11-04",
      timeSlot: "10:00 AM - 11:30 AM",
      status: "scheduled",
      measurerId: "ms-02",
      measurerName: "Emeka Nnamdi",
      notes: "Doorstep VIP fitting appointment at Intellectual Giants School on Uratta Road, Aba.",
      sessionFee: 0,
    },
    {
      id: "#MB-203",
      customerName: "Mrs. Amaka Johnson-Umeh",
      customerPhone: "+234 705 456 7890",
      venueType: "home",
      address: "28 Faulks Road, Near Brass Junction, Aba",
      area: "Brass Junction",
      state: "Abia",
      date: "2026-11-04",
      timeSlot: "02:00 PM - 03:30 PM",
      status: "scheduled",
      measurerId: "ms-03",
      measurerName: "Amina Lawal",
      notes: "Aba doorstep measurement appointment for custom lace event outfit.",
      sessionFee: 0,
    },
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
      sessionFee: 0,
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
  ];

  for (const b of bookings) {
    await sql`
      INSERT INTO bookings (
        id, customer_name, customer_phone, venue_type, address,
        area, state, date, time_slot, status, measurer_id,
        measurer_name, notes, recorded_measurements, created_at
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
        ${b.recordedMeasurements ? JSON.stringify(b.recordedMeasurements) : null},
        ${new Date().toISOString()}
      );
    `;
    console.log(`✓ Seeded Booking ${b.id}: ${b.customerName} (${b.status}) - ${b.address}`);
  }

  console.log("\nPipeline seeding complete! Exactly 5 orders and 3 Aba bookings active.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeder error:", err);
    process.exit(1);
  });
