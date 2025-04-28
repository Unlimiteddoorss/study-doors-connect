
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type UserRole = 'student' | 'admin' | 'agent';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  userRole: UserRole;
}

export const ProtectedRoute = ({ children, allowedRoles, userRole }: ProtectedRouteProps) => {
  const isAuthenticated = true; // For testing purposes
  const hasPermission = allowedRoles.includes(userRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
