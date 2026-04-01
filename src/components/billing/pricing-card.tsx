"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";
import type { BillingPlan } from "@/types";

interface PricingCardProps {
  plan: BillingPlan;
  currentPlan?: string;
  onSelect: (plan: BillingPlan) => void;
  isLoading?: boolean;
}

export function PricingCard({ plan, currentPlan, onSelect, isLoading }: PricingCardProps) {
  const isCurrent = currentPlan === plan.id;

  return (
    <Card className={cn(
      "relative flex flex-col",
      plan.popular && "border-primary shadow-md",
    )}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
      )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">
            {plan.price === 0 ? "Free" : formatCurrency(plan.price)}
          </span>
          {plan.price > 0 && (
            <span className="text-muted-foreground">/{plan.interval}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={plan.popular ? "default" : "outline"}
          disabled={isCurrent || isLoading}
          isLoading={isLoading}
          onClick={() => onSelect(plan)}
        >
          {isCurrent ? "Current Plan" : plan.price === 0 ? "Get Started" : "Upgrade"}
        </Button>
      </CardFooter>
    </Card>
  );
}
