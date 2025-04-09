
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <MainLayout>
      <div className="flex min-h-[600px] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-unlimited-dark-blue">
              مرحباً بك مجدداً
            </h2>
            <p className="mt-2 text-unlimited-gray">
              قم بتسجيل الدخول للوصول إلى حسابك
            </p>
          </div>
          
          <div className="bg-white p-8 shadow-md rounded-lg">
            <LoginForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
