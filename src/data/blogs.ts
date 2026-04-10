export type BlogArticle = {
  id: string;
  title: string;
  summary: string;
  content: string[];
};

export const blogs: BlogArticle[] = [
  {
    id: "ac-service-frequency-australia",
    title: "How Often Should You Service Your Air Conditioner in Australia?",
    summary:
      "Regular HVAC servicing improves efficiency, prevents breakdowns, and helps reduce electricity costs during peak summer usage.",
    content: [
      "Most residential systems should be serviced at least once every 12 months, while homes with heavy summer usage often benefit from a check every 6 months.",
      "A professional service usually includes filter cleaning, refrigerant checks, electrical safety testing, and airflow performance review.",
      "Preventive maintenance helps identify minor issues early before they become expensive compressor or fan motor failures.",
    ],
  },
  {
    id: "ducted-cooling-repair-signs",
    title: "Signs Your Ducted Cooling System Needs Professional Repair",
    summary:
      "Unusual sounds, warm airflow, and uneven temperatures are common warning signs that your ducted system needs attention.",
    content: [
      "If one part of your home is significantly warmer than others, your zoning, ductwork, or return airflow may need inspection.",
      "Buzzing, rattling, or high-pitch noises can indicate loose parts, fan issues, or electrical faults that should be checked quickly.",
      "A sudden spike in energy bills is often linked to poor system efficiency caused by clogged filters, duct leaks, or failing components.",
    ],
  },
  {
    id: "commercial-hvac-maintenance-checklist",
    title: "Commercial HVAC Maintenance Checklist for Business Owners",
    summary:
      "A structured maintenance plan keeps commercial HVAC equipment reliable, compliant, and cost-efficient all year.",
    content: [
      "Schedule quarterly inspections for rooftop units, thermostats, air handlers, and building management controls.",
      "Replace filters on time and document static pressure and airflow readings to maintain healthy indoor air quality.",
      "Keep a maintenance log with all service records to support warranty claims and reduce emergency downtime.",
    ],
  },
  {
    id: "evaporative-vs-split-system",
    title: "Evaporative Cooling vs Split Systems: Which Is Better?",
    summary:
      "Both systems are effective, but climate, installation cost, and usage goals determine the right option for your property.",
    content: [
      "Evaporative cooling can be very energy-efficient in dry climates and delivers fresh airflow throughout a home.",
      "Split systems provide precise room-by-room control and perform well in humid conditions where evaporative units are less effective.",
      "A site assessment helps determine insulation needs, room load requirements, and long-term operating costs before installation.",
    ],
  },
  {
    id: "preventive-maintenance-long-term-savings",
    title: "Why Preventive HVAC Maintenance Saves Long-Term Costs",
    summary:
      "Routine maintenance reduces emergency repairs, extends equipment life, and protects day-to-day comfort.",
    content: [
      "Preventive service minimizes strain on key components, which lowers the risk of peak-season breakdowns.",
      "Well-maintained units consume less power for the same cooling output, reducing monthly utility expenses.",
      "For both residential and commercial sites, scheduled maintenance is one of the highest-ROI HVAC decisions.",
    ],
  },
];
