export async function GET() {
  const allowedPaths = ["/fr/conclusion", "/ja/conclusion"];
  const siteUrl = "https://flonotabinikki.vercel.app";

  const content = `
  User-agent: *
  ${allowedPaths.map(path => `Allow: ${path}`).join("\n")}
  Disallow: /
  Sitemap: ${siteUrl}/sitemap.xml
  `;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
