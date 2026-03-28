import { Suspense } from "react";
import UpsellContent from "./UpsellContent";
import "./upsell.css";

export const metadata = {
  title: "Special Offer — Glow Social Agency Plan | The Well-Paid Expert",
  description:
    "Activate your agency fulfillment engine. Up to 6 client brands, AI-powered content, multi-platform publishing.",
  robots: { index: false, follow: false },
};

export default function UpsellPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "120px 20px", textAlign: "center" }}>
          Loading your offer...
        </div>
      }
    >
      <UpsellContent />
    </Suspense>
  );
}
