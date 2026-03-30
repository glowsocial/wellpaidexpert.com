import { NextResponse } from "next/server";
import { stripe, PRICES } from "@/lib/stripe";

export async function POST() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3099";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: PRICES.BLUEPRINT,
          quantity: 1,
        },
      ],
      // THIS IS THE KEY: saves the payment method for one-click upsell
      payment_intent_data: {
        setup_future_usage: "off_session",
      },
      success_url: `${siteUrl}/agency-blueprint/upsell?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/agency-blueprint`,
      // Auto-collect name for the subscription upsell
      customer_creation: "always",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
