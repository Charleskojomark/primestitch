const { neon } = require('@neondatabase/serverless');

const url = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_4kbHBEsIz1xO@ep-dry-river-bdw9bv06-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const sql = neon(url);

async function initDb() {
  console.log("Initializing PrimeStitch tables in Neon PostgreSQL...");

  // 1. Users table
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(64) PRIMARY KEY,
      clerk_id VARCHAR(128) UNIQUE,
      email VARCHAR(255) UNIQUE,
      name VARCHAR(255),
      phone VARCHAR(64),
      role VARCHAR(32) NOT NULL DEFAULT 'CUSTOMER',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  console.log("✓ users table ready");

  // 2. Measurements table
  await sql`
    CREATE TABLE IF NOT EXISTS measurements (
      id VARCHAR(64) PRIMARY KEY,
      user_id VARCHAR(64) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      customer_phone VARCHAR(64),
      customer_email VARCHAR(255),
      unit VARCHAR(16) NOT NULL DEFAULT 'in',
      chest NUMERIC(5,2),
      shoulder NUMERIC(5,2),
      sleeve_length NUMERIC(5,2),
      neck NUMERIC(5,2),
      waist NUMERIC(5,2),
      trouser_length NUMERIC(5,2),
      hips NUMERIC(5,2),
      bicep NUMERIC(5,2),
      thigh NUMERIC(5,2),
      verified_at TIMESTAMPTZ,
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  console.log("✓ measurements table ready");

  // 3. Orders table
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(64) PRIMARY KEY,
      user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
      customer_name VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(64) NOT NULL,
      customer_email VARCHAR(255),
      delivery_address TEXT NOT NULL,
      delivery_state VARCHAR(128) NOT NULL,
      delivery_lga VARCHAR(128) NOT NULL,
      status VARCHAR(64) NOT NULL DEFAULT 'Measurement Intake',
      guaranteed_delivery_date TIMESTAMPTZ NOT NULL,
      total_amount NUMERIC(12,2) NOT NULL,
      deposit_amount NUMERIC(12,2) NOT NULL,
      payment_status VARCHAR(64) NOT NULL DEFAULT 'deposit_paid',
      assigned_tailor_id VARCHAR(64),
      assigned_tailor_name VARCHAR(255),
      notes TEXT,
      is_late BOOLEAN NOT NULL DEFAULT FALSE,
      is_at_risk BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  console.log("✓ orders table ready");

  // 4. Order items table
  await sql`
    CREATE TABLE IF NOT EXISTS order_items (
      id VARCHAR(64) PRIMARY KEY,
      order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      design_id VARCHAR(64) NOT NULL,
      design_name VARCHAR(255) NOT NULL,
      fabric_id VARCHAR(64) NOT NULL,
      fabric_name VARCHAR(255) NOT NULL,
      color_name VARCHAR(128) NOT NULL,
      color_hex VARCHAR(32) NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      unit_price NUMERIC(12,2) NOT NULL,
      measurements JSONB
    );
  `;
  console.log("✓ order_items table ready");

  // 5. Order status history
  await sql`
    CREATE TABLE IF NOT EXISTS order_status_history (
      id VARCHAR(64) PRIMARY KEY,
      order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      stage VARCHAR(64) NOT NULL,
      timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      notes TEXT
    );
  `;
  console.log("✓ order_status_history table ready");

  // 6. Bookings table
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id VARCHAR(64) PRIMARY KEY,
      user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
      customer_name VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(64) NOT NULL,
      address TEXT NOT NULL,
      area VARCHAR(128) NOT NULL,
      state VARCHAR(128) NOT NULL,
      venue_type VARCHAR(64) NOT NULL DEFAULT 'home',
      date VARCHAR(64) NOT NULL,
      time_slot VARCHAR(64) NOT NULL,
      status VARCHAR(64) NOT NULL DEFAULT 'scheduled',
      measurer_id VARCHAR(64),
      measurer_name VARCHAR(255),
      recorded_measurements JSONB,
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  console.log("✓ bookings table ready");

  // 7. Staff table
  await sql`
    CREATE TABLE IF NOT EXISTS staff (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(32) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(64),
      area VARCHAR(128),
      active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  console.log("✓ staff table ready");

  // Seed default staff benches if empty
  const existingStaff = await sql`SELECT count(*) FROM staff;`;
  if (parseInt(existingStaff[0].count, 10) === 0) {
    await sql`
      INSERT INTO staff (id, name, role, email, phone, area, active) VALUES
      ('admin-01', 'Chinedu Eze', 'ADMIN', 'chinedu@primestitch.ng', '+234 803 492 8110', 'Aba Master Atelier', TRUE),
      ('tl-01', 'Master Tunde Balogun', 'TAILOR', 'tunde@primestitch.ng', '+234 802 334 1101', 'Bench 1 - Senators', TRUE),
      ('tl-02', 'Emeka Okafor', 'TAILOR', 'emeka@primestitch.ng', '+234 803 556 2202', 'Bench 2 - Agbada & Isiagu', TRUE),
      ('tl-03', 'Ibrahim Musa', 'TAILOR', 'ibrahim@primestitch.ng', '+234 805 778 3303', 'Bench 3 - Kaftans & Linens', TRUE),
      ('ms-01', 'Segun Adeleke', 'MEASURER', 'segun@primestitch.ng', '+234 806 889 4404', 'Lekki & Ikoyi Corridor', TRUE),
      ('ms-02', 'Kelechi Iheanacho', 'MEASURER', 'kelechi@primestitch.ng', '+234 807 990 5505', 'Ikeja & GRA Zone', TRUE),
      ('ms-03', 'Uche Nwosu', 'MEASURER', 'uche@primestitch.ng', '+234 809 112 6606', 'Aba Metropolitan', TRUE);
    `;
    console.log("✓ staff benches seeded");
  }

  console.log("\nDATABASE SCHEMA INITIALIZATION COMPLETE!");
}

initDb().catch(console.error);

