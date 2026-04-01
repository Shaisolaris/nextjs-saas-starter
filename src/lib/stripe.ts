import Stripe from "stripe";
import type { BillingPlan } from "@/types";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

export const PLANS: BillingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "For individuals getting started",
    price: 0,
    interval: "month",
    stripePriceId: "",
    features: [
      "Up to 3 projects",
      "1 team member",
      "Basic analytics",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams",
    price: 2900,
    interval: "month",
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || "",
    popular: true,
    features: [
      "Unlimited projects",
      "Up to 10 team members",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "API access",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: 9900,
    interval: "month",
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || "",
    features: [
      "Unlimited everything",
      "Unlimited team members",
      "Real-time analytics",
      "Dedicated support",
      "Custom integrations",
      "API access",
      "SSO / SAML",
      "Audit logs",
      "SLA guarantee",
    ],
  },
];

export async function createCheckoutSession(
  tenantId: string,
  priceId: string,
  customerId?: string,
): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
    customer: customerId || undefined,
    client_reference_id: tenantId,
    metadata: { tenantId },
  });

  return session.url!;
}

export async function createBillingPortalSession(
  customerId: string,
): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  });

  return session.url;
}
