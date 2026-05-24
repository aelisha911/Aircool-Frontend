import serviceHeatingCooling from "@/assets/service-heating-cooling.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";
import serviceInstallation from "@/assets/service-installation.jpg";
import serviceCentralDucted from "@/assets/service-cental-ducted.jpg";
import serviceSplitAC from "@/assets/service-split-type-ac-unit.jpeg";
import serviceEvaporative from "@/assets/service-evaporative.jpg";
import serviceCoolroom from "@/assets/service-coolroom.jpg";
import serviceReplacement from "@/assets/service-replacement.jpg";

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  benefits: string[];
  image: string;
  icon: string;
}

export const services: Service[] = [
 {
  slug: "heating-cooling",
  title: "Heating & Cooling",
  shortDescription: "Climate control solutions for homes and businesses include energy-efficient heating and cooling systems.",
  fullDescription: [
    "Keep your home or business comfortable all year round with our professional heating and air conditioning solutions.We specialise in supplying, installing, servicing, and maintaining high-quality systems for both residential and commercial properties across Adelaide.",
    "Whether you need a ducted air conditioning system, split system installation, or an energy-efficient upgrade, our experienced team provides customised solutions tailored to your space, lifestyle, and budget.We work with reliable, modern technology designed to deliver maximum comfort while helping reduce your energy costs."
  ],
  benefits: [
    "Energy-efficient heating and cooling systems",
    "Custom solutions for homes and businesses",
    "Reliable comfort in every season",
    "Reduced electricity bills",
    "Smart thermostat integration",
    "Professional installation and ongoing support",
    "Quality workmanship and trusted service"
  ],
  image: serviceHeatingCooling,
  icon: "Thermometer",
},
  {
  slug: "service-maintenance",
  title: "Service & Maintenance",
  shortDescription: "Regular HVAC maintenance to ensure efficient functioning and prevent costly problems.",
  fullDescription:[ 
    "Regular maintenance is the key to keeping your heating, ventilation and air conditioning (HVAC) system running efficiently and reliably for years to come. Our qualified technicians carry out thorough inspections, cleaning, and servicing to identify any potential issues early—before they turn into costly repairs.",
    "Our maintenance service includes refrigerant checks, coil cleaning, filter replacement, and full system diagnostics to ensure your system continues to operate at peak performance all year round."
  ],
  benefits: [
    "Longer lifespan of your equipment",
    "Lower energy bills through improved efficiency",
    "Fewer breakdowns and system faults",
    "Priority booking for maintenance and repairs"
  ],
  image: serviceMaintenance,
  icon: "Wrench",
},
  {
  slug: "installation-services",
  title: "Installation Services",
  shortDescription: "Expert HVAC installation services ensuring precision, efficiency, and long-term reliability for your systems.",
  fullDescription: [
    "Our installation team delivers high-quality, precise workmanship for both new air conditioning systems and replacement of existing units. From detailed load calculations and ducted system design through to final commissioning, we manage the entire process with care and attention to detail.",
"Every installation is completed to meet Australian standards and manufacturer requirements, ensuring reliable performance, energy efficiency, and long-term peace of mind."
  ],
  benefits: [
    "Accurate load calculations for the right system size",
    "Fully compliant installation with Australian standards",
    "Protects manufacturer warranties",
    "Clean, tidy, and professional workmanship",
    "Ongoing support after installation"
  ],
  image: serviceInstallation,
  icon: "Settings",
},
 {
  slug: "central-ducted-air-conditioning",
  title: "Central Ducted Air Conditioning",
  shortDescription: "Efficient whole-building cooling solutions with advanced central ducted air conditioning systems.",
  fullDescription: [
    "Our central ducted air conditioning solutions provide powerful, energy-efficient cooling for homes, businesses, and industrial spaces. We specialise in the installation, servicing, and repairs of ducted systems designed to deliver consistent, even airflow throughout your entire property.",
    "Our qualified technicians ensure your system runs efficiently, quietly, and reliably, helping you stay comfortable while keeping energy usage under control. We use quality components and provide professional maintenance to maximise performance and system lifespan."
  ],
  benefits: [
    "Even cooling across all rooms",
    "Energy-efficient operation",
    "Quiet and unobtrusive performance",
    "Professional installation and servicing",
    "Reliable ongoing maintenance and support Split System Air Conditioning Services"
  ],
  image: serviceCentralDucted,
  icon: "Building2",
},

{
  slug: "split-type-air-conditioning-unit",
  title: "Split Type Air Conditioning Unit",
  shortDescription: "Modern split AC solutions designed for efficient and quiet cooling performance.",
  fullDescription: [
    "We provide complete split system air conditioning services, including installation, repairs, gas recharging, and ongoing maintenance. Split systems are a popular choice for homes, offices, and commercial spaces across Australia, offering fast, efficient cooling with excellent energy performance.",
    "Our experienced technicians ensure every system is installed and serviced correctly for reliable, long-term operation. Whether it’s a new installation or routine maintenance, we help keep your air conditioner running efficiently all year round."
  ],
  benefits: [
    "Fast and effective cooling",
    "Quiet indoor operation",
    "Energy-efficient performance",
    "Prompt and professional installation",
    "Cost-effective maintenance and servicing"
  ],
  image: serviceSplitAC,
  icon: "Wind",
},
  {
    slug: "evaporative-cooler",
    title: "Evaporative Cooler",
    shortDescription: "Eco-friendly evaporative cooling solutions that use natural processes to cool your space efficiently.",
    fullDescription: [
      "Our central ducted air conditioning solutions provide powerful, energy-efficient cooling for homes, businesses, and industrial spaces. We specialise in the installation, servicing, and repairs of ducted systems designed to deliver consistent, even airflow throughout your entire property.",

      "Our qualified technicians ensure your system runs efficiently, quietly, and reliably, helping you stay comfortable while keeping energy usage under control. We use quality components and provide professional maintenance to maximise performance and system lifespan."
    ],
    benefits: ["Up to 80% lower energy use compared to refrigerated air conditioning", "Eco-friendly cooling designed for Adelaide’s dry conditions", "Continuous flow of fresh, filtered air", "Low running and maintenance costs", "Ideal for Adelaide’s hot, dry summers"],
    image: serviceEvaporative,
    icon: "Wind",
  },
  {
    slug: "fridge-coolroom",
    title: "Fridge & Coolroom",
    shortDescription: "Commercial refrigeration and cool room services for restaurants, warehouses, and food storage facilities.",
    fullDescription: [
      "From restaurant walk-in coolrooms to large warehouse cold storage, we provide complete commercial refrigeration solutions across Adelaide. Our experienced team specialises in the installation, servicing, and repair of coolrooms, freezer rooms, and all types of commercial refrigeration systems.",

      "We focus on keeping your equipment running reliably so your stock stays at the correct temperature, helping you meet food safety standards and avoid costly product loss."
    ],
    benefits: ["Reliable temperature control and monitoring", "Energy-efficient refrigeration systems", "Full compliance with Australian food safety standards", "Custom-designed coolroom and freezer solutions", "Fast emergency breakdown and repair service"],
    image: serviceCoolroom,
    icon: "Snowflake",
  },
  {
    slug: "replacement",
    title: "Replacement",
    shortDescription: "Install new, energy-efficient equipment to replace your outdated HVAC system. We handle full system replacements seamlessly.",
    fullDescription: [
      "If your heating and cooling system is outdated, inefficient, or beyond repair, our replacement service provides a simple and stress-free upgrade solution. We assess your existing system, recommend modern energy-efficient options, and manage the complete removal and installation process from start to finish.",

      "Upgrade to the latest technology for improved comfort, better performance, and lower running costs, all tailored to suit your home or business."
    ],
    benefits: ["Access to the latest energy-efficient technology", "Improved system performance and reliability", "Guidance on available rebates and incentives", "Smooth, hassle-free removal and installation process", "Extended manufacturer warranties on new systems"],
    image: serviceReplacement,
    icon: "RefreshCw",
  },
];
