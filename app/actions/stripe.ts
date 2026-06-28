"use server";

import { redirect } from "next/navigation";

import { getCurrentUserAccess } from "@/lib/auth/get-current-user-access";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/utils/supabase/server";

export async function createCheckoutSession() {
  const access = await getCurrentUserAccess();

  if (!access.userId) {
    redirect("/login");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    metadata: {
      userId: access.userId,
    },
    subscription_data: {
      metadata: {
        userId: access.userId,
      },
    },
    success_url: `${siteUrl}/dashboard?checkout=success`,
    cancel_url: `${siteUrl}/subscribe?checkout=cancelled`,
  });

  redirect(session.url!);
}

export async function createCustomerPortalSession() {
  const access = await getCurrentUserAccess();

  if (!access.userId) {
    redirect("/login");
  }

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", access.userId)
    .maybeSingle();

  if (!profile?.stripe_customer_id) {
    redirect("/subscribe");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${siteUrl}/dashboard/account`,
  });

  redirect(session.url);
}