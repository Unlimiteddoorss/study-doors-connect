
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/utils/dateUtils';
import { CalendarIcon, GraduationCap, Book, MapPin, User, Mail, Phone, Globe, FileText } from 'lucide-react';

interface ApplicationDetailsSectionProps {
  application: any;
}

const ApplicationDetailsSection = ({ application }: ApplicationDetailsSectionProps) => {
  const { t } = useTranslation();
  
  const getFieldValue = (fieldPath: string[], defaultValue = '-') => {
    try {
      let value = application;
      for (const field of fieldPath) {
        value = value?.[field];
        if (value === null || value === undefined) return defaultValue;
      }
      return value;
    } catch (e) {
      console.warn('Error getting field value:', e);
      return defaultValue;
    }
  };
  
  // Safely get nested data
  const personalInfo = application?.personal_info || application?.formData?.personalInfo || {};
  const academicInfo = application?.academic_info || application?.formData?.academicInfo || {};
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('application.details.applicationInfo', 'معلومات الطلب')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.program', 'البرنامج')}</div>
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{application?.program_name || application?.program || '-'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.university', 'الجامعة')}</div>
              <div className="flex items-center">
                <Book className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{application?.university_name || application?.university || '-'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.location', 'الموقع')}</div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{getFieldValue(['location'], 'تركيا')}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.dateApplied', 'تاريخ التقديم')}</div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{formatDate(application?.created_at || application?.date)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.applicationId', 'رقم الطلب')}</div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{application?.id || '-'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">الحالة</div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-unlimited-blue mr-2" />
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                  {application?.status || 'قيد المراجعة'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('application.details.personalInfo', 'المعلومات الشخصية')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.fullName', 'الاسم الكامل')}</div>
              <div className="flex items-center">
                <User className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>
                  {personalInfo?.fullName || 
                   (personalInfo?.firstName && personalInfo?.lastName 
                     ? `${personalInfo.firstName} ${personalInfo.lastName}`
                     : '-')}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.email', 'البريد الإلكتروني')}</div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{personalInfo?.email || '-'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.phone', 'رقم الهاتف')}</div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{personalInfo?.phone || '-'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.nationality', 'الجنسية')}</div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{personalInfo?.nationality || '-'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.gender', 'الجنس')}</div>
              <div className="flex items-center">
                <User className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{personalInfo?.gender || '-'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.birthDate', 'تاريخ الميلاد')}</div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{personalInfo?.dateOfBirth ? formatDate(personalInfo.dateOfBirth) : '-'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('application.details.academicInfo', 'المعلومات الأكاديمية')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.education', 'المستوى التعليمي')}</div>
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{academicInfo?.previousDegree || academicInfo?.education || '-'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.school', 'المدرسة/الجامعة السابقة')}</div>
              <div className="flex items-center">
                <Book className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{academicInfo?.university || academicInfo?.school || '-'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.graduationYear', 'سنة التخرج')}</div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{academicInfo?.graduationYear || '-'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.gpa', 'المعدل التراكمي')}</div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{academicInfo?.gpa || '-'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">مجال الدراسة</div>
              <div className="flex items-center">
                <Book className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{academicInfo?.fieldOfStudy || '-'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-unlimited-gray">{t('application.details.englishProficiency', 'إتقان اللغة الإنجليزية')}</div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-unlimited-blue mr-2" />
                <span>{academicInfo?.englishProficiency || '-'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationDetailsSection;
