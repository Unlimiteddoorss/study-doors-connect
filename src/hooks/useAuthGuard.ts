
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useAuthGuard = (requiredRole?: string, allowedRoles?: string[]) => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      console.log('User not authenticated, redirecting to login');
      navigate('/login');
      return;
    }

    if (requiredRole && userRole !== requiredRole) {
      console.log('User role mismatch, redirecting to unauthorized');
      navigate('/unauthorized');
      return;
    }

    if (allowedRoles && !allowedRoles.includes(userRole || '')) {
      console.log('User not in allowed roles, redirecting to unauthorized');
      navigate('/unauthorized');
      return;
    }
  }, [user, userRole, loading, requiredRole, allowedRoles, navigate]);

  return { user, userRole, loading, isAuthorized: !!user };
};
