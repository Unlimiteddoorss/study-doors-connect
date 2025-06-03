
import { supabase } from '@/integrations/supabase/client';
import { errorHandler } from '@/utils/errorHandler';

export interface RealApplication {
  id: string;
  student_id: string;
  university_id: number;
  program_id: number;
  status: string;
  personal_info: any;
  academic_info: any;
  created_at: string;
  updated_at: string;
  agent_id?: string;
  studentName?: string;
  programName?: string;
  universityName?: string;
  studentEmail?: string;
  studentPhone?: string;
  studentCountry?: string;
}

export const realApplicationsService = {
  // جلب جميع الطلبات مع تفاصيل كاملة
  async getAllApplications() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          programs!inner(
            name, 
            name_ar,
            degree_type,
            language,
            tuition_fee,
            universities!inner(name, name_ar, country, city)
          ),
          user_profiles!inner(full_name, phone, country)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        errorHandler.logError(error, { context: 'getAllApplications', operation: 'supabase_query' });
        throw error;
      }

      const result = data?.map(app => ({
        ...app,
        studentName: app.user_profiles?.full_name || 'غير محدد',
        studentPhone: app.user_profiles?.phone,
        studentCountry: app.user_profiles?.country,
        programName: app.programs?.name || 'غير محدد',
        universityName: app.programs?.universities?.name || 'غير محدد'
      })) || [];

      errorHandler.logInfo(`تم جلب ${result.length} طلبات بنجاح`, { count: result.length });
      return result;
    } catch (error) {
      errorHandler.logError(error, { context: 'getAllApplications' });
      throw error;
    }
  },

  // جلب طلب محدد مع جميع التفاصيل
  async getApplicationById(id: string) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          programs!inner(
            name, 
            name_ar,
            degree_type,
            language,
            duration,
            tuition_fee,
            description,
            universities!inner(name, name_ar, country, city, website)
          ),
          user_profiles!inner(full_name, phone, country, city)
        `)
        .eq('id', id)
        .single();

      if (error) {
        errorHandler.logError(error, { context: 'getApplicationById', applicationId: id });
        throw error;
      }

      const result = {
        ...data,
        studentName: data.user_profiles?.full_name || 'غير محدد',
        studentPhone: data.user_profiles?.phone,
        studentCountry: data.user_profiles?.country,
        studentCity: data.user_profiles?.city,
        programName: data.programs?.name || 'غير محدد',
        programNameAr: data.programs?.name_ar,
        universityName: data.programs?.universities?.name || 'غير محدد',
        universityNameAr: data.programs?.universities?.name_ar,
        universityCountry: data.programs?.universities?.country,
        universityCity: data.programs?.universities?.city,
        universityWebsite: data.programs?.universities?.website
      };

      errorHandler.logInfo(`تم جلب تفاصيل الطلب: ${id}`, { applicationId: id });
      return result;
    } catch (error) {
      errorHandler.logError(error, { context: 'getApplicationById', applicationId: id });
      throw error;
    }
  },

  // تحديث حالة الطلب مع إشعارات
  async updateApplicationStatus(id: string, status: string, note?: string) {
    try {
      // تحديث حالة الطلب
      const { data, error } = await supabase
        .from('applications')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        errorHandler.logError(error, { context: 'updateApplicationStatus', applicationId: id, status });
        throw error;
      }

      // إضافة مدخل في الجدول الزمني
      if (note) {
        try {
          const { data: user } = await supabase.auth.getUser();
          await supabase
            .from('timeline')
            .insert({
              application_id: id,
              status,
              note,
              created_by: user.user?.id
            });
        } catch (timelineError) {
          errorHandler.logWarning('فشل في إضافة مدخل الجدول الزمني', { 
            applicationId: id, 
            error: timelineError 
          });
        }
      }

      // إرسال إشعار للطالب
      try {
        const statusMessages = {
          'pending': 'طلبك قيد المراجعة',
          'under_review': 'طلبك قيد المراجعة من قبل الجامعة',
          'accepted': 'تهانينا! تم قبول طلبك',
          'rejected': 'نأسف، لم يتم قبول طلبك',
          'cancelled': 'تم إلغاء طلبك'
        };

        await supabase.rpc('create_notification', {
          p_user_id: data.student_id,
          p_title: 'تحديث حالة الطلب',
          p_message: statusMessages[status as keyof typeof statusMessages] || 'تم تحديث حالة طلبك',
          p_type: status === 'accepted' ? 'success' : status === 'rejected' ? 'error' : 'info',
          p_action_url: `/dashboard/applications/${id}`
        });
      } catch (notificationError) {
        errorHandler.logWarning('فشل في إرسال الإشعار', { 
          applicationId: id, 
          error: notificationError 
        });
      }

      errorHandler.logInfo(`تم تحديث حالة الطلب: ${id} إلى ${status}`, { 
        applicationId: id, 
        status, 
        note 
      });
      return data;
    } catch (error) {
      errorHandler.logError(error, { context: 'updateApplicationStatus', applicationId: id, status });
      throw error;
    }
  },

  // إحصائيات الطلبات المحسنة
  async getApplicationsStats() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('status, created_at');

      if (error) {
        errorHandler.logError(error, { context: 'getApplicationsStats' });
        throw error;
      }

      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const stats = {
        total: data?.length || 0,
        pending: data?.filter(app => app.status === 'pending').length || 0,
        underReview: data?.filter(app => app.status === 'under_review').length || 0,
        approved: data?.filter(app => 
          app.status === 'accepted' || app.status === 'approved'
        ).length || 0,
        rejected: data?.filter(app => app.status === 'rejected').length || 0,
        cancelled: data?.filter(app => app.status === 'cancelled').length || 0,
        thisMonth: data?.filter(app => {
          const appDate = new Date(app.created_at);
          return appDate >= thisMonth;
        }).length || 0,
        thisWeek: data?.filter(app => {
          const appDate = new Date(app.created_at);
          return appDate >= thisWeek;
        }).length || 0
      };

      errorHandler.logInfo('تم حساب إحصائيات الطلبات', stats);
      return stats;
    } catch (error) {
      errorHandler.logError(error, { context: 'getApplicationsStats' });
      throw error;
    }
  },

  // إنشاء طلب جديد مع التحقق
  async createApplication(applicationData: {
    student_id: string;
    university_id: number;
    program_id: number;
    personal_info: any;
    academic_info: any;
    agent_id?: string;
  }) {
    try {
      // التحقق من وجود البرنامج والجامعة
      const { data: program } = await supabase
        .from('programs')
        .select('id, name, university_id, universities!inner(name)')
        .eq('id', applicationData.program_id)
        .eq('university_id', applicationData.university_id)
        .eq('is_active', true)
        .single();

      if (!program) {
        throw new Error('البرنامج أو الجامعة غير موجودة أو غير نشطة');
      }

      // إنشاء الطلب
      const { data, error } = await supabase
        .from('applications')
        .insert({
          ...applicationData,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        errorHandler.logError(error, { context: 'createApplication', applicationData });
        throw error;
      }

      // إضافة مدخل أولي في الجدول الزمني
      try {
        await supabase
          .from('timeline')
          .insert({
            application_id: data.id,
            status: 'pending',
            note: 'تم تقديم الطلب بنجاح',
            created_by: data.student_id
          });
      } catch (timelineError) {
        errorHandler.logWarning('فشل في إضافة مدخل الجدول الزمني للطلب الجديد', { 
          applicationId: data.id, 
          error: timelineError 
        });
      }

      // إرسال إشعار للطالب
      try {
        await supabase.rpc('create_notification', {
          p_user_id: data.student_id,
          p_title: 'تم تقديم الطلب بنجاح',
          p_message: `تم تقديم طلبك لبرنامج ${program.name} بنجاح`,
          p_type: 'success',
          p_action_url: `/dashboard/applications/${data.id}`
        });
      } catch (notificationError) {
        errorHandler.logWarning('فشل في إرسال إشعار الطلب الجديد', { 
          applicationId: data.id, 
          error: notificationError 
        });
      }

      errorHandler.logInfo(`تم إنشاء طلب جديد: ${data.id}`, { 
        applicationId: data.id,
        programName: program.name
      });
      return data;
    } catch (error) {
      errorHandler.logError(error, { context: 'createApplication', applicationData });
      throw error;
    }
  }
};
