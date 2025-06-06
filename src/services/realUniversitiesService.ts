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
  programCount?: number;
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
  universityName?: string;
  applicationCount?: number;
}

export const realUniversitiesService = {
  // جلب جميع الجامعات مع عدد البرامج
  async getAllUniversities(): Promise<RealUniversity[]> {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select(`
          *,
          programs!university_id(count)
        `)
        .eq('is_active', true)
        .order('name');

      if (error) {
        errorHandler.logError(error, { context: 'getAllUniversities' });
        throw error;
      }

      const result = data?.map(university => ({
        ...university,
        programCount: university.programs?.[0]?.count || 0,
        programs: undefined // Remove programs array to match interface
      })) || [];
      
      errorHandler.logInfo(`تم جلب ${result.length} جامعة`, { count: result.length });
      return result;
    } catch (error) {
      errorHandler.logError(error, { context: 'getAllUniversities' });
      throw error;
    }
  },

  // جلب جامعة محددة مع البرامج والإحصائيات
  async getUniversityWithPrograms(id: number) {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select(`
          *,
          programs!university_id(
            *,
            applications!program_id(count)
          )
        `)
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) {
        errorHandler.logError(error, { context: 'getUniversityWithPrograms', universityId: id });
        throw error;
      }

      if (data.programs) {
        data.programs = data.programs.map((program: any) => ({
          ...program,
          applicationCount: program.applications?.[0]?.count || 0
        }));
      }
      
      errorHandler.logInfo(`تم جلب بيانات الجامعة: ${id}`, { 
        universityId: id,
        programsCount: data.programs?.length || 0
      });
      return data;
    } catch (error) {
      errorHandler.logError(error, { context: 'getUniversityWithPrograms', universityId: id });
      throw error;
    }
  },

  // جلب جميع البرامج مع تفاصيل الجامعات
  async getAllPrograms(): Promise<RealProgram[]> {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select(`
          *,
          universities!university_id(name, name_ar, country, city),
          applications!program_id(count)
        `)
        .eq('is_active', true)
        .order('name');

      if (error) {
        errorHandler.logError(error, { context: 'getAllPrograms' });
        throw error;
      }

      const result = data?.map(program => ({
        ...program,
        universityName: program.universities?.name,
        applicationCount: program.applications?.[0]?.count || 0
      })) || [];
      
      errorHandler.logInfo(`تم جلب ${result.length} برنامج`, { count: result.length });
      return result;
    } catch (error) {
      errorHandler.logError(error, { context: 'getAllPrograms' });
      throw error;
    }
  },

  // البحث في الجامعات
  async searchUniversities(searchTerm: string, country?: string): Promise<RealUniversity[]> {
    try {
      let query = supabase
        .from('universities')
        .select(`
          *,
          programs!university_id(count)
        `)
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

      const result = data?.map(university => ({
        ...university,
        programCount: university.programs?.[0]?.count || 0,
        programs: undefined
      })) || [];
      
      errorHandler.logInfo(`تم البحث في الجامعات: "${searchTerm}"`, { 
        searchTerm, 
        country,
        resultsCount: result.length
      });
      return result;
    } catch (error) {
      errorHandler.logError(error, { context: 'searchUniversities', searchTerm, country });
      throw error;
    }
  },

  // البحث في البرامج
  async searchPrograms(searchTerm: string, filters?: {
    degreeType?: string;
    language?: string;
  }): Promise<RealProgram[]> {
    try {
      let query = supabase
        .from('programs')
        .select(`
          *,
          universities!university_id(name, name_ar, country, city),
          applications!program_id(count)
        `)
        .eq('is_active', true);

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,name_ar.ilike.%${searchTerm}%`);
      }

      if (filters?.degreeType) {
        query = query.eq('degree_type', filters.degreeType);
      }

      if (filters?.language) {
        query = query.eq('language', filters.language);
      }

      const { data, error } = await query.order('name');

      if (error) {
        errorHandler.logError(error, { context: 'searchPrograms', searchTerm, filters });
        throw error;
      }

      const result = data?.map(program => ({
        ...program,
        universityName: program.universities?.name,
        applicationCount: program.applications?.[0]?.count || 0
      })) || [];
      
      errorHandler.logInfo(`تم البحث في البرامج: "${searchTerm}"`, { 
        searchTerm, 
        filters,
        resultsCount: result.length
      });
      return result;
    } catch (error) {
      errorHandler.logError(error, { context: 'searchPrograms', searchTerm, filters });
      throw error;
    }
  },

  // إحصائيات الجامعات والبرامج
  async getUniversitiesStats() {
    try {
      const [universitiesCount, programsCount, applicationsStats] = await Promise.all([
        supabase.from('universities').select('*', { count: 'exact', head: true }),
        supabase.from('programs').select('*', { count: 'exact', head: true }),
        supabase.from('applications').select('*', { count: 'exact', head: true })
      ]);

      if (universitiesCount.error) {
        throw universitiesCount.error;
      }

      if (programsCount.error) {
        throw programsCount.error;
      }

      if (applicationsStats.error) {
        throw applicationsStats.error;
      }

      const stats = {
        totalUniversities: universitiesCount.count || 0,
        totalPrograms: programsCount.count || 0,
        applicationStats: {
          total: applicationsStats.count || 0,
          thisMonth: Math.floor((applicationsStats.count || 0) * 0.3), // تقدير
          thisWeek: Math.floor((applicationsStats.count || 0) * 0.1) // تقدير
        }
      };

      errorHandler.logInfo('تم جلب إحصائيات الجامعات', stats);
      return stats;
    } catch (error) {
      errorHandler.logError(error, { context: 'getUniversitiesStats' });
      throw error;
    }
  }
};
