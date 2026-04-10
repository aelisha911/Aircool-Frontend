import { useEffect } from "react";
import { blogs } from "@/data/blogs";

const BlogsPage = () => {
  useEffect(() => {
    const previousTitle = document.title;

    const upsertMeta = (selector: string, attribute: "name" | "property", value: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, value);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
      return tag;
    };

    const previousDescription = document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content;
    const previousOgTitle = document.head.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content;
    const previousOgDescription = document.head.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content;

    document.title = "HVAC Blog | AirCool Dynamics";

    upsertMeta('meta[name="description"]', "name", "description", "Helpful HVAC blog content about air conditioning repairs, maintenance, ducted cooling, evaporative systems, and commercial climate control services.");
    upsertMeta('meta[property="og:title"]', "property", "og:title", "HVAC Blog | AirCool Dynamics");
    upsertMeta('meta[property="og:description"]', "property", "og:description", "Read practical HVAC guides on maintenance, installation, repairs, and energy-efficient cooling for homes and businesses.");

    return () => {
      document.title = previousTitle;

      if (previousDescription) {
        upsertMeta('meta[name="description"]', "name", "description", previousDescription);
      }
      if (previousOgTitle) {
        upsertMeta('meta[property="og:title"]', "property", "og:title", previousOgTitle);
      }
      if (previousOgDescription) {
        upsertMeta('meta[property="og:description"]', "property", "og:description", previousOgDescription);
      }
    };
  }, []);

  return (
    <main className="section-padding">
      <div className="section-container max-w-4xl">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">AirCool Dynamics HVAC Blog</h1>
          <p className="text-muted-foreground leading-relaxed">
            Expert guides and practical tips for air conditioning installation, HVAC maintenance, commercial cooling, and system repairs.
          </p>
        </header>

        <section className="space-y-6">
          {blogs.map((article) => (
            <article key={article.id} className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">{article.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{article.summary}</p>
              <div className="space-y-3">
                {article.content.map((paragraph, index) => (
                  <p key={`${article.id}-${index}`} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default BlogsPage;
