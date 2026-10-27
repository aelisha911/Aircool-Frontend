import { services } from "@/data/services";

export type HomepageSectionType =
  | "hero"
  | "services"
  | "discounts"
  | "benefits"
  | "testimonials"
  | "cta"
  | "custom";

export type HomepageSection = {
  id: string;
  type: HomepageSectionType;
  title: string;
  eyebrow?: string;
  body?: string;
  buttonText?: string;
  buttonUrl?: string;
  imageUrl?: string;
  enabled: boolean;
  background?: string;
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
};

export const defaultHomepageSections: HomepageSection[] = [
  {
    id: "hero",
    type: "hero",
    eyebrow: "Licensed & Insured Professionals",
    title: "Reliable HVAC & Cooling Solutions for Your Comfort",
    body: "Expert heating, cooling, and refrigeration services across Adelaide. We deliver reliable, energy-efficient solutions for both homes and businesses, Available 7 days a week for your convenience.",
    buttonText: "Get a Quote",
    buttonUrl: "/contact",
    enabled: true,
  },
  {
    id: "services",
    type: "services",
    eyebrow: "Our Services",
    title: "Comprehensive HVAC Solutions",
    enabled: true,
    items: services.slice(0, 8).map((service) => ({
      title: service.title,
      description: service.shortDescription,
    })),
  },
  {
    id: "discounts",
    type: "discounts",
    title: "Limited Time Discount Offers",
    body: "Save big on HVAC installation & repair services",
    enabled: true,
  },
  {
    id: "benefits",
    type: "benefits",
    eyebrow: "Why Choose Us",
    title: "Trusted Heating, Cooling & Refrigeration Experts in Adelaide",
    enabled: true,
    items: [
      { title: "7 Days Availability", description: "Reliable service available seven days a week for your convenience.", icon: "Clock" },
      { title: "Licensed & Insured", description: "Fully certified technicians with complete insurance coverage.", icon: "Shield" },
      { title: "Satisfaction Guaranteed", description: "Quality workmanship backed by our service guarantee.", icon: "ThumbsUp" },
      { title: "Experienced Team", description: "Over 15 years of hands-on industry experience.", icon: "Users" },
      { title: "Fast Response Times", description: "Prompt service with quick diagnosis and repairs.", icon: "Zap" },
      { title: "Highly Rated Service", description: "Trusted by customers across Adelaide for reliable results.", icon: "Award" },
    ],
  },
  {
    id: "testimonials",
    type: "testimonials",
    eyebrow: "Testimonials",
    title: "What Our Customers Say",
    enabled: true,
  },
  {
    id: "cta",
    type: "cta",
    title: "Ready to Get Started?",
    body: "Contact us today for a free consultation and quote. Our experts are ready to help with all your HVAC needs.",
    buttonText: "Get a Free Quote",
    buttonUrl: "/contact",
    enabled: true,
  },
];
