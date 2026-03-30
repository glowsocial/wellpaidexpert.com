/**
 * Simple markdown-to-HTML converter for blog post rendering.
 * Handles: headings, bold, italic, links, lists, blockquotes,
 * code blocks, tables (pipe syntax), paragraphs.
 */
export function markdownToHtml(markdown) {
  if (!markdown) return "";

  let html = markdown;

  // Code blocks (fenced) — protect from further processing
  const codeBlocks = [];
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const placeholder = `%%CODEBLOCK_${codeBlocks.length}%%`;
    codeBlocks.push(`<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`);
    return placeholder;
  });

  // Markdown tables — must run before paragraph wrapping
  html = parseMarkdownTables(html);

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Headings
  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>");

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');

  // Links — internal links should not open in new tab
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, text, href) => {
      const isInternal = href.startsWith("/") || href.startsWith("https://thewellpaidexpert.com");
      return isInternal
        ? `<a href="${href}">${text}</a>`
        : `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Unordered lists
  html = html.replace(/^[\s]*[-*] (.+)$/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  // Paragraphs — wrap remaining loose text
  html = html
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      if (/^<(h[1-6]|ul|ol|li|blockquote|pre|hr|img|div|table|section|%%CODEBLOCK)/.test(block)) {
        return block;
      }
      return `<p>${block.replace(/\n/g, " ")}</p>`;
    })
    .join("\n");

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    html = html.replace(`%%CODEBLOCK_${i}%%`, block);
  });

  return html;
}

/**
 * Parses GitHub-flavored markdown pipe tables into HTML tables.
 */
function parseMarkdownTables(html) {
  const tableRegex = /^(\|.+\|)\n(\|[-: |]+\|)\n((?:\|.+\|\n?)+)/gm;

  return html.replace(tableRegex, (_, header, _separator, body) => {
    const headers = header
      .split("|")
      .filter((_, i, arr) => i > 0 && i < arr.length - 1)
      .map((h) => `<th>${h.trim()}</th>`)
      .join("");

    const rows = body
      .trim()
      .split("\n")
      .map((row) => {
        const cells = row
          .split("|")
          .filter((_, i, arr) => i > 0 && i < arr.length - 1)
          .map((cell) => `<td>${cell.trim()}</td>`)
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("\n");

    return `<table>\n<thead><tr>${headers}</tr></thead>\n<tbody>${rows}</tbody>\n</table>`;
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
