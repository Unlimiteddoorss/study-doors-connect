
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-6 max-w-md">
        <div className="mb-6">
          <div className="w-24 h-24 bg-unlimited-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-unlimited-blue">404</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{t('errors.notFound.title') || 'Page Not Found'}</h1>
          <p className="text-unlimited-gray mb-6">{t('errors.notFound.description') || 'Sorry, we couldn\'t find the page you were looking for.'}</p>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 text-left">
            <h2 className="text-sm font-medium mb-2">{t('errors.notFound.requested') || 'Requested URL'}:</h2>
            <div className="bg-gray-50 p-2 rounded border border-gray-200 font-mono text-sm overflow-x-auto">
              {location.pathname}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="flex items-center gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                {t('errors.notFound.returnHome') || 'Return to Home'}
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="flex items-center gap-2">
              <Link to="#" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4" />
                {t('errors.notFound.goBack') || 'Go Back'}
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="border-t pt-6 flex flex-col gap-4 text-unlimited-gray">
          <div className="flex justify-center gap-6">
            <Link to="/contact" className="flex items-center gap-1 hover:text-unlimited-blue transition-colors">
              <HelpCircle className="h-4 w-4" />
              <span>{t('errors.notFound.getHelp') || 'Get Help'}</span>
            </Link>
            <Link to="/universities" className="flex items-center gap-1 hover:text-unlimited-blue transition-colors">
              <Search className="h-4 w-4" />
              <span>{t('errors.notFound.findUniversity') || 'Find University'}</span>
            </Link>
          </div>
          
          <p className="text-sm">
            {t('errors.notFound.contactSupport') || 'If you believe this is an error, please contact support.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
