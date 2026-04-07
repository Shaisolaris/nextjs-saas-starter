# nextjs-saas-starter

![CI](https://github.com/Shaisolaris/nextjs-saas-starter/actions/workflows/ci.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Production-ready Next.js 14 SaaS boilerplate.** Auth, Stripe billing, multi-tenancy, team management, dark mode. Works immediately with zero config — demo mode included.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShaisolaris%2Fnextjs-saas-starter&env=NEXTAUTH_SECRET,NEXTAUTH_URL,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,DATABASE_URL&envDescription=Required%20environment%20variables&envLink=https%3A%2F%2Fgithub.com%2FShaisolaris%2Fnextjs-saas-starter%23environment-variables)

<!-- Add your deployed URL here -->
<!-- **Live Demo:** [https://your-app.vercel.app](https://your-app.vercel.app) -->

## Why This Exists

Every SaaS project starts with the same 2 weeks of boilerplate: auth, billing, team management, dashboard layout. This starter ships all of it so you can start building your actual product on day one.

## What's Included

### Authentication
- Login, register, forgot password flows
- NextAuth with email/password and OAuth providers
- Protected routes with middleware
- Session management with JWT

### Stripe Billing
- Pricing page with Free / Pro / Enterprise tiers
- Stripe Checkout for subscriptions
- Webhook handler for payment events
- Customer portal for self-service billing
- Invoice history

### Multi-Tenancy
- Slug-based tenant isolation
- Team management with invite flow
- Role-based access: Owner, Admin, Member, Viewer
- Per-tenant data scoping via Prisma middleware

### Dashboard
- 6 fully functional pages: Overview, Projects, Team, Analytics, Billing, Settings
- Stats cards with change indicators
- Revenue chart
- Activity feed
- Responsive sidebar navigation

### Developer Experience
- Next.js 14 App Router + TypeScript
- Tailwind CSS with dark mode
- Prisma ORM with PostgreSQL
- Demo mode — works with `npm run dev` and zero config
- One-click deploy to Vercel

## Quick Start

### Option 1: Zero Config (Demo Mode)

```bash
git clone https://github.com/Shaisolaris/nextjs-saas-starter.git
cd nextjs-saas-starter
npm install
npm run dev
# Open http://localhost:3000 — all pages work with demo data
```

### Option 2: Full Setup (Production)

```bash
git clone https://github.com/Shaisolaris/nextjs-saas-starter.git
cd nextjs-saas-starter
chmod +x scripts/setup.sh
./scripts/setup.sh
# Edit .env.local with your Stripe + database credentials
npx prisma db push
npm run dev
```

### Option 3: One-Click Deploy

Click the "Deploy with Vercel" button above. Vercel will prompt you for environment variables.

## Environment Variables

```bash
# Auth
NEXTAUTH_SECRET=          # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=             # PostgreSQL connection string

# Stripe
STRIPE_SECRET_KEY=        # sk_test_...
STRIPE_WEBHOOK_SECRET=    # whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # pk_test_...

# Stripe Price IDs
STRIPE_PRICE_PRO_MONTHLY=
STRIPE_PRICE_PRO_YEARLY=
STRIPE_PRICE_ENTERPRISE_MONTHLY=
```

## Demo Mode

When `DATABASE_URL` is not set, the app runs in demo mode:
- All dashboard pages render with realistic sample data
- A blue "Demo Mode" banner shows at the top
- Auth pages are visible but don't submit
- Navigation and dark mode toggle work fully

This lets you explore the entire UI before connecting any services.

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login, register, forgot password
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/      # Protected dashboard pages
│   │   └── dashboard/
│   │       ├── page.tsx          # Overview with stats + activity
│   │       ├── projects/         # Project list + management
│   │       ├── team/             # Team members + roles
│   │       ├── analytics/        # Revenue chart + metrics
│   │       ├── billing/          # Plans + invoices
│   │       └── settings/         # Profile + org + danger zone
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth endpoints
│   │   └── billing/              # Stripe checkout, portal, webhooks
│   └── page.tsx                  # Landing page
├── components/
│   ├── analytics/        # Revenue chart
│   ├── auth/             # Auth form
│   ├── billing/          # Pricing cards
│   ├── dashboard/        # Stats, projects
│   ├── layout/           # Header, sidebar, theme
│   └── ui/               # Button, card, input, badge, avatar
├── lib/
│   ├── auth.ts           # NextAuth config
│   ├── data.ts           # Data layer (Prisma or demo fallback)
│   ├── demo-data.ts      # Demo mode data
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Formatters, helpers
└── prisma/
    └── schema.prisma     # Database schema
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth.js |
| Database | PostgreSQL + Prisma |
| Billing | Stripe |
| Deployment | Vercel |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT — use it for anything.

## Why This Over Other Starters?

| Feature | This Starter | Most Next.js SaaS Starters |
|---|---|---|
| Demo mode (zero config) | ✅ Works immediately | ❌ Need database + Stripe keys first |
| Multi-tenancy | ✅ Slug-based tenant isolation | ❌ Single-tenant only |
| Team management | ✅ Invite, roles (Owner/Admin/Member/Viewer) | ❌ Single user |
| All dashboard pages | ✅ 6 pages with real data | ⚠️ Usually just landing page |
| Stripe billing complete | ✅ Checkout + portal + webhooks + invoices | ⚠️ Checkout only |
| Dark mode | ✅ Built in | ⚠️ Sometimes |
| One-click deploy | ✅ Vercel button | ⚠️ Sometimes |
