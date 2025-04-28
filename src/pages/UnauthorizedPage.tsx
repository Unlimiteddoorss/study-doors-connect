
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, User, ShieldAlert, Key, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [userRole, setUserRole] = useState<'student' | 'admin' | 'agent'>('student');
  
  useEffect(() => {
    // Get the user role from localStorage
    const storedRole = localStorage.getItem('userRole');
    if (storedRole && (storedRole === 'admin' || storedRole === 'agent' || storedRole === 'student')) {
      setUserRole(storedRole as 'student' | 'admin' | 'agent');
    }
  }, []);

  // رصد مكان المناسب للتوجيه حسب دور المستخدم
  const getAppropriateRedirect = () => {
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'agent':
        return '/agent';
      case 'student':
      default:
        return '/dashboard';
    }
  };

  const handleGrantAccess = () => {
    // For demonstration purposes, we'll set the user role to admin
    // In a real app, this would be handled by authentication
    localStorage.setItem('userRole', 'admin');
    
    toast({
      title: "تم منح الصلاحيات",
      description: "تم منحك صلاحيات المدير، يمكنك الآن الوصول إلى لوحة التحكم",
      variant: "default",
    });
    
    // Navigate to admin dashboard
    setTimeout(() => {
      navigate('/admin');
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[600px] px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-unlimited-dark-blue mb-4">
            {t('errors.unauthorized.title')}
          </h1>
          
          <p className="text-unlimited-gray mb-6">
            {t('errors.unauthorized.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              {isRtl ? <ArrowLeft className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              {t('errors.unauthorized.backHome')}
            </Button>
            
            <Button 
              onClick={() => navigate(getAppropriateRedirect())}
              className="flex items-center gap-2 bg-unlimited-blue hover:bg-unlimited-dark-blue"
            >
              <User className="h-4 w-4" />
              {t('errors.unauthorized.dashboard')}
            </Button>
          </div>
          
          <div className="mt-6 p-4 border border-yellow-200 bg-yellow-50 rounded-md text-left">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium">{t('errors.unauthorized.needHelp')}</p>
                <p className="mt-1">{t('errors.unauthorized.contactSupport')}</p>
              </div>
            </div>
          </div>

          {/* إضافة زر خاص لمنح الصلاحيات (لأغراض العرض فقط) */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="mb-4 text-unlimited-dark-blue font-medium">خيارات إضافية</h3>
            <div className="flex flex-col gap-3">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleGrantAccess}>
                <Key className="h-4 w-4" />
                منح صلاحيات المدير (عرض تجريبي)
              </Button>
              
              <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate('/contact')}>
                <HelpCircle className="h-4 w-4" />
                التواصل مع المسؤول
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UnauthorizedPage;
