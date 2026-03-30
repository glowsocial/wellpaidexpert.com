import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  maxNetworkRetries: 0, // Don't retry — fail fast and surface the real error
  timeout: 10000,       // 10s timeout (Vercel serverless limit is 10s on hobby)
});

const isTestMode = process.env.STRIPE_SECRET_KEY?.startsWith("sk_test");

// Price IDs — auto-detect sandbox vs live
export const PRICES = isTestMode
  ? {
      BLUEPRINT: "price_1TG4wJRArGMQ8KcQtbzZlBQ7",
      AGENCY_BOUTIQUE: "price_1TG4wJRArGMQ8KcQKNThKl91",
      BUMP: "price_1TG5XJRArGMQ8KcQu4vO7Sfp",
    }
  : {
      BLUEPRINT: "price_1TG439IEvNJTyKjNq4nfjc9g",
      AGENCY_BOUTIQUE: "price_1TGlQfIEvNJTyKjN8d4ezfVV", // $997 one-time lifetime deal
      BUMP: "price_1TG5WmIEvNJTyKjNJl524yWv",
    };
