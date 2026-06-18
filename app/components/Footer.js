"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="site-logo">The Well-Paid Expert</div>
            <p>
              Practical articles for consultants, creators, and small business
              owners building leaner, smarter businesses.
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
