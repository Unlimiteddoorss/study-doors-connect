
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Notify user about redirect
    toast({
      title: "تحويل",
      description: "جاري تحويلك إلى صفحة تسجيل الدخول الجديدة",
    });
  }, [toast]);
  
  // Redirect to the new LoginPage component
  return <Navigate to="/login" replace />;
};

export default Login;
