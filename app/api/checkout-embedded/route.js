import { NextResponse } from "next/server";
import { PRICES } from "@/lib/stripe";

export async function POST(req) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thewellpaidexpert.com";
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    let includeBump = false;
    try {
      const body = await req.json();
      includeBump = body.includeBump === true;
    } catch {
      // No body sent — that's fine
    }

    const line_items = [
      { price: PRICES.BLUEPRINT, quantity: 1 },
      ...(includeBump ? [{ price: PRICES.BUMP, quantity: 1 }] : []),
    ];

    // Build body manually — URLSearchParams would encode {} in {CHECKOUT_SESSION_ID}
    const returnUrl = `${siteUrl}/agency-blueprint/upsell/?session_id={CHECKOUT_SESSION_ID}`;
    const bodyParts = [
      `mode=payment`,
      `ui_mode=embedded`,
      `payment_intent_data[setup_future_usage]=off_session`,
      `return_url=${encodeURIComponent(returnUrl).replace(/%7B/g, "{").replace(/%7D/g, "}")}`,
      `customer_creation=always`,
      ...line_items.flatMap((item, i) => [
        `line_items[${i}][price]=${encodeURIComponent(item.price)}`,
        `line_items[${i}][quantity]=${item.quantity}`,
      ]),
    ];

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParts.join("&"),
    });

    const session = await response.json();

    if (!response.ok) {
      console.error("Stripe API error:", session?.error);
      return NextResponse.json(
        { error: "Failed to create checkout session", detail: session?.error?.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ clientSecret: session.client_secret });

  } catch (err) {
    console.error("Checkout route error:", err?.message);
    return NextResponse.json(
      { error: "Failed to create checkout session", detail: err?.message },
      { status: 500 }
    );
  }
}
