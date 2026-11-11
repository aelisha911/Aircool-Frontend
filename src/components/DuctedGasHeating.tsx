import { useEffect } from "react";
import Seo from "./Seo";
import ductedGasHeatingContent from "@/assets/ducted-gas-heating-content.html?raw";

const DuctedGasHeating = () => {
  useEffect(() => {
    document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]').forEach((script) => {
      if (!script.textContent?.trim()) script.remove();
    });
  }, []);

  return (
    <>
      <Seo
        title="Ducted Gas Heating Adelaide | Air Cool Dynamics"
        description="Ducted gas heating in Adelaide: installation, repairs and servicing for whole-home warmth. Local Enfield team, open 7 days. Book a free on-site quote."
        path="/services/ducted-gas-heating-adelaide"
        type="Service"
        serviceName="Ducted Gas Heating Adelaide"
        includeSchema={false}
        socialDescription="Ducted gas heating installed, repaired and serviced across Adelaide. Free on-site quote."
        image="https://aircooldynamics.com.au/images/ducted-gas-heating-service-adelaide.webp"
      />
      <div dangerouslySetInnerHTML={{ __html: ductedGasHeatingContent }} />
    </>
  );
};

export default DuctedGasHeating;
