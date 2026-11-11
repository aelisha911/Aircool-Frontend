import { useEffect } from "react";
import Seo from "./Seo";
import evaporativeAirConditioningContent from "@/assets/evaporative-air-conditioning-content.html?raw";

const EvaporateAirConditioning = () => {
  useEffect(() => {
    document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]').forEach((script) => {
      if (!script.textContent?.trim()) script.remove();
    });
  }, []);

  return (
    <>
      <Seo
        title="Evaporative Air Conditioning Adelaide | Air Cool Dynamics"
        description="Evaporative air conditioning in Adelaide: ducted cooler installation, servicing and repairs by licensed local technicians. Free on-site quote."
        path="/services/evaporative-air-conditioning"
        type="Service"
        serviceName="Evaporative Air Conditioning Adelaide"
        includeSchema={false}
        socialDescription="Ducted evaporative cooling installed, serviced and repaired across Adelaide. Free on-site quote."
        image="https://aircooldynamics.com.au/images/evaporative-air-conditioning-rooftop-adelaide.webp"
      />
      <div dangerouslySetInnerHTML={{ __html: evaporativeAirConditioningContent }} />
    </>
  );
};

export default EvaporateAirConditioning;
