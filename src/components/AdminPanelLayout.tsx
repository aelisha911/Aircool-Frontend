import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminLogout } from "@/lib/adminAuth";

const AdminPanelLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login", { replace: true });
  };

  return (
  <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50 p-4">
  <div className="grid h-full w-full gap-4 md:grid-cols-[280px_1fr]">

    {/* Sidebar */}
    <aside className="h-full overflow-hidden rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

      {/* Header */}
      <div className="bg-gradient-to-r from-primary/90 to-primary p-6 text-primary-foreground">
        <p className="text-xs uppercase tracking-[0.3em] opacity-80">
          Admin Panel
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Aircool Dynamics
        </h1>

        <p className="mt-2 text-sm opacity-90">
          Manage discounts and reviews content.
        </p>
      </div>

      {/* Navigation */}
      <div className="p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Navigation
        </p>

     <nav className="space-y-2">
  <NavLink
  to="/admin/discounts"
  className={({ isActive }) =>
    `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-primary text-white shadow-lg hover:text-white"
        : "text-gray-800 hover:bg-gray-100"
    }`
  }
>
  Discounts
</NavLink>

<NavLink
  to="/admin/reviews"
  className={({ isActive }) =>
    `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-primary text-white shadow-lg hover:text-white"
        : "text-gray-800 hover:bg-gray-100"
    }`
  }
>
  Reviews
</NavLink>
</nav>

        {/* Divider */}
        <div className="my-6 h-px bg-border" />

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex w-full items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </aside>

    {/* Content Area */}
    <div className="h-full overflow-y-auto rounded-3xl border border-white/20 bg-white/90 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      <Outlet />
    </div>


  </div>
</div>
  );
};

export default AdminPanelLayout;
