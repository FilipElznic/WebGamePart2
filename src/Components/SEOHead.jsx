import { useEffect } from "react";

const SEOHead = ({
  title = "Peter's Quest Part 2 - Interactive Space Adventure Game",
  description = "Join Peter in an immersive space adventure! Help repair a damaged spaceship in the year 2150 through 6 challenging stages with mini-games, puzzles, and interactive dialogue.",
  keywords = "web game, space adventure, interactive game, React game, browser game, puzzle game, mini-games, retro game, cyberpunk game, space simulation, Peter's Quest",
  image = "/AI.png",
  url = "",
  type = "website",
  canonical = "",
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      const imageUrl = image.startsWith("http")
        ? image
        : `https://peters-quest-part2.vercel.app${image}`;
      ogImage.setAttribute("content", imageUrl);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && url) {
      const fullUrl = url.startsWith("http")
        ? url
        : `https://peters-quest-part2.vercel.app${url}`;
      ogUrl.setAttribute("content", fullUrl);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute("content", type);
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector(
      'meta[property="twitter:title"]'
    );
    if (twitterTitle) {
      twitterTitle.setAttribute("content", title);
    }

    const twitterDescription = document.querySelector(
      'meta[property="twitter:description"]'
    );
    if (twitterDescription) {
      twitterDescription.setAttribute("content", description);
    }

    const twitterImage = document.querySelector(
      'meta[property="twitter:image"]'
    );
    if (twitterImage) {
      const imageUrl = image.startsWith("http")
        ? image
        : `https://peters-quest-part2.vercel.app${image}`;
      twitterImage.setAttribute("content", imageUrl);
    }

    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrl && url) {
      const fullUrl = url.startsWith("http")
        ? url
        : `https://peters-quest-part2.vercel.app${url}`;
      twitterUrl.setAttribute("content", fullUrl);
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
      }
      const canonicalUrl = canonical.startsWith("http")
        ? canonical
        : `https://peters-quest-part2.vercel.app${canonical}`;
      canonicalLink.href = canonicalUrl;
    }
  }, [title, description, keywords, image, url, type, canonical]);

  return null; // This component doesn't render anything
};

export default SEOHead;
