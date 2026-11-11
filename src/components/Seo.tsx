import { useEffect } from "react";

const siteUrl = "https://aircooldynamics.com.au";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "Service";
  serviceName?: string;
  includeSchema?: boolean;
  image?: string;
  socialDescription?: string;
}

const Seo = ({
  title,
  description,
  path,
  type = "WebPage",
  serviceName,
  includeSchema = true,
  image,
  socialDescription = description,
}: SeoProps) => {
  useEffect(() => {
    const url = `${siteUrl}${path}`;
    document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]') ?? document.createElement("meta");
    descriptionTag.setAttribute("name", "description");
    descriptionTag.setAttribute("content", description);
    if (!descriptionTag.parentElement) document.head.appendChild(descriptionTag);

    const canonical = document.querySelector('link[rel="canonical"]') ?? document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", url);
    if (!canonical.parentElement) document.head.appendChild(canonical);

    const setMeta = (attribute: "name" | "property", key: string, content: string) => {
      const tag = document.querySelector(`meta[${attribute}="${key}"]`) ?? document.createElement("meta");
      tag.setAttribute(attribute, key);
      tag.setAttribute("content", content);
      if (!tag.parentElement) document.head.appendChild(tag);
    };
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", socialDescription);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", socialDescription);
    if (image) {
      setMeta("property", "og:image", image);
      setMeta("name", "twitter:image", image);
    }

    let schemaTag: HTMLScriptElement | null = null;
    if (includeSchema) {
      const schemaId = `${url}#${type.toLowerCase()}`;
      const schema = {
        "@context": "https://schema.org",
        "@type": type,
        "@id": schemaId,
        name: serviceName ?? title,
        url,
        description,
        ...(type === "Service" ? { provider: { "@id": `${siteUrl}/#business` } } : {}),
      };
      schemaTag = document.querySelector<HTMLScriptElement>(`script[data-seo-schema="${type}"]`);
      if (!schemaTag) {
        schemaTag = document.createElement("script");
        schemaTag.type = "application/ld+json";
        schemaTag.dataset.seoSchema = type;
        document.head.appendChild(schemaTag);
      }
      schemaTag.textContent = JSON.stringify(schema);
    }

    return () => {
      schemaTag?.remove();
    };
  }, [description, image, includeSchema, path, serviceName, socialDescription, title, type]);

  return null;
};

export default Seo;
