# ClothsB2B — Product Requirements Document

**Version:** 1.0
**Date:** April 27, 2026
**Status:** Draft — Pending Approval
**Owner:** TBD

---

## Executive Summary

ClothsB2B is a wholesale clothing marketplace that connects verified garment manufacturers (factories) with retail store buyers. The platform replaces fragmented trade show, email, and WhatsApp-based sourcing with a structured digital marketplace — enabling buyers to discover vetted suppliers, negotiate minimum order quantities, and place bulk orders in one place.

The goal of this document is to define **what** we are building, **for whom**, and **why** — without prescribing how to build it.

---

## Problem Statement

### For Store Buyers
- Discovering reliable wholesale suppliers requires attending trade shows or relying on personal networks
- No standardized way to compare bulk pricing across suppliers
- Order minimums, lead times, and sample policies are inconsistently communicated
- No visibility into order status after placement

### For Garment Factories
- Reaching international buyers beyond their existing network is expensive and slow
- No structured channel to showcase product catalogs with tiered pricing
- Manual order management creates errors and delays
- Credibility is hard to demonstrate to new buyers without a verified profile

### For the Market
- The B2B clothing wholesale market processes over $700B annually yet remains largely offline or on generic B2B directories with no transaction capability

---

## Goals & Success Metrics

| Goal | Metric | Target (Year 1) |
|---|---|---|
| Factory supply growth | Verified factories on platform | 200+ |
| Buyer demand growth | Active buying accounts | 1,000+ |
| Transaction volume | Gross Merchandise Value (GMV) | $5M+ |
| Trust & quality | Factory approval rate | < 60% (selective) |
| Buyer retention | Repeat order rate | > 40% |
| Operational efficiency | Order dispute rate | < 2% |

---

## Who We're Building For

### Persona 1 — The Boutique Buyer (Primary)

> "I run a small women's fashion boutique in London. I need fresh inventory every season but can't afford trade show travel. I want to find consistent suppliers who understand small batch orders."

- **Company size:** 1–5 employees
- **Annual purchasing:** $50K–$200K
- **Pain:** Finding suppliers who accept MOQs under 500 units
- **Motivation:** Unique product assortment, competitive pricing, reliable lead times

### Persona 2 — The Factory Sales Manager (Primary)

> "Our factory produces 50,000 units/month but our sales team still cold-emails buyers from LinkedIn. I want inbound leads from verified buyers who are ready to order."

- **Company size:** 50–500 factory employees
- **Geography:** Bangladesh, Turkey, Vietnam, India, Portugal
- **Pain:** High cost of international sales, slow payment cycles
- **Motivation:** Higher capacity utilization, direct buyer relationships

### Persona 3 — The Platform Admin (Internal)

> "I need to ensure every factory on this platform is legitimate and every product meets quality standards before buyers can see it."

- **Role:** Trust & Safety / Operations team
- **Need:** Efficient review workflow for factory KYC and product approvals
- **Motivation:** Platform integrity, buyer trust, regulatory compliance

---

## User Journeys

### Factory Journey

```
Register → Submit KYC documents → Admin reviews (1–3 days) →
Approved → List products with pricing tiers →
Receive orders → Fulfill & update tracking → Get paid
```

### Buyer Journey

```
Register → Browse verified supplier catalog →
Filter by category / MOQ / country → View product detail →
Configure order (size, color, quantity) → Place order →
Track fulfillment → Receive goods → Leave review
```

### Admin Journey

```
Review factory applications → Approve / Reject with reason →
Review product submissions → Approve / Reject →
Monitor order disputes → Generate platform reports
```

---

## Features

### Must Have — Launch

| Feature | Who Benefits | Why It's Critical |
|---|---|---|
| Factory registration & KYC | Factories | Platform credibility depends on verified supply |
| Admin approval workflow | Admin | Trust & safety gate for all supply |
| Product catalog with tiered pricing | Buyers | Core browsing + buying experience |
| MOQ-aware order placement | Buyers | Prevents invalid orders at checkout |
| Order management dashboard | Factories | Factories must be able to fulfill |
| Order tracking for buyers | Buyers | Post-purchase visibility drives repeat orders |
| Role-based access (Admin / Factory / Buyer) | All | Prevents data leakage between user types |

### Should Have — 3 Months Post-Launch

| Feature | Who Benefits | Why |
|---|---|---|
| Sample request flow | Buyers | Reduces first-order risk, increases conversion |
| Factory review & rating | Buyers | Social proof drives discovery |
| Bulk re-order (repeat order) | Buyers | Retention and GMV growth |
| Email notifications (order updates) | All | Reduces support load |
| Product search & filters | Buyers | Discoverability at scale |
| Factory analytics dashboard | Factories | Drives factory engagement and retention |

### Nice to Have — 6+ Months

| Feature | Who Benefits |
|---|---|
| In-platform messaging (buyer ↔ factory) | Both |
| Net-30/60 payment terms via Stripe | Buyers |
| Customs & shipping estimation | Buyers |
| Multi-currency pricing | Buyers / Factories |
| Verified sustainability certifications (OEKO-TEX, GOTS) | Both |
| API for ERP integration | Enterprise buyers |

### Out of Scope

- Logistics / freight forwarding (we connect, we don't ship)
- Product quality inspection services (third-party referral only)
- Consumer-facing (B2C) selling
- Custom manufacturing requests / RFQ flow (Phase 2+)

---

## User Stories

### Factory

- As a factory, I want to submit my company documents for verification so that buyers trust I am a legitimate manufacturer
- As a factory, I want to create product listings with size/color variants and MOQ tiers so that buyers understand my pricing at different volumes
- As a factory, I want to receive order notifications immediately so that I can plan production without delays
- As a factory, I want to mark orders as shipped and enter a tracking number so that buyers know where their goods are

### Buyer

- As a buyer, I want to filter products by category, minimum order quantity, and country of origin so that I find suppliers that match my business requirements
- As a buyer, I want to see how unit price changes at different order quantities so that I can make cost-effective purchasing decisions
- As a buyer, I want to add products from multiple factories to my cart and place separate orders per factory so that each supplier receives their own order
- As a buyer, I want to track my order status in real time so that I can plan my inventory restocking

### Admin

- As an admin, I want to review factory KYC documents and approve or reject applications with a written reason so that only legitimate suppliers access the platform
- As an admin, I want to review product listings before they go live so that quality and policy standards are maintained
- As an admin, I want to see platform-level metrics (GMV, orders, pending reviews) on a dashboard so that I can monitor platform health daily

---

## Constraints & Assumptions

### Constraints
- Platform must support buyers and factories in different legal jurisdictions (data residency to be scoped per market)
- Payments must comply with relevant AML/KYC regulations for the geographies we operate in
- Factory KYC review must be completable within 3 business days (SLA)

### Assumptions
- Factories will self-serve product listing creation (no white-glove onboarding in v1)
- Buyers are pre-qualified as business entities (not individual consumers)
- Platform does not hold inventory or take title to goods — it is a marketplace, not a retailer
- Currency: USD primary in v1, with multi-currency support in v2

---

## Open Questions

| Question | Owner | Due |
|---|---|---|
| What KYC documents will we accept per country? | Legal / Operations | — |
| Do we take a % commission or charge subscription fees to factories? | Business / Finance | — |
| What is our dispute resolution process if goods don't arrive? | Operations | — |
| Do we need escrow for payments or trust Stripe's standard flow? | Finance / Legal | — |
| Which countries do we launch in first? | CEO / BD | — |

---

## Glossary

| Term | Definition |
|---|---|
| MOQ | Minimum Order Quantity — the minimum number of units a factory requires per order |
| KYC | Know Your Customer — identity and legitimacy verification for factories |
| Price Tier | Volume-based pricing where unit price decreases at higher quantities |
| GMV | Gross Merchandise Value — total value of orders placed through the platform |
| Factory | A garment manufacturer who supplies products in bulk |
| Buyer / Store Owner | A retail business purchasing wholesale goods for resale |
