"use client";

import { useState, useEffect, useCallback } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function EmbeddedCheckoutForm() {
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout-embedded", { method: "POST" });
    const data = await res.json();
    return data.clientSecret;
  }, []);

  return (
    <div id="checkout-form">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
