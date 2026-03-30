import { NextResponse } from "next/server";
import { stripe, PRICES } from "@/lib/stripe";

export async function POST(req) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3099";
    
    let includeBump = false;
    try {
      const body = await req.json();
      includeBump = body.includeBump === true;
    } catch (e) {
      // Ignore JSON parse errors, just means no body was sent
    }

    const line_items = [
      {
        price: PRICES.BLUEPRINT,
        quantity: 1,
      },
    ];

    if (includeBump) {
      line_items.push({
        price: PRICES.BUMP,
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      line_items,
      // Saves the payment method for one-click upsell
      payment_intent_data: {
        setup_future_usage: "off_session",
      },
      return_url: `${siteUrl}/agency-blueprint/upsell?session_id={CHECKOUT_SESSION_ID}`,
      customer_creation: "always",
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("Embedded checkout error:", err?.message, err?.type, err?.code);
    return NextResponse.json(
      { error: "Failed to create checkout session", detail: err?.message, type: err?.type },
      { status: 500 }
    );
  }
}
