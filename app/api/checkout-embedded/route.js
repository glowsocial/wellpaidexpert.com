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

    // Lazy instantiation + fetch client to avoid StripeConnectionError on Vercel cold starts
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2024-12-18.acacia",
      httpClient: Stripe.createFetchHttpClient(),
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

    // NOTE: We use a plain return_url without {CHECKOUT_SESSION_ID}.
    // The session ID is returned to the client via clientSecret and stored in sessionStorage.
    // The UpsellContent component reads the sessionId from sessionStorage on load.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      line_items,
      payment_intent_data: {
        setup_future_usage: "off_session",
      },
      return_url: "https://thewellpaidexpert.com/agency-blueprint/upsell/",
      customer_creation: "always",
    });

    // Return both the clientSecret (for embedded checkout) and session ID (for the upsell)
    return NextResponse.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
    });

  } catch (err) {
    console.error("Checkout error:", err?.message, err?.type);
    return NextResponse.json(
      { error: "Failed to create checkout session", detail: err?.message, type: err?.type },
      { status: 500 }
    );
  }
}
