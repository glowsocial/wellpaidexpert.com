import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PRICES } from "@/lib/stripe";

export async function POST(req) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thewellpaidexpert.com";
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    // Instantiate Stripe INSIDE the function (not at module level)
    // This avoids the StripeConnectionError caused by cold-start connection pooling on Vercel
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2024-12-18.acacia",
    });

    let includeBump = false;
    try {
      const body = await req.json();
      includeBump = body.includeBump === true;
    } catch {
      // No body — fine
    }

    const line_items = [
      { price: PRICES.BLUEPRINT, quantity: 1 },
      ...(includeBump ? [{ price: PRICES.BUMP, quantity: 1 }] : []),
    ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      line_items,
      payment_intent_data: {
        setup_future_usage: "off_session",
      },
      return_url: `${siteUrl}/agency-blueprint/upsell/?session_id={CHECKOUT_SESSION_ID}`,
      customer_creation: "always",
    });

    return NextResponse.json({ clientSecret: session.client_secret });

  } catch (err) {
    console.error("Checkout error:", err?.message, err?.type);
    return NextResponse.json(
      { error: "Failed to create checkout session", detail: err?.message, type: err?.type },
      { status: 500 }
    );
  }
}
