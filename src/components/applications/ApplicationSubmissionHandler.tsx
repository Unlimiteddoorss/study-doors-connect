
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Loader2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApplicationSubmissionHandlerProps {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  applicationId?: string;
  handleSubmit: () => void;
  resetForm: () => void;
}

const ApplicationSubmissionHandler = ({
  isSubmitting,
  isSuccess,
  error,
  applicationId,
  handleSubmit,
  resetForm,
}: ApplicationSubmissionHandlerProps) => {
  const { toast } = useToast();
  
  if (isSubmitting) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-unlimited-blue" />
            جاري تقديم الطلب...
          </CardTitle>
          <CardDescription>
            يرجى الانتظار حتى يتم معالجة طلبك.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-6">
          <div className="animate-pulse bg-unlimited-light-blue h-2 w-full rounded-full mb-4" />
          <p className="text-unlimited-gray text-sm">نقدر صبرك، نعمل على معالجة طلبك الآن.</p>
        </CardContent>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-unlimited-success">
            <Check className="h-5 w-5" />
            تم تقديم الطلب بنجاح
          </CardTitle>
          <CardDescription>
            تم استلام طلبك وسيتم مراجعته قريبًا.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-6">
          <div className="bg-unlimited-success/10 text-unlimited-success font-medium rounded-lg p-3 mb-4 w-full text-center">
            رقم الطلب: {applicationId}
          </div>
          <p className="text-unlimited-gray text-sm mb-4">
            يمكنك متابعة حالة طلبك من خلال صفحة "طلباتي" في لوحة التحكم.
          </p>
          <Button onClick={resetForm}>تقديم طلب جديد</Button>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-unlimited-danger">
            <AlertTriangle className="h-5 w-5" />
            حدث خطأ أثناء تقديم الطلب
          </CardTitle>
          <CardDescription>
            لم نتمكن من إكمال طلبك بسبب حدوث خطأ.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-6">
          <div className="bg-unlimited-danger/10 text-unlimited-danger font-medium rounded-lg p-3 mb-4 w-full">
            {error}
          </div>
          <p className="text-unlimited-gray text-sm mb-4">
            يرجى المحاولة مرة أخرى أو الاتصال بنا للحصول على المساعدة.
          </p>
          <div className="flex gap-2">
            <Button onClick={handleSubmit}>إعادة المحاولة</Button>
            <Button variant="outline" onClick={resetForm}>إعادة تعيين النموذج</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default ApplicationSubmissionHandler;
