import { useEffect } from "react";
import Seo from "./Seo";
import ductedAirConditioningContent from "@/assets/ducted-air-conditioning-content.html?raw";

const DuctedAirConditioning = () => {
  useEffect(() => {
    document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]').forEach((script) => {
      if (!script.textContent?.trim()) script.remove();
    });
  }, []);

  return (
    <>
      <Seo
        title="Ducted Air Conditioning Adelaide | Air Cool Dynamics"
        description="Ducted reverse cycle air conditioning in Adelaide: design, installation, servicing and repairs by ARC-authorised technicians. Free on-site quote."
        path="/services/central-ducted-air-conditioning"
        type="Service"
        serviceName="Ducted Air Conditioning Adelaide"
        includeSchema={false}
        socialDescription="Whole-home ducted reverse cycle heating and cooling, installed, serviced and repaired across Adelaide. Free on-site quote."
        image="https://aircooldynamics.com.au/images/ducted-air-conditioning-service-adelaide-rooftop.webp"
      />
      <div dangerouslySetInnerHTML={{ __html: ductedAirConditioningContent }} />
    </>
  );
};

export default DuctedAirConditioning;
