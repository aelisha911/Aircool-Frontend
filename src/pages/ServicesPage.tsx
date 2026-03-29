import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Banner */}
        <section className="gradient-primary py-16 md:py-24">
          <div className="section-container text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Our Services</h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">
              Professional HVAC and cooling solutions tailored to your residential and commercial needs.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
