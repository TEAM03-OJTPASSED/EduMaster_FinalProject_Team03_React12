import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const currentUser = localStorage.getItem("User");

  if (!currentUser) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  const { role } = JSON.parse(currentUser);

  if (!allowedRoles.includes(role)) {
    // If the user doesn't have permission, redirect to an error or unauthorized page

    return <Navigate to="/" replace />;
  }

  // If user role is allowed, render the requested page
  return <Outlet />;
};

export default ProtectedRoute;
