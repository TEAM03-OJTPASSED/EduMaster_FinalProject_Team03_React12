import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  allowedRoles: string[];
  children?: ReactNode; // Optional if using Outlet for nested routes
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const user = localStorage.getItem("User");
  const userRole = user ? JSON.parse(user).role : null;

  if (!userRole || !allowedRoles.includes(userRole)) {
    localStorage.setItem("unauthorized", "true"); // Set flag before redirecting
    return <Navigate to="/login" />; // Redirect to login
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
