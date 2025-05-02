
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Clock, FileText, Ban, AlertCircle } from 'lucide-react';

interface ApplicationStatusBadgesProps {
  status: string;
}

const ApplicationStatusBadges = ({ status }: ApplicationStatusBadgesProps) => {
  const { t } = useTranslation();
  
  const getStatusDetails = () => {
    switch (status) {
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
          label: t('application.status.pending', 'قيد الانتظار'),
          icon: <Clock className="h-4 w-4" />
        };
      case 'review':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200', 
          label: t('application.status.review', 'قيد المراجعة'),
          icon: <Clock className="h-4 w-4" />
        };
      case 'documents':
        return { 
          color: 'bg-purple-100 text-purple-800 border-purple-200', 
          label: t('application.status.documents', 'بانتظار المستندات'),
          icon: <FileText className="h-4 w-4" />
        };
      case 'approved':
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          label: t('application.status.approved', 'مقبول'),
          icon: <CheckCircle className="h-4 w-4" />
        };
      case 'rejected':
        return { 
          color: 'bg-red-100 text-red-800 border-red-200', 
          label: t('application.status.rejected', 'مرفوض'),
          icon: <Ban className="h-4 w-4" />
        };
      case 'conditional':
        return { 
          color: 'bg-indigo-100 text-indigo-800 border-indigo-200', 
          label: t('application.status.conditional', 'قبول مشروط'),
          icon: <AlertCircle className="h-4 w-4" />
        };
      case 'paid':
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          label: t('application.status.paid', 'مدفوع'),
          icon: <CheckCircle className="h-4 w-4" />
        };
      case 'registered':
        return { 
          color: 'bg-teal-100 text-teal-800 border-teal-200', 
          label: t('application.status.registered', 'مسجل'),
          icon: <CheckCircle className="h-4 w-4" />
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          label: status,
          icon: null
        };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <Badge className={`${statusDetails.color} flex items-center gap-1 px-3 py-2 text-sm font-medium`}>
      {statusDetails.icon}
      {statusDetails.label}
    </Badge>
  );
};

export default ApplicationStatusBadges;
