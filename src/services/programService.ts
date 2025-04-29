
import { supabase } from '@/integrations/supabase/client';

// Get all programs with optional pagination and filters
export const getPrograms = async (
  page: number = 1,
  pageSize: number = 10,
  filters: Record<string, any> = {}
) => {
  try {
    let query = supabase
      .from('programs')
      .select('*, universities(name, name_ar, country, city)', { count: 'exact' });
    
    // Apply filters
    if (filters.university_id) {
      query = query.eq('university_id', filters.university_id);
    }

    if (filters.degree_type) {
      query = query.eq('degree_type', filters.degree_type);
    }

    if (filters.language) {
      query = query.eq('language', filters.language);
    }

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, count, error } = await query
      .range(from, to)
      .order('name', { ascending: true });

    if (error) throw error;

    return { data, count, error: null };
  } catch (error: any) {
    console.error('Error fetching programs:', error.message);
    return { data: [], count: 0, error: error.message };
  }
};

// Get program by ID
export const getProgramById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*, universities(*)')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error(`Error fetching program with ID ${id}:`, error.message);
    return { data: null, error: error.message };
  }
};

// Get featured programs
export const getFeaturedPrograms = async (limit: number = 6) => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*, universities(name, name_ar, country, city)')
      .limit(limit);

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching featured programs:', error.message);
    return { data: [], error: error.message };
  }
};
