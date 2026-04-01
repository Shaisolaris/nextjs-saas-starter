import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentProjects } from "@/components/dashboard/recent-projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats(tenantId: string) {
  const [projectCount, activeProjectCount, userCount] = await Promise.all([
    prisma.project.count({ where: { tenantId } }),
    prisma.project.count({ where: { tenantId, status: "ACTIVE" } }),
    prisma.user.count({ where: { tenantId } }),
  ]);

  return {
    totalProjects: projectCount,
    activeProjects: activeProjectCount,
    totalUsers: userCount,
    totalRevenue: 0,
    revenueChange: 12.5,
    usersChange: 8.2,
  };
}

async function getRecentProjects(tenantId: string) {
  return prisma.project.findMany({
    where: { tenantId },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const tenantId = (session?.user as Record<string, unknown>)?.tenantId as string | undefined;

  if (!tenantId) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold">Welcome to SaaSKit</h2>
        <p className="mt-2 text-muted-foreground">Set up your workspace to get started.</p>
      </div>
    );
  }

  const [stats, recentProjects] = await Promise.all([
    getStats(tenantId),
    getRecentProjects(tenantId),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your workspace</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={stats.totalRevenue}
          change={stats.revenueChange}
          format="currency"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatsCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>}
        />
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>}
        />
        <StatsCard
          title="Team Members"
          value={stats.totalUsers}
          change={stats.usersChange}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentProjects projects={recentProjects} />
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Activity Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New project created", time: "2 hours ago" },
                { action: "Team member invited", time: "5 hours ago" },
                { action: "Billing updated to Pro", time: "1 day ago" },
                { action: "Project completed", time: "2 days ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span>{item.action}</span>
                  <span className="text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
