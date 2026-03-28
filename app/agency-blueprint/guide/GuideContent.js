"use client";

import { useState, useEffect, useRef } from "react";

const GLOW_PREVIEW_URL = "https://glowsocial.com";
const GLOW_AGENCY_URL = "https://glowsocial.com";

const CHAPTERS = [
  { id: "niche", num: "01", title: "Pick Your Niche" },
  { id: "outreach", num: "02", title: "Cold Outreach Scripts" },
  { id: "preview", num: "03", title: "Show, Don\u2019t Tell" },
  { id: "proposal", num: "04", title: "The Proposal Template" },
  { id: "pricing", num: "05", title: "Pricing Your Services" },
  { id: "fulfillment", num: "06", title: "The Fulfillment Secret" },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      className={`copy-btn ${copied ? "copied" : ""}`}
      onClick={handleCopy}
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          Copied!
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
          Copy
        </>
      )}
    </button>
  );
}

export default function GuideContent() {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(null);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(Math.round((scrollTop / docHeight) * 100), 100) : 0;
      setProgress(pct);

      // Show sticky nav after scrolling past the TOC
      setNavVisible(scrollTop > 600);

      // Determine active chapter
      let currentChapter = null;
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            currentChapter = CHAPTERS[i].id;
            break;
          }
        }
      }
      setActiveChapter(currentChapter);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* ===== PROGRESS BAR ===== */}
      <div className="guide-progress-bar" aria-hidden="true">
        <div
          className="guide-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div
        className={`guide-progress-label ${progress > 0 ? "visible" : ""}`}
      >
        {progress}% complete
      </div>

      {/* ===== STICKY CHAPTER NAV ===== */}
      <nav
        className={`guide-chapter-nav ${navVisible ? "visible" : ""}`}
        aria-label="Chapter navigation"
      >
        {CHAPTERS.map((ch) => (
          <button
            key={ch.id}
            className={`guide-chapter-nav-item ${activeChapter === ch.id ? "active" : ""}`}
            onClick={() => scrollToChapter(ch.id)}
            title={ch.title}
          >
            <span className="nav-num">{ch.num}</span>
          </button>
        ))}
      </nav>

      <div className="guide">
        {/* ===== HEADER ===== */}
        <header className="guide-header">
          <p className="ab-eyebrow">The Well-Paid Expert</p>
          <h1>The Social Media Agency Blueprint</h1>
          <p className="guide-subtitle">
            Everything you need to land your first social media management client
            — without creating a single post yourself.
          </p>
          <div className="guide-welcome">
            <p>
              <strong>Welcome.</strong> What you&apos;re holding is not a
              course. It&apos;s a system. Every script, template, and framework in
              this guide is pulled directly from a working social media agency. No
              theory — just what actually works.
            </p>
            <p>
              This guide is designed to work alongside your Glow Social agency
              plan — the fulfillment engine that handles all the content
              creation so you can focus on winning and managing clients.{" "}
              <em>
                (If you haven&apos;t activated your agency plan yet, you can{" "}
                <a
                  href={GLOW_AGENCY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--maroon)", textDecoration: "underline" }}
                >
                  do that here
                </a>
                .)
              </em>
            </p>
          </div>
          <button
            className="guide-download-btn"
            onClick={() => window.print()}
            title="Save this guide as a PDF"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Save as PDF
          </button>
        </header>

        {/* ===== TABLE OF CONTENTS ===== */}
        <nav className="guide-toc">
          <h2>What&apos;s Inside</h2>
          <ol>
            {CHAPTERS.map((ch) => (
              <li key={ch.id}>
                <a
                  href={`#${ch.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToChapter(ch.id);
                  }}
                >
                  {ch.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ===== CHAPTER 1: NICHE ===== */}
        <section className="guide-chapter" id="niche">
          <div className="chapter-number">01</div>
          <h2>Pick Your Niche</h2>
          <p className="chapter-tagline">
            The right niche makes everything else easier.
          </p>

          <p>
            Most new agency owners make the same mistake: they try to serve
            everyone. &ldquo;I do social media for small businesses.&rdquo; That
            is not a business. That is a vague offer nobody will pay premium
            prices for.
          </p>

          <p>
            The businesses that pay the most for social media management share
            three traits:
          </p>

          <ul className="guide-checklist">
            <li>
              <span className="check">✓</span>
              <span>
                <strong>High customer lifetime value</strong> — A single new
                client is worth thousands to them, so paying $750/month for social
                media is a no-brainer if it brings even one extra customer
              </span>
            </li>
            <li>
              <span className="check">✓</span>
              <span>
                <strong>They&apos;re too busy to do it themselves</strong> — They
                know they need social media, but they&apos;re running the
                business. They want someone to take it off their plate entirely.
              </span>
            </li>
            <li>
              <span className="check">✓</span>
              <span>
                <strong>They already spend on marketing</strong> — If they run
                ads, sponsor events, or do any marketing, adding social media is
                easy to justify. You&apos;re not creating the budget — you&apos;re
                redirecting it.
              </span>
            </li>
          </ul>

          <p>
            Here are the niches I recommend. This is based on real data from
            running an agency, not internet theory:
          </p>

          <table className="niche-table">
            <thead>
              <tr>
                <th>Niche</th>
                <th>Monthly Fee</th>
                <th>Ease of Closing</th>
                <th>Why It Works</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Med Spas &amp; Aesthetics</strong></td>
                <td>$750–$1,500</td>
                <td className="rating">★★★★★</td>
                <td>Visual-first business. Clients pay $3K+ per treatment. Social media is their #1 new client channel.</td>
              </tr>
              <tr>
                <td><strong>Real Estate Agents</strong></td>
                <td>$500–$1,000</td>
                <td className="rating">★★★★☆</td>
                <td>One listing sold covers a year of your fee. They&apos;re always networking but hate posting.</td>
              </tr>
              <tr>
                <td><strong>Chiropractors &amp; Dentists</strong></td>
                <td>$500–$1,000</td>
                <td className="rating">★★★★☆</td>
                <td>Recurring patient model. They understand marketing ROI. Usually 1-2 locations, easy to manage.</td>
              </tr>
              <tr>
                <td><strong>Home Services</strong></td>
                <td>$500–$750</td>
                <td className="rating">★★★★★</td>
                <td>Plumbers, HVAC, roofers, landscapers — they have zero time and big ticket jobs. Desperate for help.</td>
              </tr>
              <tr>
                <td><strong>Restaurants &amp; Cafés</strong></td>
                <td>$400–$750</td>
                <td className="rating">★★★☆☆</td>
                <td>Easy to create visually, but margins are tighter. Best as a starter niche to build a portfolio.</td>
              </tr>
              <tr>
                <td><strong>Gyms &amp; Studios</strong></td>
                <td>$500–$1,000</td>
                <td className="rating">★★★★☆</td>
                <td>Membership model means stable budgets. Tons of visual content to work with. Community-focused.</td>
              </tr>
            </tbody>
          </table>

          <div className="guide-tip">
            <p className="tip-label">Pro Tip</p>
            <p>
              Start with one niche. Not two. Not three. One. When you specialize,
              every proposal you write gets better because you can speak the
              language of that industry. Your second client is 10x easier when you
              can say &ldquo;I already do this for [similar business].&rdquo;
            </p>
          </div>

          <p>
            <strong>Niches to avoid when starting out:</strong> E-commerce brands
            (they measure everything by ROAS and you&apos;ll be fighting with
            their ad agency), personal brands and influencers (scope creep
            nightmare), and B2B SaaS (long sales cycles, complex buying
            committees).
          </p>
        </section>

        {/* ===== CHAPTER 2: OUTREACH ===== */}
        <section className="guide-chapter" id="outreach">
          <div className="chapter-number">02</div>
          <h2>Cold Outreach Scripts</h2>
          <p className="chapter-tagline">
            Copy. Paste. Personalize. Send.
          </p>

          <p>
            You don&apos;t need a personal brand, a following, or a website to
            land your first client. You need a LinkedIn account and these scripts.
            The goal is simple: start a conversation, not pitch a service.
          </p>

          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: "36px 0 16px" }}>
            LinkedIn Connection Request
          </h3>

          <div className="script-box">
            <CopyButton text={`Hi [First Name] — I came across [Business Name] and love what you're doing with [specific detail about their business]. I work with [niche] businesses on their social media presence. Would love to connect!`} />
            <p className="script-box-label">Connection Request (300 char limit)</p>
            <p>
              Hi [First Name] — I came across [Business Name] and love what
              you&apos;re doing with [specific detail about their business]. I
              work with [niche] businesses on their social media presence.
              Would love to connect!
            </p>
            <p className="script-note">
              ✏️ The specific detail is everything. &ldquo;Love your new
              location&rdquo; or &ldquo;Your reviews on Google are
              incredible&rdquo; — anything that proves you actually looked at
              their business.
            </p>
          </div>

          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: "36px 0 16px" }}>
            LinkedIn Follow-Up DM (After They Accept)
          </h3>

          <div className="script-box">
            <CopyButton text={`Thanks for connecting, [First Name]! Quick question — I noticed [Business Name]'s social media hasn't been updated in a while (or: could use a refresh). Is that something you're looking to improve, or is it intentional?

If they respond "yes" or show interest:

I actually put together a quick mockup of what your social feed could look like — took me about 60 seconds. Want me to send it over? No strings attached.`} />
            <p className="script-box-label">Follow-Up Message</p>
            <p>
              Thanks for connecting, [First Name]! Quick question — I noticed
              [Business Name]&apos;s social media hasn&apos;t been updated in a
              while (or: could use a refresh). Is that something you&apos;re
              looking to improve, or is it intentional?
            </p>
            <p>
              If they respond &ldquo;yes&rdquo; or show interest:
            </p>
            <p>
              I actually put together a quick mockup of what your social feed
              could look like — took me about 60 seconds. Want me to send it over?
              No strings attached.
            </p>
            <p className="script-note">
              ✏️ This transitions into the &ldquo;Show, Don&apos;t Tell&rdquo;
              method (Chapter 3). You&apos;re not pitching — you&apos;re offering
              a free preview. Massive difference.
            </p>
          </div>

          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: "36px 0 16px" }}>
            Cold Email Sequence
          </h3>

          <p>
            If you prefer email over LinkedIn — or want to do both — here&apos;s a
            3-email sequence that generates replies. These are short on purpose.
            Nobody reads long cold emails.
          </p>

          <div className="email-sequence">
            <div className="email-item">
              <CopyButton text={`Subject: Quick idea for [Business Name]'s social media

Hi [First Name],

I work with [niche] businesses on their social media, and I noticed [Business Name] could be doing a lot more to attract customers on Instagram/Facebook/LinkedIn.

I put together a quick preview of what your feed could look like — took me 60 seconds using a tool I use for all my clients.

Want me to send it over? Totally free, no catch.

— [Your Name]`} />
              <div className="email-day">Email 1 — Day 1</div>
              <div className="email-subject">Subject: Quick idea for [Business Name]&apos;s social media</div>
              <div className="email-body">
                <p>Hi [First Name],</p>
                <p>I work with [niche] businesses on their social media, and I noticed [Business Name] could be doing a lot more to attract customers on Instagram/Facebook/LinkedIn.</p>
                <p>I put together a quick preview of what your feed could look like — took me 60 seconds using a tool I use for all my clients.</p>
                <p>Want me to send it over? Totally free, no catch.</p>
                <p>— [Your Name]</p>
              </div>
            </div>

            <div className="email-item">
              <CopyButton text={`Subject: Re: Quick idea for [Business Name]'s social media

Hi [First Name], just bumping this up. I know you're busy running [Business Name] — that's actually why I reached out.

Most [niche] owners I talk to know they need better social media but don't have the time. That's literally what I do.

Would a 10-minute call this week make sense?`} />
              <div className="email-day">Email 2 — Day 3</div>
              <div className="email-subject">Subject: Re: Quick idea for [Business Name]&apos;s social media</div>
              <div className="email-body">
                <p>Hi [First Name], just bumping this up. I know you&apos;re busy running [Business Name] — that&apos;s actually why I reached out.</p>
                <p>Most [niche] owners I talk to know they need better social media but don&apos;t have the time. That&apos;s literally what I do.</p>
                <p>Would a 10-minute call this week make sense?</p>
              </div>
            </div>

            <div className="email-item">
              <CopyButton text={`Subject: Last one from me

[First Name] — I don't want to be that person who won't stop emailing. So this is my last note.

If better social media is on your radar for [Business Name], I'd love to show you a quick preview of what it could look like. If not, no worries at all.

Either way, keep up the great work with [specific compliment about their business].`} />
              <div className="email-day">Email 3 — Day 7</div>
              <div className="email-subject">Subject: Last one from me</div>
              <div className="email-body">
                <p>[First Name] — I don&apos;t want to be that person who won&apos;t stop emailing. So this is my last note.</p>
                <p>If better social media is on your radar for [Business Name], I&apos;d love to show you a quick preview of what it could look like. If not, no worries at all.</p>
                <p>Either way, keep up the great work with [specific compliment about their business].</p>
              </div>
            </div>
          </div>

          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: "36px 0 16px" }}>
            Follow-Up &amp; &ldquo;Breakup&rdquo; Scripts
          </h3>

          <p>
            If you don&apos;t hear back after the initial outreach, here are
            two scripts that recover deals without being annoying:
          </p>

          <div className="script-box">
            <CopyButton text={`Hi [Name] — just checking in on the proposal I sent over. I know things get busy. Is this still on your radar, or has the timing changed? Either way, no pressure — just want to make sure I'm not leaving you hanging.`} />
            <p className="script-box-label">Follow-Up (3 Days After Proposal)</p>
            <p>
              Hi [Name] — just checking in on the proposal I sent over. I know
              things get busy. Is this still on your radar, or has the timing
              changed? Either way, no pressure — just want to make sure I&apos;m
              not leaving you hanging.
            </p>
            <p className="script-note">
              ✏️ Keep it under 100 words. Don&apos;t restate the whole proposal.
              Just check in and reiterate one benefit.
            </p>
          </div>

          <div className="script-box">
            <CopyButton text={`Hi [Name], I haven't heard back, so I'm assuming this isn't a priority right now. Totally understand — I'll close out your file on my end. If things change down the road, my door is always open. Keep doing great things with [Business Name]!`} />
            <p className="script-box-label">The &ldquo;Breakup&rdquo; Email (After 3 Follow-Ups)</p>
            <p>
              Hi [Name], I haven&apos;t heard back, so I&apos;m assuming this
              isn&apos;t a priority right now. Totally understand — I&apos;ll
              close out your file on my end. If things change down the road, my
              door is always open. Keep doing great things with [Business Name]!
            </p>
            <p className="script-note">
              ✏️ This email gets the most replies. People respond to the fear of
              losing the option. About 20% of &ldquo;breakup&rdquo; emails
              re-open the conversation.
            </p>
          </div>

          <div className="guide-callout">
            <h3>The Golden Rule of Cold Outreach</h3>
            <p>
              Never pitch the service in the first message. Always pitch the{" "}
              <strong>preview</strong>. The preview sells itself. Your job is just
              to get them to look at it.
            </p>
          </div>
        </section>

        {/* ===== CHAPTER 3: SHOW DON'T TELL ===== */}
        <section className="guide-chapter" id="preview">
          <div className="chapter-number">03</div>
          <h2>The &ldquo;Show, Don&apos;t Tell&rdquo; Method</h2>
          <p className="chapter-tagline">
            Your secret weapon for closing clients on the spot.
          </p>

          <p>
            This is the single most powerful tool in your arsenal. Forget
            proposals, slide decks, and case studies. Here&apos;s what actually
            closes deals: <strong>showing people what their social media could look
            like.</strong>
          </p>

          <p>
            Think about it. Every other agency sends a PDF proposal.
            You&apos;re going to show up with{" "}
            <em>their brand, their colors, real posts</em> — before they&apos;ve
            paid you a cent. It&apos;s like walking into a car dealership and
            getting to drive the car before hearing the price.
          </p>

          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: "36px 0 16px" }}>
            How It Works
          </h3>

          <ol className="guide-steps">
            <li>
              <span>
                <strong>Open your Glow Social dashboard</strong> — Log in to{" "}
                <a
                  href={GLOW_PREVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--maroon)", textDecoration: "underline" }}
                >
                  Glow Social
                </a>{" "}
                and use the Preview tool. Enter the prospect&apos;s business name,
                industry, and any details from their website.{" "}
                <em>
                  (Don&apos;t have an account yet?{" "}
                  <a
                    href={GLOW_AGENCY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--maroon)", textDecoration: "underline" }}
                  >
                    Activate your agency plan
                  </a>
                  .)
                </em>
              </span>
            </li>
            <li>
              <span>
                <strong>Generate a sample feed</strong> — In about 60 seconds,
                the tool builds a visual mockup of what their social media
                presence could look like with professional content. This is your
                secret weapon — no other agency can do this.
              </span>
            </li>
            <li>
              <span>
                <strong>Share it with the prospect</strong> — Screenshot it, send
                the link, or screen-share it on a call. Say: &ldquo;I put this
                together for you — this is what your social media could look
                like.&rdquo;
              </span>
            </li>
            <li>
              <span>
                <strong>Let them react</strong> — Don&apos;t pitch yet. Let them
                say &ldquo;wow&rdquo; or &ldquo;this is great&rdquo; or &ldquo;how
                did you do this?&rdquo; Their excitement does the selling for you.
              </span>
            </li>
            <li>
              <span>
                <strong>Transition into the close</strong> — &ldquo;If you like
                this, I can do this for you every month. Want me to put together a
                quick proposal?&rdquo;
              </span>
            </li>
          </ol>

          <div className="guide-tip">
            <p className="tip-label">Why This Works</p>
            <p>
              Every other agency describes what they <em>could</em> do. You
              show what it <em>will</em> look like. This eliminates the biggest
              objection: &ldquo;But will it actually look good?&rdquo; They can
              see it. Right now. With their brand.
            </p>
          </div>

          <div className="script-box">
            <CopyButton text={`"So I actually took a few minutes before our call and put together a mockup of what [Business Name]'s social media could look like. Can I share my screen? I want to show you something."

[Share screen, show the preview, wait for reaction]

"This is the kind of content we'd be creating for you every month — tailored to [their industry], designed to attract [their ideal customer]. We handle everything so you can focus on running [Business Name]. Would it make sense for me to put together a quick proposal?"`} />
            <p className="script-box-label">On a Call — The Transition Script</p>
            <p>
              &ldquo;So I actually took a few minutes before our call and put
              together a mockup of what [Business Name]&apos;s social media could
              look like. Can I share my screen? I want to show you
              something.&rdquo;
            </p>
            <p>
              [Share screen, show the preview, wait for reaction]
            </p>
            <p>
              &ldquo;This is the kind of content we&apos;d be creating for you
              every month — tailored to [their industry], designed to attract
              [their ideal customer]. We handle everything so you can focus on
              running [Business Name]. Would it make sense for me to put together a
              quick proposal?&rdquo;
            </p>
          </div>
        </section>

        {/* ===== CHAPTER 4: PROPOSAL ===== */}
        <section className="guide-chapter" id="proposal">
          <div className="chapter-number">04</div>
          <h2>The Proposal Template</h2>
          <p className="chapter-tagline">
            Fill in the blanks. Send. Close.
          </p>

          <p>
            Your proposal should be short, specific, and impossible to
            misunderstand. The biggest mistake new agency owners make is
            over-explaining. Your prospect doesn&apos;t care about your process,
            your tools, or your team. They care about what they get and what it
            costs.
          </p>

          <div className="proposal-template">
            <div className="proposal-template-header">
              <h3>Social Media Management Proposal</h3>
              <p>Copy this template. Fill in the blanks for each prospect.</p>
            </div>
            <div className="proposal-template-body">
              <h4>Prepared For</h4>
              <p>
                <span className="fill-blank">[Business Name]</span> —{" "}
                <span className="fill-blank">[Owner Name]</span>
              </p>

              <h4>What You Get</h4>
              <p>&bull; Professional, on-brand social media content posted consistently across{" "}<span className="fill-blank">[platforms]</span></p>
              <p>&bull; <span className="fill-blank">[X]</span> posts per week, designed to attract{" "}<span className="fill-blank">[target customer]</span></p>
              <p>&bull; Content calendar so you always know what&apos;s coming</p>
              <p>&bull; Monthly performance snapshot — what&apos;s working, what&apos;s next</p>

              <h4>Investment</h4>
              <p><span className="fill-blank">$[amount]</span>/month — billed monthly, cancel anytime with 30 days notice.</p>

              <h4>What Happens Next</h4>
              <p>1. You say &ldquo;let&apos;s do it&rdquo;</p>
              <p>2. I send you a short onboarding form (brand colors, voice, any preferences)</p>
              <p>3. Content starts within 5 business days</p>

              <h4>Why Me</h4>
              <p>
                I specialize in social media for{" "}
                <span className="fill-blank">[niche]</span> businesses. I
                already manage social media for{" "}
                <span className="fill-blank">[number or &ldquo;several&rdquo;]</span>{" "}
                similar businesses, so I understand what{" "}
                <span className="fill-blank">[their customers]</span> want to see.
              </p>
            </div>
          </div>

          <div className="guide-tip">
            <p className="tip-label">Keep it short</p>
            <p>
              This entire proposal fits on one page. That&apos;s intentional.
              Long proposals signal that you&apos;re trying to convince them.
              Short proposals signal confidence. If the preview sold them (it
              did), this is just paperwork.
            </p>
          </div>

          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: "36px 0 16px" }}>
            The 5-Minute AI Proposal Hack
          </h3>

          <p>
            Here&apos;s a real secret from my agency. After every sales call, I
            generate a polished, professional proposal in <strong>under 5
            minutes</strong> using AI. Here&apos;s the exact prompt:
          </p>

          <div className="script-box">
            <CopyButton text={`I run a social media management agency. I just had a sales call with [client name] from [their company]. Here are my notes: [paste notes or transcript].

Write a professional proposal that includes: (1) Summary of their situation and goals, (2) My proposed solution / scope of work, (3) What's included and what's NOT included, (4) Timeline, (5) Investment options: [Option 1 vs Option 2], (6) Next steps to get started.

Tone: professional but warm. Length: 1-2 pages max.`} />
            <p className="script-box-label">AI Proposal Prompt — Copy This</p>
            <p>
              I run a social media management agency. I just had a sales call
              with [client name] from [their company]. Here are my notes:
              [paste notes or transcript].
            </p>
            <p>
              Write a professional proposal that includes: (1) Summary of their
              situation and goals, (2) My proposed solution / scope of work,
              (3) What&apos;s included and what&apos;s NOT included, (4) Timeline,
              (5) Investment options: [Option 1 vs Option 2], (6) Next steps to
              get started.
            </p>
            <p>
              Tone: professional but warm. Length: 1-2 pages max.
            </p>
            <p className="script-note">
              ✏️ Use ChatGPT, Claude, or any AI tool. After the proposal is
              generated, do a 3-minute edit: (1) Are the details accurate?
              (2) Does the price match what you discussed? (3) Does it sound
              like you? (4) Is there a clear next step? The first agency to
              send a professional proposal wins the deal 78% of the time.
              Speed wins.
            </p>
          </div>

          <div className="guide-callout">
            <h3>On Your Call: Capture These 6 Things</h3>
            <p>
              Before you can generate a proposal, you need good notes. During
              every sales call, capture: <strong>👤 Who</strong> (client name,
              company, contact) · <strong>❓ What</strong> (what they need,
              scope) · <strong>🔥 Why Now</strong> (what&apos;s driving urgency) ·{" "}
              <strong>📅 When</strong> (timeline, deadlines) ·{" "}
              <strong>💰 Budget</strong> (their budget or your quote) ·{" "}
              <strong>⚡ Special</strong> (preferences, concerns). Paste all of
              this into the AI prompt above.
            </p>
          </div>
        </section>

        {/* ===== CHAPTER 5: PRICING ===== */}
        <section className="guide-chapter" id="pricing">
          <div className="chapter-number">05</div>
          <h2>Pricing Your Services</h2>
          <p className="chapter-tagline">
            Charge more than you think. Here&apos;s why.
          </p>

          <p>
            New agency owners drastically underprice. They think &ldquo;I&apos;ll
            charge $200/month to get started.&rdquo; This is the fastest way to
            burn out and quit. Here&apos;s the truth about pricing:
          </p>

          <p>
            <strong>Clients who pay $200/month are worse than clients who pay
            $750/month.</strong> This sounds backwards, but cheap clients:
          </p>

          <ul className="guide-checklist">
            <li><span className="check">✕</span><span>Nickel-and-dime every request</span></li>
            <li><span className="check">✕</span><span>Don&apos;t value your work (because they&apos;re not paying enough to care)</span></li>
            <li><span className="check">✕</span><span>Cancel fastest — they&apos;re always &ldquo;testing&rdquo;</span></li>
            <li><span className="check">✕</span><span>Require the same amount of your time as a $750 client</span></li>
          </ul>

          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: "36px 0 16px" }}>
            Recommended Pricing Tiers
          </h3>

          <table className="niche-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Includes</th>
                <th>Price</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Starter</strong></td>
                <td>3 posts/week, 1 platform</td>
                <td className="rating">$500/mo</td>
                <td>New clients, smaller budgets. Use to get your foot in the door.</td>
              </tr>
              <tr>
                <td><strong>Growth</strong></td>
                <td>5 posts/week, 2 platforms</td>
                <td className="rating">$750/mo</td>
                <td>Your bread and butter. Most clients land here.</td>
              </tr>
              <tr>
                <td><strong>Premium</strong></td>
                <td>Daily posts, 3 platforms, monthly strategy call</td>
                <td className="rating">$1,500/mo</td>
                <td>High-value businesses with real budgets. Med spas, multi-location.</td>
              </tr>
            </tbody>
          </table>

          <div className="guide-callout">
            <h3>The Pricing Script</h3>
            <p>
              When they ask &ldquo;how much?&rdquo; — never say the number first.
              Say: &ldquo;It depends on how many platforms and how much content you
              need. Most of my [niche] clients invest between $500 and $1,500 per
              month. Based on what we discussed, I&apos;d recommend the [package
              name] at $[amount].&rdquo; Always anchor high, then recommend the
              middle tier.
            </p>
          </div>

          <div className="guide-tip">
            <p className="tip-label">Never Discount — Do This Instead</p>
            <p>
              If they push back on price, don&apos;t lower it. Remove scope
              instead. &ldquo;I can bring it down to $500 if we do 2 platforms
              instead of 3.&rdquo; This protects your rate and trains them to
              understand that cheap = less.
            </p>
          </div>
        </section>

        {/* ===== CHAPTER 6: FULFILLMENT ===== */}
        <section className="guide-chapter" id="fulfillment">
          <div className="chapter-number">06</div>
          <h2>The Fulfillment Secret</h2>
          <p className="chapter-tagline">
            How to deliver world-class content without creating it yourself.
          </p>

          <p>
            Here&apos;s the part that makes this entire business model work. And
            it&apos;s the reason everything else in this guide is possible.
          </p>

          <p>
            <strong>You don&apos;t create the content.</strong> You manage the
            client relationship, provide brand direction, and handle communication.
            The actual content — the posts, the copy, the scheduling — is handled
            by your{" "}
            <a
              href={GLOW_AGENCY_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--maroon)", textDecoration: "underline" }}
            >
              Glow Social
            </a>{" "}
            agency plan — the content engine built specifically for agencies like
            yours.
          </p>

          <p>
            If you&apos;ve already activated your agency plan, here&apos;s
            exactly how to use it to service your clients.{" "}
            <em>
              (If you haven&apos;t set it up yet,{" "}
              <a
                href={GLOW_AGENCY_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--maroon)", textDecoration: "underline" }}
              >
                activate it here
              </a>{" "}
              — $199/month covers up to 6 brands.)
            </em>
          </p>

          <ol className="guide-steps">
            <li>
              <span>
                <strong>Log in to your agency dashboard</strong> — Your plan
                covers up to 6 brands at $199/month. That&apos;s $33 per client.
              </span>
            </li>
            <li>
              <span>
                <strong>Add your client as a brand</strong> — In your dashboard,
                add a new brand with their info, colors, voice, and preferences.
              </span>
            </li>
            <li>
              <span>
                <strong>Content gets created for you</strong> — Up to 30
                optimized posts per month per brand: a mix of static images,
                short-form videos, and carousels. Plus unlimited custom posts
                for specific announcements or promos your clients need.
              </span>
            </li>
            <li>
              <span>
                <strong>You review and approve</strong> — You&apos;re the
                quality control layer. Check the content, suggest tweaks if
                needed, approve in 2 minutes. Your clients think you&apos;re
                doing all of this yourself.
              </span>
            </li>
            <li>
              <span>
                <strong>Content gets published</strong> — Posts go live on
                Facebook, Instagram, LinkedIn, Google Business, TikTok, and
                YouTube Shorts. Scheduled automatically. You look like a hero.
              </span>
            </li>
          </ol>

          <div className="guide-tip">
            <p className="tip-label">What Your Clients See vs. What You Do</p>
            <p>
              Your client sees: a professional agency delivering consistent,
              beautiful social media content across all their platforms every
              month. What you actually do: onboard them, review content, approve
              posts, and collect the check. The system handles everything else.
            </p>
          </div>

          <div className="guide-math">
            <h3>The Agency Math</h3>
            <div className="guide-math-row">
              <div className="guide-math-item">
                <div className="num">$750</div>
                <div className="label">You charge per client</div>
              </div>
              <div className="guide-math-item">
                <div className="num">×6</div>
                <div className="label">Clients</div>
              </div>
              <div className="guide-math-item">
                <div className="num">$4,500</div>
                <div className="label">Monthly revenue</div>
              </div>
            </div>
            <div className="guide-math-row">
              <div className="guide-math-item">
                <div className="num">−$199</div>
                <div className="label">Glow Social (6 brands)</div>
              </div>
            </div>
            <div className="guide-math-result">
              $4,301/mo profit
              <div className="label">95.6% margin</div>
            </div>
          </div>

          <p>
            Read that again. Your cost is $199/month. Your revenue from 6 clients
            at $750 each is $4,500/month. That&apos;s a 95% profit margin on a
            business you can run in 10–15 hours per week.
          </p>

          <p>
            Compare that to hiring a graphic designer ($2,000+/month), a
            copywriter ($1,500+/month), and a social media scheduler ($50+/month).
            The agency plan replaces all of it.
          </p>

          <p>
            <strong>What the $199/month plan includes for each brand:</strong>
          </p>

          <ul className="guide-checklist">
            <li><span className="check">✓</span><span>30 done-for-you posts per month — your feed is never empty</span></li>
            <li><span className="check">✓</span><span>Unlimited video generation — Reels, TikToks, Shorts at no extra cost</span></li>
            <li><span className="check">✓</span><span>Unlimited custom posts — for client-specific announcements, promos, events</span></li>
            <li><span className="check">✓</span><span>All platforms: Facebook, Instagram, LinkedIn, Google Business, TikTok, YouTube Shorts</span></li>
            <li><span className="check">✓</span><span>AI-optimized content mix — static images, carousels, and video, balanced for engagement</span></li>
          </ul>

          <div className="guide-tip">
            <p className="tip-label">Your role in this model</p>
            <p>
              You are the <strong>account manager</strong>, not the content
              creator. Your job is to win clients, maintain relationships, and
              ensure they&apos;re happy. The content machine runs behind you.
              This is how you scale to $10K, $15K, $20K/month without hiring a
              team.
            </p>
          </div>
        </section>

        {/* ===== NEXT STEP CTA ===== */}
        <div className="guide-next-step">
          <h2>You Have Everything. Now Execute.</h2>
          <p>
            You have the scripts. You have the proposal template. You know the
            pricing. Your Glow Social agency plan handles the fulfillment.
            The only thing left is to land your first client this week.
          </p>
          <p style={{ fontSize: "0.95rem", opacity: 0.85, marginBottom: "32px" }}>
            <em>
              Haven&apos;t activated your agency plan yet? Do it now and your
              first 6 clients are covered for $199/month — that&apos;s $33 per
              brand.
            </em>
          </p>
          <a
            href={GLOW_AGENCY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--lg"
          >
            Open Your Glow Social Dashboard →
          </a>
        </div>
      </div>
    </>
  );
}
