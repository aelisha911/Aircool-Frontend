import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import DiscountImageSection from "@/components/DiscountImageSection";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import { fetchActiveDiscounts } from "@/services/api";

const Index = () => {
  const { data: activeDiscounts = [] } = useQuery({
    queryKey: ["active-discounts"],
    queryFn: fetchActiveDiscounts,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        {/* Services preview */}
        <section className="section-padding">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Our Services</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                Comprehensive HVAC Solutions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 8).map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
  {activeDiscounts.length > 0 && (
  <section className="py-6">
    
    <div className="section-container flex justify-center">
      
      <div className="w-full max-w-3xl mx-auto">
        
        <div className="relative flex items-center justify-center gap-3 px-6 md:px-10 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-[0_10px_30px_rgba(239,68,68,0.35)] border border-white/10 overflow-hidden">

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

          {/* Content */}
          <div className="relative flex items-center gap-3">
            
            <span className="text-2xl animate-bounce">🔥</span>

            <div className="text-center">
              <h3 className="text-white font-extrabold text-base md:text-xl tracking-wide">
                Limited Time Discount Offers
              </h3>

              <p className="text-white/90 text-xs md:text-sm">
                Save big on HVAC installation & repair services
              </p>
            </div>

            <span className="text-2xl animate-bounce">⚡</span>

          </div>
        </div>

      </div>

    </div>

  </section>
)}

        {activeDiscounts.map((discount, index) => (
          <DiscountImageSection
            key={`${discount.imageUrl ?? discount.videoUrl ?? "discount"}-${index}`}
            imageUrl={discount.imageUrl}
            imageAlt={discount.imageAlt}
            videoUrl={discount.videoUrl}
          />
        ))}

        <WhyChooseUs />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
