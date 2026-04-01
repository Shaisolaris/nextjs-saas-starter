import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const tenantId = session.metadata?.tenantId;

        if (tenantId && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
          );

          await prisma.tenant.update({
            where: { id: tenantId },
            data: {
              stripeCustomerId: session.customer as string,
              stripeSubId: subscription.id,
              stripePriceId: subscription.items.data[0]?.price.id,
              subStatus: "ACTIVE",
              plan: "PRO",
            },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const tenant = await prisma.tenant.findUnique({
          where: { stripeSubId: subscription.id },
        });

        if (tenant) {
          const statusMap: Record<string, "ACTIVE" | "PAST_DUE" | "CANCELED" | "TRIALING" | "INACTIVE"> = {
            active: "ACTIVE",
            past_due: "PAST_DUE",
            canceled: "CANCELED",
            trialing: "TRIALING",
          };

          await prisma.tenant.update({
            where: { id: tenant.id },
            data: {
              subStatus: statusMap[subscription.status] || "INACTIVE",
              stripePriceId: subscription.items.data[0]?.price.id,
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.tenant.updateMany({
          where: { stripeSubId: subscription.id },
          data: {
            subStatus: "CANCELED",
            plan: "FREE",
            stripeSubId: null,
            stripePriceId: null,
          },
        });
        break;
      }
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
