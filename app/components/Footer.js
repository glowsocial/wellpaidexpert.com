"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide the footer on the upsell page where we want an assumed close and no distractions
  if (pathname && pathname.includes('/agency-blueprint/upsell')) {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="site-logo">The Well-Paid Expert</div>
            <p>
              Helping experts add $100,000+ per year with what they already
              know.
            </p>
          </div>

          <div className="footer-col">
            <h4>Content</h4>
            <Link href="/articles">Articles</Link>
            <Link href="/about">About</Link>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} The Well-Paid Expert. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
