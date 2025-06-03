import { supabase } from '@/integrations/supabase/client';
import { errorHandler } from '@/utils/errorHandler';

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
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) {
        errorHandler.logError(error, { context: 'getAllUniversities' });
        throw error;
      }
      
      errorHandler.logInfo(`تم جلب ${data?.length || 0} جامعة`, { count: data?.length || 0 });
      return data || [];
    } catch (error) {
      errorHandler.logError(error, { context: 'getAllUniversities' });
      throw error;
    }
  },

  // جلب جامعة محددة مع البرامج
  async getUniversityWithPrograms(id: number) {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select(`
          *,
          programs!inner(*)
        `)
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) {
        errorHandler.logError(error, { context: 'getUniversityWithPrograms', universityId: id });
        throw error;
      }
      
      errorHandler.logInfo(`تم جلب بيانات الجامعة: ${id}`, { universityId: id });
      return data;
    } catch (error) {
      errorHandler.logError(error, { context: 'getUniversityWithPrograms', universityId: id });
      throw error;
    }
  },

  // جلب البرامج لجامعة محددة
  async getUniversityPrograms(universityId: number) {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('university_id', universityId)
        .eq('is_active', true)
        .order('name');

      if (error) {
        errorHandler.logError(error, { context: 'getUniversityPrograms', universityId });
        throw error;
      }
      
      errorHandler.logInfo(`تم جلب ${data?.length || 0} برنامج للجامعة: ${universityId}`, { 
        universityId, 
        programsCount: data?.length || 0 
      });
      return data || [];
    } catch (error) {
      errorHandler.logError(error, { context: 'getUniversityPrograms', universityId });
      throw error;
    }
  },

  // إحصائيات الجامعات
  async getUniversitiesStats() {
    try {
      const { data: universities, error: uniError } = await supabase
        .from('universities')
        .select('id, country, is_active');

      const { data: programs, error: progError } = await supabase
        .from('programs')
        .select('id, university_id, is_active');

      if (uniError) {
        errorHandler.logError(uniError, { context: 'getUniversitiesStats', operation: 'universities_query' });
        throw uniError;
      }
      
      if (progError) {
        errorHandler.logError(progError, { context: 'getUniversitiesStats', operation: 'programs_query' });
        throw progError;
      }

      const stats = {
        total: universities?.filter(uni => uni.is_active).length || 0,
        countries: [...new Set(universities?.map(uni => uni.country))].length || 0,
        totalPrograms: programs?.filter(prog => prog.is_active).length || 0,
        averageProgramsPerUniversity: universities?.length ? 
          Math.round((programs?.length || 0) / universities.length) : 0
      };

      errorHandler.logInfo('تم حساب إحصائيات الجامعات', stats);
      return stats;
    } catch (error) {
      errorHandler.logError(error, { context: 'getUniversitiesStats' });
      throw error;
    }
  },

  // البحث في الجامعات
  async searchUniversities(searchTerm: string, country?: string) {
    try {
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

      if (error) {
        errorHandler.logError(error, { context: 'searchUniversities', searchTerm, country });
        throw error;
      }
      
      errorHandler.logInfo(`تم البحث في الجامعات: "${searchTerm}"`, { 
        searchTerm, 
        country, 
        resultsCount: data?.length || 0 
      });
      return data || [];
    } catch (error) {
      errorHandler.logError(error, { context: 'searchUniversities', searchTerm, country });
      throw error;
    }
  },

  // إنشاء جامعة جديدة
  async createUniversity(universityData: Omit<RealUniversity, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('universities')
        .insert({
          ...universityData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        errorHandler.logError(error, { context: 'createUniversity', universityData });
        throw error;
      }
      
      errorHandler.logInfo(`تم إنشاء جامعة جديدة: ${data.name}`, { universityId: data.id });
      return data;
    } catch (error) {
      errorHandler.logError(error, { context: 'createUniversity', universityData });
      throw error;
    }
  },

  // تحديث جامعة
  async updateUniversity(id: number, updates: Partial<RealUniversity>) {
    try {
      const { data, error } = await supabase
        .from('universities')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        errorHandler.logError(error, { context: 'updateUniversity', universityId: id, updates });
        throw error;
      }
      
      errorHandler.logInfo(`تم تحديث الجامعة: ${id}`, { universityId: id, updates });
      return data;
    } catch (error) {
      errorHandler.logError(error, { context: 'updateUniversity', universityId: id, updates });
      throw error;
    }
  },

  // حذف جامعة (تعطيل)
  async deleteUniversity(id: number) {
    try {
      const { data, error } = await supabase
        .from('universities')
        .update({ 
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        errorHandler.logError(error, { context: 'deleteUniversity', universityId: id });
        throw error;
      }
      
      errorHandler.logInfo(`تم حذف (تعطيل) الجامعة: ${id}`, { universityId: id });
      return data;
    } catch (error) {
      errorHandler.logError(error, { context: 'deleteUniversity', universityId: id });
      throw error;
    }
  },

  // إنشاء برنامج جديد
  async createProgram(programData: Omit<RealProgram, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('programs')
        .insert({
          ...programData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        errorHandler.logError(error, { context: 'createProgram', programData });
        throw error;
      }
      
      errorHandler.logInfo(`تم إنشاء برنامج جديد: ${data.name}`, { programId: data.id });
      return data;
    } catch (error) {
      errorHandler.logError(error, { context: 'createProgram', programData });
      throw error;
    }
  },

  // تحديث برنامج
  async updateProgram(id: number, updates: Partial<RealProgram>) {
    try {
      const { data, error } = await supabase
        .from('programs')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        errorHandler.logError(error, { context: 'updateProgram', programId: id, updates });
        throw error;
      }
      
      errorHandler.logInfo(`تم تحديث البرنامج: ${id}`, { programId: id, updates });
      return data;
    } catch (error) {
      errorHandler.logError(error, { context: 'updateProgram', programId: id, updates });
      throw error;
    }
  }
};
