# MizanIQ

> **Balanced Intelligence for Smarter Ad Decisions** &nbsp;·&nbsp; ذكاء متوازن لقرارات إعلانية أذكى

AI-powered bilingual media-buying intelligence platform. A command center for media buyers and agencies to monitor performance, audit tracking, and act on prioritized recommendations across Meta, Google, and TikTok ads — with full transparency on data confidence.

> **Honest Intelligence**: every metric and recommendation discloses its `source`, `confidence`, `lastSynced`, and `limitation`. No black boxes.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Available Scripts](#available-scripts)
- [Routing & Locales](#routing--locales)
- [Theming](#theming)
- [Demo Data](#demo-data)
- [Conventions](#conventions)
- [Sprint Status](#sprint-status)
- [Next Implementation Steps](#next-implementation-steps)

---

## Features

| Area | Status | Notes |
| --- | --- | --- |
| Bilingual UI (EN + AR with RTL) | ✅ | next-intl, locale-aware fonts (Inter / Cairo) |
| Light & Dark themes | ✅ | next-themes, Tailwind v4 with `@custom-variant dark` |
| Landing page | ✅ | Hero, features, how-it-works, pricing, CTA |
| Auth shell (login / signup / demo mode) | ✅ | NextAuth v5 (Credentials provider), demo bypass |
| Multi-client agency dashboard | ✅ | Health scores, alerts, performance summary (demo data) |
| Performance analytics | ✅ | ROAS, CPA, CTR, CPM, platform breakdown |
| Tracking audit | ✅ | Pixel & event status table with severity |
| Funnel analyzer | ✅ | Per-client funnel visualization |
| Budget intelligence | ✅ | Pacing + AI-style recommendations |
| Action center | ✅ | Prioritized actions with reasoning |
| Campaign tools | ✅ | Builder templates, naming convention, UTM builder, A/B testing |
| AI prompt library | ✅ | Bilingual prompts (copy, strategy, analysis) |
| Creative intelligence | ✅ | Fatigue detection table |
| VIP reports | ✅ | Reports library (UI scaffold) |
| Settings & Docs | ✅ | Profile, integrations, notifications, knowledge base |
| Prisma schema | ✅ | Full data model: workspace, clients, campaigns, metrics, audits, alerts, recommendations, etc. |
| Demo seed | ✅ | 3 demo clients with realistic data marked `source: "demo"` |
| Real platform integrations | ⏳ | Planned (Meta / Google / TikTok APIs) |
| Real anomaly detection | ⏳ | Planned (currently rule-engine + demo) |

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, **proxy** middleware convention)
- **UI**: React 19 · Tailwind CSS 4 · [lucide-react](https://lucide.dev/) icons
- **i18n**: [next-intl 4](https://next-intl.dev/) (English + Arabic with RTL)
- **Auth**: [NextAuth v5 / Auth.js](https://authjs.dev/) (Credentials provider)
- **Database**: PostgreSQL via [Prisma 5](https://www.prisma.io/)
- **Forms**: react-hook-form + Zod
- **Charts**: Recharts
- **Themes**: next-themes (light / dark / system)
- **Fonts**: Inter (Latin) and Cairo (Arabic) loaded via `next/font/google`

---

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma          # Full data model (User, Workspace, Client, Campaign, MetricSnapshot, …)
│   └── seed.ts                # Demo workspace + 3 clients + metrics + alerts + recommendations
├── public/
│   ├── logo.png               # Light-mode logo (icon + wordmark)
│   ├── logo-dark.png          # Dark-mode logo
│   └── icon.png               # Square icon for collapsed sidebar / favicon
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (auth)/        # Authenticated app (uses AppShell)
│   │   │   │   ├── dashboard/
│   │   │   │   ├── clients/
│   │   │   │   ├── performance/
│   │   │   │   ├── tracking/
│   │   │   │   ├── funnel/
│   │   │   │   ├── budget/
│   │   │   │   │   ├── recommendations/
│   │   │   │   │   └── pacing/
│   │   │   │   ├── actions/
│   │   │   │   ├── campaigns/
│   │   │   │   │   ├── builder/
│   │   │   │   │   ├── naming/
│   │   │   │   │   └── testing/
│   │   │   │   ├── creative/intelligence/
│   │   │   │   ├── prompts/
│   │   │   │   ├── reports/
│   │   │   │   ├── settings/
│   │   │   │   └── docs/
│   │   │   ├── (public)/      # Public pages (no AppShell)
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   ├── layout.tsx     # Locale layout: theme + i18n providers + fonts
│   │   │   └── page.tsx       # Landing page
│   │   ├── api/
│   │   │   └── auth/[...nextauth]/route.ts
│   │   ├── globals.css
│   │   └── layout.tsx         # Root layout (metadata only)
│   ├── components/
│   │   ├── layout/            # AppShell, Sidebar, Topbar
│   │   ├── providers/         # ThemeProvider
│   │   ├── shared/            # Logo, MetricCard, PageHeader, HonestTooltip, ConfidenceBadge, SourceBadge, EmptyState, ComingSoon
│   │   └── ui/                # Button, Card, Badge, Input, Label
│   ├── data/
│   │   └── demo-clients.ts    # Static demo data (used directly by client components)
│   ├── i18n/
│   │   ├── config.ts          # locales, default, direction
│   │   ├── routing.ts         # next-intl routing
│   │   ├── request.ts
│   │   └── messages/          # en.json, ar.json
│   ├── lib/                   # auth.ts, db.ts, utils.ts, constants.ts
│   ├── types/                 # honest-intelligence.ts, index.ts
│   └── proxy.ts               # next-intl routing (Next.js 16 "proxy" convention)
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Quick Start

### Prerequisites

- **Node.js 20+**
- **PostgreSQL 14+** (running locally or via Docker)
- **npm** (or pnpm / yarn — adapt commands accordingly)

### 1. Install

```bash
git clone https://github.com/Echodrphp/MizanIQ.git
cd MizanIQ
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
- Set `DATABASE_URL` to your local PostgreSQL connection string.
- Set `NEXTAUTH_SECRET` (`openssl rand -base64 32`).
- Optionally toggle `NEXT_PUBLIC_DEMO_MODE` and update demo credentials.

### 3. Database

```bash
npm run db:push      # apply schema to your DB
npm run db:seed      # insert demo workspace + clients + metrics
```

### 4. Run

```bash
npm run dev          # http://localhost:3000
```

You can browse without DB: the public pages and dashboard render entirely from static demo data inside `src/data/demo-clients.ts` (every value carries `source: "demo"`). Auth flows that need a real user require the seed.

### 5. Production

```bash
npm run build
npm run start
```

---

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | yes | PostgreSQL connection string used by Prisma |
| `NEXTAUTH_SECRET` | yes | NextAuth JWT/session secret |
| `NEXTAUTH_URL` | yes (prod) | Public URL of the app (e.g. `https://app.mizaniq.com`) |
| `NEXT_PUBLIC_DEMO_MODE` | optional | `"true"` enables a demo bypass on the login page |
| `DEMO_USER_EMAIL` | optional | Email accepted in demo mode |
| `DEMO_USER_PASSWORD` | optional | Password accepted in demo mode |

See [`.env.example`](./.env.example) for a working template.

---

## Database Setup

The Prisma schema (`prisma/schema.prisma`) defines:

- **Account / Session / VerificationToken / User** — NextAuth tables + user prefs
- **Workspace / WorkspaceMember** — agency/individual workspaces with role-based membership
- **Client / ClientTarget** — tenant clients with monthly budget, target CPA/CPL/ROAS, etc.
- **Campaign / MetricSnapshot** — campaign metadata + daily blended/campaign-level metrics
- **ClientSuccessScore** — composite health score with subscores (tracking, performance, budget, creative, funnel, action discipline)
- **TrackingAudit** — pixel/CAPI/event audit results
- **Recommendation / ActionItem / Alert** — AI/rule outputs that feed the Action Center
- **BudgetPacing / FunnelSnapshot** — derived analytics
- **Report** — generated VIP reports (draft / approved / shared)
- **Integration** — connected ad platforms
- **AuditLog / Notification** — workspace audit + user notifications

Every analytical model carries:
- `source` (`official_api` · `platform_reported` · `store_actual` · `manual_input` · `estimated` · `inferred` · `third_party` · `demo`)
- `confidence` (`high` · `medium` · `low` · `unknown`)
- `lastSynced` / `calculatedAt`
- `limitation?` (free text disclosure)

This metadata powers the `<HonestTooltip />` UI component everywhere.

---

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:push` | Push schema to DB without migrations (dev) |
| `npm run db:migrate` | Create & apply a migration |
| `npm run db:seed` | Seed demo data |
| `npm run db:studio` | Open Prisma Studio |

---

## Routing & Locales

- Locale prefix is `as-needed`:
  - English (default): `/dashboard`, `/clients`, …
  - Arabic: `/ar/dashboard`, `/ar/clients`, …
- Routing middleware lives at `src/proxy.ts` (Next.js 16 renamed `middleware.ts` → `proxy.ts`).
- The Globe icon in the topbar (or landing navbar) toggles between locales without losing the current path.

---

## Theming

- Toggle via the sun/moon icon in the topbar (or landing navbar).
- Color palette derived from the logo:
  - Navy `#2D3748` — text & dark accents
  - Sky `#38BDF8` — primary accent
  - Cyan `#22D3EE` — secondary accent
- Tailwind v4 with `@custom-variant dark (&:where(.dark, .dark *))` so all `dark:` modifiers work via the `next-themes` `class` strategy.

---

## Demo Data

Two demo data layers exist intentionally:

1. **Static client-side demo** (`src/data/demo-clients.ts`) — used by client components when no DB is needed. Every value is marked `source: "demo"`.
2. **Seeded demo** (`prisma/seed.ts`) — three clients (Level Egypt, Smart Home Damietta, Al Reda Steel) with campaigns, metric snapshots, audits, scores, alerts, recommendations, action items, budget pacing and funnel snapshots — for testing flows that read from the DB.

Demo accounts:
- email: `demo@mizaniq.com`
- password: `demo1234`

---

## Conventions

- **No hardcoded user-facing strings** — all strings live in `src/i18n/messages/{en,ar}.json`.
- **Use `<Logo />`** — the component switches automatically between light/dark logo and supports `iconOnly` for a collapsed sidebar.
- **Use `<HonestTooltip />`** on every metric or recommendation to disclose source/confidence/limitation.
- **Pages under `(auth)`** are wrapped by the `AppShell` (sidebar + topbar). Pages under `(public)` are standalone.
- **Tailwind v4**: do **not** add a `tailwind.config.ts` — the theme is fully expressed inside `@theme inline { … }` in `globals.css`.
- **Next.js 16**: use the **proxy** file convention (`src/proxy.ts`), not `middleware.ts`.

---

## Sprint Status

**Sprint 1 — Foundation: ✅ Complete & Audited**

| Item | Status |
| --- | --- |
| Next.js 16 / React 19 / Tailwind 4 / next-intl 4 setup | ✅ |
| Prisma schema for full MVP entities | ✅ |
| NextAuth v5 (Credentials) wiring with **real** signin + demo bypass | ✅ |
| Route protection on `(auth)` layout (server-side `auth()` check) | ✅ |
| `SessionProvider` mounted at locale layout | ✅ |
| Logout button in topbar | ✅ |
| Bilingual landing page (real, not a redirect) | ✅ |
| AppShell (sidebar + topbar) responsive layout | ✅ |
| 16 app routes scaffolded with demo data | ✅ |
| Light/Dark theme system + brand colors from logo | ✅ |
| RTL Arabic support throughout (every page) | ✅ |
| Honest-intelligence metadata in schema + UI | ✅ |
| Demo seed script (workspace + 3 clients + 7 days metrics + alerts + recs) | ✅ |
| Build clean: 0 errors, 0 warnings | ✅ |
| Lint clean: 0 errors, 0 warnings | ✅ |
| `next/font` + `next/image` (no `<link>` font warnings, no `<img>`) | ✅ |
| Next.js 16 `proxy.ts` convention (renamed from `middleware.ts`) | ✅ |
| All user-facing strings extracted to i18n | ✅ |

---

## Next Implementation Steps

**Sprint 2 — Connect & Persist**
1. Replace static client-side demo data with Prisma queries via Server Components or a tRPC layer
2. Workspace selector (when a user belongs to multiple workspaces)
3. Real signup → workspace creation flow
4. Client CRUD UI (create, edit, archive)

**Sprint 3 — Real Integrations**
5. Meta Marketing API connector (OAuth + sync)
6. Google Ads connector
7. TikTok connector
8. Pixel/CAPI audit job

**Sprint 4 — Intelligence**
9. Rule engine for recommendations (replace seeded ones)
10. Anomaly detection for alerts
11. Client Success Score calculation pipeline
12. Report generation (PDF/HTML)

**Sprint 5 — Polish**
13. Audit log UI
14. Notifications panel + email digests
15. Per-role permissions enforcement (owner / agency_admin / account_manager / media_buyer / analyst / client_viewer)
16. Onboarding flow

---

© 2026 MizanIQ — Private project.
