"use client";

import { useState } from "react";

export default function CheckoutButton({ children, className }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      className={className}
      onClick={handleCheckout}
      disabled={loading}
      style={loading ? { opacity: 0.6, cursor: "not-allowed" } : {}}
    >
      {loading ? "Redirecting to checkout..." : children}
    </button>
  );
}
