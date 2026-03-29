import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group bg-card rounded-xl overflow-hidden card-elevated block"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          width={768}
          height={512}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 md:p-6">
        <h3 className="font-heading font-bold text-lg text-foreground mb-2">{service.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {service.shortDescription}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:gap-2.5">
          Learn More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

export default ServiceCard;
