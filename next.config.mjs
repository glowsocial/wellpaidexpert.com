/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
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
