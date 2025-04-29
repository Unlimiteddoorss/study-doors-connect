
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase-types';

// هذه المتغيرات البيئية يجب تعيينها في البيئة المنشورة
// للتطوير المحلي، يمكنك استبدالها بعنوان URL الفعلي لـ Supabase ومفتاح التعريف
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// إنشاء عميل Supabase مع أنواع Database المحددة
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

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
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  return Boolean(url && url !== 'https://example.supabase.co' && 
                 key && key !== 'your-anon-key');
};
