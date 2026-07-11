/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // Old category pages → articles listing
      ...[
        "advertising", "ai", "automation", "careers", "construction",
        "customer-retention", "events", "finance", "franchising",
        "future-of-work", "growth", "healthcare", "hiring",
        "lead-generation", "leadership", "legal", "marketing-strategies",
        "nonprofit", "office-decor", "outdoor-spaces", "personal-finance",
        "productivity-and-mindset", "reflections", "revenue-streams",
        "running-a-business", "sales-strategies", "security", "seo",
        "starting-a-business", "sustainability", "vendor-relations",
      ].map((slug) => ({
        source: `/${slug}`,
        destination: "/articles",
        permanent: true,
      })),
      // Old static pages
      {
        source: "/call",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/cookie-policy",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/links",
        destination: "/",
        permanent: true,
      },
      {
        source: "/press",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/tools",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/agency-blueprint/:path*",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/who-am-i-anyway",
        destination: "/about",
        permanent: true,
      },
      // Slug renames — 301s preserve link equity from indexed URLs
      {
        source: "/3-leadership-statement-examples-that-actually-convey-vision-and-purpose",
        destination: "/leadership-statement-examples",
        permanent: true,
      },
      // Glow Social → Boomp rebrand — slugs updated to match, 301 preserves indexed URLs
      {
        source: "/does-glow-social-work-for-realtors",
        destination: "/does-boomp-work-for-realtors",
        permanent: true,
      },
      {
        source: "/does-glow-social-work-for-restaurants",
        destination: "/does-boomp-work-for-restaurants",
        permanent: true,
      },
      {
        source: "/does-glow-social-work-for-salons",
        destination: "/does-boomp-work-for-salons",
        permanent: true,
      },
      {
        source: "/glow-social-vs-hiring-social-media-manager",
        destination: "/boomp-vs-hiring-social-media-manager",
        permanent: true,
      },
      {
        source: "/glow-social-vs-hootsuite",
        destination: "/boomp-vs-hootsuite",
        permanent: true,
      },
      {
        source: "/how-does-glow-social-work",
        destination: "/how-does-boomp-work",
        permanent: true,
      },
      {
        source: "/how-much-does-glow-social-cost",
        destination: "/how-much-does-boomp-cost",
        permanent: true,
      },
      {
        source: "/what-platforms-does-glow-social-support",
        destination: "/what-platforms-does-boomp-support",
        permanent: true,
      },
      // Old landing pages → articles (or homepage)
      ...[
        "100kcasestudy-2", "100kcasestudy",
        "access-the-quiz-playbook-templates", "access-the-templates",
        "access-the-webinar-bundle", "application",
        "contentatscale", "convertkit",
        "discover-the-power-of-linkedin",
        "freelancers-build-scalable-income",
        "growing-your-email-list", "implement-a-quiz-funnel",
        "levelup", "linkedin-as-a-powerful-sales-tool",
        "mastermind", "metricool",
        "mindstorms-workbook", "mindstormsworkbookaccess",
        "paperform", "profitable-one-person-online-business",
        "reword", "should-you-build-a-quiz-to-grow-your-email-list",
        "swipefiles",
        "the-well-paid-experts-guide-to-linkedin-outreach-that-works",
        "upsell-all-the-templates",
      ].map((slug) => ({
        source: `/${slug}`,
        destination: "/articles",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
