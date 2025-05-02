
import { toast } from "@/hooks/use-toast";
import { i18n } from "i18next";

export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'pending'
  | 'documents' 
  | 'review' 
  | 'conditional' 
  | 'approved' 
  | 'paid' 
  | 'registered' 
  | 'rejected';

export interface ApplicationStatusStep {
  status: ApplicationStatus;
  label: string;
  description: string;
  icon: string;
}

export const getApplicationStatusColor = (status: ApplicationStatus): string => {
  switch (status) {
    case 'draft':
      return 'bg-slate-400';
    case 'submitted':
    case 'pending':
      return 'bg-yellow-500';
    case 'documents':
      return 'bg-blue-400';
    case 'review':
      return 'bg-purple-500';
    case 'conditional':
      return 'bg-orange-500';
    case 'approved':
      return 'bg-green-500';
    case 'paid':
      return 'bg-emerald-600';
    case 'registered':
      return 'bg-teal-600';
    case 'rejected':
      return 'bg-red-500';
    default:
      return 'bg-slate-400';
  }
};

export const getApplicationStatusSteps = (t: any): ApplicationStatusStep[] => [
  {
    status: 'draft',
    label: t('application.status.draft', 'مسودة'),
    description: t('application.status.draftDescription', 'الطلب قيد الإنشاء'),
    icon: 'edit'
  },
  {
    status: 'submitted',
    label: t('application.status.submitted', 'تم التقديم'),
    description: t('application.status.submittedDescription', 'تم استلام طلبك'),
    icon: 'check'
  },
  {
    status: 'documents',
    label: t('application.status.documents', 'المستندات'),
    description: t('application.status.documentsDescription', 'يتم مراجعة المستندات'),
    icon: 'file-text'
  },
  {
    status: 'review',
    label: t('application.status.review', 'المراجعة'),
    description: t('application.status.reviewDescription', 'الطلب قيد المراجعة'),
    icon: 'search'
  },
  {
    status: 'approved',
    label: t('application.status.approved', 'تمت الموافقة'),
    description: t('application.status.approvedDescription', 'تمت الموافقة على طلبك'),
    icon: 'check-circle'
  },
  {
    status: 'registered',
    label: t('application.status.registered', 'تم التسجيل'),
    description: t('application.status.registeredDescription', 'تم تسجيلك بنجاح'),
    icon: 'user-check'
  }
];

export const validateApplicationStep = (
  step: number, 
  formData: any, 
  t: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  let isValid = true;

  switch (step) {
    case 1: // الخطوة الأولى: المعلومات الشخصية
      if (!formData.personalInfo?.firstName?.trim()) {
        errors.push(t('application.validation.firstNameRequired', 'الاسم الأول مطلوب'));
        isValid = false;
      }
      
      if (!formData.personalInfo?.lastName?.trim()) {
        errors.push(t('application.validation.lastNameRequired', 'الاسم الأخير مطلوب'));
        isValid = false;
      }
      
      if (!formData.personalInfo?.email?.trim()) {
        errors.push(t('application.validation.emailRequired', 'البريد الإلكتروني مطلوب'));
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
        errors.push(t('application.validation.emailInvalid', 'البريد الإلكتروني غير صالح'));
        isValid = false;
      }
      
      if (!formData.personalInfo?.phone?.trim()) {
        errors.push(t('application.validation.phoneRequired', 'رقم الهاتف مطلوب'));
        isValid = false;
      }
      
      if (!formData.personalInfo?.nationality?.trim()) {
        errors.push(t('application.validation.nationalityRequired', 'الجنسية مطلوبة'));
        isValid = false;
      }
      
      break;
      
    case 2: // الخطوة الثانية: المستندات
      if (!formData.documents || !Array.isArray(formData.documents) || formData.documents.length === 0) {
        errors.push(t('application.validation.documentsRequired', 'يجب تحميل المستندات المطلوبة'));
        isValid = false;
      } else {
        const requiredDocs = formData.documents.filter((doc: any) => doc.required);
        const uploadedRequiredDocs = requiredDocs.filter((doc: any) => doc.status === 'uploaded');
        
        if (uploadedRequiredDocs.length < requiredDocs.length) {
          errors.push(t('application.validation.requiredDocumentsMissing', 'بعض المستندات المطلوبة غير موجودة'));
          isValid = false;
        }
      }
      
      break;
      
    case 3: // الخطوة الثالثة: المعلومات الأكاديمية
      if (!formData.academicInfo?.education?.trim()) {
        errors.push(t('application.validation.educationRequired', 'المستوى التعليمي مطلوب'));
        isValid = false;
      }
      
      if (!formData.academicInfo?.graduationYear) {
        errors.push(t('application.validation.graduationYearRequired', 'سنة التخرج مطلوبة'));
        isValid = false;
      }
      
      if (!formData.academicInfo?.gpa?.trim()) {
        errors.push(t('application.validation.gpaRequired', 'المعدل التراكمي مطلوب'));
        isValid = false;
      }
      
      break;
      
    case 4: // الخطوة الرابعة: اختيار البرنامج
      if (!formData.program?.name?.trim()) {
        errors.push(t('application.validation.programRequired', 'اسم البرنامج مطلوب'));
        isValid = false;
      }
      
      if (!formData.university?.trim()) {
        errors.push(t('application.validation.universityRequired', 'اسم الجامعة مطلوب'));
        isValid = false;
      }
      
      break;
  }

  return { isValid, errors };
};

export const getApplicationProgress = (formData: any): number => {
  let completedSections = 0;
  let totalSections = 4; // إجمالي عدد الأقسام
  
  // التحقق من اكتمال المعلومات الشخصية
  if (
    formData.personalInfo?.firstName?.trim() && 
    formData.personalInfo?.lastName?.trim() && 
    formData.personalInfo?.email?.trim()
  ) {
    completedSections++;
  }
  
  // التحقق من اكتمال المستندات
  if (formData.documents && Array.isArray(formData.documents) && formData.documents.some((doc: any) => doc.status === 'uploaded')) {
    completedSections++;
  }
  
  // التحقق من اكتمال المعلومات الأكاديمية
  if (formData.academicInfo?.education?.trim() && formData.academicInfo?.graduationYear) {
    completedSections++;
  }
  
  // التحقق من اكتمال اختيار البرنامج
  if (formData.program?.name?.trim() && formData.university?.trim()) {
    completedSections++;
  }
  
  return Math.round((completedSections / totalSections) * 100);
};

// دالة لحفظ الطلب في التخزين المحلي
export const saveApplicationToStorage = (applicationData: any) => {
  try {
    // الحصول على الطلبات المحفوظة سابقاً
    const existingApplications = localStorage.getItem('studentApplications');
    const applications = existingApplications ? JSON.parse(existingApplications) : [];
    
    // إذا كان هناك طلب بنفس المعرف، قم بتحديثه
    const existingIndex = applications.findIndex((app: any) => app.id === applicationData.id);
    
    if (existingIndex >= 0) {
      applications[existingIndex] = {
        ...applications[existingIndex],
        ...applicationData,
        lastUpdated: new Date().toISOString()
      };
    } else {
      // إضافة طلب جديد
      applications.push({
        ...applicationData,
        id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        status: applicationData.status || 'draft',
        lastUpdated: new Date().toISOString()
      });
    }
    
    // حفظ البيانات المحدثة
    localStorage.setItem('studentApplications', JSON.stringify(applications));
    
    return true;
  } catch (error) {
    console.error('Error saving application to storage:', error);
    return false;
  }
};

// دالة لجلب طلب محدد من التخزين المحلي
export const getApplicationFromStorage = (id: string) => {
  try {
    const existingApplications = localStorage.getItem('studentApplications');
    if (!existingApplications) return null;
    
    const applications = JSON.parse(existingApplications);
    return applications.find((app: any) => app.id === id) || null;
  } catch (error) {
    console.error('Error retrieving application from storage:', error);
    return null;
  }
};

// دالة لجلب جميع طلبات الطالب من التخزين المحلي
export const getAllApplicationsFromStorage = () => {
  try {
    const existingApplications = localStorage.getItem('studentApplications');
    return existingApplications ? JSON.parse(existingApplications) : [];
  } catch (error) {
    console.error('Error retrieving applications from storage:', error);
    return [];
  }
};

export const updateApplicationStatus = (applicationId: string, newStatus: ApplicationStatus, t: any): boolean => {
  try {
    const applications = getAllApplicationsFromStorage();
    const appIndex = applications.findIndex((app: any) => app.id === applicationId);
    
    if (appIndex < 0) return false;
    
    applications[appIndex].status = newStatus;
    applications[appIndex].statusUpdatedAt = new Date().toISOString();
    
    // إضافة حدث جديد في الجدول الزمني للطلب
    if (!applications[appIndex].timeline) {
      applications[appIndex].timeline = [];
    }
    
    applications[appIndex].timeline.push({
      id: Date.now(),
      status: newStatus,
      date: new Date().toISOString(),
      title: t(`application.status.${newStatus}`, newStatus),
      description: t(`application.status.${newStatus}Description`, `تم تغيير حالة الطلب إلى ${newStatus}`),
    });
    
    localStorage.setItem('studentApplications', JSON.stringify(applications));
    
    return true;
  } catch (error) {
    console.error('Error updating application status:', error);
    return false;
  }
};
