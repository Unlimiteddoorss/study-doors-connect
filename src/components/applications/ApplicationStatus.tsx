
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, Clock, Calendar, User, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ApplicationStatusProps {
  applicationId: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  lastUpdate: string;
  program: string;
  university: string;
  submissionDate?: string;
  studentName?: string;
  country?: string;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  applicationId,
  status,
  lastUpdate,
  program,
  university,
  submissionDate,
  studentName,
  country
}) => {
  const { toast } = useToast();
  
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

  const handleViewDetails = () => {
    toast({
      title: "تم الانتقال إلى تفاصيل الطلب",
      description: `عرض تفاصيل الطلب رقم ${applicationId}`,
    });
  };

  const handleContactUs = () => {
    toast({
      title: "تم فتح المحادثة",
      description: "يمكنك الآن التواصل مع مستشارينا بخصوص طلبك",
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
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
          {studentName && (
            <div>
              <p className="text-unlimited-gray mb-1">اسم الطالب</p>
              <div className="flex items-center">
                <User className="h-4 w-4 text-unlimited-blue ml-2" />
                <p className="font-semibold">{studentName}</p>
              </div>
            </div>
          )}
          
          <div>
            <p className="text-unlimited-gray mb-1">البرنامج</p>
            <p className="font-semibold">{program}</p>
          </div>
          
          <div>
            <p className="text-unlimited-gray mb-1">الجامعة</p>
            <p className="font-semibold">{university}</p>
          </div>
          
          {country && (
            <div>
              <p className="text-unlimited-gray mb-1">البلد</p>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-unlimited-blue ml-2" />
                <p className="font-semibold">{country}</p>
              </div>
            </div>
          )}
          
          {submissionDate && (
            <div>
              <p className="text-unlimited-gray mb-1">تاريخ التقديم</p>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-unlimited-blue ml-2" />
                <p className="font-semibold">{submissionDate}</p>
              </div>
            </div>
          )}
          
          <div>
            <p className="text-unlimited-gray mb-1">آخر تحديث</p>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-unlimited-blue ml-2" />
              <p className="font-semibold">{lastUpdate}</p>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button 
              asChild 
              className="flex-1" 
              onClick={handleContactUs}
            >
              <Link to={`/messages?application=${applicationId}`}>
                <MessageCircle className="w-4 h-4 ml-2" />
                تواصل معنا
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="flex-1" 
              onClick={handleViewDetails}
            >
              <Link to={`/dashboard/applications/${applicationId}`}>
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
