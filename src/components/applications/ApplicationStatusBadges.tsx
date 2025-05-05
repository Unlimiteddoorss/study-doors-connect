
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Send, Clock, FileCheck2, FileSearch, CheckCircle2, FileWarning, FileX2, PenLine } from 'lucide-react';

interface ApplicationStatusBadgesProps {
  status: string;
}

const ApplicationStatusBadges = ({ status }: ApplicationStatusBadgesProps) => {
  const { t } = useTranslation();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      case 'submitted':
      case 'pending':
        return 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300';
      case 'documents':
        return 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300';
      case 'review':
        return 'bg-unlimited-light-blue text-unlimited-dark-blue hover:bg-unlimited-blue/20';
      case 'conditional':
        return 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300';
      case 'approved':
      case 'paid':
      case 'registered':
        return 'bg-green-200 text-green-800 hover:bg-green-300';
      case 'rejected':
        return 'bg-red-200 text-red-800 hover:bg-red-300';
      default:
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <PenLine className="h-3.5 w-3.5 mr-1" />;
      case 'submitted':
        return <Send className="h-3.5 w-3.5 mr-1" />;
      case 'pending':
        return <Clock className="h-3.5 w-3.5 mr-1" />;
      case 'documents':
        return <FileCheck2 className="h-3.5 w-3.5 mr-1" />;
      case 'review':
        return <FileSearch className="h-3.5 w-3.5 mr-1" />;
      case 'conditional':
        return <FileWarning className="h-3.5 w-3.5 mr-1" />;
      case 'approved':
      case 'paid':
      case 'registered':
        return <CheckCircle2 className="h-3.5 w-3.5 mr-1" />;
      case 'rejected':
        return <FileX2 className="h-3.5 w-3.5 mr-1" />;
      default:
        return null;
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return t('application.status.draft', 'مسودة');
      case 'submitted':
        return t('application.status.submitted', 'تم التقديم');
      case 'pending':
        return t('application.status.pending', 'قيد الانتظار');
      case 'documents':
        return t('application.status.documents', 'مراجعة المستندات');
      case 'review':
        return t('application.status.review', 'قيد المراجعة');
      case 'conditional':
        return t('application.status.conditional', 'قبول مشروط');
      case 'approved':
        return t('application.status.approved', 'تم القبول');
      case 'paid':
        return t('application.status.paid', 'تم الدفع');
      case 'registered':
        return t('application.status.registered', 'تم التسجيل');
      case 'rejected':
        return t('application.status.rejected', 'مرفوض');
      default:
        return t('application.status.unknown', 'غير معروف');
    }
  };
  
  const getStatusTooltip = (status: string) => {
    switch (status) {
      case 'draft':
        return t('application.status.draftTooltip', 'الطلب غير مكتمل ولم يتم تقديمه بعد');
      case 'submitted':
        return t('application.status.submittedTooltip', 'تم تقديم الطلب وهو قيد المراجعة الأولية');
      case 'pending':
        return t('application.status.pendingTooltip', 'الطلب في انتظار المراجعة من قبل فريق القبول');
      case 'documents':
        return t('application.status.documentsTooltip', 'يتم حاليًا مراجعة المستندات المقدمة');
      case 'review':
        return t('application.status.reviewTooltip', 'يتم حاليًا مراجعة طلبك من قبل لجنة القبول');
      case 'conditional':
        return t('application.status.conditionalTooltip', 'تم قبولك بشكل مشروط، يرجى مراجعة الشروط المطلوبة');
      case 'approved':
        return t('application.status.approvedTooltip', 'تهانينا! تم قبول طلبك في البرنامج');
      case 'paid':
        return t('application.status.paidTooltip', 'تم استلام الرسوم الدراسية بنجاح');
      case 'registered':
        return t('application.status.registeredTooltip', 'تم تسجيلك بنجاح في البرنامج');
      case 'rejected':
        return t('application.status.rejectedTooltip', 'للأسف، تم رفض طلبك. يمكنك التواصل مع فريق القبول لمزيد من المعلومات');
      default:
        return '';
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            className={`${getStatusColor(status)} flex items-center px-3 py-1.5 text-sm font-medium`}
          >
            {getStatusIcon(status)}
            {getStatusLabel(status)}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getStatusTooltip(status)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ApplicationStatusBadges;
