import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import logo from "../assets/AirCool-LOGO-removebg.png";
import Accreditations from "./Accreditations";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="AirCool Dynamics Logo" className="h-14 md:h-16 w-auto" />
            </Link>
            <p className="text-sm text-background/80 leading-relaxed">
              Your trusted partner for all HVAC and cooling needs. Professional service, reliable results.
            </p>

            <Accreditations />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-background/90">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "Admin", path: "/admin" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-background/75 hover:text-sky-200 transition-all duration-200 hover:translate-x-0.5 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        {/* Services */}
<div>
  <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-background/90">
    Services
  </h4>

  <ul className="space-y-2.5">
    {[
      {
        label: "Heating & Cooling",
        path: "/services/heating-cooling",
      },
      {
        label: "Service & Maintenance",
        path: "/services/service-maintenance",
      },
      {
        label: "Installation",
        path: "/services/installation-services",
      },
      {
        label: "Central Ducted Air Conditioning",
        path: "/services/central-ducted-air-conditioning",
      },
      {
        label: "Split Type AC Unit",
        path: "/services/split-type-air-conditioning-unit",
      },
      {
        label: "Evaporative Cooler",
        path: "/services/evaporative-cooler",
      },
      {
        label: "Fridge & Coolroom",
        path: "/services/fridge-coolroom",
      },
      {
        label: "Replacement",
        path: "/services/replacement",
      },
    ].map((service) => (
      <li key={service.path}>
        <Link
          to={service.path}
          className="text-sm text-background/75 hover:text-sky-200 transition-all duration-200 hover:translate-x-0.5 inline-block"
        >
          {service.label}
        </Link>
      </li>
    ))}
  </ul>
</div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-background/90">Contact Us</h4>
            <ul className="space-y-3">
              <li className="group flex items-start gap-2.5 transition-colors duration-200">
                <MapPin size={16} className="mt-0.5 shrink-0 text-background/70 group-hover:text-background" />
                <span className="text-sm text-background/80 group-hover:text-background">1/3 Eversley Ave, Enfield SA 5085</span>
              </li>
              <li className="group flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-background/70 group-hover:text-background transition-colors duration-200" />
                <a href="tel:1300019568" className="text-sm text-background/75 hover:text-sky-200 transition-colors duration-200">0490 089 857 / 1300 019 568</a>
              </li>
              <li className="group flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-background/70 group-hover:text-background transition-colors duration-200" />
                <a href="mailto:aircooldynamics@gmail.com" className="text-sm text-background/75 hover:text-sky-200 transition-colors duration-200">aircooldynamics@gmail.com</a>
              </li>
              <li className="group flex items-center gap-2.5">
    <Clock
      size={16}
      className="shrink-0 text-background/70 group-hover:text-background transition-colors duration-200"
    />
    <span className="text-sm text-background/75">
      Mon-Fri: 7am–6pm, <br />
      Sat-Sun: 9am–3pm
    </span>
  </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 text-center">
          <p className="text-sm text-background/70">&copy; {new Date().getFullYear()} AirCool Dynamics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
