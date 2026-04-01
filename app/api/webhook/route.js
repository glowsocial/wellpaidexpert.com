import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendBlueprintConfirmation } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  httpClient: Stripe.createFetchHttpClient(),
});

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_details?.email;
    const name = session.customer_details?.name;

    if (!email) {
      console.warn("Webhook: no email on session", session.id);
      return NextResponse.json({ received: true });
    }

    try {
      const { error } = await sendBlueprintConfirmation({ email, name });
      if (error) {
        console.error("Failed to send blueprint confirmation:", error);
      } else {
        console.log("Blueprint confirmation sent to", email);
      }
    } catch (err) {
      console.error("Email send error:", err);
    }
  }

  return NextResponse.json({ received: true });
}
