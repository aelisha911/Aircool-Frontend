import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Eye, Award, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import aboutTeam from "@/assets/about-team.jpg";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "5,000+", label: "Projects Completed" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Support Available" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c"
              alt="Air conditioning professionals"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(14,31,56,0.88),rgba(26,74,128,0.72))]" />
          </div>

          <div className="section-container relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white/90 md:text-sm">
                Who We Are
              </p>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
                Built For Better Air,
                <span className="block text-sky-200">Powered by AirCool Dynamics</span>
              </h1>

              <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-white/85 md:text-xl">
                We help homes and businesses stay comfortable year-round with smart HVAC design, expert installation, and dependable support from certified technicians.
              </p>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/contact">
                  <Button size="lg" className="min-w-[170px]">Talk to Our Team</Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="min-w-[170px] border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Company intro */}
        <section className="section-padding">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Our Story</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">Built on Trust, Driven by Excellence</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  CoolAirPro was founded with a simple mission: to provide reliable, professional HVAC and cooling services that customers can trust. Over 15 years later, we've grown into one of the region's most respected climate control companies.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our team of certified technicians brings decades of combined experience to every job, whether it's a routine maintenance check or a complex commercial installation. We believe in honest pricing, quality workmanship, and treating every home and business like our own.
                </p>
                <Link to="/contact">
                  <Button size="lg">Get in Touch</Button>
                </Link>
              </div>
              <div className="rounded-xl overflow-hidden card-elevated">
                <img src={aboutTeam} alt="CoolAirPro team" loading="lazy" width={1200} height={600} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-secondary py-12">
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-extrabold text-primary mb-1">{s.value}</p>
                  <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-8 card-elevated">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <Target size={22} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver exceptional HVAC services that prioritize customer comfort, energy efficiency, and long-term value. We aim to be the first call for every heating, cooling, and refrigeration need.
                </p>
              </div>
              <div className="bg-card rounded-xl p-8 card-elevated">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <Eye size={22} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To lead the HVAC industry in innovation, sustainability, and customer service. We envision a future where every space is perfectly climate-controlled with minimal environmental impact.
                </p>
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

export default AboutPage;
