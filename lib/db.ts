import { neon } from "@neondatabase/serverless";

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_4kbHBEsIz1xO@ep-dry-river-bdw9bv06-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const sql = neon(databaseUrl);

// ORDERS
export async function getOrders() {
  const orders = await sql`
    SELECT * FROM orders ORDER BY created_at DESC;
  `;
  const items = await sql`
    SELECT * FROM order_items;
  `;
  const histories = await sql`
    SELECT * FROM order_status_history ORDER BY timestamp ASC;
  `;

  return orders.map((o: any) => ({
    id: o.id,
    userId: o.user_id,
    customerName: o.customer_name,
    customerPhone: o.customer_phone,
    customerEmail: o.customer_email,
    deliveryAddress: o.delivery_address,
    deliveryState: o.delivery_state,
    deliveryLga: o.delivery_lga,
    status: o.status,
    guaranteedDeliveryDate: o.guaranteed_delivery_date,
    totalAmount: Number(o.total_amount),
    depositAmount: Number(o.deposit_amount),
    paymentStatus: o.payment_status,
    assignedTailorId: o.assigned_tailor_id,
    assignedTailorName: o.assigned_tailor_name,
    notes: o.notes,
    isLate: o.is_late,
    isAtRisk: o.is_at_risk,
    createdAt: o.created_at,
    items: items
      .filter((it: any) => it.order_id === o.id)
      .map((it: any) => ({
        id: it.id,
        designId: it.design_id,
        designName: it.design_name,
        fabricId: it.fabric_id,
        fabricName: it.fabric_name,
        colorName: it.color_name,
        colorHex: it.color_hex,
        quantity: it.quantity,
        unitPrice: Number(it.unit_price),
        measurements: it.measurements,
      })),
    statusHistory: histories
      .filter((h: any) => h.order_id === o.id)
      .map((h: any) => ({
        stage: h.stage,
        timestamp: h.timestamp,
        notes: h.notes,
      })),
  }));
}

export async function getOrderById(id: string) {
  const normalizedId = id.startsWith("#") ? id : `#${id}`;
  const rawOrders = await sql`
    SELECT * FROM orders WHERE id = ${normalizedId} OR id = ${id} LIMIT 1;
  `;
  if (!rawOrders.length) return null;
  const o = rawOrders[0];

  const items = await sql`
    SELECT * FROM order_items WHERE order_id = ${o.id};
  `;
  const history = await sql`
    SELECT * FROM order_status_history WHERE order_id = ${o.id} ORDER BY timestamp ASC;
  `;

  return {
    id: o.id,
    userId: o.user_id,
    customerName: o.customer_name,
    customerPhone: o.customer_phone,
    customerEmail: o.customer_email,
    deliveryAddress: o.delivery_address,
    deliveryState: o.delivery_state,
    deliveryLga: o.delivery_lga,
    status: o.status,
    guaranteedDeliveryDate: o.guaranteed_delivery_date,
    totalAmount: Number(o.total_amount),
    depositAmount: Number(o.deposit_amount),
    paymentStatus: o.payment_status,
    assignedTailorId: o.assigned_tailor_id,
    assignedTailorName: o.assigned_tailor_name,
    notes: o.notes,
    isLate: o.is_late,
    isAtRisk: o.is_at_risk,
    createdAt: o.created_at,
    items: items.map((it: any) => ({
      id: it.id,
      designId: it.design_id,
      designName: it.design_name,
      fabricId: it.fabric_id,
      fabricName: it.fabric_name,
      colorName: it.color_name,
      colorHex: it.color_hex,
      quantity: it.quantity,
      unitPrice: Number(it.unit_price),
      measurements: it.measurements,
    })),
    statusHistory: history.map((h: any) => ({
      stage: h.stage,
      timestamp: h.timestamp,
      notes: h.notes,
    })),
  };
}

export async function createOrder(data: any) {
  const id = data.id || `#PS-${Math.floor(1000 + Math.random() * 9000)}`;

  await sql`
    INSERT INTO orders (
      id, user_id, customer_name, customer_phone, customer_email,
      delivery_address, delivery_state, delivery_lga, status,
      guaranteed_delivery_date, total_amount, deposit_amount,
      payment_status, assigned_tailor_id, assigned_tailor_name,
      notes, is_late, is_at_risk
    ) VALUES (
      ${id},
      ${data.userId || null},
      ${data.customerName},
      ${data.customerPhone},
      ${data.customerEmail || null},
      ${data.deliveryAddress},
      ${data.deliveryState},
      ${data.deliveryLga},
      ${data.status || "Measurement Intake"},
      ${new Date(data.guaranteedDeliveryDate).toISOString()},
      ${data.totalAmount},
      ${data.depositAmount || data.totalAmount * 0.6},
      ${data.paymentStatus || "deposit_paid"},
      ${data.assignedTailorId || "tl-01"},
      ${data.assignedTailorName || "Master Tunde Balogun"},
      ${data.notes || null},
      ${data.isLate || false},
      ${data.isAtRisk || false}
    );
  `;

  // Insert items
  if (data.items && Array.isArray(data.items)) {
    for (const it of data.items) {
      const itemId = it.id || `item-${Math.floor(100000 + Math.random() * 900000)}`;
      await sql`
        INSERT INTO order_items (
          id, order_id, design_id, design_name, fabric_id,
          fabric_name, color_name, color_hex, quantity,
          unit_price, measurements
        ) VALUES (
          ${itemId},
          ${id},
          ${it.designId || "senator-01"},
          ${it.designName || "Bespoke Senator Suit"},
          ${it.fabricId || "fab-01"},
          ${it.fabricName || "Super 160s Wool"},
          ${it.colorName || "Midnight Navy"},
          ${it.colorHex || "#0B1528"},
          ${it.quantity || 1},
          ${it.unitPrice || 58000},
          ${it.measurements ? JSON.stringify(it.measurements) : null}
        );
      `;
    }
  }

  // Initial stage history
  await sql`
    INSERT INTO order_status_history (
      id, order_id, stage, notes
    ) VALUES (
      ${`hist-${Date.now()}`},
      ${id},
      ${data.status || "Measurement Intake"},
      ${"Order confirmed and entered bespoke production pipeline."}
    );
  `;

  return getOrderById(id);
}

export async function updateOrderStatus(orderId: string, stage: string, notes?: string) {
  const normalizedId = orderId.startsWith("#") ? orderId : `#${orderId}`;

  await sql`
    UPDATE orders
    SET status = ${stage}, updated_at = NOW()
    WHERE id = ${normalizedId} OR id = ${orderId};
  `;

  await sql`
    INSERT INTO order_status_history (id, order_id, stage, notes)
    VALUES (${`hist-${Date.now()}`}, ${normalizedId}, ${stage}, ${notes || null});
  `;

  return getOrderById(normalizedId);
}

export async function assignTailor(orderId: string, tailorId: string, tailorName: string) {
  const normalizedId = orderId.startsWith("#") ? orderId : `#${orderId}`;

  await sql`
    UPDATE orders
    SET assigned_tailor_id = ${tailorId}, assigned_tailor_name = ${tailorName}, updated_at = NOW()
    WHERE id = ${normalizedId} OR id = ${orderId};
  `;

  return getOrderById(normalizedId);
}

// BOOKINGS
export async function getBookings() {
  const rows = await sql`
    SELECT * FROM bookings ORDER BY created_at DESC;
  `;

  return rows.map((b: any) => ({
    id: b.id,
    userId: b.user_id,
    customerName: b.customer_name,
    customerPhone: b.customer_phone,
    address: b.address,
    area: b.area,
    state: b.state,
    venueType: b.venue_type,
    date: b.date,
    timeSlot: b.time_slot,
    status: b.status,
    measurerId: b.measurer_id,
    measurerName: b.measurer_name,
    recordedMeasurements: b.recorded_measurements,
    notes: b.notes,
    createdAt: b.created_at,
  }));
}

export async function createBooking(data: any) {
  const id = data.id || `BK-${Math.floor(100 + Math.random() * 900)}`;

  await sql`
    INSERT INTO bookings (
      id, user_id, customer_name, customer_phone, address,
      area, state, venue_type, date, time_slot,
      status, measurer_id, measurer_name, notes
    ) VALUES (
      ${id},
      ${data.userId || null},
      ${data.customerName},
      ${data.customerPhone},
      ${data.address},
      ${data.area},
      ${data.state},
      ${data.venueType || "home"},
      ${data.date},
      ${data.timeSlot},
      ${data.status || "scheduled"},
      ${data.measurerId || "ms-01"},
      ${data.measurerName || "Segun Adeleke"},
      ${data.notes || null}
    );
  `;

  const rows = await sql`SELECT * FROM bookings WHERE id = ${id} LIMIT 1;`;
  return rows[0];
}

export async function updateBooking(id: string, updates: any) {
  if (updates.status && updates.recordedMeasurements) {
    await sql`
      UPDATE bookings
      SET status = ${updates.status},
          recorded_measurements = ${JSON.stringify(updates.recordedMeasurements)},
          notes = ${updates.notes || null},
          updated_at = NOW()
      WHERE id = ${id};
    `;
  } else if (updates.status) {
    await sql`
      UPDATE bookings
      SET status = ${updates.status}, updated_at = NOW()
      WHERE id = ${id};
    `;
  } else if (updates.measurerId) {
    await sql`
      UPDATE bookings
      SET measurer_id = ${updates.measurerId}, measurer_name = ${updates.measurerName}, updated_at = NOW()
      WHERE id = ${id};
    `;
  }

  const rows = await sql`SELECT * FROM bookings WHERE id = ${id} LIMIT 1;`;
  return rows[0];
}

// STAFF
export async function getStaff() {
  const rows = await sql`
    SELECT * FROM staff WHERE active = TRUE ORDER BY id ASC;
  `;

  return rows.map((s: any) => ({
    id: s.id,
    name: s.name,
    role: s.role.toLowerCase(),
    email: s.email,
    phone: s.phone,
    area: s.area,
    active: s.active,
  }));
}

// DESIGNS (Garment Lookbook Catalog synced with Cloudinary & Neon DB)
export async function getDesigns() {
  const rows = await sql`
    SELECT * FROM designs ORDER BY created_at DESC;
  `;

  return rows.map((d: any) => ({
    id: d.id,
    slug: d.slug || d.id,
    name: d.name,
    styleCode: d.style_code,
    category: d.category,
    startingPrice: Number(d.starting_price),
    description: d.description || "",
    heroImage: d.hero_image,
    imageAlt: d.image_alt || d.name,
    imageDimensions: d.image_dimensions || "1200 × 1600 px (3:4)",
    videoUrl: d.video_url || undefined,
    standardLeadDays: Number(d.standard_lead_days || 7),
    featured: d.featured !== false,
    fabrics: d.fabrics || [],
    availableColors: d.available_colors || [],
    createdAt: d.created_at,
  }));
}

export async function createDesign(data: any) {
  const id = data.id || `des-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
  const slug = data.slug || id;
  const standardLeadDays = Number(data.standardLeadDays || 7);
  const startingPrice = Number(data.startingPrice || 55000);
  const featured = data.featured !== false;

  await sql`
    INSERT INTO designs (
      id, slug, name, style_code, category, starting_price,
      description, hero_image, image_alt, image_dimensions,
      video_url, standard_lead_days, featured, fabrics, available_colors
    ) VALUES (
      ${id},
      ${slug},
      ${data.name},
      ${data.styleCode || null},
      ${data.category || "Traditional"},
      ${startingPrice},
      ${data.description || null},
      ${data.heroImage},
      ${data.imageAlt || null},
      ${data.imageDimensions || "1200 × 1600 px (3:4)"},
      ${data.videoUrl || null},
      ${standardLeadDays},
      ${featured},
      ${JSON.stringify(data.fabrics || [])},
      ${JSON.stringify(data.availableColors || [])}
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      style_code = EXCLUDED.style_code,
      category = EXCLUDED.category,
      starting_price = EXCLUDED.starting_price,
      description = EXCLUDED.description,
      hero_image = EXCLUDED.hero_image,
      video_url = EXCLUDED.video_url,
      updated_at = NOW();
  `;

  const rows = await sql`SELECT * FROM designs WHERE id = ${id} LIMIT 1;`;
  return rows[0];
}

export async function createBatchDesigns(designsList: any[]) {
  const results = [];
  for (const item of designsList) {
    const created = await createDesign(item);
    results.push(created);
  }
  return results;
}
