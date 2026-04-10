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
                  At Air Cool Dynamics, we've been working with air conditioning systems for quite a few years now, and honestly, we've seen just about everything - from small fixes to complete system breakdowns.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We help with installation, repairs, regular servicing, and even upgrades if your old unit just isn't doing the job anymore. Some days it's a quick fix, other times it takes a bit more time - but we always try to get things sorted without unnecessary delays.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our team doesn't believe in rushing through work just to move on to the next job. We take a bit of extra care to make sure everything is running properly before we leave. It saves you trouble later, and that's what really matters.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We also understand that AC issues usually come at the worst time (especially in the heat), so we do our best to be available when you actually need us.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  At the end of the day, we just want our customers to feel comfortable - not only because their AC is working, but because they know they called the right people.
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
             
                  To provide outstanding HVAC services with a focus on long-term value, energy efficiency, and customer comfort. Our goal is to be the first choice for all refrigeration, heating, and cooling needs.
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
