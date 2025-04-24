
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Clock, AlertTriangle, FileText, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type ApplicationStatus = 
  | 'submitted' 
  | 'document_check' 
  | 'university_review' 
  | 'conditional_acceptance'
  | 'payment_pending'
  | 'approved'
  | 'rejected'
  | 'incomplete';

interface Step {
  id: ApplicationStatus;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ReactNode;
  completedIcon: React.ReactNode;
}

interface ApplicationTrackerProps {
  currentStatus: ApplicationStatus;
  applicationDate: string;
  className?: string;
  notes?: string;
  notesAr?: string;
}

export const ApplicationTracker = ({ 
  currentStatus, 
  applicationDate, 
  className,
  notes,
  notesAr
}: ApplicationTrackerProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const getLocalizedValue = (enValue: string, arValue: string) => {
    return isRtl ? arValue : enValue;
  };

  const steps: Step[] = [
    {
      id: 'submitted',
      title: 'Application Submitted',
      titleAr: 'تم تقديم الطلب',
      description: 'Your application has been received by our team',
      descriptionAr: 'تم استلام طلبك بواسطة فريقنا',
      icon: <FileText className="h-5 w-5" />,
      completedIcon: <Check className="h-5 w-5" />,
    },
    {
      id: 'document_check',
      title: 'Document Verification',
      titleAr: 'التحقق من المستندات',
      description: 'Verifying all required documents',
      descriptionAr: 'جاري التحقق من جميع المستندات المطلوبة',
      icon: <FileText className="h-5 w-5" />,
      completedIcon: <Check className="h-5 w-5" />,
    },
    {
      id: 'university_review',
      title: 'University Review',
      titleAr: 'مراجعة الجامعة',
      description: 'Application under review by the university',
      descriptionAr: 'الطلب قيد المراجعة من قبل الجامعة',
      icon: <Clock className="h-5 w-5" />,
      completedIcon: <Check className="h-5 w-5" />,
    },
    {
      id: 'conditional_acceptance',
      title: 'Conditional Acceptance',
      titleAr: 'القبول المشروط',
      description: 'Pre-approved pending final requirements',
      descriptionAr: 'تمت الموافقة المبدئية في انتظار المتطلبات النهائية',
      icon: <HelpCircle className="h-5 w-5" />,
      completedIcon: <Check className="h-5 w-5" />,
    },
    {
      id: 'payment_pending',
      title: 'Payment Pending',
      titleAr: 'في انتظار الدفع',
      description: 'Waiting for tuition payment',
      descriptionAr: 'في انتظار دفع الرسوم الدراسية',
      icon: <AlertTriangle className="h-5 w-5" />,
      completedIcon: <Check className="h-5 w-5" />,
    },
    {
      id: 'approved',
      title: 'Final Acceptance',
      titleAr: 'القبول النهائي',
      description: 'Congratulations! Your application is approved',
      descriptionAr: 'تهانينا! تمت الموافقة على طلبك',
      icon: <Check className="h-5 w-5" />,
      completedIcon: <Check className="h-5 w-5" />,
    },
  ];

  // Map status to step index
  const getStatusIndex = (status: ApplicationStatus): number => {
    if (status === 'rejected') return -1;
    if (status === 'incomplete') return -2;
    
    const statusMap: Record<ApplicationStatus, number> = {
      submitted: 0,
      document_check: 1,
      university_review: 2,
      conditional_acceptance: 3,
      payment_pending: 4,
      approved: 5,
      rejected: -1,
      incomplete: -2,
    };
    
    return statusMap[status] || 0;
  };

  const currentStepIndex = getStatusIndex(currentStatus);
  
  // Special statuses that don't fit in the normal flow
  const isRejected = currentStatus === 'rejected';
  const isIncomplete = currentStatus === 'incomplete';

  return (
    <div className={cn("p-6 bg-white rounded-lg shadow-sm", className)}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-unlimited-blue">
          {t('application.tracker.title')}
        </h3>
        <Badge 
          className={cn(
            "text-white",
            isRejected ? "bg-red-500" :
            isIncomplete ? "bg-amber-500" :
            currentStatus === 'approved' ? "bg-green-500" : "bg-blue-500"
          )}
        >
          {isRejected ? t('application.status.rejected') :
           isIncomplete ? t('application.status.incomplete') :
           currentStatus === 'approved' ? t('application.status.approved') :
           t('application.status.processing')}
        </Badge>
      </div>
      
      <div className="text-sm text-unlimited-gray mb-6">
        <span className="font-medium">{t('application.tracker.submitted')}: </span>
        {applicationDate}
      </div>
      
      {(isRejected || isIncomplete) ? (
        <div className={cn(
          "p-4 rounded-lg flex items-start gap-3",
          isRejected ? "bg-red-50 border border-red-200" : "bg-amber-50 border border-amber-200"
        )}>
          {isRejected ? (
            <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <h4 className="font-medium mb-1">
              {isRejected 
                ? t('application.tracker.applicationRejected') 
                : t('application.tracker.applicationIncomplete')}
            </h4>
            <p className="text-sm">
              {notes ? getLocalizedValue(notes, notesAr || notes) : 
                isRejected 
                  ? t('application.tracker.rejectionDefaultMessage')
                  : t('application.tracker.incompleteDefaultMessage')
              }
            </p>
          </div>
        </div>
      ) : (
        <div className={`relative ${isRtl ? 'rtl' : ''}`}>
          <div className="absolute top-0 bottom-0 left-[18px] w-0.5 bg-gray-200" />
          
          {steps.map((step, index) => {
            const isCompleted = currentStepIndex >= index;
            const isActive = currentStepIndex === index;
            
            return (
              <div key={step.id} className="relative flex items-start mb-6 last:mb-0">
                <div className={cn(
                  "z-10 flex items-center justify-center w-9 h-9 rounded-full border-2",
                  isCompleted 
                    ? "bg-unlimited-blue text-white border-unlimited-blue" 
                    : "bg-white text-unlimited-gray border-gray-200"
                )}>
                  {isCompleted ? step.completedIcon : step.icon}
                </div>
                
                <div className="ml-4">
                  <h4 className={cn(
                    "font-medium",
                    isActive ? "text-unlimited-blue" : 
                    isCompleted ? "text-unlimited-gray" : "text-unlimited-gray/70"
                  )}>
                    {getLocalizedValue(step.title, step.titleAr)}
                  </h4>
                  
                  <p className={cn(
                    "text-sm",
                    isActive ? "text-unlimited-gray" : "text-unlimited-gray/70"
                  )}>
                    {getLocalizedValue(step.description, step.descriptionAr)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {notes && !isRejected && !isIncomplete && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h4 className="font-medium mb-1 text-unlimited-blue">
            {t('application.tracker.additionalNotes')}
          </h4>
          <p className="text-sm text-unlimited-gray">
            {getLocalizedValue(notes, notesAr || notes)}
          </p>
        </div>
      )}
      
      <TooltipProvider>
        <div className="mt-6 flex justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs text-unlimited-gray hover:text-unlimited-blue cursor-help">
                {t('application.tracker.lastUpdated')}: {new Date().toLocaleDateString()}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('application.tracker.autoUpdates')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ApplicationTracker;
