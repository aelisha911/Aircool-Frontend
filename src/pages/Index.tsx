import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

const Index = () => {
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
              {services.slice(0, 6).map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
