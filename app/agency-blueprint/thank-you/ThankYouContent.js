"use client";

import { useSearchParams } from "next/navigation";

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const upgraded = searchParams.get("upgraded") === "true";

  return (
    <div className="thankyou">
      <div className="thankyou-icon">✓</div>

      <h1>You&apos;re In.</h1>

      <p className="thankyou-subtitle">
        {upgraded
          ? "Your Agency Blueprint and Glow Social Agency Plan are both active. You're ready to start landing clients today."
          : "Your Agency Blueprint is ready. Open it below and start landing your first client."}
      </p>

      <div className="thankyou-card">
        <h2>Your Agency Blueprint</h2>
        <p>
          The complete system — niche selection, outreach scripts, proposal
          templates, pricing frameworks, and the fulfillment secret.
        </p>
        <a href="/agency-blueprint/guide" className="thankyou-cta">
          Open Your Blueprint →
        </a>
        <p className="thankyou-bookmark">
          📌 Bookmark this page. You can come back to it anytime.
        </p>
      </div>

      {upgraded && (
        <div className="thankyou-card thankyou-card-dark">
          <h2>Your Glow Social Agency Dashboard</h2>
          <p>
            Add your first client brand, generate content, and start
            publishing. Your plan covers up to 6 brands.
          </p>
          <a
            href="https://glowsocial.com"
            target="_blank"
            rel="noopener noreferrer"
            className="thankyou-cta thankyou-cta-light"
          >
            Go to Your Dashboard →
          </a>
        </div>
      )}

      {!upgraded && (
        <div className="thankyou-reminder">
          <p>
            <strong>Remember:</strong> The Blueprint works best with Glow
            Social handling your content creation. When you&apos;re ready to
            activate your agency plan,{" "}
            <a
              href="https://glowsocial.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              visit glowsocial.com
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
