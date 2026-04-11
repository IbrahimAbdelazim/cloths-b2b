# FactoryHub — B2B Manufacturing Marketplace

A proof-of-concept platform that connects manufacturers (factories) with retail store buyers in a wholesale B2B marketplace. Supporting multiple industries including apparel, footwear, bags, and accessories. Modeled after industry leaders like JOOR, NuOrder, and Faire, the platform provides three separate portals — each purpose-built for its role in the wholesale supply chain.

---

## Business Overview

The global wholesale manufacturing market operates on high-volume, relationship-driven transactions. Traditionally, retail buyers discover factories through trade shows, agents, or personal networks — a slow, opaque process with no standardized pricing or verification. **FactoryHub** digitizes this workflow:

- **Factories** select a subscription plan and industry type, then list their product catalog with bulk pricing tiers and MOQ (Minimum Order Quantity) requirements
- **Store owners** browse a curated, verified catalog across multiple product categories and place bulk orders directly
- **Admins** manage platform trust by verifying factory credentials (KYC) and approving products before they go live

### Core Concepts

| Concept                          | Description                                                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Subscription Plans**           | Factories choose from Starter ($49/mo), Professional ($149/mo), or Enterprise ($399/mo) plans with different product limits, features, and support levels.   |
| **Industry Types**               | Platform supports Apparel, Footwear, Bags, Accessories, and Other product categories for diverse manufacturing sectors.                                      |
| **MOQ (Minimum Order Quantity)** | Every product has a minimum order threshold (e.g. 50 units). Orders below MOQ are blocked.                                                                   |
| **Price Tiers**                  | Volume-based pricing — the more you order, the lower the unit price. Example: $8.50/unit for 50–99 units, $7.20/unit for 100–499 units, $6.00/unit for 500+. |
| **Factory KYC**                  | Factories must submit registration documents, select their industry type and subscription plan before passing an admin review.                               |
| **Product Approval**             | Every product submitted by a factory enters a `PENDING_APPROVAL` state and must be reviewed by an admin before becoming visible to buyers.                   |
| **Per-Factory Orders**           | In B2B wholesale, orders are placed per-factory (not as a single global cart). Each factory fulfills and ships its own orders independently.                 |

---

## Portals

### Admin Portal (`/admin`)

> Manages platform trust and operations

- **Dashboard** — KPI cards (pending factories, products to review, GMV, active orders) with inline approve/reject actions
- **Factory Management** — Full list with status filter tabs (All / Pending / Approved / Rejected / Suspended); detail page with business info, certifications, and action panel (approve/reject with reason)
- **Product Review** — Image gallery, price tier table, variant grid, factory info; approve or reject with feedback
- **Orders** — Platform-wide order monitoring with GMV totals
- **Users** — Demo user directory

**Design:** `zinc-950` sidebar + `violet-600` active states + `amber` pending badges

---

### Factory Portal (`/factory`)

> Manufacturers manage their catalog and fulfill orders

- **Dashboard** — Revenue bar chart, product/order stats, recent activity tables
- **Product Wizard (4 steps)**
  1. Basic Info — name, category, description, materials, lead time
  2. Pricing & MOQ — MOQ field + dynamic price tier builder (add/remove rows)
  3. Variants — color picker + multi-size select → auto-generated size × color stock matrix
  4. Review & Submit — save as Draft or submit for admin review
- **Product List** — Card grid with status badges; edit/resubmit flow for drafts and rejected items
- **Orders** — Incoming orders table; detail page with fulfillment panel (status update + tracking number)
- **Account** — Factory profile with certifications

**Design:** White background + `blue-600` active states + verified badge in sidebar

---

### Store Portal (`/store`)

> Retail buyers source and order wholesale products

- **Product Catalog** — Grid with search, category filter, MOQ range filter, and sort (newest / price / MOQ). Shows only admin-approved products.
- **Product Detail** — Image gallery with thumbnail strip; live price tier table (active tier highlights as quantity changes); color swatch + size selectors; MOQ validation with error state; real-time line total calculator; Add to Cart
- **Cart** — Items grouped by factory; per-line MOQ status (met / violated); recalculated price tiers based on quantity; per-factory "Place Order" button (disabled if MOQ violations exist)
- **Order History** — Status filter tabs; order cards with stacked thumbnails and tracking info
- **Order Detail** — Visual status stepper (Placed → Confirmed → Processing → Shipped → Delivered) with filled/pulsing/empty states; tracking info; shipping address; items breakdown
- **Account** — Store profile, spend stats, recent orders

**Design:** `gray-50` background + `white` cards + `indigo-600` active states + `emerald-700` prices

---

## Tech Stack

| Layer         | Technology                                                     |
| ------------- | -------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack)                             |
| Language      | TypeScript 5                                                   |
| Styling       | Tailwind CSS v4 (CSS-first config via `@theme {}`)             |
| UI Components | Radix UI primitives (manually styled — no registry dependency) |
| Notifications | Sonner (toast)                                                 |
| State         | React `useState` / `useEffect` / `useCallback`                 |
| Persistence   | `localStorage` (cart + role simulation)                        |
| Data          | TypeScript mock data files (no database)                       |
| Icons         | Lucide React                                                   |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/               # Split-panel auth shell
│   │   ├── login/            # Role-selector login + demo buttons
│   │   ├── pending/          # Factory awaiting approval
│   │   └── register/
│   │       ├── factory/      # 2-step factory registration
│   │       └── customer/     # Single-step buyer registration
│   ├── admin/                # Admin portal pages
│   ├── factory/              # Factory portal pages
│   ├── store/                # Store/buyer portal pages
│   ├── page.tsx              # Marketing landing page
│   └── not-found.tsx         # 404 page
├── components/
│   ├── ui/                   # Radix-based UI primitives
│   ├── layout/               # Sidebars, header, marketing nav
│   └── shared/               # StatusBadge, ConfirmDialog
├── data/                     # All mock data (TypeScript)
│   ├── factories.ts          # 8 factories (5 approved, 2 pending, 1 rejected)
│   ├── products.ts           # 12 products across factories
│   ├── orders.ts             # 5 orders in various statuses
│   └── users.ts              # 3 demo users (one per role)
├── hooks/
│   └── use-cart.ts           # localStorage cart with MOQ validation
├── lib/
│   └── utils.ts              # cn(), formatCurrency(), getPriceTierForQty()
└── types/
    └── index.ts              # All shared TypeScript types
```

---

## Demo Access

No real authentication — roles are simulated via `localStorage`. Use the quick-access buttons on the login page:

| Role        | Email                    | Password     | Redirects To |
| ----------- | ------------------------ | ------------ | ------------ |
| Admin       | `admin@factoryhub.com`   | `admin123`   | `/admin`     |
| Factory     | `factory@factoryhub.com` | `factory123` | `/factory`   |
| Store Owner | `store@factoryhub.com`   | `store123`   | `/store`     |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the marketing landing page.

```bash
npm run build      # Production build
npm run lint       # ESLint
```

---

## Mock Data

All data lives in `src/data/` and is imported directly by components — no API calls.

**Factories** (8 total):

- 5 `APPROVED` — Sunrise Garments (Bangladesh), BestWear Co. (Turkey), VietTex (Vietnam), Porto Textile (Portugal), IndiaFab (India)
- 2 `PENDING` — Horizon Apparel (China), Nile Cotton (Egypt)
- 1 `REJECTED` — FastFashion Co. (Pakistan)

**Products** (12 total across approved factories):

- Categories: T-Shirts, Denim, Activewear, Knitwear, Formal Shirts, Outerwear
- MOQ range: 50 – 500 units
- Price tiers: typically 3 per product (50–99 / 100–499 / 500+)

**Orders** (5 total, statuses): `DELIVERED`, `SHIPPED`, `PROCESSING`, `CONFIRMED`, `PENDING`
