import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import contactHero from "@/assets/Contact-hero.jpeg";
import { sendContactForm } from "@/services/api";

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendContactForm(form);
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", phone: "", city: "", message: "" });
    } catch {
      toast({
        title: "Failed to send",
        description: "Please check backend server or API URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0">
            <img
              src={contactHero}
              alt="Air conditioning service support"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(14,31,56,0.88),rgba(26,74,128,0.72))]" />
          </div>

          <div className="section-container relative z-10 text-center">
            <p className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white/90 md:text-sm">
              Contact AirCool Dynamics
            </p>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Let&apos;s Fix Your Comfort
              <span className="block text-sky-200">Fast, Friendly, Professional</span>
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/85 md:text-xl">
              From repairs to new installations, our certified HVAC team is ready to help. Send us your details and we&apos;ll get back to you quickly.
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
                        <Input placeholder="enter your name..." value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                        <Input type="email" placeholder="enter your email..." value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                        <Input type="tel" placeholder="enter your phone number..." value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">City</label>
                        <Input placeholder="enter your city..." value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                      <Textarea placeholder="Tell us about your HVAC needs..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                    </div>
                    <Button type="submit" size="lg" className="w-full sm:w-auto px-8" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card rounded-xl p-6 card-elevated">
                  <h3 className="font-heading font-bold text-foreground mb-4">Contact Info</h3>
                  <ul className="space-y-4">
                    {[
                      { icon: MapPin, text: "1/3 Eversley Ave, Enfield SA 5085" },
                      { icon: Phone, text: "0490 089 857 / 1300 019 568" },
                      { icon: Mail, text: "aircooldynamics@gmail.com" },
                      { icon: Clock, text: "Mon-Fri: 7am–6pm, Sat-Sun: 9am–3pm" },
                    
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
  <div className="aspect-[4/3]">
    <iframe
      title="Google Map"
      src="https://www.google.com/maps?q=1/3+Eversley+Ave,+Enfield+SA+5085,+Australia&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="w-full h-full"
    />
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
