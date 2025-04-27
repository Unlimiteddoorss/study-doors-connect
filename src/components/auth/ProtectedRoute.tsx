
import { Navigate } from "react-router-dom";
import { UserRole } from "@/hooks/useRole";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  userRole: UserRole;
}

const ProtectedRoute = ({ children, allowedRoles, userRole }: ProtectedRouteProps) => {
  const isAuthenticated = true; // For testing purposes
  const hasPermission = allowedRoles.includes(userRole);

  console.log(`Route check - User role: ${userRole}, Allowed roles: ${allowedRoles.join(', ')}, Has permission: ${hasPermission}`);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
