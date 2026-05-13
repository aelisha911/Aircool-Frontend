import { Weight } from "lucide-react";

export type BlogArticle = {
  id: string;
  title: string;
  summary: string;
  content: string[];
};

export const blogs: BlogArticle[] = [
  {
    id: "Environmental-Action-australia",
    title: "Environmental Action",
    summary:
      "Environmental Management: Waste Material Recycling and Energy Efficiency in Air Conditioning Services",
    content: [
      "Australian HVAC Services is committed to operate in a manner that delivers practical applications that achieve quantitative results in regards to protecting the environment. We as a company recognise the importance of environmental issues, and the importance to establish and commit to clear goals and strategies within our preventative systems and practices. The environmental ecoystems employed by Australian HVAC Services, encourage a high level of environmental awareness. As a result, working in partnership with local recycling businesses, we achieve significant reductions in landfill waste while maintaining our business competitiveness. Waste disposal is a major issue across Australia, both environmentally and economically. The wider community is broadly aware of the environmental impacts; however, less aware of the intrinsic economic impacts of finding new refuse tips for waste becoming more difficult and expensive. It has been documented, that approximately one and a half (1.5) million tonnes of waste is sent to landfill in Perth from construction and demolition works. Overall waste sent to landfill is comprised of municipal waste, commercial and industrial waste, and construction and demolition waste; in which construction and demolition works typically represent over half of the total waste sent to landfill. At Australian HVAC Services, we continue to challenge the norm (standard business practices) in terms of considering the impact of our business and associated services.",

     "We have, and continue to maintain a strict and comprehensive system in terms of waste recycling and management. Our systems apply to both office and field practices; where all recyclable materials are sorted and recycled accordingly. In our constant endeavor to provide tangible environmental impact reductions, we have undertaken an environmental investigation on waste disposal management in regards to our recent project with the City of Vincent. This project was undertaken in partnership with the City of Vincent in terms of environmental sustainability. Reflecting the City of Vincent’s Sustainable Environment Strategy 2011-2016 and the promoting action of City of Vincent personnel, in particular Mr. Kon Bilyk (Assets Officer – Projects). This investigation assessed the waste quantitative in terms of total waste materials and total recycled waste materials to ascertain the effectiveness of our environmental practices. The investigation identified the following:",
     "Weight of overall project waste material: 1,675kg.",
     "Weight of overall project waste material to landfill: 75kg.",
     "Return on recyclable materials: estimated in excess of $5,000.00.",

"This project achieved a significant reduction in landfill waste, equating to over 95% by weight. Additionally, recycling was able to provide our business with a distinct competitive edge in what is a very ‘tight’ market, as the estimated economic return in terms recycling was in excess of five thousand dollars. This investigation has ascertained that our environmental practices coupled with the City of Vincent’s Sustainable Environmental Strategy and promoting actions are environmentally effective and also enable increased business competitiveness. We continue to mature and advance in terms of environmental awareness and management to actively conserve our natural environment whilst still maintaining strong economic growth. Our objective is to conserve our natural environment to achieve, if not exceed, our commitments and our Client’s commitments to environmental protection and awareness.",
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
