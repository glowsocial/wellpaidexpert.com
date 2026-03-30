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

  // Redirect if no session
  useEffect(() => {
    if (!sessionId) router.replace("/agency-blueprint");
  }, [sessionId, router]);

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
      {/* ===== WARNING HEADER ===== */}
      <div className="oto-warning-bar">
        <p>Step 1 Complete. Order Confirmed.</p>
        <p className="oto-warning-sub">We have a one-time invitation for you before you access your blueprint.</p>
      </div>

      <div className="oto-progress-bar">
        <div className="oto-progress-fill" style={{ width: "100%" }}></div>
      </div>

      <div className="oto-container">
        {/* ===== HOOK ===== */}
        <div className="oto-header">
          <h1>
            Never Pay Subscriptions Again. <br/>Own <span className="oto-highlight">Glow Social</span> for Life.
          </h1>
          <p className="oto-hook">
            You have the systems. Now you need the software to execute them. By default, running an agency requires piecing together 5 different tools. We built a single platform that does it all.
          </p>
        </div>

        {/* ===== VSL PLACEHOLDER ===== */}
        <div className="oto-video-wrapper">
          <div className="oto-video-placeholder">
            <svg className="oto-play-btn" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            <p>Your OTO Video Here (2-3 mins)</p>
          </div>
        </div>

        {/* ===== THE PITCH ===== */}
        <div className="oto-content-box">
          <h2>Glow Social Boutique Plan (Lifetime Access)</h2>
          <p>
            The difference between people who <em>read</em> about running an agency and people who <em>actually run one</em> is getting the tech stack out of the way so they can just sell.
          </p>
          
          <div className="oto-split">
            <div className="oto-split-col oto-split-without">
              <h3>The Hard Way</h3>
              <ul>
                <li><svg className="icon-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Wrangling Zapier/Make connections</li>
                <li><svg className="icon-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Managing content in messy CSVs</li>
                <li><svg className="icon-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Designing graphics from scratch in Canva</li>
                <li><svg className="icon-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Hacking together a client portal</li>
                <li><svg className="icon-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Paying $199/month for software subscriptions</li>
              </ul>
            </div>
            <div className="oto-split-col oto-split-with">
              <h3>With Lifetime Access</h3>
              <ul>
                <li><svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Fully configured, white-labeled client portal</li>
                <li><svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Built-in scheduling and publishing</li>
                <li><svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> AI trained in your exact style</li>
                <li><svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Seamless onboarding system</li>
                <li><svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Never pay a recurring fee. Ever.</li>
              </ul>
            </div>
          </div>

          <div className="oto-bento-section">
            <h3>What's included in your Lifetime License:</h3>
            <div className="oto-bento-grid">
              <div className="oto-bento-card">
                <div className="oto-bento-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>
                <h4>White-Label Portals for You + 5 Clients</h4>
                <p>Your domain, your brand, your logo. Manage content for your own agency plus 5 recurring clients in an experience you own entirely.</p>
              </div>
              <div className="oto-bento-card">
                <div className="oto-bento-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>
                <h4>Custom AI Calibration</h4>
                <p>Dial in the AI prompts within the software so it generates content that sounds exactly like your clients.</p>
              </div>
              <div className="oto-bento-card">
                <div className="oto-bento-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
                <h4>Automated Approval Flows</h4>
                <p>Friction-free content intake and client approval system, built right into the app to stop email threading.</p>
              </div>
              <div className="oto-bento-card oto-bento-highlight">
                <div className="oto-bento-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
                <h4>Lifetime Software Updates</h4>
                <p>Use the entire platform forever without the looming $199/month fee. Any future updates, you get them.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== THE MATH & FOUNDER ===== */}
        <div className="oto-roi-founder-wrapper">
          <div className="oto-math-card">
            <h3>Visualizing the ROI</h3>
            <div className="oto-math-comparison">
              <div className="oto-math-monthly">
                <span className="math-label">The Standard Way</span>
                <span className="math-cost">$199<span className="math-period">/mo</span></span>
                <span className="math-total">Total: $11,940 over 5 years</span>
              </div>
              <div className="oto-math-vs">VS</div>
              <div className="oto-math-lifetime">
                <span className="math-label">Your Lifetime Deal</span>
                <span className="math-cost">$997<span className="math-period">/once</span></span>
                <span className="math-total">Total: $997 forever</span>
              </div>
            </div>
            <p className="oto-math-breaker">You break even in exactly 5 months. After that, 100% of your software cost stays in your pocket as agency profit.</p>
          </div>

          <div className="oto-founder-note">
            <div className="founder-avatar">
              KC
            </div>
            <div className="founder-text">
              <strong>A note from Kathleen:</strong>
              <p>"I'm offering this Lifetime Deal because our highest-performing agency partners are the ones who don't have to stress about recurring overhead. You get full access to the Glow Social Boutique plan, giving you everything you need to run a high-margin boutique agency—and any feature we add to it in the future, you get it automatically."</p>
            </div>
          </div>
        </div>

        {/* ===== CALL TO ACTION ===== */}
        <div className="oto-cta-section">
          <div className="oto-cta-price">
            <span className="oto-cta-amount">$997</span>
            <span className="oto-cta-per">One-Time Payment</span>
          </div>
          
          <p className="oto-guarantee-text">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            100% Risk-Free. 14-Day Money Back Guarantee.
          </p>

          <button
            className="oto-btn-yes"
            onClick={handleUpsell}
            disabled={loading}
          >
            {loading ? (
              <span className="oto-spinner">Processing...</span>
            ) : (
              <div className="oto-btn-content">
                <span className="oto-btn-title">YES! UPGRADE MY ORDER</span>
                <span className="oto-btn-sub">Add Lifetime Software Access (One-click upgrade)</span>
              </div>
            )}
          </button>
          
          {error && <p className="oto-error">{error}</p>}

          <button className="oto-btn-no" onClick={handleDecline}>
            No thanks. I'll stick to paying monthly software fees and hacking together my own tech stack. Let me access the blueprint now.
          </button>
        </div>
      </div>
    </div>
  );
}
