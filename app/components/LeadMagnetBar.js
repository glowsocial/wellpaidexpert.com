"use client";

import { useState } from "react";
import "./LeadMagnetBar.css";

export default function LeadMagnetBar({ variant = "default" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      } else {
        setStatus("success");
        setMessage("");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={`lmb lmb--${variant} lmb--success`} role="alert">
        <div className="lmb-success-icon">✓</div>
        <div>
          <p className="lmb-success-title">It&apos;s on its way.</p>
          <p className="lmb-success-sub">
            Check your inbox for the Agency Launch Checklist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`lmb lmb--${variant}`}>
      <div className="lmb-inner">
        <div className="lmb-copy">
          <p className="lmb-eyebrow">FREE DOWNLOAD</p>
          <h3 className="lmb-title">Get the Agency Launch Checklist</h3>
          <p className="lmb-sub">
            The exact steps to go from zero to your first $750/month retainer
            client — condensed into a single actionable checklist. No fluff.
          </p>
        </div>

        <form className="lmb-form" onSubmit={handleSubmit}>
          <div className="lmb-input-row">
            <input
              id="lmb-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your best email address"
              required
              className="lmb-input"
              disabled={status === "loading"}
              autoComplete="email"
            />
            <button
              type="submit"
              className="lmb-btn"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send It →"}
            </button>
          </div>
          {message && <p className="lmb-error">{message}</p>}
          <p className="lmb-disclaimer">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}
