
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <MainLayout>
      <div className="flex min-h-[800px] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-unlimited-dark-blue">
              إنشاء حساب جديد
            </h2>
            <p className="mt-2 text-unlimited-gray">
              انضم إلى أبواب غير محدودة وابدأ رحلة دراستك
            </p>
          </div>
          
          <div className="bg-white p-8 shadow-md rounded-lg">
            <RegisterForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
