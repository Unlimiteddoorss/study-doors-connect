
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle, FileText, Edit, CreditCard, Calendar, BookOpen, Briefcase, Globe, Smartphone, Mail } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { getApplicationProgress } from "@/utils/applicationUtils";

interface ApplicationReviewProps {
  formData: any;
  onEdit?: (section: string) => void;
}

const ApplicationReview = ({ formData, onEdit }: ApplicationReviewProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const applicationProgress = getApplicationProgress(formData);
  
  const getCompletionStatus = (section: string) => {
    switch (section) {
      case "personal":
        return formData.personalInfo?.firstName && formData.personalInfo?.lastName;
      case "documents":
        return formData.documents && formData.documents.some((doc: any) => doc.status === 'uploaded');
      case "academic":
        return formData.academicInfo?.education;
      case "program":
        return formData.program?.name && formData.university;
      default:
        return false;
    }
  };
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleEdit = (section: string) => {
    if (onEdit) {
      onEdit(section);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t('application.review.title', 'مراجعة الطلب')}</h3>
        <p className="text-unlimited-gray">{t('application.review.description', 'يرجى مراجعة جميع المعلومات قبل تقديم الطلب')}</p>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-sm">
          <span>{t('application.review.completion', 'اكتمال الطلب')}</span>
          <span className="font-medium">{applicationProgress}%</span>
        </div>
        <Progress 
          value={applicationProgress} 
          className={`h-2 ${
            applicationProgress >= 90 ? 'bg-green-500' : 
            applicationProgress >= 70 ? 'bg-unlimited-blue' : 
            applicationProgress >= 40 ? 'bg-yellow-500' : 'bg-red-400'
          }`} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className={`${expandedSection === 'personal' ? 'ring-2 ring-unlimited-blue' : ''} transition-all duration-200 hover:shadow-md`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2" onClick={() => toggleSection('personal')} style={{ cursor: 'pointer' }}>
                <Mail className="h-5 w-5 text-unlimited-gray" />
                <h4 className="font-medium">{t('application.review.personalInfo', 'المعلومات الشخصية')}</h4>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getCompletionStatus("personal") ? "default" : "destructive"}>
                  {getCompletionStatus("personal") ? t('application.review.complete', 'مكتمل') : t('application.review.incomplete', 'غير مكتمل')}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleEdit('personal')}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {getCompletionStatus("personal") ? (
              <div className={`space-y-1 ${expandedSection === 'personal' ? '' : 'max-h-24 overflow-hidden'}`}>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-unlimited-gray text-sm">{t('application.personal.firstName', 'الاسم الأول')}:</div>
                  <div className="text-sm font-medium">{formData.personalInfo?.firstName || '-'}</div>
                  
                  <div className="text-unlimited-gray text-sm">{t('application.personal.lastName', 'الاسم الأخير')}:</div>
                  <div className="text-sm font-medium">{formData.personalInfo?.lastName || '-'}</div>
                  
                  {expandedSection === 'personal' && (
                    <>
                      <div className="text-unlimited-gray text-sm">{t('application.personal.gender', 'الجنس')}:</div>
                      <div className="text-sm">{formData.personalInfo?.gender || '-'}</div>
                      
                      <div className="text-unlimited-gray text-sm">{t('application.personal.email', 'البريد الإلكتروني')}:</div>
                      <div className="text-sm">{formData.personalInfo?.email || '-'}</div>
                      
                      <div className="text-unlimited-gray text-sm">{t('application.personal.phone', 'رقم الهاتف')}:</div>
                      <div className="text-sm">{formData.personalInfo?.phone || '-'}</div>
                      
                      <div className="text-unlimited-gray text-sm">{t('application.personal.birthDate', 'تاريخ الميلاد')}:</div>
                      <div className="text-sm">{formData.personalInfo?.birthDate || '-'}</div>
                      
                      <div className="text-unlimited-gray text-sm">{t('application.personal.nationality', 'الجنسية')}:</div>
                      <div className="text-sm">{formData.personalInfo?.nationality || '-'}</div>
                      
                      <div className="text-unlimited-gray text-sm">{t('application.personal.passportNumber', 'رقم جواز السفر')}:</div>
                      <div className="text-sm">{formData.personalInfo?.passportNumber || '-'}</div>
                    </>
                  )}
                </div>
                
                {expandedSection !== 'personal' && getCompletionStatus("personal") && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 text-unlimited-blue p-0 h-auto hover:bg-transparent hover:underline"
                    onClick={() => toggleSection('personal')}
                  >
                    {expandedSection === 'personal' ? 
                      t('application.review.showLess', 'عرض أقل') : 
                      t('application.review.showMore', 'عرض المزيد')}
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">{t('application.review.personalInfoMissing', 'المعلومات الشخصية غير مكتملة')}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Documents */}
        <Card className={`${expandedSection === 'documents' ? 'ring-2 ring-unlimited-blue' : ''} transition-all duration-200 hover:shadow-md`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2" onClick={() => toggleSection('documents')} style={{ cursor: 'pointer' }}>
                <FileText className="h-5 w-5 text-unlimited-gray" />
                <h4 className="font-medium">{t('application.review.documents', 'المستندات')}</h4>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getCompletionStatus("documents") ? "default" : "destructive"}>
                  {getCompletionStatus("documents") ? t('application.review.complete', 'مكتمل') : t('application.review.incomplete', 'غير مكتمل')}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleEdit('documents')}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {getCompletionStatus("documents") ? (
              <div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                  <div className="text-unlimited-gray text-sm">{t('application.review.uploadedDocuments', 'المستندات المحمّلة')}:</div>
                  <div className="text-sm font-medium">
                    {formData.documents?.filter((doc: any) => doc.status === 'uploaded').length || 0}/{formData.documents?.length || 0}
                  </div>
                </div>
                
                <div className={`space-y-2 ${expandedSection === 'documents' ? '' : 'max-h-20 overflow-hidden'}`}>
                  {formData.documents?.map((doc: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 py-1 px-2 rounded bg-gray-50 border">
                      <FileText className="h-3.5 w-3.5 text-unlimited-gray" />
                      <div className="flex-1 text-sm">{doc.name}</div>
                      <Badge 
                        className="text-xs"
                        variant={doc.status === 'uploaded' ? 'default' : 'destructive'}
                      >
                        {doc.status === 'uploaded' ? 
                          t('application.documents.uploaded', 'تم التحميل') : 
                          t('application.documents.missing', 'غير موجود')}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                {expandedSection !== 'documents' && formData.documents?.length > 2 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 text-unlimited-blue p-0 h-auto hover:bg-transparent hover:underline"
                    onClick={() => toggleSection('documents')}
                  >
                    {expandedSection === 'documents' ? 
                      t('application.review.showLess', 'عرض أقل') : 
                      t('application.review.showMore', 'عرض المزيد')}
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">{t('application.review.documentsMissing', 'المستندات المطلوبة غير مكتملة')}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Academic Information */}
        <Card className={`${expandedSection === 'academic' ? 'ring-2 ring-unlimited-blue' : ''} transition-all duration-200 hover:shadow-md`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2" onClick={() => toggleSection('academic')} style={{ cursor: 'pointer' }}>
                <BookOpen className="h-5 w-5 text-unlimited-gray" />
                <h4 className="font-medium">{t('application.review.academicInfo', 'المعلومات الأكاديمية')}</h4>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getCompletionStatus("academic") ? "default" : "destructive"}>
                  {getCompletionStatus("academic") ? t('application.review.complete', 'مكتمل') : t('application.review.incomplete', 'غير مكتمل')}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleEdit('academic')}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {getCompletionStatus("academic") ? (
              <div className={`space-y-1 ${expandedSection === 'academic' ? '' : 'max-h-24 overflow-hidden'}`}>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-unlimited-gray text-sm">{t('application.academic.lastEducation', 'آخر مرحلة دراسية')}:</div>
                  <div className="text-sm font-medium">{formData.academicInfo?.education}</div>
                  
                  <div className="text-unlimited-gray text-sm">{t('application.academic.graduationYear', 'سنة التخرج')}:</div>
                  <div className="text-sm">{formData.academicInfo?.graduationYear || '-'}</div>
                  
                  {expandedSection === 'academic' && (
                    <>
                      <div className="text-unlimited-gray text-sm">{t('application.academic.gpa', 'المعدل')}:</div>
                      <div className="text-sm">{formData.academicInfo?.gpa || '-'}</div>
                      
                      <div className="text-unlimited-gray text-sm">{t('application.academic.school', 'المدرسة/الجامعة')}:</div>
                      <div className="text-sm">{formData.academicInfo?.school || '-'}</div>
                      
                      <div className="text-unlimited-gray text-sm">{t('application.academic.englishLevel', 'مستوى اللغة الإنجليزية')}:</div>
                      <div className="text-sm">{formData.academicInfo?.englishProficiency || '-'}</div>
                      
                      <div className="text-unlimited-gray text-sm">{t('application.academic.otherLanguages', 'لغات أخرى')}:</div>
                      <div className="text-sm">{formData.academicInfo?.otherLanguages || '-'}</div>
                    </>
                  )}
                </div>
                
                {expandedSection !== 'academic' && getCompletionStatus("academic") && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 text-unlimited-blue p-0 h-auto hover:bg-transparent hover:underline"
                    onClick={() => toggleSection('academic')}
                  >
                    {expandedSection === 'academic' ? 
                      t('application.review.showLess', 'عرض أقل') : 
                      t('application.review.showMore', 'عرض المزيد')}
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">{t('application.review.academicInfoMissing', 'المعلومات الأكاديمية غير مكتملة')}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Program Selection */}
        <Card className={`${expandedSection === 'program' ? 'ring-2 ring-unlimited-blue' : ''} transition-all duration-200 hover:shadow-md`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2" onClick={() => toggleSection('program')} style={{ cursor: 'pointer' }}>
                <Briefcase className="h-5 w-5 text-unlimited-gray" />
                <h4 className="font-medium">{t('application.review.programSelection', 'اختيار البرنامج')}</h4>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getCompletionStatus("program") ? "default" : "destructive"}>
                  {getCompletionStatus("program") ? t('application.review.complete', 'مكتمل') : t('application.review.incomplete', 'غير مكتمل')}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleEdit('program')}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {getCompletionStatus("program") ? (
              <div className={`space-y-1 ${expandedSection === 'program' ? '' : 'max-h-24 overflow-hidden'}`}>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-unlimited-gray text-sm">{t('application.program.name', 'البرنامج')}:</div>
                  <div className="text-sm font-medium">{formData.program?.name}</div>
                  
                  <div className="text-unlimited-gray text-sm">{t('application.program.university', 'الجامعة')}:</div>
                  <div className="text-sm font-medium">{formData.university}</div>
                  
                  {expandedSection === 'program' && (
                    <>
                      {formData.program?.degree && (
                        <>
                          <div className="text-unlimited-gray text-sm">{t('application.program.degree', 'الدرجة العلمية')}:</div>
                          <div className="text-sm">{formData.program.degree}</div>
                        </>
                      )}
                      
                      {formData.program?.language && (
                        <>
                          <div className="text-unlimited-gray text-sm">{t('application.program.language', 'لغة الدراسة')}:</div>
                          <div className="text-sm">{formData.program.language}</div>
                        </>
                      )}
                      
                      {formData.program?.duration && (
                        <>
                          <div className="text-unlimited-gray text-sm">{t('application.program.duration', 'مدة الدراسة')}:</div>
                          <div className="text-sm">{formData.program.duration}</div>
                        </>
                      )}
                      
                      {formData.program?.feesPerYear && (
                        <>
                          <div className="text-unlimited-gray text-sm">{t('application.program.annualFees', 'الرسوم السنوية')}:</div>
                          <div className="text-sm font-medium">${formData.program.feesPerYear}</div>
                        </>
                      )}
                      
                      {formData.program?.startDate && (
                        <>
                          <div className="text-unlimited-gray text-sm">{t('application.program.startDate', 'تاريخ بدء الدراسة')}:</div>
                          <div className="text-sm">{formData.program.startDate}</div>
                        </>
                      )}
                      
                      {formData.program?.deadline && (
                        <>
                          <div className="text-unlimited-gray text-sm">{t('application.program.deadline', 'الموعد النهائي للتقديم')}:</div>
                          <div className="text-sm">{formData.program.deadline}</div>
                        </>
                      )}
                    </>
                  )}
                </div>
                
                {expandedSection !== 'program' && getCompletionStatus("program") && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 text-unlimited-blue p-0 h-auto hover:bg-transparent hover:underline"
                    onClick={() => toggleSection('program')}
                  >
                    {expandedSection === 'program' ? 
                      t('application.review.showLess', 'عرض أقل') : 
                      t('application.review.showMore', 'عرض المزيد')}
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">{t('application.review.programMissing', 'لم يتم اختيار البرنامج')}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 p-4 border border-yellow-200 bg-yellow-50 rounded-md">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">{t('application.review.beforeSubmitting', 'قبل التقديم')}</h4>
            <p className="text-sm text-yellow-700 mt-1">{t('application.review.checkAllInformation', 'يرجى التأكد من صحة جميع المعلومات التي قمت بإدخالها:')}</p>
            <ul className="list-disc list-inside text-sm text-yellow-700 mt-2">
              <li>{t('application.review.bulletComplete', 'تأكد من إكمال جميع الحقول المطلوبة')}</li>
              <li>{t('application.review.bulletDocuments', 'تأكد من تحميل جميع المستندات المطلوبة')}</li>
              <li>{t('application.review.bulletApplication', 'تأكد من أن البرنامج والجامعة المختارة صحيحة')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationReview;
