
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Messages = () => {
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">الرسائل</h1>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p>محتوى صفحة الرسائل سيتم إضافته لاحقاً.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
