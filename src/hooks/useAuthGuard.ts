
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useAuthGuard = (requiredRole?: string, allowedRoles?: string[]) => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      toast({
        title: 'تسجيل الدخول مطلوب',
        description: 'يرجى تسجيل الدخول للوصول لهذه الصفحة',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    if (requiredRole && userRole !== requiredRole) {
      toast({
        title: 'غير مصرح',
        description: 'ليس لديك صلاحية للوصول لهذه الصفحة',
        variant: 'destructive',
      });
      navigate('/unauthorized');
      return;
    }

    if (allowedRoles && !allowedRoles.includes(userRole || '')) {
      toast({
        title: 'غير مصرح',
        description: 'ليس لديك صلاحية للوصول لهذه الصفحة',
        variant: 'destructive',
      });
      navigate('/unauthorized');
      return;
    }
  }, [user, userRole, loading, requiredRole, allowedRoles, navigate, toast]);

  return { user, userRole, loading, isAuthorized: !!user };
};
