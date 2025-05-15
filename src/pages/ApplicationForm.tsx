
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { StudentApplicationForm } from '@/components/applications/StudentApplicationForm';

const ApplicationForm = () => {
  const { id } = useParams<{ id?: string }>();
  
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">تقديم طلب جديد</h1>
        <StudentApplicationForm applicationId={id} />
      </div>
    </DashboardLayout>
  );
};

export default ApplicationForm;
