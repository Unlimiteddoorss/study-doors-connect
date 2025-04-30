
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, HelpCircle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StudentApplicationFormSubmitProps {
  onSubmit: () => void;
  onCancel: () => void;
  applicationData: {
    personalInfo: {
      fullName: string;
      nationality: string;
      residence?: string;
    };
    educationInfo: {
      level: string;
      university?: string;
    };
    programInfo: {
      university: string;
      program: string;
      degreeLevel: string;
      academicYear: string;
    };
  };
}

const StudentApplicationFormSubmit = ({
  onSubmit,
  onCancel,
  applicationData,
}: StudentApplicationFormSubmitProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-unlimited-blue" />
            مراجعة وتأكيد الطلب
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5 text-unlimited-gray" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <p>يرجى مراجعة جميع المعلومات بعناية قبل إرسال الطلب. بعد الإرسال، سيتم معالجة طلبك من قبل فريقنا وسيتم إعلامك في حال الحاجة لأي معلومات إضافية.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>راجع معلومات طلبك قبل التقديم النهائي</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-sm font-medium text-unlimited-dark-blue">المعلومات الشخصية</h3>
            <Button variant="ghost" size="sm" className="text-unlimited-blue h-auto py-0">تعديل</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="space-y-1">
              <p className="text-unlimited-gray">الاسم الكامل</p>
              <p className="font-medium">{applicationData.personalInfo.fullName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-unlimited-gray">الجنسية</p>
              <p className="font-medium">{applicationData.personalInfo.nationality}</p>
            </div>
            {applicationData.personalInfo.residence && (
              <div className="space-y-1">
                <p className="text-unlimited-gray">بلد الإقامة</p>
                <p className="font-medium">{applicationData.personalInfo.residence}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-sm font-medium text-unlimited-dark-blue">المؤهلات الأكاديمية</h3>
            <Button variant="ghost" size="sm" className="text-unlimited-blue h-auto py-0">تعديل</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="space-y-1">
              <p className="text-unlimited-gray">المؤهل العلمي</p>
              <p className="font-medium">{applicationData.educationInfo.level}</p>
            </div>
            {applicationData.educationInfo.university && (
              <div className="space-y-1">
                <p className="text-unlimited-gray">الجامعة/المدرسة</p>
                <p className="font-medium">{applicationData.educationInfo.university}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-sm font-medium text-unlimited-dark-blue">تفاصيل البرنامج المرغوب</h3>
            <Button variant="ghost" size="sm" className="text-unlimited-blue h-auto py-0">تعديل</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="space-y-1">
              <p className="text-unlimited-gray">الجامعة</p>
              <p className="font-medium">{applicationData.programInfo.university}</p>
            </div>
            <div className="space-y-1">
              <p className="text-unlimited-gray">التخصص</p>
              <p className="font-medium">{applicationData.programInfo.program}</p>
            </div>
            <div className="space-y-1">
              <p className="text-unlimited-gray">الدرجة العلمية</p>
              <p className="font-medium">{applicationData.programInfo.degreeLevel}</p>
            </div>
            <div className="space-y-1">
              <p className="text-unlimited-gray">العام الدراسي</p>
              <p className="font-medium">{applicationData.programInfo.academicYear}</p>
            </div>
          </div>
        </div>

        <div className="bg-unlimited-blue/5 border border-unlimited-blue/20 rounded-lg p-4 text-sm flex gap-3">
          <Check className="text-unlimited-success h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-unlimited-dark-blue mb-1">المستندات المطلوبة</p>
            <p className="text-unlimited-gray">
              سيتم إعلامك بالمستندات المطلوبة بعد تقديم الطلب. يرجى التأكد من تحميل جميع المستندات المطلوبة في أقرب وقت ممكن لضمان معالجة طلبك بسرعة.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          تعديل البيانات
        </Button>
        <Button onClick={onSubmit}>
          تقديم الطلب
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentApplicationFormSubmit;
