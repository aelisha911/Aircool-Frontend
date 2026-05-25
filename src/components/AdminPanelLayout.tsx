import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminLogout } from "@/lib/adminAuth";

const AdminPanelLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-muted/20 px-4 py-6">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-border bg-background p-6 shadow-sm">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Admin panel</p>
            <h1 className="mt-3 text-2xl font-bold text-foreground">Aircool Admin</h1>
            <p className="mt-2 text-sm text-muted-foreground">Manage discounts and reviews from one place.</p>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/admin/discounts"
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-primary hover:text-primary-foreground active:text-primary-foreground"
                }`
              }
            >
              Discounts
            </NavLink>
            <NavLink
              to="/admin/reviews"
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-primary hover:text-primary-foreground active:text-primary-foreground"
                }`
              }
            >
              Reviews
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-input bg-background px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            Logout
          </button>
        </aside>

        <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelLayout;
