import { getAllBlogPosts } from "@/lib/posts";

export default function sitemap() {
  const posts = getAllBlogPosts();
  const baseUrl = "https://thewellpaidexpert.com";

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}/`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/articles/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...postUrls,
  ];
}
