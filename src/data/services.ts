import serviceHeatingCooling from "@/assets/service-heating-cooling.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";
import serviceInstallation from "@/assets/service-installation.jpg";
import serviceRepair from "@/assets/service-repair.jpg";
import serviceEvaporative from "@/assets/service-evaporative.jpg";
import serviceCoolroom from "@/assets/service-coolroom.jpg";
import serviceReplacement from "@/assets/service-replacement.jpg";

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  image: string;
  icon: string;
}

export const services: Service[] = [
 {
  slug: "heating-cooling",
  title: "Heating & Cooling",
  shortDescription: "Climate control solutions for homes and businesses include energy-efficient heating and cooling systems.",
  fullDescription: "Our heating and conditioning services provide total climate management for both residential and commercial buildings. From ductless mini-splits to central air systems, we design and implement solutions that are tailored to your space and budget. Our energy-efficient technology helps reduce electricity costs while maintaining comfortable conditions throughout the year.",
  benefits: [
    "Energy-efficient systems",
    "Tailored climate solutions",
    "Comfort all year long",
    "Reduced utility costs",
    "Smart thermostat integration"
  ],
  image: serviceHeatingCooling,
  icon: "Thermometer",
},
  {
  slug: "service-maintenance",
  title: "Service & Maintenance",
  shortDescription: "Regular HVAC maintenance to ensure efficient functioning and prevent costly problems.",
  fullDescription: "The secret to a long-lasting, effective HVAC system is routine maintenance. To identify problems before they become expensive repairs, our experienced technicians conduct comprehensive inspections, cleanings, and tune-ups. Our maintenance programs include refrigerant inspections, coil cleaning, filter replacement, and complete system diagnostics to keep your system running smoothly.",
  benefits: [
    "Longer lifespan of equipment",
    "Reduced energy costs",
    "Reduced malfunctions",
    "Priority scheduling"
  ],
  image: serviceMaintenance,
  icon: "Wrench",
},
  {
  slug: "installation-services",
  title: "Installation Services",
  shortDescription: "Expert HVAC installation services ensuring precision, efficiency, and long-term reliability for your systems.",
  fullDescription: "Our installation crew consistently delivers precise and high-quality work, whether you're installing new systems or replacing outdated ones. From load calculations and ductwork design to final commissioning, we handle every step with care. Each installation meets or exceeds industry standards and is backed by our satisfaction guarantee for complete peace of mind.",
  benefits: [
    "Professional load computations",
    "Code-compliant setup",
    "Respect for manufacturer warranties",
    "Work that is neat and orderly",
    "After-install assistance"
  ],
  image: serviceInstallation,
  icon: "Settings",
},
 {
  slug: "emergency-repairs",
  title: "Emergency Repairs",
  shortDescription: "HVAC system issues are promptly and reliably serviced with same-day repair options.",
  fullDescription: "You require prompt, dependable servicing when your system malfunctions. Our emergency repair crew is on hand to promptly identify and fix problems. Before any work starts, we offer clear pricing and have common parts on our trucks for same-day repairs. We deal with everything, including electrical problems and compressor breakdowns.",
  benefits: [
    "24-hour emergency assistance",
    "Same-day fixes",
    "Clear pricing",
    "Authentic replacement components",
    "Guarantee for all repairs"
  ],
  image: serviceRepair,
  icon: "AlertCircle",
},
  {
    slug: "evaporative-cooler",
    title: "Evaporative Cooler",
    shortDescription: "Eco-friendly evaporative cooling solutions that use natural processes to cool your space efficiently.",
    fullDescription: "Evaporative coolers are an energy-efficient, eco-friendly alternative to traditional air conditioning. Perfect for dry climates, these systems use the natural process of water evaporation to cool air. We install, service, and repair all major brands of evaporative coolers for both residential and commercial applications.",
    benefits: ["Up to 80% less energy", "Eco-friendly cooling", "Fresh air circulation", "Low maintenance costs", "Ideal for dry climates"],
    image: serviceEvaporative,
    icon: "Wind",
  },
  {
    slug: "fridge-coolroom",
    title: "Fridge & Coolroom",
    shortDescription: "Commercial refrigeration and cool room services for restaurants, warehouses, and food storage facilities.",
    fullDescription: "From restaurant walk-in coolers to warehouse cold storage, we provide comprehensive commercial refrigeration services. Our team specializes in installation, maintenance, and repair of coolrooms, freezer rooms, and commercial refrigeration units. We ensure your products stay at the perfect temperature.",
    benefits: ["Temperature monitoring", "Energy-efficient units", "Compliance with food safety", "Custom coolroom design", "Emergency breakdown service"],
    image: serviceCoolroom,
    icon: "Snowflake",
  },
  {
    slug: "replacement",
    title: "Replacement",
    shortDescription: "Install new, energy-efficient equipment to replace your outdated HVAC system. We handle full system replacements seamlessly.",
    fullDescription: "Our replacement service provides a smooth upgrading path if your HVAC system is out-of-date, inefficient, or beyond repair. We evaluate your existing configuration, provide the finest contemporary substitutes, and take care of the entire removal and installation procedure. Take advantage of the newest smart features, reduced costs, and increased comfort.",
    benefits: ["The newest technology", "Enhanced effectiveness", "Rebate support", "Smooth transition", "Extensions of warranties"],
    image: serviceReplacement,
    icon: "RefreshCw",
  },
];
