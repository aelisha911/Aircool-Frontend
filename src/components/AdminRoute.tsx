import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "@/lib/adminAuth";

type AdminRouteProps = {
  children: ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
