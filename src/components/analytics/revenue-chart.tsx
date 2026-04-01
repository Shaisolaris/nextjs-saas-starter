"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnalyticsData } from "@/types";

interface RevenueChartProps {
  data: AnalyticsData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-64 items-end gap-2">
          {data.map((item) => {
            const height = (item.revenue / maxRevenue) * 100;
            return (
              <div key={item.date} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  ${(item.revenue / 100).toFixed(0)}
                </span>
                <div
                  className="w-full rounded-t bg-primary/80 transition-all hover:bg-primary"
                  style={{ height: `${Math.max(height, 4)}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {item.date.slice(5)}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
