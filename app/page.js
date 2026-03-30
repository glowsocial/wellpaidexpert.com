import Link from "next/link";
import { getAllBlogPosts } from "@/lib/posts";
import "./home.css";

export default function HomePage() {
  const posts = getAllBlogPosts().slice(0, 6);

  return (
    <>
      {/* Hero — Centered card selling the vision of the Blueprint */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-card">
            <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", marginBottom: "20px" }}>
              Start Your Own $100k/year Boutique Social Media Agency.
            </h1>
            <p className="hero-sub" style={{ fontSize: "1.15rem", lineHeight: 1.6, color: "var(--text-mid)", marginBottom: "32px" }}>
              Get the exact step-by-step blueprint we use to sign clients, fulfill without burnout, and scale a lean, highly profitable online business.
            </p>
            <Link href="/agency-blueprint" className="btn btn--primary btn--lg">
              Get the $27 Blueprint &rarr;
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

      {/* The Gap / Pitch Section */}
      <section className="the-gap" style={{ padding: '100px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', marginBottom: 24 }}>You don&apos;t need more followers. You need a <em>system</em>.</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-mid)', marginBottom: 64, lineHeight: 1.6, maxWidth: 640, margin: '0 auto 64px auto' }}>
              Most experts spend hours a day on LinkedIn or Instagram, hoping for inbound leads. We built a system that actively creates high-margin recurring revenue—without you dancing on TikTok.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32, textAlign: 'left' }}>
              <div style={{ background: 'var(--cream)', padding: 40, borderTop: '4px solid var(--text)' }}>
                <h3 style={{ marginBottom: 16, fontSize: '1.4rem' }}>The Blueprint</h3>
                <p style={{ color: 'var(--text-mid)', lineHeight: 1.6 }}>The exact 6-chapter, step-by-step playbook to operationalize your expertise and sell it as a recurring productized service.</p>
              </div>
              <div style={{ background: 'var(--cream)', padding: 40, borderTop: '4px solid var(--text)' }}>
                <h3 style={{ marginBottom: 16, fontSize: '1.4rem' }}>Client Acquisition</h3>
                <p style={{ color: 'var(--text-mid)', lineHeight: 1.6 }}>How to close $1,000+/mo retainers using a simple, friction-free sales pitch that positions you as the prize.</p>
              </div>
              <div style={{ background: 'var(--cream)', padding: 40, borderTop: '4px solid var(--text)' }}>
                <h3 style={{ marginBottom: 16, fontSize: '1.4rem' }}>Profitable Fulfillment</h3>
                <p style={{ color: 'var(--text-mid)', lineHeight: 1.6 }}>How to actually do the work in 1/10th the time by utilizing the right tech stack and eliminating client bottleneck.</p>
              </div>
            </div>
            
            <div style={{ marginTop: 64 }}>
              <Link href="/agency-blueprint" className="btn btn--primary btn--lg">
                View the Full Syllabus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles (SEO & Nurture) */}
      {posts.length > 0 && (
        <section className="latest-articles" style={{ background: 'var(--cream-dark)' }}>
          <div className="container">
            <h2>Latest Marketing Insights</h2>
            <p className="section-sub">
              Free strategies to help you monetize your expertise before you buy.
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
          </div>
        </section>
      )}

      {/* Bottom CTA to funnel */}
      <section className="bottom-cta" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="cta-card">
            <h2>Ready to build your boutique agency?</h2>
            <p>
              Stop giving your expertise away for free. Learn the strategies that help
              solopreneurs build six-figure recurring revenue streams from what they already know.
            </p>
            <Link href="/agency-blueprint" className="btn btn--primary btn--lg">
              Get the $27 Blueprint &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
