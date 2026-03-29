import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Snowflake } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <Snowflake className="text-primary-foreground" size={20} />
              </div>
              <span className="font-heading font-extrabold text-xl">
                CoolAir<span className="text-primary">Pro</span>
              </span>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">
              Your trusted partner for all HVAC and cooling needs. Professional service, reliable results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 opacity-80">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 opacity-80">Services</h4>
            <ul className="space-y-2.5">
              {["Heating & Cooling", "Maintenance", "Installation", "Repair", "Evaporative Cooler", "Coolroom"].map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 opacity-80">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 opacity-70" />
                <span className="text-sm opacity-70">123 Climate Street, Melbourne VIC 3000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 opacity-70" />
                <a href="tel:+1234567890" className="text-sm opacity-70 hover:opacity-100 transition-opacity">(123) 456-7890</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 opacity-70" />
                <a href="mailto:info@coolairpro.com" className="text-sm opacity-70 hover:opacity-100 transition-opacity">info@coolairpro.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center">
          <p className="text-sm opacity-50">&copy; {new Date().getFullYear()} CoolAirPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
