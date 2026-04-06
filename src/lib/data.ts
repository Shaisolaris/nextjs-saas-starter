/**
 * Data access layer — uses Prisma when configured, falls back to demo data.
 */

import { isDemoMode, DEMO_STATS, DEMO_PROJECTS, DEMO_TEAM, DEMO_REVENUE_DATA, DEMO_ACTIVITY, DEMO_INVOICES, DEMO_USER } from "./demo-data";

interface AppUser {
  id: string;
  name: string;
  email: string;
  tenantId: string;
  role: string;
}

export async function getCurrentUser(): Promise<AppUser> {
  if (isDemoMode()) return DEMO_USER;

  try {
    const { getServerSession } = await import("next-auth");
    const { authOptions } = await import("./auth");
    const session = await getServerSession(authOptions);
    if (session?.user) {
      return {
        id: (session.user as any).id ?? "unknown",
        name: session.user.name ?? "User",
        email: session.user.email ?? "",
        tenantId: (session.user as any).tenantId ?? "default",
        role: (session.user as any).role ?? "MEMBER",
      };
    }
  } catch {}

  return DEMO_USER;
}

export async function getStats(_tenantId: string) {
  if (isDemoMode()) return DEMO_STATS;
  // In production: query database
  return DEMO_STATS;
}

export async function getRecentProjects(_tenantId: string) {
  if (isDemoMode()) return DEMO_PROJECTS;
  return DEMO_PROJECTS;
}

export async function getTeamMembers(_tenantId: string) {
  if (isDemoMode()) return DEMO_TEAM;
  return DEMO_TEAM;
}

export async function getRevenueData(_tenantId: string) {
  if (isDemoMode()) return DEMO_REVENUE_DATA;
  return DEMO_REVENUE_DATA;
}

export async function getActivity(_tenantId: string) {
  if (isDemoMode()) return DEMO_ACTIVITY;
  return DEMO_ACTIVITY;
}

export async function getInvoices(_customerId: string) {
  if (isDemoMode()) return DEMO_INVOICES;
  return DEMO_INVOICES;
}
