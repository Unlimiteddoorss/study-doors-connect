
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
  async getAllUniversities() {
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
        programCount: university.programs?.[0]?.count || 0
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

      // إضافة عدد الطلبات لكل برنامج
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

  // جلب البرامج لجامعة محددة مع الإحصائيات
  async getUniversityPrograms(universityId: number) {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select(`
          *,
          universities!university_id(name, name_ar),
          applications!program_id(count)
        `)
        .eq('university_id', universityId)
        .eq('is_active', true)
        .order('name');

      if (error) {
        errorHandler.logError(error, { context: 'getUniversityPrograms', universityId });
        throw error;
      }

      const result = data?.map(program => ({
        ...program,
        universityName: program.universities?.name,
        applicationCount: program.applications?.[0]?.count || 0
      })) || [];
      
      errorHandler.logInfo(`تم جلب ${result.length} برنامج للجامعة: ${universityId}`, { 
        universityId, 
        programsCount: result.length 
      });
      return result;
    } catch (error) {
      errorHandler.logError(error, { context: 'getUniversityPrograms', universityId });
      throw error;
    }
  },

  // جلب جميع البرامج مع تفاصيل الجامعات
  async getAllPrograms() {
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
        universityCountry: program.universities?.country,
        universityCity: program.universities?.city,
        applicationCount: program.applications?.[0]?.count || 0
      })) || [];
      
      errorHandler.logInfo(`تم جلب ${result.length} برنامج`, { count: result.length });
      return result;
    } catch (error) {
      errorHandler.logError(error, { context: 'getAllPrograms' });
      throw error;
    }
  },

  // البحث في الجامعات والبرامج
  async searchUniversities(searchTerm: string, country?: string, degreeType?: string) {
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

      let result = data?.map(university => ({
        ...university,
        programCount: university.programs?.[0]?.count || 0
      })) || [];

      // تصفية حسب نوع الدرجة إذا تم تحديدها
      if (degreeType) {
        const universityIds = result.map(u => u.id);
        const { data: programs } = await supabase
          .from('programs')
          .select('university_id')
          .in('university_id', universityIds)
          .eq('degree_type', degreeType)
          .eq('is_active', true);

        const filteredIds = new Set(programs?.map(p => p.university_id));
        result = result.filter(u => filteredIds.has(u.id));
      }
      
      errorHandler.logInfo(`تم البحث في الجامعات: "${searchTerm}"`, { 
        searchTerm, 
        country,
        degreeType,
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
    country?: string;
    degreeType?: string;
    language?: string;
    minFee?: number;
    maxFee?: number;
  }) {
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

      if (filters?.minFee) {
        query = query.gte('tuition_fee', filters.minFee);
      }

      if (filters?.maxFee) {
        query = query.lte('tuition_fee', filters.maxFee);
      }

      const { data, error } = await query.order('name');

      if (error) {
        errorHandler.logError(error, { context: 'searchPrograms', searchTerm, filters });
        throw error;
      }

      let result = data?.map(program => ({
        ...program,
        universityName: program.universities?.name,
        universityCountry: program.universities?.country,
        universityCity: program.universities?.city,
        applicationCount: program.applications?.[0]?.count || 0
      })) || [];

      // تصفية حسب البلد إذا تم تحديده
      if (filters?.country) {
        result = result.filter(p => p.universityCountry === filters.country);
      }
      
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

  // إحصائيات الجامعات والبرامج المحسنة
  async getUniversitiesStats() {
    try {
      const [universitiesResult, programsResult, applicationsResult] = await Promise.all([
        supabase.from('universities').select('id, country, is_active'),
        supabase.from('programs').select('id, university_id, degree_type, language, is_active'),
        supabase.from('applications').select('id, program_id, status, created_at')
      ]);

      if (universitiesResult.error) {
        errorHandler.logError(universitiesResult.error, { context: 'getUniversitiesStats', operation: 'universities_query' });
        throw universitiesResult.error;
      }
      
      if (programsResult.error) {
        errorHandler.logError(programsResult.error, { context: 'getUniversitiesStats', operation: 'programs_query' });
        throw programsResult.error;
      }

      if (applicationsResult.error) {
        errorHandler.logError(applicationsResult.error, { context: 'getUniversitiesStats', operation: 'applications_query' });
        throw applicationsResult.error;
      }

      const universities = universitiesResult.data || [];
      const programs = programsResult.data || [];
      const applications = applicationsResult.data || [];

      const activeUniversities = universities.filter(uni => uni.is_active);
      const activePrograms = programs.filter(prog => prog.is_active);

      const stats = {
        totalUniversities: activeUniversities.length,
        totalPrograms: activePrograms.length,
        totalApplications: applications.length,
        countries: [...new Set(universities.map(uni => uni.country))].length,
        averageProgramsPerUniversity: activeUniversities.length ? 
          Math.round(activePrograms.length / activeUniversities.length) : 0,
        degreeTypes: {
          bachelor: programs.filter(p => p.degree_type === 'Bachelor').length,
          master: programs.filter(p => p.degree_type === 'Master').length,
          phd: programs.filter(p => p.degree_type === 'PhD').length
        },
        languages: {
          english: programs.filter(p => p.language === 'English').length,
          turkish: programs.filter(p => p.language === 'Turkish').length,
          arabic: programs.filter(p => p.language === 'Arabic').length
        },
        applicationStats: {
          thisMonth: applications.filter(app => {
            const appDate = new Date(app.created_at);
            const now = new Date();
            return appDate.getMonth() === now.getMonth() && 
                   appDate.getFullYear() === now.getFullYear();
          }).length,
          pending: applications.filter(app => app.status === 'pending').length,
          approved: applications.filter(app => 
            app.status === 'accepted' || app.status === 'approved'
          ).length
        }
      };

      errorHandler.logInfo('تم حساب إحصائيات الجامعات المحسنة', stats);
      return stats;
    } catch (error) {
      errorHandler.logError(error, { context: 'getUniversitiesStats' });
      throw error;
    }
  }
};
