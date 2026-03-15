"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="site-logo">
          The Well-Paid Expert
        </Link>

        <nav className="site-nav">
          <Link href="/articles">Articles</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="header-ctas">
          <Link href="/articles" className="btn btn--primary">
            Read the Blog
          </Link>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <Link href="/articles" onClick={() => setMenuOpen(false)}>
          Articles
        </Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <Link
          href="/articles"
          className="btn btn--primary"
          onClick={() => setMenuOpen(false)}
        >
          Read the Blog
        </Link>
      </nav>
    </header>
  );
}
