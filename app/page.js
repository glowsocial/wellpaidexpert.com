import Link from "next/link";
import { getAllBlogPosts } from "@/lib/posts";
import "./home.css";

export default function HomePage() {
  const posts = getAllBlogPosts().slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-card">
            <p className="hero-kicker">Independent Business Library</p>
            <h1>The Well-Paid Expert</h1>
            <p className="hero-sub">
              Practical articles for consultants, creators, and small business
              owners who want clearer strategy, steadier revenue, and smarter
              systems.
            </p>
            <Link href="/articles/" className="btn btn--primary btn--lg">
              Browse Articles &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="social-proof">
        <div className="container">
          <span className="proof-label">Topics:</span>
          <div className="proof-logos">
            <span className="proof-logo">Expertise</span>
            <span className="proof-logo">Marketing</span>
            <span className="proof-logo">Operations</span>
          </div>
        </div>
      </section>

      <section className="value-section">
        <div className="container">
          <div className="value-intro">
            <p className="value-eyebrow">What you will find here</p>
            <h2>Useful thinking for people building leaner businesses.</h2>
            <p className="value-desc">
              The archive covers positioning, sales, recurring revenue, AI,
              small business operations, and the practical decisions that make a
              business easier to run.
            </p>
          </div>
          <div className="value-grid">
            <div>
              <h3>Strategy</h3>
              <p>Sharper ways to package expertise, price work, and make better business decisions.</p>
            </div>
            <div>
              <h3>Visibility</h3>
              <p>Marketing and authority-building ideas for getting seen by the right audience.</p>
            </div>
            <div>
              <h3>Operations</h3>
              <p>Systems, tools, and workflows that help small teams keep the work moving.</p>
            </div>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="latest-articles">
          <div className="container">
            <h2>Latest Articles</h2>
            <p className="section-sub">
              Fresh writing from the archive.
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

      <section className="bottom-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Explore the full archive.</h2>
            <p>
              Browse guides, essays, and practical business articles by date.
            </p>
            <Link href="/articles/" className="btn btn--white-outline btn--lg">
              View All Articles &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
