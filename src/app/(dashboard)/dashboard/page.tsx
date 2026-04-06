import type { Metadata } from "next";
import { getStats, getRecentProjects, getActivity, getCurrentUser } from "@/lib/data";
import { isDemoMode } from "@/lib/demo-data";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentProjects } from "@/components/dashboard/recent-projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const stats = await getStats(user.tenantId);
  const projects = await getRecentProjects(user.tenantId);
  const activity = await getActivity(user.tenantId);

  return (
    <div className="space-y-8">
      {isDemoMode() && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
          <strong>Demo Mode</strong> — Running with sample data. Connect a database and Stripe to use real data.
          See <code className="rounded bg-blue-100 px-1 dark:bg-blue-900">.env.example</code> for configuration.
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Projects" value={stats.totalProjects} change={stats.projectsChange} icon={<span>📁</span>} />
        <StatsCard title="Active Projects" value={stats.activeProjects} icon={<span>⚡</span>} />
        <StatsCard title="Team Members" value={stats.totalUsers} change={stats.usersChange} icon={<span>👥</span>} />
        <StatsCard title="Revenue" value={stats.totalRevenue} change={stats.revenueChange} format="currency" icon={<span>💰</span>} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Recent Projects</CardTitle></CardHeader>
          <CardContent><RecentProjects projects={projects} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activity.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {item.user.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm"><span className="font-medium">{item.user}</span> {item.action} <span className="font-medium">{item.target}</span></p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
