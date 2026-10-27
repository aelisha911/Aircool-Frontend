import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchActiveDiscounts, fetchHomepageSections } from "@/services/api";
import { services } from "@/data/services";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import DiscountImageSection from "@/components/DiscountImageSection";
import ServiceCard from "@/components/ServiceCard";
import type { HomepageSection } from "@/data/homepage";

const HomepageRenderer = () => {
  const { data: sections = [] } = useQuery({
    queryKey: ["homepage-sections"],
    queryFn: fetchHomepageSections,
    staleTime: 1000 * 60 * 5,
  });
  const { data: activeDiscounts = [] } = useQuery({
    queryKey: ["active-discounts"],
    queryFn: fetchActiveDiscounts,
    staleTime: 1000 * 60 * 10,
  });

  const visibleSections = useMemo(() => sections.filter((section) => section.enabled), [sections]);

  return (
    <>
      {visibleSections.map((section) => {
        switch (section.type) {
          case "hero":
            return <HeroSection key={section.id} content={section} />;
          case "services":
            return (
              <section key={section.id} className="section-padding">
                <div className="section-container">
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{section.eyebrow}</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">{section.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.items?.length
                      ? section.items.map((item, index) => {
                          const service = services[index];
                          return service
                            ? <ServiceCard key={`${section.id}-${index}`} service={{ ...service, title: item.title || service.title, shortDescription: item.description || service.shortDescription }} />
                            : <div key={`${section.id}-${index}`} className="rounded-xl bg-card p-6 card-elevated"><h3 className="font-heading font-bold text-lg">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">{item.description}</p></div>;
                        })
                      : services.slice(0, 8).map((service) => <ServiceCard key={service.slug} service={service} />)}
                  </div>
                </div>
              </section>
            );
          case "discounts":
            return (
              <div key={section.id}>
                {activeDiscounts.length > 0 && (
                  <section className="py-6">
                    <div className="section-container flex justify-center">
                      <div className="w-full max-w-3xl mx-auto rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-[0_10px_30px_rgba(239,68,68,0.35)] px-6 md:px-10 py-4 text-center text-white">
                        <h3 className="font-extrabold text-base md:text-xl tracking-wide">{section.title}</h3>
                        <p className="text-white/90 text-xs md:text-sm">{section.body}</p>
                      </div>
                    </div>
                  </section>
                )}
                {activeDiscounts.map((discount, index) => <DiscountImageSection key={`${section.id}-${index}`} {...discount} />)}
              </div>
            );
          case "benefits":
            return <WhyChooseUs key={section.id} content={section} />;
          case "testimonials":
            return <Testimonials key={section.id} content={section} />;
          case "cta":
            return <CTABanner key={section.id} content={section} />;
          case "custom":
            return (
              <section key={section.id} className={`section-padding ${section.background ?? ""}`}>
                <div className="section-container text-center">
                  {section.eyebrow && <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{section.eyebrow}</p>}
                  <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">{section.title}</h2>
                  {section.body && <p className="mt-4 mx-auto max-w-2xl text-muted-foreground whitespace-pre-line">{section.body}</p>}
                </div>
              </section>
            );
        }
      })}
    </>
  );
};

export default HomepageRenderer;
