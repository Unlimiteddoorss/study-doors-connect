
import { Navigate, Outlet } from "react-router-dom";
import { ReactNode } from "react";

type UserRole = 'student' | 'admin' | 'agent';

interface ProtectedRouteProps {
  children?: ReactNode;
  allowedRoles: UserRole[];
  userRole: UserRole;
}

export const ProtectedRoute = ({ children, allowedRoles, userRole }: ProtectedRouteProps) => {
  // Use localStorage to check if user is authenticated
  const isAuthenticated = localStorage.getItem('userRole') !== null;
  const hasPermission = allowedRoles.includes(userRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If Outlet is used (for nested routes), render that, otherwise render children
  return children ? <>{children}</> : <Outlet />;
};
