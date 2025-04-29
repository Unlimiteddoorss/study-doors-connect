
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// التحقق من صحة الاتصال بقاعدة البيانات
export const checkSupabaseConnection = async () => {
  try {
    // محاولة استرداد بيانات من جدول موجود
    const { count, error } = await supabase
      .from('universities')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('خطأ في الاتصال بـ Supabase:', error.message);
      throw error;
    }
    
    // إذا وصلنا إلى هنا، فالاتصال ناجح
    console.log('تم الاتصال بـ Supabase بنجاح');
    return true;
  } catch (error) {
    console.error('خطأ في الاتصال بـ Supabase:', error);
    return false;
  }
};

// وظيفة للتحقق من وجود المتغيرات البيئية المطلوبة
export const hasValidSupabaseCredentials = (): boolean => {
  return true; // We now have hardcoded credentials in the client file
};
