import { NextResponse } from "next/server";
import Stripe from "stripe";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const customerId = String(session.customer);
      const subscriptionId = String(session.subscription);

      if (userId) {
        await supabaseAdmin
          .from("profiles")
          .update({
            subscription_status: "pro",
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);
      }

      break;
    }

    case "customer.subscription.updated":
case "customer.subscription.deleted": {
  const subscription = event.data.object as Stripe.Subscription & {
    cancel_at?: number | null;
  };

  const status =
    event.type === "customer.subscription.deleted"
      ? "canceled"
      : subscription.cancel_at
      ? "canceling"
      : subscription.status === "active" || subscription.status === "trialing"
      ? "pro"
      : subscription.status === "paused"
      ? "paused"
      : subscription.status === "canceled"
      ? "canceled"
      : "inactive";

  const currentPeriodEnd = subscription.items.data[0]?.current_period_end
    ? new Date(
        subscription.items.data[0].current_period_end * 1000
      ).toISOString()
    : null;

  await supabaseAdmin
    .from("profiles")
    .update({
      subscription_status: status,
      stripe_price_id: subscription.items.data[0]?.price.id ?? null,
      stripe_current_period_end: currentPeriodEnd,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id);

  break;
}
  }

  return NextResponse.json({ received: true });
}