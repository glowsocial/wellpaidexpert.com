import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

const source = pathToFileURL(path.resolve("lib/posts.js"));

for (const mode of ["production", "development"]) {
  test(`article metadata in ${mode}`, async () => {
    const cwd = process.cwd();
    const oldMode = process.env.NODE_ENV;
    const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "expert-posts-"));
    const article = path.join(fixture, "content/blog/example.md");
    fs.mkdirSync(path.dirname(article), { recursive: true });
    const writeArticle = (title) => fs.writeFileSync(article,
      `---\ntitle: ${title}\ndate: 2026-11-16\ntags: [marketing]\n---\nA useful article.\n`);
    try {
      process.chdir(fixture);
      process.env.NODE_ENV = mode;
      writeArticle("First title");
      const { getAllBlogPosts } = await import(`${source}?mode=${mode}`);
      const first = getAllBlogPosts();
      assert.equal(first[0].title, "First title");
      assert.equal(first[0].readingTime, "1 min read");
      writeArticle("Edited title");
      const second = getAllBlogPosts();
      assert.equal(second[0].title, mode === "production" ? "First title" : "Edited title");
      assert.equal(second.length, 1);
    } finally {
      process.chdir(cwd);
      if (oldMode === undefined) delete process.env.NODE_ENV;
      else process.env.NODE_ENV = oldMode;
      fs.rmSync(fixture, { recursive: true, force: true });
    }
  });
}
