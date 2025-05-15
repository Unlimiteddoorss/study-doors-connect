
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { RegisterForm } from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">إنشاء حساب جديد</h1>
          <RegisterForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
