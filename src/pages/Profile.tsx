
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Profile = () => {
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">الملف الشخصي</h1>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p>معلومات الملف الشخصي ستظهر هنا.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
