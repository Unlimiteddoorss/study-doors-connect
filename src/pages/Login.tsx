
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const [isRedirecting, setIsRedirecting] = useState(true);
  
  useEffect(() => {
    // Show redirection toast
    if (isRedirecting) {
      toast({
        title: "تحويل",
        description: "جاري تحويلك إلى صفحة تسجيل الدخول الجديدة",
      });
      
      // Set a timeout to simulate checking for redirection
      const timer = setTimeout(() => {
        setIsRedirecting(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isRedirecting, toast]);
  
  // If no longer redirecting (after timeout), redirect to the LoginPage
  if (!isRedirecting) {
    return <Navigate to="/login" replace />;
  }
  
  // Show a loading state while "checking" if redirection is needed
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center">
          <div className="h-16 w-16 mb-6">
            <img 
              src="/lovable-uploads/9152a791-f246-458d-bd7c-b3c15d53cdbf.png"
              alt="Unlimited Doors Logo"
              className="w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-semibold text-unlimited-dark-blue mb-2">
            جاري التحويل
          </h2>
          <p className="text-unlimited-gray text-center mb-6">
            يرجى الانتظار، سيتم تحويلك إلى صفحة تسجيل الدخول الجديدة...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-unlimited-blue h-2.5 rounded-full animate-pulse w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
