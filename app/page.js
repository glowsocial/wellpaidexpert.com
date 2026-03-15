import Link from "next/link";
import { getAllBlogPosts } from "@/lib/posts";
import "./home.css";

export default function HomePage() {
  const posts = getAllBlogPosts().slice(0, 6);

  return (
    <>
      {/* Hero — centered card on muted background, like the original */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-card">
            <h1>
              Helping experts add $100,000 with what they already have,{" "}
              <em>annually</em>.
            </h1>
            <Link href="/articles" className="btn btn--primary btn--lg">
              Teach Me How
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="container">
          <span className="proof-label">As seen in:</span>
          <div className="proof-logos">
            <span className="proof-logo">Trends</span>
            <span className="proof-logo">Up My Influence</span>
            <span className="proof-logo">Summer Camp</span>
          </div>
        </div>
      </section>

      {/* Value Section — split layout like original */}
      <section className="value-section">
        <div className="container">
          <div className="value-split">
            <div className="value-text">
              <p className="value-eyebrow">Come join...</p>
              <h2>The Well-Paid Expert Mastermind</h2>
              <p className="value-desc">
                A mastermind to discover and package your digital product to
                $100K+/year in just 12 weeks. Stop undercharging for your
                expertise and build the revenue stream you deserve.
              </p>
              <Link href="/articles" className="btn btn--outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="mission">
        <div className="container">
          <div className="mission-content">
            <h2>
              You deserve to be paid <em>more</em> for your expertise.
            </h2>
            <p>
              It&apos;s not enough to know something. You need to be paid, and
              paid well, for knowing what you know.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      {posts.length > 0 && (
        <section className="latest-articles">
          <div className="container">
            <h2>Latest Articles</h2>
            <p className="section-sub">
              Actionable insights to help you monetize your expertise
            </p>
            <div className="blog-grid">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${post.slug}`}
                  className="blog-card"
                >
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span>{post.readingTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>
                      {post.description
                        ? post.description.slice(0, 140) +
                          (post.description.length > 140 ? "..." : "")
                        : ""}
                    </p>
                    <span className="read-more">Read more &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link href="/articles" className="btn btn--outline">
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to become a well-paid expert?</h2>
            <p>
              Stop undervaluing your expertise. Learn the strategies that help
              freelancers, consultants, and solopreneurs build six-figure
              revenue streams from what they already know.
            </p>
            <Link href="/articles" className="btn btn--primary btn--lg">
              Start Reading &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
