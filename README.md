# PrimeStitch — Tailored. On time.

> Nigeria's premier made-to-measure tailoring house and digital atelier platform. Delivering bespoke native menswear and ceremonial attire with guaranteed delivery dates and transparent stage-by-stage tracking.

🌐 **Live Platform:** [https://primestitch.favvybillionz.studio](https://primestitch.favvybillionz.studio)

---

## 📌 Overview

PrimeStitch combines the heritage craftsmanship of Aba tailors with modern operational logistics to eliminate the common delays and uncertainties in traditional tailoring. Every garment is assigned to an accredited master tailor with real-time production tracking and an exact delivery date SLA.

---

## ✨ Key Features

- **Made-to-Measure Catalogue:** Browse curated bespoke silhouettes (Senator suits, architectural kaftans, Isiagu sets, and formal shirts) with dynamic fabric selection and live delivery date estimation.
- **Doorstep Measurement Network:** Book certified field measurers for in-person measurement sessions across key commercial and residential hubs.
- **9-Stage Production Tracking:** Transparent milestone tracking from order receipt to fabric cutting, sewing, hand-finishing, quality check, and final handover.
- **Delivery Date SLA Guarantee:** Automatic capacity-aware scheduling ensures garments are finished and dispatched on or before the committed date.
- **Bulk & Aso Ebi Coordination:** Dedicated workflows for weddings and corporate orders (20+ pieces) with staggered delivery coordination.
- **Operations & Atelier Workstation:** Comprehensive production dashboard for monitoring bench workloads, quality audits, fitter schedules, and garment lookbook dispatch.

---

## 🛠️ Tech Stack

- **Frontend & Routing:** [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/) with custom atelier design tokens
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data & Storage:** Cloud PostgreSQL with serverless connectivity & media CDN integration
- **Authentication:** Role-based session management for operations, tailors, and field measurers

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### 1. Clone & Install

```bash
git clone https://github.com/Charleskojomark/primestitch.git
cd primestitch
npm install
```

### 2. Environment Configuration

Create a local `.env.local` file in the root directory using generic placeholders (never commit actual secrets to version control):

```bash
cp .env.example .env.local
```

Ensure your environment configuration includes:
- Authentication public and secret keys
- Database connection string
- Storage and CDN service configuration

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 🔒 Security & Best Practices

- **Sanitized Credentials:** All database credentials, storage tokens, and authentication secrets are strictly managed via environment variables and excluded from source control.
- **Session Protection:** Administrative and operational workstations require authenticated staff credentials before accessing production pipelines.
- **Input Sanitization:** All customer inputs, measurement specifications, and media uploads undergo client and server validation.

---

## 📄 License

Proprietary © PrimeStitch Atelier. All rights reserved.
