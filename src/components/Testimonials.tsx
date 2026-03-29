import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Homeowner",
    text: "CoolAirPro installed our new split system in no time. The team was professional, clean, and the price was very competitive. Highly recommend!",
  },
  {
    name: "James L.",
    role: "Restaurant Owner",
    text: "They've been maintaining our coolroom for over 3 years now. Reliable, quick to respond, and they always go above and beyond. Wouldn't use anyone else.",
  },
  {
    name: "Priya K.",
    role: "Office Manager",
    text: "Our office AC broke down mid-summer and they had it fixed within hours. Excellent emergency service and fair pricing. Five stars all the way!",
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-xl p-6 md:p-8 card-elevated">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="font-heading font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
