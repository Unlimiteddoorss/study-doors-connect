
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle, FileText, Edit, CreditCard } from 'lucide-react';

interface ApplicationReviewProps {
  formData: any;
}

const ApplicationReview = ({ formData }: ApplicationReviewProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t('application.review.title')}</h3>
        <p className="text-unlimited-gray">{t('application.review.description')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">{t('application.review.personalInfo')}</h4>
              <Badge variant={getCompletionStatus("personal") ? "default" : "destructive"}>
                {getCompletionStatus("personal") ? t('application.review.complete') : t('application.review.incomplete')}
              </Badge>
            </div>
            
            {getCompletionStatus("personal") ? (
              <div className="space-y-1">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-unlimited-gray text-sm">{t('application.personal.firstName')}:</div>
                  <div className="text-sm">{formData.personalInfo?.firstName}</div>
                  
                  <div className="text-unlimited-gray text-sm">{t('application.personal.lastName')}:</div>
                  <div className="text-sm">{formData.personalInfo?.lastName}</div>
                  
                  <div className="text-unlimited-gray text-sm">{t('application.personal.gender')}:</div>
                  <div className="text-sm">{formData.personalInfo?.gender || '-'}</div>
                  
                  <div className="text-unlimited-gray text-sm">{t('application.personal.email')}:</div>
                  <div className="text-sm">{formData.personalInfo?.email || '-'}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">{t('application.review.personalInfoMissing')}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">{t('application.review.documents')}</h4>
              <Badge variant={getCompletionStatus("documents") ? "default" : "destructive"}>
                {getCompletionStatus("documents") ? t('application.review.complete') : t('application.review.incomplete')}
              </Badge>
            </div>
            
            {getCompletionStatus("documents") ? (
              <div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-unlimited-gray text-sm">{t('application.review.uploadedDocuments')}:</div>
                  <div className="text-sm">
                    {formData.documents?.filter((doc: any) => doc.status === 'uploaded').length || 0}/{formData.documents?.length || 0}
                  </div>
                </div>
                
                {formData.documents?.map((doc: any, index: number) => (
                  <div key={index} className="mt-1 flex items-start gap-2">
                    <FileText className="h-3 w-3 mt-1 text-unlimited-gray" />
                    <div className="flex-1">
                      <span className="text-xs">{doc.name}</span>
                      <Badge 
                        className="ml-2"
                        variant={doc.status === 'required' ? 'destructive' : 'default'}
                      >
                        {doc.status === 'uploaded' ? t('application.documents.uploaded') : t('application.documents.missing')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">{t('application.review.documentsMissing')}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">{t('application.review.academicInfo')}</h4>
              <Badge variant={getCompletionStatus("academic") ? "default" : "destructive"}>
                {getCompletionStatus("academic") ? t('application.review.complete') : t('application.review.incomplete')}
              </Badge>
            </div>
            
            {getCompletionStatus("academic") ? (
              <div className="space-y-1">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-unlimited-gray text-sm">{t('application.academic.lastEducation')}:</div>
                  <div className="text-sm">{formData.academicInfo?.education}</div>
                  
                  <div className="text-unlimited-gray text-sm">{t('application.academic.graduationYear')}:</div>
                  <div className="text-sm">{formData.academicInfo?.graduationYear || '-'}</div>
                  
                  <div className="text-unlimited-gray text-sm">{t('application.academic.gpa')}:</div>
                  <div className="text-sm">{formData.academicInfo?.gpa || '-'}</div>
                  
                  <div className="text-unlimited-gray text-sm">{t('application.academic.englishLevel')}:</div>
                  <div className="text-sm">{formData.academicInfo?.englishProficiency || '-'}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">{t('application.review.academicInfoMissing')}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">{t('application.review.programSelection')}</h4>
              <Badge variant={getCompletionStatus("program") ? "default" : "destructive"}>
                {getCompletionStatus("program") ? t('application.review.complete') : t('application.review.incomplete')}
              </Badge>
            </div>
            
            {getCompletionStatus("program") ? (
              <div className="space-y-1">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-unlimited-gray text-sm">{t('application.program.name')}:</div>
                  <div className="text-sm">{formData.program?.name}</div>
                  
                  <div className="text-unlimited-gray text-sm">{t('application.program.university')}:</div>
                  <div className="text-sm">{formData.university}</div>
                  
                  {formData.program?.feesPerYear && (
                    <>
                      <div className="text-unlimited-gray text-sm">{t('application.program.annualFees')}:</div>
                      <div className="text-sm font-medium">${formData.program.feesPerYear}</div>
                    </>
                  )}
                  
                  {formData.program?.duration && (
                    <>
                      <div className="text-unlimited-gray text-sm">{t('application.program.duration')}:</div>
                      <div className="text-sm">{formData.program.duration}</div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">{t('application.review.programMissing')}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 p-4 border border-yellow-200 bg-yellow-50 rounded-md">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">{t('application.review.beforeSubmitting')}</h4>
            <p className="text-sm text-yellow-700 mt-1">{t('application.review.checkAllInformation')}</p>
            <ul className="list-disc list-inside text-sm text-yellow-700 mt-2">
              <li>{t('application.review.bulletComplete')}</li>
              <li>{t('application.review.bulletDocuments')}</li>
              <li>{t('application.review.bulletApplication')}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6 mt-6">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="font-medium">{t('application.review.readyToSubmit')}</h4>
            <p className="text-sm text-unlimited-gray">{t('application.review.willBeProcessed')}</p>
          </div>
          
          <Button
            className="bg-unlimited-blue hover:bg-unlimited-dark-blue w-full sm:w-auto"
            disabled={!getCompletionStatus("personal") || !getCompletionStatus("academic") || !getCompletionStatus("program")}
          >
            <Check className="mr-2 h-4 w-4" />
            {t('application.buttons.submit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationReview;
