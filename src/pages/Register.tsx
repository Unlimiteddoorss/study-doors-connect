
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import MainLayout from '@/components/layout/MainLayout';
import SecureRegisterForm from '@/components/auth/SecureRegisterForm';

const Register = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Notify user about updated registration
    toast({
      title: "نموذج التسجيل الجديد",
      description: "تم تحديث نموذج التسجيل لاستخدام النظام الآمن",
    });
  }, [toast]);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">إنشاء حساب جديد</h1>
          </div>
          <SecureRegisterForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
