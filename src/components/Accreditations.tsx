import masterBuildersLogo from "../assets/Master_Builders_logo_same_as_screenshot(1).png";
import arcLogo from "../assets/ARC_logo_same_as_screenshot(1).png";

const Accreditations = () => {
  return (
    <div className="mt-6 rounded-2xl border border-background/15 bg-background/5 px-4 py-4">
      <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-background/90 mb-3">
        Accreditations
      </h4>
      <div className="flex flex-wrap items-center gap-3">
        <img
          src={arcLogo}
          alt="ARC logo"
          className="h-12 w-auto rounded-md bg-white/90 p-2"
        />
        <img
          src={masterBuildersLogo}
          alt="Master Builders logo"
          className="h-12 w-auto rounded-md bg-white/90 p-2"
        />
      </div>

      <div className="mt-3 space-y-1 text-xs text-background/80">
        <p>ABN: 98460798152</p>
        <p>BLD353665</p>
        <p>Refrigerant Trading Authorisation AU069541</p>
      </div>
    </div>
  );
};

export default Accreditations;
