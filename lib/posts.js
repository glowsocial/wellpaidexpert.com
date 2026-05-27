import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function formatPostDate(date) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

/**
 * Get all posts from a specific content subdirectory.
 * Supports .md and .mdx files.
 * Expects frontmatter: title, date, description, (optional) slug, tags
 */
function getPostsFromDir(subdir) {
  const dir = path.join(CONTENT_DIR, subdir);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => /\.(md|mdx)$/.test(f));

  return files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const slug = data.slug || filename.replace(/\.(md|mdx)$/, "");
    const stats = readingTime(content);

    return {
      slug,
      category: subdir,
      content,
      readingTime: stats.text,
      ...data,
      // Ensure date is serializable
      date: data.date ? new Date(data.date).toISOString() : null,
    };
  });
}

/**
 * Titles that indicate a failed Wayback Machine capture (Cloudflare challenge pages)
 */
const STUB_TITLES = ["Loader", "One moment, please..."];

/**
 * Get all blog posts (from content/blog/)
 */
export function getAllBlogPosts() {
  return getPostsFromDir("blog")
    .filter((p) => p.title && p.title.length > 0 && !STUB_TITLES.includes(p.title) && !p.draft)
    .sort((a, b) => {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      return (a.title || "").localeCompare(b.title || "");
    });
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(category, slug) {
  const dir = path.join(CONTENT_DIR, category);

  // Try both .md and .mdx
  for (const ext of [".md", ".mdx"]) {
    const filePath = path.join(dir, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const stats = readingTime(content);

      return {
        slug,
        category,
        content,
        readingTime: stats.text,
        ...data,
        date: data.date ? new Date(data.date).toISOString() : null,
      };
    }
  }

  return null;
}

/**
 * Get all slugs for a category (for static generation)
 * Filters out stub posts with Cloudflare challenge titles
 */
export function getAllSlugs(category) {
  const dir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => /\.(md|mdx)$/.test(f))
    .filter((f) => {
      const filePath = path.join(dir, f);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      return data.title && !STUB_TITLES.includes(data.title) && !data.draft;
    })
    .map((f) => f.replace(/\.(md|mdx)$/, ""));
}
