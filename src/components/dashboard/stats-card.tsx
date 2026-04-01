import { Card, CardContent } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  change?: number;
  format?: "number" | "currency";
  icon: React.ReactNode;
}

export function StatsCard({ title, value, change, format = "number", icon }: StatsCardProps) {
  const formattedValue = format === "currency"
    ? `$${formatNumber(value)}`
    : formatNumber(value);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold">{formattedValue}</p>
            {change !== undefined && (
              <p className={cn(
                "mt-1 text-xs font-medium",
                change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
              )}>
                {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last month
              </p>
            )}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
