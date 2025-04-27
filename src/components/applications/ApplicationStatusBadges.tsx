
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Clock, AlertCircle, FileQuestion, CircleDashed, FileDown, XCircle, CreditCard } from "lucide-react";

interface ApplicationStatusBadgesProps {
  status: string;
}

const ApplicationStatusBadges = ({ status }: ApplicationStatusBadgesProps) => {
  const { t } = useTranslation();
  
  // تحديد الحالات المختلفة وبيانات كل حالة
  const statusInfo = () => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
          icon: <Clock className="h-4 w-4 mr-1" />,
          label: t('application.status.pending', 'قيد الانتظار'),
          description: t('application.status.pendingDesc', 'تم استلام طلبك وهو قيد المراجعة الأولية')
        };
      case 'documents':
        return {
          color: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
          icon: <FileDown className="h-4 w-4 mr-1" />,
          label: t('application.status.documents', 'بانتظار المستندات'),
          description: t('application.status.documentsDesc', 'يرجى تحميل المستندات المطلوبة لإكمال طلبك')
        };
      case 'review':
        return {
          color: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
          icon: <CircleDashed className="h-4 w-4 mr-1" />,
          label: t('application.status.review', 'قيد المراجعة'),
          description: t('application.status.reviewDesc', 'يتم حالياً مراجعة طلبك من قبل لجنة القبول')
        };
      case 'conditional':
        return {
          color: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
          icon: <AlertCircle className="h-4 w-4 mr-1" />,
          label: t('application.status.conditional', 'قبول مشروط'),
          description: t('application.status.conditionalDesc', 'تم قبولك بشرط استيفاء متطلبات معينة')
        };
      case 'approved':
        return {
          color: 'bg-green-100 text-green-800 hover:bg-green-200',
          icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
          label: t('application.status.approved', 'مقبول'),
          description: t('application.status.approvedDesc', 'تهانينا! تمت الموافقة على طلبك')
        };
      case 'paid':
        return {
          color: 'bg-teal-100 text-teal-800 hover:bg-teal-200',
          icon: <CreditCard className="h-4 w-4 mr-1" />,
          label: t('application.status.paid', 'مدفوع'),
          description: t('application.status.paidDesc', 'تم تأكيد دفع الرسوم وتأمين مقعدك')
        };
      case 'registered':
        return {
          color: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
          icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
          label: t('application.status.registered', 'مسجل'),
          description: t('application.status.registeredDesc', 'تم تسجيلك في البرنامج بشكل رسمي')
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800 hover:bg-red-200',
          icon: <XCircle className="h-4 w-4 mr-1" />,
          label: t('application.status.rejected', 'مرفوض'),
          description: t('application.status.rejectedDesc', 'نأسف، تم رفض طلبك. يمكنك الاستفسار عن السبب')
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
          icon: <FileQuestion className="h-4 w-4 mr-1" />,
          label: status || t('application.status.unknown', 'غير معروف'),
          description: t('application.status.unknownDesc', 'حالة الطلب غير معروفة حالياً')
        };
    }
  };
  
  const { color, icon, label, description } = statusInfo();
  
  return (
    <div className="flex gap-2 flex-wrap">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge className={`${color} flex items-center px-3 py-1 gap-1`}>
              {icon}
              {label}
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="p-2 max-w-xs">
            <p>{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* عرض خط سير الطلب المختصر */}
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        <StatusIndicator active={true} />
        <StatusLine active={['documents', 'review', 'conditional', 'approved', 'paid', 'registered'].includes(status)} />
        <StatusIndicator active={['documents', 'review', 'conditional', 'approved', 'paid', 'registered'].includes(status)} />
        <StatusLine active={['review', 'conditional', 'approved', 'paid', 'registered'].includes(status)} />
        <StatusIndicator active={['review', 'conditional', 'approved', 'paid', 'registered'].includes(status)} />
        <StatusLine active={['conditional', 'approved', 'paid', 'registered'].includes(status)} />
        <StatusIndicator active={['conditional', 'approved', 'paid', 'registered'].includes(status)} />
        <StatusLine active={['approved', 'paid', 'registered'].includes(status)} />
        <StatusIndicator active={['approved', 'paid', 'registered'].includes(status)} />
      </div>
    </div>
  );
};

// مكونات مساعدة لعرض خط سير الطلب
const StatusIndicator = ({ active }: { active: boolean }) => (
  <div className={`rounded-full w-2 h-2 ${active ? 'bg-unlimited-blue' : 'bg-gray-300'}`}></div>
);

const StatusLine = ({ active }: { active: boolean }) => (
  <div className={`w-4 h-0.5 ${active ? 'bg-unlimited-blue' : 'bg-gray-300'}`}></div>
);

export default ApplicationStatusBadges;
