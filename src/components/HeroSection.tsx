import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import heroImage from "@/assets/hero-hvac.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="HVAC professional at work" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="relative section-container py-24 md:py-36 lg:py-44">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <Shield size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary-foreground/90">Licensed & Insured Professionals</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 text-primary-foreground animate-fade-in-up">
            Reliable HVAC & Cooling Solutions for Your Comfort
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-8 text-primary-foreground/80 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Expert heating, cooling, and refrigeration services for homes and businesses. Available 24/7 for your peace of mind.
          </p>

          <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/contact">
              <Button size="lg" className="text-base px-7">
                Get a Quote <ArrowRight size={18} className="ml-1" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-base px-7 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
