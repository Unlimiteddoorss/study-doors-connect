
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle2,
  FileCheck2, 
  FileSearch, 
  FileWarning, 
  X, 
  FileX2,
  AlertCircle,
} from 'lucide-react';

interface ApplicationStatusBadgesProps {
  status: string;
}

const ApplicationStatusBadges = ({ status }: ApplicationStatusBadgesProps) => {
  const { t } = useTranslation();
  
  const getStatusIcon = (currentStatus: string) => {
    switch (currentStatus) {
      case 'submitted':
        return <Clock className="h-3.5 w-3.5" />;
      case 'documents':
        return <FileCheck2 className="h-3.5 w-3.5" />;
      case 'pending':
        return <Clock className="h-3.5 w-3.5" />;
      case 'review':
        return <FileSearch className="h-3.5 w-3.5" />;
      case 'conditional':
        return <FileWarning className="h-3.5 w-3.5" />;
      case 'approved':
        return <CheckCircle2 className="h-3.5 w-3.5" />;
      case 'rejected':
        return <FileX2 className="h-3.5 w-3.5" />;
      case 'draft':
        return <AlertCircle className="h-3.5 w-3.5" />;
      default:
        return <Clock className="h-3.5 w-3.5" />;
    }
  };
  
  const getStatusLabel = (currentStatus: string) => {
    switch (currentStatus) {
      case 'draft':
        return t('application.status.draft', 'مسودة');
      case 'submitted':
        return t('application.status.submitted', 'تم تقديم الطلب');
      case 'documents':
        return t('application.status.documents', 'مراجعة المستندات');
      case 'pending':
        return t('application.status.pending', 'قيد الانتظار');
      case 'review':
        return t('application.status.review', 'مراجعة الطلب');
      case 'conditional':
        return t('application.status.conditional', 'قبول مشروط');
      case 'approved':
        return t('application.status.approved', 'تم القبول');
      case 'rejected':
        return t('application.status.rejected', 'تم الرفض');
      case 'paid':
        return t('application.status.paid', 'تم الدفع');
      case 'registered':
        return t('application.status.registered', 'مسجل');
      default:
        return status;
    }
  };
  
  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'submitted':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'documents':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'review':
        return 'bg-unlimited-light-blue text-unlimited-blue hover:bg-unlimited-light-blue/80';
      case 'conditional':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'approved':
      case 'paid':
      case 'registered':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  return (
    <div>
      <Badge className={`${getStatusColor(status)} gap-1 py-1.5 text-xs`} variant="outline">
        {getStatusIcon(status)}
        {getStatusLabel(status)}
      </Badge>
    </div>
  );
};

export default ApplicationStatusBadges;
