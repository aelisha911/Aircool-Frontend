import { Clock, Shield, ThumbsUp, Users, Zap, Award } from "lucide-react";

const reasons = [
  { icon: Clock, title: "7 Days Availability", desc: "Reliable service available seven days a week for your convenience." },
  { icon: Shield, title: "Licensed & Insured", desc: "Fully certified technicians with complete insurance coverage." },
  { icon: ThumbsUp, title: "Satisfaction Guaranteed", desc: "Quality workmanship backed by our service guarantee." },
  { icon: Users, title: "Experienced Team", desc: "Over 15 years of hands-on industry experience." },
  { icon: Zap, title: "Fast Response Times ", desc: " Prompt service with quick diagnosis and repairs." },
  { icon: Award, title: "Highly Rated Service", desc: "Trusted by customers across Adelaide for reliable results." },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
           Trusted Heating, Cooling & Refrigeration Experts in Adelaide
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="bg-card rounded-xl p-6 card-elevated text-center">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                <r.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-1.5">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
