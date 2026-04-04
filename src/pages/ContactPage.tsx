import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
       <section className="relative py-20 md:py-28">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76"
      alt="HVAC Service"
      className="w-full h-full object-cover"
    />
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>
  </div>

  {/* Content */}
  <div className="section-container relative z-10 text-center">
    
    {/* Badge */}
    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-white/20 text-white rounded-full backdrop-blur">
      ⭐ Trusted HVAC Experts
    </div>

    {/* Heading */}
    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
      Stay Cool & Comfortable <br />
      <span className="text-yellow-300">All Year Round</span>
    </h1>

    {/* Subtext */}
    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
      Professional air conditioning installation, repair & maintenance services 
      you can rely on. Fast, affordable, and available 24/7.
    </p>

  </div>
</section>

        <section className="section-padding">
          <div className="section-container">
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-card rounded-xl p-6 md:p-8 card-elevated">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                        <Input placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                        <Input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                      <Input type="tel" placeholder="(123) 456-7890" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                      <Textarea placeholder="Tell us about your HVAC needs..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                    </div>
                    <Button type="submit" size="lg" className="w-full sm:w-auto px-8">Send Message</Button>
                  </form>
                </div>
              </div>

              {/* Contact details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card rounded-xl p-6 card-elevated">
                  <h3 className="font-heading font-bold text-foreground mb-4">Contact Info</h3>
                  <ul className="space-y-4">
                    {[
                      { icon: MapPin, text: "123 Climate Street, Melbourne VIC 3000" },
                      { icon: Phone, text: "(123) 456-7890" },
                      { icon: Mail, text: "info@coolairpro.com" },
                      { icon: Clock, text: "Mon–Fri: 7am–6pm | Emergency: 24/7" },
                    ].map((item) => (
                      <li key={item.text} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
                          <item.icon size={16} className="text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground pt-1.5">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Map placeholder */}
                <div className="bg-card rounded-xl overflow-hidden card-elevated">
                  <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={32} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Google Maps Placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
