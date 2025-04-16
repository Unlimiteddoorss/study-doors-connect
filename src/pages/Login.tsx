
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  // Redirect to the new LoginPage component
  return <Navigate to="/login" replace />;
};

export default Login;
