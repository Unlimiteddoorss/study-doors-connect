
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ApplicationStatus = () => {
  const { id } = useParams<{ id?: string }>();
  
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">حالة الطلب #{id}</h1>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p>معلومات حالة الطلب ستظهر هنا.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationStatus;
