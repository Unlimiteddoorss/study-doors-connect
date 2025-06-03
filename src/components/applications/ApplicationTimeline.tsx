
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, AlertCircle, FileText, User } from 'lucide-react';

interface TimelineEntry {
  id: string;
  date: string;
  status: string;
  note: string;
  by: string;
  type?: 'status_change' | 'document_upload' | 'message' | 'system';
}

interface ApplicationTimelineProps {
  timeline: TimelineEntry[];
  isLoading?: boolean;
}

const ApplicationTimeline = ({ timeline, isLoading }: ApplicationTimelineProps) => {
  const getStatusIcon = (status: string, type?: string) => {
    if (type === 'document_upload') return <FileText className="h-4 w-4" />;
    if (type === 'message') return <User className="h-4 w-4" />;
    
    switch (status) {
      case 'submitted':
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'under_review':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'accepted':
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string, type?: string) => {
    if (type === 'document_upload') return 'bg-purple-100 border-purple-300';
    if (type === 'message') return 'bg-indigo-100 border-indigo-300';
    
    switch (status) {
      case 'submitted':
      case 'pending':
        return 'bg-yellow-100 border-yellow-300';
      case 'under_review':
        return 'bg-blue-100 border-blue-300';
      case 'accepted':
      case 'approved':
        return 'bg-green-100 border-green-300';
      case 'rejected':
        return 'bg-red-100 border-red-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const getArabicStatus = (status: string, type?: string) => {
    if (type === 'document_upload') return 'رفع مستند';
    if (type === 'message') return 'رسالة';
    if (type === 'system') return 'إجراء نظام';
    
    const statusMap = {
      submitted: 'تم التقديم',
      pending: 'قيد الانتظار',
      under_review: 'قيد المراجعة',
      accepted: 'مقبول',
      approved: 'موافق عليه',
      rejected: 'مرفوض',
      cancelled: 'ملغي',
      documents_requested: 'طلب مستندات'
    };
    
    return statusMap[status as keyof typeof statusMap] || status;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>الجدول الزمني</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-unlimited-blue"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!timeline || timeline.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>الجدول الزمني</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد أحداث في الجدول الزمني بعد</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          الجدول الزمني
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((entry, index) => (
            <div key={entry.id || index} className="relative">
              {/* الخط الرابط */}
              {index < timeline.length - 1 && (
                <div className="absolute right-4 top-8 w-0.5 h-full bg-gray-200 -z-10" />
              )}
              
              <div className="flex gap-4">
                {/* الأيقونة */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white ${getStatusColor(entry.status, entry.type)}`}>
                  {getStatusIcon(entry.status, entry.type)}
                </div>
                
                {/* المحتوى */}
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getArabicStatus(entry.status, entry.type)}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        بواسطة: {entry.by}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  
                  {entry.note && (
                    <p className="mt-1 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                      {entry.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationTimeline;
