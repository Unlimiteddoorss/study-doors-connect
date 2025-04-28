
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { DatabaseZap, AlertCircle } from 'lucide-react';

export const SupabaseStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>('جاري التحقق من الاتصال...');
  const { toast } = useToast();

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('universities').select('count').limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setIsConnected(false);
          setMessage('فشل الاتصال بقاعدة البيانات');
          toast({
            title: "خطأ في الاتصال بقاعدة البيانات",
            description: "تأكد من إعدادات Supabase الخاصة بك",
            variant: "destructive"
          });
          return;
        }
        
        setIsConnected(true);
        setMessage('تم الاتصال بنجاح');
      } catch (err) {
        console.error('Error checking Supabase connection:', err);
        setIsConnected(false);
        setMessage('فشل الاتصال بقاعدة البيانات');
      }
    };

    checkConnection();
  }, [toast]);

  return (
    <div className="flex items-center gap-2">
      {isConnected === null ? (
        <Badge variant="outline" className="bg-gray-100 text-gray-600">
          جاري التحقق من الاتصال...
        </Badge>
      ) : isConnected ? (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          <DatabaseZap className="w-3 h-3 mr-1" />
          متصل بقاعدة البيانات
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          غير متصل بقاعدة البيانات
        </Badge>
      )}
    </div>
  );
};
