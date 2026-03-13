import Link from "next/link";
import { getAllBlogPosts } from "@/lib/posts";

export const metadata = {
  title: "Articles",
  description:
    "Expert insights on email list building, quiz funnels, LinkedIn strategy, digital products, and growing a profitable one-person business.",
};

export default function ArticlesPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <h1>Articles</h1>
          <p>
            Actionable strategies to help you monetize your expertise and build
            a profitable online business.
          </p>
        </div>
      </section>

      <section className="container">
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
      </section>
    </>
  );
}
