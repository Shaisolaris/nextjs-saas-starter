import type { Metadata } from "next";
import { getRevenueData, getStats, getCurrentUser } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Analytics" };

export default async function AnalyticsPage() {
  const user = await getCurrentUser();
  const tenantId = user?.tenantId ?? "demo";
  const revenue = await getRevenueData(tenantId);
  const stats = await getStats(tenantId);

  const maxRevenue = Math.max(...revenue.map((d: any) => d.revenue));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Revenue and user growth overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p><p className="text-sm text-green-600">+{stats.revenueChange}% from last month</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{revenue[revenue.length - 1]?.users}</p><p className="text-sm text-green-600">+{stats.usersChange}% from last month</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{stats.activeProjects}</p><p className="text-sm text-green-600">+{stats.projectsChange}% from last month</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Revenue Over Time</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end gap-2" style={{ height: 200 }}>
            {revenue.map((d: any) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-medium">${(d.revenue / 1000).toFixed(1)}k</span>
                <div
                  className="w-full rounded-t bg-primary"
                  style={{ height: `${(d.revenue / maxRevenue) * 160}px` }}
                />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
