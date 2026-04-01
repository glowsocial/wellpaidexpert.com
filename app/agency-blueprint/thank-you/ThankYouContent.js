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
          : "Your Agency Blueprint is ready to access right now. No email needed — it lives here."
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
        <div className="thankyou-reminder">
          <p>
            <strong>Want to run the whole system on autopilot?</strong>{" "}
            The Blueprint works best when Glow Social handles the content
            creation for your clients.{" "}
            <a
              href="https://glowsocial.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn about Glow Social →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
