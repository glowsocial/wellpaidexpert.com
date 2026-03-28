import { Suspense } from "react";
import ThankYouContent from "./ThankYouContent";
import "./thankyou.css";

export const metadata = {
  title: "Welcome — Your Agency Blueprint Is Ready | The Well-Paid Expert",
  description: "Access your Social Media Agency Blueprint.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "120px 20px", textAlign: "center" }}>
          Loading...
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
