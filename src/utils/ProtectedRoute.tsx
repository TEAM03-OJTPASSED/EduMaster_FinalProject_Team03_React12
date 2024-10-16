import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  allowedRoles: string[];
  children?: ReactNode; // Optional if using Outlet for nested routes
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const user = localStorage.getItem("User");
  const userRole = user ? JSON.parse(user).role : null;

  // If no user is found (not authenticated), redirect to login
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated but doesn't have the allowed role
  if (!allowedRoles.includes(userRole)) {
    localStorage.setItem("unauthorized", "true");
    return <Navigate to="/" />;
  }

  // If the user is authenticated and has the correct role, render the children or Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
