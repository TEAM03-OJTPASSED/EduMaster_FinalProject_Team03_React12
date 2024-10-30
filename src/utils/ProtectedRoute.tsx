import { message } from "antd";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store/store";

type ProtectedRouteProps = {
  allowedRoles: string[];
  children?: ReactNode; // Optional if using Outlet for nested routes
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const {currentUser, token} = useSelector((state:RootState) => state.auth)
  const userRole = currentUser ? currentUser.role : "";

  // If no user is found (not authenticated), redirect to login
  if (!userRole && !token) {
    message.destroy();
    message.error("You must be logged in to do this action.");
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
