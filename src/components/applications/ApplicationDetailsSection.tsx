
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/utils/dateUtils';
import { 
  User, Mail, Phone, Calendar, Globe, CreditCard, 
  GraduationCap, School, BookOpen, Building, FileText 
} from 'lucide-react';

interface ApplicationDetailsSectionProps {
  application: any;
}

const ApplicationDetailsSection = ({ application }: ApplicationDetailsSectionProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const formData = application.formData || {};
  
  // Helper function to check if a section has data
  const hasData = (section: string) => {
    if (section === 'personal') {
      return formData.personalInfo && Object.keys(formData.personalInfo).length > 0;
    }
    if (section === 'academic') {
      return formData.academicInfo && Object.keys(formData.academicInfo).length > 0;
    }
    if (section === 'program') {
      return formData.program && Object.keys(formData.program).length > 0;
    }
    return false;
  };
  
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-unlimited-blue" />
            <h3 className="font-medium text-lg">{t("application.details.personalInfo", "المعلومات الشخصية")}</h3>
          </div>
          
          {hasData('personal') ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.personal.name", "الاسم")}</p>
                    <p className="font-medium">
                      {formData.personalInfo?.firstName} {formData.personalInfo?.lastName}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.personal.email", "البريد الإلكتروني")}</p>
                    <p className="font-medium">
                      {formData.personalInfo?.email || t("application.notProvided", "غير متوفر")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.personal.phone", "رقم الهاتف")}</p>
                    <p className="font-medium">
                      {formData.personalInfo?.phone || t("application.notProvided", "غير متوفر")}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.personal.birthDate", "تاريخ الميلاد")}</p>
                    <p className="font-medium">
                      {formData.personalInfo?.birthDate ? 
                        formatDate(formData.personalInfo.birthDate) : 
                        t("application.notProvided", "غير متوفر")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.personal.nationality", "الجنسية")}</p>
                    <p className="font-medium">
                      {formData.personalInfo?.nationality || t("application.notProvided", "غير متوفر")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CreditCard className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.personal.passportNumber", "رقم جواز السفر")}</p>
                    <p className="font-medium">
                      {formData.personalInfo?.passportNumber || t("application.notProvided", "غير متوفر")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-unlimited-gray">
              {t("application.details.noPersonalInfo", "لا توجد معلومات شخصية متاحة")}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Academic Information */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-unlimited-blue" />
            <h3 className="font-medium text-lg">{t("application.details.academicInfo", "المعلومات الأكاديمية")}</h3>
          </div>
          
          {hasData('academic') ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.academic.education", "المستوى التعليمي")}</p>
                    <p className="font-medium">
                      {formData.academicInfo?.education || t("application.notProvided", "غير متوفر")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <School className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.academic.school", "المدرسة/الجامعة")}</p>
                    <p className="font-medium">
                      {formData.academicInfo?.school || t("application.notProvided", "غير متوفر")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.academic.graduationYear", "سنة التخرج")}</p>
                    <p className="font-medium">
                      {formData.academicInfo?.graduationYear || t("application.notProvided", "غير متوفر")}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.academic.gpa", "المعدل التراكمي")}</p>
                    <p className="font-medium">
                      {formData.academicInfo?.gpa || t("application.notProvided", "غير متوفر")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.academic.englishLevel", "مستوى اللغة الإنجليزية")}</p>
                    <p className="font-medium">
                      {formData.academicInfo?.englishProficiency || t("application.notProvided", "غير متوفر")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.academic.otherLanguages", "لغات أخرى")}</p>
                    <p className="font-medium">
                      {formData.academicInfo?.otherLanguages || t("application.notProvided", "غير متوفر")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-unlimited-gray">
              {t("application.details.noAcademicInfo", "لا توجد معلومات أكاديمية متاحة")}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Program Information */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-5 w-5 text-unlimited-blue" />
            <h3 className="font-medium text-lg">{t("application.details.programInfo", "معلومات البرنامج")}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-unlimited-gray mt-0.5" />
                <div>
                  <p className="text-sm text-unlimited-gray">{t("application.program.name", "البرنامج")}</p>
                  <p className="font-medium">
                    {formData.program?.name || application.program || t("application.notProvided", "غير متوفر")}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Building className="h-4 w-4 text-unlimited-gray mt-0.5" />
                <div>
                  <p className="text-sm text-unlimited-gray">{t("application.program.university", "الجامعة")}</p>
                  <p className="font-medium">
                    {formData.university || application.university || t("application.notProvided", "غير متوفر")}
                  </p>
                </div>
              </div>
              
              {formData.program?.degree && (
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.program.degree", "الدرجة العلمية")}</p>
                    <p className="font-medium">{formData.program.degree}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              {formData.program?.duration && (
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.program.duration", "مدة الدراسة")}</p>
                    <p className="font-medium">{formData.program.duration}</p>
                  </div>
                </div>
              )}
              
              {formData.program?.language && (
                <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.program.language", "لغة الدراسة")}</p>
                    <p className="font-medium">{formData.program.language}</p>
                  </div>
                </div>
              )}
              
              {formData.program?.feesPerYear && (
                <div className="flex items-start gap-2">
                  <CreditCard className="h-4 w-4 text-unlimited-gray mt-0.5" />
                  <div>
                    <p className="text-sm text-unlimited-gray">{t("application.program.annualFees", "الرسوم السنوية")}</p>
                    <p className="font-medium">${formData.program.feesPerYear}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Application Information */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-unlimited-blue" />
              <h3 className="font-medium text-lg">{t("application.details.applicationInfo", "معلومات الطلب")}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded-md border">
                <p className="text-sm text-unlimited-gray">{t("application.details.applicationId", "رقم الطلب")}</p>
                <p className="font-medium">{application.id}</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-md border">
                <p className="text-sm text-unlimited-gray">{t("application.details.applicationDate", "تاريخ التقديم")}</p>
                <p className="font-medium">{formatDate(application.date)}</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-md border">
                <p className="text-sm text-unlimited-gray">{t("application.details.applicationStatus", "حالة الطلب")}</p>
                <p className="font-medium">{t(`application.status.${application.status}`, application.status)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationDetailsSection;
