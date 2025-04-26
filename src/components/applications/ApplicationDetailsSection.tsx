
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ApplicationDetailsSectionProps {
  application: any;
}

const ApplicationDetailsSection = ({ application }: ApplicationDetailsSectionProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const detailRows = [
    {
      label: t('application.details.fields.applicationId', 'معرف الطلب الداخلي'),
      value: application.applicationId,
    },
    {
      label: t('application.details.fields.onlineApplicationId', 'معرف الطلب عبر الإنترنت'),
      value: application.onlineApplicationId,
    },
    {
      label: t('application.details.fields.applicationDate', 'تاريخ الطلب'),
      value: application.applicationDate,
    },
    {
      label: t('application.details.fields.name', 'الاسم'),
      value: application.studentName,
    },
    {
      label: t('application.details.fields.email', 'البريد الإلكتروني'),
      value: application.studentEmail,
    },
    {
      label: t('application.details.fields.phone', 'رقم الهاتف'),
      value: application.studentPhone,
    },
    {
      label: t('application.details.fields.nationality', 'الجنسية'),
      value: application.studentNationality,
    },
    {
      label: t('application.details.fields.passportId', 'رقم جواز السفر'),
      value: application.passportId,
    },
    {
      label: t('application.details.fields.fathersName', 'اسم الأب'),
      value: application.fathersName,
    },
    {
      label: t('application.details.fields.mothersName', 'اسم الأم'),
      value: application.mothersName,
    },
    {
      label: t('application.details.fields.university', 'الجامعة'),
      value: application.university,
    },
    {
      label: t('application.details.fields.program', 'البرنامج'),
      value: application.program,
    },
    {
      label: t('application.details.fields.academicYear', 'العام الدراسي'),
      value: application.academicYear,
    },
    {
      label: t('application.details.fields.semester', 'الفصل الدراسي'),
      value: application.semester,
    },
    {
      label: t('application.details.fields.creator', 'المنشئ'),
      value: application.creator,
    },
    {
      label: t('application.details.fields.assignee', 'المسؤول'),
      value: application.assignee,
    },
    {
      label: t('application.details.fields.cl1', 'مسؤول الاتصال الأول'),
      value: application.cl1,
    },
    {
      label: t('application.details.fields.cl2', 'مسؤول الاتصال الثاني'),
      value: application.cl2,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('application.details.information', 'معلومات الطلب')}</CardTitle>
        <CardDescription>
          {t('application.details.informationSubtitle', 'جميع التفاصيل المتعلقة بطلبك')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-medium text-unlimited-dark-blue">
              {t('application.details.personalInfo', 'المعلومات الشخصية')}
            </h3>
            <div className="space-y-4">
              {detailRows.slice(0, 10).map((row, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <span className="text-unlimited-gray">{row.label}</span>
                    <span className="font-medium">{row.value}</span>
                  </div>
                  {index < 9 && <Separator className="mt-2" />}
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-unlimited-dark-blue">
              {t('application.details.academicInfo', 'المعلومات الأكاديمية والإدارية')}
            </h3>
            <div className="space-y-4">
              {detailRows.slice(10).map((row, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <span className="text-unlimited-gray">{row.label}</span>
                    <span className="font-medium">{row.value}</span>
                  </div>
                  {index < 7 && <Separator className="mt-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationDetailsSection;
