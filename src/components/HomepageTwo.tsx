
import type { SyntheticEvent } from "react";

function HomepageTwo() {
  const handleHomepageLoad = (event: SyntheticEvent<HTMLIFrameElement>) => {
    const iframe = event.currentTarget;
    const document = iframe.contentDocument;

    if (!document) {
      return;
    }

    document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
      const href = link.getAttribute("href");

      if (!href || href.startsWith("#")) {
        return;
      }

      const url = new URL(href, window.location.href);

      if (url.protocol === "http:" || url.protocol === "https:") {
        if (url.hostname === "aircooldynamics.com.au") {
          link.href = `${window.location.origin}${url.pathname}${url.search}${url.hash}`;
        }

        link.target = "_top";
      }
    });
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="/Homepage.html"
        title="Complete HTML Page"
        onLoad={handleHomepageLoad}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}

export default HomepageTwo;
