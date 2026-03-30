import "./about.css";
import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Kathleen Celmins helps experts create digital products, build email lists, and add $100K+ in annual revenue from what they already know.",
};

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="container">
          <h1>About The Well-Paid Expert</h1>
          <p className="about-intro">
            The Well-Paid Expert is fueled by a desire to help business owners
            and freelancers escape the &ldquo;grind&rdquo; and step into their
            expertise in order to create sustainable wealth.
          </p>
        </div>
      </section>

      <section className="about-body">
        <div className="container">
          <div className="about-content">
            <h2>Our Mission</h2>
            <p>
              It&rsquo;s not enough to know something. You need to be paid, and
              paid well, for knowing what you know. The Well-Paid Expert exists
              to help you build the bridge between your expertise and a
              thriving, profitable business.
            </p>

            <h2>About Kathleen Celmins</h2>
            <p>
              Kathleen Celmins is the CEO, published author, and founder of The
              Well-Paid Expert. With years of experience helping solopreneurs,
              freelancers, and consultants build digital products, she has
              developed proven frameworks for turning expertise into revenue.
            </p>
            <p>
              Through her mastermind programs, digital courses, and one-on-one
              consulting, Kathleen has helped hundreds of experts discover how
              to package and sell their knowledge — creating businesses that
              generate $100,000+ per year without burning out.
            </p>

            <h2>What We Cover</h2>
            <ul>
              <li>Email list building and quiz funnels that convert</li>
              <li>Creating and selling digital products</li>
              <li>LinkedIn strategy for B2B client acquisition</li>
              <li>Sales funnel design and optimization</li>
              <li>Building a profitable one-person online business</li>
              <li>Thought leadership and personal branding</li>
            </ul>

            <div className="about-cta">
              <h3>Ready to become a well-paid expert?</h3>
              <p>
                Explore our articles and start building the business you
                deserve.
              </p>
              <Link href="/articles" className="btn btn--primary btn--lg">
                Read the Articles &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
