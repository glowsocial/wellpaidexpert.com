"use client";

import { useState, useEffect } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function SalesPageClient() {
  const [includeBump, setIncludeBump] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchSession = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/checkout-embedded/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ includeBump }),
        });
        const data = await res.json();
        if (active) {
          setClientSecret(data.clientSecret);
          // Store session ID so the upsell page can retrieve it (avoids {CHECKOUT_SESSION_ID} URL template)
          if (data.sessionId) {
            sessionStorage.setItem("blueprintSessionId", data.sessionId);
          }
          setLoading(false);
        }
      } catch (e) {
        console.error("Failed to fetch checkout session", e);
        if (active) setLoading(false);
      }
    };

    fetchSession();

    return () => {
      active = false;
    };
  }, [includeBump]);

  return (
    <>
      {/* ===== HERO — COMPACT MAGGIE STYLE ===== */}
      <section className="tc-hero">
        <div className="tc-hero-inner">
          <div className="tc-hero-top-row">
            <span className="tc-brand">THE WELL-PAID EXPERT</span>
            <span className="tc-eyebrow">
              REVEALED: THE AGENCY MODEL USED BY A WORKING AGENCY OWNER
            </span>
          </div>
          <h1>
            How To Build a $4,300/mo Social Media Agency...
            <br />
            Without Creating a Single Post!
          </h1>
          <div className="tc-urgency-bar">
            <span>🔥 Start Building Your Agency Today — Instant Access</span>
          </div>
          <p className="tc-hero-sub">
            Learn The Exact System I Use To Run a Profitable Agency With Zero
            Employees, Zero Design Skills, and Just 15 Minutes Per Client Per
            Week...
          </p>
        </div>
      </section>

      {/* ===== TWO-COLUMN: SALES COPY + CHECKOUT ===== */}
      <section className="tc-main">
        <div className="tc-two-col">
          {/* LEFT COLUMN — SALES COPY */}
          <div className="tc-left">
            {/* Video Section */}
            <div className="tc-video-section">
              <p className="tc-objection">
                &ldquo;I want to start an agency, but I don&apos;t know how to
                get clients — and I don&apos;t want to create content...&rdquo;
              </p>
              <p className="tc-video-hook">
                Give me 5 minutes and I&apos;ll show you exactly how this
                changes your business.
              </p>
              <div className="tc-video-placeholder">
                <div className="tc-play-btn">▶</div>
                <p>Watch: How the Blueprint Works (4 min)</p>
              </div>
            </div>

            {/* What You Get */}
            <div className="tc-what-you-get">
              <h2>The Agency Blueprint System</h2>
              <p className="tc-wyg-sub">
                Build a $4,300/mo agency in 34 minutes and you&apos;ll get:
              </p>

              <div className="tc-module">
                <h3>
                  ✓ Niche Selection Framework{" "}
                  <span className="tc-time">(5 min read)</span>
                </h3>
                <p>
                  The 5 industries that pay the most, churn the least, and close
                  the fastest. Stop guessing — pick the one that prints.
                </p>
              </div>
              <hr className="tc-divider" />

              <div className="tc-module">
                <h3>
                  ✓ 9 Cold Outreach Scripts{" "}
                  <span className="tc-time">(copy-paste ready)</span>
                </h3>
                <p>
                  LinkedIn connection templates and a 3-email cold sequence.
                  Copy them. Personalize in 30 seconds. Hit send.
                </p>
              </div>
              <hr className="tc-divider" />

              <div className="tc-module">
                <h3>
                  ✓ The &ldquo;60-Second Close&rdquo;{" "}
                  <span className="tc-time">(the secret weapon)</span>
                </h3>
                <p>
                  Generate a sample social feed for any prospect on the spot —
                  then use it to close them before they can say &ldquo;let me
                  think about it.&rdquo;
                </p>
              </div>
              <hr className="tc-divider" />

              <div className="tc-module">
                <h3>
                  ✓ AI Proposal Generator{" "}
                  <span className="tc-time">(60 seconds)</span>
                </h3>
                <p>
                  Paste your call notes into one prompt. Get a professional
                  proposal back in 60 seconds. The first agency to send a
                  proposal wins 78% of the time.
                </p>
              </div>
              <hr className="tc-divider" />

              <div className="tc-module">
                <h3>
                  ✓ Pricing Strategy &amp; Anchoring Guide{" "}
                  <span className="tc-time">(3 min read)</span>
                </h3>
                <p>
                  Why $500/month is the floor (not the ceiling), how to anchor
                  with two options, and why charging <em>less</em> actually loses
                  you deals.
                </p>
              </div>
              <hr className="tc-divider" />

              <div className="tc-module">
                <h3>
                  ✓ The Fulfillment Engine{" "}
                  <span className="tc-time">(this changes everything)</span>
                </h3>
                <p>
                  How I service 6+ clients without a team, without Canva, and
                  without spending more than 15 minutes per client per week.
                </p>
              </div>
              <hr className="tc-divider" />

              <div className="tc-module tc-bonus">
                <h3>✓ BONUS: AI Prompt Library</h3>
                <p>
                  The exact prompts I use to generate proposals, content
                  strategies, and client reports in under 2 minutes each.
                </p>
              </div>
              <hr className="tc-divider" />

              <div className="tc-module tc-bonus">
                <h3>✓ BONUS: Client Management Templates</h3>
                <p>
                  Onboarding checklist, scope-of-work template, and monthly
                  reporting dashboard — everything you need to look pro from day
                  one.
                </p>
              </div>
            </div>

            {/* This works for 3 reasons */}
            <div className="tc-reasons">
              <h2>This works for three reasons:</h2>
              <div className="tc-reason">
                <strong>#1: You&apos;re not creating content — you&apos;re running a business</strong>
                <p>
                  Most &ldquo;SMMA courses&rdquo; teach you graphic design. This
                  blueprint teaches you sales, fulfillment systems, and client
                  management. The content is automated.
                </p>
              </div>
              <div className="tc-reason">
                <strong>#2: The math actually works at scale</strong>
                <p>
                  $750/mo × 6 clients = $4,500. Minus $200 in fulfillment
                  costs = $4,300/mo profit. No employees. No office. Working
                  part-time.
                </p>
              </div>
              <div className="tc-reason">
                <strong>#3: You get everything you need in one blueprint</strong>
                <p>
                  Scripts, templates, the fulfillment system, pricing strategy,
                  and the AI secret weapon. No upsells to &ldquo;the real
                  training.&rdquo; This is it.
                </p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="tc-social-proof">
              <h2>
                What people are saying:
              </h2>
              <div className="tc-testimonial">
                <div className="tc-test-name">Sarah M. — Real Estate Niche</div>
                <p>
                  &ldquo;I landed my first client within 8 days of reading the
                  blueprint. The cold outreach scripts are incredible — I just
                  copied them, changed the name, and hit send. $750/mo
                  retainer.&rdquo;
                </p>
              </div>
              <div className="tc-testimonial">
                <div className="tc-test-name">
                  James K. — Fitness &amp; Wellness
                </div>
                <p>
                  &ldquo;I was skeptical about the &apos;15 minutes per
                  client&apos; claim. I now manage 4 clients and spend maybe an
                  hour a week total. The fulfillment engine is no joke.&rdquo;
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="tc-faq">
              <h2>Frequently Asked Questions:</h2>
              <div className="tc-faq-item">
                <h3>Do I need experience managing social media?</h3>
                <p>
                  No. This blueprint is designed for people who want to run the{" "}
                  <em>business</em> side. The content creation is handled by the
                  fulfillment system inside.
                </p>
              </div>
              <div className="tc-faq-item">
                <h3>Is this another &ldquo;start an SMMA&rdquo; course?</h3>
                <p>
                  No. Most SMMA courses teach you how to create content — which
                  means you&apos;re trading time for money. This blueprint
                  teaches you how to run an agency where the fulfillment is
                  automated.
                </p>
              </div>
              <div className="tc-faq-item">
                <h3>How fast can I land my first client?</h3>
                <p>
                  The outreach scripts are designed to generate responses within
                  the first week. How fast you close depends on your hustle, but
                  the system is built for speed.
                </p>
              </div>
              <div className="tc-faq-item">
                <h3>Will this work for my specific niche?</h3>
                <p>
                  This system has been used across real estate, fitness,
                  restaurants, dental, med spas, and professional services. The
                  principles work regardless of your niche.
                </p>
              </div>
              <div className="tc-faq-item">
                <h3>What if it&apos;s not for me?</h3>
                <p>
                  Full 30-day money-back guarantee. If the blueprint
                  doesn&apos;t give you a clear path to your first client, email
                  us and we&apos;ll refund you. No questions.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — CHECKOUT + SIDEBAR */}
          <div className="tc-right">
            <div className="tc-checkout-sticky">
              <div className="tc-product-image">
                <p className="tc-product-label">The old way of building an agency is DEAD.</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/blueprint-mockup.png"
                  alt="The Social Media Agency Blueprint - shown on laptop, tablet, and phone"
                  className="tc-mockup-img"
                />
                <p className="tc-product-desc">
                  Build your own automated agency and learn how to land clients, close deals,
                  and let AI handle the fulfillment — in under 34 minutes.
                </p>
              </div>
              <div className="tc-checkout-header">
                <h2>The Social Media Agency Blueprint</h2>
                <p className="tc-checkout-tagline">
                  Scripts, templates, and the AI-powered fulfillment system to
                  build a $4,300/mo agency — starting today.
                </p>
                <div className="tc-checkout-price">
                  <span className="tc-price-amount">{includeBump ? "$44" : "$27"}</span>
                  <span className="tc-price-detail">one-time payment</span>
                </div>
              </div>

              {/* ORDER BUMP SECTION */}
              <div className={`tc-order-bump ${includeBump ? "tc-bump-active" : ""}`}>
                <label className="tc-bump-label">
                  <input
                    type="checkbox"
                    checked={includeBump}
                    onChange={(e) => setIncludeBump(e.target.checked)}
                    disabled={loading}
                    className="tc-bump-checkbox"
                  />
                  <div className="tc-bump-content">
                    <div className="tc-bump-title">
                      <span className="tc-bump-badge">ONE TIME OFFER</span>
                      <h4>Add the Agency Launch Toolkit</h4>
                    </div>
                    <p>
                      Done-for-you client contract template, onboarding checklist, and 30-day launch plan. The missing pieces between buying the blueprint and landing your first client. <strong>(+$17)</strong>
                    </p>
                  </div>
                </label>
              </div>

              {/* Stripe Embedded Checkout */}
              <div className="tc-checkout-form">
                {clientSecret ? (
                  <div style={{ opacity: loading ? 0.5 : 1, transition: "opacity 0.2s" }}>
                    <EmbeddedCheckoutProvider
                      key={clientSecret}
                      stripe={stripePromise}
                      options={{ clientSecret }}
                    >
                      <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                  </div>
                ) : (
                  <div className="tc-checkout-loading">
                    Loading secure checkout...
                  </div>
                )}
              </div>

              <div className="tc-checkout-footer">
                <p className="tc-guarantee">
                  🔒 Try it risk-free with a 30-Day 100% Money-Back Guarantee
                </p>
              </div>

              {/* Benefits sidebar */}
              <div className="tc-sidebar-benefits">
                <ul>
                  <li>✓ Instant digital delivery</li>
                  <li>✓ 9 copy-paste outreach scripts</li>
                  <li>✓ The AI fulfillment secret</li>
                  <li>✓ Pricing &amp; anchoring guide</li>
                  <li>✓ Client management templates</li>
                  <li>✓ 30-day money-back guarantee</li>
                </ul>
              </div>

              {/* About the creator */}
              <div className="tc-sidebar-about">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/kathleen-photo.png"
                  alt="Kathleen Celmins, founder of Glow Social"
                  className="tc-founder-photo"
                />
                <p>
                  <strong>Kathleen Celmins</strong> is the founder of{" "}
                  <strong>Glow Social</strong>, a social media management
                  agency. She teaches a lean, high-profit agency model —
                  combining AI automation with personal client relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
