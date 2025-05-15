
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ApplicationTimeline } from '@/components/applications/ApplicationTimeline';
import { ApplicationDetailsSection } from '@/components/applications/ApplicationDetailsSection';
import { ApplicationMessages } from '@/components/applications/ApplicationMessages';

const ApplicationStatus = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">حالة الطلب</h1>
        <ApplicationDetailsSection applicationId={id} />
        <ApplicationTimeline applicationId={id} />
        <ApplicationMessages applicationId={id} />
      </div>
    </DashboardLayout>
  );
};

export default ApplicationStatus;
