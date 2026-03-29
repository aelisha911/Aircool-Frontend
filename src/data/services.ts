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
    shortDescription: "Complete climate control solutions for homes and businesses. We keep you comfortable year-round with efficient heating and cooling systems.",
    fullDescription: "Our heating and cooling services provide comprehensive climate control for residential and commercial properties. From central air systems to ductless mini-splits, we design and implement solutions tailored to your space and budget. Our energy-efficient systems help reduce utility costs while maintaining optimal comfort throughout the year.",
    benefits: ["Energy-efficient systems", "Custom climate solutions", "Year-round comfort", "Reduced utility costs", "Smart thermostat integration"],
    image: serviceHeatingCooling,
    icon: "Thermometer",
  },
  {
    slug: "service-maintenance",
    title: "Service & Maintenance",
    shortDescription: "Preventive maintenance plans to extend the life of your HVAC systems and ensure peak performance all year round.",
    fullDescription: "Regular maintenance is the key to a long-lasting, efficient HVAC system. Our certified technicians perform thorough inspections, cleaning, and tune-ups to catch issues before they become costly repairs. Our maintenance plans include filter replacement, coil cleaning, refrigerant checks, and full system diagnostics.",
    benefits: ["Extended equipment lifespan", "Lower energy bills", "Fewer breakdowns", "Priority scheduling", "Comprehensive inspections"],
    image: serviceMaintenance,
    icon: "Wrench",
  },
  {
    slug: "installation",
    title: "Installation",
    shortDescription: "Professional installation of HVAC systems, ensuring optimal placement, efficiency, and long-term reliability.",
    fullDescription: "Whether you're building new or upgrading existing systems, our installation team delivers precision work every time. We handle everything from load calculations and ductwork design to final commissioning. Every installation meets or exceeds industry standards and comes with our satisfaction guarantee.",
    benefits: ["Expert load calculations", "Code-compliant installation", "Manufacturer warranties honored", "Clean and tidy work", "Post-install support"],
    image: serviceInstallation,
    icon: "HardHat",
  },
  {
    slug: "breakdown-repair",
    title: "Breakdown & Repair",
    shortDescription: "Fast, reliable emergency repair services. We diagnose and fix HVAC issues quickly to restore your comfort.",
    fullDescription: "When your system breaks down, you need fast, reliable service. Our emergency repair team is available to diagnose and resolve issues quickly. We carry common parts on our trucks for same-day fixes and provide transparent pricing before any work begins. From compressor failures to electrical issues, we handle it all.",
    benefits: ["24/7 emergency service", "Same-day repairs", "Transparent pricing", "Genuine replacement parts", "Warranty on all repairs"],
    image: serviceRepair,
    icon: "AlertTriangle",
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
    shortDescription: "Commercial refrigeration and coolroom services for restaurants, warehouses, and food storage facilities.",
    fullDescription: "From restaurant walk-in coolers to warehouse cold storage, we provide comprehensive commercial refrigeration services. Our team specializes in installation, maintenance, and repair of coolrooms, freezer rooms, and commercial refrigeration units. We ensure your products stay at the perfect temperature.",
    benefits: ["Temperature monitoring", "Energy-efficient units", "Compliance with food safety", "Custom coolroom design", "Emergency breakdown service"],
    image: serviceCoolroom,
    icon: "Snowflake",
  },
  {
    slug: "replacement",
    title: "Replacement",
    shortDescription: "Upgrade your old HVAC system with modern, energy-efficient equipment. We handle full system replacements seamlessly.",
    fullDescription: "If your HVAC system is outdated, inefficient, or beyond repair, our replacement service offers a seamless upgrade path. We assess your current setup, recommend the best modern alternatives, and handle the complete removal and installation process. Enjoy improved comfort, lower bills, and the latest smart features.",
    benefits: ["Latest technology", "Improved efficiency", "Rebate assistance", "Seamless transition", "Extended warranties"],
    image: serviceReplacement,
    icon: "RefreshCw",
  },
];
