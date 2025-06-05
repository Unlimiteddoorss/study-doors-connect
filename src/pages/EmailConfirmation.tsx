
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const EmailConfirmation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (!token || !type) {
          setError('رابط التأكيد غير صالح');
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: type as any
        });

        if (error) {
          setError('فشل في تأكيد البريد الإلكتروني: ' + error.message);
        } else {
          setIsConfirmed(true);
          toast({
            title: "تم تأكيد البريد الإلكتروني",
            description: "يمكنك الآن تسجيل الدخول إلى حسابك"
          });
          
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        }
      } catch (err: any) {
        setError('حدث خطأ غير متوقع: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    confirmEmail();
  }, [searchParams, navigate, toast]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">تأكيد البريد الإلكتروني</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {isLoading && (
                <div className="space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                  <p>جاري تأكيد بريدك الإلكتروني...</p>
                </div>
              )}

              {!isLoading && isConfirmed && (
                <div className="space-y-4">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                  <p className="text-green-600">تم تأكيد بريدك الإلكتروني بنجاح!</p>
                  <p className="text-sm text-gray-600">سيتم توجيهك إلى لوحة التحكم خلال لحظات...</p>
                  <Button onClick={() => navigate('/dashboard')} className="w-full">
                    الانتقال إلى لوحة التحكم
                  </Button>
                </div>
              )}

              {!isLoading && error && (
                <div className="space-y-4">
                  <XCircle className="h-8 w-8 text-red-500 mx-auto" />
                  <p className="text-red-600">{error}</p>
                  <div className="space-y-2">
                    <Button onClick={() => navigate('/login')} className="w-full">
                      العودة إلى تسجيل الدخول
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/register')} className="w-full">
                      إنشاء حساب جديد
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmailConfirmation;
