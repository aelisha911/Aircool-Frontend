import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin, isAdminAuthenticated } from "@/lib/adminAuth";
import { useToast } from "@/hooks/use-toast";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate("/admin/discounts", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = await adminLogin(email, password);
    if (!isValid) {
      toast({
        title: "Login failed",
        description: "Email or password is invalid.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Welcome admin",
      description: "You are now logged in.",
    });
    navigate("/admin/discounts", { replace: true });
  };

  return (
    <main className="min-h-screen bg-muted/20 px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">Only admin can access this panel.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="admin-email" className="mb-1 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="test@gmail.com"
              required
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-1 block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Test"
              required
            />
          </div>

          <button
            type="submit"
            className="h-11 w-full rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLoginPage;
