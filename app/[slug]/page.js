import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  formatPostDate,
  getAllSlugs,
  getPostBySlug,
  getAllBlogPosts,
} from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";

export async function generateStaticParams() {
  const slugs = getAllSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.description || post.title,
    alternates: {
      canonical: `/${slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      type: "article",
      ...(post.image && {
        images: [{ url: post.image, alt: post.title }],
      }),
    },
  };
}

function buildArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description || post.title,
    datePublished: post.date || new Date().toISOString(),
    dateModified: post.date || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "Kathleen Celmins",
      url: "https://thewellpaidexpert.com/about/",
    },
    publisher: {
      "@type": "Organization",
      name: "The Well-Paid Expert",
      url: "https://thewellpaidexpert.com",
      logo: {
        "@type": "ImageObject",
        url: "https://thewellpaidexpert.com/favicon.ico",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thewellpaidexpert.com/${post.slug}/`,
    },
    ...(post.image && {
      image: {
        "@type": "ImageObject",
        url: post.image,
      },
    }),
  };
}

function buildFaqSchema(faq) {
  if (!faq || !Array.isArray(faq) || faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      // Support both {question, answer} and {q, a} key formats
      name: item.question || item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer || item.a,
      },
    })),
  };
}

function buildHowToSchema(post) {
  // Only for HowTo schema_type — extracts steps from H3 headings
  if (post.schema_type !== "HowTo") return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: post.title,
    description: post.description || post.title,
    author: {
      "@type": "Person",
      name: "Kathleen Celmins",
    },
  };
}

function getRelatedPosts(currentPost, allPosts, limit = 3) {
  if (!currentPost.tags || currentPost.tags.length === 0) return [];

  const currentTags = new Set(currentPost.tags);

  return allPosts
    .filter((p) => p.slug !== currentPost.slug)
    .map((p) => {
      const sharedTags = (p.tags || []).filter((t) => currentTags.has(t));
      return { post: p, score: sharedTags.length };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) notFound();

  const contentHtml = markdownToHtml(post.content);
  const allPosts = getAllBlogPosts();
  const relatedPosts = getRelatedPosts(post, allPosts);

  const articleSchema = buildArticleSchema(post);
  const faqSchema = buildFaqSchema(post.faq || post.faqs);
  const howToSchema = buildHowToSchema(post);
  const publishedDate = formatPostDate(post.date);

  const schemas = [articleSchema, faqSchema, howToSchema].filter(Boolean);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article className="blog-post">
        <div className="blog-post-header">
          {post.image && (
            <div className="blog-post-image">
              <Image
                src={post.image}
                alt={post.title}
                width={960}
                height={540}
                priority
                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
              />
            </div>
          )}
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            {publishedDate && (
              <time dateTime={post.date}>Published {publishedDate}</time>
            )}
            <span>{post.readingTime}</span>
          </div>
        </div>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {relatedPosts.length > 0 && (
          <div className="related-posts">
            <h3>Keep reading</h3>
            <ul className="related-posts-list">
              {relatedPosts.map((rp) => (
                <li key={rp.slug}>
                  <Link href={`/${rp.slug}/`}>{rp.title}</Link>
                  {rp.description && (
                    <p className="related-post-desc">{rp.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="post-cta-box">
          <h3>Keep exploring The Well-Paid Expert.</h3>
          <p>
            Browse the full article archive for more practical ideas on
            marketing, operations, strategy, and small business growth.
          </p>
          <Link href="/articles/" className="btn btn--primary">
            View All Articles
          </Link>
        </div>
      </article>
    </>
  );
}
