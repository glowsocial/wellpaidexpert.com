#!/usr/bin/env node
/**
 * AI Blog Post Generator — thewellpaidexpert.com
 *
 * Generates SEO + AEO-optimized markdown posts using Claude Haiku.
 *
 * ONE-TIME SETUP:
 *   Add ANTHROPIC_API_KEY as a GitHub Actions secret (repo Settings → Secrets → Actions)
 *   Key available at: https://console.anthropic.com/settings/keys
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-blog-posts.js
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-blog-posts.js --count 5
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-blog-posts.js --keyword "how to price consulting services"
 *
 * Posts land in content/blog/ ready to commit and deploy.
 */

const fs   = require('fs');
const path = require('path');

const BLOG_DIR        = path.resolve(__dirname, '..', 'content', 'blog');
const API_KEY         = process.env.ANTHROPIC_API_KEY;
const MODEL           = 'claude-haiku-4-5';
const DEFAULT_COUNT   = 10;
const DELAY_MS        = 1500;

if (!API_KEY) {
  console.error('❌  Set ANTHROPIC_API_KEY environment variable.');
  console.error('   Get your key at: https://console.anthropic.com/settings/keys');
  process.exit(1);
}

// ─── Target keyword bank ─────────────────────────────────────────────────────
const KEYWORDS = [
  // Pricing & packaging
  "how to price consulting services as an expert",
  "how to charge more for your services without losing clients",
  "value-based pricing for consultants and coaches",
  "how to package your expertise into a productized service",
  "pricing strategy for solopreneurs who want to earn more",
  "how to raise your rates without losing clients",
  "what to charge for a one-hour consultation",
  "how to stop trading time for money as a consultant",
  "retainer pricing model for consultants",
  "how to create recurring revenue as a solopreneur",

  // Offers & funnels
  "how to create a digital product from your expertise",
  "how to sell an online course without a big audience",
  "best lead magnets for consultants and coaches 2026",
  "how to build a sales funnel for a consulting business",
  "how to get consulting clients without cold calling",
  "how to write a sales page for a high-ticket offer",
  "how to validate a digital product idea before building it",
  "how to launch your first online course as an expert",
  "how to sell consulting services online",
  "email sequence for selling a digital product",

  // Authority & positioning
  "how to position yourself as an expert in your niche",
  "how to become a recognized expert and get paid for it",
  "how to build authority online as a consultant",
  "personal brand strategy for solopreneurs",
  "how to get speaking engagements as a consultant",
  "how to get press coverage as a solopreneur",
  "how to build a thought leadership platform from scratch",
  "LinkedIn strategy for consultants who want more clients",
  "how to use content marketing to attract consulting clients",
  "podcast guesting strategy for growing your expert brand",

  // Client acquisition
  "how to get your first consulting client",
  "how to find high-ticket clients online",
  "referral strategy for consultants and coaches",
  "how to use LinkedIn to generate consulting leads",
  "cold email strategy for consultants",
  "how to attract dream clients who pay premium prices",
  "how to close consulting deals without being pushy",
  "discovery call script for consultants",
  "how to follow up with potential consulting clients",
  "how to niche down and attract better clients",

  // Systems & scale
  "how to scale a consulting business without hiring",
  "how solopreneurs manage multiple clients without burning out",
  "best tools for running a one-person consulting business",
  "how to automate your consulting business",
  "time management for solopreneurs with multiple revenue streams",
  "how to systematize your expert business",

  // AI for experts
  "how solopreneurs use AI to create more content in less time",
  "best AI tools for consultants and coaches 2026",
  "how to use AI to write your newsletter as an expert",
  "can you use AI to build your personal brand",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function keywordToSlug(keyword) {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function existingSlugs() {
  return new Set(
    fs.readdirSync(BLOG_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''))
  );
}

function today() {
  return new Date().toISOString().split('T')[0];
}

async function callClaude(prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text;
  if (!text) throw new Error('Empty response from Claude');
  return text.replace(/^```(?:markdown)?\n?/, '').replace(/\n?```$/, '');
}

function buildPrompt(keyword) {
  return `You are writing a blog post for The Well-Paid Expert (thewellpaidexpert.com), a website by Kathleen Celmins that helps consultants, coaches, freelancers, and solopreneurs get paid well for their expertise. The site's core product is "Become a Well-Paid Expert" — a book and $27 Agency Blueprint that teaches experts how to build recurring revenue from what they know.

Voice: Direct, warm, experienced. Like a smart mentor who's been in the trenches and cuts through the noise. First-person occasional. Opinionated. Anti-fluff. Kathleen's audience has tried all the generic advice — give them the real stuff.

Write a complete, publication-ready blog post targeting this keyword: "${keyword}"

The post MUST:
- Be genuinely useful and specific (not generic "5 tips to grow your business" fluff)
- Include at least one concrete framework, script, example, or step-by-step section
- Mention the Agency Blueprint or Kathleen's book naturally in the closing CTA (link: https://thewellpaidexpert.com/agency-blueprint)
- Be 900–1,300 words
- Use H1, H2 subheadings, and a closing paragraph with CTA

Return ONLY valid markdown in this exact format — no extra commentary, no code fences around the whole thing:

---
title: "[Compelling title with keyword — punchy, specific, not clickbait]"
description: "[150-character meta description with primary keyword near the start]"
slug: "${keywordToSlug(keyword)}"
date: "${today()}"
tags: ["[tag1]", "[tag2]", "[tag3]"]
faq:
  - q: "[Long-tail question someone would type into Google or ask an AI — minimum 10 words]"
    a: "[Specific, thorough answer — 3–5 sentences. Kathleen's voice. No fluff.]"
  - q: "[Second question — different angle on the topic, minimum 10 words]"
    a: "[Specific, thorough answer — 3–5 sentences]"
  - q: "[Third question — minimum 10 words]"
    a: "[Specific, thorough answer — 3–5 sentences]"
  - q: "[Fourth question — minimum 10 words]"
    a: "[Specific, thorough answer — 3–5 sentences]"
  - q: "[Fifth question — minimum 10 words]"
    a: "[Specific, thorough answer — 3–5 sentences]"
---

[Blog post body — H1 first, then the full post]`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { count: DEFAULT_COUNT, keyword: null };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--count' && args[i + 1]) opts.count = parseInt(args[i + 1]);
    if (args[i] === '--keyword' && args[i + 1]) opts.keyword = args[i + 1];
  }
  return opts;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const opts     = parseArgs();
  const existing = existingSlugs();

  let targets = opts.keyword
    ? [opts.keyword]
    : KEYWORDS.filter(kw => !existing.has(keywordToSlug(kw)));

  if (targets.length === 0) {
    console.log('✅  All keywords already have posts. Add more to the KEYWORDS array.');
    return;
  }

  targets = targets.slice(0, opts.count);
  console.log(`\n🚀  Generating ${targets.length} post(s) for thewellpaidexpert.com...\n`);

  const results = { created: [], failed: [] };

  for (const keyword of targets) {
    const slug = keywordToSlug(keyword);
    const file = path.join(BLOG_DIR, `${slug}.md`);

    if (fs.existsSync(file)) {
      console.log(`⏭   Skipping (exists): ${slug}`);
      continue;
    }

    process.stdout.write(`✍️   "${keyword}" ... `);

    try {
      const content = await callClaude(buildPrompt(keyword));

      if (!content.trim().startsWith('---')) {
        throw new Error('Response did not start with frontmatter');
      }

      fs.writeFileSync(file, content.trim() + '\n');
      console.log(`✅  ${slug}.md`);
      results.created.push(slug);
    } catch (err) {
      console.log(`❌  FAILED: ${err.message}`);
      results.failed.push({ keyword, error: err.message });
    }

    if (targets.indexOf(keyword) < targets.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n─────────────────────────────────────`);
  console.log(`✅  Created: ${results.created.length}`);
  if (results.failed.length > 0) {
    console.log(`❌  Failed:  ${results.failed.length}`);
    results.failed.forEach(f => console.log(`     • ${f.keyword}: ${f.error}`));
  }
  console.log(`\nNext step: git add content/blog && git commit -m "content: add ${results.created.length} AI-generated posts" && git push`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
