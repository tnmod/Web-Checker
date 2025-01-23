"use server";

export interface WebsiteMetadata {
  title: string | null;
  description: string | null;
  keywords: string | null;
  canonical: string | null;
  schema: any | null;
}

export const checkOrderWebsite = async (
  url: string
): Promise<WebsiteMetadata> => {
  const response = await fetch(url);
  const html = await response.text();
  return await parseHTML(html);
};

const parseHTML = async (html: string) => {
  // Helper function to extract content using regex
  const extractContent = (regex: RegExp, text: string) => {
    const match = regex.exec(text);
    return match ? match[1] : null;
  };

  // Extract title
  const titleRegex = /<title[^>]*>([^<]+)<\/title>/i;
  const title = extractContent(titleRegex, html);

  // Extract meta description
  const descriptionRegex =
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i;
  const description = extractContent(descriptionRegex, html);

  // Extract meta keywords
  const keywordsRegex =
    /<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["'][^>]*>/i;
  const keywords = extractContent(keywordsRegex, html);

  // Extract canonical URL
  const canonicalRegex =
    /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i;
  const canonical = extractContent(canonicalRegex, html);

  // Extract schema.org metadata
  const schemaRegex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([^<]+)<\/script>/i;
  const schemaData = extractContent(schemaRegex, html);
  const schema = schemaData ? JSON.parse(schemaData) : null;

  return {
    title,
    description,
    keywords,
    canonical,
    schema,
  };
};
