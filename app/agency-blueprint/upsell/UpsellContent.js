"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "./upsell.css";

export default function UpsellContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(59);

  // Redirect if no session
  useEffect(() => {
    if (!sessionId) router.replace("/agency-blueprint");
  }, [sessionId, router]);

  // Countdown timer — urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s === 0) {
          setMinutes((m) => (m === 0 ? 0 : m - 1));
          return 59;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUpsell = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/upsell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
      router.push(
        `/agency-blueprint/thank-you?session_id=${sessionId}&upgraded=true`
      );
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const handleDecline = () => {
    router.push(`/agency-blueprint/thank-you?session_id=${sessionId}`);
  };

  if (!sessionId) return null;

  return (
    <div className="oto">
      {/* ===== PATTERN INTERRUPT ===== */}
      <div className="oto-interrupt">
        <div className="oto-interrupt-inner">
          <p className="oto-wait">WAIT — YOUR ORDER IS NOT COMPLETE</p>
          <h1>
            You just got the playbook.
            <br />
            <span className="oto-highlight">
              Now get the machine that runs it.
            </span>
          </h1>
          <p className="oto-hook">
            Right now, you have the scripts, the templates, and the strategy.
            But you&apos;re still missing the one thing that turns this from
            a PDF into a <em>business</em>: the content engine.
          </p>
        </div>
      </div>

      {/* ===== THE GAP ===== */}
      <section className="oto-gap">
        <h2 className="oto-gap-title">
          Here&apos;s what happens to most people who buy blueprints:
        </h2>
        <div className="oto-timeline">
          <div className="oto-timeline-item oto-fade">
            <div className="oto-timeline-day">Day 1</div>
            <p>Excited. Read the whole thing. &ldquo;I&apos;m doing this.&rdquo;</p>
          </div>
          <div className="oto-timeline-item oto-fade">
            <div className="oto-timeline-day">Day 3</div>
            <p>
              Start sending outreach. A prospect says &ldquo;sure, show me
              what you can do.&rdquo;
            </p>
          </div>
          <div className="oto-timeline-item oto-fade oto-timeline-problem">
            <div className="oto-timeline-day">Day 4</div>
            <p>
              Panic. You need to actually <em>create content</em> for this
              person. You spend 6 hours on Canva making posts that look
              like they were made in 2019. The prospect ghosts you.
            </p>
          </div>
          <div className="oto-timeline-item oto-fade">
            <div className="oto-timeline-day">Day 14</div>
            <p>
              Blueprint is sitting in your downloads folder. You&apos;re
              back on Reddit wondering if this was a mistake.
            </p>
          </div>
        </div>

        <p className="oto-gap-bridge">
          This doesn&apos;t have to be you. The difference between people who
          <em> read</em> about running an agency and people who{" "}
          <em>actually run one</em> is always the same thing: fulfillment.
        </p>
      </section>

      {/* ===== THE OFFER ===== */}
      <section className="oto-offer">
        <div className="oto-offer-header">
          <p className="oto-offer-eyebrow">One-Time Offer — This Page Only</p>
          <h2>
            Glow Social handles <em>everything</em>
            <br />
            between &ldquo;the client said yes&rdquo;
            <br />
            and &ldquo;the content is live.&rdquo;
          </h2>
        </div>

        <div className="oto-split">
          <div className="oto-split-col oto-split-without">
            <h3>Without Glow Social</h3>
            <ul>
              <li>
                <span className="x-mark">✕</span> You create every post manually
              </li>
              <li>
                <span className="x-mark">✕</span> 2-4 hours per client per week
              </li>
              <li>
                <span className="x-mark">✕</span> Limited to 2-3 clients before burnout
              </li>
              <li>
                <span className="x-mark">✕</span> Every new client = more hours
              </li>
              <li>
                <span className="x-mark">✕</span> Can&apos;t take a vacation
              </li>
            </ul>
          </div>
          <div className="oto-split-col oto-split-with">
            <h3>With Glow Social</h3>
            <ul>
              <li>
                <span className="check-mark">✓</span> AI creates content in your client&apos;s voice
              </li>
              <li>
                <span className="check-mark">✓</span> 15 minutes per client per week
              </li>
              <li>
                <span className="check-mark">✓</span> Handle 6 clients without breaking a sweat
              </li>
              <li>
                <span className="check-mark">✓</span> Every new client = more profit, same effort
              </li>
              <li>
                <span className="check-mark">✓</span> Content runs while you sleep
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== THE MATH ===== */}
      <section className="oto-math-section">
        <h2>Let&apos;s do the math you&apos;re already doing in your head</h2>
        <div className="oto-math-blocks">
          <div className="oto-math-block">
            <div className="oto-math-num">$199<span>/mo</span></div>
            <div className="oto-math-desc">Your Glow Social cost</div>
          </div>
          <div className="oto-math-divider">÷</div>
          <div className="oto-math-block">
            <div className="oto-math-num">6</div>
            <div className="oto-math-desc">Clients you can manage</div>
          </div>
          <div className="oto-math-divider">=</div>
          <div className="oto-math-block oto-math-result">
            <div className="oto-math-num">$33<span>/client</span></div>
            <div className="oto-math-desc">Your cost per client</div>
          </div>
        </div>
        <p className="oto-math-punchline">
          You charge <strong>$500–$1,500</strong> per client.
          <br />
          Your fulfillment costs <strong>$33</strong>.
          <br />
          <em>That&apos;s a 93% margin business.</em>
        </p>
      </section>

      {/* ===== CTA BOX ===== */}
      <section className="oto-cta-section">
        <div className="oto-timer">
          <div className="oto-timer-icon">⏱</div>
          <p>
            This one-time offer expires in{" "}
            <strong>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </strong>
          </p>
        </div>

        <div className="oto-cta-box">
          <h2>Activate Your Agency Engine</h2>
          <p className="oto-cta-includes">
            Up to 6 client brands · AI content creation · Multi-platform
            publishing · Preview tool for closing prospects · Cancel anytime
          </p>

          <div className="oto-cta-price">
            <span className="oto-cta-amount">$199</span>
            <span className="oto-cta-per">/month</span>
          </div>

          <button
            className="oto-cta-btn"
            onClick={handleUpsell}
            disabled={loading}
          >
            {loading ? (
              <span className="oto-spinner">Processing...</span>
            ) : (
              <>
                YES — Activate My Agency Plan
                <span className="oto-cta-sub">
                  One click. No re-entering your card.
                </span>
              </>
            )}
          </button>

          {error && <p className="oto-error">{error}</p>}

          <p className="oto-guarantee">
            🔒 Cancel anytime from your dashboard. No contracts. No commitments.
            Your card on file will be charged $199 today.
          </p>
        </div>

        <button className="oto-decline" onClick={handleDecline}>
          No thanks, I&apos;ll figure out content creation on my own →
        </button>
      </section>
    </div>
  );
}
