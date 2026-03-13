import Link from "next/link";
import { getAllBlogPosts } from "@/lib/posts";
import "./home.css";

export default function HomePage() {
  const posts = getAllBlogPosts().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              You deserve to be <span className="gold">well paid</span> for
              your expertise.
            </h1>
            <p className="hero-sub">
              Helping experts add $100,000+ per year with what they already
              know. Through email lists, quiz funnels, LinkedIn strategy, and
              digital products.
            </p>
            <div className="hero-actions">
              <Link href="/articles" className="btn btn--primary btn--lg">
                Explore Articles
              </Link>
              <Link href="/about" className="btn btn--outline btn--lg">
                About Kathleen
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-glow"></div>
      </section>

      {/* Value Props */}
      <section className="value-props">
        <div className="container">
          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon">&#9993;</div>
              <h3>Email List Building</h3>
              <p>
                Build a monetizable email list from scratch using proven
                strategies, quiz funnels, and lead magnets that convert.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">&#128640;</div>
              <h3>Sales Funnels</h3>
              <p>
                Create profitable sales funnels that turn your expertise into
                digital products and passive income streams.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">&#128161;</div>
              <h3>LinkedIn Strategy</h3>
              <p>
                Leverage LinkedIn to land high-ticket B2B clients, build your
                personal brand, and grow your authority.
              </p>
            </div>
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
            <div style={{ textAlign: "center", marginTop: "32px" }}>
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
