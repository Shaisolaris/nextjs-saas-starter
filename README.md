# nextjs-saas-starter

![CI](https://github.com/Shaisolaris/nextjs-saas-starter/actions/workflows/ci.yml/badge.svg)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShaisolaris%2Fnextjs-saas-starter&env=NEXTAUTH_SECRET,NEXTAUTH_URL,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,DATABASE_URL&envDescription=Required%20environment%20variables&envLink=https%3A%2F%2Fgithub.com%2FShaisolaris%2Fnextjs-saas-starter%23environment-variables)

> Production-ready Next.js 14 SaaS boilerplate. One-click deploy to Vercel. Auth, Stripe billing, Prisma, multi-tenancy, dark mode.

Production-ready Next.js 14 SaaS starter with App Router, NextAuth.js authentication, Stripe billing, Prisma ORM, multi-tenant workspace architecture, analytics dashboard, and dark mode. Built with TypeScript end-to-end.

## Stack

- **Framework:** Next.js 14 (App Router, Server Components, Server Actions)
- **Language:** TypeScript 5 with strict mode
- **Auth:** NextAuth.js v4 (Credentials + GitHub + Google OAuth)
- **Database:** Prisma ORM with PostgreSQL
- **Billing:** Stripe Checkout, Customer Portal, Webhooks
- **Styling:** Tailwind CSS with CSS variables for theming
- **Dark Mode:** next-themes with system detection
- **Validation:** Zod schemas for forms and API inputs
- **Charts:** Recharts for analytics visualizations

## Architecture

```
src/
├── app/
│   ├── (auth)/                    # Auth route group (no dashboard layout)
│   │   ├── login/page.tsx         # Login with OAuth + credentials
│   │   ├── register/page.tsx      # Registration with auto-tenant creation
│   │   └── forgot-password/page.tsx
│   ├── (dashboard)/               # Dashboard route group (sidebar + header)
│   │   ├── layout.tsx             # Auth-gated layout with session check
│   │   └── dashboard/
│   │       ├── page.tsx           # Overview — stats, recent projects, activity
│   │       ├── analytics/page.tsx # Revenue chart, MAU, conversion metrics
│   │       ├── billing/page.tsx   # Pricing cards, plan management, Stripe checkout
│   │       ├── projects/page.tsx  # Project grid with status badges
│   │       ├── team/page.tsx      # Member list with role badges
│   │       └── settings/page.tsx  # Profile editing, danger zone
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth API handler
│   │   ├── billing/
│   │   │   ├── checkout/route.ts  # Create Stripe Checkout session
│   │   │   ├── portal/route.ts    # Create Stripe Billing Portal session
│   │   │   └── webhook/route.ts   # Stripe webhook handler
│   │   └── users/route.ts        # Registration + profile updates
│   ├── layout.tsx                 # Root layout with ThemeProvider
│   ├── page.tsx                   # Landing page with hero + features
│   └── globals.css                # CSS variables (light + dark themes)
├── components/
│   ├── ui/                        # Primitives: Button, Card, Input, Badge, Avatar
│   ├── layout/                    # Sidebar, Header, ThemeProvider, ThemeToggle
│   ├── auth/                      # AuthForm (login + register)
│   ├── dashboard/                 # StatsCard, RecentProjects
│   ├── analytics/                 # RevenueChart
│   └── billing/                   # PricingCard
├── lib/
│   ├── auth.ts                    # NextAuth config (providers, callbacks, events)
│   ├── prisma.ts                  # Prisma client singleton
│   ├── stripe.ts                  # Stripe client, plan definitions, checkout/portal helpers
│   ├── utils.ts                   # cn(), formatCurrency, formatDate, slugify
│   └── validations.ts            # Zod schemas (login, register, project, settings)
├── hooks/index.ts                 # useAsyncAction, useMediaQuery
├── types/index.ts                 # SafeUser, BillingPlan, AnalyticsData, DashboardStats
└── middleware.ts                  # NextAuth middleware for /dashboard/* route protection
```

## Data Model

Multi-tenant with Prisma and PostgreSQL:

- **Tenant** — Workspace with plan tier (Free/Pro/Enterprise), Stripe subscription fields
- **User** — Belongs to a tenant, role (Owner/Admin/Member), supports OAuth + credentials
- **Account** — NextAuth OAuth provider accounts (GitHub, Google)
- **Session** — NextAuth sessions with JWT strategy
- **Project** — Belongs to tenant and user, status lifecycle tracking

New users automatically get a tenant created on registration (via NextAuth `createUser` event). Tenant slug is derived from the email prefix.

## Setup

```bash
# Clone
git clone https://github.com/Shaisolaris/nextjs-saas-starter.git
cd nextjs-saas-starter

# Install
npm install

# Configure
cp .env.example .env
# Fill in DATABASE_URL, NEXTAUTH_SECRET, OAuth credentials, Stripe keys

# Database
npx prisma db push
npx prisma generate

# Development
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | App URL (http://localhost:3000 in dev) |
| `NEXTAUTH_SECRET` | Random 32+ char secret for JWT signing |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth app credentials |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRO_PRICE_ID` | Stripe Price ID for Pro plan |
| `STRIPE_ENTERPRISE_PRICE_ID` | Stripe Price ID for Enterprise plan |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `NEXT_PUBLIC_APP_URL` | Public app URL |

## Billing Flow

1. User clicks "Upgrade" on the billing page
2. Frontend calls `POST /api/billing/checkout` with the selected `priceId`
3. Server creates a Stripe Checkout session with `client_reference_id` = tenantId
4. User completes payment on Stripe's hosted checkout
5. Stripe sends `checkout.session.completed` webhook
6. Webhook handler updates tenant: sets `stripeCustomerId`, `stripeSubId`, plan to PRO, status to ACTIVE
7. Subscription changes (upgrades, cancellations) are handled by `customer.subscription.updated` and `customer.subscription.deleted` webhooks
8. "Manage Billing" button opens Stripe's Customer Portal for self-service

## Authentication Flow

Three auth methods supported simultaneously:

- **Credentials:** Email/password with bcrypt hashing (cost factor 12)
- **GitHub OAuth:** via NextAuth GitHub provider
- **Google OAuth:** via NextAuth Google provider

JWT strategy is used for sessions. Custom JWT callback injects `userId`, `role`, and `tenantId` into the token. Session callback propagates these to the client session object.

Route protection is handled at two levels: Next.js middleware redirects unauthenticated users from `/dashboard/*` to `/login`, and the dashboard layout performs a server-side session check with `getServerSession`.

## Key Design Decisions

**App Router with route groups.** Auth pages and dashboard pages use different layouts without URL nesting. `(auth)` group renders a centered card layout. `(dashboard)` group renders the sidebar + header chrome. Both share the root layout with ThemeProvider.

**Server Components by default.** Dashboard pages fetch data directly with Prisma in server components. Client components are used only where interactivity is required (forms, theme toggle, billing actions). This minimizes client bundle size and eliminates loading states for data-backed pages.

**CSS variables for theming.** Light and dark themes are defined as HSL CSS variables in globals.css. Tailwind config maps semantic color names (background, foreground, primary, muted, etc.) to these variables. Switching themes changes all colors instantly with no flash.

**Tenant-per-user on registration.** Every new user gets their own tenant automatically. This simplifies onboarding (no separate workspace creation step) and supports the common SaaS pattern of individual-to-team growth. The tenant is created in NextAuth's `createUser` event for OAuth users, and in the `/api/users` POST handler for credentials registration.

**Stripe webhook-driven billing state.** The application never trusts client-side payment confirmation. All plan changes flow through Stripe webhooks. The webhook handler is idempotent and handles checkout completion, subscription updates, and subscription cancellation.

## License

MIT
