import type { SyntheticEvent } from "react";

function DuctedGasHeating() {
  const handleDuctedGasHeatingLoad = (event: SyntheticEvent<HTMLIFrameElement>) => {
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
    
    return(
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
          src="/HTML/ducted-gas-heating-adelaide.html"
          title="Complete HTML Page"
          onLoad={handleDuctedGasHeatingLoad}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
    );
}

export default DuctedGasHeating ;