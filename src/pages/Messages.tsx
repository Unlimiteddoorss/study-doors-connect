
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { MessagesContainer } from '@/components/applications/messages/MessagesContainer';

const Messages = () => {
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">الرسائل</h1>
        <MessagesContainer />
      </div>
    </DashboardLayout>
  );
};

export default Messages;
