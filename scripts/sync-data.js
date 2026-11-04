const fs = require("fs");
const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_4kbHBEsIz1xO@ep-dry-river-bdw9bv06-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(DATABASE_URL);

async function run() {
  console.log("Fetching orders and bookings from Neon DB...");

  const orders = await sql`
    SELECT * FROM orders ORDER BY created_at DESC;
  `;
  const items = await sql`
    SELECT * FROM order_items;
  `;
  const histories = await sql`
    SELECT * FROM order_status_history ORDER BY timestamp ASC;
  `;
  const bookings = await sql`
    SELECT * FROM bookings ORDER BY date DESC, time_slot ASC;
  `;

  console.log(`Fetched ${orders.length} orders and ${bookings.length} bookings.`);

  const formattedOrders = orders.map((o) => {
    const oItems = items.filter((it) => it.order_id === o.id).map((it) => ({
      designId: it.design_id,
      designName: it.design_name,
      fabricId: it.fabric_id,
      fabricName: it.fabric_name,
      colorName: it.color_name,
      colorHex: it.color_hex,
      quantity: it.quantity,
      unitPrice: Number(it.unit_price),
      measurements: it.measurements,
      measurementMethod: "booked_measurer",
    }));

    const oHistory = histories.filter((h) => h.order_id === o.id).map((h) => ({
      stage: h.stage,
      timestamp: h.timestamp
        ? new Date(h.timestamp).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Recent",
      note: h.notes || "Stage milestone verified",
      actorName: "Master Atelier",
    }));

    const total = Number(o.total_amount);
    const deposit = Number(o.deposit_amount);

    return {
      id: o.id,
      customerName: o.customer_name,
      customerPhone: o.customer_phone,
      customerEmail: o.customer_email,
      deliveryAddress: o.delivery_address,
      deliveryArea: o.delivery_lga ? `${o.delivery_lga}, ${o.delivery_state}` : "Aba, Abia",
      notes: o.notes,
      items: oItems,
      status: o.status,
      isAtRisk: Boolean(o.is_at_risk),
      isLate: Boolean(o.is_late),
      createdAt: o.created_at,
      guaranteedDeliveryDate: o.guaranteed_delivery_date,
      assignedTailorId: o.assigned_tailor_id,
      assignedTailorName: o.assigned_tailor_name,
      paymentStatus: o.payment_status,
      paymentTier: deposit >= total ? "full_100" : "deposit_60",
      totalAmount: total,
      depositAmount: deposit,
      balanceAmount: Math.max(0, total - deposit),
      history: oHistory,
    };
  });

  const formattedBookings = bookings.map((b) => ({
    id: b.id,
    customerName: b.customer_name,
    customerPhone: b.customer_phone,
    venueType: b.venue_type,
    address: b.address,
    area: b.area,
    date: b.date,
    timeSlot: b.time_slot,
    sessionFee: 0,
    status: b.status,
    measurerId: b.measurer_id,
    measurerName: b.measurer_name,
    measurerPhone: "+234 803 910 4421",
    notes: b.notes,
    recordedMeasurements: b.recorded_measurements || undefined,
  }));

  const dataTsPath = "lib/data.ts";
  const content = fs.readFileSync(dataTsPath, "utf8");

  const startMarker = "export const INITIAL_ORDERS: Order[] =";
  const endMarker = "export const INITIAL_BULK_REQUESTS: BulkOrderRequest[] = [];";

  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error("Could not find markers in lib/data.ts");
  }

  const newSection = `export const INITIAL_ORDERS: Order[] = ${JSON.stringify(
    formattedOrders,
    null,
    2
  )};\n\nexport const INITIAL_BOOKINGS: MeasurementBooking[] = ${JSON.stringify(
    formattedBookings,
    null,
    2
  )};\n\n`;

  const updatedContent = content.slice(0, startIndex) + newSection + content.slice(endIndex);
  fs.writeFileSync(dataTsPath, updatedContent, "utf8");

  console.log("Successfully updated lib/data.ts with exact 5 Order-typed records and 3 Aba bookings!");
}

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
