"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="site-logo">
          the well-paid <span className="accent">expert</span>
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
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        <Link href="/articles" onClick={() => setMobileOpen(false)}>
          Articles
        </Link>
        <Link href="/about" onClick={() => setMobileOpen(false)}>
          About
        </Link>
        <Link
          href="/articles"
          className="btn btn--primary"
          onClick={() => setMobileOpen(false)}
        >
          Read the Blog
        </Link>
      </nav>
    </header>
  );
}
