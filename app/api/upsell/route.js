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

    // 1. Retrieve the checkout session to get the customer
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
        { error: "No payment method found" },
        { status: 400 }
      );
    }

    // 2. Set the default payment method on the customer
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // 3. Create the subscription — one-click, no checkout page
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: PRICES.AGENCY_BOUTIQUE }],
      default_payment_method: paymentMethodId,
      payment_behavior: "error_if_incomplete",
      metadata: {
        source: "agency_blueprint_upsell",
        original_session: sessionId,
      },
    });

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      status: subscription.status,
    });
  } catch (err) {
    console.error("Upsell error:", err);

    // If the card is declined or payment fails
    if (err.type === "StripeCardError") {
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
