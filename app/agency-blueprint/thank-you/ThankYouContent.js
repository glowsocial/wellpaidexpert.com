"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const upgraded = searchParams.get("upgraded") === "true";

  return (
    <div className="thankyou">
      <div className="thankyou-icon">✓</div>

      <h1>Order Confirmed.</h1>

      <p className="thankyou-subtitle">
        {upgraded
          ? "You purchased two things. Access both of them below — no email required."
          : "Your Agency Blueprint is ready right now. No login needed — it lives here."
        }
      </p>

      <div className="thankyou-card">
        <h2>① Your Agency Blueprint</h2>
        <p>
          The complete system — niche selection, outreach scripts, proposal
          templates, pricing frameworks, and the fulfillment secret. Access it
          instantly via the link below.
        </p>
        <Link href="/agency-blueprint/guide" className="thankyou-cta">
          Open Your Blueprint →
        </Link>
        <p className="thankyou-bookmark">
          📌 Bookmark this page — this is how you come back to your blueprint later.
        </p>
      </div>

      {/* What to do next — for all buyers */}
      <div className="thankyou-steps">
        <h3>Your next 3 moves:</h3>
        <ol>
          <li>
            <strong>Read the Niche Selection Framework first</strong> — it&apos;s
            Chapter 1 and it determines everything else.
          </li>
          <li>
            <strong>Pick one cold outreach script</strong> and send it to 5
            prospects this week. Don&apos;t wait until you&apos;ve read the whole blueprint.
          </li>
          <li>
            <strong>Bookmark this page</strong> so you can come back to your
            blueprint any time — no login required.
          </li>
        </ol>
      </div>

      {upgraded && (
        <div className="thankyou-card thankyou-card-dark">
          <h2>② Your Glow Social Lifetime Access</h2>
          <p>
            Your lifetime license is active. Log in or create your account on
            Glow Social to start managing content for your agency and clients.
            Your plan covers up to 6 brands.
          </p>
          <a
            href="https://app.glowsocial.com"
            target="_blank"
            rel="noopener noreferrer"
            className="thankyou-cta thankyou-cta-light"
          >
            Access Your Dashboard →
          </a>
        </div>
      )}

      {!upgraded && (
        <div className="thankyou-upgrade-reminder">
          <p className="thankyou-upgrade-eyebrow">ONE-TIME OFFER — Still Available</p>
          <h3>Want software to run the whole system on autopilot?</h3>
          <p>
            The Blueprint works best when Glow Social handles content creation
            for your clients. Skip the 5-tool tech stack — get lifetime access
            to Glow Social (you + 5 client brands) for a single $997 payment.
            No monthly fees. Ever.
          </p>
          <a
            href="https://glowsocial.com"
            target="_blank"
            rel="noopener noreferrer"
            className="thankyou-upgrade-link"
          >
            Learn about Glow Social lifetime access →
          </a>
        </div>
      )}
    </div>
  );
}
