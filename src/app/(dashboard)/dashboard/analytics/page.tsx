import type { Metadata } from "next";
import { RevenueChart } from "@/components/analytics/revenue-chart";
import { StatsCard } from "@/components/dashboard/stats-card";
import type { AnalyticsData } from "@/types";

export const metadata: Metadata = { title: "Analytics" };

function generateMockData(): AnalyticsData[] {
  const months = ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06",
    "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12"];
  return months.map((date) => ({
    date,
    revenue: Math.floor(Math.random() * 50000) + 10000,
    users: Math.floor(Math.random() * 200) + 50,
    projects: Math.floor(Math.random() * 50) + 10,
  }));
}

export default function AnalyticsPage() {
  const data = generateMockData();
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalUsers = data[data.length - 1]?.users ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your key metrics and performance</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Annual Revenue"
          value={totalRevenue}
          change={18.2}
          format="currency"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2 20h.01M7 20v-4M12 20V10M17 20V4" /></svg>}
        />
        <StatsCard
          title="Monthly Active Users"
          value={totalUsers}
          change={12.5}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
        />
        <StatsCard
          title="Conversion Rate"
          value={4.8}
          change={2.1}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-4.5L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>}
        />
      </div>

      <RevenueChart data={data} />
    </div>
  );
}
