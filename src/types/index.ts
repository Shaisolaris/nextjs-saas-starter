import type { User, Tenant, Project } from "@prisma/client";

export type SafeUser = Omit<User, "passwordHash">;

export type UserWithTenant = User & {
  tenant: Tenant | null;
};

export type ProjectWithUser = Project & {
  user: SafeUser;
};

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  disabled?: boolean;
}

export interface BillingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  stripePriceId: string;
  popular?: boolean;
}

export interface AnalyticsData {
  date: string;
  revenue: number;
  users: number;
  projects: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalUsers: number;
  totalProjects: number;
  activeProjects: number;
  revenueChange: number;
  usersChange: number;
}
