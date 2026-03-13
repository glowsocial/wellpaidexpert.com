import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="site-logo">
              the well-paid <span className="accent">expert</span>
            </div>
            <p>
              Helping experts add $100,000+ per year with what they already
              know. You deserve to be paid well for your expertise.
            </p>
          </div>

          <div className="footer-col">
            <h4>Content</h4>
            <Link href="/articles">Articles</Link>
            <Link href="/about">About</Link>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} The Well-Paid Expert</span>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
