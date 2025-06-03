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
}

export const realApplicationsService = {
  // جلب جميع الطلبات
  async getAllApplications() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          programs!inner(name, universities!inner(name)),
          user_profiles!inner(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        errorHandler.logError(error, { context: 'getAllApplications', operation: 'supabase_query' });
        throw error;
      }

      const result = data?.map(app => ({
        ...app,
        studentName: app.user_profiles?.full_name,
        programName: app.programs?.name,
        universityName: app.programs?.universities?.name
      })) || [];

      errorHandler.logInfo(`تم جلب ${result.length} طلبات`, { count: result.length });
      return result;
    } catch (error) {
      errorHandler.logError(error, { context: 'getAllApplications' });
      throw error;
    }
  },

  // جلب طلب محدد
  async getApplicationById(id: string) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          programs!inner(name, universities!inner(name)),
          user_profiles!inner(full_name, phone, country)
        `)
        .eq('id', id)
        .single();

      if (error) {
        errorHandler.logError(error, { context: 'getApplicationById', applicationId: id });
        throw error;
      }

      const result = {
        ...data,
        studentName: data.user_profiles?.full_name,
        programName: data.programs?.name,
        universityName: data.programs?.universities?.name
      };

      errorHandler.logInfo(`تم جلب بيانات الطلب: ${id}`, { applicationId: id });
      return result;
    } catch (error) {
      errorHandler.logError(error, { context: 'getApplicationById', applicationId: id });
      throw error;
    }
  },

  // تحديث حالة الطلب
  async updateApplicationStatus(id: string, status: string, note?: string) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .update({ status, updated_at: new Date().toISOString() })
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
          await supabase
            .from('timeline')
            .insert({
              application_id: id,
              status,
              note,
              created_by: (await supabase.auth.getUser()).data.user?.id
            });
        } catch (timelineError) {
          errorHandler.logWarning('فشل في إضافة مدخل الجدول الزمني', { 
            applicationId: id, 
            error: timelineError 
          });
        }
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

  // جلب الجدول الزمني للطلب
  async getApplicationTimeline(applicationId: string) {
    try {
      const { data, error } = await supabase
        .from('timeline')
        .select('*')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: true });

      if (error) {
        errorHandler.logError(error, { context: 'getApplicationTimeline', applicationId });
        throw error;
      }
      
      errorHandler.logInfo(`تم جلب الجدول الزمني للطلب: ${applicationId}`, { 
        applicationId, 
        timelineCount: data?.length || 0 
      });
      return data || [];
    } catch (error) {
      errorHandler.logError(error, { context: 'getApplicationTimeline', applicationId });
      throw error;
    }
  },

  // إحصائيات الطلبات
  async getApplicationsStats() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('status, created_at');

      if (error) {
        errorHandler.logError(error, { context: 'getApplicationsStats' });
        throw error;
      }

      const stats = {
        total: data?.length || 0,
        pending: data?.filter(app => app.status === 'pending').length || 0,
        approved: data?.filter(app => app.status === 'accepted' || app.status === 'approved').length || 0,
        rejected: data?.filter(app => app.status === 'rejected').length || 0,
        thisMonth: data?.filter(app => {
          const appDate = new Date(app.created_at);
          const now = new Date();
          return appDate.getMonth() === now.getMonth() && appDate.getFullYear() === now.getFullYear();
        }).length || 0
      };

      errorHandler.logInfo('تم حساب إحصائيات الطلبات', stats);
      return stats;
    } catch (error) {
      errorHandler.logError(error, { context: 'getApplicationsStats' });
      throw error;
    }
  },

  // جلب الطلبات حسب الوكيل
  async getApplicationsByAgent(agentId: string) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          programs!inner(name, universities!inner(name)),
          user_profiles!inner(full_name)
        `)
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false });

      if (error) {
        errorHandler.logError(error, { context: 'getApplicationsByAgent', agentId });
        throw error;
      }

      const result = data?.map(app => ({
        ...app,
        studentName: app.user_profiles?.full_name,
        programName: app.programs?.name,
        universityName: app.programs?.universities?.name
      })) || [];

      errorHandler.logInfo(`تم جلب ${result.length} طلبات للوكيل: ${agentId}`, { 
        agentId, 
        count: result.length 
      });
      return result;
    } catch (error) {
      errorHandler.logError(error, { context: 'getApplicationsByAgent', agentId });
      throw error;
    }
  },

  // إنشاء طلب جديد
  async createApplication(applicationData: any) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert({
          ...applicationData,
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
            status: 'submitted',
            note: 'تم تقديم الطلب بنجاح',
            created_by: data.student_id
          });
      } catch (timelineError) {
        errorHandler.logWarning('فشل في إضافة مدخل الجدول الزمني للطلب الجديد', { 
          applicationId: data.id, 
          error: timelineError 
        });
      }

      errorHandler.logInfo(`تم إنشاء طلب جديد: ${data.id}`, { applicationId: data.id });
      return data;
    } catch (error) {
      errorHandler.logError(error, { context: 'createApplication', applicationData });
      throw error;
    }
  }
};
