
import { supabase } from '@/integrations/supabase/client';

export interface RealUniversity {
  id: number;
  name: string;
  name_ar?: string;
  country: string;
  city: string;
  description?: string;
  description_ar?: string;
  website?: string;
  image_url?: string;
  founded_year?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  programs?: RealProgram[];
}

export interface RealProgram {
  id: number;
  name: string;
  name_ar?: string;
  degree_type: string;
  language: string;
  duration: number;
  tuition_fee: number;
  description?: string;
  description_ar?: string;
  quota?: number;
  is_active: boolean;
  university_id: number;
  created_at: string;
  updated_at: string;
}

export const realUniversitiesService = {
  // جلب جميع الجامعات
  async getAllUniversities() {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  },

  // جلب جامعة محددة مع البرامج
  async getUniversityWithPrograms(id: number) {
    const { data, error } = await supabase
      .from('universities')
      .select(`
        *,
        programs!inner(*)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  },

  // جلب البرامج لجامعة محددة
  async getUniversityPrograms(universityId: number) {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('university_id', universityId)
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  },

  // إحصائيات الجامعات
  async getUniversitiesStats() {
    const { data: universities, error: uniError } = await supabase
      .from('universities')
      .select('id, country, is_active');

    const { data: programs, error: progError } = await supabase
      .from('programs')
      .select('id, university_id, is_active');

    if (uniError || progError) throw uniError || progError;

    const stats = {
      total: universities?.filter(uni => uni.is_active).length || 0,
      countries: [...new Set(universities?.map(uni => uni.country))].length || 0,
      totalPrograms: programs?.filter(prog => prog.is_active).length || 0,
      averageProgramsPerUniversity: universities?.length ? 
        Math.round((programs?.length || 0) / universities.length) : 0
    };

    return stats;
  },

  // البحث في الجامعات
  async searchUniversities(searchTerm: string, country?: string) {
    let query = supabase
      .from('universities')
      .select('*')
      .eq('is_active', true);

    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,name_ar.ilike.%${searchTerm}%`);
    }

    if (country) {
      query = query.eq('country', country);
    }

    const { data, error } = await query.order('name');

    if (error) throw error;
    return data || [];
  },

  // إنشاء جامعة جديدة
  async createUniversity(universityData: Omit<RealUniversity, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('universities')
      .insert({
        ...universityData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // تحديث جامعة
  async updateUniversity(id: number, updates: Partial<RealUniversity>) {
    const { data, error } = await supabase
      .from('universities')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // حذف جامعة (تعطيل)
  async deleteUniversity(id: number) {
    const { data, error } = await supabase
      .from('universities')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // إنشاء برنامج جديد
  async createProgram(programData: Omit<RealProgram, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('programs')
      .insert({
        ...programData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // تحديث برنامج
  async updateProgram(id: number, updates: Partial<RealProgram>) {
    const { data, error } = await supabase
      .from('programs')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
