
import { Navigate, Outlet } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type UserRole = 'student' | 'admin' | 'agent';

interface ProtectedRouteProps {
  children?: ReactNode;
  allowedRoles: UserRole[];
  userRole: UserRole;
}

export const ProtectedRoute = ({ children, allowedRoles, userRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only set ready after the auth has finished loading
    if (!loading) {
      setIsReady(true);
    }
  }, [loading]);

  // While checking auth status, show nothing or a loading spinner
  if (!isReady) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-unlimited-blue"></div>
      </div>
    );
  }

  // Check if user is authenticated
  const isAuthenticated = user !== null || localStorage.getItem('userRole') !== null;
  
  // Check if user has the required role
  const hasPermission = allowedRoles.includes(userRole);

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission) {
    console.log("User doesn't have permission, redirecting to unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }

  // If Outlet is used (for nested routes), render that, otherwise render children
  return children ? <>{children}</> : <Outlet />;
};
