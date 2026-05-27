import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Eye, Award, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import aboutTeam from "@/assets/about.jpg";
import aboutVideo from "@/assets/about-video.mp4";

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
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(14,31,56,0.95),rgba(26,74,128,0.85))]" />
          </div>

          <div className="section-container relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white/90 md:text-sm">
                Who We Are
              </p>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
                Built for Better Air,
                <span className="block text-sky-200">Powered by AirCool Dynamics</span>
              </h1>

              <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-white/85 md:text-xl">
              At AirCool Dynamics, we provide professional heating, cooling, and air conditioning services across Adelaide. Our focus is simple keeping homes and businesses comfortable all year round through quality workmanship, reliable service, and practical HVAC solutions delivered by fully qualified technicians.
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
{/* About Section */}
<section className="section-padding">
  <div className="section-container">
    <div className="max-w-6xl mx-auto">

     {/* Top Section */}
<div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-10 lg:items-stretch">

  {/* Left Side */}
  <div className="space-y-4">

    {/* Heading Content */}
    <div className="space-y-2">
      <p className="text-sm font-semibold text-primary uppercase tracking-[3px] text-justify">
        Our Story
      </p>

      <h2 className="text-xl md:text-4xl font-bold text-foreground leading-tight">
        Built on Trust,
        <br />
        Driven by Quality Workmanship
      </h2>
    </div>

 {/* Mobile/Tablet Video */}
<div className="flex justify-center lg:hidden w-full my-4">

  <div className="w-full max-w-[650px] rounded-2xl overflow-hidden shadow-lg">

    <video
      src={aboutVideo as string}
      autoPlay
      loop
      muted
      playsInline
      className="
        w-full
        aspect-video
        object-cover
        rounded-2xl
      "
    />

  </div>

</div>

    {/* Paragraph Content */}
    <div className="space-y-2">

      <p className="text-muted-foreground leading-7 text-justify mt-4">
       At AirCool Dynamics, we have been working in the air conditioning and HVAC industry for many years, handling everything from minor repairs to complete system replacements and installations.

      </p>

      <p className="text-muted-foreground leading-7 text-justify">
        Our services include installation, repairs, routine servicing, and system upgrades for both residential and commercial properties. Whether your system needs a quick fix or a full replacement, we provide honest advice and practical solutions that suit your needs and budget.
      </p>



    </div>

  </div>

  {/* Desktop Video Only */}
{/* Desktop Video Only */}
<div className="hidden lg:flex justify-center items-center w-full">
  <div className="w-full max-w-[520px]">
    
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
      <video
        src={aboutVideo as string}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>

  </div>
</div>

</div>

{/* Bottom Content */}
<div className="mt-2 space-y-2">
  
     <p className="text-muted-foreground leading-7 text-justify">
  We take pride in doing the job properly. Every installation and service is carried out with care and attention to detail to ensure your system is running efficiently and safely before we leave.
</p>

  <p className="text-muted-foreground leading-7 text-justify">
   We also understand that heating and cooling issues can happen at the most inconvenient times, especially during extreme weather in Adelaide. That’s why we aim to provide prompt, reliable service when you need it most.
  </p>

  <p className="text-muted-foreground leading-7 text-justify">
    At the end of the day, our goal is simple to make sure our customers feel comfortable and confident knowing their system is in the hands of experienced, trustworthy professionals.
  </p>

</div>

      {/* Button */}
     <div className="flex justify-center mt-8">
  <Link to="/contact">
    <Button
      size="lg"
      className="px-11 py-6 text-lg md:text-xl font-semibold rounded-2xl"
    >
      Get in Touch
    </Button>
  </Link>
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
             
                 To deliver high-quality heating, cooling, and refrigeration services with a strong focus on long-term value, energy efficiency, and customer comfort. Our goal is to be the trusted first choice for all HVAC solutions across Adelaide.
                </p>
              </div>
              <div className="bg-card rounded-xl p-8 card-elevated">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <Eye size={22} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be a leading provider in the HVAC industry through innovation, sustainability, and exceptional customer service. We aim to create comfortable indoor environments while reducing environmental impact through energy-efficient solutions.
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

