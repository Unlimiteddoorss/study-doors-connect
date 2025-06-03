
import { supabase } from '@/integrations/supabase/client';

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
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        programs!inner(name, universities!inner(name)),
        user_profiles!inner(full_name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data?.map(app => ({
      ...app,
      studentName: app.user_profiles?.full_name,
      programName: app.programs?.name,
      universityName: app.programs?.universities?.name
    })) || [];
  },

  // جلب طلب محدد
  async getApplicationById(id: string) {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        programs!inner(name, universities!inner(name)),
        user_profiles!inner(full_name, phone, country)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    return {
      ...data,
      studentName: data.user_profiles?.full_name,
      programName: data.programs?.name,
      universityName: data.programs?.universities?.name
    };
  },

  // تحديث حالة الطلب
  async updateApplicationStatus(id: string, status: string, note?: string) {
    const { data, error } = await supabase
      .from('applications')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // إضافة مدخل في الجدول الزمني
    if (note) {
      await supabase
        .from('timeline')
        .insert({
          application_id: id,
          status,
          note,
          created_by: (await supabase.auth.getUser()).data.user?.id
        });
    }

    return data;
  },

  // جلب الجدول الزمني للطلب
  async getApplicationTimeline(applicationId: string) {
    const { data, error } = await supabase
      .from('timeline')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // إحصائيات الطلبات
  async getApplicationsStats() {
    const { data, error } = await supabase
      .from('applications')
      .select('status, created_at');

    if (error) throw error;

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

    return stats;
  },

  // جلب الطلبات حسب الوكيل
  async getApplicationsByAgent(agentId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        programs!inner(name, universities!inner(name)),
        user_profiles!inner(full_name)
      `)
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data?.map(app => ({
      ...app,
      studentName: app.user_profiles?.full_name,
      programName: app.programs?.name,
      universityName: app.programs?.universities?.name
    })) || [];
  },

  // إنشاء طلب جديد
  async createApplication(applicationData: any) {
    const { data, error } = await supabase
      .from('applications')
      .insert({
        ...applicationData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    // إضافة مدخل أولي في الجدول الزمني
    await supabase
      .from('timeline')
      .insert({
        application_id: data.id,
        status: 'submitted',
        note: 'تم تقديم الطلب بنجاح',
        created_by: data.student_id
      });

    return data;
  }
};
