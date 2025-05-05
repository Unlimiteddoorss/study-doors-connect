import { v4 as uuidv4 } from 'uuid';
import { TFunction } from 'i18next';

export const saveApplicationToStorage = (applicationData: any) => {
  try {
    // Generate ID if not provided
    if (!applicationData.id) {
      applicationData.id = `APP-${Math.floor(1000 + Math.random() * 9000)}`;
    }
    
    // Get existing applications
    const existingApplications = localStorage.getItem('studentApplications');
    let applications = existingApplications ? JSON.parse(existingApplications) : [];
    
    // Check if application with this ID already exists
    const existingIndex = applications.findIndex((app: any) => app.id === applicationData.id);
    
    if (existingIndex !== -1) {
      // Update existing application
      applications[existingIndex] = {
        ...applications[existingIndex],
        ...applicationData,
        updated_at: new Date().toISOString()
      };
    } else {
      // Add new application
      applications.push({
        ...applicationData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
    
    // Save to localStorage
    localStorage.setItem('studentApplications', JSON.stringify(applications));
    
    return true;
  } catch (error) {
    console.error('Error saving application:', error);
    return false;
  }
};

export const getApplicationFromStorage = (id?: string) => {
  try {
    const existingApplications = localStorage.getItem('studentApplications');
    if (!existingApplications) return null;
    
    const applications = JSON.parse(existingApplications);
    
    if (id) {
      return applications.find((app: any) => app.id === id) || null;
    }
    
    return applications;
  } catch (error) {
    console.error('Error getting application:', error);
    return null;
  }
};

export const deleteApplicationFromStorage = (id: string) => {
  try {
    const existingApplications = localStorage.getItem('studentApplications');
    if (!existingApplications) return false;
    
    const applications = JSON.parse(existingApplications);
    const updatedApplications = applications.filter((app: any) => app.id !== id);
    
    localStorage.setItem('studentApplications', JSON.stringify(updatedApplications));
    
    return true;
  } catch (error) {
    console.error('Error deleting application:', error);
    return false;
  }
};

export const getApplicationProgress = (formData: any) => {
  let progress = 0;
  
  // Personal Info (25%)
  if (formData.personalInfo) {
    const personalInfoFields = [
      'firstName', 'lastName', 'gender', 'email', 
      'phone', 'birthDate', 'nationality', 'passportNumber'
    ];
    
    const filledFields = personalInfoFields.filter(field => formData.personalInfo[field]);
    progress += (filledFields.length / personalInfoFields.length) * 25;
  }
  
  // Documents (25%)
  if (formData.documents && formData.documents.length > 0) {
    const requiredDocs = formData.documents.filter((doc: any) => doc.required).length || 1;
    const uploadedDocs = formData.documents.filter((doc: any) => doc.status === 'uploaded').length;
    progress += (uploadedDocs / requiredDocs) * 25;
  }
  
  // Academic Info (25%)
  if (formData.academicInfo) {
    const academicInfoFields = [
      'education', 'graduationYear', 'gpa', 'school', 
      'englishProficiency'
    ];
    
    const filledFields = academicInfoFields.filter(field => formData.academicInfo[field]);
    progress += (filledFields.length / academicInfoFields.length) * 25;
  }
  
  // Program Selection (25%)
  if (formData.program && formData.university) {
    progress += 25;
  }
  
  return Math.min(Math.round(progress), 100);
};

export const validateApplicationStep = (
  step: number, 
  formData: any, 
  t: TFunction
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  switch (step) {
    case 1:
      // Personal Info
      if (!formData.personalInfo?.firstName) {
        errors.push(t('validation.firstName', 'الاسم الأول مطلوب'));
      }
      
      if (!formData.personalInfo?.lastName) {
        errors.push(t('validation.lastName', 'الاسم الأخير مطلوب'));
      }
      
      if (!formData.personalInfo?.email) {
        errors.push(t('validation.email', 'البريد الإلكتروني مطلوب'));
      } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
        errors.push(t('validation.validEmail', 'يرجى إدخال بريد إلكتروني صالح'));
      }
      
      if (!formData.personalInfo?.phone) {
        errors.push(t('validation.phone', 'رقم الهاتف مطلوب'));
      }
      
      if (!formData.personalInfo?.nationality) {
        errors.push(t('validation.nationality', 'الجنسية مطلوبة'));
      }
      break;
      
    case 2:
      // Documents - just check if any required documents are missing
      if (formData.documents) {
        const requiredDocs = formData.documents.filter((doc: any) => doc.required);
        const missingDocs = requiredDocs.filter((doc: any) => doc.status !== 'uploaded');
        
        if (missingDocs.length > 0) {
          errors.push(
            t(
              'validation.requiredDocuments', 
              'المستندات التالية مطلوبة: {{docNames}}', 
              { docNames: missingDocs.map((doc: any) => doc.name).join(', ') }
            )
          );
        }
      }
      break;
      
    case 3:
      // Academic Info
      if (!formData.academicInfo?.education) {
        errors.push(t('validation.education', 'المستوى التعليمي مطلوب'));
      }
      
      if (!formData.academicInfo?.graduationYear) {
        errors.push(t('validation.graduationYear', 'سنة التخرج مطلوبة'));
      }
      
      if (!formData.academicInfo?.gpa) {
        errors.push(t('validation.gpa', 'المعدل التراكمي مطلوب'));
      }
      break;
      
    case 4:
      // Program Selection
      if (!formData.program?.name) {
        errors.push(t('validation.program', 'يرجى اختيار البرنامج'));
      }
      
      if (!formData.university) {
        errors.push(t('validation.university', 'يرجى اختيار الجامعة'));
      }
      break;
      
    default:
      break;
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Function to generate a realistic application status
export const getRandomApplicationStatus = () => {
  const statuses = ['draft', 'submitted', 'pending', 'documents', 'review', 'conditional', 'approved', 'rejected'];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

// Generate mock timeline events for an application
export const generateMockTimeline = (applicationId: string, status: string) => {
  const now = new Date();
  const dayInMillis = 24 * 60 * 60 * 1000;
  const timeline = [];
  
  // Add submission event
  timeline.push({
    id: uuidv4(), // This is now a string from uuid
    application_id: applicationId,
    status: 'submitted',
    created_at: new Date(now.getTime() - 14 * dayInMillis).toISOString(),
    note: 'تم استلام طلبك وسيتم مراجعته قريبًا'
  });
  
  // Add document verification event if status is beyond submitted
  if (['pending', 'documents', 'review', 'conditional', 'approved', 'rejected'].includes(status)) {
    timeline.push({
      id: uuidv4(),
      application_id: applicationId,
      status: 'documents',
      created_at: new Date(now.getTime() - 10 * dayInMillis).toISOString(),
      note: 'تم التحقق من المستندات المقدمة'
    });
  }
  
  // Add review event if status is beyond documents
  if (['review', 'conditional', 'approved', 'rejected'].includes(status)) {
    timeline.push({
      id: uuidv4(),
      application_id: applicationId,
      status: 'review',
      created_at: new Date(now.getTime() - 7 * dayInMillis).toISOString(),
      note: 'الطلب قيد المراجعة من قبل لجنة القبول'
    });
  }
  
  // Add conditional event if status is conditional
  if (['conditional', 'approved'].includes(status)) {
    timeline.push({
      id: uuidv4(),
      application_id: applicationId,
      status: 'conditional',
      created_at: new Date(now.getTime() - 3 * dayInMillis).toISOString(),
      note: 'تم منحك قبول مشروط. يرجى استكمال المتطلبات المذكورة في الرسالة المرفقة'
    });
  }
  
  // Add approval event if status is approved
  if (status === 'approved') {
    timeline.push({
      id: uuidv4(),
      application_id: applicationId,
      status: 'approved',
      created_at: new Date(now.getTime() - 1 * dayInMillis).toISOString(),
      note: 'تهانينا! تم قبول طلبك. سيتم إرسال خطاب القبول الرسمي قريبًا'
    });
  }
  
  // Add rejection event if status is rejected
  if (status === 'rejected') {
    timeline.push({
      id: uuidv4(),
      application_id: applicationId,
      status: 'rejected',
      created_at: new Date(now.getTime() - 1 * dayInMillis).toISOString(),
      note: 'نأسف لإبلاغك بأنه تم رفض طلبك. يمكنك التواصل مع فريق القبول للحصول على مزيد من المعلومات'
    });
  }
  
  return timeline;
};
