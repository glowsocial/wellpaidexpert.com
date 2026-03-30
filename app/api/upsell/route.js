import { NextResponse } from "next/server";
import { stripe, PRICES } from "@/lib/stripe";

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session ID" },
        { status: 400 }
      );
    }

    // 1. Retrieve the original checkout session to get the customer + saved payment method
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.payment_method"],
    });

    if (!session.customer) {
      return NextResponse.json(
        { error: "No customer found for this session" },
        { status: 400 }
      );
    }

    const customerId = session.customer;
    const paymentMethodId =
      session.payment_intent?.payment_method?.id ||
      session.payment_intent?.payment_method;

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: "No payment method found — cannot process one-click upsell" },
        { status: 400 }
      );
    }

    // 2. Retrieve the price to get the amount
    const price = await stripe.prices.retrieve(PRICES.AGENCY_BOUTIQUE);

    // 3. Charge a one-time PaymentIntent using the saved card — no subscription
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount,           // 99700 = $997.00
      currency: price.currency,
      customer: customerId,
      payment_method: paymentMethodId,
      confirm: true,                        // charge immediately
      off_session: true,                    // card is not present
      description: "Glow Social Boutique Plan — Lifetime Access (You + 5 Clients)",
      metadata: {
        source: "agency_blueprint_upsell",
        original_session: sessionId,
        product: "boutique_lifetime",
      },
    });

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment did not complete. Please try again." },
        { status: 402 }
      );
    }

    return NextResponse.json({
      success: true,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });

  } catch (err) {
    console.error("Upsell error:", err);

    if (err.type === "StripeCardError" || err.code === "card_declined") {
      return NextResponse.json(
        { error: "Payment failed. Your card was declined." },
        { status: 402 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process upsell" },
      { status: 500 }
    );
  }
}
