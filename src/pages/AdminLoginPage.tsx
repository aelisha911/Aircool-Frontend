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
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-10">
  <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

    {/* Header */}
    <div className="bg-gradient-to-r from-[#1E4574] via-[#285593] to-[#3569A8] px-8 py-8 text-white">
      <h1 className="text-3xl font-bold">Admin Login</h1>
      <p className="mt-2 text-sm text-white/80">
        Secure access to the Aircool administration panel.
      </p>
    </div>

    {/* Form */}
    <div className="p-8">
      <form className="space-y-5" onSubmit={handleSubmit}>

        <div>
          <label
            htmlFor="admin-email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email Address
          </label>

          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="enter your login email..."
            required
          />
        </div>

        <div>
          <label
            htmlFor="admin-password"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Password
          </label>

          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="Enter password"
            required
          />
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-gradient-to-r from-[#1E4574] via-[#285593] to-[#3569A8] text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:opacity-95 hover:-translate-y-0.5 hover:shadow-xl"
        >
          Sign In
        </button>

      </form>
    </div>
  </div>
</main>
  );
};

export default AdminLoginPage;
