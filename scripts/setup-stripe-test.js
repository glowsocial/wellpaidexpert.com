#!/usr/bin/env node
/**
 * Creates the test products and prices in your Stripe sandbox.
 * 
 * Usage:
 *   1. Paste your sandbox sk_test_ key in .env.local
 *   2. Run: node scripts/setup-stripe-test.js
 *   3. Copy the output price IDs into lib/stripe.js
 */

require("dotenv").config({ path: ".env.local" });
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function main() {
  if (!process.env.STRIPE_SECRET_KEY?.startsWith("sk_test")) {
    console.error("❌ Your STRIPE_SECRET_KEY doesn't start with sk_test_");
    console.error("   Paste your sandbox key in .env.local first.");
    process.exit(1);
  }

  console.log("Creating test products in Stripe sandbox...\n");

  // 1. Agency Blueprint — $27 one-time
  const blueprint = await stripe.products.create({
    name: "The Social Media Agency Blueprint",
    description: "The complete playbook for starting a profitable social media management agency.",
  });
  const blueprintPrice = await stripe.prices.create({
    product: blueprint.id,
    unit_amount: 2700,
    currency: "usd",
  });
  console.log(`✅ Blueprint:  product=${blueprint.id}  price=${blueprintPrice.id}`);

  // 2. Agency Boutique — $199/mo recurring
  const boutique = await stripe.products.create({
    name: "Agency Boutique (up to 6 profiles)",
    description: "For agencies managing up to 6 clients.",
  });
  const boutiquePrice = await stripe.prices.create({
    product: boutique.id,
    unit_amount: 19900,
    currency: "usd",
    recurring: { interval: "month" },
  });
  console.log(`✅ Boutique:   product=${boutique.id}  price=${boutiquePrice.id}`);

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Update lib/stripe.js with these price IDs:

BLUEPRINT:       "${blueprintPrice.id}"
AGENCY_BOUTIQUE: "${boutiquePrice.id}"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch(console.error);
