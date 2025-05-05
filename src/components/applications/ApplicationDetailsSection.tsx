import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ApplicationDetailsSectionProps {
  application: any;
}

const ApplicationDetailsSection = ({ application }: ApplicationDetailsSectionProps) => {
  const { t } = useTranslation();
  
  // Fix for line 296, ensuring we're passing a string, not an object
  const getFormattedValue = (value: any) => {
    if (value === undefined || value === null) {
      return t('application.details.notProvided', 'غير محدد');
    }
    
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    return String(value);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-semibold text-unlimited-dark-blue mb-4">
              {t("application.details.personalInfo", "معلومات شخصية")}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.firstName", "الاسم الأول")}:</span>
                <span>{getFormattedValue(application.formData?.personalInfo?.firstName)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.lastName", "اسم العائلة")}:</span>
                <span>{getFormattedValue(application.formData?.personalInfo?.lastName)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.gender", "الجنس")}:</span>
                <span>{getFormattedValue(application.formData?.personalInfo?.gender)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.email", "البريد الإلكتروني")}:</span>
                <span>{getFormattedValue(application.formData?.personalInfo?.email)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.phone", "رقم الهاتف")}:</span>
                <span>{getFormattedValue(application.formData?.personalInfo?.phone)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.birthDate", "تاريخ الميلاد")}:</span>
                <span>{getFormattedValue(application.formData?.personalInfo?.birthDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.nationality", "الجنسية")}:</span>
                <span>{getFormattedValue(application.formData?.personalInfo?.nationality)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.passportNumber", "رقم الجواز")}:</span>
                <span>{getFormattedValue(application.formData?.personalInfo?.passportNumber)}</span>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h2 className="text-lg font-semibold text-unlimited-dark-blue mb-4">
              {t("application.details.academicInfo", "معلومات أكاديمية")}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.education", "المستوى التعليمي")}:</span>
                <span>{getFormattedValue(application.formData?.academicInfo?.education)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.graduationYear", "سنة التخرج")}:</span>
                <span>{getFormattedValue(application.formData?.academicInfo?.graduationYear)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.gpa", "المعدل التراكمي")}:</span>
                <span>{getFormattedValue(application.formData?.academicInfo?.gpa)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.school", "المدرسة/الجامعة")}:</span>
                <span>{getFormattedValue(application.formData?.academicInfo?.school)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-32">{t("application.details.englishProficiency", "إتقان اللغة الإنجليزية")}:</span>
                <span>{getFormattedValue(application.formData?.academicInfo?.englishProficiency)}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Program and University Selection */}
        <div>
          <h2 className="text-lg font-semibold text-unlimited-dark-blue mb-4">
            {t("application.details.programSelection", "اختيار البرنامج والجامعة")}
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-medium w-32">{t("application.details.program", "البرنامج")}:</span>
              <span>{getFormattedValue(application.formData?.program?.name)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium w-32">{t("application.details.university", "الجامعة")}:</span>
              <span>{getFormattedValue(application.formData?.university)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationDetailsSection;
