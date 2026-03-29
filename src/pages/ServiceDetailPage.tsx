import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { services } from "@/data/services";

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
            <Link to="/services">
              <Button>Back to Services</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Banner */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" width={768} height={512} />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex items-center">
            <div className="section-container">
              <Link to="/services" className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-3 transition-colors">
                <ArrowLeft size={16} /> Back to Services
              </Link>
              <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground">{service.title}</h1>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-foreground mb-4">About This Service</h2>
                <p className="text-muted-foreground leading-relaxed text-base mb-8">{service.fullDescription}</p>

                <h3 className="text-xl font-bold text-foreground mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="bg-card rounded-xl p-6 card-elevated sticky top-28">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-3">Book This Service</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Get in touch with our team for a free consultation and competitive quote.
                  </p>
                  <Link to="/contact" className="block">
                    <Button className="w-full" size="lg">Get a Quote</Button>
                  </Link>
                  <a href="tel:+1234567890" className="block mt-3">
                    <Button variant="outline" className="w-full" size="lg">Call (123) 456-7890</Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
