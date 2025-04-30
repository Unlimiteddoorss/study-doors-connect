
import { useState, useEffect } from 'react';
import { checkSupabaseConnection, hasValidSupabaseCredentials } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { DatabaseZap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from 'react-i18next';

export const SupabaseStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [hasCredentials, setHasCredentials] = useState<boolean>(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Check for Supabase credentials
    const credentials = hasValidSupabaseCredentials();
    setHasCredentials(credentials);
    
    // If credentials are valid, check connection
    const checkConnection = async () => {
      if (credentials) {
        try {
          const connected = await checkSupabaseConnection();
          setIsConnected(connected);
          
          if (!connected) {
            toast({
              title: t("supabase.connection.error", "خطأ في الاتصال بقاعدة البيانات"),
              description: t("supabase.connection.errorDescription", "تأكد من إعدادات Supabase الخاصة بك"),
              variant: "destructive"
            });
          }
        } catch (err) {
          console.error('Error checking Supabase connection:', err);
          setIsConnected(false);
        }
      } else {
        // No valid credentials
        setIsConnected(false);
      }
    };

    checkConnection();
    
    // Check connection every 5 minutes
    const interval = setInterval(checkConnection, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [toast, t]);

  if (!hasCredentials) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 cursor-help">
              <AlertCircle className="w-3 h-3 ml-1" />
              {t("supabase.credentials.missing", "بيانات اعتماد Supabase غير مهيئة")}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-sm">
              {t("supabase.credentials.instruction", "قم بتهيئة بيانات اعتماد Supabase")}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isConnected === null ? (
        <Badge variant="outline" className="bg-gray-100 text-gray-600">
          {t("supabase.connection.checking", "جاري التحقق من الاتصال...")}
        </Badge>
      ) : isConnected ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle2 className="w-3 h-3 ml-1" />
                {t("supabase.connection.connected", "متصل بقاعدة البيانات")}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {t("supabase.connection.successful", "الاتصال بـ Supabase ناجح وجاهز للاستخدام")}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 cursor-help">
                <AlertCircle className="w-3 h-3 ml-1" />
                {t("supabase.connection.disconnected", "غير متصل بقاعدة البيانات")}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">
                {t("supabase.connection.checkSettings", "تأكد من إعدادات Supabase الخاصة بك وتحقق من الاتصال بالإنترنت")}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
