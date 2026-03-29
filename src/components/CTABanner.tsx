import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="gradient-primary">
      <div className="section-container py-14 md:py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
          Contact us today for a free consultation and quote. Our experts are ready to help with all your HVAC needs.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-base px-7">
              Get a Free Quote <ArrowRight size={18} className="ml-1" />
            </Button>
          </Link>
          <a href="tel:+1234567890">
            <Button size="lg" variant="outline" className="text-base px-7 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent">
              <Phone size={18} className="mr-1.5" /> Call Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
