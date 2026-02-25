import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://accoop.com";

  const routes = [
    "",
    "/about",
    "/membership",
    "/marketplace",
    "/social-impact",
    "/block-captain",
    "/vendors",
    "/sponsorship",
    "/news",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/news" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
