/**
 * Demo data — powers all dashboard pages when DEMO_MODE=true or no database configured.
 * This lets the app run immediately after `npm install && npm run dev` with zero config.
 */

export const DEMO_USER = {
  id: "demo-user-1",
  name: "Sarah Chen",
  email: "sarah@demo.com",
  image: null,
  role: "ADMIN" as const,
  tenantId: "demo-tenant-1",
};

export const DEMO_TENANT = {
  id: "demo-tenant-1",
  name: "Acme Corp",
  slug: "acme-corp",
  plan: "PRO" as const,
  stripeCustomerId: null,
  stripeSubscriptionId: null,
};

export const DEMO_STATS = {
  totalProjects: 12,
  activeProjects: 8,
  totalUsers: 5,
  totalRevenue: 24500,
  revenueChange: 12.5,
  usersChange: 8.2,
  projectsChange: 15.0,
};

export const DEMO_PROJECTS = [
  { id: "p1", name: "Website Redesign", description: "Complete redesign of the marketing site with new brand", status: "ACTIVE", priority: "HIGH", createdAt: "2026-03-15T10:00:00Z", updatedAt: "2026-04-01T14:30:00Z", owner: { name: "Sarah Chen" }, _count: { tasks: 24 } },
  { id: "p2", name: "Mobile App v2", description: "React Native app with push notifications and offline mode", status: "ACTIVE", priority: "HIGH", createdAt: "2026-02-20T08:00:00Z", updatedAt: "2026-04-02T09:15:00Z", owner: { name: "James Wilson" }, _count: { tasks: 38 } },
  { id: "p3", name: "API Gateway", description: "Centralized API gateway with rate limiting and auth", status: "ACTIVE", priority: "MEDIUM", createdAt: "2026-03-01T12:00:00Z", updatedAt: "2026-03-28T16:45:00Z", owner: { name: "Sarah Chen" }, _count: { tasks: 15 } },
  { id: "p4", name: "Analytics Dashboard", description: "Real-time analytics with custom reports and exports", status: "ACTIVE", priority: "MEDIUM", createdAt: "2026-03-10T09:00:00Z", updatedAt: "2026-04-01T11:00:00Z", owner: { name: "Emily Park" }, _count: { tasks: 19 } },
  { id: "p5", name: "Payment Integration", description: "Stripe integration with subscription management", status: "COMPLETED", priority: "HIGH", createdAt: "2026-01-15T10:00:00Z", updatedAt: "2026-03-20T15:00:00Z", owner: { name: "James Wilson" }, _count: { tasks: 12 } },
  { id: "p6", name: "CI/CD Pipeline", description: "Automated testing and deployment with GitHub Actions", status: "ACTIVE", priority: "LOW", createdAt: "2026-03-25T14:00:00Z", updatedAt: "2026-04-02T10:00:00Z", owner: { name: "Alex Kim" }, _count: { tasks: 8 } },
];

export const DEMO_TEAM = [
  { id: "u1", name: "Sarah Chen", email: "sarah@demo.com", role: "ADMIN", image: null, createdAt: "2025-06-01T00:00:00Z" },
  { id: "u2", name: "James Wilson", email: "james@demo.com", role: "MEMBER", image: null, createdAt: "2025-07-15T00:00:00Z" },
  { id: "u3", name: "Emily Park", email: "emily@demo.com", role: "MEMBER", image: null, createdAt: "2025-09-01T00:00:00Z" },
  { id: "u4", name: "Alex Kim", email: "alex@demo.com", role: "MEMBER", image: null, createdAt: "2026-01-10T00:00:00Z" },
  { id: "u5", name: "Maria Santos", email: "maria@demo.com", role: "VIEWER", image: null, createdAt: "2026-02-20T00:00:00Z" },
];

export const DEMO_REVENUE_DATA = [
  { month: "Oct", revenue: 12400, users: 120 },
  { month: "Nov", revenue: 15800, users: 145 },
  { month: "Dec", revenue: 14200, users: 138 },
  { month: "Jan", revenue: 18600, users: 167 },
  { month: "Feb", revenue: 21300, users: 189 },
  { month: "Mar", revenue: 24500, users: 215 },
];

export const DEMO_ACTIVITY = [
  { id: "a1", user: "Sarah Chen", action: "created project", target: "Website Redesign", time: "2 hours ago" },
  { id: "a2", user: "James Wilson", action: "completed task", target: "Setup CI pipeline", time: "4 hours ago" },
  { id: "a3", user: "Emily Park", action: "commented on", target: "Analytics Dashboard", time: "5 hours ago" },
  { id: "a4", user: "Alex Kim", action: "pushed to", target: "API Gateway", time: "6 hours ago" },
  { id: "a5", user: "Maria Santos", action: "reviewed", target: "Mobile App v2 PR #42", time: "8 hours ago" },
];

export const DEMO_INVOICES = [
  { id: "inv1", date: "2026-04-01", amount: 29, status: "paid", plan: "Pro" },
  { id: "inv2", date: "2026-03-01", amount: 29, status: "paid", plan: "Pro" },
  { id: "inv3", date: "2026-02-01", amount: 29, status: "paid", plan: "Pro" },
  { id: "inv4", date: "2026-01-01", amount: 0, status: "paid", plan: "Free (Trial)" },
];

/** Check if we're in demo mode */
export function isDemoMode(): boolean {
  return process.env.DEMO_MODE === "true" || !process.env.DATABASE_URL;
}
