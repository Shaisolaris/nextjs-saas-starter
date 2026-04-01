"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { PricingCard } from "@/components/billing/pricing-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/stripe";
import type { BillingPlan } from "@/types";

export default function BillingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPlan = async (plan: BillingPlan) => {
    if (plan.price === 0) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: plan.stripePriceId }),
      });

      const data = await res.json() as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json() as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Portal error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and billing</p>
      </div>

      {success && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-200">
          Your subscription has been activated successfully!
        </div>
      )}
      {canceled && (
        <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
          Checkout was canceled. You can try again anytime.
        </div>
      )}

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="success">Active</Badge>
            <span className="font-medium">Free Plan</span>
          </div>
          <Button variant="outline" onClick={handleManageBilling} isLoading={isLoading}>
            Manage Billing
          </Button>
        </CardContent>
      </Card>

      {/* Pricing Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            currentPlan="free"
            onSelect={handleSelectPlan}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}
