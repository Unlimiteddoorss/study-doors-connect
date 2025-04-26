
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, User, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.language === 'ar';
  
  // Get user role (this would come from authentication context in real app)
  const userRole = localStorage.getItem('userRole') || 'student';

  useEffect(() => {
    // Show toast to inform user about the authorization issue
    toast({
      title: t('errors.unauthorized.title'),
      description: t('errors.unauthorized.description'),
      variant: "destructive",
    });
  }, [toast, t]);

  // Get appropriate redirect based on user role
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
          
          <div className="mt-8 p-4 border border-yellow-200 bg-yellow-50 rounded-md text-left">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium">{t('errors.unauthorized.needHelp')}</p>
                <p className="mt-1">{t('errors.unauthorized.contactSupport')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UnauthorizedPage;
