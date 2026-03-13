import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
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
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      type: "article",
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) notFound();

  const contentHtml = markdownToHtml(post.content);

  return (
    <article className="blog-post">
      <div className="blog-post-header">
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          <span>{post.readingTime}</span>
        </div>
      </div>

      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <div className="post-cta-box">
        <h3>Want more expert insights?</h3>
        <p>
          Explore more articles on building a profitable online business from
          your expertise.
        </p>
        <Link href="/articles" className="btn btn--primary">
          Browse All Articles
        </Link>
      </div>
    </article>
  );
}
