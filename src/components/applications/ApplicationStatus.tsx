
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ApplicationStatusProps {
  applicationId: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  lastUpdate: string;
  program: string;
  university: string;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  applicationId,
  status,
  lastUpdate,
  program,
  university
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'accepted': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'reviewing': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'accepted': return 'تم القبول';
      case 'rejected': return 'تم الرفض';
      case 'reviewing': return 'قيد المراجعة';
      default: return 'قيد الانتظار';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">طلب رقم: {applicationId}</h3>
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-unlimited-gray mb-1">البرنامج</p>
            <p className="font-semibold">{program}</p>
          </div>
          <div>
            <p className="text-unlimited-gray mb-1">الجامعة</p>
            <p className="font-semibold">{university}</p>
          </div>
          <div>
            <p className="text-unlimited-gray mb-1">آخر تحديث</p>
            <p className="font-semibold">{lastUpdate}</p>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button asChild className="flex-1">
              <Link to={`/messages?application=${applicationId}`}>
                <MessageCircle className="w-4 h-4 ml-2" />
                تواصل معنا
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to={`/applications/${applicationId}`}>
                <FileText className="w-4 h-4 ml-2" />
                التفاصيل
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationStatus;
