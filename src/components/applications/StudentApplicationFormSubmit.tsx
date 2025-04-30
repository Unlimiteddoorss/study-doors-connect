
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface StudentApplicationFormSubmitProps {
  isSubmitting: boolean;
  isSuccess: boolean;
  error?: string | null;
  onReset: () => void;
  applicationId?: string;
}

const StudentApplicationFormSubmit = ({
  isSubmitting,
  isSuccess,
  error,
  onReset,
  applicationId
}: StudentApplicationFormSubmitProps) => {
  if (isSubmitting) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>جاري إرسال الطلب</CardTitle>
          <CardDescription>يرجى الانتظار حتى يتم معالجة طلبك</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <div className="h-16 w-16 relative">
            <div className="absolute inset-0 rounded-full border-4 border-unlimited-blue border-opacity-25"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-unlimited-blue animate-spin"></div>
          </div>
          <p className="mt-4 text-center">
            جاري معالجة طلبك، يرجى عدم إغلاق الصفحة أو تحديثها...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-green-600 flex items-center">
            <CheckCircle className="mr-2 h-6 w-6" />
            تم إرسال الطلب بنجاح
          </CardTitle>
          <CardDescription>
            لقد تم استلام طلبك وسيتم مراجعته قريبًا
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-unlimited-gray">
            رقم الطلب: <span className="font-bold">{applicationId || 'APP-' + Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
          </p>
          <p className="mt-2">
            يمكنك متابعة حالة طلبك من خلال لوحة التحكم الخاصة بك. سيتم إعلامك بأي تحديثات عبر البريد الإلكتروني.
          </p>
        </CardContent>
        <CardFooter>
          <div className="flex gap-4 w-full">
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/dashboard'}>
              الذهاب إلى لوحة التحكم
            </Button>
            <Button className="w-full" onClick={onReset}>
              تقديم طلب آخر
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center">
            <AlertCircle className="mr-2 h-6 w-6" />
            حدث خطأ
          </CardTitle>
          <CardDescription>
            نعتذر، لم نتمكن من إرسال طلبك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>خطأ</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
          <p className="mt-4">
            يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني إذا استمرت المشكلة.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={onReset}>
            العودة وإعادة المحاولة
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return null;
};

export default StudentApplicationFormSubmit;
